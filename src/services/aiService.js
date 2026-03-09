import { AI_CONFIG, PROVIDER_CONFIGS, MOCK_RESPONSES } from "../data/aiConfig";

// Debug logging helper - only logs in development
const isDev =
  import.meta.env.VITE_NODE_ENV === "development" || import.meta.env.DEV;
const debug = (...args) => isDev && console.log(...args);
const debugWarn = (...args) => isDev && console.warn(...args);
const debugError = (...args) => console.error(...args); // Always log errors

/**
 * Sends a message to the configured AI service and gets a response
 * Uses Groq as primary provider and Gemini as backup when Groq is overloaded
 * @param {string} message - The user's message
 * @param {Array} previousMessages - Previous conversation messages
 * @returns {Promise<string>} - The AI's response
 */
export const sendMessageToAI = async (message, previousMessages = []) => {
  try {
    const { groqApiKey, geminiApiKey, systemPrompt } = AI_CONFIG;

    debug("Groq API key available:", groqApiKey ? "Yes" : "No");
    debug("Gemini API key available:", geminiApiKey ? "Yes" : "No");

    const hasGroqKey = groqApiKey && groqApiKey.trim() !== "";
    const hasGeminiKey = geminiApiKey && geminiApiKey.trim() !== "";

    if (!hasGroqKey && !hasGeminiKey) {
      console.info("Using mock AI responses (no API keys configured)");
      return getMockResponse(message);
    }

    const formattedMessages = previousMessages
      .filter((msg) => msg.role === "user" || msg.role === "assistant")
      .map((msg) => ({
        role: msg.role,
        content: msg.content,
      }));

    if (hasGroqKey) {
      try {
        debug("Trying Groq API (primary)...");
        const messages = [
          { role: "system", content: systemPrompt },
          ...formattedMessages,
          { role: "user", content: message },
        ];
        return await sendToGroq(messages, groqApiKey);
      } catch (groqError) {
        debugWarn("Groq API error:", groqError.message);

        if (isOverloadError(groqError) && hasGeminiKey) {
          debug("Switching to Gemini API (backup)...");
          try {
            return await sendToGemini(
              message,
              formattedMessages,
              geminiApiKey,
              systemPrompt,
            );
          } catch (geminiError) {
            debugWarn("Gemini API also failed:", geminiError.message);
            if (isOverloadError(geminiError)) {
              return getMockResponse(message, "rateLimit");
            }
            return getMockResponse(message, "apiError");
          }
        }

        if (hasGeminiKey) {
          debug("Trying Gemini API as fallback...");
          try {
            return await sendToGemini(
              message,
              formattedMessages,
              geminiApiKey,
              systemPrompt,
            );
          } catch (geminiError) {
            debugWarn("Gemini API also failed:", geminiError.message);
            if (isOverloadError(geminiError)) {
              return getMockResponse(message, "rateLimit");
            }
            return getMockResponse(message, "apiError");
          }
        }

        if (isOverloadError(groqError)) {
          return getMockResponse(message, "rateLimit");
        }
        return getMockResponse(message, "apiError");
      }
    } else if (hasGeminiKey) {
      debug("Using Gemini API (no Groq key)...");
      try {
        return await sendToGemini(
          message,
          formattedMessages,
          geminiApiKey,
          systemPrompt,
        );
      } catch (err) {
        debugWarn("Gemini API error:", err.message);
        if (isOverloadError(err)) {
          return getMockResponse(message, "rateLimit");
        }
        return getMockResponse(message, "apiError");
      }
    }

    return getMockResponse(message);
  } catch (error) {
    debugError("Error in sendMessageToAI:", error);
    return MOCK_RESPONSES.apiError;
  }
};

/**
 * Check if error is due to rate limiting or server overload
 */
const isOverloadError = (error) => {
  const message = error.message?.toLowerCase() || "";
  const overloadIndicators = [
    "rate limit",
    "rate_limit",
    "too many requests",
    "429",
    "503",
    "overloaded",
    "capacity",
    "quota",
    "exceeded",
  ];
  return overloadIndicators.some((indicator) => message.includes(indicator));
};

/**
 * Send message to Google Gemini API
 */
const sendToGemini = async (
  message,
  previousMessages,
  apiKey,
  systemPrompt,
) => {
  debug("Sending request to Gemini API...");
  const config = PROVIDER_CONFIGS.gemini;

  const contents = [];

  previousMessages.forEach((msg) => {
    contents.push({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }],
    });
  });

  contents.push({
    role: "user",
    parts: [{ text: message }],
  });

  const requestBody = {
    contents,
    systemInstruction: {
      parts: [{ text: systemPrompt }],
    },
    generationConfig: {
      temperature: config.temperature,
      maxOutputTokens: config.maxTokens,
      topP: 0.95,
      topK: 40,
    },
    safetySettings: [
      {
        category: "HARM_CATEGORY_HARASSMENT",
        threshold: "BLOCK_MEDIUM_AND_ABOVE",
      },
      {
        category: "HARM_CATEGORY_HATE_SPEECH",
        threshold: "BLOCK_MEDIUM_AND_ABOVE",
      },
      {
        category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
        threshold: "BLOCK_MEDIUM_AND_ABOVE",
      },
      {
        category: "HARM_CATEGORY_DANGEROUS_CONTENT",
        threshold: "BLOCK_MEDIUM_AND_ABOVE",
      },
    ],
  };

  const url = `${config.baseUrl}/${config.model}:generateContent?key=${apiKey}`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });

  if (!res.ok) {
    const errorText = await res.text().catch(() => "Unknown error");
    debugError(`Gemini API error (${res.status}): ${errorText}`);
    throw new Error(`Gemini API error (${res.status}): ${errorText}`);
  }

  const data = await res.json();
  debug("Gemini response:", data);

  const responseText =
    data.candidates?.[0]?.content?.parts?.[0]?.text ||
    "Không có nội dung trả về.";

  return responseText;
};

