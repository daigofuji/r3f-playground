import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useState } from 'react'
import { Center } from "@react-three/drei";
import { Bloom, EffectComposer, Vignette } from '@react-three/postprocessing'
import { easing } from 'maath';

import './App2.css'
// import './assets/RainbowMaterial';

import { Sagarifuji } from './assets/Sagarifuji';
import { Fujiwara } from './assets/Fujiwara';

function RotatingSagarifuji() {
  const ref = useRef();

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.2; // Adjust the rotation speed here
    }
  });

  return (
    <mesh ref={ref}   position={[0, 0, -1]}>
      <Sagarifuji />
    </mesh>
  );
}

function ClickableFujiwara() {
  const rainbowColors = [
    '#ffffff',
    '#E40303',
    '#FF8C00',
    '#FFE500',
    '#008026',
    '#004DFF',
    '#732682'
  ];
  const [color, setColor] = useState(rainbowColors[0]);
  const ref = useRef();


  const handleClick = () => {
    // get the index of the color and pick next color in the array
    const currentIndex = rainbowColors.indexOf(color);
    const nextIndex = (currentIndex + 1) % rainbowColors.length;
    setColor(rainbowColors[nextIndex]);

    // console.log('Fujiwara clicked!');
  };

  const handlePointerOver = () => {
    document.body.style.cursor = 'pointer';
  };

  const handlePointerOut = () => {
    document.body.style.cursor = 'auto';
  };

  return (
    <mesh
      ref={ref}
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      position={[0, 2, -2]}
    >
      <Fujiwara color={color} />
    </mesh>
  );
}

function CameraRig() {
  useFrame((state, delta) => {
    easing.damp3(state.camera.position, [-1 + (state.pointer.x * state.viewport.width) / 3, (1 + state.pointer.y) / 2, 5.5], 0.5, delta)
    state.camera.lookAt(0, 0, 0)
  })
}

function App() {
  return (
    <>
      <Canvas>
        <ambientLight intensity={1.5} />

        <directionalLight
          position={[10, 10, 15]}
          intensity={2}
          castShadow
        />

        <directionalLight
          position={[-10, -10, -15]}
          intensity={0.5}
          castShadow
        />
        <Center>
          <RotatingSagarifuji/>
          <ClickableFujiwara />
        </Center>

        <EffectComposer>
          <Bloom luminanceThreshold={0.95} luminanceSmoothing={0.5} height={300} />
          <Vignette eskil={true} offset={0.1} darkness={0.3} />
        </EffectComposer>
        <CameraRig />
      </Canvas>
      <div className="text">
        Welcome to fujiwaras.com, home of Fujiwara clan.
      </div>
    </>
  )
}

export default App
