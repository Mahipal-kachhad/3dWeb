import { useRef, useMemo, JSX } from "react";
import * as THREE from "three";

const PremiumShaderStars = (props: JSX.IntrinsicElements["points"]) => {
  const pointsRef = useRef<THREE.Points>(null);

  const starTexture = useMemo(() => {
    const size = 256;
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    ctx.clearRect(0, 0, size, size);
    const center = size / 2;
    const radius = size / 2;
    const gradient = ctx.createRadialGradient(
      center, center, 0,
      center, center, radius
    );
    
    gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
    gradient.addColorStop(0.2, "rgba(255, 255, 255, 1)");
    gradient.addColorStop(0.25, "rgba(255, 255, 255, 0.9)");
    gradient.addColorStop(0.4, "rgba(255, 255, 255, 0.7)");
    gradient.addColorStop(0.6, "rgba(255, 255, 255, 0.4)");
    gradient.addColorStop(0.8, "rgba(255, 255, 255, 0.2)");
    gradient.addColorStop(0.9, "rgba(255, 255, 255, 0.1)");
    gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(center, center, radius, 0, Math.PI * 2);
    ctx.fill();

    const texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.generateMipmaps = true;
    return texture;
  }, []);

  const WHITE_COLOR = new THREE.Color(1, 1, 1);

  const { positions, sizes } = useMemo(() => {
    const starCount = 4000;
    const boxSize = 10;
    const zBoxSize = boxSize * 1.5;
    const positions = new Float32Array(starCount * 3);
    const sizes = new Float32Array(starCount);

    for (let i = 0; i < starCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * boxSize;
      positions[i * 3 + 1] = (Math.random() - 0.5) * boxSize;
      positions[i * 3 + 2] = (Math.random() - 0.5) * zBoxSize;
      sizes[i] = Math.random() * 0.05 + 0.03;
    }

    return { positions, sizes };
  }, []);

  return (
    <points ref={pointsRef} {...props}>
      <bufferGeometry>
        <bufferAttribute 
          attach="attributes-position" 
          args={[positions, 3]} 
        />
        <bufferAttribute 
          attach="attributes-size" 
          args={[sizes, 1]} 
        />
      </bufferGeometry>
      <pointsMaterial
        map={starTexture}
        color={WHITE_COLOR}
        size={0.06}
        sizeAttenuation={true}
        transparent={true}
        alphaTest={0.01}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

export default PremiumShaderStars;