/**
 * Send message to Groq API
 */
const sendToGroq = async (messages, apiKey) => {
  debug("Sending request to Groq API...");
  const config = PROVIDER_CONFIGS.groq;

  const requestBody = {
    model: config.defaultModel,
    temperature: config.temperature ?? 0.1,
    max_tokens: config.maxTokens,
    messages,
    stream: false,
    // Disable Qwen3 chain-of-thought thinking mode to prevent <think> blocks in output
    thinking: { type: "disabled" },
  };

  const res = await fetch(config.baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(requestBody),
  });

  if (!res.ok) {
    const errorText = await res.text().catch(() => "Unknown error");
    debugError(`Groq API error (${res.status}): ${errorText}`);
    throw new Error(`Groq API error (${res.status}): ${errorText}`);
  }

  const data = await res.json();
  debug("Groq response:", data);

  const content = data.choices?.[0]?.message?.content || "Không có nội dung trả về.";
  // Strip any <think>...</think> reasoning blocks emitted by Qwen3
  return content.replace(/<think>[\s\S]*?<\/think>\s*/gi, "").trim() || "Không có nội dung trả về.";
};

/**
 * Normalize text for keyword matching
 */
const normalizeText = (text = "") => {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d");
};

/**
 * Get mock response for offline/testing mode
 */
const getMockResponse = (message, errorType = null) => {
  if (errorType === "rateLimit") {
    return MOCK_RESPONSES.rateLimit;
  }

  if (errorType === "apiError") {
    return MOCK_RESPONSES.apiError;
  }

  const normalizedMessage = normalizeText(message);

  // Lời chào
  if (
    normalizedMessage.includes("xin chao") ||
    normalizedMessage.includes("chao") ||
    normalizedMessage.includes("hello") ||
    normalizedMessage.includes("hi")
  ) {
    return MOCK_RESPONSES.greeting;
  }

  // Sự ra đời của Đảng (1920 - 1930)
  if (
    normalizedMessage.includes("su ra doi cua dang") ||
    normalizedMessage.includes("ra doi cua dang") ||
    normalizedMessage.includes("thanh lap dang") ||
    normalizedMessage.includes("1920") ||
    normalizedMessage.includes("1930") ||
    normalizedMessage.includes("nguyen ai quoc") ||
    normalizedMessage.includes("cuong linh chinh tri dau tien") ||
    normalizedMessage.includes("chanh cuong van tat") ||
    normalizedMessage.includes("sach luoc van tat")
  ) {
    return MOCK_RESPONSES.raDoiDang;
  }

  // Giai đoạn 1930 - 1945
  if (
    normalizedMessage.includes("1930 - 1945") ||
    normalizedMessage.includes("1930-1945") ||
    normalizedMessage.includes("dau tranh gianh chinh quyen") ||
    normalizedMessage.includes("xo viet nghe tinh") ||
    normalizedMessage.includes("cao trao dan chu") ||
    normalizedMessage.includes("cach mang thang tam") ||
    normalizedMessage.includes("tong khoi nghia") ||
    normalizedMessage.includes("khang nhat cuu nuoc")
  ) {
    return MOCK_RESPONSES.dauTranhGianhChinhQuyen;
  }

  // Giai đoạn 1945 - 1975
  if (
    normalizedMessage.includes("1945 - 1975") ||
    normalizedMessage.includes("1945-1975") ||
    normalizedMessage.includes("khang chien chong phap") ||
    normalizedMessage.includes("khang chien chong my") ||
    normalizedMessage.includes("dien bien phu") ||
    normalizedMessage.includes("giai phong mien nam") ||
    normalizedMessage.includes("thong nhat dat nuoc") ||
    normalizedMessage.includes("dai thang mua xuan 1975")
  ) {
    return MOCK_RESPONSES.khangChien;
  }

  // Giai đoạn 1975 - 2018
  if (
    normalizedMessage.includes("1975 - 2018") ||
    normalizedMessage.includes("1975-2018") ||
    normalizedMessage.includes("doi moi") ||
    normalizedMessage.includes("dai hoi vi") ||
    normalizedMessage.includes("qua do len chu nghia xa hoi") ||
    normalizedMessage.includes("cong nghiep hoa") ||
    normalizedMessage.includes("hien dai hoa") ||
    normalizedMessage.includes("hoi nhap quoc te")
  ) {
    return MOCK_RESPONSES.doiMoi;
  }

  // Tổng kết / ý nghĩa môn học
  if (
    normalizedMessage.includes("lich su dang") ||
    normalizedMessage.includes("y nghia mon hoc") ||
    normalizedMessage.includes("muc tieu mon hoc") ||
    normalizedMessage.includes("tong ket") ||
    normalizedMessage.includes("bai hoc kinh nghiem") ||
    normalizedMessage.includes("y nghia hoc tap")
  ) {
    return MOCK_RESPONSES.tongKet;
  }

  return MOCK_RESPONSES.default;
};
