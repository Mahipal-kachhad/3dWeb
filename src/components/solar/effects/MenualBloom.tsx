import * as THREE from "three";
import { Glow_Layer } from "../models/Son";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo } from "react";
import {
  EffectComposer,
  OutputPass,
  RenderPass,
  UnrealBloomPass,
} from "three/examples/jsm/Addons.js";

const glowLayer = new THREE.Layers();
glowLayer.set(Glow_Layer);

const darkMaterial = new THREE.MeshBasicMaterial({ color: "black" });
const materials: { [uuid: string]: THREE.Material | THREE.Material[] } = {};

const MenualBloom = () => {
  const { scene, camera, gl, size } = useThree();

  const composer = useMemo(() => {
    const effectComposer = new EffectComposer(gl);
    effectComposer.addPass(new RenderPass(scene, camera));

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(size.width, size.height),
      1.5,
      0.4,
      0.85
    );

    effectComposer.addPass(bloomPass);
    effectComposer.addPass(new OutputPass());

    return effectComposer;
  }, [scene, camera, gl, size]);

  useEffect(() => {
    composer.setSize(size.width, size.height);
  }, [composer, size, camera]);

  useFrame(() => {
    scene.traverse((obj) => {
      if (obj instanceof THREE.Mesh && !glowLayer.test(obj.layers)) {
        materials[obj.uuid] = obj.material;
        obj.material = darkMaterial;
      }
    });
    composer.render();

    scene.traverse((obj) => {
      if (obj instanceof THREE.Mesh && materials[obj.uuid]) {
        obj.material = materials[obj.uuid];
        delete materials[obj.uuid];
      }
    });
    camera.layers.enableAll();
  }, 1);
  return null;
};

export default MenualBloom;
