import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader";

const Computers = ({ isMobile, scrollY }) => {
  const computer = useGLTF("./desktop_pc/scene.gltf");

  const rotation = [-0.02, scrollY * 0.001, -0.1];
  const position = isMobile ? [0, -3.5, -2.2] : [0, -4, -1.5];

  return (
    <mesh>
      <hemisphereLight intensity={0.1} groundColor="black" />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <pointLight intensity={1} />
      <primitive
        object={computer.scene}
        scale={isMobile ? 0.6 : 0.7}
        position={position}
        rotation={rotation}
      />
    </mesh>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia("(max-width: 640px)");
    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Listener for scroll events
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);

    // Cleanup listeners
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Canvas
      frameloop="demand"
      shadows
      dpr={[1, 2]}
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Computers isMobile={isMobile} scrollY={scrollY} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;
