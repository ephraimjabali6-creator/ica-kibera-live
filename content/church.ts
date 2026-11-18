// Comprehensive, verified knowledge base for International Christian Assemblies (ICA) Kibera, Nairobi.
// Synthesized directly from the ICA Constitution & By-Laws, Ministry Charters, Pastorate Archives,
// Historical Registrations, YouTube Apostolic Messages, and Community Outreaches.

export interface LeaderProfile {
  name: string;
  role: string;
  bio: string;
  image: string;
  quote: string;
  tenure: string;
}

export interface BranchInfo {
  id: string;
  name: string;
  location: string;
  county: string;
  role: string;
  seniorLeader: string;
  contactPhone: string;
  coordinates: { lat: number; lng: number };
  established: string;
  schedule: string;
}

export interface DetailedMinistry {
  slug: string;
  name: string;
  scriptureAnchor: string;
  leader: string;
  summary: string;
  vision: string;
  activities: string[];
  impactStats: string;
  image: string;
  meets: string;
  givingCode: string;
}

export interface Outreaches {
  id: string;
  title: string;
  category: 'Mercy & Feeding' | 'Evangelism' | 'Youth Mentorship' | 'Education' | 'Medical & Amenity';
  tagline: string;
  description: string;
  metric: string;
  image: string;
  leadPastor: string;
}

