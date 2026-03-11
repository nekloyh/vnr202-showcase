import React, { useRef, useState, useEffect, useMemo } from 'react';
import { useFrame, extend } from '@react-three/fiber';
import { PerspectiveCamera, Environment, Text, Float, Outlines } from '@react-three/drei';
import * as THREE from 'three';
import { GAME_CONFIG } from '../gameConfig';

// --- Constants & Config (from centralized config) ---
const LANE_WIDTH = GAME_CONFIG.VISUAL.LANE_WIDTH;
const LANES = GAME_CONFIG.VISUAL.LANES;
const SEGMENT_LENGTH = GAME_CONFIG.VISUAL.SEGMENT_LENGTH;
const VIEW_DISTANCE = GAME_CONFIG.VISUAL.VIEW_DISTANCE;
const BASE_SPEED = GAME_CONFIG.WALL.BASE_SPEED;

// Neobrutal Palette
const COLORS = {
    BG: '#FAF7F0',            // Paper White
    GROUND: '#FFFFFF',        // Pure White
    GROUND_LINES: '#000000',  // Black Lines
    WALL_BASE: '#4D9DE0',     // Blue Wall
    WALL_STRIPES: '#000000',  // Black Stripes
    PLAYER: '#4A5D23',        // Military Green
    OBSTACLE: '#FFD400',      // Yellow
    TEXT: '#000000',
    OUTLINE: '#000000',
};

// --- Vietnamese Flag Texture (canvas-drawn with proper 5-pointed star) ---
function createVietnameseFlagTexture() {
    const w = 256, h = 170; // ~3:2 ratio matching VN flag
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');

    // Red background
    ctx.fillStyle = '#DA251D';
    ctx.fillRect(0, 0, w, h);

    // Yellow 5-pointed star centered
    ctx.fillStyle = '#FFCD00';
    ctx.beginPath();
    const cx = w / 2, cy = h / 2;
    const outerR = h * 0.35;
    const innerR = outerR * 0.38;
    for (let i = 0; i < 5; i++) {
        // Outer vertex
        const outerAngle = -Math.PI / 2 + (i * 2 * Math.PI) / 5;
        ctx.lineTo(cx + Math.cos(outerAngle) * outerR, cy + Math.sin(outerAngle) * outerR);
        // Inner vertex
        const innerAngle = outerAngle + Math.PI / 5;
        ctx.lineTo(cx + Math.cos(innerAngle) * innerR, cy + Math.sin(innerAngle) * innerR);
    }
    ctx.closePath();
    ctx.fill();

    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
}

// Singleton flag texture (shared across all tank instances)
let _flagTexture = null;
function getVietnameseFlagTexture() {
    if (!_flagTexture) _flagTexture = createVietnameseFlagTexture();
    return _flagTexture;
}

// Custom R3F material element for the Vietnamese flag
class VietnameseFlagMaterialImpl extends THREE.MeshBasicMaterial {
    constructor() {
        super({
            map: getVietnameseFlagTexture(),
            side: THREE.DoubleSide,
            toneMapped: false,
        });
    }
}

// Register <vietnameseFlagMaterial /> for R3F JSX
extend({ VietnameseFlagMaterial: VietnameseFlagMaterialImpl });

// --- Components ---

