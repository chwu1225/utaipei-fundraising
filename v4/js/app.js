/* ============================================
   UTAIPEI FUNDRAISING V4 Pro - Enhanced Application Core
   Integrated with GSAP, Three.js, and Premium Features
   ============================================

   Features:
   - All V3 functionality preserved
   - Custom cursor module
   - Enhanced CountUp with GSAP ScrollTrigger
   - Page transition animations
   - Live donation notifications
   - Reduced motion support
   - Performance optimizations

   Dependencies:
   - GSAP 3.x + ScrollTrigger
   - Three.js r128+
   - gsap-animations.js
   - three-effects.js
   ============================================ */

// ============================================
// DATA: School Information
// ============================================
const schoolInfo = {
    name: '臺北市立大學',
    nameEn: 'University of Taipei',
    slogan: '點亮未來，育才興邦',
    founded: 1895,
    students: 8000,
    olympicMedals: 32,
    campuses: 3,
    logo: 'images/logo.jpg',
    contact: {
        phone: '(02) 2311-3040',
        email: 'donation@utaipei.edu.tw',
        address: '臺北市中正區愛國西路1號'
    },
    social: {
        facebook: 'https://www.facebook.com/utaipei',
        instagram: 'https://www.instagram.com/utaipei',
        youtube: 'https://www.youtube.com/utaipei'
    }
};

// ============================================
// DATA: Projects (8 projects as per V3)
// ============================================
const projectsData = [
    {
        id: 1,
        name: '體育選手培訓基金',
        icon: '🏅',
        category: 'sports',
        description: '支持優秀運動員參與國際賽事，為國爭光',
        fullDescription: '培訓計畫涵蓋營養補給、專業教練、國際移地訓練等完整支援，幫助選手在世界舞台發光發熱。',
        goal: 5000000,
        raised: 3850000,
        donors: 892,
        deadline: '2025-06-30',
        daysLeft: 180,
        impact: '可支持 1 位選手參加國際賽事',
        impactAmount: 50000,
        gradient: 'from-amber-500 to-orange-600',
        image: 'images/sports.jpg'
    },
    {
        id: 2,
        name: '清寒學生獎學金',
        icon: '📚',
        category: 'scholarship',
        description: '幫助經濟弱勢學生安心就學，追求夢想',
        fullDescription: '提供學雜費、生活費及書籍費補助，讓每位有潛力的學生都能專心學習，不因經濟因素而中斷學業。',
        goal: 3000000,
        raised: 2150000,
        donors: 1256,
        deadline: '2025-12-31',
        daysLeft: 364,
        impact: '可資助 1 位學生一學期學費',
        impactAmount: 30000,
        gradient: 'from-blue-500 to-indigo-600',
        image: 'images/scholarship.jpg'
    },
    {
        id: 3,
        name: '智慧教室設備升級',
        icon: '💻',
        category: 'teaching',
        description: '打造現代化數位學習環境，提升教學品質',
        fullDescription: '建置互動式電子白板、高效能電腦設備及遠距教學系統，提供師生最佳的數位學習體驗。',
        goal: 8000000,
        raised: 4200000,
        donors: 445,
        deadline: '2025-09-01',
        daysLeft: 243,
        impact: '可採購 1 套智慧教學設備',
        impactAmount: 100000,
        gradient: 'from-cyan-500 to-blue-600',
        image: 'images/classroom.jpg'
    },
    {
        id: 4,
        name: '學術研究發展基金',
        icon: '🔬',
        category: 'research',
        description: '支持前瞻研究計畫，推動學術創新',
        fullDescription: '資助跨領域創新研究、國際學術交流及研究設備採購，提升本校學術競爭力與國際能見度。',
        goal: 10000000,
        raised: 6800000,
        donors: 328,
        deadline: '2025-12-31',
        daysLeft: 364,
        impact: '可支持 1 項研究計畫啟動',
        impactAmount: 200000,
        gradient: 'from-purple-500 to-pink-600',
        image: 'images/research.jpg'
    },
    {
        id: 5,
        name: '校園環境美化計畫',
        icon: '🌳',
        category: 'campus',
        description: '營造綠色永續校園，創造優質學習空間',
        fullDescription: '種植原生樹種、建置生態池、設置休憩空間，打造兼具生態教育與美學的永續校園。',
        goal: 2000000,
        raised: 1680000,
        donors: 723,
        deadline: '2025-08-15',
        daysLeft: 226,
        impact: '可種植 10 棵原生樹種',
        impactAmount: 10000,
        gradient: 'from-green-500 to-emerald-600',
        image: 'images/campus.jpg'
    },
    {
        id: 6,
        name: '緊急助學金',
        icon: '❤️',
        category: 'scholarship',
        description: '即時援助遭逢急難的學生，度過難關',
        fullDescription: '提供因家庭變故、重大疾病或天災等突發事件而陷入困境的學生緊急經濟援助。',
        goal: 1500000,
        raised: 1320000,
        donors: 567,
        deadline: '2025-03-31',
        daysLeft: 89,
        isUrgent: true,
        impact: '可幫助 1 位急難學生度過難關',
        impactAmount: 20000,
        gradient: 'from-rose-500 to-red-600',
        image: 'images/emergency.jpg'
    },
    {
        id: 7,
        name: '藝術人才培育計畫',
        icon: '🎨',
        category: 'arts',
        description: '培育藝術創作人才，傳承文化藝術',
        fullDescription: '支持音樂、美術、舞蹈等藝術領域學生進行創作、展演及國際交流，培育下一代藝術家。',
        goal: 2500000,
        raised: 1200000,
        donors: 384,
        deadline: '2025-10-15',
        daysLeft: 287,
        impact: '可資助 1 位學生舉辦個展',
        impactAmount: 25000,
        gradient: 'from-pink-500 to-rose-600',
        image: 'images/arts.jpg'
    },
    {
        id: 8,
        name: '國際交流獎學金',
        icon: '🌍',
        category: 'scholarship',
        description: '拓展國際視野，培養世界公民',
        fullDescription: '資助優秀學生赴海外交換、參與國際研討會，促進學術交流，培養具國際競爭力的人才。',
        goal: 4000000,
        raised: 2800000,
        donors: 512,
        deadline: '2025-07-31',
        daysLeft: 211,
        impact: '可資助 1 位學生海外交換一學期',
        impactAmount: 80000,
        gradient: 'from-teal-500 to-cyan-600',
        image: 'images/international.jpg'
    }
];

