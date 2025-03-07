import * as THREE from 'three';
import { extend } from '@react-three/fiber';

class RainbowMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        time: { value: 0 },
        metalness: { value: 1.0 },
        roughness: { value: 0.5 },
        lightPosition: { value: new THREE.Vector3(10, 10, 10) },
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          vUv = uv;
          vNormal = normalize(normalMatrix * normal);
          vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform float metalness;
        uniform float roughness;
        uniform vec3 lightPosition;
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vPosition;

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
          color = mix(color, vec3(1.0), 0.2); // Blend with white to reduce saturation

          // Calculate lighting
          vec3 lightDir = normalize(lightPosition - vPosition);
          float lightIntensity = max(dot(vNormal, lightDir), 0.0);

          // Darken the sides
          float sideDarkening = 0.3 + 0.5 * lightIntensity; // Adjust  darkening effect
          color *= sideDarkening;

          // Calculate specular highlights
          vec3 viewDir = normalize(-vPosition);
          vec3 halfDir = normalize(lightDir + viewDir);
          float specAngle = max(dot(vNormal, halfDir), 0.0);
          float specular = pow(specAngle, 16.0); // Adjust shininess

          vec3 finalColor = color + vec3(specular);
          gl_FragColor = vec4(finalColor, 1.0);
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

  get metalness() {
    return this.uniforms.metalness.value;
  }

  set metalness(value) {
    this.uniforms.metalness.value = value;
  }

  get roughness() {
    return this.uniforms.roughness.value;
  }

  set roughness(value) {
    this.uniforms.roughness.value = value;
  }

  get lightPosition() {
    return this.uniforms.lightPosition.value;
  }

  set lightPosition(value) {
    this.uniforms.lightPosition.value = value;
  }
}

extend({ RainbowMaterial });