// Tank Player: Neo-brutalist blocky tank with blinking feedback
function Player({ laneIndex, feedback }) {
    const group = useRef();
    const body = useRef();
    const [currentX, setCurrentX] = useState(LANES[1]);

    useFrame((state, delta) => {
        if (!group.current) return;

        // Lane Lerp
        const targetX = LANES[laneIndex] !== undefined ? LANES[laneIndex] : LANES[1];

        // Snappier movement
        setCurrentX(prev => THREE.MathUtils.lerp(prev, targetX, 15 * delta));
        group.current.position.x = currentX;
        group.current.position.y = 0; // Ground level

        // Engine Vibration / procedural animation
        const time = state.clock.elapsedTime;
        const rumble = Math.sin(time * 30) * 0.05;

        // Blinking for wrong answer
        if (feedback?.type === 'WRONG') {
            // Fast blink every 0.1s
            const isVisible = Math.floor(time * 15) % 2 === 0;
            body.current.visible = isVisible;
        } else {
            body.current.visible = true;
        }

        if (body.current) {
            // Apply rumble when not dead/feedback-ing, or just basic bounce
            body.current.position.y = 1.0 + Math.abs(rumble);
            
            // Tilt forward slightly when running
            body.current.rotation.x = 0.1;
            // Tilt sideways when moving lanes
            const tilt = (targetX - currentX) * -0.15;
            body.current.rotation.z = THREE.MathUtils.lerp(body.current.rotation.z, tilt, 10 * delta);
        }
    });

    return (
        <group ref={group} position={[0, 0, 4]}>
            <group ref={body}>
                {/* Main Hull */}
                <mesh castShadow receiveShadow position={[0, 0, 0]}>
                    <boxGeometry args={[1.4, 1.2, 2.8]} />
                    <meshStandardMaterial color={COLORS.PLAYER} toneMapped={false} />
                    <Outlines thickness={0.05} color="black" />
                </mesh>

                {/* Left Track */}
                <mesh position={[-0.9, -0.4, 0]}>
                    <boxGeometry args={[0.4, 0.6, 3.2]} />
                    <meshStandardMaterial color="#2d2d2d" />
                    <Outlines thickness={0.05} color="black" />
                </mesh>

                {/* Right Track */}
                <mesh position={[0.9, -0.4, 0]}>
                    <boxGeometry args={[0.4, 0.6, 3.2]} />
                    <meshStandardMaterial color="#2d2d2d" />
                    <Outlines thickness={0.05} color="black" />
                </mesh>

                {/* Turret Base */}
                <mesh castShadow position={[0, 0.8, -0.2]}>
                    <boxGeometry args={[1.0, 0.6, 1.4]} />
                    <meshStandardMaterial color={COLORS.PLAYER} toneMapped={false} />
                    <Outlines thickness={0.05} color="black" />
                </mesh>

                {/* Cannon */}
                <mesh position={[0, 0.9, -1.5]} rotation={[Math.PI / 2, 0, 0]}>
                    <cylinderGeometry args={[0.15, 0.15, 2.0, 8]} />
                    <meshStandardMaterial color="#2d2d2d" />
                    <Outlines thickness={0.05} color="black" />
                </mesh>
                
                {/* Turret Hatch */}
                <mesh position={[0, 1.15, 0]}>
                    <cylinderGeometry args={[0.3, 0.3, 0.1, 8]} />
                    <meshStandardMaterial color="black" />
                </mesh>

                {/* === Vietnamese Flag Pole === */}
                {/* Pole — anchored on turret hatch center */}
                <mesh position={[0, 1.85, 0]}>
                    <cylinderGeometry args={[0.035, 0.04, 1.3, 8]} />
                    <meshStandardMaterial color="#4a4a4a" metalness={0.4} roughness={0.5} />
                </mesh>
                {/* Pole finial ball */}
                <mesh position={[0, 2.52, 0]}>
                    <sphereGeometry args={[0.06, 8, 8]} />
                    <meshStandardMaterial color="#c5a000" metalness={0.6} roughness={0.3} />
                </mesh>
                {/* Flag — canvas-textured with proper 5-pointed star */}
                <mesh position={[0.42, 2.32, 0]} rotation={[0, 0, 0]}>
                    <planeGeometry args={[0.8, 0.53]} />
                    <vietnameseFlagMaterial />
                </mesh>
            </group>

            {/* Shadow Blob */}
            <mesh position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[3.0, 4.0]} />
                <meshBasicMaterial color="black" opacity={0.3} transparent />
            </mesh>
        </group>
    );
}

