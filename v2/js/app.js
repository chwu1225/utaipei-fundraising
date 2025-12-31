/* ============================================
   UTAIPEI FUNDRAISING V2 - Shared Vue Logic
   ============================================ */

// Shared Data - Projects
const projectsData = [
    {
        id: 1,
        name: '體育選手培訓基金',
        icon: '🏅',
        category: 'sports',
        description: '支持優秀運動員參與國際賽事，為國爭光',
        goal: 5000000,
        raised: 3850000,
        donors: 892,
        deadline: '2025-06-30',
        daysLeft: 180,
        gradient: 'from-amber-500 to-orange-600'
    },
    {
        id: 2,
        name: '清寒學生獎學金',
        icon: '📚',
        category: 'scholarship',
        description: '幫助經濟弱勢學生安心就學，追求夢想',
        goal: 3000000,
        raised: 2150000,
        donors: 1256,
        deadline: '2025-12-31',
        daysLeft: 364,
        gradient: 'from-blue-500 to-indigo-600'
    },
    {
        id: 3,
        name: '智慧教室設備升級',
        icon: '💻',
        category: 'teaching',
        description: '打造現代化數位學習環境，提升教學品質',
        goal: 8000000,
        raised: 4200000,
        donors: 445,
        deadline: '2025-09-01',
        daysLeft: 243,
        gradient: 'from-cyan-500 to-blue-600'
    },
    {
        id: 4,
        name: '學術研究發展基金',
        icon: '🔬',
        category: 'research',
        description: '支持前瞻研究計畫，推動學術創新',
        goal: 10000000,
        raised: 6800000,
        donors: 328,
        deadline: '2025-12-31',
        daysLeft: 364,
        gradient: 'from-purple-500 to-pink-600'
    },
    {
        id: 5,
        name: '校園環境美化計畫',
        icon: '🌳',
        category: 'campus',
        description: '營造綠色永續校園，創造優質學習空間',
        goal: 2000000,
        raised: 1680000,
        donors: 723,
        deadline: '2025-08-15',
        daysLeft: 226,
        gradient: 'from-green-500 to-emerald-600'
    },
    {
        id: 6,
        name: '緊急助學金',
        icon: '❤️',
        category: 'scholarship',
        description: '即時援助遭逢急難的學生，度過難關',
        goal: 1500000,
        raised: 1320000,
        donors: 567,
        deadline: '2025-03-31',
        daysLeft: 89,
        isUrgent: true,
        gradient: 'from-rose-500 to-red-600'
    }
];

// Shared Data - Recent Donations (for display)
const recentDonationsData = [
    { id: 1, name: '陳○明', amount: 50000, project: '體育選手培訓基金', time: '5 分鐘前' },
    { id: 2, name: '林○華', amount: 10000, project: '清寒學生獎學金', time: '12 分鐘前' },
    { id: 3, name: '王○玲', amount: 5000, project: '智慧教室設備升級', time: '25 分鐘前' },
    { id: 4, name: '張○偉', amount: 100000, project: '學術研究發展基金', time: '1 小時前' },
    { id: 5, name: '李○芳', amount: 3000, project: '緊急助學金', time: '2 小時前' },
    { id: 6, name: '黃○傑', amount: 20000, project: '體育選手培訓基金', time: '3 小時前' },
    { id: 7, name: '吳○婷', amount: 8000, project: '校園環境美化計畫', time: '4 小時前' },
    { id: 8, name: '許○宏', amount: 15000, project: '清寒學生獎學金', time: '5 小時前' }
];

