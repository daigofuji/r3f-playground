import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useEffect, useState } from 'react'
import { OrbitControls, Text3D } from "@react-three/drei";
import './App.css'
import './RainbowMaterial';

function RainbowText({ text }) {
  const materialRef = useRef();
  const textRef = useRef();
  const { size } = useThree();
  const [textSize, setTextSize] = useState(0.5);
  const [textPosition, setTextPosition] = useState([0, 0, 0]);

  // Center the text based on its size
  useEffect(() => {
    if (textRef.current) {
      textRef.current.geometry.computeBoundingBox();
      const textRefWidth = textRef.current.geometry.boundingBox.max.x - textRef.current.geometry.boundingBox.min.x;
      const textRefHeight = textRef.current.geometry.boundingBox.max.y - textRef.current.geometry.boundingBox.min.y;
      setTextSize(size.width * 0.0004);
      setTextPosition([-textRefWidth / 2, -textRefHeight / 2, 0]);
    }
  }, [size.width]);

  // useFrame in R3F is a hook that runs every frame rendered, similar to a render loop.
  // You receive the state (useThree) and a clock delta https://r3f.docs.pmnd.rs/api/hooks#useframe
  useFrame((state, delta) => {
    if (materialRef.current) {
      materialRef.current.time += delta * 0.3;
    }
    if (textRef.current) {
      textRef.current.position.z = Math.sin(state.clock.elapsedTime) * 0.4;
    }
  });

  return (
    <group position={[0, 0, 0]}>

      <group position={textPosition}>
        <Text3D
          ref={textRef}
          font="/Russo_One.json"
          size={textSize}
          curveSegments={32}
        >
          {text}
          <rainbowMaterial ref={materialRef} metalness={1} roughness={1} />
        </Text3D>
      </group>
    </group>
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
        <mesh position={[0, 0 ,0]}>
          <RainbowText text="daigofujiwara.com" />
        </mesh>
        <OrbitControls target={[0, 0, 0]}/>
      </Canvas>
    </>
  )
}

export default App
