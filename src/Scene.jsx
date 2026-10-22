import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useEffect } from 'react';
import { ContactShadows, Html, Line, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { assets } from './catalogue.js';

const blue = '#0a6bb6';
const metal = '#9aaeb8';
const steel = '#647985';

function Label({ children, position, selected = false }) {
  return <Html position={position} center distanceFactor={18} style={{ pointerEvents: 'none', whiteSpace: 'nowrap' }}>
    <div className={`scene-label ${selected ? 'scene-label--selected' : ''}`}>{children}</div>
  </Html>;
}

function Selectable({ id, selectedId, onSelect, children, position = [0, 0, 0], label, labelPosition, scale = 1 }) {
  const selected = selectedId === id;
  return <group position={position} scale={scale} onClick={(e) => { e.stopPropagation(); onSelect(id); }} onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = 'pointer'; }} onPointerOut={() => { document.body.style.cursor = 'auto'; }}>
    {children}
    {selected && <mesh position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[0.85, 1.02, 48]} /><meshBasicMaterial color={blue} transparent opacity={0.95} side={THREE.DoubleSide} />
    </mesh>}
    {label && <Label position={labelPosition || [0, 2, 0]} selected={selected}>{label}</Label>}
  </group>;
}

function Box({ position, size, color, ...props }) {
  return <mesh position={position} castShadow receiveShadow {...props}><boxGeometry args={size} /><meshStandardMaterial color={color} roughness={0.78} /></mesh>;
}
function Cylinder({ position, radiusTop, radiusBottom, height, color, radialSegments = 12, ...props }) {
  return <mesh position={position} castShadow receiveShadow {...props}><cylinderGeometry args={[radiusTop, radiusBottom, height, radialSegments]} /><meshStandardMaterial color={color} roughness={0.64} /></mesh>;
}
function Pipe({ start, end, radius = 0.035, color = steel }) {
  const from = new THREE.Vector3(...start), to = new THREE.Vector3(...end);
  const dir = new THREE.Vector3().subVectors(to, from);
  const mid = new THREE.Vector3().addVectors(from, to).multiplyScalar(0.5);
  return <mesh position={mid.toArray()} quaternion={new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.clone().normalize())} castShadow>
    <cylinderGeometry args={[radius, radius, dir.length(), 8]} /><meshStandardMaterial color={color} metalness={0.25} roughness={0.48} />
  </mesh>;
}

function Ground() {
  return <group>
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.2, 0]} receiveShadow><planeGeometry args={[27, 17]} /><meshStandardMaterial color="#e8edec" roughness={1} /></mesh>
    <gridHelper args={[26, 26, '#cbd6d7', '#d7dfe0']} position={[0, -0.18, 0]} />
    <mesh position={[0, -0.12, 0]} receiveShadow><boxGeometry args={[24.4, 0.18, 14.4]} /><meshStandardMaterial color="#f4f6f5" roughness={1} /></mesh>
    <Box position={[-5.85, -0.015, 0]} size={[5.6, 0.08, 5.7]} color="#e0e7e6" />
    <Box position={[3.7, -0.015, 0]} size={[9.2, 0.08, 5.8]} color="#e4e9e8" />
    <Box position={[-4.4, -0.005, -4.6]} size={[5.6, 0.08, 2.4]} color="#dce5e5" />
    <Box position={[5.5, -0.005, -4.4]} size={[6.1, 0.08, 2.9]} color="#dce5e5" />
    <Box position={[-7.8, -0.005, 3.9]} size={[2.5, 0.08, 2.0]} color="#e3e9e8" />
    <Box position={[8.2, -0.005, 3.4]} size={[2.8, 0.08, 2.4]} color="#e3e9e8" />
  </group>;
}