// ============================================
// DATA: Recent Donations
// ============================================
const recentDonationsData = [
    { id: 1, name: '陳○明', amount: 50000, project: '體育選手培訓基金', time: '5 分鐘前', message: '加油！為國爭光！' },
    { id: 2, name: '林○華', amount: 10000, project: '清寒學生獎學金', time: '12 分鐘前', message: '希望能幫助到需要的學生' },
    { id: 3, name: '王○玲', amount: 5000, project: '智慧教室設備升級', time: '25 分鐘前', message: '' },
    { id: 4, name: '張○偉', amount: 100000, project: '學術研究發展基金', time: '1 小時前', message: '支持學術研究！' },
    { id: 5, name: '李○芳', amount: 3000, project: '緊急助學金', time: '2 小時前', message: '小小心意，祝福學生們' },
    { id: 6, name: '黃○傑', amount: 20000, project: '體育選手培訓基金', time: '3 小時前', message: '' },
    { id: 7, name: '吳○婷', amount: 8000, project: '校園環境美化計畫', time: '4 小時前', message: '期待美麗的校園' },
    { id: 8, name: '許○宏', amount: 15000, project: '清寒學生獎學金', time: '5 小時前', message: '教育改變命運' }
];

// ============================================
// DATA: Donors for Honor Wall
// ============================================
const donorsData = [
    // Platinum ($100,000+)
    { id: 1, name: '財團法人育英基金會', amount: 500000, tier: 'platinum', title: '榮譽贊助', projects: ['學術研究發展基金'], message: '期許北市大培育更多優秀人才', avatar: '育' },
    { id: 2, name: '永豐金控', amount: 300000, tier: 'platinum', title: '企業典範', projects: ['體育選手培訓基金', '清寒學生獎學金'], message: '支持教育，回饋社會', avatar: '永' },
    { id: 3, name: '中華民國校友總會', amount: 250000, tier: 'platinum', title: '傑出校友', projects: ['智慧教室設備升級'], message: '飲水思源，薪火相傳', avatar: '校' },

    // Gold ($50,000-99,999)
    { id: 4, name: '陳明德', amount: 80000, tier: 'gold', projects: ['體育選手培訓基金'], message: '支持體育發展', avatar: '陳' },
    { id: 5, name: '林秀華', amount: 60000, tier: 'gold', projects: ['清寒學生獎學金'], message: '', avatar: '林' },
    { id: 6, name: '張文傑', amount: 50000, tier: 'gold', projects: ['學術研究發展基金'], message: '研究是進步的動力', avatar: '張' },
    { id: 7, name: '王雅芬', amount: 50000, tier: 'gold', projects: ['緊急助學金'], message: '願能及時幫助需要的人', avatar: '王' },

    // Silver ($10,000-49,999)
    { id: 8, name: '李建宏', amount: 30000, tier: 'silver', projects: ['智慧教室設備升級'], avatar: '李' },
    { id: 9, name: '黃淑娟', amount: 25000, tier: 'silver', projects: ['校園環境美化計畫'], avatar: '黃' },
    { id: 10, name: '吳志明', amount: 20000, tier: 'silver', projects: ['體育選手培訓基金'], avatar: '吳' },
    { id: 11, name: '許家豪', amount: 15000, tier: 'silver', projects: ['清寒學生獎學金'], avatar: '許' },
    { id: 12, name: '楊美玲', amount: 12000, tier: 'silver', projects: ['學術研究發展基金'], avatar: '楊' },
    { id: 13, name: '劉俊宇', amount: 10000, tier: 'silver', projects: ['緊急助學金'], avatar: '劉' },

    // Bronze ($1,000-9,999)
    { id: 14, name: '周○○', amount: 8000, tier: 'bronze', projects: ['體育選手培訓基金'], avatar: '周' },
    { id: 15, name: '鄭○○', amount: 5000, tier: 'bronze', projects: ['清寒學生獎學金'], avatar: '鄭' },
    { id: 16, name: '蔡○○', amount: 5000, tier: 'bronze', projects: ['智慧教室設備升級'], avatar: '蔡' },
    { id: 17, name: '謝○○', amount: 3000, tier: 'bronze', projects: ['校園環境美化計畫'], avatar: '謝' },
    { id: 18, name: '郭○○', amount: 2000, tier: 'bronze', projects: ['緊急助學金'], avatar: '郭' },
    { id: 19, name: '洪○○', amount: 1500, tier: 'bronze', projects: ['學術研究發展基金'], avatar: '洪' },
    { id: 20, name: '曾○○', amount: 1000, tier: 'bronze', projects: ['體育選手培訓基金'], avatar: '曾' }
];

