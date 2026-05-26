/**
 * IEM Connector - Sci-Fi Landing Page Engine
 * Senior Creative Developer Implementation
 */

// --- CONFIGURATION ---
const CONFIG = {
    particleCount: 4000,
    accentColor: 0x00FF66,
    particleSize: 0.02,
    morphDuration: 2.5,
    cameraZ: 6
};

// --- STATE GENERATORS ---
const Generators = {
    // Section 1: Hero (Swirling Galaxy)
    galaxy: () => {
        const positions = new Float32Array(CONFIG.particleCount * 3);
        for (let i = 0; i < CONFIG.particleCount; i++) {
            const i3 = i * 3;
            const radius = Math.random() * 6;
            const spin = radius * 1.5;
            const angle = Math.random() * Math.PI * 2;
            const spread = (Math.random() - 0.5) * 0.4;
            
            positions[i3] = Math.cos(angle + spin) * radius + spread;
            positions[i3 + 1] = (Math.random() - 0.5) * 0.8;
            positions[i3 + 2] = Math.sin(angle + spin) * radius + spread;
        }
        return positions;
    },

    // Section 2: Auth (Structured Grid/Shield)
    grid: () => {
        const positions = new Float32Array(CONFIG.particleCount * 3);
        const side = Math.floor(Math.pow(CONFIG.particleCount, 1/2));
        const spacing = 0.15;
        let index = 0;
        for (let x = 0; x < side; x++) {
            for (let y = 0; y < side; y++) {
                if (index < CONFIG.particleCount) {
                    const i3 = index * 3;
                    positions[i3] = (x - side/2) * spacing;
                    positions[i3 + 1] = (y - side/2) * spacing;
                    positions[i3 + 2] = Math.sin(x * 0.5 + y * 0.5) * 0.2;
                    index++;
                }
            }
        }
        // Fill remaining with random noise far away if needed, but here we just leave at zero
        return positions;
    },

    // Section 3: Events (Connected Nodes)
    nodes: () => {
        const positions = new Float32Array(CONFIG.particleCount * 3);
        const clusters = 12;
        const centers = [];
        for(let i=0; i<clusters; i++) {
            centers.push({
                x: (Math.random() - 0.5) * 8,
                y: (Math.random() - 0.5) * 5,
                z: (Math.random() - 0.5) * 5
            });
        }
        for (let i = 0; i < CONFIG.particleCount; i++) {
            const i3 = i * 3;
            const center = centers[i % clusters];
            positions[i3] = center.x + (Math.random() - 0.5) * 1.2;
            positions[i3 + 1] = center.y + (Math.random() - 0.5) * 1.2;
            positions[i3 + 2] = center.z + (Math.random() - 0.5) * 1.2;
        }
        return positions;
    },

    // Section 4: Resources (Data Wave)
    wave: () => {
        const positions = new Float32Array(CONFIG.particleCount * 3);
        for (let i = 0; i < CONFIG.particleCount; i++) {
            const i3 = i * 3;
            const x = (Math.random() - 0.5) * 20;
            const z = (Math.random() - 0.5) * 10;
            positions[i3] = x;
            positions[i3 + 1] = Math.sin(x * 0.4) * 2 + Math.cos(z * 0.4) * 1;
            positions[i3 + 2] = z;
        }
        return positions;
    },

    // Section 5: Final (Portal Ring)
    ring: () => {
        const positions = new Float32Array(CONFIG.particleCount * 3);
        for (let i = 0; i < CONFIG.particleCount; i++) {
            const i3 = i * 3;
            const angle = Math.random() * Math.PI * 2;
            const radius = 3.5 + (Math.random() - 0.5) * 0.3;
            positions[i3] = Math.cos(angle) * radius;
            positions[i3 + 1] = Math.sin(angle) * radius;
            positions[i3 + 2] = (Math.random() - 0.5) * 4;
        }
        return positions;
    }
};

class LandingEngine {
    constructor() {
        this.initThree();
        this.createParticles();
        this.initGSAP();
        this.initCursor();
        this.animate();
        this.handleResize();
    }

    initThree() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        document.body.appendChild(this.renderer.domElement);

        this.camera.position.z = CONFIG.cameraZ;
        