// Iron Gate Colors
const IRON = {
    FRAME: '#1a1a1a',   // Near-black iron frame
    BAR: '#2a2a2a',     // Slightly lighter bars
    RING: '#333333',    // Decorative ring torus
    PILLAR: '#111111',  // Gate post pillars
};

// Single leaf of the iron gate (left or right half)
// leafWidth = half the gate opening width
// gateHeight = total height of the gate leaf
function IronGateLeaf({ leafWidth, gateHeight }) {
    const frameThick = 0.2;          // thickness of the outer frame bars
    const barRadius = 0.06;          // radius of vertical bars
    const barCount = 5;              // vertical bars per leaf
    const ringCount = 3;             // decorative rings per leaf
    const ringRadius = 0.28;         // radius of each ring torus
    const ringTube = 0.05;           // tube thickness of ring torus
    const innerW = leafWidth - frameThick * 2;
    const innerH = gateHeight - frameThick * 2;

    return (
        <group>
            {/* === Outer Frame === */}
            {/* Bottom rail */}
            <mesh position={[leafWidth / 2, 0, 0]}>
                <boxGeometry args={[leafWidth, frameThick, frameThick]} />
                <meshStandardMaterial color={IRON.FRAME} metalness={0.6} roughness={0.4} />
            </mesh>
            {/* Top rail */}
            <mesh position={[leafWidth / 2, gateHeight, 0]}>
                <boxGeometry args={[leafWidth, frameThick, frameThick]} />
                <meshStandardMaterial color={IRON.FRAME} metalness={0.6} roughness={0.4} />
            </mesh>
            {/* Hinge-side vertical (x=0) */}
            <mesh position={[frameThick / 2, gateHeight / 2, 0]}>
                <boxGeometry args={[frameThick, gateHeight, frameThick]} />
                <meshStandardMaterial color={IRON.FRAME} metalness={0.6} roughness={0.4} />
            </mesh>
            {/* Center-side vertical (x=leafWidth) */}
            <mesh position={[leafWidth - frameThick / 2, gateHeight / 2, 0]}>
                <boxGeometry args={[frameThick, gateHeight, frameThick]} />
                <meshStandardMaterial color={IRON.FRAME} metalness={0.6} roughness={0.4} />
            </mesh>

            {/* Mid-horizontal rail (at ~40% height for structure) */}
            <mesh position={[leafWidth / 2, gateHeight * 0.38, 0]}>
                <boxGeometry args={[leafWidth - frameThick * 2, frameThick * 0.6, frameThick * 0.6]} />
                <meshStandardMaterial color={IRON.FRAME} metalness={0.6} roughness={0.4} />
            </mesh>

            {/* === Vertical Bars === */}
            {Array.from({ length: barCount }).map((_, bi) => {
                const spacing = innerW / (barCount + 1);
                const bx = frameThick + spacing * (bi + 1);
                return (
                    <mesh key={`bar-${bi}`} position={[bx, gateHeight * 0.19, 0]} rotation={[0, 0, 0]}>
                        <cylinderGeometry args={[barRadius, barRadius, gateHeight * 0.62, 6]} />
                        <meshStandardMaterial color={IRON.BAR} metalness={0.5} roughness={0.5} />
                    </mesh>
                );
            })}

            {/* Upper section vertical bars (shorter, between mid-rail and top) */}
            {Array.from({ length: barCount }).map((_, bi) => {
                const spacing = innerW / (barCount + 1);
                const bx = frameThick + spacing * (bi + 1);
                const upperStart = gateHeight * 0.38;
                const upperEnd = gateHeight - frameThick;
                const upperH = upperEnd - upperStart;
                return (
                    <mesh key={`ubar-${bi}`} position={[bx, upperStart + upperH / 2, 0]}>
                        <cylinderGeometry args={[barRadius, barRadius, upperH, 6]} />
                        <meshStandardMaterial color={IRON.BAR} metalness={0.5} roughness={0.5} />
                    </mesh>
                );
            })}

            {/* === Decorative Ring Toruses along top row === */}
            {Array.from({ length: ringCount }).map((_, ri) => {
                const spacing = innerW / (ringCount + 1);
                const rx = frameThick + spacing * (ri + 1);
                const ry = gateHeight * 0.78;
                return (
                    <mesh key={`ring-${ri}`} position={[rx, ry, 0]} rotation={[0, 0, 0]}>
                        <torusGeometry args={[ringRadius, ringTube, 8, 16]} />
                        <meshStandardMaterial color={IRON.RING} metalness={0.5} roughness={0.4} />
                    </mesh>
                );
            })}

            {/* === Curved Arch Top Rail (half-torus arc) === */}
            <mesh position={[leafWidth / 2, gateHeight + 0.15, 0]} rotation={[0, 0, 0]}>
                <torusGeometry args={[leafWidth / 2 - frameThick, frameThick * 0.5, 6, 16, Math.PI]} />
                <meshStandardMaterial color={IRON.FRAME} metalness={0.6} roughness={0.4} />
            </mesh>
        </group>
    );
}

