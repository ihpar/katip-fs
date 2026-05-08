import React, { useEffect, useRef } from "react";

import * as THREE from "three";
import WebGL from "./score/WebGL";

const ThreeTest = () => {
  const parentRef = useRef<HTMLDivElement>(null);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, 500 / 500, 0.1, 1000);

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(500, 500);
  useEffect(() => {
    parentRef.current?.appendChild(renderer.domElement);
    if (WebGL.isWebGLAvailable()) {
      console.log("webgl ok");
    } else {
      console.log("No webgl");
    }
  });

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  camera.position.z = 5;

  function animate() {
    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
  }

  animate();

  return (
    <div ref={parentRef} style={{ width: 500, height: 500 }} />
  );
};

export default ThreeTest;