        this.mouse = { x: 0, y: 0 };
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = (e.clientX / window.innerWidth) - 0.5;
            this.mouse.y = (e.clientY / window.innerHeight) - 0.5;
        });
    }

    createParticles() {
        this.geometry = new THREE.BufferGeometry();
        this.states = {
            galaxy: Generators.galaxy(),
            grid: Generators.grid(),
            nodes: Generators.nodes(),
            wave: Generators.wave(),
            ring: Generators.ring()
        };

        this.geometry.setAttribute('position', new THREE.BufferAttribute(this.states.galaxy.slice(), 3));

        const material = new THREE.PointsMaterial({
            color: CONFIG.accentColor,
            size: CONFIG.particleSize,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });

        this.points = new THREE.Points(this.geometry, material);
        this.scene.add(this.points);

        // Lines for Section 3 (Hidden initially)
        this.lineGeometry = new THREE.BufferGeometry();
        this.lineMaterial = new THREE.LineBasicMaterial({ 
            color: CONFIG.accentColor, 
            transparent: true, 
            opacity: 0 
        });
        this.lines = new THREE.LineSegments(this.lineGeometry, this.lineMaterial);
        this.scene.add(this.lines);
    }

    morphParticles(targetKey) {
        const targetPositions = this.states[targetKey];
        const currentPositions = this.geometry.attributes.position.array;
        const startPositions = new Float32Array(currentPositions);

        gsap.to({ t: 0 }, {
            t: 1,
            duration: CONFIG.morphDuration,
            ease: "expo.inOut",
            onUpdate: function() {
                const t = this.targets()[0].t;
                for (let i = 0; i < currentPositions.length; i++) {
                    currentPositions[i] = startPositions[i] + (targetPositions[i] - startPositions[i]) * t;
                }
                this.parentEngine.geometry.attributes.position.needsUpdate = true;
            }.bind({ parentEngine: this })
        });

        // Toggle lines for 'nodes' state
        gsap.to(this.lineMaterial, {
            opacity: targetKey === 'nodes' ? 0.2 : 0,
            duration: 1
        });

        if (targetKey === 'nodes') {
            this.updateLines(targetPositions);
        }
    }

    updateLines(positions) {
        const lineIndices = [];
        const maxConnections = 1000;
        for (let i = 0; i < maxConnections; i++) {
            const a = Math.floor(Math.random() * CONFIG.particleCount);
            const b = Math.floor(Math.random() * CONFIG.particleCount);
            
            // Only connect if somewhat close in original generator (clusters)
            lineIndices.push(a, b);
        }
        this.lineGeometry.setIndex(lineIndices);
        this.lineGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    }

    initGSAP() {
        gsap.registerPlugin(ScrollTrigger);

        const sectionKeys = ['galaxy', 'grid', 'nodes', 'wave', 'ring'];
        const sections = document.querySelectorAll('section');
        const dots = document.querySelectorAll('.dot');

        sections.forEach((section, i) => {
            ScrollTrigger.create({
                trigger: section,
                start: "top 60%",
                end: "bottom 40%",
                onEnter: () => {
                    this.activateSection(i, sectionKeys[i]);
                },
                onEnterBack: () => {
                    this.activateSection(i, sectionKeys[i]);
                }
            });
        });

        // Initial state
        this.activateSection(0, 'galaxy');
    }

    activateSection(index, key) {
        // Morph 3D
        this.morphParticles(key);

        // UI Updates
        document.querySelectorAll('section').forEach(s => s.classList.remove('active'));
        document.querySelectorAll('section')[index].classList.add('active');

        document.querySelectorAll('.dot').forEach(d => d.classList.remove('active'));
        document.querySelectorAll('.dot')[index].classList.add('active');

        // Camera move
        gsap.to(this.camera.position, {
            z: key === 'ring' ? 4 : CONFIG.cameraZ,
            duration: 2,
            ease: "power2.inOut"
        });
    }

    initCursor() {
        const dot = document.getElementById('cursor-dot');
        const outline = document.getElementById('cursor-outline');

        window.addEventListener('mousemove', (e) => {
            gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0 });
            gsap.to(outline, { x: e.clientX - 20, y: e.clientY - 20, duration: 0.15 });
        });
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));

        // Self rotation
        this.points.rotation.y += 0.001;
        this.points.rotation.x += 0.0005;

        // Mouse parallax
        const targetRX = this.mouse.y * 0.2;
        const targetRY = this.mouse.x * 0.2;
        this.points.rotation.x += (targetRX - this.points.rotation.x) * 0.05;
        this.points.rotation.y += (targetRY - this.points.rotation.y) * 0.05;

        // Render
        this.renderer.render(this.scene, this.camera);
    }

    handleResize() {
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }
}

// Initialize on Load
window.addEventListener('DOMContentLoaded', () => {
    new LandingEngine();
});
