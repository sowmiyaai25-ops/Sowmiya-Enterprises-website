import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { playCoffeeSteamSound, playUiClick } from '../utils/audioEffects';

interface ThreeCoffeeCanvasProps {
  onInteract?: () => void;
  immersiveMode?: boolean;
}

export const ThreeCoffeeCanvas: React.FC<ThreeCoffeeCanvasProps> = ({
  immersiveMode = false,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activePreset, setActivePreset] = useState<'cinematic' | 'top' | 'close'>('cinematic');
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  const [isStirring, setIsStirring] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);

  // Mutable refs for Three.js animation control
  const animControlsRef = useRef({
    speed: 1,
    stirring: 0,
    cameraPreset: 'cinematic' as 'cinematic' | 'top' | 'close',
    targetCameraPos: new THREE.Vector3(0, 1.2, 5.2),
    targetLookAt: new THREE.Vector3(0, 0, 0),
    mouseX: 0,
    mouseY: 0,
  });

  useEffect(() => {
    animControlsRef.current.speed = speedMultiplier;
  }, [speedMultiplier]);

  useEffect(() => {
    animControlsRef.current.cameraPreset = activePreset;
    if (activePreset === 'cinematic') {
      animControlsRef.current.targetCameraPos.set(0, 1.2, 5.2);
      animControlsRef.current.targetLookAt.set(0, 0, 0);
    } else if (activePreset === 'top') {
      animControlsRef.current.targetCameraPos.set(0, 5.5, 1.8);
      animControlsRef.current.targetLookAt.set(0, 0, 0);
    } else if (activePreset === 'close') {
      animControlsRef.current.targetCameraPos.set(0, 0.4, 3.2);
      animControlsRef.current.targetLookAt.set(0, 0.2, 0);
    }
  }, [activePreset]);

  const handleStir = () => {
    setIsStirring(true);
    animControlsRef.current.stirring = 1.0;
    if (soundEnabled) {
      playCoffeeSteamSound();
    }
    setTimeout(() => {
      setIsStirring(false);
    }, 2500);
  };

  const toggleSound = () => {
    playUiClick();
    const next = !soundEnabled;
    setSoundEnabled(next);
    if (next) {
      playCoffeeSteamSound();
    }
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect software WebGL from renderer string
    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    // Scene & Camera
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x120a05, 0.08);

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      50
    );
    camera.position.set(0, 1.2, 5.2);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xfff5e6, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffeedd, 3.5);
    keyLight.position.set(4, 6, 4);
    keyLight.castShadow = !isSoftwareGl;
    if (keyLight.castShadow) {
      keyLight.shadow.mapSize.width = 1024;
      keyLight.shadow.mapSize.height = 1024;
      keyLight.shadow.bias = -0.0005;
    }
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xd4af37, 2.8);
    rimLight.position.set(-4, -2, -3);
    scene.add(rimLight);

    const goldPointLight = new THREE.PointLight(0xffb347, 2.0, 10);
    goldPointLight.position.set(0, 1.5, 1);
    scene.add(goldPointLight);

    // ==========================================
    // 1. PROCEDURAL 3D COMPOSITE COFFEE MUG
    // ==========================================
    const mugGroup = new THREE.Group();

    // Ceramic material (warm porcelain with gold trim)
    const ceramicMaterial = new THREE.MeshStandardMaterial({
      color: 0x22130c,
      roughness: 0.18,
      metalness: 0.12,
    });

    const goldTrimMaterial = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      roughness: 0.25,
      metalness: 0.85,
    });

    // Cup Body using Cylinder with tapered base
    const mugGeometry = new THREE.CylinderGeometry(0.85, 0.65, 1.6, 48, 1, true);
    const mugOuter = new THREE.Mesh(mugGeometry, ceramicMaterial);
    mugOuter.castShadow = !isSoftwareGl;
    mugGroup.add(mugOuter);

    // Inner Mug Lining
    const innerGeometry = new THREE.CylinderGeometry(0.78, 0.60, 1.55, 36, 1, true);
    const innerMaterial = new THREE.MeshStandardMaterial({
      color: 0x180b06,
      roughness: 0.3,
      metalness: 0.05,
      side: THREE.BackSide,
    });
    const mugInner = new THREE.Mesh(innerGeometry, innerMaterial);
    mugGroup.add(mugInner);

    // Mug Bottom
    const bottomGeo = new THREE.CylinderGeometry(0.65, 0.65, 0.08, 48);
    const bottomMesh = new THREE.Mesh(bottomGeo, ceramicMaterial);
    bottomMesh.position.y = -0.8;
    mugGroup.add(bottomMesh);

    // Mug Rim Ring (Gold accent)
    const rimGeo = new THREE.TorusGeometry(0.81, 0.045, 16, 64);
    rimGeo.rotateX(Math.PI / 2);
    const rimMesh = new THREE.Mesh(rimGeo, goldTrimMaterial);
    rimMesh.position.y = 0.8;
    mugGroup.add(rimMesh);

    // Mug Handle (Curved Torus Segment)
    const handleGeo = new THREE.TorusGeometry(0.48, 0.1, 16, 48, Math.PI * 1.05);
    handleGeo.rotateZ(-Math.PI / 2);
    const handleMesh = new THREE.Mesh(handleGeo, ceramicMaterial);
    handleMesh.position.set(0.92, 0.05, 0);
    handleMesh.castShadow = !isSoftwareGl;
    mugGroup.add(handleMesh);

    // Rich Dark Liquid (Coffee Surface)
    const liquidGeo = new THREE.CircleGeometry(0.77, 48);
    liquidGeo.rotateX(-Math.PI / 2);
    const liquidMat = new THREE.MeshStandardMaterial({
      color: 0x241108,
      roughness: 0.12,
      metalness: 0.25,
    });
    const liquidMesh = new THREE.Mesh(liquidGeo, liquidMat);
    liquidMesh.position.y = 0.62;
    mugGroup.add(liquidMesh);

    // Crema / Foam concentric ring
    const cremaGeo = new THREE.RingGeometry(0.55, 0.76, 48);
    cremaGeo.rotateX(-Math.PI / 2);
    const cremaMat = new THREE.MeshStandardMaterial({
      color: 0xb87333,
      roughness: 0.45,
      metalness: 0.1,
      transparent: true,
      opacity: 0.85,
    });
    const cremaMesh = new THREE.Mesh(cremaGeo, cremaMat);
    cremaMesh.position.y = 0.622;
    mugGroup.add(cremaMesh);

    // Front Nestlé / Balaji Insignia on Cup
    const badgeGeo = new THREE.PlaneGeometry(0.5, 0.25);
    const canvasBadge = document.createElement('canvas');
    canvasBadge.width = 256;
    canvasBadge.height = 128;
    const ctxB = canvasBadge.getContext('2d');
    if (ctxB) {
      ctxB.fillStyle = '#D4AF37';
      ctxB.font = 'bold 28px serif';
      ctxB.textAlign = 'center';
      ctxB.textBaseline = 'middle';
      ctxB.fillText('SOWMIYA', 128, 48);
      ctxB.fillStyle = '#FFFFFF';
      ctxB.font = 'bold 20px sans-serif';
      ctxB.fillText('ENTERPRISES', 128, 85);
    }
    const badgeTexture = new THREE.CanvasTexture(canvasBadge);
    badgeTexture.colorSpace = THREE.SRGBColorSpace;
    const badgeMat = new THREE.MeshBasicMaterial({
      map: badgeTexture,
      transparent: true,
      opacity: 0.9,
    });
    const badgeMesh = new THREE.Mesh(badgeGeo, badgeMat);
    badgeMesh.position.set(0, 0.1, 0.86);
    mugGroup.add(badgeMesh);

    // Soft Contact Ground Shadow below Mug
    const contactShadowGeo = new THREE.PlaneGeometry(2.4, 2.4);
    contactShadowGeo.rotateX(-Math.PI / 2);
    const canvasShadow = document.createElement('canvas');
    canvasShadow.width = 128;
    canvasShadow.height = 128;
    const ctxS = canvasShadow.getContext('2d');
    if (ctxS) {
      const grad = ctxS.createRadialGradient(64, 64, 10, 64, 64, 64);
      grad.addColorStop(0, 'rgba(0, 0, 0, 0.8)');
      grad.addColorStop(0.5, 'rgba(0, 0, 0, 0.3)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctxS.fillStyle = grad;
      ctxS.fillRect(0, 0, 128, 128);
    }
    const shadowTexture = new THREE.CanvasTexture(canvasShadow);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      opacity: 0.5,
      depthWrite: false,
    });
    const contactShadow = new THREE.Mesh(contactShadowGeo, shadowMat);
    contactShadow.position.y = -0.92;
    mugGroup.add(contactShadow);

    scene.add(mugGroup);

    // ==========================================
    // 2. PROCEDURAL 3D FLOATING COFFEE BEANS
    // ==========================================
    // Generate bean geometry: an ellipsoid with a center crease
    const createCoffeeBeanGeometry = () => {
      const geo = new THREE.SphereGeometry(0.18, 24, 18);
      // Scale into bean shape (longer along Y, slightly flattened on Z)
      geo.scale(0.85, 1.25, 0.65);
      const pos = geo.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const y = pos.getY(i);
        const z = pos.getZ(i);
        // Indent the crease along center front
        if (z > 0 && Math.abs(x) < 0.045) {
          pos.setZ(i, z * 0.45);
        }
      }
      geo.computeVertexNormals();
      return geo;
    };

    const beanGeometry = createCoffeeBeanGeometry();
    const beanMaterial = new THREE.MeshStandardMaterial({
      color: 0x3d1c06,
      roughness: 0.35,
      metalness: 0.15,
    });

    const beanCount = 42;
    const beans: {
      mesh: THREE.Mesh;
      basePos: THREE.Vector3;
      rotSpeed: THREE.Vector3;
      orbitRadius: number;
      orbitSpeed: number;
      orbitAngle: number;
      yFloatSpeed: number;
      yOffset: number;
    }[] = [];

    for (let i = 0; i < beanCount; i++) {
      const mesh = new THREE.Mesh(beanGeometry, beanMaterial);
      const angle = (i / beanCount) * Math.PI * 2 + Math.random() * 0.5;
      const radius = 1.4 + Math.random() * 3.2;
      const y = (Math.random() - 0.5) * 4.2;

      mesh.position.set(Math.cos(angle) * radius, y, Math.sin(angle) * radius);
      const scaleRand = 0.75 + Math.random() * 0.6;
      mesh.scale.set(scaleRand, scaleRand, scaleRand);
      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );

      scene.add(mesh);

      beans.push({
        mesh,
        basePos: mesh.position.clone(),
        rotSpeed: new THREE.Vector3(
          (Math.random() - 0.5) * 1.5,
          (Math.random() - 0.5) * 2.0,
          (Math.random() - 0.5) * 1.5
        ),
        orbitRadius: radius,
        orbitSpeed: (0.15 + Math.random() * 0.25) * (i % 2 === 0 ? 1 : -1),
        orbitAngle: angle,
        yFloatSpeed: 0.6 + Math.random() * 0.8,
        yOffset: Math.random() * Math.PI * 2,
      });
    }

    // ==========================================
    // 3. RISING 3D STEAM PARTICLES
    // ==========================================
    const steamCount = 28;
    const steamGeometry = new THREE.PlaneGeometry(0.24, 0.32);
    const canvasSteam = document.createElement('canvas');
    canvasSteam.width = 64;
    canvasSteam.height = 64;
    const ctxSteam = canvasSteam.getContext('2d');
    if (ctxSteam) {
      const g = ctxSteam.createRadialGradient(32, 32, 2, 32, 32, 32);
      g.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
      g.addColorStop(0.4, 'rgba(230, 220, 200, 0.4)');
      g.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctxSteam.fillStyle = g;
      ctxSteam.fillRect(0, 0, 64, 64);
    }
    const steamTexture = new THREE.CanvasTexture(canvasSteam);
    const steamMaterial = new THREE.MeshBasicMaterial({
      map: steamTexture,
      transparent: true,
      opacity: 0.35,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const steamPuffs: {
      mesh: THREE.Mesh;
      speed: number;
      wobbleSpeed: number;
      initY: number;
    }[] = [];

    for (let i = 0; i < steamCount; i++) {
      const mesh = new THREE.Mesh(steamGeometry, steamMaterial);
      mesh.position.set(
        (Math.random() - 0.5) * 0.55,
        0.7 + (i / steamCount) * 1.8,
        (Math.random() - 0.5) * 0.55
      );
      mesh.scale.setScalar(0.6 + (i / steamCount) * 1.2);
      scene.add(mesh);

      steamPuffs.push({
        mesh,
        speed: 0.008 + Math.random() * 0.012,
        wobbleSpeed: 1.5 + Math.random() * 2,
        initY: 0.65,
      });
    }

    // ==========================================
    // 4. FLOATING GOLDEN NESTLÉ STARS & AROMA RINGS
    // ==========================================
    const starCount = 20;
    const starGeo = new THREE.OctahedronGeometry(0.06, 0);
    const starMat = new THREE.MeshBasicMaterial({
      color: 0xf5d061,
      wireframe: false,
    });
    const stars: { mesh: THREE.Mesh; speed: number; phase: number }[] = [];

    for (let i = 0; i < starCount; i++) {
      const mesh = new THREE.Mesh(starGeo, starMat);
      mesh.position.set(
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 4
      );
      scene.add(mesh);
      stars.push({
        mesh,
        speed: 0.5 + Math.random() * 1.5,
        phase: Math.random() * Math.PI * 2,
      });
    }

    // Pointer Move Tracking
    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      animControlsRef.current.mouseX = x;
      animControlsRef.current.mouseY = y;
    };

    window.addEventListener('mousemove', handlePointerMove);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // ==========================================
    // 5. ANIMATION LOOP WITH PACING
    // ==========================================
    let frameId = 0;
    const clock = new THREE.Clock();

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      const sync = gl.fenceSync ? gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0) : null;
      gl.flush();
      const poll = () => {
        const state = sync && gl.getSyncParameter ? gl.getSyncParameter(sync, gl.SYNC_STATUS) : 0;
        if (state === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          if (sync && gl.deleteSync) gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      frameId = window.setTimeout(poll, 5);
    }

    const currentLookAt = new THREE.Vector3(0, 0, 0);

    const tick = () => {
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();
      const speed = animControlsRef.current.speed;

      // Handle stirring dampening
      if (animControlsRef.current.stirring > 0) {
        animControlsRef.current.stirring = Math.max(
          0,
          animControlsRef.current.stirring - delta * 0.45
        );
      }
      const stirBoost = animControlsRef.current.stirring * 3.5;

      // Rotate & Bob the 3D Coffee Mug
      mugGroup.rotation.y += (0.45 * speed + stirBoost) * delta;
      mugGroup.rotation.x = Math.sin(elapsed * 1.5 * speed) * 0.06;
      mugGroup.position.y = Math.sin(elapsed * 2.0 * speed) * 0.12;

      // Subtle mouse tilt response
      mugGroup.position.x = THREE.MathUtils.damp(
        mugGroup.position.x,
        animControlsRef.current.mouseX * 0.4,
        3.5,
        delta
      );

      // Rotate liquid surface with stirring vortex
      liquidMesh.rotation.z += (1.2 * speed + stirBoost * 4) * delta;
      cremaMesh.rotation.z += (0.8 * speed + stirBoost * 3) * delta;

      // Update Floating Coffee Beans
      beans.forEach((b) => {
        b.orbitAngle += b.orbitSpeed * 0.5 * speed * delta;
        b.mesh.position.x = Math.cos(b.orbitAngle) * b.orbitRadius;
        b.mesh.position.z = Math.sin(b.orbitAngle) * b.orbitRadius;
        b.mesh.position.y =
          b.basePos.y + Math.sin(elapsed * b.yFloatSpeed * speed + b.yOffset) * 0.45;

        b.mesh.rotation.x += b.rotSpeed.x * speed * delta;
        b.mesh.rotation.y += b.rotSpeed.y * speed * delta;
        b.mesh.rotation.z += b.rotSpeed.z * speed * delta;
      });

      // Update Steam Puffs
      steamPuffs.forEach((puff, idx) => {
        puff.mesh.position.y += (puff.speed + stirBoost * 0.015) * speed;
        puff.mesh.position.x += Math.sin(elapsed * puff.wobbleSpeed + idx) * 0.002;
        // Billboarding steam facing camera
        puff.mesh.lookAt(camera.position);

        // Reset if reached height
        if (puff.mesh.position.y > 2.8) {
          puff.mesh.position.y = puff.initY;
          puff.mesh.position.x = (Math.random() - 0.5) * 0.4;
          puff.mesh.position.z = (Math.random() - 0.5) * 0.4;
        }
      });

      // Update Golden Stars
      stars.forEach((st) => {
        st.mesh.rotation.x += 1.5 * delta;
        st.mesh.rotation.y += 2.0 * delta;
        st.mesh.position.y += Math.sin(elapsed * st.speed + st.phase) * 0.003;
      });

      // Smooth camera interpolation
      camera.position.lerp(animControlsRef.current.targetCameraPos, delta * 3.0);
      currentLookAt.lerp(animControlsRef.current.targetLookAt, delta * 3.0);
      camera.lookAt(currentLookAt);

      renderer.render(scene, camera);

      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    };

    tick();

    return () => {
      if (isSoftwareGl) {
        clearTimeout(frameId);
      } else {
        cancelAnimationFrame(frameId);
      }
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('resize', handleResize);

      // Clean up resources
      beanGeometry.dispose();
      beanMaterial.dispose();
      mugGeometry.dispose();
      innerGeometry.dispose();
      bottomGeo.dispose();
      rimGeo.dispose();
      handleGeo.dispose();
      liquidGeo.dispose();
      cremaGeo.dispose();
      badgeGeo.dispose();
      contactShadowGeo.dispose();
      steamGeometry.dispose();
      starGeo.dispose();
      badgeTexture.dispose();
      shadowTexture.dispose();
      steamTexture.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className={`relative w-full overflow-hidden ${immersiveMode ? 'h-[85vh]' : 'h-[520px] sm:h-[620px]'}`}>
      {/* 3D Canvas Mounting Node */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Subtle Background Radial Lighting */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,_transparent_20%,_#120A05_85%)]" />

      {/* Top Floating Badge for 3D Engine */}
      <div className="absolute top-4 left-4 z-20 pointer-events-auto">
        <div className="bg-[#180B06]/90 border border-[#D4AF37]/40 px-3.5 py-1.5 rounded-full flex items-center gap-2 shadow-lg backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
          <span className="text-[11px] font-bold text-[#FDFBF7] uppercase tracking-wider">
            3D Floating Experience
          </span>
          <span className="text-[10px] text-[#D4AF37] font-semibold">· Move Cursor to Orbit</span>
        </div>
      </div>

      {/* Consolidated Ergonomic Bottom Control Dock (Skill Compliant) */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 z-20 w-[94%] max-w-[820px] pointer-events-auto">
        {/* Collapse / Expand Toggle Button */}
        <div className="flex justify-center -mb-2 relative z-30">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="bg-[#180B06] border border-[#D4AF37]/40 text-[#D4AF37] hover:text-white px-4 py-1 rounded-t-xl text-[11px] font-bold shadow-md transition-all flex items-center gap-1.5 hover:bg-[#2A160E]"
          >
            {isCollapsed ? '▴ Show 3D Controls' : '▾ Hide Controls (Zen View)'}
          </button>
        </div>

        {/* Control Dock Panel */}
        <div
          className={`bg-[#180B06]/95 border-2 border-[#D4AF37]/40 rounded-2xl p-3 sm:p-4 shadow-2xl backdrop-blur-md transition-all duration-300 ${
            isCollapsed ? 'translate-y-32 opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'
          }`}
        >
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
            {/* Camera Angles */}
            <div className="flex items-center gap-1 bg-[#120A05] p-1 rounded-xl border border-[#D4AF37]/20">
              <button
                onClick={() => {
                  playUiClick();
                  setActivePreset('cinematic');
                }}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  activePreset === 'cinematic'
                    ? 'bg-[#D4AF37] text-[#120A05] shadow'
                    : 'text-[#E5D3B3] hover:text-[#D4AF37]'
                }`}
              >
                Cinematic
              </button>
              <button
                onClick={() => {
                  playUiClick();
                  setActivePreset('top');
                }}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  activePreset === 'top'
                    ? 'bg-[#D4AF37] text-[#120A05] shadow'
                    : 'text-[#E5D3B3] hover:text-[#D4AF37]'
                }`}
              >
                Top Angle
              </button>
              <button
                onClick={() => {
                  playUiClick();
                  setActivePreset('close');
                }}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  activePreset === 'close'
                    ? 'bg-[#D4AF37] text-[#120A05] shadow'
                    : 'text-[#E5D3B3] hover:text-[#D4AF37]'
                }`}
              >
                Close-up
              </button>
            </div>

            {/* Interactive Stir Mug Button */}
            <button
              onClick={handleStir}
              disabled={isStirring}
              className={`px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition-all shadow-md ${
                isStirring
                  ? 'bg-amber-600 text-white animate-pulse'
                  : 'bg-gradient-to-r from-[#D4AF37] to-amber-500 hover:from-amber-500 hover:to-[#D4AF37] text-[#120A05] hover:scale-105'
              }`}
            >
              <span>{isStirring ? '🌀 Brewing Crema...' : '☕ Stir Floating Mug'}</span>
            </button>

            {/* Speed Multiplier & Audio Ambience Toggle */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-[#120A05] px-2 py-1 rounded-xl border border-[#D4AF37]/20">
                <span className="text-[10px] text-[#A68318] font-bold uppercase mr-1">Speed:</span>
                {[0.5, 1, 2].map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      playUiClick();
                      setSpeedMultiplier(s);
                    }}
                    className={`px-2 py-1 rounded text-[10px] font-bold ${
                      speedMultiplier === s
                        ? 'bg-[#5C3420] text-[#D4AF37]'
                        : 'text-[#E5D3B3] hover:text-[#D4AF37]'
                    }`}
                  >
                    {s}x
                  </button>
                ))}
              </div>

              <button
                onClick={toggleSound}
                className={`p-2 rounded-xl border transition-all ${
                  soundEnabled
                    ? 'bg-emerald-800/80 border-emerald-500 text-white'
                    : 'bg-[#120A05] border-[#D4AF37]/30 text-[#A68318] hover:text-[#D4AF37]'
                }`}
                title={soundEnabled ? 'Mute Cafe Ambience' : 'Play Cafe Ambience (Web Audio)'}
              >
                {soundEnabled ? '🔊 Sound On' : '🔇 Audio FX'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