// Answer Gate: Wrought-iron double-leaf gate per lane
const AnswerWall = React.memo(({ id, startZ, speed, wallBoost = 1, onCollide, onDespawn, playerLane, question }) => {
    const ref = useRef();
    const hasHit = useRef(false);
    const gateRefs = useRef([]);
    const playerLaneRef = useRef(playerLane);

    useEffect(() => {
        playerLaneRef.current = playerLane;
    }, [playerLane]);

    useFrame((state, delta) => {
        if (!ref.current) return;

        const effectiveSpeed = speed * wallBoost;
        ref.current.position.z += effectiveSpeed * delta;
        const currentZ = ref.current.position.z;

        if (!hasHit.current) {
            if (Math.abs(currentZ - GAME_CONFIG.WALL.PLAYER_Z) < GAME_CONFIG.WALL.COLLISION_THRESHOLD) {
                hasHit.current = true;
                onCollide(id, playerLaneRef.current);
            }
        }

        // Animate gate opening — swing both leaves outward
        if (hasHit.current && question) {
            const correctLaneIndex = question.answerIndex;
            if (playerLaneRef.current === correctLaneIndex && gateRefs.current[correctLaneIndex]) {
                const gateGroup = gateRefs.current[correctLaneIndex];
                gateGroup.children.forEach(child => {
                    if (child.name === 'leftHinge') {
                        child.rotation.y = THREE.MathUtils.lerp(child.rotation.y, Math.PI / 2, 8 * delta);
                    } else if (child.name === 'rightHinge') {
                        child.rotation.y = THREE.MathUtils.lerp(child.rotation.y, -Math.PI / 2, 8 * delta);
                    } else if (child.name === 'gateText') {
                        child.scale.setScalar(THREE.MathUtils.lerp(child.scale.x, 0, 15 * delta));
                    }
                });
            }
        }

        if (currentZ > GAME_CONFIG.WALL.DESPAWN_Z) {
            onDespawn(id);
        }
    });

    const GATE_W = 3.0;   // half-width per leaf
    const GATE_H = 6.0;   // gate height

    return (
        <group ref={ref} position={[0, 0, startZ]}>
            {/* Connecting top bar across all lanes */}
            <mesh position={[0, 7.2, 0]}>
                <boxGeometry args={[34, 0.5, 0.4]} />
                <meshStandardMaterial color={IRON.FRAME} metalness={0.6} roughness={0.4} />
            </mesh>

            {LANES.map((laneX, i) => (
                <group key={i} position={[laneX, 0, 0]}>
                    {/* Stone/concrete gate post pillars */}
                    <mesh position={[-3.4, 3.5, 0]}>
                        <boxGeometry args={[0.6, 7.5, 0.6]} />
                        <meshStandardMaterial color="#3a3a3a" metalness={0.3} roughness={0.7} />
                        <Outlines thickness={0.06} color="black" />
                    </mesh>
                    <mesh position={[3.4, 3.5, 0]}>
                        <boxGeometry args={[0.6, 7.5, 0.6]} />
                        <meshStandardMaterial color="#3a3a3a" metalness={0.3} roughness={0.7} />
                        <Outlines thickness={0.06} color="black" />
                    </mesh>
                    {/* Pillar caps */}
                    <mesh position={[-3.4, 7.35, 0]}>
                        <boxGeometry args={[0.8, 0.3, 0.8]} />
                        <meshStandardMaterial color="#2a2a2a" />
                    </mesh>
                    <mesh position={[3.4, 7.35, 0]}>
                        <boxGeometry args={[0.8, 0.3, 0.8]} />
                        <meshStandardMaterial color="#2a2a2a" />
                    </mesh>

                    {/* Double-leaf iron gate */}
                    <group
                        position={[0, 0, 0]}
                        ref={el => gateRefs.current[i] = el}
                    >
                        {/* Left leaf — hinge on left pillar edge, opens outward */}
                        <group name="leftHinge" position={[-3.1, 0, 0]}>
                            <IronGateLeaf leafWidth={GATE_W} gateHeight={GATE_H} />
                        </group>

                        {/* Right leaf — mirrored: hinge on right pillar edge */}
                        <group name="rightHinge" position={[3.1, 0, 0]} scale={[-1, 1, 1]}>
                            <IronGateLeaf leafWidth={GATE_W} gateHeight={GATE_H} />
                        </group>

                        {/* Lane letter overlay */}
                        <Text
                            name="gateText"
                            position={[0, 3.0, 0.3]}
                            fontSize={3.5}
                            color="white"
                            font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
                            anchorX="center"
                            anchorY="middle"
                            outlineWidth={0.15}
                            outlineColor="black"
                        >
                            {['A', 'B', 'C', 'D'][i]}
                        </Text>
                    </group>
                </group>
            ))}
        </group>
    );
});