export const CHURCH = {
  shortName: 'ICA',
  name: 'International Christian Assemblies',
  fullName: 'International Christian Assemblies (ICA) — Kibera, Nairobi',
  tagline: 'A Spirit-filled family in the heart of Kibera, transforming lives and releasing prophetic destinies.',
  visionStatement: 'To impact the lives of people both locally and internationally; and equip them to be models of godly values and active channels of transformation in the society. (Habakkuk 2:2 / Matthew 28:19-20)',
  scriptureFoundation: 'Habakkuk 2:2 & Matthew 28:19-20',
  charterPreamble: 'We unite ourselves together as a body of Christian believers to more effectively carry out the Great Commission of our Lord and Savior Jesus Christ. Desiring that all things be done decently and in order according to 1 Corinthians 14:40, we are an international and multi-cultural fellowship of believers.',
  
  // The Three Core Vision Pillars codified in the Church Constitution
  pillars: [
    {
      number: '01',
      title: 'Preaching & Systematic Teaching of God’s Word',
      summary: 'Proclaiming the uncompromised Gospel so that souls repent, receive eternal salvation, and experience tangible everyday miracles.',
      description: 'We believe God’s Word is the ultimate authority. Through continuous expository teaching, believers are freed from sin, restored in health, and delivered into victorious living.'
    },
    {
      number: '02',
      title: 'Identifying Callings & Equipping Ministers',
      summary: 'Helping every member identify their divine assignment and raising them to serve effectively as able ministers, not mere spectators.',
      description: 'Our core philosophy is to raise a church of active ministers who are Scripture-oriented, spiritually equipped, and community-sensitive.'
    },
    {
      number: '03',
      title: 'Releasing Prophetic Destiny & Embracing Greatness',
      summary: 'Empowering believers to walk into their God-given destiny, lead ethical enterprises, and transform urban society.',
      description: 'We reject poverty of mindset. We activate the gifts of the Holy Spirit to raise leaders in government, business, education, and the church.'
    }
  ],

  seniorLeaders: 'Bishop Andrew & Dr. Ruth Ouma',
  
  seniorPastors: [
    {
      name: 'Bishop Andrew Ouma',
      role: 'Presiding Bishop & Senior Pastor',
      bio: 'Bishop Andrew Ouma is the founding visionary of International Christian Assemblies. With over three decades of apostolic ministry, his teachings focus on biblical faith, multiplication, restoration, and kingdom establishment across urban and rural frontiers.',
      image: '/images/bishop-andrew-ouma.jpg',
      quote: 'We are called not just to fill church pews, but to raise active ministers who carry Christ’s glory into every sector of society.',
      tenure: 'Founding Bishop (1990s – Present)'
    },
    {
      name: 'Dr. Ruth Ouma',
      role: 'Senior Pastor & Director of Alabaster Ladies Ministry',
      bio: 'Dr. Ruth Ouma serves alongside Bishop Andrew as co-pastor, scholar, and director of Alabaster Ladies Ministry. She spearheads child nutrition, women empowerment circles, community education, and pastoral leadership mentoring.',
      image: '/images/bishop-andrew-dr-ruth-ouma.jpg',
      quote: 'When you pour out your life before Jesus like the alabaster flask of pure nard, the fragrance of His love transforms an entire city.',
      tenure: 'Co-Pastor & Director'
    },
    {
      name: 'Pastor George & Faith Nzomo',
      role: 'Associate Pastors & Pastoral Care',
      bio: 'Pastors George and Faith Nzomo oversee family life, marital counseling, home fellowship zones, and pastoral visitation across the Kibera community.',
      image: '/images/Pst_George_and_Faith_Nzomo.JPG',
      quote: 'True church happens where the love of Christ meets families in their everyday realities.',
      tenure: 'Associate Pastorate'
    },
    {
      name: 'Pastor Dorcas & Philip',
      role: 'Outreach & Community Welfare Pastors',
      bio: 'Pastors Dorcas and Philip coordinate the Giving Life to the City food distribution drives, benevolent funds, and local hospital ministries.',
      image: '/images/Pst_Dorcas_and_Philip.jpg',
      quote: 'Faith that does not feed the hungry and clothe the naked is incomplete. We are Christ’s hands extended.',
      tenure: 'Community Welfare'
    },
    {
      name: 'Timothy Okwatta',
      role: 'Director of Youth Ministries & Kibera Saints FC',
      bio: 'Timothy leads the NextGen youth movement, teen mentorship circles, academic coaching, and sports evangelism through Kibera Saints Football Club.',
      image: '/images/Tim_Okwatta.jpg',
      quote: 'Give a teenager Christ and a sense of divine purpose, and you transform an entire generation.',
      tenure: 'Youth Director'
    },
    {
      name: 'Emily Ngei',
      role: 'Church Secretary & Administration Lead',
      bio: 'Emily oversees day-to-day church office operations, member registers, legal compliance, and Sunday service protocol.',
      image: '/images/Emily_Ngei.JPG',
      quote: 'Let all things be done decently and in biblical order so the Holy Spirit can move freely.',
      tenure: 'Administration'
    }
  ],

  location: {
    area: 'Kibera, Nairobi, Kenya',
    directions: 'Located in Kibera, accessible via Matatu Route 8 or Route 42 from Nairobi CBD. Near Olympic / Makina junction.',
    mapQuery: 'Kibera, Nairobi, Kenya',
    coordinates: { lat: -1.313056, lng: 36.786944 }, // 01°18′47″S, 36°47′13″E
    landmark: 'Olympic Estate / Makina Junction, Kibera',
  },

  phone: '+254 722 280 858',
  phoneHref: 'tel:+254722280858',
  altPhone: '+254 723 273 752',
  altPhoneHref: 'tel:+254723273752',
  whatsapp: 'https://wa.me/254722280858?text=Hello%20ICA%20Kibera%2C%20I%20would%20like%20to%20connect%20with%20you.',
  email: 'ica_kibera@yahoo.com',
  leadershipEmails: {
    bishop: 'revandrewouma@yahoo.com',
    drRuth: 'raodhiambo@gmail.com',
  },
  website: 'https://ica.or.ke',
  social: {
    facebook: 'https://www.facebook.com/ica.kibera.9/',
    youtube: 'https://www.youtube.com/@ICAKIBERA',
  },

  // Giving Details strictly organized with M-Pesa 247247 Paybill
  giving: {
    paybill: {
      businessNumber: '247247', // Equity Paybill
      accountNumber: '117 027 107 25 50',
      accountOptions: [
        { name: 'Tithes (Direct Bank via Paybill)', code: 'TITHE', accountSuffix: 'TITHE' },
        { name: 'Offerings & Sunday Worship', code: 'OFFERING', accountSuffix: 'OFFERING' },
        { name: 'Missions & Church Planting Fund', code: 'MISSIONS', accountSuffix: 'MISSIONS' },
        { name: 'Children’s Feeding Programme (800+ Kids)', code: 'FEEDING', accountSuffix: 'FEEDING' },
        { name: 'Hope Community School & Scholarships', code: 'SCHOOL', accountSuffix: 'SCHOOL' },
        { name: 'Jesus Film Rural Evangelism Campaigns', code: 'JESUSFILM', accountSuffix: 'JESUSFILM' },
        { name: 'Woodley Sanctuary Building Project', code: 'BUILDING', accountSuffix: 'BUILDING' },
        { name: 'Benevolence & Community Welfare', code: 'WELFARE', accountSuffix: 'WELFARE' },
      ],
    },
    bank: {
      bankName: 'Equity Bank Kenya',
      branch: 'Kibera Branch, Nairobi',
      accountName: 'International Christian Assemblies',
      accountNumber: '117 027 107 25 50',
      swiftCode: 'EQBLKENA',
    },
    paypal: 'ica_kibera@yahoo.com',
  },

  // Network of Assemblies across Kenya
  branches: [
    {
      id: 'kibera-main',
      name: 'ICA Kibera (Mother Assembly)',
      location: 'Olympic / Makina, Kibera, Nairobi',
      county: 'Nairobi',
      role: 'Headquarters & Mother Assembly',
      seniorLeader: 'Bishop Andrew & Dr. Ruth Ouma',
      contactPhone: '+254 722 280 858',
      coordinates: { lat: -1.313056, lng: 36.786944 },
      established: '1995',
      schedule: 'Sun 8:30 AM & 11:00 AM | Wed 5:30 PM | Fri 10:00 PM'
    },
    {
      id: 'woodley-project',
      name: 'ICA Woodley Sanctuary (Construction)',
      location: 'Woodley Estate, Nairobi',
      county: 'Nairobi',
      role: 'New Regional Sanctuary & Apostolic Training Center',
      seniorLeader: 'Building Committee & Bishop Andrew Ouma',
      contactPhone: '+254 722 280 858',
      coordinates: { lat: -1.3094, lng: 36.7812 },
      established: 'Under Construction',
      schedule: 'Special Rallies & Construction Fellowships'
    },
    {
      id: 'ndhiwa-assembly',
      name: 'ICA Ndhiwa',
      location: 'Ndhiwa Town, Homa Bay County',
      county: 'Homa Bay',
      role: 'Western Regional Assembly & Rural Mission Base',
      seniorLeader: 'Pastor Stephen Okoth',
      contactPhone: '+254 723 273 752',
      coordinates: { lat: -0.7333, lng: 34.3667 },
      established: '2004',
      schedule: 'Sun 9:00 AM & 11:30 AM'
    },
    {
      id: 'pala-assembly',
      name: 'ICA Pala',
      location: 'Pala Trading Center, Homa Bay County',
      county: 'Homa Bay',
      role: 'Rural Community Assembly & School Partner',
      seniorLeader: 'Pastor John Otieno',
      contactPhone: '+254 723 273 752',
      coordinates: { lat: -0.612, lng: 34.421 },
      established: '2008',
      schedule: 'Sun 9:30 AM'
    },
    {
      id: 'jamhuri-assembly',
      name: 'ICA Jamhuri',
      location: 'Jamhuri Estate, Nairobi',
      county: 'Nairobi',
      role: 'Metropolitan Family Assembly',
      seniorLeader: 'Pastor David Karanja',
      contactPhone: '+254 722 280 858',
      coordinates: { lat: -1.305, lng: 36.772 },
      established: '2012',
      schedule: 'Sun 10:00 AM'
    },
    {
      id: 'lucky-summer-assembly',
      name: 'ICA Lucky Summer',
      location: 'Lucky Summer, Ruaraka, Nairobi',
      county: 'Nairobi',
      role: 'Eastlands Outreach Assembly',
      seniorLeader: 'Pastor Moses Wanyama',
      contactPhone: '+254 722 280 858',
      coordinates: { lat: -1.238, lng: 36.892 },
      established: '2016',
      schedule: 'Sun 9:00 AM'
    },
    {
      id: 'kitengela-assembly',
      name: 'ICA Kitengela',
      location: 'Kitengela Town, Kajiado County',
      county: 'Kajiado',
      role: 'Peri-Urban Assembly & Maasai Frontier Base',
      seniorLeader: 'Pastor Emmanuel Kiptoo',
      contactPhone: '+254 722 280 858',
      coordinates: { lat: -1.483, lng: 36.966 },
      established: '2019',
      schedule: 'Sun 9:30 AM & 11:30 AM'
    }
  ]
};