function Substation({ selectedId, onSelect }) {
  return <Selectable id="substation" selectedId={selectedId} onSelect={onSelect} position={[-7, 0, 0]} label="UTILITY SUBSTATION" labelPosition={[0, 3.25, 0]}>
    <Box position={[0, 0.08, 0]} size={[4.8, 0.16, 4.8]} color="#d3dedf" />
    {/* switchyard portal frames */}
    {[-1.7, -0.65, 0.4, 1.45].map((x, i) => <group key={x}>
      <Pipe start={[x, 0.2, -1.55]} end={[x, 2.2, -1.55]} radius={0.035} color="#718792" />
      <Pipe start={[x, 0.2, 0.05]} end={[x, 2.2, 0.05]} radius={0.035} color="#718792" />
      <Pipe start={[x, 2.2, -1.55]} end={[x, 2.2, 0.05]} radius={0.035} color="#718792" />
      <Pipe start={[x, 2.2, -0.75]} end={[x, 2.55, -0.75]} radius={0.055} color="#596f7a" />
      <Cylinder position={[x, 0.42, -0.75]} radiusTop={0.08} radiusBottom={0.1} height={0.5} color="#8ba5b0" />
    </group>)}
    <Pipe start={[-1.8, 2.25, -1.55]} end={[1.55, 2.25, -1.55]} radius={0.045} color="#b08e55" />
    <Pipe start={[-1.8, 2.25, 0.05]} end={[1.55, 2.25, 0.05]} radius={0.045} color="#b08e55" />
    <Box position={[-1.3, 0.7, 1.15]} size={[0.65, 1.25, 0.65]} color="#91a8b2" />
    <Box position={[-0.25, 0.7, 1.15]} size={[0.65, 1.25, 0.65]} color="#91a8b2" />
    <Box position={[0.8, 0.7, 1.15]} size={[0.65, 1.25, 0.65]} color="#91a8b2" />
    <Box position={[1.65, 0.45, 1.15]} size={[0.45, 0.75, 0.6]} color="#b7c7cc" />
  </Selectable>;
}

function Transformer({ selectedId, onSelect }) {
  return <Selectable id="transformer" selectedId={selectedId} onSelect={onSelect} position={[-4, 0, 0]} label="POWER TRANSFORMER" labelPosition={[0, 2.8, 0]}>
    <Box position={[0, 0.12, 0]} size={[2.35, 0.22, 2.7]} color="#b7c7ca" />
    <Box position={[0, 1.03, 0]} size={[1.45, 1.65, 1.7]} color="#a8bbc2" />
    <Box position={[0, 1.93, 0]} size={[1.12, 0.14, 1.35]} color="#748b95" />
    {[-0.58, -0.31, -0.04, 0.23, 0.5].map((x) => <Box key={x} position={[x, 1.05, 0.91]} size={[0.09, 1.2, 0.18]} color="#778f99" />)}
    {[-0.47, 0, 0.47].map((x, i) => <group key={x}>
      <Cylinder position={[x, 2.11, -0.42]} radiusTop={0.09} radiusBottom={0.14} height={0.45} color={i === 1 ? '#b78b48' : '#526d7a'} />
      <Cylinder position={[x, 2.4, -0.42]} radiusTop={0.055} radiusBottom={0.055} height={0.18} color="#7b9199" />
    </group>)}
    <Box position={[0.89, 1.04, -0.15]} size={[0.3, 1.22, 0.3]} color="#7d959d" />
    <Pipe start={[0.88, 1.5, -0.15]} end={[1.3, 1.7, -0.15]} radius={0.04} color="#647b85" />
    <Box position={[-0.95, 0.95, -0.3]} size={[0.22, 0.95, 0.95]} color="#8fa8b1" />
  </Selectable>;
}

function TransmissionTower({ selectedId, onSelect }) {
  return <Selectable id="transmission" selectedId={selectedId} onSelect={onSelect} position={[-1.1, 0, -0.05]} label="TRANSMISSION" labelPosition={[0, 4.4, 0]}>
    <Pipe start={[0, 0.1, 0]} end={[-0.8, 3.7, 0]} radius={0.045} color="#71858e" />
    <Pipe start={[0, 0.1, 0]} end={[0.8, 3.7, 0]} radius={0.045} color="#71858e" />
    <Pipe start={[-0.8, 3.7, 0]} end={[0.8, 3.7, 0]} radius={0.045} color="#71858e" />
    <Pipe start={[-0.48, 2.3, 0]} end={[0.48, 2.3, 0]} radius={0.035} color="#71858e" />
    <Pipe start={[-0.64, 1.6, 0]} end={[0.64, 1.6, 0]} radius={0.035} color="#71858e" />
    <Pipe start={[-0.8, 3.7, 0]} end={[0.48, 2.3, 0]} radius={0.025} color="#8da0a7" />
    <Pipe start={[0.8, 3.7, 0]} end={[-0.48, 2.3, 0]} radius={0.025} color="#8da0a7" />
    <Pipe start={[-0.64, 1.6, 0]} end={[0.48, 2.3, 0]} radius={0.025} color="#8da0a7" />
    <Pipe start={[0.64, 1.6, 0]} end={[-0.48, 2.3, 0]} radius={0.025} color="#8da0a7" />
    <Pipe start={[-1.45, 3.35, 0]} end={[1.45, 3.35, 0]} radius={0.045} color="#71858e" />
    <Pipe start={[-1.2, 3.0, 0]} end={[1.2, 3.0, 0]} radius={0.035} color="#71858e" />
    {[-1.35, -0.75, 0, 0.75, 1.35].map((x) => <Cylinder key={x} position={[x, 2.9, 0]} radiusTop={0.045} radiusBottom={0.045} height={0.45} color="#93aab1" />)}
  </Selectable>;
}

