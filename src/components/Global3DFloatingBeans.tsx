import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Global3DFloatingBeansProps {
  enabled?: boolean;
}

export const Global3DFloatingBeans: React.FC<Global3DFloatingBeansProps> = ({
  enabled = true,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!enabled) return;
    const container = mountRef.current;
    if (!container) return;

    // Detect software WebGL
    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.z = 18;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // Warm Ambient and Directional Key Light
    const ambientLight = new THREE.AmbientLight(0xfff5e6, 1.5);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xd4af37, 2.2);
    dirLight.position.set(5, 10, 7);
    scene.add(dirLight);

    // 1. Procedural 3D Coffee Bean Geometry
    const createBeanGeo = () => {
      const geo = new THREE.SphereGeometry(0.3, 20, 14);
      geo.scale(0.85, 1.25, 0.65);
      const pos = geo.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const z = pos.getZ(i);
        if (z > 0 && Math.abs(x) < 0.07) {
          pos.setZ(i, z * 0.45);
        }
      }
      geo.computeVertexNormals();
      return geo;
    };

    // 2. Procedural 3D Chocolate Chip Geometry (Cone/droplet)
    const createChocoChipGeo = () => {
      const geo = new THREE.ConeGeometry(0.35, 0.5, 16);
      geo.scale(0.9, 1.1, 0.9);
      return geo;
    };

    // 3. Procedural Golden Droplet Geometry
    const createDropGeo = () => {
      const geo = new THREE.SphereGeometry(0.18, 14, 10);
      geo.scale(0.8, 1.3, 0.8);
      return geo;
    };

    const beanGeo = createBeanGeo();
    const chocoGeo = createChocoChipGeo();
    const dropGeo = createDropGeo();

    const beanMat = new THREE.MeshStandardMaterial({
      color: 0x3d1c08,
      roughness: 0.35,
      metalness: 0.15,
    });

    const whiteChocoMat = new THREE.MeshStandardMaterial({
      color: 0xf4eedb,
      roughness: 0.25,
      metalness: 0.1,
    });

    const darkChocoMat = new THREE.MeshStandardMaterial({
      color: 0x221109,
      roughness: 0.3,
      metalness: 0.15,
    });

    const goldDropMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      roughness: 0.2,
      metalness: 0.8,
      transparent: true,
      opacity: 0.85,
    });

    const totalCount = isSoftwareGl ? 20 : 38;
    const floatingObjects: {
      mesh: THREE.Mesh;
      baseX: number;
      baseY: number;
      speedY: number;
      speedRot: THREE.Vector3;
      wobbleSpeed: number;
      wobbleOffset: number;
      depthScale: number;
    }[] = [];

    for (let i = 0; i < totalCount; i++) {
      let mesh: THREE.Mesh;
      const type = i % 4;

      if (type === 0 || type === 1) {
        // Coffee Bean
        mesh = new THREE.Mesh(beanGeo, beanMat);
      } else if (type === 2) {
        // Chocolate Chip (alternate dark and white choco for Milkybar theme)
        mesh = new THREE.Mesh(chocoGeo, i % 2 === 0 ? whiteChocoMat : darkChocoMat);
      } else {
        // Golden Coffee Drop
        mesh = new THREE.Mesh(dropGeo, goldDropMat);
      }

      const x = (Math.random() - 0.5) * 26;
      const y = (Math.random() - 0.5) * 22;
      const z = (Math.random() - 0.5) * 12;

      mesh.position.set(x, y, z);
      const scale = 0.55 + Math.random() * 0.55;
      mesh.scale.set(scale, scale, scale);
      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );

      scene.add(mesh);

      floatingObjects.push({
        mesh,
        baseX: x,
        baseY: y,
        speedY: 0.008 + Math.random() * 0.016,
        speedRot: new THREE.Vector3(
          (Math.random() - 0.5) * 0.8,
          (Math.random() - 0.5) * 1.2,
          (Math.random() - 0.5) * 0.8
        ),
        wobbleSpeed: 0.5 + Math.random() * 0.8,
        wobbleOffset: Math.random() * Math.PI * 2,
        depthScale: 0.4 + (z + 6) / 12,
      });
    }

    // Handle Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Track Mouse for gentle 3D drift
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Loop
    let frameId = 0;
    const clock = new THREE.Clock();

    const tick = () => {
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      floatingObjects.forEach((obj) => {
        // Drift downward gently (floating effect)
        obj.mesh.position.y -= obj.speedY * (1 + Math.abs(mouseRef.current.y) * 0.5);
        obj.mesh.position.x =
          obj.baseX +
          Math.sin(elapsed * obj.wobbleSpeed + obj.wobbleOffset) * 0.8 +
          mouseRef.current.x * 0.6 * obj.depthScale;

        // Reset if drifted below viewport
        if (obj.mesh.position.y < -12) {
          obj.mesh.position.y = 12;
          obj.baseX = (Math.random() - 0.5) * 26;
        }

        // 3D Tumbling Rotation
        obj.mesh.rotation.x += obj.speedRot.x * delta;
        obj.mesh.rotation.y += obj.speedRot.y * delta;
        obj.mesh.rotation.z += obj.speedRot.z * delta;
      });

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);

      beanGeo.dispose();
      chocoGeo.dispose();
      dropGeo.dispose();
      beanMat.dispose();
      whiteChocoMat.dispose();
      darkChocoMat.dispose();
      goldDropMat.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, [enabled]);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-10 opacity-70 transition-opacity duration-700"
      aria-hidden="true"
    />
  );
};
