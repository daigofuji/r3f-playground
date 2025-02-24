import * as THREE from 'three';
import { extend } from '@react-three/fiber';

class RainbowMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        time: { value: 0 },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        varying vec2 vUv;

        vec3 getColor(float t) {
          if (t < 0.166) return vec3(0.894, 0.012, 0.012); // Red
          else if (t < 0.332) return vec3(1.0, 0.549, 0.0); // Orange
          else if (t < 0.498) return vec3(1.0, 0.929, 0.0); // Yellow
          else if (t < 0.664) return vec3(0.0, 0.502, 0.149); // Green
          else if (t < 0.83) return vec3(0.0, 0.298, 1.0); // Indigo
          else return vec3(0.451, 0.161, 0.51); // Violet
        }

        void main() {
          float t = mod(vUv.x + time * 0.1, 1.0);
          vec3 color = getColor(t);
          color = mix(color, vec3(1.0), 0.3); // Blend with white to reduce saturation
          gl_FragColor = vec4(color, 1); // Set opacity to 0.8
        }
      `,
    });
  }

  get time() {
    return this.uniforms.time.value;
  }

  set time(value) {
    this.uniforms.time.value = value;
  }
}

extend({ RainbowMaterial });