function BusbarYard({ selectedId, onSelect }) {
  return <Selectable id="busbar" selectedId={selectedId} onSelect={onSelect} position={[2.35, 0, 0.05]} label="BUSBAR & DISTRIBUTION" labelPosition={[0, 2.7, 0]}>
    <Box position={[0, 0.08, 0]} size={[3.6, 0.16, 3.4]} color="#d2dddf" />
    {[-1.25, -0.55, 0.15, 0.85, 1.25].map((x, i) => <group key={x}>
      <Cylinder position={[x, 0.58, -0.55]} radiusTop={0.08} radiusBottom={0.1} height={0.9} color="#93a9b0" />
      <Cylinder position={[x, 1.14, -0.55]} radiusTop={0.14} radiusBottom={0.14} height={0.16} color="#c3a56d" />
      <Cylinder position={[x, 0.58, 0.75]} radiusTop={0.08} radiusBottom={0.1} height={0.9} color="#93a9b0" />
      {i === 0 && <Box position={[-1.25, 0.75, 1.15]} size={[0.5, 1.2, 0.32]} color="#9baeb6" />}
    </group>)}
    <Pipe start={[-1.5, 1.25, -0.55]} end={[1.45, 1.25, -0.55]} radius={0.055} color="#b28e4f" />
    <Pipe start={[-1.5, 1.25, 0.75]} end={[1.45, 1.25, 0.75]} radius={0.055} color="#b28e4f" />
    <Box position={[1.35, 0.52, 1.1]} size={[0.7, 0.95, 0.4]} color="#a7bac0" />
  </Selectable>;
}

function Factory({ selectedId, onSelect }) {
  return <Selectable id="industry" selectedId={selectedId} onSelect={onSelect} position={[6, 0, 0]} label="INDUSTRIAL FACILITY" labelPosition={[0, 3.5, 0]}>
    <Box position={[0, 0.08, 0]} size={[4.6, 0.16, 4.2]} color="#d2dedf" />
    <Box position={[0, 1.2, 0]} size={[3.6, 2.2, 2.75]} color="#b8c9ce" />
    <mesh position={[0, 2.44, 0]} rotation={[0, 0, 0]} castShadow><coneGeometry args={[2.15, 0.8, 4]} /><meshStandardMaterial color="#7f959e" roughness={0.85} /></mesh>
    {[-1.05, -0.35, 0.35, 1.05].map((x) => <Box key={x} position={[x, 0.9, 1.39]} size={[0.38, 0.65, 0.035]} color="#6b8b9a" />)}
    <Box position={[0.85, 0.62, 1.43]} size={[0.62, 1.05, 0.12]} color="#8199a3" />
    <Cylinder position={[1.3, 2.8, -0.75]} radiusTop={0.28} radiusBottom={0.34} height={1.35} color="#a6b9c0" />
    <Cylinder position={[-1.15, 2.8, -0.65]} radiusTop={0.18} radiusBottom={0.25} height={1.2} color="#a6b9c0" />
    <Box position={[-1.25, 0.65, -1.55]} size={[0.95, 1.1, 0.8]} color="#95abb3" />
  </Selectable>;
}

