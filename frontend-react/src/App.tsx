import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { 
  Globe, 
  Github, 
  Instagram, 
  Twitter, 
  LayoutDashboard,
  Zap,
  Users,
  BookOpen,
  ShoppingBag,
  ArrowUpRight
} from 'lucide-react';

// --- 🌌 THREE.JS GALAXY COMPONENT ---
const GalaxyCanvas = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x000000, 2, 12);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Particle System
    const particleCount = 6000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      // Random spread with depth
      positions[i * 3] = (Math.random() - 0.5) * 15;     // x
      positions[i * 3 + 1] = (Math.random() - 0.5) * 15; // y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20; // z (depth)
      
      velocities[i] = 0.02 + Math.random() * 0.05; // speed
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: 0x00FF66,
      size: 0.025,
      transparent: true,
      opacity: 0.7,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Animation Logic
    const animate = () => {
      requestAnimationFrame(animate);

      const positions = geometry.attributes.position.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        // Continuous forward motion
        positions[i * 3 + 2] += velocities[i];

        // Reset if particle passes camera
        if (positions[i * 3 + 2] > 5) {
          positions[i * 3 + 2] = -15;
          positions[i * 3] = (Math.random() - 0.5) * 15;
          positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
        }
      }

      geometry.attributes.position.needsUpdate = true;

      // Mouse Parallax
      points.rotation.y += 0.001;
      points.rotation.x += (mouse.current.y * 0.1 - points.rotation.x) * 0.05;
      points.rotation.y += (mouse.current.x * 0.1 - points.rotation.y) * 0.05;

      renderer.render(scene, camera);
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouse.current.x = (event.clientX / window.innerWidth) - 0.5;
      mouse.current.y = (event.clientY / window.innerHeight) - 0.5;
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    animate();

    // Scroll Connection (Forward Camera Motion)
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const scrollPercent = Math.min(scrollY / window.innerHeight, 1);
      // Map scroll 0 -> 1 to camera Z 5 -> -3
      camera.position.z = 5 - (scrollPercent * 8);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 z-10 pointer-events-none" />;
};