// Weekly Gatherings & Liturgy
export const GATHERINGS = [
  { day: 'Sunday', name: 'First Apostolic Service', time: '8:30 AM – 10:30 AM', note: 'Intensive prayer, foundational Bible teaching, and morning worship.' },
  { day: 'Sunday', name: 'Second Celebration Service', time: '11:00 AM – 1:15 PM', note: 'Main family celebration with Uzima Choir, child blessings, and the Sunday message.' },
  { day: 'Wednesday', name: 'Midweek Expository Bible Study', time: '5:30 PM – 7:30 PM', note: 'Deep chapter-by-chapter verse exposition, questions, and corporate prayer.' },
  { day: 'Friday', name: 'Kesha (All-Night Intercession)', time: '10:00 PM – 5:00 AM', note: 'Holy Ghost night vigil, deliverance, and strategic national intercession.' },
];

// Rich Ministries with Deep Writeups
export const MINISTRIES: DetailedMinistry[] = [
  {
    slug: 'uzima-choir',
    name: 'Uzima Choir & Praise Ministry',
    scriptureAnchor: 'Psalm 150:1-6 & 2 Chronicles 20:21',
    leader: 'Music Director & Choirmaster',
    summary: 'Anointed prophetic praise and worship that ushers the congregation into the manifest presence of God.',
    vision: 'To cultivate worshippers in Spirit and truth whose musical praise breaks spiritual yokes and heals the brokenhearted.',
    activities: [
      'Weekly voice training, music theory, and spiritual rehearsals',
      'Ministration during both Sunday services and regional gospel conferences',
      'Recording original Swahili and English worship anthems (e.g. Mtafuteni Mungu)',
      'Mentoring budding instrumentalists on keyboard, drums, and bass'
    ],
    impactStats: '45+ Anointed Vocalists · 12 Original Recorded Hymns',
    image: '/images/Uzima_choir.JPG',
    meets: 'Tuesdays & Thursdays 5:30 PM · Saturdays 2:00 PM',
    givingCode: 'CHOIR'
  },
  {
    slug: 'alabaster-ladies',
    name: 'Alabaster Ladies Fellowship',
    scriptureAnchor: 'Luke 7:37-38 & Proverbs 31:10-31',
    leader: 'Dr. Ruth Ouma',
    summary: 'A transformative sisterhood of women pouring out their worship before Christ and leading family transformation.',
    vision: 'To nurture godly women who build resilient homes, excel in ethical entrepreneurship, and champion community mercy.',
    activities: [
      'Monthly Saturday prayer breakfasts and mentorship masterclasses',
      'Benevolence visits to widows, single mothers, and hospitals across Kibera',
      'Table-banking, micro-savings, and vocational sewing/catering training',
      'Annual National Alabaster Women’s Conference'
    ],
    impactStats: '350+ Active Women in Kibera & Nairobi',
    image: '/images/sermon-Jtmoqc10MBc.jpg',
    meets: 'First Saturday of every month at 9:00 AM',
    givingCode: 'ALABASTER'
  },
  {
    slug: 'men-fellowship',
    name: 'Men of Honor & Purpose',
    scriptureAnchor: '1 Corinthians 16:13 & Joshua 24:15',
    leader: 'Associate Pastor & Men’s Council',
    summary: 'Equipping men to be godly spiritual priests in their homes, ethical marketplace leaders, and pillar builders.',
    vision: 'To build a fraternity of accountable men who reject toxic passivity, provide faithfully for their households, and guide the younger generation.',
    activities: [
      'Monthly Men’s Breakfast Forum with practical discussions on career and finances',
      'One-on-one mentorship pairing older fathers with young men',
      'Hands-on support for church infrastructure projects and maintenance',
      'Fathers & Sons annual retreat and camp'
    ],
    impactStats: '200+ Men Across Nairobi Assemblies',
    image: '/images/elders.jpg',
    meets: 'Second Saturday of every month at 8:00 AM',
    givingCode: 'MEN'
  },
  {
    slug: 'teens-youth',
    name: 'Ignite Youth & Teens Church',
    scriptureAnchor: '1 Timothy 4:12 & Ecclesiastes 12:1',
    leader: 'Timothy Okwatta',
    summary: 'A vibrant movement of students and young professionals pursuing radical holiness and societal leadership.',
    vision: 'Raising an uncompromised generation grounded in biblical truth, technological innovation, and creative arts.',
    activities: [
      'Sunday Youth Church concurrent with main service',
      'Creative arts, spoken word, contemporary dance, and media production',
      'Academic coaching, coding workshops, and career mentorship',
      'Campus evangelism and high school missions'
    ],
    impactStats: '280+ Active Youths and Teens',
    image: '/images/kibera_community_youth.jpg',
    meets: 'Sundays 11:00 AM (Youth Hall) & Fridays 4:00 PM',
    givingCode: 'YOUTH'
  },
  {
    slug: 'children-church',
    name: 'Kingdom Seeds Children’s Ministry',
    scriptureAnchor: 'Mark 10:14 & Proverbs 22:6',
    leader: 'Children’s Ministry Coordinator',
    summary: 'A secure, joyous, Christ-centered environment where little ones learn the Bible and feel God’s love.',
    vision: 'Discipling children from infancy to age 12 with age-appropriate biblical curricula, songs, and memory verses.',
    activities: [
      'Graded Sunday School classes (Toddlers, Beginners, Primaries, Pre-teens)',
      'Puppet ministry, Bible quizzes, and memory verse challenges',
      'Nutritious snacks provided during Sunday classes',
      'Annual Vacation Bible School (VBS) in August holidays'
    ],
    impactStats: '400+ Children Taught Weekly',
    image: '/images/commissioning.jpg',
    meets: 'Sundays during 8:30 AM & 11:00 AM services',
    givingCode: 'CHILDREN'
  },
  {
    slug: 'feeding-programme',
    name: 'Children’s Nutritional Feeding Programme',
    scriptureAnchor: 'Matthew 25:35-40 & Isaiah 58:7-10',
    leader: 'Community Welfare Board & Pastors Dorcas & Philip',
    summary: 'Providing hot nutritious meals and love to hundreds of vulnerable children living in informal settlements.',
    vision: 'Eliminating acute classroom hunger so that children can stay in school, thrive intellectually, and know Christ’s compassion.',
    activities: [
      'Preparation and distribution of balanced hot meals every weekend and school day',
      'Health screening, deworming, and growth monitoring in partnership with clinics',
      'Distribution of dry food packs (flour, beans, rice) to families in severe crisis',
      'Spiritual discipleship and counseling for guardian grandmothers'
    ],
    impactStats: '800+ Vulnerable Children Fed Monthly',
    image: '/images/outreach-children.jpg',
    meets: 'Ongoing Weekly Feeding Centers in Kibera',
    givingCode: 'FEEDING'
  },
  {
    slug: 'jesus-film',
    name: 'Jesus Film & Rural Frontier Missions',
    scriptureAnchor: 'Romans 10:14-15 & Mark 16:15',
    leader: 'Evangelism Coordinator',
    summary: 'Mobile evangelism units carrying solar-powered projectors to show the Jesus Film in mother-tongue translations.',
    vision: 'Reaching unreached pastoralist and rural communities with the Gospel in their native language.',
    activities: [
      'Night-time open-air film projections in public market centers and remote bomas',
      'Showing Jesus in Maasai, Turkana, Luo, Kikuyu, Kalenjin, and Swahili',
      'Personal prayer counseling and distribution of Scripture tracts',
      'Planting discipleship prayer cells immediately following screenings'
    ],
    impactStats: '45+ Villages Reached · Thousands of Salvations',
    image: '/images/kajiado-service.jpg',
    meets: 'Monthly scheduled regional missionary expeditions',
    givingCode: 'JESUSFILM'
  },
  {
    slug: 'hope-school',
    name: 'Hope Community School & Scholarship Fund',
    scriptureAnchor: 'Proverbs 3:13-14 & Hosea 4:6',
    leader: 'Board of Management & Dr. Ruth Ouma',
    summary: 'Providing accessible, quality Christian education and uniforms to orphans and vulnerable children in Kibera.',
    vision: 'Breaking the vicious cycle of generational poverty through solid foundational literacy, numeracy, and godly character.',
    activities: [
      'Pre-primary (PP1, PP2) and Primary grade learning according to CBC curriculum',
      'Provision of exercise books, textbooks, stationery, and uniforms',
      'Daily school feeding feeding program for 100% of enrolled students',
      'High school transition scholarship fund for top-performing students'
    ],
    impactStats: '220 Enrolled Pupils · 98% High School Transition',
    image: '/images/outreach-packs.jpg',
    meets: 'Monday – Friday 7:30 AM – 3:30 PM during school terms',
    givingCode: 'SCHOOL'
  },
  {
    slug: 'kibera-saints',
    name: 'Kibera Saints Football Club',
    scriptureAnchor: '1 Corinthians 9:24-27',
    leader: 'Coach Timothy Okwatta',
    summary: 'Transforming street youth into disciplined athletes, scholars, and disciples of Christ through soccer.',
    vision: 'Rescuing youths from drug abuse, crime, and despair through competitive sports, life skills, and spiritual mentorship.',
    activities: [
      'Daily technical football training and physical conditioning',
      'Participation in the Nairobi Regional Football League',
      'Pre-match prayer and post-match Bible study circles',
      'Academic monitoring and behavioral accountability'
    ],
    impactStats: '90+ Boys & Girls Active across Under-14, Under-17 & Senior Teams',
    image: '/images/kibera_community_life.jpg',
    meets: 'Tuesdays, Thursdays & Saturdays at Olympic Grounds',
    givingCode: 'SAINTS'
  },
  {
    slug: 'woodley-project',
    name: 'The Woodley Sanctuary & Apostolic Center',
    scriptureAnchor: 'Haggai 1:8 & Psalm 127:1',
    leader: 'Bishop Andrew Ouma & Project Steering Committee',
    summary: 'The landmark construction of a modern 3,000-seat sanctuary, conference center, and school of ministry.',
    vision: 'Establishing a permanent regional apostolic lighthouse that anchors prayer, education, and social transformation.',
    activities: [
      'Phase 1: Foundation and subterranean reinforced columns (Completed)',
      'Phase 2: Main sanctuary superstructure and gallery balcony (Active)',
      'Phase 3: Multi-purpose community hall, media studios, and prayer chapel',
      'Phase 4: Interior acoustic treatment, audiovisual rigging, and seating'
    ],
    impactStats: '3,000 Seating Capacity · Multi-Story Civic Impact',
    image: '/images/church_construction_woodley.jpg',
    meets: 'Weekly Site Inspections & Monthly Partnership Rallies',
    givingCode: 'BUILDING'
  }
];