// Neobrutal Environment
function NeobrutalEnvironment({ speed }) {
    // Procedural Road Texture (Dashed Lines + Curbs)
    const roadTexture = useMemo(() => {
        const canvas = document.createElement('canvas');
        canvas.width = 1024;
        // ... (content matches exactly, just removing floorRef)

        canvas.height = 1024;
        const ctx = canvas.getContext('2d');

        // 1. Base Ground
        ctx.fillStyle = COLORS.GROUND; // White
        ctx.fillRect(0, 0, 1024, 1024);

        // 2. Center Lane Markers (3 lines for 4 lanes)
        // Lanes are roughly split into 4 quarters. 
        // 25%, 50%, 75% width.
        ctx.fillStyle = '#1a1a1a'; // Dark Grey for contrast, not pure black

        const drawDashedLine = (x) => {
            const dashHeight = 120;
            const gapHeight = 100;
            for (let y = 0; y < 1024; y += (dashHeight + gapHeight)) {
                ctx.fillRect(x - 6, y, 12, dashHeight); // 12px wide dash
            }
        };

        drawDashedLine(256); // 25%
        drawDashedLine(512); // 50%
        drawDashedLine(768); // 75%

        // 3. Side Curbs (Warning Stripes)
        // Left Curb
        ctx.fillStyle = COLORS.WALL_BASE; // Blue accent
        ctx.fillRect(0, 0, 64, 1024);
        ctx.fillStyle = 'black';
        ctx.fillRect(64, 0, 8, 1024); // Inner border

        // Right Curb
        ctx.fillStyle = COLORS.WALL_BASE;
        ctx.fillRect(1024 - 64, 0, 64, 1024);
        ctx.fillStyle = 'black';
        ctx.fillRect(1024 - 72, 0, 8, 1024); // Inner border

        const tex = new THREE.CanvasTexture(canvas);
        tex.wrapS = THREE.RepeatWrapping;
        tex.wrapT = THREE.RepeatWrapping;
        // Anisotropy helps dashed lines look sharp at distance
        tex.anisotropy = 16;
        return tex;
    }, []);

    useFrame((state, delta) => {
        // Scroll texture logic
        // scale of speed needs to be adjusted for texture UV (0-1)
        // speed ~30 units/sec. Segment length ~100? 
        // Let's just scroll based on arbitrary visual feel.
        if (roadTexture) {
            // Negative Y moves "forward" visually on a floor plane mapped this way usually
            roadTexture.offset.y -= (speed * delta) * 0.05;
        }
    });

    return (
        <group>
            {/* The Road Plane */}
            {/* Width: 24 units (covers -12 to 12). Height: 400 (depth) */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, -50]} receiveShadow>
                {/* 
                  Plane args: [width, height, widthSegments, heightSegments] 
                  Using 32 width covers our 4 lanes (-6, -2, 0, 2, 6) broadly 
                */}
                <planeGeometry args={[32, 400]} />
                <meshStandardMaterial
                    map={roadTexture}
                    roughness={0.8}
                    metalness={0.1}
                />
            </mesh>

            {/* Distant Decoration / Walls (Simplified for new road look) */}
            {[-1, 1].map(side => (
                <mesh key={side} position={[side * 28, 10, -50]} rotation={[0, 0, 0]}>
                    <boxGeometry args={[20, 40, 400]} />
                    <meshStandardMaterial color={COLORS.BG} />
                    {/* Just simple big blocks to frame the fog */}
                    <Outlines thickness={0.1} color="black" />
                </mesh>
            ))}
        </group>
    );
}

