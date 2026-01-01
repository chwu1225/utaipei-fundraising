/* ============================================
   UTAIPEI FUNDRAISING V4 Pro
   GSAP ScrollTrigger Animation Module
   ============================================

   Features:
   - Parallax backgrounds
   - Scroll reveal animations
   - Staggered card entries
   - Text reveal effects
   - Horizontal scroll sections
   - Count-up on scroll
   - Magnetic buttons
   - Smooth scrolling integration

   Dependencies:
   - GSAP 3.x
   - ScrollTrigger plugin
   - Optional: ScrollSmoother, SplitText
   ============================================ */

/**
 * GSAPAnimations Namespace
 * Centralized animation controller with accessibility support
 */
const GSAPAnimations = (() => {
    'use strict';

    // ============================================
    // PRIVATE STATE
    // ============================================

    let _initialized = false;
    let _prefersReducedMotion = false;
    let _gsapContext = null;
    let _smoothScroller = null;
    let _magneticElements = [];
    let _resizeObserver = null;

    // Configuration defaults
    const CONFIG = {
        parallax: {
            aurora: 0.3,
            mid: 0.6,
            slow: 0.2,
            fast: 0.8
        },
        reveal: {
            y: 60,
            opacity: 0,
            rotateX: 10,
            duration: 1,
            stagger: 0.1,
            start: 'top 80%'
        },
        cards: {
            y: 100,
            scale: 0.95,
            duration: 0.8,
            stagger: 0.15,
            start: 'top 85%'
        },
        text: {
            duration: 0.8,
            stagger: 0.05,
            colorFrom: 'rgba(255, 255, 255, 0.4)',
            colorTo: 'var(--gold-primary, #D4AF37)'
        },
        horizontal: {
            ease: 'none',
            scrub: 1
        },
        magnetic: {
            strength: 0.3,
            ease: 0.1
        },
        smooth: {
            smoothTouch: 0.1,
            effects: true,
            normalizeScroll: true
        }
    };

    // Breakpoints for responsive behavior
    const BREAKPOINTS = {
        mobile: '(max-width: 767px)',
        tablet: '(min-width: 768px) and (max-width: 1023px)',
        desktop: '(min-width: 1024px)'
    };

    // ============================================
    // UTILITY FUNCTIONS
    // ============================================

    /**
     * Check if GSAP and ScrollTrigger are available
     */
    function _checkDependencies() {
        if (typeof gsap === 'undefined') {
            console.warn('[GSAPAnimations] GSAP not found. Animations disabled.');
            return false;
        }
        if (typeof ScrollTrigger === 'undefined') {
            console.warn('[GSAPAnimations] ScrollTrigger not found. Scroll animations disabled.');
            return false;
        }
        return true;
    }

    /**
     * Detect user preference for reduced motion
     */
    function _detectReducedMotion() {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        _prefersReducedMotion = mediaQuery.matches;

        // Listen for changes
        mediaQuery.addEventListener('change', (e) => {
            _prefersReducedMotion = e.matches;
            if (_prefersReducedMotion) {
                _disableAllAnimations();
            } else {
                _enableAllAnimations();
            }
        });

        return _prefersReducedMotion;
    }

    /**
     * Disable all animations for reduced motion preference
     */
    function _disableAllAnimations() {
        if (_gsapContext) {
            _gsapContext.revert();
        }
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        document.documentElement.classList.add('reduce-motion');
        console.info('[GSAPAnimations] Reduced motion enabled - animations disabled');
    }

    /**
     * Re-enable animations
     */
    function _enableAllAnimations() {
        document.documentElement.classList.remove('reduce-motion');
        init();
    }

    /**
     * Create GSAP context for cleanup management
     */
    function _createContext() {
        if (_gsapContext) {
            _gsapContext.revert();
        }
        _gsapContext = gsap.context(() => {});
        return _gsapContext;
    }

    /**
     * Safe element selector with null check
     */
    function _select(selector, context = document) {
        const elements = context.querySelectorAll(selector);
        return elements.length > 0 ? elements : null;
    }

    /**
     * Get responsive value based on breakpoint
     */
    function _getResponsiveValue(desktop, tablet, mobile) {
        if (window.matchMedia(BREAKPOINTS.mobile).matches) return mobile;
        if (window.matchMedia(BREAKPOINTS.tablet).matches) return tablet;
        return desktop;
    }

    // ============================================
    // ANIMATION MODULES
    // ============================================

    /**
     * 1. Parallax Background Effect
     * Creates depth by moving layers at different speeds
     */
    function parallaxBackground() {
        if (_prefersReducedMotion) return;

        const auroraContainer = _select('.aurora-container, [data-parallax="aurora"]');
        const parallaxMid = _select('.parallax-mid, [data-parallax="mid"]');
        const parallaxSlow = _select('[data-parallax="slow"]');
        const parallaxFast = _select('[data-parallax="fast"]');

        // Aurora background parallax
        if (auroraContainer) {
            auroraContainer.forEach(el => {
                gsap.to(el, {
                    yPercent: -30,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: el.closest('section') || el,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: true,
                        invalidateOnRefresh: true
                    }
                });
            });
        }

        // Mid-layer parallax
        if (parallaxMid) {
            parallaxMid.forEach(el => {
                gsap.to(el, {
                    yPercent: -60,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: el.closest('section') || el,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: true,
                        invalidateOnRefresh: true
                    }
                });
            });
        }

        // Slow parallax elements
        if (parallaxSlow) {
            parallaxSlow.forEach(el => {
                const speed = parseFloat(el.dataset.parallaxSpeed) || CONFIG.parallax.slow;
                gsap.to(el, {
                    yPercent: -20 * speed,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: el.closest('section') || el,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: true
                    }
                });
            });
        }

        // Fast parallax elements
        if (parallaxFast) {
            parallaxFast.forEach(el => {
                const speed = parseFloat(el.dataset.parallaxSpeed) || CONFIG.parallax.fast;
                gsap.to(el, {
                    yPercent: -80 * speed,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: el.closest('section') || el,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: true
                    }
                });
            });
        }

        console.info('[GSAPAnimations] Parallax backgrounds initialized');
    }

    /**
     * 2. Scroll Reveal Animation
     * Elements reveal with transform and opacity on scroll
     */
    function revealOnScroll() {
        if (_prefersReducedMotion) return;

        const revealElements = _select('[data-gsap="reveal"]');
        if (!revealElements) return;

        revealElements.forEach((el, index) => {
            // Get custom settings from data attributes
            const customY = parseFloat(el.dataset.gsapY) || CONFIG.reveal.y;
            const customRotate = parseFloat(el.dataset.gsapRotate) || CONFIG.reveal.rotateX;
            const customDuration = parseFloat(el.dataset.gsapDuration) || CONFIG.reveal.duration;
            const customDelay = parseFloat(el.dataset.gsapDelay) || 0;
            const customStart = el.dataset.gsapStart || CONFIG.reveal.start;

            gsap.from(el, {
                y: customY,
                opacity: 0,
                rotateX: customRotate,
                transformPerspective: 1000,
                transformOrigin: 'center top',
                duration: customDuration,
                delay: customDelay,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: el,
                    start: customStart,
                    toggleActions: 'play none none reverse',
                    once: el.dataset.gsapOnce === 'true'
                }
            });
        });

        console.info(`[GSAPAnimations] Reveal animations: ${revealElements.length} elements`);
    }

    /**
     * 3. Staggered Card Animation
     * Cards enter in sequence with scale and movement
     */
    function staggerCards() {
        if (_prefersReducedMotion) return;

        const cardContainers = _select('.card-grid, .stats-grid, [data-gsap="cards-container"]');
        if (!cardContainers) return;

        cardContainers.forEach(container => {
            const cards = container.querySelectorAll('.card-project, .stats-card, [data-gsap="card"]');
            if (cards.length === 0) return;

            // Get responsive stagger value
            const staggerValue = _getResponsiveValue(
                CONFIG.cards.stagger,
                CONFIG.cards.stagger * 0.8,
                CONFIG.cards.stagger * 0.5
            );

            gsap.from(cards, {
                y: CONFIG.cards.y,
                opacity: 0,
                scale: CONFIG.cards.scale,
                duration: CONFIG.cards.duration,
                stagger: {
                    each: staggerValue,
                    from: 'start',
                    grid: 'auto',
                    ease: 'power2.out'
                },
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: container,
                    start: CONFIG.cards.start,
                    toggleActions: 'play none none reverse'
                }
            });
        });

        console.info('[GSAPAnimations] Card stagger animations initialized');
    }

    /**
     * 4. Text Reveal Animation
     * Lines reveal with color transition from gray to gold
     */
    function textReveal() {
        if (_prefersReducedMotion) return;

        const textElements = _select('[data-gsap="text-reveal"]');
        if (!textElements) return;

        textElements.forEach(el => {
            // Check if SplitText is available
            if (typeof SplitText !== 'undefined') {
                _textRevealWithSplitText(el);
            } else {
                _textRevealManual(el);
            }
        });

        console.info(`[GSAPAnimations] Text reveal: ${textElements.length} elements`);
    }

    /**
     * Text reveal using SplitText plugin
     */
    function _textRevealWithSplitText(el) {
        const split = new SplitText(el, { type: 'lines', linesClass: 'split-line' });

        // Wrap lines for overflow hidden effect
        split.lines.forEach(line => {
            const wrapper = document.createElement('div');
            wrapper.style.overflow = 'hidden';
            line.parentNode.insertBefore(wrapper, line);
            wrapper.appendChild(line);
        });

        gsap.from(split.lines, {
            y: '100%',
            opacity: 0,
            color: CONFIG.text.colorFrom,
            duration: CONFIG.text.duration,
            stagger: CONFIG.text.stagger,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            onComplete: () => {
                gsap.to(split.lines, {
                    color: CONFIG.text.colorTo,
                    duration: 0.5,
                    stagger: 0.02
                });
            }
        });
    }

    /**
     * Manual text reveal without SplitText
     */
    function _textRevealManual(el) {
        const text = el.textContent;
        const words = text.split(' ');

        // Clear and rebuild with spans
        el.innerHTML = '';
        words.forEach((word, i) => {
            const span = document.createElement('span');
            span.textContent = word + ' ';
            span.style.display = 'inline-block';
            span.style.opacity = '0';
            span.style.transform = 'translateY(20px)';
            span.style.color = CONFIG.text.colorFrom;
            el.appendChild(span);
        });

        const spans = el.querySelectorAll('span');

        gsap.to(spans, {
            opacity: 1,
            y: 0,
            color: CONFIG.text.colorTo,
            duration: CONFIG.text.duration,
            stagger: CONFIG.text.stagger,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        });
    }

    /**
     * 5. Horizontal Scroll Section
     * Creates horizontal scrolling within a vertical scroll container
     */
    function horizontalScroll() {
        if (_prefersReducedMotion) return;

        const horizontalSections = _select('.horizontal-section, [data-gsap="horizontal"]');
        if (!horizontalSections) return;

        horizontalSections.forEach(section => {
            const track = section.querySelector('.horizontal-track, [data-gsap="horizontal-track"]');
            const progressIndicator = section.querySelector('.horizontal-progress, [data-gsap="horizontal-progress"]');

            if (!track) return;

            // Get track width for scroll calculation
            const getScrollAmount = () => {
                return -(track.scrollWidth - window.innerWidth);
            };

            // Main horizontal scroll animation
            const horizontalTween = gsap.to(track, {
                x: getScrollAmount,
                ease: CONFIG.horizontal.ease,
                scrollTrigger: {
                    trigger: section,
                    start: 'top top',
                    end: () => `+=${track.scrollWidth - window.innerWidth}`,
                    scrub: CONFIG.horizontal.scrub,
                    pin: true,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                    onUpdate: (self) => {
                        // Update progress indicator if exists
                        if (progressIndicator) {
                            gsap.set(progressIndicator, {
                                scaleX: self.progress,
                                transformOrigin: 'left center'
                            });
                        }

                        // Dispatch custom event for external progress tracking
                        section.dispatchEvent(new CustomEvent('horizontalProgress', {
                            detail: { progress: self.progress }
                        }));
                    }
                }
            });

            // Add navigation dots if present
            const dots = section.querySelectorAll('.horizontal-dot, [data-gsap="horizontal-dot"]');
            if (dots.length > 0) {
                const panels = track.querySelectorAll('.horizontal-panel, [data-gsap="horizontal-panel"]');
                dots.forEach((dot, i) => {
                    dot.addEventListener('click', () => {
                        const targetProgress = i / (panels.length - 1);
                        gsap.to(window, {
                            scrollTo: {
                                y: section.offsetTop + (track.scrollWidth - window.innerWidth) * targetProgress,
                                autoKill: false
                            },
                            duration: 1,
                            ease: 'power2.inOut'
                        });
                    });
                });
            }
        });

        console.info('[GSAPAnimations] Horizontal scroll sections initialized');
    }

    /**
     * 6. Count Up On Scroll
     * Triggers counting animation when element enters viewport
     */
    function countUpOnScroll() {
        if (_prefersReducedMotion) return;

        const countElements = _select('[data-countup], [data-gsap="countup"]');
        if (!countElements) return;

        countElements.forEach(el => {
            const target = parseFloat(el.dataset.target || el.dataset.countup) || 0;
            const duration = parseFloat(el.dataset.countupDuration) || 2;
            const decimals = parseInt(el.dataset.countupDecimals) || 0;
            const prefix = el.dataset.countupPrefix || '';
            const suffix = el.dataset.countupSuffix || '';
            const separator = el.dataset.countupSeparator !== 'false';

            // Store original value
            el.dataset.originalValue = el.textContent;

            // Set initial value
            el.textContent = prefix + '0' + suffix;

            // Create counter object
            const counter = { value: 0 };

            gsap.to(counter, {
                value: target,
                duration: duration,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 80%',
                    once: true,
                    onEnter: () => {
                        el.classList.add('counting');
                    }
                },
                onUpdate: () => {
                    let displayValue = decimals > 0
                        ? counter.value.toFixed(decimals)
                        : Math.floor(counter.value);

                    if (separator) {
                        displayValue = displayValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                    }

                    el.textContent = prefix + displayValue + suffix;
                },
                onComplete: () => {
                    el.classList.remove('counting');
                    el.classList.add('counted');
                }
            });
        });

        console.info(`[GSAPAnimations] Count-up animations: ${countElements.length} elements`);
    }

    /**
     * 7. Magnetic Button Effect
     * Buttons follow cursor with magnetic attraction
     */
    function magneticButtons() {
        if (_prefersReducedMotion) return;

        // Only enable on desktop
        if (window.matchMedia(BREAKPOINTS.mobile).matches) return;

        const magneticElements = _select('.btn-gold, .btn-magnetic, [data-gsap="magnetic"]');
        if (!magneticElements) return;

        magneticElements.forEach(el => {
            const strength = parseFloat(el.dataset.magneticStrength) || CONFIG.magnetic.strength;

            // Create quickTo functions for performance
            const xTo = gsap.quickTo(el, 'x', { duration: 0.3, ease: 'power3.out' });
            const yTo = gsap.quickTo(el, 'y', { duration: 0.3, ease: 'power3.out' });

            // Store for cleanup
            const handlers = {
                mouseMove: (e) => {
                    const rect = el.getBoundingClientRect();
                    const centerX = rect.left + rect.width / 2;
                    const centerY = rect.top + rect.height / 2;

                    const deltaX = (e.clientX - centerX) * strength;
                    const deltaY = (e.clientY - centerY) * strength;

                    xTo(deltaX);
                    yTo(deltaY);
                },
                mouseLeave: () => {
                    xTo(0);
                    yTo(0);
                }
            };

            el.addEventListener('mousemove', handlers.mouseMove);
            el.addEventListener('mouseleave', handlers.mouseLeave);

            // Store handlers for cleanup
            _magneticElements.push({ el, handlers });
        });

        console.info(`[GSAPAnimations] Magnetic buttons: ${magneticElements.length} elements`);
    }

    /**
     * 8. Smooth Scroll Implementation
     * Optional ScrollSmoother or Lenis integration
     */
    function smoothScroll() {
        if (_prefersReducedMotion) return;

        // Check for ScrollSmoother (GSAP premium)
        if (typeof ScrollSmoother !== 'undefined') {
            _initScrollSmoother();
            return;
        }

        // Check for Lenis
        if (typeof Lenis !== 'undefined') {
            _initLenis();
            return;
        }

        // Fallback: Native smooth scroll enhancement
        _initNativeSmoothScroll();
    }

    /**
     * Initialize GSAP ScrollSmoother
     */
    function _initScrollSmoother() {
        gsap.registerPlugin(ScrollSmoother);

        // Ensure wrapper structure exists
        const wrapper = document.querySelector('#smooth-wrapper');
        const content = document.querySelector('#smooth-content');

        if (!wrapper || !content) {
            console.warn('[GSAPAnimations] ScrollSmoother requires #smooth-wrapper and #smooth-content');
            return;
        }

        _smoothScroller = ScrollSmoother.create({
            wrapper: wrapper,
            content: content,
            smooth: 1.5,
            effects: CONFIG.smooth.effects,
            normalizeScroll: CONFIG.smooth.normalizeScroll,
            smoothTouch: CONFIG.smooth.smoothTouch
        });

        console.info('[GSAPAnimations] ScrollSmoother initialized');
    }

    /**
     * Initialize Lenis smooth scroll
     */
    function _initLenis() {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
            infinite: false
        });

        // Integrate with GSAP
        lenis.on('scroll', ScrollTrigger.update);

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);

        _smoothScroller = lenis;

        console.info('[GSAPAnimations] Lenis smooth scroll initialized');
    }

    /**
     * Native smooth scroll enhancement
     */
    function _initNativeSmoothScroll() {
        // Add smooth scroll to anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;

                const target = document.querySelector(targetId);
                if (!target) return;

                e.preventDefault();

                gsap.to(window, {
                    scrollTo: {
                        y: target,
                        offsetY: 80
                    },
                    duration: 1,
                    ease: 'power2.inOut'
                });
            });
        });

        console.info('[GSAPAnimations] Native smooth scroll enhanced');
    }

    // ============================================
    // RESPONSIVE HANDLING
    // ============================================

    /**
     * Setup responsive breakpoint handling
     */
    function _setupResponsiveHandlers() {
        // Create matchMedia contexts
        const mm = gsap.matchMedia();

        mm.add({
            isDesktop: BREAKPOINTS.desktop,
            isTablet: BREAKPOINTS.tablet,
            isMobile: BREAKPOINTS.mobile,
            reduceMotion: '(prefers-reduced-motion: reduce)'
        }, (context) => {
            const { isDesktop, isTablet, isMobile, reduceMotion } = context.conditions;

            if (reduceMotion) {
                return; // Skip all animations
            }

            // Desktop-specific animations
            if (isDesktop) {
                magneticButtons();
            }

            // Adjust reveal animations for mobile
            if (isMobile) {
                // Reduce animation complexity on mobile
                gsap.config({
                    force3D: false
                });
            }
        });

        // Handle resize
        _resizeObserver = new ResizeObserver(
            gsap.utils.debounce(() => {
                ScrollTrigger.refresh();
            }, 200)
        );

        _resizeObserver.observe(document.body);
    }

    // ============================================
    // PUBLIC API
    // ============================================

    /**
     * Initialize all GSAP animations
     * @param {Object} options - Configuration options
     */
    function init(options = {}) {
        // Check dependencies
        if (!_checkDependencies()) return;

        // Detect reduced motion preference
        if (_detectReducedMotion()) {
            console.info('[GSAPAnimations] Reduced motion preferred - animations disabled');
            return;
        }

        // Prevent double initialization
        if (_initialized) {
            console.warn('[GSAPAnimations] Already initialized. Call destroy() first to reinitialize.');
            return;
        }

        // Merge custom config
        Object.assign(CONFIG, options);

        // Register ScrollTrigger
        gsap.registerPlugin(ScrollTrigger);

        // Register ScrollToPlugin if available
        if (typeof ScrollToPlugin !== 'undefined') {
            gsap.registerPlugin(ScrollToPlugin);
        }

        // Create context for cleanup
        _createContext();

        // Setup responsive handlers
        _setupResponsiveHandlers();

        // Initialize animation modules
        _gsapContext.add(() => {
            parallaxBackground();
            revealOnScroll();
            staggerCards();
            textReveal();
            horizontalScroll();
            countUpOnScroll();
            smoothScroll();

            // Magnetic buttons only on desktop (handled in responsive)
            if (!window.matchMedia(BREAKPOINTS.mobile).matches) {
                magneticButtons();
            }
        });

        _initialized = true;

        // Refresh ScrollTrigger after DOM is fully loaded
        window.addEventListener('load', () => {
            ScrollTrigger.refresh();
        });

        console.info('[GSAPAnimations] Initialization complete');
    }

    /**
     * Destroy all animations and cleanup
     */
    function destroy() {
        // Kill all ScrollTriggers
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());

        // Revert GSAP context
        if (_gsapContext) {
            _gsapContext.revert();
            _gsapContext = null;
        }

        // Remove magnetic event listeners
        _magneticElements.forEach(({ el, handlers }) => {
            el.removeEventListener('mousemove', handlers.mouseMove);
            el.removeEventListener('mouseleave', handlers.mouseLeave);
        });
        _magneticElements = [];

        // Destroy smooth scroller
        if (_smoothScroller) {
            if (_smoothScroller.destroy) _smoothScroller.destroy();
            _smoothScroller = null;
        }

        // Disconnect resize observer
        if (_resizeObserver) {
            _resizeObserver.disconnect();
            _resizeObserver = null;
        }

        _initialized = false;

        console.info('[GSAPAnimations] Destroyed and cleaned up');
    }

    /**
     * Refresh all ScrollTrigger instances
     */
    function refresh() {
        ScrollTrigger.refresh();
    }

    /**
     * Scroll to element with GSAP animation
     * @param {string|Element} target - Selector or element
     * @param {Object} options - Scroll options
     */
    function scrollTo(target, options = {}) {
        const defaults = {
            duration: 1,
            ease: 'power2.inOut',
            offsetY: 80
        };
        const settings = { ...defaults, ...options };

        if (_smoothScroller && _smoothScroller.scrollTo) {
            // Use ScrollSmoother or Lenis
            _smoothScroller.scrollTo(target, true);
        } else if (typeof ScrollToPlugin !== 'undefined') {
            // Use GSAP ScrollToPlugin
            gsap.to(window, {
                scrollTo: {
                    y: target,
                    offsetY: settings.offsetY,
                    autoKill: settings.autoKill !== false
                },
                duration: settings.duration,
                ease: settings.ease
            });
        } else {
            // Native fallback
            const element = typeof target === 'string'
                ? document.querySelector(target)
                : target;
            if (element) {
                const top = element.getBoundingClientRect().top + window.pageYOffset - settings.offsetY;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        }
    }

    /**
     * Pause all animations
     */
    function pause() {
        ScrollTrigger.getAll().forEach(trigger => trigger.disable());
        if (_smoothScroller && _smoothScroller.stop) {
            _smoothScroller.stop();
        }
    }

    /**
     * Resume all animations
     */
    function resume() {
        ScrollTrigger.getAll().forEach(trigger => trigger.enable());
        if (_smoothScroller && _smoothScroller.start) {
            _smoothScroller.start();
        }
    }

    /**
     * Get current configuration
     */
    function getConfig() {
        return { ...CONFIG };
    }

    /**
     * Update configuration
     * @param {Object} newConfig - New configuration options
     */
    function setConfig(newConfig) {
        Object.assign(CONFIG, newConfig);
    }

    /**
     * Check if animations are initialized
     */
    function isInitialized() {
        return _initialized;
    }

    /**
     * Check if reduced motion is preferred
     */
    function isReducedMotion() {
        return _prefersReducedMotion;
    }

    // ============================================
    // EXPOSE PUBLIC API
    // ============================================

    return {
        // Main methods
        init,
        destroy,
        refresh,
        scrollTo,
        pause,
        resume,

        // Animation modules (for manual control)
        parallaxBackground,
        revealOnScroll,
        staggerCards,
        textReveal,
        horizontalScroll,
        countUpOnScroll,
        magneticButtons,
        smoothScroll,

        // Configuration
        getConfig,
        setConfig,

        // State checks
        isInitialized,
        isReducedMotion,

        // Constants
        BREAKPOINTS,
        CONFIG
    };
})();

// ============================================
// AUTO-INITIALIZATION
// ============================================

// Auto-init when DOM is ready (can be disabled with data-gsap-manual)
if (!document.documentElement.hasAttribute('data-gsap-manual')) {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => GSAPAnimations.init());
    } else {
        GSAPAnimations.init();
    }
}

// ============================================
// EXPORT FOR MODULE SYSTEMS
// ============================================

// CommonJS
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GSAPAnimations;
}

// AMD
if (typeof define === 'function' && define.amd) {
    define([], function() { return GSAPAnimations; });
}

// Global
if (typeof window !== 'undefined') {
    window.GSAPAnimations = GSAPAnimations;
}
