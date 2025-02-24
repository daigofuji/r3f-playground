import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useState } from 'react'
import {
  OrbitControls,
  Text3D,
} from "@react-three/drei";
import './App.css'
import './RainbowMaterial';

function RainbowText() {
  // to prevent error 
  // Uncaught Error: R3F: Hooks can only be used within the Canvas component!

  const materialRef = useRef();
  useFrame((state, delta) => {
    if (materialRef.current) {
      materialRef.current.time += delta * 0.2;
    }
  });

  return (
    <Text3D
      font="/Russo_One.json"
      size={0.5}
      position={[-3, 0, 0]}
      curveSegments={32}
    >
      daigofujiwara.com
      <rainbowMaterial ref={materialRef} />
    </Text3D>
  );
}


function App() {
  return (
    <>
      <Canvas
        gl={{ antialias: true }}
        onCreated={({ gl }) => {
          gl.setClearColor('#d3d3d3'); // Set the background color to light gray
        }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight
          position={[0, 0, 25]}
          intensity={1}
        />
        <mesh position={[0, 0 ,0]}>
 
            <RainbowText />

        </mesh>
        <OrbitControls target={[0, 0, 0]}/>

      </Canvas>
    </>
  )
}

export default App
