import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useEffect, useState } from 'react'
import { OrbitControls, Text3D, Center } from "@react-three/drei";
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import './App.css'
import './RainbowMaterial';

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


function App() {
  return (
    <>
      <Canvas>
        <directionalLight
          position={[10, 10, 10]}
          intensity={1}
          castShadow
        />
        <mesh>
          <RainbowText text="daigofujiwara.com" />
        </mesh>
        <OrbitControls target={[0, 0, 0]}/>
        <EffectComposer>
          <Bloom luminanceThreshold={0.3} luminanceSmoothing={0.9} height={300} opacity={0.5} />
        </EffectComposer>
      </Canvas>
    </>
  )
}

export default App