function Motor({ selectedId, onSelect }) {
  return <Selectable id="motor" selectedId={selectedId} onSelect={onSelect} position={[7.45, 0, 2.7]} label="MOTOR & PUMP" labelPosition={[0, 1.8, 0]}>
    <Box position={[0, 0.12, 0]} size={[2.1, 0.2, 1.6]} color="#c7d5d8" />
    <Cylinder position={[-0.18, 0.75, 0]} radiusTop={0.55} radiusBottom={0.55} height={0.95} color="#608899" rotation={[0, 0, Math.PI / 2]} />
    {[-0.45, -0.25, -0.05, 0.15, 0.35].map((x) => <Cylinder key={x} position={[x, 0.75, 0]} radiusTop={0.58} radiusBottom={0.58} height={0.07} color="#7898a5" rotation={[0, 0, Math.PI / 2]} />)}
    <Cylinder position={[0.62, 0.75, 0]} radiusTop={0.18} radiusBottom={0.18} height={0.42} color="#b1c0c6" rotation={[0, 0, Math.PI / 2]} />
    <Box position={[-0.1, 1.28, 0]} size={[0.65, 0.18, 0.6]} color="#8da5ae" />
    <Pipe start={[-0.2, 0.75, 0.5]} end={[-0.2, 1.45, 0.5]} radius={0.035} color="#687f89" />
  </Selectable>;
}

function DigitalHub({ selectedId, onSelect }) {
  return <Selectable id="digital-hub" selectedId={selectedId} onSelect={onSelect} position={[1.3, 0, 4.25]} label="MOT-WARE & AI ANALYTICS" labelPosition={[0, 2.65, 0]}>
    <Box position={[0, 0.05, 0]} size={[2.7, 0.12, 1.8]} color="#d8e2e3" />
    <Box position={[0, 0.8, 0]} size={[1.75, 1.5, 0.3]} color="#8fa6b0" />
    <Box position={[0, 0.88, 0.17]} size={[1.42, 1.05, 0.035]} color="#263d49" />
    <Box position={[-0.38, 1.02, 0.195]} size={[0.42, 0.08, 0.02]} color="#63b4d9" />
    <Box position={[-0.38, 0.86, 0.195]} size={[0.42, 0.08, 0.02]} color="#77c1a5" />
    <Box position={[-0.38, 0.7, 0.195]} size={[0.42, 0.08, 0.02]} color="#d5b56d" />
    <Line points={[[0.0, 0.65, 0.205],[0.18,0.82,0.205],[0.32,0.77,0.205],[0.49,1.05,0.205],[0.64,0.96,0.205]]} color="#91d6ec" lineWidth={1.5} />
    <Box position={[0, 0.15, 0.05]} size={[0.65, 0.16, 0.65]} color="#849ba5" />
  </Selectable>;
}

function SmallBuilding({ id, title, pos, selectedId, onSelect, color = '#bdccd0', type = 'plain' }) {
  return <Selectable id={id} selectedId={selectedId} onSelect={onSelect} position={pos} label={title} labelPosition={[0, 1.8, 0]}>
    <Box position={[0, 0.06, 0]} size={[2.2, 0.12, 1.9]} color="#d5e0e1" />
    <Box position={[0, 0.78, 0]} size={[1.65, 1.42, 1.35]} color={color} />
    <mesh position={[0, 1.6, 0]} castShadow><coneGeometry args={[1.2, 0.5, 4]} /><meshStandardMaterial color="#8199a2" roughness={0.84} /></mesh>
    {type === 'lab' && <><Box position={[-0.35, 0.85, 0.695]} size={[0.36, 0.58, 0.04]} color="#6c8998" /><Box position={[0.33, 0.85, 0.695]} size={[0.36, 0.58, 0.04]} color="#6c8998" /></>}
    {type === 'academy' && <><Box position={[0, 0.72, 0.695]} size={[0.7, 0.7, 0.04]} color="#6c8998" /><Box position={[0, 0.25, 0.695]} size={[0.72, 0.08, 0.06]} color="#9eb2b8" /></>}
  </Selectable>;
}

function Chiller({ selectedId, onSelect }) {
  return <Selectable id="chiller" selectedId={selectedId} onSelect={onSelect} position={[6.2, 0, -4.5]} label="CHILLER MONITORING" labelPosition={[0, 1.7, 0]}>
    <Box position={[0, 0.55, 0]} size={[2.4, 1.05, 1.5]} color="#b9cbd0" />
    {[-0.72, 0, 0.72].map(x => <Cylinder key={x} position={[x, 0.58, 0.78]} radiusTop={0.31} radiusBottom={0.31} height={0.08} rotation={[Math.PI/2,0,0]} color="#7e9aa5" />)}
    <Pipe start={[-0.75, 1.1, -0.45]} end={[-0.75, 1.45, -0.45]} radius={0.05} color="#7d959e" />
  </Selectable>;
}