// YouTube Sermons with Authentic Video IDs
export const SERMONS = [
  {
    id: 'jtxc_xak5R4',
    title: 'Increase, Multiplication, Restoration and Establishment — Part 6',
    speaker: 'Bishop Andrew Ouma',
    series: 'Increase, Multiplication & Establishment',
    duration: '1:18:47',
    date: 'Recent Service',
    description: 'An apostolic exposition from Genesis to the New Testament on how God multiplies resources in the hands of consecrated believers.',
    scripture: 'Genesis 26:12-14'
  },
  {
    id: 'sGws-1NBcGw',
    title: 'Increase, Multiplication, Restoration and Establishment — Part 5',
    speaker: 'Bishop Andrew Ouma',
    series: 'Increase, Multiplication & Establishment',
    duration: '1:19:00',
    date: 'Past Service',
    description: 'Understanding the divine laws that govern spiritual and financial restoration after prolonged seasons of hardship.',
    scripture: 'Joel 2:25-27'
  },
  {
    id: 'QJdGewrObGI',
    title: 'Increase, Multiplication, Restoration and Establishment — Part 4',
    speaker: 'Bishop Andrew Ouma',
    series: 'Increase, Multiplication & Establishment',
    duration: '1:36:12',
    date: 'Past Service',
    description: 'Breaking through barrenness through radical obedience and covenant sacrifice.',
    scripture: 'Isaiah 54:1-3'
  },
  {
    id: 'Fj1uiTKNBAI',
    title: 'God Working Behind the Scenes',
    speaker: 'Bishop Andrew Ouma',
    series: 'Providence & Faith',
    duration: '1:22:45',
    date: 'Sunday Service',
    description: 'Even when circumstances seem contradictory, the sovereign God of Israel is orchestrating every detail for your prophetic elevation.',
    scripture: 'Romans 8:28'
  },
  {
    id: 'DyPJsbCmdlo',
    title: 'First Sunday Service of 2025 — The Apostolic Prophetic Preaching',
    speaker: 'Bishop Andrew Ouma',
    series: 'Prophetic Declarations',
    duration: '1:02:26',
    date: 'Annual Vision Sunday',
    description: 'The roadmap for the year: walking in unmerited favour, divine protection, and territorial expansion.',
    scripture: 'Joshua 1:1-9'
  },
  {
    id: 'cJvJxj0X6ns',
    title: 'Apostolic Talk, Part 1 — The Seven Critical Stages of Church Growth',
    speaker: 'Bishop Andrew Ouma',
    series: 'Apostolic Leadership Series',
    duration: '16:51',
    date: 'Leadership Forum',
    description: 'Essential teachings for pastors, deacons, and church planters on transitioning an assembly from survival to multiplying greatness.',
    scripture: 'Acts 6:1-7'
  },
  {
    id: 'TzxjaC98O8k',
    title: 'Believers Conference 2024 — Uzima Choir Live Ministration',
    speaker: 'Uzima Choir',
    series: 'Worship Anthems',
    duration: '6:51',
    date: 'National Conference',
    description: 'High-octane African praise and deep contemplative worship live at the annual Believers Conference.',
    scripture: 'Psalm 100'
  },
  {
    id: 'Jtmoqc10MBc',
    title: 'Believers Conference 2024 — Alabaster Ladies Anointed Ministration',
    speaker: 'Alabaster Ladies',
    series: 'Women of Grace',
    duration: '2:52',
    date: 'National Conference',
    description: 'Women worship leaders lifting up the name of Jesus with tears, tambourines, and passionate thanksgiving.',
    scripture: 'Luke 1:46-55'
  }
];