// ============================================
// DATA: Filter Categories
// ============================================
const filterCategories = [
    { id: 'all', name: '全部專案', icon: '🎯' },
    { id: 'scholarship', name: '獎學金', icon: '📚' },
    { id: 'sports', name: '體育培訓', icon: '🏅' },
    { id: 'teaching', name: '教學設備', icon: '💻' },
    { id: 'research', name: '學術研究', icon: '🔬' },
    { id: 'campus', name: '校園建設', icon: '🌳' },
    { id: 'arts', name: '藝術人才', icon: '🎨' }
];

// ============================================
// DATA: Payment Methods
// ============================================
const paymentMethods = [
    { id: 'credit', name: '信用卡', icon: '💳', description: '支援 VISA、MasterCard、JCB' },
    { id: 'linepay', name: 'LINE Pay', icon: '🟢', description: '快速便捷的行動支付' },
    { id: 'atm', name: 'ATM 轉帳', icon: '🏧', description: '銀行 ATM 或網路銀行' },
    { id: 'convenience', name: '超商代碼', icon: '🏪', description: '7-11、全家、萊爾富' }
];

// ============================================
// DATA: Donation Amounts with Impact
// ============================================
const donationAmounts = [
    { amount: 500, impact: '可購買 5 本參考書籍' },
    { amount: 1000, impact: '可資助 1 位學生一週餐費' },
    { amount: 3000, impact: '可支持 1 位選手營養補給' },
    { amount: 5000, impact: '可採購教學耗材一學期' },
    { amount: 10000, impact: '可資助 1 位學生一個月生活費' },
    { amount: 30000, impact: '可支持 1 項小型研究計畫' }
];

// ============================================
// DATA: FAQ
// ============================================
const faqData = [
    {
        question: '捐款方式有哪些？',
        answer: '我們提供多元捐款方式，包括：信用卡線上捐款、ATM 轉帳、超商代碼繳費、LINE Pay 等。您可依個人方便選擇最適合的方式。'
    },
    {
        question: '捐款可以抵稅嗎？',
        answer: '是的，臺北市立大學為政府立案之公立大學，您的捐款可依所得稅法第17條規定，列舉為綜合所得稅之捐贈扣除額，不受金額限制。'
    },
    {
        question: '如何取得捐款收據？',
        answer: '完成捐款後，我們將於7個工作天內寄送正式捐款收據至您登記的地址。若需電子收據，請於捐款時勾選相關選項。'
    },
    {
        question: '可以指定捐款用途嗎？',
        answer: '可以的，您可以在捐款時選擇特定的募款專案，款項將專款專用於該項目。若選擇「不指定」，將由學校統籌運用於最需要的項目。'
    },
    {
        question: '如何追蹤捐款使用情形？',
        answer: '我們每季發布募款成果報告，公開各專案的執行進度與經費使用情形。您也可以透過電子報訂閱，即時收到最新消息。'
    },
    {
        question: '企業捐款有優惠嗎？',
        answer: '企業捐款除可享營利事業所得稅扣除優惠外，我們也提供企業冠名、品牌曝光等回饋方案。歡迎與我們聯繫洽談合作。'
    }
];

// ============================================
// UTILITIES
// ============================================
const utils = {
    // Format number with commas
    formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },

    // Format currency
    formatCurrency(num) {
        return 'NT$ ' + this.formatNumber(num);
    },

    // Calculate progress percentage
    calcProgress(raised, goal) {
        return Math.min(Math.round((raised / goal) * 100), 100);
    },

    // Get tier display info
    getTierInfo(tier) {
        const tiers = {
            platinum: { name: '白金級', color: 'from-slate-300 to-gray-400', icon: '👑', textColor: 'text-gray-300' },
            gold: { name: '金質級', color: 'from-amber-400 to-yellow-500', icon: '🏆', textColor: 'text-amber-400' },
            silver: { name: '銀質級', color: 'from-gray-300 to-slate-400', icon: '🥈', textColor: 'text-gray-400' },
            bronze: { name: '銅質級', color: 'from-amber-600 to-orange-700', icon: '🥉', textColor: 'text-amber-600' },
            regular: { name: '感謝捐款', color: 'from-blue-400 to-indigo-500', icon: '💙', textColor: 'text-blue-400' }
        };
        return tiers[tier] || tiers.regular;
    },

    // Parse URL parameters
    getUrlParams() {
        const params = new URLSearchParams(window.location.search);
        return {
            project: params.get('project'),
            amount: params.get('amount')
        };
    },

    // Scroll to element
    scrollToElement(selector, offset = 80) {
        const element = document.querySelector(selector);
        if (element) {
            const top = element.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    },

    // Debounce function
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Throttle function
    throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // Validate email
    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },

    // Validate phone (Taiwan format)
    validatePhone(phone) {
        const re = /^(09\d{8}|0\d{1,2}-?\d{6,8})$/;
        return re.test(phone.replace(/\s/g, ''));
    },

    // Validate ID (Taiwan ID format)
    validateTaiwanId(id) {
        if (!/^[A-Z][12]\d{8}$/.test(id)) return false;
        const letters = 'ABCDEFGHJKLMNPQRSTUVXYWZIO';
        const n = letters.indexOf(id[0]) + 10;
        let sum = Math.floor(n / 10) + (n % 10) * 9;
        for (let i = 1; i < 9; i++) {
            sum += parseInt(id[i]) * (9 - i);
        }
        sum += parseInt(id[9]);
        return sum % 10 === 0;
    },

    // Get cookie
    getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
    },

    // Set cookie
    setCookie(name, value, days = 30) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
    },

    // Local storage helpers
    storage: {
        get(key) {
            try {
                return JSON.parse(localStorage.getItem(key));
            } catch {
                return null;
            }
        },
        set(key, value) {
            try {
                localStorage.setItem(key, JSON.stringify(value));
            } catch (e) {
                console.warn('LocalStorage not available');
            }
        },
        remove(key) {
            localStorage.removeItem(key);
        }
    },

    // Check reduced motion preference
    prefersReducedMotion() {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
};

