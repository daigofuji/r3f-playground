/* eslint-disable react/prop-types */
import * as THREE from 'three'
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useMemo } from 'react'
import { OrbitControls, Text3D, Center } from "@react-three/drei";
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import './App.css'
import './assets/RainbowMaterial';

const rainbowColors = [
  '#E40303',
  '#FF8C00',
  '#FFE500',
  '#008026',
  '#004DFF',
  '#732682'
];

function RainbowText({ text }) {
  const materialRef = useRef();
  const textRef = useRef();
  const { size } = useThree();

  // useFrame in R3F is a hook that runs every frame rendered, similar to a render loop.
  // You receive the state (useThree) and a clock delta https://r3f.docs.pmnd.rs/api/hooks#useframe
  useFrame((state, delta) => {
    if (materialRef.current) {
      materialRef.current.time += delta * 0.3;
    }
    if (textRef.current) {
      // textRef.current.rotation.y += delta * 0.1;
      textRef.current.position.z = Math.sin(state.clock.elapsedTime) * 0.4;
    }
  });

  return (
    <Center>
      <Text3D
        ref={textRef}
        font="/Russo_One.json"
        size={size.width > 1000 ? 0.5 : 0.3}
        curveSegments={32}
      >
        {text}
        <rainbowMaterial ref={materialRef} metalness={1} roughness={1} />
      </Text3D>
    </Center>

  );
}


function Swarm({ count, dummy = new THREE.Object3D() }) {
  // from https://codesandbox.io/p/sandbox/qpfgyp
  const mesh = useRef();
  const light = useRef();
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.02 + Math.random() / 200;
      const xFactor = -50 + Math.random() * 100;
      const yFactor = -50 + Math.random() * 100;
      const zFactor = -50 + Math.random() * 100;
      const color = new THREE.Color(rainbowColors[Math.floor(Math.random() * rainbowColors.length)]);
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0, color });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    light.current.position.set(
      (-state.mouse.x * state.viewport.width) / 5,
      (-state.mouse.y * state.viewport.height) / 5,
      0
    );
    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor, color } = particle;
      t = particle.t += speed / 2;
      const a = Math.cos(t) + Math.sin(t * 1) / 10;
      const b = Math.sin(t) + Math.cos(t * 2) / 10;
      const s = Math.cos(t);
      particle.mx += (state.mouse.x * 1000 - particle.mx) * 0.01;
      particle.my += (state.mouse.y * 1000 - 1 - particle.my) * 0.01;
      dummy.position.set(
        (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
        (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
        (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
      );
      dummy.scale.setScalar(s);
      dummy.rotation.set(s * 5, s * 5, s * 5);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
      mesh.current.setColorAt(i, color);
    })
    mesh.current.instanceMatrix.needsUpdate = true;
    mesh.current.instanceColor.needsUpdate = true;
  });
  return (
    <>
      <ambientLight ref={light} intensity={1} />
      {/* <pointLight ref={light} distance={40} intensity={20} color="white" /> */}
      <instancedMesh ref={mesh} args={[null, null, count]}>
        <sphereGeometry 
          args={[0.3]}
        />
        <meshStandardMaterial
          vertexColors={THREE.VertexColors}
          metalness={1}
          roughness={0.5}
          opacity={1}
          transparent
        />
      </instancedMesh>
    </>
  );
}

function App() {
  return (
    <>
      <Canvas>
        <ambientLight intensity={0.1} />
        <directionalLight
          position={[50, 50, 50]}
          intensity={20}
        />
        <directionalLight
          position={[-50, -50, -50]}
          intensity={10}
        />
        <mesh>
          <RainbowText text="daigofujiwara.com" />
          <Swarm count={1000} />
        </mesh>
        <OrbitControls target={[0, 0, 0]}/>
        <EffectComposer>
          <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.9} height={300} opacity={0.5} />
        </EffectComposer>
      </Canvas>
    </>
  )
}

export default App