function WaterMeter({ selectedId, onSelect }) {
  return <Selectable id="water-meter" selectedId={selectedId} onSelect={onSelect} position={[3.6, 0, -4.45]} label="IoWM / WATER NETWORK" labelPosition={[0, 2.1, 0]}>
    <Box position={[0, 0.06, 0]} size={[2.2, 0.12, 1.6]} color="#d5e0e1" />
    <Cylinder position={[-0.35, 0.7, 0]} radiusTop={0.55} radiusBottom={0.55} height={1.18} color="#9fb4bb" />
    <Cylinder position={[-0.35, 1.34, 0]} radiusTop={0.38} radiusBottom={0.38} height={0.13} color="#667f8b" />
    <Pipe start={[-0.35, 0.4, -0.55]} end={[0.9, 0.4, -0.55]} radius={0.07} color="#6c9da9" />
    <Box position={[0.9, 0.57, -0.55]} size={[0.45, 0.4, 0.35]} color="#7fa8b0" />
  </Selectable>;
}

function Streetlights({ selectedId, onSelect }) {
  return <Selectable id="streetlight" selectedId={selectedId} onSelect={onSelect} position={[-8.0, 0, 3.85]} label="CITYLIGHT" labelPosition={[0, 2.8, 0]}>
    <Box position={[0, 0.06, 0]} size={[2.0, 0.12, 1.6]} color="#d5e0e1" />
    {[-0.55, 0.55].map(x => <group key={x}>
      <Cylinder position={[x, 1.18, 0]} radiusTop={0.045} radiusBottom={0.06} height={2.15} color="#718892" />
      <Pipe start={[x, 2.22, 0]} end={[x + 0.35, 2.4, 0]} radius={0.045} color="#718892" />
      <Box position={[x+0.38, 2.38, 0]} size={[0.35,0.12,0.24]} color="#d6cda6" />
    </group>)}
  </Selectable>;
}

function AccessGate({ selectedId, onSelect }) {
  const openRef = useRef();
  return <Selectable id="security-gate" selectedId={selectedId} onSelect={onSelect} position={[8.3, 0, 3.55]} label="ENTRANCE & ACCESS" labelPosition={[0, 2.3, 0]}>
    <Box position={[0, 0.05, 0]} size={[2.4, 0.12, 1.8]} color="#d5e0e1" />
    <Box position={[-0.82, 0.85, 0]} size={[0.18, 1.55, 0.18]} color="#728892" />
    <Box position={[0.82, 0.85, 0]} size={[0.18, 1.55, 0.18]} color="#728892" />
    <Box position={[0, 1.56, 0]} size={[1.8, 0.14, 0.18]} color="#728892" />
    <group ref={openRef} position={[0.06, 0.56, 0.1]}>
      <Box position={[0.3, 0.1, 0]} size={[0.8, 0.12, 0.12]} color="#d5a84b" />
    </group>
    <Box position={[-1.2, 0.4, 0.25]} size={[0.18, 0.72, 0.16]} color="#8ea3aa" />
  </Selectable>;
}

function CableRoute({ selectedId, onSelect }) {
  return <Selectable id="cable-network" selectedId={selectedId} onSelect={onSelect} position={[-0.9, 0, -3.25]} label="TELEMETRICS / CABLES" labelPosition={[0, 1.15, 0]}>
    <Box position={[0, 0.02, 0]} size={[4.5, 0.06, 1.35]} color="#cedbdc" />
    <Line points={[[-2,0.13,-0.3],[-1,0.13,0.1],[0.2,0.13,-0.15],[1.9,0.13,0.25]]} color="#b47d42" lineWidth={3} />
    <Line points={[[-2,0.16,0],[-1,0.16,0.38],[0.2,0.16,0.12],[1.9,0.16,0.55]]} color="#607f91" lineWidth={2} />
    <Box position={[-1.9,0.42,-0.25]} size={[0.45,0.62,0.45]} color="#8da5ae" />
  </Selectable>;
}