// ============================================
// CUSTOM CURSOR MODULE (V4 New)
// ============================================
const CustomCursor = (() => {
    'use strict';

    let cursor = null;
    let cursorDot = null;
    let isEnabled = true;
    let isHovering = false;
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let rafId = null;

    const CONFIG = {
        size: 40,
        dotSize: 8,
        ease: 0.15,
        hoverScale: 1.5,
        clickScale: 0.8
    };

    function init() {
        // Check for reduced motion or touch device
        if (utils.prefersReducedMotion() || 'ontouchstart' in window) {
            disable();
            return;
        }

        // Create cursor elements
        createCursor();

        // Add event listeners
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('mouseenter', () => { if (cursor) cursor.style.opacity = '1'; });
        document.addEventListener('mouseleave', () => { if (cursor) cursor.style.opacity = '0'; });

        // Add hover listeners to interactive elements
        setupHoverListeners();

        // Start animation
        animate();

        console.info('[CustomCursor] Initialized');
    }

    function createCursor() {
        // Main cursor ring
        cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        cursor.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: ${CONFIG.size}px;
            height: ${CONFIG.size}px;
            border: 2px solid var(--gold-primary, #D4AF37);
            border-radius: 50%;
            pointer-events: none;
            z-index: 99999;
            transform: translate(-50%, -50%);
            transition: transform 0.15s ease, border-color 0.2s ease;
            mix-blend-mode: difference;
            opacity: 0;
        `;

        // Center dot
        cursorDot = document.createElement('div');
        cursorDot.className = 'custom-cursor-dot';
        cursorDot.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: ${CONFIG.dotSize}px;
            height: ${CONFIG.dotSize}px;
            background: var(--gold-primary, #D4AF37);
            border-radius: 50%;
            pointer-events: none;
            z-index: 99999;
            transform: translate(-50%, -50%);
            transition: transform 0.1s ease;
        `;

        document.body.appendChild(cursor);
        document.body.appendChild(cursorDot);

        // Hide default cursor
        document.body.style.cursor = 'none';
    }

    function setupHoverListeners() {
        const hoverElements = document.querySelectorAll(
            'a, button, [role="button"], input, textarea, select, .card-project, .btn-gold, [data-cursor="hover"]'
        );

        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => setHover(true));
            el.addEventListener('mouseleave', () => setHover(false));
        });

        // Observe for dynamically added elements
        const observer = new MutationObserver((mutations) => {
            mutations.forEach(mutation => {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === 1) {
                        const interactive = node.matches && node.matches('a, button, [role="button"]');
                        if (interactive) {
                            node.addEventListener('mouseenter', () => setHover(true));
                            node.addEventListener('mouseleave', () => setHover(false));
                        }
                    }
                });
            });
        });

        observer.observe(document.body, { childList: true, subtree: true });
    }

    function handleMouseMove(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    }

    function handleMouseDown() {
        if (!cursor) return;
        cursor.style.transform = `translate(-50%, -50%) scale(${CONFIG.clickScale})`;
        cursorDot.style.transform = `translate(-50%, -50%) scale(${CONFIG.clickScale})`;
    }

    function handleMouseUp() {
        if (!cursor) return;
        const scale = isHovering ? CONFIG.hoverScale : 1;
        cursor.style.transform = `translate(-50%, -50%) scale(${scale})`;
        cursorDot.style.transform = `translate(-50%, -50%) scale(1)`;
    }

    function setHover(hovering) {
        isHovering = hovering;
        if (!cursor) return;

        if (hovering) {
            cursor.style.transform = `translate(-50%, -50%) scale(${CONFIG.hoverScale})`;
            cursor.style.borderColor = 'var(--gold-light, #E8C55A)';
        } else {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.borderColor = 'var(--gold-primary, #D4AF37)';
        }
    }

    function animate() {
        if (!isEnabled || !cursor) return;

        // Smooth follow with easing
        cursorX += (mouseX - cursorX) * CONFIG.ease;
        cursorY += (mouseY - cursorY) * CONFIG.ease;

        cursor.style.left = `${cursorX}px`;
        cursor.style.top = `${cursorY}px`;

        // Dot follows exactly
        cursorDot.style.left = `${mouseX}px`;
        cursorDot.style.top = `${mouseY}px`;

        rafId = requestAnimationFrame(animate);
    }

    function disable() {
        isEnabled = false;
        if (cursor) {
            cursor.style.display = 'none';
            cursorDot.style.display = 'none';
        }
        document.body.style.cursor = '';
        if (rafId) {
            cancelAnimationFrame(rafId);
            rafId = null;
        }
    }

    function enable() {
        isEnabled = true;
        if (cursor) {
            cursor.style.display = '';
            cursorDot.style.display = '';
        }
        document.body.style.cursor = 'none';
        animate();
    }

    function destroy() {
        disable();
        if (cursor && cursor.parentNode) {
            cursor.parentNode.removeChild(cursor);
        }
        if (cursorDot && cursorDot.parentNode) {
            cursorDot.parentNode.removeChild(cursorDot);
        }
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mousedown', handleMouseDown);
        document.removeEventListener('mouseup', handleMouseUp);
    }

    return {
        init,
        enable,
        disable,
        destroy,
        setHover
    };
})();

