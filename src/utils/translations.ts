// utils/translations.ts

export type LanguageCode = 'EN' | 'LG' | 'SW';

export const translations = {
  EN: {
    // Tab bar
    tabHome: 'Home',
    tabDiscover: 'Discover',
    tabCart: 'Cart',
    tabProfile: 'Profile',

    // Splash screen
    tagline: 'Fresh, Farm-direct, Delivered',
    getStarted: 'Get Started',
    browseGuest: 'Browse as Guest',
    loginText: 'Already have an account? Log in',

    // Phone Entry
    phoneTitle: "Let's get you shopping",
    phoneSubtitle: 'Just your number',
    phoneLabel: 'Phone Number',
    phoneNotice: "ℹ️ No National ID needed — that's only for farmers and sellers",
    phoneSubmit: 'Send Code >',
    phoneError: 'Enter a valid Ugandan phone number.',

    // OTP Verification
    otpTitle: 'Verify Your Number',
    otpSubtitle: 'Code sent to',
    otpVerify: 'Verify',
    otpResend: 'Resend code',
    otpResendIn: 'Resend code in {seconds}s',
    otpWaiting: 'Waiting for SMS...',
    otpAutoFilling: 'Auto-filling from SMS...',
    otpAutoFilled: 'Code auto-filled from SMS',
    otpErrorLength: 'Enter the full 6-digit code.',
    otpErrorInvalid: 'Invalid code. Please try again.',

    // Delivery Address
    addressTitle: 'Where should we deliver?',
    addressLocate: 'Use My Current Location',
    addressLabel: 'Label your address',
    addressLandmark: 'Nearest landmark (optional)',
    addressSave: 'Save Address >',
    addressSkip: "I'll add this later",
    addressLocating: 'Locating...',

    // Preferences
    prefTitle: 'What do you usually shop for?',
    prefSubtitle: 'Pick a few — helps us show you the right deals first',
    prefSubmit: 'Continue >',

    // Almost Done
    doneTitle: 'Almost done',
    doneUpdates: 'Order updates',
    doneUpdatesSubtitle: 'Delivery, deals & payment alerts',
    donePaymentTitle: 'Add a payment method (optional now)',
    doneSubmit: 'Enter Marketplace >',
    doneSkip: "Skip — I'll pay at checkout",

    // Discover Screen
    discoverTitle: 'Discover',
    discoverCount: '{count} products found',
    discoverSortLabel: 'Sort by:',
    discoverSortPopular: 'Popular',
    discoverSortLowPrice: 'Lowest Price',
    discoverSortHighPrice: 'Highest Price',
    discoverOrganic: 'Organic',
    // Categories
    cat_all: 'All',
    cat_vegetables: 'Vegetables',
    cat_fruits: 'Fruits',
    cat_dairy_eggs: 'Dairy & Eggs',
    cat_grains: 'Grains',
    cat_legumes: 'Legumes',
    cat_fish_meat: 'Fish & Meat',
    cat_herbs: 'Herbs & Spices',
  },
  LG: {
    // Tab bar
    tabHome: 'Awaka',
    tabDiscover: 'Saka',
    tabCart: 'Ekibbo',
    tabProfile: 'Nze',

    // Splash screen
    tagline: 'Ebirungi, Butereevu okuva ku nnimiro, Bituusiddwa',
    getStarted: 'Tandika',
    browseGuest: 'Yingira nga Mugenyi',
    loginText: 'Olina edda akawunti? Yingira',

    // Phone Entry
    phoneTitle: 'Katutandike okusaka',
    phoneSubtitle: 'Namba yo yokka',
    phoneLabel: 'Namba y’Essimu',
    phoneNotice: "ℹ️ ID w'Eggwanga teyetaagisa — eyo ya balimi na batunzi bokka",
    phoneSubmit: 'Weereza Akalango >',
    phoneError: 'Yingiza namba y’essimu eya Uganda entuufu.',

    // OTP Verification
    otpTitle: 'Kakasa Namba Yo',
    otpSubtitle: 'Akalango kaweerezeddwa ku',
    otpVerify: 'Kakasa',
    otpResend: 'Weereza akalango nate',
    otpResendIn: 'Weereza nate mu ssekonda {seconds}',
    otpWaiting: 'Tulinda SMS...',
    otpAutoFilling: 'Kiyingiza wekka okuva mu SMS...',
    otpAutoFilled: 'Kakasiddwa okuva mu SMS',
    otpErrorLength: 'Yingiza ennamba zonna 6 ez’akalango.',
    otpErrorInvalid: 'Akalango tekakakasiddwa. Gezaako nate.',

    // Delivery Address
    addressTitle: 'Ebyokulya obitwala wa?',
    addressLocate: 'Kozesa Ekifo Wendi Kakano',
    addressLabel: 'Bantuuma wa wano',
    addressLandmark: 'Ekifo ekimanyiddwa eky’okumpi (optional)',
    addressSave: 'Tegeka Ekifo >',
    addressSkip: 'Ndyongerako oluvannyuma',
    addressLocating: 'Tulinda okuzuula...',

    // Preferences
    prefTitle: 'Biki by’osinga okugula?',
    prefSubtitle: 'Londa ebiwerako — kituyambe okukulaga ebisale ebirungi ebya bulijjo',
    prefSubmit: 'Genda mu maaso >',

    // Almost Done
    doneTitle: 'Kulaabyeko',
    doneUpdates: 'Ebiranga ebiragiro',
    doneUpdatesSubtitle: 'Entambula, ebisale, n’ebya ssente',
    donePaymentTitle: 'Yongerako engeri y’okusasulamu (kyeyagalire)',
    doneSubmit: 'Yingira Akatale >',
    doneSkip: 'Ndasulira ku kumaliriza',

    // Discover Screen
    discoverTitle: 'Saka Ebyokulya',
    discoverCount: 'Ebyokulya {count} bizuuliddwa',
    discoverSortLabel: 'Tegeka nga:',
    discoverSortPopular: 'Ebisinga okugulwa',
    discoverSortLowPrice: 'Ebiseera eby’awansi',
    discoverSortHighPrice: 'Ebiseera eby’awagulu',
    discoverOrganic: 'Bya Bulimi',
    // Categories
    cat_all: 'Zonna',
    cat_vegetables: 'Enva',
    cat_fruits: 'Ebibala',
    cat_dairy_eggs: "Amata n'Amagi",
    cat_grains: 'Empeke',
    cat_legumes: 'Ebijanjaalo',
    cat_fish_meat: "Ebyennyanja n'Ennyama",
    cat_herbs: 'Ebirungo',
  },
  SW: {
    // Tab bar
    tabHome: 'Nyumbani',
    tabDiscover: 'Gundua',
    tabCart: 'Kikapu',
    tabProfile: 'Profaili',

    // Splash screen
    tagline: 'Safi, Moja kwa moja kutoka shambani, Imefikishwa',
    getStarted: 'Anza',
    browseGuest: 'Vinjari kama Mgeni',
    loginText: 'Tayari una akaunti? Ingia',

    // Phone Entry
    phoneTitle: 'Wacha tukufanye ununue',
    phoneSubtitle: 'Nambari yako tu',
    phoneLabel: 'Nambari ya Simu',
    phoneNotice: 'ℹ️ Kitambulisho cha Taifa hakihitajiki — ni kwa ajili ya wakulima na wauzaji pekee',
    phoneSubmit: 'Tuma Nambari >',
    phoneError: 'Weka nambari halali ya simu ya Uganda.',

    // OTP Verification
    otpTitle: 'Thibitisha Nambari Yako',
    otpSubtitle: 'Nambari imetumwa kwa',
    otpVerify: 'Thibitisha',
    otpResend: 'Tuma nambari tena',
    otpResendIn: 'Tuma nambari tena baada ya sekunde {seconds}',
    otpWaiting: 'Inasubiri SMS...',
    otpAutoFilling: 'Inajaza kiotomatiki kutoka kwa SMS...',
    otpAutoFilled: 'Nambari imejazwa kutoka kwa SMS',
    otpErrorLength: 'Weka nambari zote 6 za uthibitisho.',
    otpErrorInvalid: 'Nambari si halali. Tafadhali jaribu tena.',

    // Delivery Address
    addressTitle: 'Tukuletee wapi?',
    addressLocate: 'Tumia Mahali Nilipo Sasa',
    addressLabel: 'Lebo anwani hii',
    addressLandmark: 'Alama ya karibu (si lazima)',
    addressSave: 'Hifadhi Anwani >',
    addressSkip: 'Nitaongeza baadaye',
    addressLocating: 'Inatafuta...',

    // Preferences
    prefTitle: 'Je, huwa unanunua nini?',
    prefSubtitle: 'Chagua chache — hutusaidia kukuonyesha ofa zinazofaa kwanza',
    prefSubmit: 'Endelea >',

    // Almost Done
    doneTitle: 'Karibu kumaliza',
    doneUpdates: 'Habari za maagizo',
    doneUpdatesSubtitle: 'Uwasilishaji, ofa na arifa za malipo',
    donePaymentTitle: 'Ongeza njia ya malipo (si lazima sasa)',
    doneSubmit: 'Ingia Sokoni >',
    doneSkip: 'Nitalipa wakati wa kuchukua',

    // Discover Screen
    discoverTitle: 'Gundua',
    discoverCount: 'Bidhaa {count} zimepatikana',
    discoverSortLabel: 'Panga kwa:',
    discoverSortPopular: 'Maarufu',
    discoverSortLowPrice: 'Bei ya Chini',
    discoverSortHighPrice: 'Bei ya Juu',
    discoverOrganic: 'Kikaboni',
    // Categories
    cat_all: 'Zote',
    cat_vegetables: 'Mboga',
    cat_fruits: 'Matunda',
    cat_dairy_eggs: 'Maziwa na Mayai',
    cat_grains: 'Nafaka',
    cat_legumes: 'Kunde',
    cat_fish_meat: 'Samaki na Nyama',
    cat_herbs: 'Viungo',
  },
};
