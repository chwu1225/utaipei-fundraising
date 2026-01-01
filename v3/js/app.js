/* ============================================
   UTAIPEI FUNDRAISING V3 - Enhanced Vue Logic
   With CountUp, Share, Validation & More
   ============================================ */

// ============================================
// DATA: Projects
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
    { id: 'campus', name: '校園建設', icon: '🌳' }
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
// DATA: School Info
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
    }
};

// ============================================
// COUNTUP ANIMATION
// ============================================
const countUp = {
    animate(element, target, duration = 2000) {
        const start = 0;
        const startTime = performance.now();

        const updateCount = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function (ease-out)
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(start + (target - start) * easeOut);

            element.textContent = utils.formatNumber(current);
            element.classList.add('counting');

            if (progress < 1) {
                requestAnimationFrame(updateCount);
            } else {
                element.classList.remove('counting');
            }
        };

        requestAnimationFrame(updateCount);
    },

    // Observe and trigger when visible
    observeAndAnimate(selector) {
        const elements = document.querySelectorAll(selector);

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.dataset.counted) {
                    const target = parseInt(entry.target.dataset.target) || 0;
                    this.animate(entry.target, target);
                    entry.target.dataset.counted = 'true';
                }
            });
        }, { threshold: 0.5 });

        elements.forEach(el => observer.observe(el));
    }
};

// ============================================
// SOCIAL SHARE
// ============================================
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
            // Fallback for older browsers
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

// ============================================
// TOAST NOTIFICATION
// ============================================
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

// ============================================
// BACK TO TOP
// ============================================
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

// ============================================
// HEADER SCROLL EFFECT
// ============================================
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

// ============================================
// RIPPLE EFFECT
// ============================================
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

// ============================================
// FORM VALIDATION
// ============================================
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

// ============================================
// SEARCH FUNCTIONALITY
// ============================================
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

// ============================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ============================================
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

// ============================================
// DONATION PREFERENCES (localStorage)
// ============================================
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
// INIT ON DOM READY
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize components
    backToTop.init();
    headerScroll.init();
    rippleEffect.init();
    animateOnScroll.init();

    // Initialize countup for stat numbers
    countUp.observeAndAnimate('[data-countup]');
});

// ============================================
// EXPORT FOR VUE/GLOBAL USE
// ============================================
if (typeof window !== 'undefined') {
    window.projectsData = projectsData;
    window.recentDonationsData = recentDonationsData;
    window.donorsData = donorsData;
    window.filterCategories = filterCategories;
    window.paymentMethods = paymentMethods;
    window.donationAmounts = donationAmounts;
    window.faqData = faqData;
    window.schoolInfo = schoolInfo;
    window.utils = utils;
    window.countUp = countUp;
    window.socialShare = socialShare;
    window.toast = toast;
    window.backToTop = backToTop;
    window.formValidation = formValidation;
    window.searchHandler = searchHandler;
    window.donationPrefs = donationPrefs;
}