// --- UI COMPONENTS ---
const GrainOverlay = () => <div className="grain-overlay" />;

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-40 px-6 py-8 flex justify-between items-center bg-gradient-to-b from-black to-transparent">
      <div className="flex items-center gap-2">
        <Globe className="text-neonGreen w-6 h-6" />
        <span className="text-xl font-medium tracking-tight uppercase">IEM Connector</span>
      </div>
      
      <div className="hidden md:flex items-center gap-12 text-sm uppercase tracking-widest text-white/60">
        {['Events', 'Teams', 'Resources', 'Marketplace'].map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-neonGreen transition-colors duration-300">
            {item}
          </a>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <button className="text-sm uppercase tracking-widest text-white/60 hover:text-white transition-colors">Sign Up</button>
        <button className="liquid-glass px-6 py-2 rounded-full text-sm uppercase tracking-widest">Login</button>
      </div>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative h-screen flex flex-col justify-center items-center text-center px-4 overflow-hidden">
      {/* 🎥 LAYER 1: VIDEO (Bottom) */}
      <div className="absolute inset-0 -z-10 overflow-hidden bg-black">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-10" />
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-30 grayscale contrast-125"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-a-blue-network-connection-442-large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,102,0.15),transparent_70%)]" />
      </div>

      {/* 🌌 LAYER 2: 3D GALAXY (Middle) */}
      <GalaxyCanvas />

      {/* 🧊 LAYER 3: UI (Top) */}
      <div className="relative z-20 pointer-events-auto">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <h1 className="text-7xl md:text-9xl font-serif font-regular tracking-tighter mb-6 neon-glow leading-[0.9] animate-flicker">
            IEM CONNECTOR
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="max-w-2xl text-lg md:text-xl text-white/60 mb-12 leading-relaxed"
        >
          The central operating system for campus collaboration. <br />
          Discover events. Build teams. Share knowledge.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="flex flex-col md:flex-row items-center gap-4 w-full max-w-lg mx-auto"
        >
          <div className="relative w-full group">
            <input 
              type="email" 
              placeholder="Enter your institute email"
              className="w-full bg-white/5 border border-white/10 rounded-full px-8 py-4 text-sm focus:outline-none focus:border-neonGreen/50 transition-all duration-500 pr-32"
            />
            <button className="absolute right-2 top-2 bottom-2 bg-neonGreen text-black font-bold px-6 rounded-full text-xs uppercase tracking-widest hover:scale-105 transition-transform">
              Enter Network
            </button>
          </div>
        </motion.div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-12 flex items-center gap-3 group mx-auto"
        >
          <div className="liquid-glass p-4 rounded-full group-hover:neon-border transition-all duration-500">
            <LayoutDashboard className="w-5 h-5 text-neonGreen group-hover:scale-110 transition-transform" />
          </div>
          <span className="text-xs uppercase tracking-[0.3em] text-white/40 group-hover:text-neonGreen transition-colors">
            Launch Dashboard
          </span>
        </motion.button>
      </div>

      {/* Socials */}
      <div className="absolute bottom-12 left-12 z-20 flex flex-col gap-6 text-white/30">
        <Github className="w-5 h-5 hover:text-neonGreen cursor-pointer transition-colors" />
        <Twitter className="w-5 h-5 hover:text-neonGreen cursor-pointer transition-colors" />
        <Instagram className="w-5 h-5 hover:text-neonGreen cursor-pointer transition-colors" />
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section className="py-32 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col items-center text-center">
        <span className="text-xs uppercase tracking-[0.4em] text-neonGreen mb-8">About Platform</span>
        <h2 className="text-5xl md:text-7xl font-serif leading-[1.1] mb-12">
          Connecting students, <br />
          then <span className="italic">ideas</span>, <br />
          then innovation.
        </h2>
        <div className="grid md:grid-cols-3 gap-12 max-w-5xl text-left mt-12">
          <div className="space-y-4">
            <h3 className="text-neonGreen font-medium">Unify Events</h3>
            <p className="text-white/40 text-sm leading-relaxed">
              Consolidate all campus activities into a single stream, making discovery effortless and participation seamless.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-neonGreen font-medium">Collaboration</h3>
            <p className="text-white/40 text-sm leading-relaxed">
              Break silos by finding like-minded peers across departments to build projects that matter.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-neonGreen font-medium">Resource Sharing</h3>
            <p className="text-white/40 text-sm leading-relaxed">
              A decentralized library of academic materials, powered by the community for the community.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const FeatureVideo = () => {
  return (
    <section className="py-32 px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <span className="text-xs uppercase tracking-[0.4em] text-neonGreen mb-8 block">How it works</span>
          <p className="text-3xl md:text-4xl leading-relaxed mb-12">
            IEM Connector unifies your entire campus ecosystem into a single intelligent platform — events, teams, resources, and opportunities in one place.
          </p>
          <button className="liquid-glass px-8 py-4 rounded-full uppercase tracking-widest text-sm flex items-center gap-3 group">
            Explore Platform
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
        <div className="relative aspect-video rounded-3xl overflow-hidden liquid-glass border-white/5 group">
          <div className="absolute inset-0 bg-gradient-to-tr from-neonGreen/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="w-20 h-20 rounded-full bg-white/5 backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
               <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[15px] border-l-neonGreen border-b-[10px] border-b-transparent ml-1" />
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const SystemCore = () => {
  return (
    <section className="py-32 px-6 bg-white/[0.02] border-y border-white/5">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl md:text-7xl font-serif mb-24 text-center">
          System x <span className="italic">Intelligence</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            "Real-time event discovery and participation",
            "Team formation + collaboration engine",
            "Peer-to-peer knowledge sharing system"
          ].map((text, i) => (
            <div key={i} className="liquid-glass p-12 rounded-3xl flex flex-col justify-between group hover:border-neonGreen/30 transition-all duration-500">
              <span className="text-neonGreen text-xl font-mono mb-12">0{i+1}</span>
              <p className="text-2xl leading-tight group-hover:text-neonGreen transition-colors">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Features = () => {
  const cards = [
    {
      tag: "Events",
      title: "Event Engine",
      desc: "Discover, host, and participate in campus and intercollege events seamlessly.",
      icon: <Zap className="w-6 h-6" />
    },
    {
      tag: "Collaboration",
      title: "Team Builder",
      desc: "Create teams, join projects, and collaborate in real-time.",
      icon: <Users className="w-6 h-6" />
    },
    {
      tag: "Resources",
      title: "Knowledge Hub",
      desc: "Upload, access, and share academic materials with peers.",
      icon: <BookOpen className="w-6 h-6" />
    },
    {
      tag: "Marketplace",
      title: "Student Exchange",
      desc: "Buy and sell books, courses, and academic tools.",
      icon: <ShoppingBag className="w-6 h-6" />
    }
  ];

  return (
    <section id="capabilities" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-24">
          <div>
            <span className="text-xs uppercase tracking-[0.4em] text-neonGreen mb-6 block">Capabilities</span>
            <h2 className="text-5xl md:text-6xl font-serif">Platform Capabilities</h2>
          </div>
          <p className="max-w-xs text-white/40 text-sm hidden md:block">
            A comprehensive suite of tools designed to accelerate your campus life and career.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {cards.map((card, i) => (
            <div key={i} className="liquid-glass p-12 rounded-[40px] group hover:bg-neonGreen/[0.02] transition-all duration-700 border-white/5">
              <div className="flex justify-between items-start mb-12">
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-neonGreen/10 transition-colors duration-500">
                  <div className="text-white group-hover:text-neonGreen transition-colors">
                    {card.icon}
                  </div>
                </div>
                <span className="text-xs uppercase tracking-widest text-white/20 group-hover:text-neonGreen/50 transition-colors">
                  {card.tag}
                </span>
              </div>
              <h3 className="text-3xl mb-4 group-hover:translate-x-2 transition-transform duration-500">{card.title}</h3>
              <p className="text-white/40 leading-relaxed max-w-sm">
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-24 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
        <div className="flex items-center gap-2">
          <Globe className="text-neonGreen w-6 h-6" />
          <span className="text-xl font-medium tracking-tight uppercase">IEM Connector</span>
        </div>
        
        <div className="flex gap-12 text-xs uppercase tracking-[0.3em] text-white/40">
          <a href="#" className="hover:text-white transition-colors">Twitter</a>
          <a href="#" className="hover:text-white transition-colors">Github</a>
          <a href="#" className="hover:text-white transition-colors">Instagram</a>
          <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
        </div>

        <p className="text-white/20 text-xs tracking-widest uppercase">
          © 2024 IEM CONNECTOR OS
        </p>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <main className="relative min-h-screen selection:bg-neonGreen selection:text-black">
      <GrainOverlay />
      <Navbar />
      <Hero />
      <About />
      <FeatureVideo />
      <SystemCore />
      <Features />
      <Footer />
    </main>
  );
}
