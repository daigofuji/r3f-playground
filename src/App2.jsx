import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from 'react'
import { OrbitControls, Center } from "@react-three/drei";
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
      ref.current.rotation.y += delta * 0.1; // Adjust the rotation speed here
    }
  });

  return (
    <mesh ref={ref}>
      <Sagarifuji />
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
          <RotatingSagarifuji  position={[0, 0, -1]}/>
          <Fujiwara position={[0, 2, -5]}/>
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
