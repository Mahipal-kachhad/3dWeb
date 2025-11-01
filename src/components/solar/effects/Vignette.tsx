import { useFrame } from "@react-three/fiber";
import { JSX, useRef, forwardRef, useImperativeHandle } from "react";
import * as THREE from "three";

export interface VignetteHandle {
  uniforms: {
    vignetteStrength: { value: number };
    vignetteShrink: { value: number };
  };
}

const Vignette = forwardRef<VignetteHandle, JSX.IntrinsicElements["mesh"]>(
  (props, ref) => {
    const vignetteRef = useRef<THREE.Mesh>(null!);
    const materialRef = useRef<THREE.ShaderMaterial>(null!);

    const uniforms = useRef({
      time: { value: 0 },
      vignetteStrength: { value: 1.0 },
      vignetteShrink: { value: 0.0 },
    });

    useImperativeHandle(ref, () => ({
      uniforms: uniforms.current,
    }));

    useFrame((state) => {
      if (materialRef.current) {
        uniforms.current.time.value = state.clock.elapsedTime;
      }
    });

    const vignetteShader: THREE.ShaderMaterialParameters = {
      uniforms: uniforms.current,
      vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
      fragmentShader: `
      uniform float vignetteStrength;
      uniform float vignetteShrink;
      varying vec2 vUv;
      
      void main() {
        vec2 uv = vUv;
        uv -= 0.5; // Center coordinates
        
        // Apply shrink effect
        uv *= (1.0 + vignetteShrink * 0.5);
        uv += 0.5; // Move back
        
        // Calculate distance from center
        float dist = distance(uv, vec2(0.5, 0.5));
        
        // Create vignette effect
        float vignette = 1.0 - dist * vignetteStrength * (2.0 - vignetteShrink);
        vignette = smoothstep(0.0, 1.0, vignette);
        
        // Final color (black vignette)
        vec3 color = vec3(0.0, 0.0, 0.0);
        float alpha = 1.0 - vignette;
        
        gl_FragColor = vec4(color, alpha * (0.8 + vignetteShrink * 0.2));
      }
    `,
      transparent: true,
      depthWrite: false,
    };

    return (
      <mesh ref={vignetteRef} {...props}>
        <planeGeometry args={[20, 20, 1, 1]} />
        <shaderMaterial ref={materialRef} {...vignetteShader} />
      </mesh>
    );
  }
);

export default Vignette;
