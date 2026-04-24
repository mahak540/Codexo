import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere } from '@react-three/drei';
import gsap from 'gsap';
import { useEffect } from 'react';

const FloatingObject = () => {
  const meshRef = useRef();
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 0.5;
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 0.5;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2 + mouseRef.current.y;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3 + mouseRef.current.x;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} scale={2.5}>
        <torusKnotGeometry args={[1, 0.3, 128, 32]} />
        <MeshDistortMaterial
          color="#00f5ff"
          emissive="#a855f7"
          emissiveIntensity={0.3}
          roughness={0.2}
          metalness={0.8}
          distort={0.4}
          speed={2}
        />
      </mesh>
    </Float>
  );
};

const Particles = () => {
  const particlesRef = useRef();
  const count = 200;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#00f5ff"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

const Scene = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00f5ff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#a855f7" />
      <FloatingObject />
      <Particles />
    </>
  );
};

const HeroSection = () => {
  const heroRef = useRef();

  useEffect(() => {
    const tl = gsap.timeline();
    
    tl.fromTo('.hero-title', 
      { opacity: 0, y: 100, scale: 0.8 },
      { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: 'power3.out' }
    )
    .fromTo('.hero-tagline',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      '-=0.5'
    )
    .fromTo('.hero-buttons',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
      '-=0.3'
    );
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero" ref={heroRef}>
      <div className="hero-canvas">
        <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
          <Scene />
        </Canvas>
      </div>
      <div className="hero-content">
        <h1 className="hero-title">CODExO</h1>
        <p className="hero-tagline">
          We Build Powerful Digital Experiences That Grow Your Business
        </p>
        <div className="hero-buttons">
          <button className="btn-primary" onClick={() => scrollToSection('contact')}>
            Get a Website
          </button>
          <button className="btn-secondary" onClick={() => scrollToSection('projects')}>
            View Our Work
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;