// Shared Data - Donors for Honor Wall
const donorsData = [
    // Platinum ($100,000+)
    { id: 1, name: '財團法人育英基金會', amount: 500000, tier: 'platinum', title: '榮譽贊助', projects: ['學術研究發展基金'], message: '期許北市大培育更多優秀人才' },
    { id: 2, name: '永豐金控', amount: 300000, tier: 'platinum', title: '企業典範', projects: ['體育選手培訓基金', '清寒學生獎學金'], message: '支持教育，回饋社會' },
    { id: 3, name: '中華民國校友總會', amount: 250000, tier: 'platinum', title: '傑出校友', projects: ['智慧教室設備升級'], message: '飲水思源，薪火相傳' },

    // Gold ($50,000-99,999)
    { id: 4, name: '陳明德', amount: 80000, tier: 'gold', projects: ['體育選手培訓基金'] },
    { id: 5, name: '林秀華', amount: 60000, tier: 'gold', projects: ['清寒學生獎學金'] },
    { id: 6, name: '張文傑', amount: 50000, tier: 'gold', projects: ['學術研究發展基金'] },
    { id: 7, name: '王雅芬', amount: 50000, tier: 'gold', projects: ['緊急助學金'] },

    // Silver ($10,000-49,999)
    { id: 8, name: '李建宏', amount: 30000, tier: 'silver', projects: ['智慧教室設備升級'] },
    { id: 9, name: '黃淑娟', amount: 25000, tier: 'silver', projects: ['校園環境美化計畫'] },
    { id: 10, name: '吳志明', amount: 20000, tier: 'silver', projects: ['體育選手培訓基金'] },
    { id: 11, name: '許家豪', amount: 15000, tier: 'silver', projects: ['清寒學生獎學金'] },
    { id: 12, name: '楊美玲', amount: 12000, tier: 'silver', projects: ['學術研究發展基金'] },
    { id: 13, name: '劉俊宇', amount: 10000, tier: 'silver', projects: ['緊急助學金'] },

    // Bronze ($1,000-9,999)
    { id: 14, name: '周○○', amount: 8000, tier: 'bronze', projects: ['體育選手培訓基金'] },
    { id: 15, name: '鄭○○', amount: 5000, tier: 'bronze', projects: ['清寒學生獎學金'] },
    { id: 16, name: '蔡○○', amount: 5000, tier: 'bronze', projects: ['智慧教室設備升級'] },
    { id: 17, name: '謝○○', amount: 3000, tier: 'bronze', projects: ['校園環境美化計畫'] },
    { id: 18, name: '郭○○', amount: 2000, tier: 'bronze', projects: ['緊急助學金'] },
    { id: 19, name: '洪○○', amount: 1500, tier: 'bronze', projects: ['學術研究發展基金'] },
    { id: 20, name: '曾○○', amount: 1000, tier: 'bronze', projects: ['體育選手培訓基金'] }
];

// Filter Categories
const filterCategories = [
    { id: 'all', name: '全部專案', icon: '🎯' },
    { id: 'scholarship', name: '獎學金', icon: '📚' },
    { id: 'sports', name: '體育培訓', icon: '🏅' },
    { id: 'teaching', name: '教學設備', icon: '💻' },
    { id: 'research', name: '學術研究', icon: '🔬' },
    { id: 'campus', name: '校園建設', icon: '🌳' }
];

// Utility Functions
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
            platinum: { name: '白金級', color: 'from-slate-300 to-gray-400', icon: '👑' },
            gold: { name: '金質級', color: 'from-amber-400 to-yellow-500', icon: '🏆' },
            silver: { name: '銀質級', color: 'from-gray-300 to-slate-400', icon: '🥈' },
            bronze: { name: '銅質級', color: 'from-amber-600 to-orange-700', icon: '🥉' },
            regular: { name: '感謝捐款', color: 'from-blue-400 to-indigo-500', icon: '💙' }
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
    scrollToElement(selector) {
        const element = document.querySelector(selector);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
};

// School Info
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

// FAQ Data
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

// Export for use in pages
if (typeof window !== 'undefined') {
    window.projectsData = projectsData;
    window.recentDonationsData = recentDonationsData;
    window.donorsData = donorsData;
    window.filterCategories = filterCategories;
    window.utils = utils;
    window.schoolInfo = schoolInfo;
    window.faqData = faqData;
}
