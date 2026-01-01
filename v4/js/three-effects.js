/**
 * Three.js 3D Effects Module for V4 Pro
 * Provides immersive 3D visual effects including particle fields,
 * mouse glow, and fireworks animations.
 *
 * Requires: Three.js r128+ (loaded via CDN)
 *
 * @namespace ThreeEffects
 * @version 1.0.0
 */
const ThreeEffects = (function() {
    'use strict';

    // Module state
    let scene, camera, renderer;
    let animationId = null;
    let container = null;
    let isInitialized = false;
    let reducedMotion = false;
    let lowPerformanceMode = false;
    let isVisible = true;

    // Effect instances
    let particleField = null;
    let mouseGlow = null;
    let activeFireworks = [];

    // Mouse tracking
    let mouse = { x: 0, y: 0 };
    let mouseNormalized = { x: 0, y: 0 };

    // Performance monitoring
    let lastFrameTime = 0;
    let frameCount = 0;
    let fps = 60;

    /**
     * Check if WebGL is supported
     * @returns {boolean}
     */
    function isWebGLSupported() {
        try {
            const canvas = document.createElement('canvas');
            return !!(
                window.WebGLRenderingContext &&
                (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
            );
        } catch (e) {
            return false;
        }
    }

    /**
     * Check for reduced motion preference
     * @returns {boolean}
     */
    function checkReducedMotion() {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    /**
     * Check for low performance conditions
     * @returns {boolean}
     */
    function checkLowPerformance() {
        // Check for battery status if available
        if ('getBattery' in navigator) {
            navigator.getBattery().then(battery => {
                if (battery.level < 0.2 && !battery.charging) {
                    lowPerformanceMode = true;
                }
            });
        }

        // Check device memory if available
        if ('deviceMemory' in navigator && navigator.deviceMemory < 4) {
            return true;
        }

        // Check hardware concurrency
        if ('hardwareConcurrency' in navigator && navigator.hardwareConcurrency < 4) {
            return true;
        }

        return false;
    }

    /**
     * ParticleField Class - Creates a 3D starfield with interactive particles
     */
    class ParticleField {
        constructor(particleCount = 500) {
            this.particleCount = lowPerformanceMode ? Math.floor(particleCount / 2) : particleCount;
            this.particles = null;
            this.positions = null;
            this.velocities = [];
            this.colors = null;
            this.sizes = null;
            this.originalPositions = [];

            this.init();
        }

        init() {
            const geometry = new THREE.BufferGeometry();
            this.positions = new Float32Array(this.particleCount * 3);
            this.colors = new Float32Array(this.particleCount * 3);
            this.sizes = new Float32Array(this.particleCount);

            // Color palette: white, gold, light blue
            const colorPalette = [
                { r: 1.0, g: 1.0, b: 1.0 },      // White
                { r: 1.0, g: 0.84, b: 0.0 },     // Gold
                { r: 0.68, g: 0.85, b: 0.9 }     // Light blue
            ];

            for (let i = 0; i < this.particleCount; i++) {
                const i3 = i * 3;

                // Random position in 3D space
                this.positions[i3] = (Math.random() - 0.5) * 100;
                this.positions[i3 + 1] = (Math.random() - 0.5) * 100;
                this.positions[i3 + 2] = (Math.random() - 0.5) * 50 - 25;

                // Store original positions for mouse interaction
                this.originalPositions.push({
                    x: this.positions[i3],
                    y: this.positions[i3 + 1],
                    z: this.positions[i3 + 2]
                });

                // Random velocities for drifting
                this.velocities.push({
                    x: (Math.random() - 0.5) * 0.02,
                    y: (Math.random() - 0.5) * 0.02,
                    z: (Math.random() - 0.5) * 0.01
                });

                // Random color from palette
                const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
                this.colors[i3] = color.r;
                this.colors[i3 + 1] = color.g;
                this.colors[i3 + 2] = color.b;

                // Random sizes
                this.sizes[i] = Math.random() * 2 + 0.5;
            }

            geometry.setAttribute('position', new THREE.BufferAttribute(this.positions, 3));
            geometry.setAttribute('color', new THREE.BufferAttribute(this.colors, 3));
            geometry.setAttribute('size', new THREE.BufferAttribute(this.sizes, 1));

            // Custom shader material for better looking particles
            const material = new THREE.ShaderMaterial({
                uniforms: {
                    time: { value: 0 },
                    pixelRatio: { value: renderer.getPixelRatio() }
                },
                vertexShader: `
                    attribute float size;
                    varying vec3 vColor;
                    uniform float time;
                    uniform float pixelRatio;

                    void main() {
                        vColor = color;
                        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);

                        // Twinkle effect
                        float twinkle = sin(time * 2.0 + position.x * 0.5 + position.y * 0.3) * 0.5 + 0.5;

                        gl_PointSize = size * pixelRatio * (300.0 / -mvPosition.z) * (0.8 + twinkle * 0.4);
                        gl_Position = projectionMatrix * mvPosition;
                    }
                `,
                fragmentShader: `
                    varying vec3 vColor;

                    void main() {
                        float dist = length(gl_PointCoord - vec2(0.5));
                        if (dist > 0.5) discard;

                        // Soft glow effect
                        float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
                        alpha = pow(alpha, 1.5);

                        gl_FragColor = vec4(vColor, alpha);
                    }
                `,
                transparent: true,
                vertexColors: true,
                blending: THREE.AdditiveBlending,
                depthWrite: false
            });

            this.particles = new THREE.Points(geometry, material);
            scene.add(this.particles);
        }

        update(deltaTime, mouseX, mouseY) {
            if (reducedMotion) return;

            const time = performance.now() * 0.001;
            this.particles.material.uniforms.time.value = time;

            const mouseInfluence = 15;
            const mouseRadius = 20;

            for (let i = 0; i < this.particleCount; i++) {
                const i3 = i * 3;
                const original = this.originalPositions[i];
                const velocity = this.velocities[i];

                // Calculate distance from mouse (converted to world coordinates)
                const worldMouseX = mouseX * 50;
                const worldMouseY = mouseY * 50;
                const dx = this.positions[i3] - worldMouseX;
                const dy = this.positions[i3 + 1] - worldMouseY;
                const dist = Math.sqrt(dx * dx + dy * dy);

                // Mouse repulsion effect
                if (dist < mouseRadius && dist > 0) {
                    const force = (1 - dist / mouseRadius) * mouseInfluence;
                    this.positions[i3] += (dx / dist) * force * deltaTime;
                    this.positions[i3 + 1] += (dy / dist) * force * deltaTime;
                } else {
                    // Slowly return to original position with drift
                    this.positions[i3] += velocity.x + (original.x - this.positions[i3]) * 0.01;
                    this.positions[i3 + 1] += velocity.y + (original.y - this.positions[i3 + 1]) * 0.01;
                }

                // Z-axis drift
                this.positions[i3 + 2] += velocity.z;

                // Boundary wrapping
                if (this.positions[i3] > 50) this.positions[i3] = -50;
                if (this.positions[i3] < -50) this.positions[i3] = 50;
                if (this.positions[i3 + 1] > 50) this.positions[i3 + 1] = -50;
                if (this.positions[i3 + 1] < -50) this.positions[i3 + 1] = 50;
                if (this.positions[i3 + 2] > 0) this.positions[i3 + 2] = -50;
                if (this.positions[i3 + 2] < -50) this.positions[i3 + 2] = 0;
            }

            this.particles.geometry.attributes.position.needsUpdate = true;
        }

        dispose() {
            if (this.particles) {
                this.particles.geometry.dispose();
                this.particles.material.dispose();
                scene.remove(this.particles);
            }
        }
    }

    /**
     * MouseGlow Class - Creates a glowing sphere that follows the mouse
     */
    class MouseGlow {
        constructor() {
            this.mesh = null;
            this.trails = [];
            this.maxTrails = lowPerformanceMode ? 5 : 10;
            this.trailOpacity = 1;

            this.init();
        }

        init() {
            // Main glow sphere
            const geometry = new THREE.SphereGeometry(1, 16, 16);

            const material = new THREE.ShaderMaterial({
                uniforms: {
                    time: { value: 0 },
                    glowColor: { value: new THREE.Color(0xffd700) }
                },
                vertexShader: `
                    varying vec3 vNormal;
                    varying vec3 vPosition;

                    void main() {
                        vNormal = normalize(normalMatrix * normal);
                        vPosition = position;
                        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                    }
                `,
                fragmentShader: `
                    uniform float time;
                    uniform vec3 glowColor;
                    varying vec3 vNormal;
                    varying vec3 vPosition;

                    void main() {
                        float intensity = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
                        float pulse = sin(time * 3.0) * 0.1 + 0.9;

                        vec3 color = glowColor * intensity * pulse;
                        float alpha = intensity * 0.8;

                        gl_FragColor = vec4(color, alpha);
                    }
                `,
                transparent: true,
                blending: THREE.AdditiveBlending,
                side: THREE.BackSide,
                depthWrite: false
            });

            this.mesh = new THREE.Mesh(geometry, material);
            this.mesh.scale.set(2, 2, 2);
            scene.add(this.mesh);

            // Initialize trail meshes
            for (let i = 0; i < this.maxTrails; i++) {
                const trailGeometry = new THREE.SphereGeometry(0.3, 8, 8);
                const trailMaterial = new THREE.MeshBasicMaterial({
                    color: 0xffd700,
                    transparent: true,
                    opacity: 0,
                    blending: THREE.AdditiveBlending
                });
                const trailMesh = new THREE.Mesh(trailGeometry, trailMaterial);
                trailMesh.visible = false;
                scene.add(trailMesh);
                this.trails.push({
                    mesh: trailMesh,
                    targetOpacity: 0,
                    position: { x: 0, y: 0, z: -10 }
                });
            }
        }

        update(deltaTime, mouseX, mouseY) {
            if (reducedMotion || !this.mesh) return;

            const time = performance.now() * 0.001;
            this.mesh.material.uniforms.time.value = time;

            // Convert normalized mouse to world coordinates
            const targetX = mouseX * 40;
            const targetY = mouseY * 30;

            // Smooth follow
            this.mesh.position.x += (targetX - this.mesh.position.x) * 0.1;
            this.mesh.position.y += (targetY - this.mesh.position.y) * 0.1;
            this.mesh.position.z = -5;

            // Update trails
            for (let i = this.trails.length - 1; i >= 0; i--) {
                const trail = this.trails[i];

                if (i === 0) {
                    // First trail follows the main sphere
                    trail.position.x = this.mesh.position.x;
                    trail.position.y = this.mesh.position.y;
                    trail.position.z = this.mesh.position.z;
                    trail.targetOpacity = 0.5;
                } else {
                    // Other trails follow the previous trail with delay
                    const prevTrail = this.trails[i - 1];
                    trail.position.x += (prevTrail.position.x - trail.position.x) * 0.3;
                    trail.position.y += (prevTrail.position.y - trail.position.y) * 0.3;
                    trail.position.z = prevTrail.position.z;
                    trail.targetOpacity = 0.5 * (1 - i / this.maxTrails);
                }

                trail.mesh.position.set(trail.position.x, trail.position.y, trail.position.z);
                trail.mesh.material.opacity += (trail.targetOpacity - trail.mesh.material.opacity) * 0.1;
                trail.mesh.visible = trail.mesh.material.opacity > 0.01;

                // Scale based on position in trail
                const scale = 0.5 * (1 - i / this.maxTrails);
                trail.mesh.scale.set(scale, scale, scale);
            }
        }

        dispose() {
            if (this.mesh) {
                this.mesh.geometry.dispose();
                this.mesh.material.dispose();
                scene.remove(this.mesh);
            }
            this.trails.forEach(trail => {
                trail.mesh.geometry.dispose();
                trail.mesh.material.dispose();
                scene.remove(trail.mesh);
            });
            this.trails = [];
        }
    }

    /**
     * Fireworks Class - Creates explosion effects for donation success
     */
    class Fireworks {
        constructor() {
            this.particles = null;
            this.particleCount = lowPerformanceMode ? 50 : 100;
            this.positions = null;
            this.velocities = [];
            this.colors = null;
            this.lifetimes = [];
            this.isActive = false;
            this.startTime = 0;
            this.duration = 2000; // 2 seconds
            this.origin = { x: 0, y: 0, z: -10 };

            this.init();
        }

        init() {
            const geometry = new THREE.BufferGeometry();
            this.positions = new Float32Array(this.particleCount * 3);
            this.colors = new Float32Array(this.particleCount * 3);
            const sizes = new Float32Array(this.particleCount);

            // Color palette: gold, red, purple
            const colorPalette = [
                { r: 1.0, g: 0.84, b: 0.0 },     // Gold
                { r: 1.0, g: 0.2, b: 0.2 },      // Red
                { r: 0.6, g: 0.2, b: 0.8 }       // Purple
            ];

            for (let i = 0; i < this.particleCount; i++) {
                const i3 = i * 3;

                // Start at origin (will be set on trigger)
                this.positions[i3] = 0;
                this.positions[i3 + 1] = 0;
                this.positions[i3 + 2] = -10;

                // Random explosion velocity (spherical distribution)
                const theta = Math.random() * Math.PI * 2;
                const phi = Math.random() * Math.PI;
                const speed = 15 + Math.random() * 20;

                this.velocities.push({
                    x: Math.sin(phi) * Math.cos(theta) * speed,
                    y: Math.sin(phi) * Math.sin(theta) * speed,
                    z: Math.cos(phi) * speed * 0.3
                });

                // Random color from palette
                const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
                this.colors[i3] = color.r;
                this.colors[i3 + 1] = color.g;
                this.colors[i3 + 2] = color.b;

                // Random sizes
                sizes[i] = Math.random() * 3 + 1;

                // Lifetime variation
                this.lifetimes.push(0.7 + Math.random() * 0.3);
            }

            geometry.setAttribute('position', new THREE.BufferAttribute(this.positions, 3));
            geometry.setAttribute('color', new THREE.BufferAttribute(this.colors, 3));
            geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

            const material = new THREE.ShaderMaterial({
                uniforms: {
                    time: { value: 0 },
                    progress: { value: 0 },
                    pixelRatio: { value: renderer.getPixelRatio() }
                },
                vertexShader: `
                    attribute float size;
                    varying vec3 vColor;
                    varying float vAlpha;
                    uniform float progress;
                    uniform float pixelRatio;

                    void main() {
                        vColor = color;
                        vAlpha = 1.0 - progress;

                        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                        gl_PointSize = size * pixelRatio * (200.0 / -mvPosition.z) * (1.0 - progress * 0.5);
                        gl_Position = projectionMatrix * mvPosition;
                    }
                `,
                fragmentShader: `
                    varying vec3 vColor;
                    varying float vAlpha;

                    void main() {
                        float dist = length(gl_PointCoord - vec2(0.5));
                        if (dist > 0.5) discard;

                        float alpha = (1.0 - dist * 2.0) * vAlpha;
                        gl_FragColor = vec4(vColor, alpha);
                    }
                `,
                transparent: true,
                vertexColors: true,
                blending: THREE.AdditiveBlending,
                depthWrite: false
            });

            this.particles = new THREE.Points(geometry, material);
            this.particles.visible = false;
            scene.add(this.particles);
        }

        trigger(x = 0, y = 0) {
            if (reducedMotion) return;

            this.isActive = true;
            this.startTime = performance.now();
            this.origin.x = x * 40;
            this.origin.y = y * 30;
            this.particles.visible = true;

            // Reset positions to origin
            for (let i = 0; i < this.particleCount; i++) {
                const i3 = i * 3;
                this.positions[i3] = this.origin.x;
                this.positions[i3 + 1] = this.origin.y;
                this.positions[i3 + 2] = this.origin.z;

                // Regenerate velocities for variety
                const theta = Math.random() * Math.PI * 2;
                const phi = Math.random() * Math.PI;
                const speed = 15 + Math.random() * 20;

                this.velocities[i] = {
                    x: Math.sin(phi) * Math.cos(theta) * speed,
                    y: Math.sin(phi) * Math.sin(theta) * speed,
                    z: Math.cos(phi) * speed * 0.3
                };
            }

            this.particles.geometry.attributes.position.needsUpdate = true;
        }

        update(deltaTime) {
            if (!this.isActive) return;

            const elapsed = performance.now() - this.startTime;
            const progress = Math.min(elapsed / this.duration, 1);

            this.particles.material.uniforms.progress.value = progress;

            const gravity = -30;

            for (let i = 0; i < this.particleCount; i++) {
                const i3 = i * 3;
                const velocity = this.velocities[i];
                const lifetime = this.lifetimes[i];

                if (progress < lifetime) {
                    // Apply velocity
                    this.positions[i3] += velocity.x * deltaTime;
                    this.positions[i3 + 1] += velocity.y * deltaTime;
                    this.positions[i3 + 2] += velocity.z * deltaTime;

                    // Apply gravity
                    velocity.y += gravity * deltaTime;

                    // Apply drag
                    velocity.x *= 0.99;
                    velocity.y *= 0.99;
                    velocity.z *= 0.99;
                }
            }

            this.particles.geometry.attributes.position.needsUpdate = true;

            // Auto cleanup
            if (progress >= 1) {
                this.isActive = false;
                this.particles.visible = false;
            }
        }

        dispose() {
            if (this.particles) {
                this.particles.geometry.dispose();
                this.particles.material.dispose();
                scene.remove(this.particles);
            }
        }
    }

    /**
     * Initialize the Three.js scene and effects
     * @param {HTMLElement} containerElement - Container for the canvas
     * @returns {boolean} Success status
     */
    function init(containerElement) {
        if (isInitialized) {
            console.warn('ThreeEffects already initialized');
            return true;
        }

        if (!containerElement) {
            console.error('ThreeEffects: Container element required');
            return false;
        }

        container = containerElement;
        reducedMotion = checkReducedMotion();
        lowPerformanceMode = checkLowPerformance();

        // Check WebGL support
        if (!isWebGLSupported()) {
            console.warn('ThreeEffects: WebGL not supported, applying CSS fallback');
            container.classList.add('no-webgl');
            return false;
        }

        // Check if Three.js is loaded
        if (typeof THREE === 'undefined') {
            console.error('ThreeEffects: Three.js library not loaded');
            return false;
        }

        try {
            // Create scene
            scene = new THREE.Scene();

            // Create camera
            const aspect = container.clientWidth / container.clientHeight;
            camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
            camera.position.z = 30;

            // Create renderer
            renderer = new THREE.WebGLRenderer({
                antialias: !lowPerformanceMode,
                alpha: true,
                powerPreference: lowPerformanceMode ? 'low-power' : 'high-performance'
            });
            renderer.setSize(container.clientWidth, container.clientHeight);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, lowPerformanceMode ? 1 : 2));
            renderer.setClearColor(0x000000, 0);

            // Insert canvas
            renderer.domElement.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: 0;
            `;
            container.insertBefore(renderer.domElement, container.firstChild);

            // Initialize effects
            if (!reducedMotion) {
                particleField = new ParticleField(500);
                mouseGlow = new MouseGlow();
            }

            // Event listeners
            setupEventListeners();

            // Visibility observer
            setupVisibilityObserver();

            isInitialized = true;
            lastFrameTime = performance.now();

            // Start animation
            animate();

            console.log('ThreeEffects initialized successfully');
            return true;

        } catch (error) {
            console.error('ThreeEffects initialization error:', error);
            container.classList.add('no-webgl');
            return false;
        }
    }

    /**
     * Setup event listeners
     */
    function setupEventListeners() {
        // Mouse move
        document.addEventListener('mousemove', handleMouseMove);

        // Window resize
        window.addEventListener('resize', handleResize);

        // Reduced motion change
        window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
            reducedMotion = e.matches;
            if (reducedMotion) {
                // Disable effects
                if (particleField) particleField.dispose();
                if (mouseGlow) mouseGlow.dispose();
                particleField = null;
                mouseGlow = null;
            } else if (isInitialized) {
                // Re-enable effects
                particleField = new ParticleField(500);
                mouseGlow = new MouseGlow();
            }
        });
    }

    /**
     * Handle mouse movement
     * @param {MouseEvent} event
     */
    function handleMouseMove(event) {
        mouse.x = event.clientX;
        mouse.y = event.clientY;

        // Normalized coordinates (-1 to 1)
        mouseNormalized.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouseNormalized.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }

    /**
     * Handle window resize
     */
    function handleResize() {
        if (!container || !camera || !renderer) return;

        const width = container.clientWidth;
        const height = container.clientHeight;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    }

    /**
     * Setup Intersection Observer for visibility detection
     */
    function setupVisibilityObserver() {
        if (!container) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                isVisible = entry.isIntersecting;
            });
        }, { threshold: 0.1 });

        observer.observe(container);
    }

    /**
     * Main animation loop
     */
    function animate() {
        animationId = requestAnimationFrame(animate);

        // Skip rendering if not visible or reduced motion
        if (!isVisible || reducedMotion) {
            return;
        }

        const currentTime = performance.now();
        const deltaTime = Math.min((currentTime - lastFrameTime) / 1000, 0.1); // Cap at 100ms
        lastFrameTime = currentTime;

        // FPS monitoring
        frameCount++;
        if (frameCount % 60 === 0) {
            fps = 1000 / (currentTime - lastFrameTime);

            // Auto-degrade performance if needed
            if (fps < 30 && !lowPerformanceMode) {
                lowPerformanceMode = true;
                console.log('ThreeEffects: Switching to low performance mode');
            }
        }

        // Update effects
        if (particleField) {
            particleField.update(deltaTime, mouseNormalized.x, mouseNormalized.y);
        }

        if (mouseGlow) {
            mouseGlow.update(deltaTime, mouseNormalized.x, mouseNormalized.y);
        }

        // Update active fireworks
        activeFireworks.forEach(firework => {
            firework.update(deltaTime);
        });

        // Render
        renderer.render(scene, camera);
    }

    /**
     * Trigger fireworks effect
     * @param {number} x - Normalized x position (-1 to 1)
     * @param {number} y - Normalized y position (-1 to 1)
     */
    function triggerFireworks(x = 0, y = 0) {
        if (!isInitialized || reducedMotion) return;

        const firework = new Fireworks();
        firework.trigger(x, y);
        activeFireworks.push(firework);

        // Cleanup after animation
        setTimeout(() => {
            const index = activeFireworks.indexOf(firework);
            if (index > -1) {
                firework.dispose();
                activeFireworks.splice(index, 1);
            }
        }, 2500);
    }

    /**
     * Clean up and destroy all resources
     */
    function destroy() {
        // Stop animation
        if (animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
        }

        // Remove event listeners
        document.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('resize', handleResize);

        // Dispose effects
        if (particleField) {
            particleField.dispose();
            particleField = null;
        }

        if (mouseGlow) {
            mouseGlow.dispose();
            mouseGlow = null;
        }

        activeFireworks.forEach(firework => firework.dispose());
        activeFireworks = [];

        // Dispose Three.js resources
        if (renderer) {
            renderer.dispose();
            if (renderer.domElement && renderer.domElement.parentNode) {
                renderer.domElement.parentNode.removeChild(renderer.domElement);
            }
            renderer = null;
        }

        scene = null;
        camera = null;
        container = null;
        isInitialized = false;

        console.log('ThreeEffects destroyed');
    }

    /**
     * Get current status
     * @returns {Object} Status information
     */
    function getStatus() {
        return {
            initialized: isInitialized,
            webglSupported: isWebGLSupported(),
            reducedMotion: reducedMotion,
            lowPerformanceMode: lowPerformanceMode,
            visible: isVisible,
            fps: fps,
            activeFireworks: activeFireworks.length
        };
    }

    // Public API
    return {
        init: init,
        animate: animate,
        destroy: destroy,
        triggerFireworks: triggerFireworks,
        getStatus: getStatus,

        // Expose classes for advanced usage
        ParticleField: ParticleField,
        MouseGlow: MouseGlow,
        Fireworks: Fireworks
    };
})();

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ThreeEffects;
}