// ============================================
// ENHANCED COUNTUP MODULE (V4 - GSAP Integrated)
// ============================================
const CountUp = (() => {
    'use strict';

    let observers = [];

    /**
     * Animate a single element's value
     */
    function animate(element, target, duration = 2000) {
        // Check if GSAP is available for enhanced animation
        if (typeof gsap !== 'undefined') {
            animateWithGSAP(element, target, duration);
        } else {
            animateNative(element, target, duration);
        }
    }

    /**
     * GSAP-powered count animation
     */
    function animateWithGSAP(element, target, duration) {
        const counter = { value: 0 };
        const decimals = parseInt(element.dataset.countupDecimals) || 0;
        const prefix = element.dataset.countupPrefix || '';
        const suffix = element.dataset.countupSuffix || '';
        const separator = element.dataset.countupSeparator !== 'false';

        element.classList.add('counting');

        gsap.to(counter, {
            value: target,
            duration: duration / 1000,
            ease: 'power2.out',
            onUpdate: () => {
                let displayValue = decimals > 0
                    ? counter.value.toFixed(decimals)
                    : Math.floor(counter.value);

                if (separator) {
                    displayValue = displayValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                }

                element.textContent = prefix + displayValue + suffix;
            },
            onComplete: () => {
                element.classList.remove('counting');
                element.classList.add('counted');
            }
        });
    }

    /**
     * Native animation fallback
     */
    function animateNative(element, target, duration) {
        const start = 0;
        const startTime = performance.now();
        const prefix = element.dataset.countupPrefix || '';
        const suffix = element.dataset.countupSuffix || '';

        const updateCount = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease-out cubic
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(start + (target - start) * easeOut);

            element.textContent = prefix + utils.formatNumber(current) + suffix;
            element.classList.add('counting');

            if (progress < 1) {
                requestAnimationFrame(updateCount);
            } else {
                element.classList.remove('counting');
                element.classList.add('counted');
            }
        };

        requestAnimationFrame(updateCount);
    }

    /**
     * Observe elements and trigger animation on scroll
     * Integrates with GSAP ScrollTrigger if available
     */
    function observeAndAnimate(selector) {
        const elements = document.querySelectorAll(selector);
        if (elements.length === 0) return;

        // Check if GSAP ScrollTrigger is available
        if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
            // Use GSAP ScrollTrigger for better performance
            elements.forEach(el => {
                if (el.dataset.counted) return;

                const target = parseFloat(el.dataset.target || el.dataset.countup) || 0;
                const duration = parseFloat(el.dataset.countupDuration) || 2000;

                ScrollTrigger.create({
                    trigger: el,
                    start: 'top 80%',
                    once: true,
                    onEnter: () => {
                        animate(el, target, duration);
                        el.dataset.counted = 'true';
                    }
                });
            });

            console.info(`[CountUp] ScrollTrigger registered for ${elements.length} elements`);
        } else {
            // Fallback to IntersectionObserver
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !entry.target.dataset.counted) {
                        const target = parseFloat(entry.target.dataset.target || entry.target.dataset.countup) || 0;
                        const duration = parseFloat(entry.target.dataset.countupDuration) || 2000;
                        animate(entry.target, target, duration);
                        entry.target.dataset.counted = 'true';
                    }
                });
            }, { threshold: 0.5 });

            elements.forEach(el => observer.observe(el));
            observers.push(observer);

            console.info(`[CountUp] IntersectionObserver registered for ${elements.length} elements`);
        }
    }

    /**
     * Cleanup observers
     */
    function destroy() {
        observers.forEach(observer => observer.disconnect());
        observers = [];
    }

    return {
        animate,
        observeAndAnimate,
        destroy
    };
})();