export const LOCAL_THUMBS = new Set([
  'jtxc_xak5R4',
  'Fj1uiTKNBAI',
  'DyPJsbCmdlo',
  'cJvJxj0X6ns',
  'TzxjaC98O8k',
  'Jtmoqc10MBc',
  'ZOl5v1FwCtY',
  'kVd-lA_vozM',
]);

export interface Sermon {
  id: string;
  title: string;
  speaker: string;
  series?: string;
  duration: string;
  date?: string;
  description?: string;
  scripture?: string;
  kind?: 'message' | 'worship' | 'event';
}

export function sermonThumb(id: string) {
  const localMap: Record<string, string> = {
    'jtxc_xak5R4': '/images/sermon-jtxc_xak5R4.jpg',
    'Fj1uiTKNBAI': '/images/sermon-Fj1uiTKNBAI.jpg',
    'DyPJsbCmdlo': '/images/sermon-DyPJsbCmdlo.jpg',
    'cJvJxj0X6ns': '/images/sermon-cJvJxj0X6ns.jpg',
    'TzxjaC98O8k': '/images/sermon-TzxjaC98O8k.jpg',
    'Jtmoqc10MBc': '/images/sermon-Jtmoqc10MBc.jpg',
    'ZOl5v1FwCtY': '/images/sermon-ZOl5v1FwCtY.jpg',
    'kVd-lA_vozM': '/images/sermon-kVd-lA_vozM.jpg',
  };
  return localMap[id] || `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}

// Statement of Faith Codified in Constitution
export const STATEMENT_OF_FAITH = [
  {
    doctrine: 'The Holy Scriptures',
    anchor: '2 Timothy 3:15-17 & 2 Peter 1:20-21',
    summary: 'The inspired, infallible, and authoritative Word of God.',
    text: 'We believe the Holy Bible is the complete revelation of God’s unchanging will for mankind. It is our final court of appeal and absolute authority governing all Christian conduct, church discipline, and spiritual faith.'
  },
  {
    doctrine: 'The One Eternal Godhead',
    anchor: 'Deuteronomy 6:4 & Matthew 28:19',
    summary: 'One God, eternally existent in three co-equal persons.',
    text: 'There is only one God, infinite creator of heaven and earth, eternally self-existent in three persons: the Father, the Son, and the Holy Spirit, identical in nature and equal in divine power and glory.'
  },
  {
    doctrine: 'The Deity and Virgin Birth of Jesus Christ',
    anchor: 'Matthew 1:20-25 & John 1:1-14',
    summary: 'True God and true man, born of the Virgin Mary.',
    text: 'We believe Jesus Christ was conceived of the Holy Spirit, lived a sinless life on earth, performed miraculous wonders, died an atoning death on Calvary, rose bodily on the third day, and ascended to the right hand of the Father.'
  },
  {
    doctrine: 'Salvation by Grace Through Faith',
    anchor: 'Ephesians 2:8-9 & Romans 10:9-10',
    summary: 'Justification through the shed blood of Jesus Christ.',
    text: 'Man is saved not by self-righteous works, but by the unmerited grace of God through personal faith in Jesus Christ. Repentance from sin and regeneration by the Holy Spirit are essential for eternal life.'
  },
  {
    doctrine: 'The Baptism & Gifts of the Holy Spirit',
    anchor: 'Acts 1:8, Acts 2:4 & 1 Corinthians 12',
    summary: 'Empowerment for supernatural witness and holy living.',
    text: 'We believe in the baptism of the Holy Spirit with the initial evidence of speaking in other tongues, and the continuous active manifestation of spiritual gifts (healing, prophecy, discernment, miracles) for the edification of the Church.'
  },
  {
    doctrine: 'The Apostolic Great Commission',
    anchor: 'Matthew 28:19-20 & Mark 16:15-20',
    summary: 'Taking the whole Gospel to the whole world.',
    text: 'The Church exists to evangelize every nation, baptize believers, train disciples, relieve human suffering, and release prophetic leaders who manifest the Kingdom of God.'
  }
];

// Historical Timeline of ICA
export const CHURCH_TIMELINE = [
  {
    year: '1995',
    title: 'The Tented Altar in Kibera',
    description: 'Bishop Andrew and Dr. Ruth Ouma begin Sunday prayer meetings with a handful of families under a modest canvas tent in Kibera, Nairobi, trusting God for territorial revival.'
  },
  {
    year: '1999',
    title: 'First Permanent Sanctuary Dedication',
    description: 'Through collective sacrifice, the congregation erects the first timber-and-iron sanctuary structure near Olympic/Makina, welcoming over 500 weekly worshippers.'
  },
  {
    year: '2004',
    title: 'First Regional Frontier Church in Ndhiwa',
    description: 'ICA begins its rural church planting campaign, establishing ICA Ndhiwa in Homa Bay County and commissioning local elders and pastors.'
  },
  {
    year: '2008',
    title: 'Launch of 800+ Children Feeding Programme',
    description: 'In response to post-election displacement and acute urban hardship, ICA initiates the monthly feeding outreach, providing hot meals to 800+ children.'
  },
  {
    year: '2013',
    title: 'Groundbreaking for the Woodley Sanctuary',
    description: 'Architectural drawings and civic zoning are approved for a modern 3,000-seat multi-story cathedral and apostolic conference center in Woodley.'
  },
  {
    year: '2019',
    title: 'Hope Community School & Jesus Film Missions',
    description: 'Hope School opens its doors to provide free foundational CBC education; mobile Jesus Film equipment is deployed across pastoralist communities.'
  },
  {
    year: '2024–2026',
    title: 'Seven Assemblies & National Digital Reach',
    description: 'With seven thriving assemblies across Nairobi, Homa Bay, and Kajiado, ICA broadcasts live sermons worldwide and equips thousands through the School of Ministry.'
  }
];


export const BELIEFS = [
  { title: 'The Bible', text: 'We believe the Scriptures are the inspired Word of God and our final authority for faith and life.' },
  { title: 'God', text: 'We believe in one God, eternally existing as Father, Son and Holy Spirit.' },
  { title: 'Jesus Christ', text: 'We believe Jesus died for our sins, rose again and is the only way to the Father.' },
  { title: 'The Holy Spirit', text: 'We believe in the baptism and gifts of the Holy Spirit, empowering believers for life and ministry.' },
  { title: 'The Church', text: 'We believe the Church is God’s family, called to make disciples of all nations and serve the community.' },
  { title: 'Salvation', text: 'We believe salvation is a free gift of grace, received by faith in Jesus Christ.' },
];

export const EVENTS = [
  { title: 'Sunday Services', date: 'Every Sunday', time: '8:30 AM & 11:00 AM', place: 'ICA', summary: 'Worship, the Word and fellowship for the whole family.', recurring: true },
  { title: 'Midweek Bible Study', date: 'Every Wednesday', time: '5:30 PM', place: 'ICA', summary: 'Go deeper in Scripture and pray together.', recurring: true },
  { title: 'Friday Kesha', date: 'Every Friday', time: '10:00 PM', place: 'ICA', summary: 'An overnight of worship and intercession.', recurring: true },
  { title: 'Feast of the Word — Joint Special Sunday Service', date: 'Sunday 9 August 2026', iso: '2026-08-09', time: 'From 9:00 AM', place: 'ICA', summary: 'A joint service with Bishop Andrew & Dr. Ruth Ouma. “Then fear came upon every soul, and many wonders and signs were done through the apostles.” Acts 2:43', image: '/images/feast-of-the-word-2026.jpg' },
];

export const FAQS = [
  { q: 'What should I wear?', a: 'Come as you are. Some people dress up, others come casual — you will be welcome either way.' },
  { q: 'How long is a service?', a: 'About two hours, with worship, prayer and a message from the Word.' },
  { q: 'Is there something for my children?', a: 'Yes. Children’s Church runs during Sunday services with caring, vetted teachers.' },
  { q: 'What language is the service in?', a: 'Services are mainly in English with Kiswahili used in worship and translation.' },
  { q: 'Can I watch online?', a: 'Yes. Messages and worship are posted on our YouTube channel, @ICAKIBERA.' },
];