function AnimatedFlow() {
  const dots = useRef([]);
  const points = useMemo(() => [new THREE.Vector3(-4.0, 2.8, -0.3), new THREE.Vector3(-1.1, 3.5, 0), new THREE.Vector3(2.2, 2.4, 0.05), new THREE.Vector3(5.9, 1.75, 0.1)], []);
  const curve = useMemo(() => new THREE.CatmullRomCurve3(points), [points]);
  const dotPositions = useMemo(() => [0.12,0.36,0.6,0.84], []);
  useFrame((state) => { dots.current.forEach((mesh, i) => { if (mesh) { const t = (dotPositions[i] + state.clock.elapsedTime * 0.055) % 1; mesh.position.copy(curve.getPoint(t)); } }); });
  return <group>
    <Line points={points.map(p=>p.toArray())} color="#9acbe0" lineWidth={2} transparent opacity={0.85} />
    {dotPositions.map((t,i) => <mesh key={t} ref={el=>dots.current[i]=el}><sphereGeometry args={[0.075,12,12]}/><meshBasicMaterial color={blue}/></mesh>)}
  </group>;
}

function SceneContents({ selectedId, onSelect }) {
  return <>
    <color attach="background" args={['#f4f7f7']} />
    <fog attach="fog" args={['#f4f7f7', 23, 42]} />
    <ambientLight intensity={1.1} />
    <directionalLight position={[10, 18, 8]} intensity={2.2} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
    <directionalLight position={[-8, 10, -10]} intensity={0.7} color="#c4e4f2" />
    <Ground />
    <Substation selectedId={selectedId} onSelect={onSelect} />
    <Transformer selectedId={selectedId} onSelect={onSelect} />
    <TransmissionTower selectedId={selectedId} onSelect={onSelect} />
    <BusbarYard selectedId={selectedId} onSelect={onSelect} />
    <Factory selectedId={selectedId} onSelect={onSelect} />
    <Motor selectedId={selectedId} onSelect={onSelect} />
    <DigitalHub selectedId={selectedId} onSelect={onSelect} />
    <CableRoute selectedId={selectedId} onSelect={onSelect} />
    <SmallBuilding id="test-lab" title="TEST & MEASUREMENT LAB" pos={[-5.55,0,-4.45]} selectedId={selectedId} onSelect={onSelect} type="lab" />
    <SmallBuilding id="oil-lab" title="TRANSFORMER OIL LAB" pos={[-3.3,0,-4.45]} selectedId={selectedId} onSelect={onSelect} type="lab" color="#c6d3d7" />
    <Chiller selectedId={selectedId} onSelect={onSelect} />
    <WaterMeter selectedId={selectedId} onSelect={onSelect} />
    <Streetlights selectedId={selectedId} onSelect={onSelect} />
    <AccessGate selectedId={selectedId} onSelect={onSelect} />
    <SmallBuilding id="academy" title="MOTWANE ACADEMY" pos={[-8.05,0,-3.6]} selectedId={selectedId} onSelect={onSelect} type="academy" color="#c4d3d8" />
    <AnimatedFlow />
    <ContactShadows position={[0, -0.08, 0]} opacity={0.22} scale={26} blur={2.5} far={9} />
  </>;
}

function CameraAim({ selectedId, autoFocus }) {
  const controls = useRef();
  const { camera } = useThree();
  useEffect(() => {
    if (!autoFocus || !controls.current) return;
    const asset = assets.find((item) => item.id === selectedId);
    if (!asset) return;
    const target = new THREE.Vector3(asset.position[0], 0.65, asset.position[2]);
    const offset = new THREE.Vector3(8.2, 8.2, 9.2);
    camera.position.copy(target).add(offset);
    controls.current.target.copy(target);
    controls.current.update();
  }, [selectedId, autoFocus, camera]);
  return <OrbitControls ref={controls} makeDefault target={[0, 0.65, 0]} enableDamping dampingFactor={0.08} enablePan enableZoom minDistance={9} maxDistance={34} minPolarAngle={0.25} maxPolarAngle={Math.PI / 2.06} maxAzimuthAngle={Math.PI} minAzimuthAngle={-Math.PI} />;
}

export default function InfrastructureScene({ selectedId, onSelect, viewKey = 0, autoFocus = false }) {
  return <Canvas key={viewKey} shadows dpr={[1, 1.65]} camera={{ position: [14, 15.5, 17], fov: 37, near: 0.1, far: 80 }} gl={{ antialias: true, alpha: false }}>
    <SceneContents selectedId={selectedId} onSelect={onSelect} />
    <CameraAim selectedId={selectedId} autoFocus={autoFocus} />
  </Canvas>;
}