// ============================================
// PAGE TRANSITION MODULE (V4 New)
// ============================================
const PageTransition = (() => {
    'use strict';

    let overlay = null;
    let progressBar = null;
    let isTransitioning = false;

    const CONFIG = {
        duration: 600,
        easing: 'cubic-bezier(0.65, 0, 0.35, 1)',
        overlayColor: 'rgba(15, 23, 42, 0.98)'
    };

    function init() {
        if (utils.prefersReducedMotion()) {
            console.info('[PageTransition] Disabled for reduced motion preference');
            return;
        }

        createOverlay();
        setupEventListeners();

        // Initial page load animation
        playEnterAnimation();

        console.info('[PageTransition] Initialized');
    }

    function createOverlay() {
        overlay = document.createElement('div');
        overlay.className = 'page-transition-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: ${CONFIG.overlayColor};
            z-index: 999999;
            pointer-events: none;
            transform: scaleY(0);
            transform-origin: bottom;
            will-change: transform;
        `;

        progressBar = document.createElement('div');
        progressBar.className = 'page-transition-progress';
        progressBar.style.cssText = `
            position: absolute;
            bottom: 0;
            left: 0;
            height: 3px;
            background: linear-gradient(90deg, var(--gold-primary, #D4AF37), var(--gold-light, #E8C55A));
            width: 0%;
            transition: width 0.3s ease;
        `;

        overlay.appendChild(progressBar);
        document.body.appendChild(overlay);
    }

    function setupEventListeners() {
        // Intercept internal link clicks
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[href]');
            if (!link) return;

            const href = link.getAttribute('href');

            // Skip external links, anchors, and special protocols
            if (!href ||
                href.startsWith('#') ||
                href.startsWith('http') ||
                href.startsWith('mailto') ||
                href.startsWith('tel') ||
                link.target === '_blank') {
                return;
            }

            e.preventDefault();
            navigateTo(href);
        });

        // Handle browser back/forward
        window.addEventListener('popstate', () => {
            playEnterAnimation();
        });
    }

    function navigateTo(url) {
        if (isTransitioning) return;
        isTransitioning = true;

        playExitAnimation(() => {
            window.location.href = url;
        });
    }

    function playEnterAnimation() {
        if (!overlay) return;

        // Initial state: overlay covers screen
        overlay.style.transform = 'scaleY(1)';
        overlay.style.transformOrigin = 'top';

        // Animate overlay out
        requestAnimationFrame(() => {
            overlay.style.transition = `transform ${CONFIG.duration}ms ${CONFIG.easing}`;
            overlay.style.transform = 'scaleY(0)';
        });

        setTimeout(() => {
            isTransitioning = false;
        }, CONFIG.duration);
    }

    function playExitAnimation(callback) {
        if (!overlay) {
            callback();
            return;
        }

        overlay.style.transformOrigin = 'bottom';
        overlay.style.transition = `transform ${CONFIG.duration}ms ${CONFIG.easing}`;

        requestAnimationFrame(() => {
            overlay.style.transform = 'scaleY(1)';

            // Animate progress bar
            progressBar.style.width = '100%';
        });

        setTimeout(() => {
            if (callback) callback();
        }, CONFIG.duration);
    }

    function setProgress(percent) {
        if (progressBar) {
            progressBar.style.width = `${percent}%`;
        }
    }

    function destroy() {
        if (overlay && overlay.parentNode) {
            overlay.parentNode.removeChild(overlay);
        }
    }

    return {
        init,
        navigateTo,
        setProgress,
        destroy
    };
})();

// ============================================
// LIVE NOTIFICATIONS MODULE (V4 New)
// ============================================
const LiveNotifications = (() => {
    'use strict';

    let container = null;
    let intervalId = null;
    let currentIndex = 0;
    let isVisible = true;
    let isPaused = false;

    const CONFIG = {
        interval: 8000, // Show new notification every 8 seconds
        duration: 6000, // Each notification visible for 6 seconds
        maxVisible: 3,
        position: 'bottom-right'
    };

    // Sample donation data for simulation
    const sampleDonations = recentDonationsData.slice();

    function init() {
        if (utils.prefersReducedMotion()) {
            console.info('[LiveNotifications] Disabled for reduced motion preference');
            return;
        }

        createContainer();
        setupVisibilityListener();
        startAutoPlay();

        console.info('[LiveNotifications] Initialized');
    }

    function createContainer() {
        container = document.createElement('div');
        container.className = 'live-notifications-container';
        container.style.cssText = `
            position: fixed;
            bottom: 24px;
            right: 24px;
            z-index: 9000;
            display: flex;
            flex-direction: column-reverse;
            gap: 12px;
            max-width: 320px;
            pointer-events: none;
        `;

        document.body.appendChild(container);
    }

    function setupVisibilityListener() {
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                pause();
            } else {
                resume();
            }
        });

        // Pause on hover
        container.addEventListener('mouseenter', pause);
        container.addEventListener('mouseleave', resume);
    }

    function startAutoPlay() {
        if (intervalId) return;

        // Show first notification immediately
        showNextNotification();

        // Then show new ones periodically
        intervalId = setInterval(() => {
            if (!isPaused && isVisible) {
                showNextNotification();
            }
        }, CONFIG.interval);
    }

    function showNextNotification() {
        const donation = sampleDonations[currentIndex % sampleDonations.length];
        currentIndex++;

        showNotification(donation);
    }

    function showNotification(donation) {
        // Limit visible notifications
        while (container.children.length >= CONFIG.maxVisible) {
            const oldest = container.firstChild;
            if (oldest) {
                animateOut(oldest);
            }
        }

        const notification = createNotificationElement(donation);
        container.appendChild(notification);

        // Animate in
        requestAnimationFrame(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        });

        // Auto remove
        setTimeout(() => {
            if (notification.parentNode) {
                animateOut(notification);
            }
        }, CONFIG.duration);
    }

    function createNotificationElement(donation) {
        const el = document.createElement('div');
        el.className = 'live-notification';
        el.style.cssText = `
            background: linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.95));
            border: 1px solid rgba(212, 175, 55, 0.3);
            border-radius: 12px;
            padding: 16px;
            color: #fff;
            font-size: 14px;
            backdrop-filter: blur(10px);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            pointer-events: auto;
            cursor: pointer;
        `;

        el.innerHTML = `
            <div style="display: flex; align-items: center; gap: 12px;">
                <div style="
                    width: 40px;
                    height: 40px;
                    background: linear-gradient(135deg, var(--gold-primary, #D4AF37), var(--gold-dark, #B8962E));
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 18px;
                    flex-shrink: 0;
                ">❤️</div>
                <div style="flex: 1; min-width: 0;">
                    <div style="font-weight: 600; color: var(--gold-light, #E8C55A); margin-bottom: 2px;">
                        ${donation.name} 捐款
                    </div>
                    <div style="color: #94a3b8; font-size: 13px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                        ${donation.project}
                    </div>
                </div>
                <div style="
                    font-weight: 700;
                    color: var(--gold-primary, #D4AF37);
                    font-size: 16px;
                    flex-shrink: 0;
                ">
                    NT$ ${utils.formatNumber(donation.amount)}
                </div>
            </div>
            ${donation.message ? `
                <div style="
                    margin-top: 8px;
                    padding-top: 8px;
                    border-top: 1px solid rgba(255,255,255,0.1);
                    font-size: 13px;
                    color: #cbd5e1;
                    font-style: italic;
                ">"${donation.message}"</div>
            ` : ''}
        `;

        // Click to dismiss
        el.addEventListener('click', () => {
            animateOut(el);
        });

        return el;
    }

    function animateOut(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateX(100%)';

        setTimeout(() => {
            if (element.parentNode) {
                element.parentNode.removeChild(element);
            }
        }, 400);
    }

    function pause() {
        isPaused = true;
    }

    function resume() {
        isPaused = false;
    }

    function destroy() {
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
        }
        if (container && container.parentNode) {
            container.parentNode.removeChild(container);
        }
    }

    return {
        init,
        showNotification,
        pause,
        resume,
        destroy
    };
})();

// ============================================
// LEGACY V3 MODULES (Preserved)
// ============================================

// SOCIAL SHARE
const socialShare = {
    getShareUrl() {
        return encodeURIComponent(window.location.href);
    },

    getShareText(customText) {
        const defaultText = '支持臺北市立大學募款計畫，一起點亮教育的未來！';
        return encodeURIComponent(customText || defaultText);
    },

    facebook(customText) {
        const url = `https://www.facebook.com/sharer/sharer.php?u=${this.getShareUrl()}&quote=${this.getShareText(customText)}`;
        this.openPopup(url);
    },

    twitter(customText) {
        const url = `https://twitter.com/intent/tweet?url=${this.getShareUrl()}&text=${this.getShareText(customText)}`;
        this.openPopup(url);
    },

    line(customText) {
        const url = `https://social-plugins.line.me/lineit/share?url=${this.getShareUrl()}&text=${this.getShareText(customText)}`;
        this.openPopup(url);
    },

    async copyLink() {
        try {
            await navigator.clipboard.writeText(window.location.href);
            toast.show('連結已複製到剪貼簿！', 'success');
            return true;
        } catch (err) {
            const textArea = document.createElement('textarea');
            textArea.value = window.location.href;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            toast.show('連結已複製！', 'success');
            return true;
        }
    },

    openPopup(url) {
        const width = 600;
        const height = 400;
        const left = (window.innerWidth - width) / 2;
        const top = (window.innerHeight - height) / 2;
        window.open(url, 'share', `width=${width},height=${height},left=${left},top=${top}`);
    }
};

// TOAST NOTIFICATION
const toast = {
    container: null,

    init() {
        if (!this.container) {
            this.container = document.createElement('div');
            this.container.className = 'toast';
            this.container.innerHTML = '<span class="toast-icon"></span><span class="toast-message"></span>';
            document.body.appendChild(this.container);
        }
    },

    show(message, type = 'info', duration = 3000) {
        this.init();
        const icon = type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ';
        this.container.querySelector('.toast-icon').textContent = icon;
        this.container.querySelector('.toast-message').textContent = message;
        this.container.className = `toast ${type} show`;

        setTimeout(() => {
            this.container.classList.remove('show');
        }, duration);
    }
};

// BACK TO TOP
const backToTop = {
    button: null,

    init() {
        this.button = document.querySelector('.back-to-top');
        if (!this.button) return;

        window.addEventListener('scroll', utils.debounce(() => {
            if (window.pageYOffset > 300) {
                this.button.classList.add('visible');
            } else {
                this.button.classList.remove('visible');
            }
        }, 100));

        this.button.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
};

// HEADER SCROLL EFFECT
const headerScroll = {
    header: null,

    init() {
        this.header = document.querySelector('.header-glass');
        if (!this.header) return;

        window.addEventListener('scroll', utils.debounce(() => {
            if (window.pageYOffset > 50) {
                this.header.classList.add('scrolled');
            } else {
                this.header.classList.remove('scrolled');
            }
        }, 50));
    }
};

// RIPPLE EFFECT
const rippleEffect = {
    init() {
        document.addEventListener('click', (e) => {
            const button = e.target.closest('.ripple');
            if (!button) return;

            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            const ripple = document.createElement('span');
            ripple.className = 'ripple-effect';
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;

            button.appendChild(ripple);

            ripple.addEventListener('animationend', () => {
                ripple.remove();
            });
        });
    }
};

// FORM VALIDATION
const formValidation = {
    rules: {
        name: {
            required: true,
            minLength: 2,
            message: '請輸入姓名（至少2個字）'
        },
        email: {
            required: true,
            validator: utils.validateEmail,
            message: '請輸入有效的電子郵件'
        },
        phone: {
            required: true,
            validator: utils.validatePhone,
            message: '請輸入有效的電話號碼'
        },
        idNumber: {
            required: false,
            validator: utils.validateTaiwanId,
            message: '請輸入有效的身分證字號'
        }
    },

    validate(field, value) {
        const rule = this.rules[field];
        if (!rule) return { valid: true };

        if (rule.required && !value.trim()) {
            return { valid: false, message: '此欄位為必填' };
        }

        if (value && rule.minLength && value.length < rule.minLength) {
            return { valid: false, message: rule.message };
        }

        if (value && rule.validator && !rule.validator(value)) {
            return { valid: false, message: rule.message };
        }

        return { valid: true };
    },

    showValidation(input, result) {
        const wrapper = input.closest('.form-group') || input.parentElement;
        const existingIcon = wrapper.querySelector('.validation-icon');

        input.classList.remove('valid', 'invalid');
        if (existingIcon) existingIcon.remove();

        if (result.valid && input.value) {
            input.classList.add('valid');
            const icon = document.createElement('span');
            icon.className = 'validation-icon valid';
            icon.textContent = '✓';
            wrapper.style.position = 'relative';
            wrapper.appendChild(icon);
        } else if (!result.valid) {
            input.classList.add('invalid');
            const icon = document.createElement('span');
            icon.className = 'validation-icon invalid';
            icon.textContent = '✕';
            wrapper.style.position = 'relative';
            wrapper.appendChild(icon);
        }
    }
};

// SEARCH HANDLER
const searchHandler = {
    init(inputSelector, itemsSelector, searchKey) {
        const input = document.querySelector(inputSelector);
        if (!input) return;

        input.addEventListener('input', utils.debounce((e) => {
            const query = e.target.value.toLowerCase().trim();
            const items = document.querySelectorAll(itemsSelector);

            items.forEach(item => {
                const text = item.textContent.toLowerCase();
                const matches = query === '' || text.includes(query);
                item.style.display = matches ? '' : 'none';

                if (matches && query) {
                    item.classList.add('animate-fade-in');
                }
            });
        }, 200));
    }
};

// ANIMATE ON SCROLL
const animateOnScroll = {
    init() {
        const elements = document.querySelectorAll('[data-animate]');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const animation = entry.target.dataset.animate;
                    entry.target.classList.add(`animate-${animation}`);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        elements.forEach(el => observer.observe(el));
    }
};

// DONATION PREFERENCES
const donationPrefs = {
    key: 'utaipei_donation_prefs',

    save(prefs) {
        utils.storage.set(this.key, {
            ...this.load(),
            ...prefs,
            lastUpdated: Date.now()
        });
    },

    load() {
        return utils.storage.get(this.key) || {};
    },

    getLastAmount() {
        const prefs = this.load();
        return prefs.lastAmount || null;
    },

    getLastProject() {
        const prefs = this.load();
        return prefs.lastProject || null;
    }
};

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    const reducedMotion = utils.prefersReducedMotion();

    // Add reduced motion class if needed
    if (reducedMotion) {
        document.documentElement.classList.add('reduce-motion');
        console.info('[App] Reduced motion mode enabled');
    }

    // Initialize legacy V3 components
    backToTop.init();
    headerScroll.init();
    rippleEffect.init();
    animateOnScroll.init();

    // Initialize V4 Pro components (respects reduced motion internally)
    CustomCursor.init();
    PageTransition.init();
    LiveNotifications.init();

    // Initialize CountUp (enhanced with GSAP if available)
    CountUp.observeAndAnimate('[data-countup]');

    // Initialize GSAP Animations (from gsap-animations.js)
    if (typeof GSAPAnimations !== 'undefined') {
        // GSAPAnimations.init() is called automatically
        // unless data-gsap-manual attribute is present
        console.info('[App] GSAPAnimations module detected');
    }

    // Initialize Three.js Effects (from three-effects.js)
    if (typeof ThreeEffects !== 'undefined') {
        const threeContainer = document.querySelector('.hero-section, #hero, [data-three-container]');
        if (threeContainer) {
            ThreeEffects.init(threeContainer);
            console.info('[App] ThreeEffects initialized');
        }
    }

    console.info('[App] V4 Pro initialization complete');
});

// ============================================
// EXPORT FOR GLOBAL USE
// ============================================
if (typeof window !== 'undefined') {
    // Data exports
    window.projectsData = projectsData;
    window.recentDonationsData = recentDonationsData;
    window.donorsData = donorsData;
    window.filterCategories = filterCategories;
    window.paymentMethods = paymentMethods;
    window.donationAmounts = donationAmounts;
    window.faqData = faqData;
    window.schoolInfo = schoolInfo;

    // Utility exports
    window.utils = utils;

    // V3 Legacy module exports
    window.countUp = CountUp;
    window.socialShare = socialShare;
    window.toast = toast;
    window.backToTop = backToTop;
    window.formValidation = formValidation;
    window.searchHandler = searchHandler;
    window.donationPrefs = donationPrefs;

    // V4 Pro module exports
    window.CustomCursor = CustomCursor;
    window.CountUp = CountUp;
    window.PageTransition = PageTransition;
    window.LiveNotifications = LiveNotifications;
}