export default function Runner3DScene({ 
    activeQuestion, 
    onWallHit, 
    playerLane, 
    gameSpeed = 1, 
    wallBoost = 1, 
    spawnSignal,
    questionTimeLimit = GAME_CONFIG.TIMING.QUESTION_TIME_LIMIT,
    feedback 
}) {
    const [walls, setWalls] = useState([]);
    const lastSpawnedQuestionRef = useRef(null);

    // Calculate dynamic wall speed based on question time limit
    const wallSpeed = useMemo(() => {
        return GAME_CONFIG.WALL.calculateSpeed(questionTimeLimit);
    }, [questionTimeLimit]);

    useEffect(() => {
        // Check if we have a new spawn signal and a valid question
        // Also ensure we don't spawn duplicate walls for the same question
        if (spawnSignal && activeQuestion && activeQuestion.id !== lastSpawnedQuestionRef.current) {
            const id = Date.now();
            lastSpawnedQuestionRef.current = activeQuestion.id;
            setWalls(prev => [
                ...prev,
                { id, startZ: GAME_CONFIG.WALL.SPAWN_Z, question: activeQuestion, speed: wallSpeed }
            ]);
        }
    }, [spawnSignal, activeQuestion, wallSpeed]);

    const handleDespawn = (id) => {
        setWalls(prev => prev.filter(w => w.id !== id));
    };

    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 12, 22]} fov={50} rotation={[-0.4, 0, 0]} />

            {/* Flat Lighting for Neobrutal check */}
            <ambientLight intensity={1.2} />
            <directionalLight position={[10, 20, 10]} intensity={1.5} castShadow />
            <color attach="background" args={[COLORS.BG]} />
            <fog attach="fog" args={[COLORS.BG, 100, 290]} />

            <NeobrutalEnvironment speed={BASE_SPEED * gameSpeed} />

            <Player laneIndex={playerLane} feedback={feedback} />

            {walls.map(wall => (
                <AnswerWall
                    key={wall.id}
                    id={wall.id}
                    startZ={wall.startZ}
                    speed={wall.speed * gameSpeed}
                    wallBoost={wallBoost}
                    onCollide={onWallHit}
                    onDespawn={handleDespawn}
                    playerLane={playerLane}
                    question={wall.question}
                />
            ))}
        </>
    );
}
