import { ParticipantUser, VideoItem, CategoryGroup, BinaryTreeNode, TransactionRecord, CertificateRecord, RoundSubmission, InvoiceRecord } from '../types';

export const HERO_SLIDES = [
  {
    id: 1,
    title: 'Global Multitalent Show GMTS – Register Now!',
    subtitle: 'Where Talent Meets Global Recognition • International Fashion & Runway Experience',
    categoryHighlight: 'Modeling | Dance | Singing | Acting | Fashion | 200+ Categories',
    badge: 'Round 1 Auditions Live • Open For Ages 5–85',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1600&q=80',
    primaryCta: 'Join Fashion Round 1',
    secondaryCta: 'Watch Video Gallery'
  },
  {
    id: 2,
    title: 'Walk The International Grand Runway',
    subtitle: 'Catwalk • Designer Showcase • Bridal & Haute Couture • Ramp Personality',
    categoryHighlight: '55+ Modeling & Catwalk Divisions with Official Certification',
    badge: '100% Transparent Online Voting',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1600&q=80',
    primaryCta: 'Register For Modeling',
    secondaryCta: 'Explore Categories'
  },
  {
    id: 3,
    title: 'Express Your Art & Performance Globally',
    subtitle: 'Contemporary, Classical, Hip-Hop, Bollywood & Global Duet Dance',
    categoryHighlight: '30+ Dance Sub-Categories with Global Audience Reach',
    badge: 'Win ₹1,00,000 Cash Puraskar',
    image: 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=1600&q=80',
    primaryCta: 'Register For Dance',
    secondaryCta: 'View Leaderboard'
  },
  {
    id: 4,
    title: 'Vocal, Instrumental & Acting Spotlight',
    subtitle: 'Monologues, Digital Film, Theatre, Acoustic Bands & Solo Melodies',
    categoryHighlight: 'Professional Mentorship with VIFTRI & PECC Global Network',
    badge: 'Instant Digital ID Card & Certificates',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1600&q=80',
    primaryCta: 'Enter Acting & Music',
    secondaryCta: 'Verify Certificate'
  },
  {
    id: 5,
    title: 'Fine Arts, Fashion Design & Unique Talents',
    subtitle: 'Textile Innovation, SFX Makeup, Speed Art, Yoga & Magic Wonders',
    categoryHighlight: 'Build Your MLM Referral Team & Earn Matching + Royalty Bonuses',
    badge: 'Zero Time Limit • Carry Forward System',
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1600&q=80',
    primaryCta: 'Claim Your Spotlight',
    secondaryCta: 'Quick Inquiry'
  }
];

export const CATEGORY_GROUPS: CategoryGroup[] = [
  {
    id: 'modeling-catwalk',
    group_name: 'Modeling & Catwalk Runway',
    icon_name: 'Sparkles',
    color: 'from-pink-500 to-rose-600',
    subcategories: [
      'Catwalk Professional',
      'Designer Show Walk',
      'Ramp Personality Walk',
      'Kids & Teens Catwalk',
      'Open Global Runway',
      'Solo Ramp Presentation',
      'Duo Pair Rampwalk',
      'Costume Theme Walk',
      'Expression & Style Test',
      'Editorial & Glamour Look',
      'Commercial Print Modeling',
      'Student New Face Model',
      'Bridal Fashion Showcase',
      'Haute Couture Runway',
      'High-Fashion PFW Style'
    ]
  },
  {
    id: 'dancing',
    group_name: 'Dancing & Choreography',
    icon_name: 'Activity',
    color: 'from-fuchsia-500 to-purple-600',
    subcategories: [
      'Classical Bharatanatyam',
      'Kathak Classical',
      'Odissi Traditional',
      'Contemporary & Freestyle',
      'Bollywood & Stage Dance',
      'Hip-Hop & Street Dance',
      'Salsa & Tango Latin',
      'Ballet & Lyrical Dance',
      'Zumba & Fitness Dance',
      'Belly Dance & Folk',
      'Ballroom & Jazz Dance',
      'Breakdancing & Popping',
      'Acrobatic & Aerial Dance',
      'Couples Duet Dance',
      'Kids Freestyle Dance'
    ]
  },
  {
    id: 'singing-music',
    group_name: 'Singing & Vocals',
    icon_name: 'Mic',
    color: 'from-violet-500 to-indigo-600',
    subcategories: [
      'Pop & Rock Vocals',
      'Indie & Acoustic Song',
      'Folk & Cultural Songs',
      'Western & Fusion Vocal',
      'Classical Indian Raag',
      'Semi-Classical & Ghazal',
      'Global Open Singing',
      'Original Song Composition',
      'Rap & Hip-Hop Lyricism',
      'Devotional & Spiritual Chant'
    ]
  },
  {
    id: 'acting-theatre',
    group_name: 'Acting & Drama',
    icon_name: 'Film',
    color: 'from-amber-500 to-orange-600',
    subcategories: [
      'Monologue & Short Scene',
      'Film & Digital Web Acting',
      'Theatre & Stage Drama',
      'Character & Emotion Expression',
      'Student Talent Showcase',
      'Cinematic Dialogue Delivery',
      'Street Play (Nukkad Natak)',
      'Historical & Period Drama'
    ]
  },
  {
    id: 'fashion-design',
    group_name: 'Fashion Designing & Styling',
    icon_name: 'Scissors',
    color: 'from-rose-500 to-pink-600',
    subcategories: [
      'Traditional Ethnic Clothing',
      'Modern Western Couture',
      'Sustainable & Eco Fashion',
      'Textile & Fabric Innovation',
      'Accessories Design (Bags, Shoes)',
      'Handcrafted Bridal Wear',
      'Student Designer Collection',
      'Avant-Garde Concept Fashion'
    ]
  },
  {
    id: 'makeup-beauty',
    group_name: 'Makeup Art & SFX',
    icon_name: 'Heart',
    color: 'from-pink-400 to-red-500',
    subcategories: [
      'Bridal Transformation Makeup',
      'Creative & Fantasy Makeup',
      'Editorial High-Fashion Glam',
      'Special Effects (SFX) Makeup',
      'Natural & Organic Glow Look',
      'Stage & Runway Makeup',
      'Hair Styling & Avant-Garde Hair'
    ]
  },
  {
    id: 'fine-arts-painting',
    group_name: 'Art & Painting',
    icon_name: 'Palette',
    color: 'from-emerald-500 to-teal-600',
    subcategories: [
      'Sketching & Pencil Portrait',
      'Oil on Canvas Painting',
      'Acrylic Modern Painting',
      'Watercolor Delicate Art',
      'Digital Illustration & NFT',
      'Charcoal & Shading Art',
      'Mixed Media Contemporary Art',
      'Nature & Landscape Scenery',
      'Abstract Geometric Art'
    ]
  },
  {
    id: 'craft-handmade',
    group_name: 'Craft & Handmade Design',
    icon_name: 'Gift',
    color: 'from-cyan-500 to-blue-600',
    subcategories: [
      'Handmade Jewelry Art',
      'Paper & Origami Sculpting',
      'Eco-Friendly Upcycled Decor',
      'Pottery & Ceramic Works',
      'Miniature & Resin Art',
      'Embroidered Textile Craft'
    ]
  },
  {
    id: 'instrumental',
    group_name: 'Instrumental Music',
    icon_name: 'Music',
    color: 'from-yellow-500 to-amber-600',
    subcategories: [
      'Flute & Wind Instruments',
      'Drums & Percussion Beats',
      'Guitar & Acoustic String',
      'Piano, Synth & Keyboard',
      'Violin & Cello Classical',
      'Tabla & Folk Instruments',
      'Sitar & Traditional Strings'
    ]
  },
  {
    id: 'comedy-mimicry',
    group_name: 'Comedy, Magic & Special Talents',
    icon_name: 'Smile',
    color: 'from-orange-400 to-amber-500',
    subcategories: [
      'Solo Stand-Up Comedy',
      'Celebrity Voice Mimicry',
      'Stage Illusion & Card Magic',
      'Beatboxing & Vocal Effects',
      'Speed Art & Record Act',
      'Hatha Yoga Traditional Asanas',
      'Pranayama & Yogic Balance',
      'Fitness Body Transformation'
    ]
  }
];

export const INITIAL_USERS: ParticipantUser[] = [
  {
    id: 'usr_001',
    registration_number: 'GMTS260918001',
    full_name: 'Pooja Varma',
    email: 'pooja.fashion@gmail.com',
    mobile_number: '9157697394',
    dob: '2001-05-14',
    age: 25,
    age_group: 'Young Adult (18-35)',
    gender: 'Female',
    address: '24-1st Floor, Sharda Shopping Center, Rabari Colony',
    city: 'Ahmedabad',
    state: 'Gujarat',
    country: 'India',
    pin_code: '380026',
    category: 'Modeling & Catwalk Runway',
    subcategory: 'Catwalk Professional',
    youtube_video_link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    video_title: 'Pooja Varma - Ahmedabad Fashion Runway Audition',
    video_description: 'High-fashion editorial walk presenting modern ethnic couture.',
    video_status: 'approved',
    registration_fee_paid: 600,
    current_round: 2,
    sponsor_id: 'GMTS260918000',
    placement_side: 'L',
    purchase_code: 'GMTS6C63A3',
    role: 'distributor',
    rank: 'Gold',
    self_purchase_pv: 500,
    left_pv: 2850,
    right_pv: 2100,
    carry_left_pv: 750,
    carry_right_pv: 0,
    total_earned: 1890,
    wallet_balance: 1450,
    kyc_status: 'approved',
    pancard_status: 'Verified',
    cheque_status: 'Verified',
    direct_referrals_count: 148,
    votes_count: 420,
    join_date: '15 January',
    profile_image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    is_active: true
  },
  {
    id: 'usr_admin',
    registration_number: 'GMTS-ADMIN-01',
    full_name: 'GMTS Director (Admin)',
    email: 'admin@gmts.com',
    mobile_number: '9157697394',
    dob: '1982-08-20',
    age: 44,
    age_group: 'Adult (36-60)',
    gender: 'Male',
    address: 'Sharda Shopping Center, Ahmedabad',
    city: 'Ahmedabad',
    state: 'Gujarat',
    country: 'India',
    pin_code: '380026',
    category: 'Director',
    subcategory: 'Master Management',
    youtube_video_link: '',
    video_title: 'Official GMTS Admin Account',
    video_description: 'System master administrator.',
    video_status: 'approved',
    registration_fee_paid: 0,
    current_round: 5,
    sponsor_id: 'COMPANY_ROOT',
    placement_side: 'L',
    purchase_code: 'GMTS-ADMIN',
    role: 'admin',
    rank: 'Diamond',
    self_purchase_pv: 1000,
    left_pv: 148200,
    right_pv: 112500,
    carry_left_pv: 35700,
    carry_right_pv: 0,
    total_earned: 101250,
    wallet_balance: 85200,
    kyc_status: 'approved',
    pancard_status: 'Verified',
    cheque_status: 'Verified',
    direct_referrals_count: 520,
    votes_count: 11250,
    join_date: '01 January',
    profile_image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    is_active: true
  }
];

export const INITIAL_VIDEOS: VideoItem[] = [
  {
    id: 'vid_01',
    user_id: 'usr_001',
    user_name: 'Pooja Varma',
    registration_number: 'GMTS260918001',
    category: 'Modeling & Catwalk Runway',
    subcategory: 'Catwalk Professional',
    youtube_video_link: 'https://www.youtube.com/watch?v=kYJzZgQ6W4M',
    youtube_embed_id: 'kYJzZgQ6W4M',
    video_title: 'Pooja Varma - Ahmedabad Runway Solo Walk',
    video_description: 'Official Audition Round 1 solo rampwalk presentation for GMTS.',
    thumbnail_url: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
    votes_count: 420,
    status: 'approved',
    submitted_at: 'Feb 10',
    country: 'India',
    city: 'Ahmedabad',
    is_trending: true
  },
  {
    id: 'vid_02',
    user_id: 'usr_002',
    user_name: 'Rajesh Desai',
    registration_number: 'GMTS260918002',
    category: 'Dancing & Choreography',
    subcategory: 'Contemporary & Freestyle',
    youtube_video_link: 'https://www.youtube.com/watch?v=2vjPBrBU-TM',
    youtube_embed_id: '2vjPBrBU-TM',
    video_title: 'Rajesh Desai - Contemporary Sufi Fusion Dance',
    video_description: 'Expressive movement piece showcasing emotional strength and balance.',
    thumbnail_url: 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=800&q=80',
    votes_count: 385,
    status: 'approved',
    submitted_at: 'Feb 12',
    country: 'India',
    city: 'Surat',
    is_trending: true
  },
  {
    id: 'vid_03',
    user_id: 'usr_003',
    user_name: 'Neha Sharma',
    registration_number: 'GMTS260918003',
    category: 'Singing & Vocals',
    subcategory: 'Folk & Cultural Songs',
    youtube_video_link: 'https://www.youtube.com/watch?v=fJ9rUzIMcZQ',
    youtube_embed_id: 'fJ9rUzIMcZQ',
    video_title: 'Neha Sharma - Semi-Classical Raag & Folk Melody',
    video_description: 'Live acoustic vocals performance representing Gujarat cultural heritage.',
    thumbnail_url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80',
    votes_count: 340,
    status: 'approved',
    submitted_at: 'Feb 14',
    country: 'India',
    city: 'Vadodara',
    is_trending: false
  },
  {
    id: 'vid_04',
    user_id: 'usr_004',
    user_name: 'Kabir Mehta',
    registration_number: 'GMTS260918004',
    category: 'Acting & Drama',
    subcategory: 'Monologue & Short Scene',
    youtube_video_link: 'https://www.youtube.com/watch?v=ZbZSe6N_BXs',
    youtube_embed_id: 'ZbZSe6N_BXs',
    video_title: 'Kabir Mehta - Intense Dramatic Monologue',
    video_description: 'A theatrical soliloquy about passion and perseverance under spotlight.',
    thumbnail_url: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=800&q=80',
    votes_count: 295,
    status: 'approved',
    submitted_at: 'Feb 15',
    country: 'India',
    city: 'Mumbai',
    is_trending: false
  },
  {
    id: 'vid_05',
    user_id: 'usr_005',
    user_name: 'Ananya Patel',
    registration_number: 'GMTS260918005',
    category: 'Fashion Designing & Styling',
    subcategory: 'Sustainable & Eco Fashion',
    youtube_video_link: 'https://www.youtube.com/watch?v=uelHwf8o7_U',
    youtube_embed_id: 'uelHwf8o7_U',
    video_title: 'Ananya Patel - Khadi Modern Fashion Runway Collection',
    video_description: 'Eco-conscious garment innovation utilizing sustainable textile craft.',
    thumbnail_url: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=800&q=80',
    votes_count: 275,
    status: 'approved',
    submitted_at: 'Feb 18',
    country: 'India',
    city: 'Rajkot',
    is_trending: false
  },
  {
    id: 'vid_06',
    user_id: 'usr_006',
    user_name: 'David Wilson',
    registration_number: 'GMTS260918006',
    category: 'Comedy, Magic & Special Talents',
    subcategory: 'Stage Illusion & Card Magic',
    youtube_video_link: 'https://www.youtube.com/watch?v=09R8_2nJtjg',
    youtube_embed_id: '09R8_2nJtjg',
    video_title: 'David Wilson - Close-Up Sleight of Hand Illusion',
    video_description: 'International competitor magic routine from London UK audition.',
    thumbnail_url: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=80',
    votes_count: 260,
    status: 'approved',
    submitted_at: 'Feb 20',
    country: 'United Kingdom',
    city: 'London',
    is_trending: false
  }
];

export const DEMO_BINARY_TREE: BinaryTreeNode = {
  id: 'node_root',
  user_id: 'usr_001',
  registration_number: 'GMTS260918001',
  name: 'Pooja Varma',
  rank: 'Gold',
  left_pv: 2850,
  right_pv: 2100,
  left_count: 85,
  right_count: 63,
  status: 'Active',
  left_child: {
    id: 'node_l1',
    user_id: 'usr_002',
    registration_number: 'GMTS260918002',
    name: 'Rajesh Desai',
    rank: 'Silver',
    side: 'L',
    left_pv: 1400,
    right_pv: 950,
    left_count: 42,
    right_count: 28,
    status: 'Active',
    left_child: {
      id: 'node_l2_1',
      user_id: 'usr_004',
      registration_number: 'GMTS260918004',
      name: 'Kabir Mehta',
      rank: 'Silver',
      side: 'L',
      left_pv: 500,
      right_pv: 400,
      left_count: 14,
      right_count: 11,
      status: 'Active'
    },
    right_child: {
      id: 'node_l2_2',
      user_id: 'usr_007',
      registration_number: 'GMTS260918007',
      name: 'Rohan Joshi',
      rank: 'Silver',
      side: 'R',
      left_pv: 250,
      right_pv: 250,
      left_count: 6,
      right_count: 6,
      status: 'Active'
    }
  },
  right_child: {
    id: 'node_r1',
    user_id: 'usr_003',
    registration_number: 'GMTS260918003',
    name: 'Neha Sharma',
    rank: 'Silver',
    side: 'R',
    left_pv: 1100,
    right_pv: 800,
    left_count: 34,
    right_count: 22,
    status: 'Active',
    left_child: {
      id: 'node_r2_1',
      user_id: 'usr_005',
      registration_number: 'GMTS260918005',
      name: 'Ananya Patel',
      rank: 'Silver',
      side: 'L',
      left_pv: 400,
      right_pv: 300,
      left_count: 10,
      right_count: 8,
      status: 'Active'
    },
    right_child: {
      id: 'node_r2_2',
      user_id: 'usr_006',
      registration_number: 'GMTS260918006',
      name: 'David Wilson',
      rank: 'Silver',
      side: 'R',
      left_pv: 300,
      right_pv: 200,
      left_count: 7,
      right_count: 5,
      status: 'Active'
    }
  }
};

export const INITIAL_TRANSACTIONS: TransactionRecord[] = [
  {
    id: 'tx_101',
    user_id: 'usr_001',
    type: 'matching',
    amount: 450,
    pv: 500,
    description: 'Daily Business Matching (500 Matched PV × ₹0.90)',
    date: '01 March',
    status: 'completed',
    reference_id: 'BMI-MATCH-0301'
  },
  {
    id: 'tx_102',
    user_id: 'usr_001',
    type: 'generation',
    amount: 202.50,
    pv: 225,
    description: 'Level 1 Generation Incentive from direct joining GMTS260918002',
    date: '03 March',
    status: 'completed',
    reference_id: 'GEN-LVL1-002'
  },
  {
    id: 'tx_103',
    user_id: 'usr_001',
    type: 'matching',
    amount: 900,
    pv: 1000,
    description: 'Daily Business Matching (1000 Matched PV × ₹0.90)',
    date: '05 March',
    status: 'completed',
    reference_id: 'BMI-MATCH-0305'
  },
  {
    id: 'tx_104',
    user_id: 'usr_001',
    type: 'retail',
    amount: 337.50,
    pv: 0,
    description: 'PECC Herbal Shampoo retail profit distribution',
    date: '08 March',
    status: 'completed',
    reference_id: 'RET-PRO-881'
  }
];

export const INITIAL_CERTIFICATES: CertificateRecord[] = [
  {
    id: 'cert_reg_001',
    user_id: 'usr_001',
    participant_name: 'Pooja Varma',
    registration_number: 'GMTS260918001',
    category: 'Modeling & Catwalk Runway',
    certificate_type: 'Registration Certificate',
    round_number: 1,
    issue_date: '15 January',
    unique_certificate_number: 'GMTS-CERT-REG-001',
    qr_token: 'VERIFY_GMTS_260918001_REG',
    signatory: 'Dr. V. K. Desai, Director VIFTRI & GMTS'
  },
  {
    id: 'cert_r1_001',
    user_id: 'usr_001',
    participant_name: 'Pooja Varma',
    registration_number: 'GMTS260918001',
    category: 'Modeling & Catwalk Runway',
    certificate_type: 'Round 1 Audition Completion',
    round_number: 1,
    issue_date: '25 February',
    unique_certificate_number: 'GMTS-CERT-R1-042',
    qr_token: 'VERIFY_GMTS_260918001_R1',
    signatory: 'Dr. V. K. Desai, Director VIFTRI & GMTS'
  }
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Pooja Varma',
    city: 'Ahmedabad, Gujarat',
    role: 'Fashion Model & Round 2 Finalist',
    quote: 'GMTS gave me the opportunity to perform on a verified international runway platform. The transparent voting system and round-wise certificates helped me sign professional modeling contracts in Mumbai!',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 2,
    name: 'Rajesh Desai',
    city: 'Surat, Gujarat',
    role: 'Contemporary Dancer & MLM Achiever',
    quote: 'The dual combination of talent competition and MLM binary compensation is revolutionary. I cleared Round 1 with 148 direct referrals, earned ₹18,000+ in matching bonuses, and qualified for Round 2!',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 3,
    name: 'Neha Sharma',
    city: 'Vadodara, Gujarat',
    role: 'Classical Singer',
    quote: 'Being able to upload my YouTube audition and watch votes increase in real time with SMS and email alerts made me feel like I was on national television. The ID card and QR verification look so prestigious.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 4,
    name: 'Aarav Gupta',
    city: 'Mumbai, Maharashtra',
    role: 'Teen Rampwalk Participant',
    quote: 'My parents were thrilled with the non-intrusive, secure platform. The age group separation (Teens 13-17) gave me fair competition. Truly an international standard fashion show.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80'
  }
];

export const GMTS_COMPANY_INFO = {
  name: 'Global Multitalent Show (GMTS)',
  academicPartner: 'Vedansh Institute Of Fashion Technology and Research Institute (VIFTRI)',
  fmcgPartner: 'PECC – Marketing & Product Direct Selling',
  address: '24-1st Floor, Sharda Shopping Center, Rabari Colony Cross Rd, opp. Rabari Colony, BRTS, Ahmedabad, Gujarat, India - 380026',
  helpline: '+91 9157697394',
  email: 'support@gmts.viftri.com',
  registrationNo: 'GJ-01-0123286',
  legalNotice: 'All competition entry fees across Round 1 (₹600), Round 2 (₹600), Round 3 (₹600), Semi-Final (₹2,000), and Grand Final (₹5,000) are strictly non-refundable. All legal disputes are subject exclusively to Ahmedabad court jurisdiction, Gujarat, India.',
  socialLinks: {
    justdial: 'https://jsdl.in/DT-11I2A6AUYQQ',
    facebook: 'https://www.facebook.com/VIFTRI/',
    youtube: 'https://www.youtube.com/channel/UCUzDumc7i_H8BFXwISvHzvg',
    pecc: 'https://pecc.viftri.com/'
  }
};

export const INITIAL_ROUND_SUBMISSIONS: RoundSubmission[] = [
  {
    id: 'sub_r1_001',
    user_id: 'usr_001',
    registration_number: 'GMTS260918001',
    participant_name: 'Pooja Varma',
    round_number: 1,
    round_name: 'Round 1: Digital Audition',
    fee_amount: 600,
    payment_status: 'paid',
    razorpay_payment_id: 'pay_live_LwK720938101',
    razorpay_order_id: 'order_gmts_1710001001_R1',
    youtube_video_link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    video_title: 'Catwalk Runway & Contemporary Walk - Pooja Varma',
    video_description: 'High-fashion western couture walk filmed in Ahmedabad studio.',
    duration: '02:30 min',
    submission_date: '15 Jan 2026',
    approval_status: 'approved',
    admin_remarks: 'Superb posture, confidence, and styling. Qualified for Round 2 State Level.',
    approved_at: '20 Jan 2026'
  },
  {
    id: 'sub_r2_001',
    user_id: 'usr_001',
    registration_number: 'GMTS260918001',
    participant_name: 'Pooja Varma',
    round_number: 2,
    round_name: 'Round 2: State Level Championship',
    fee_amount: 600,
    payment_status: 'paid',
    razorpay_payment_id: 'pay_live_LwK829471928',
    razorpay_order_id: 'order_gmts_1710002002_R2',
    youtube_video_link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    video_title: 'Gujarat State Runway Showcase - Pooja Varma',
    video_description: 'State championship runway presentation with ethnic fusion designer wear.',
    duration: '03:10 min',
    submission_date: '10 Feb 2026',
    approval_status: 'pending',
    admin_remarks: 'Awaiting jury review'
  },
  {
    id: 'sub_r1_002',
    user_id: 'usr_002',
    registration_number: 'GMTS260918002',
    participant_name: 'Rahul Sharma',
    round_number: 1,
    round_name: 'Round 1: Digital Audition',
    fee_amount: 600,
    payment_status: 'paid',
    razorpay_payment_id: 'pay_live_MxN928371625',
    razorpay_order_id: 'order_gmts_1710003003_R1',
    youtube_video_link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    video_title: 'Hip Hop Urban Dance - Rahul Sharma',
    video_description: 'Fast beat synchronization and locking-popping solo piece.',
    duration: '02:45 min',
    submission_date: '02 Feb 2026',
    approval_status: 'pending',
    admin_remarks: 'Pending jury review'
  }
];

export const INITIAL_INVOICES: InvoiceRecord[] = [
  {
    invoice_number: 'GMTS-INV-2026-00101',
    order_id: 'order_gmts_1710001001_R1',
    payment_id: 'pay_live_LwK720938101',
    user_id: 'usr_001',
    registration_number: 'GMTS260918001',
    participant_name: 'Pooja Varma',
    email: 'pooja.varma@example.com',
    mobile: '9876543210',
    round_number: 1,
    round_name: 'Round 1: Digital Audition',
    amount: 600,
    payment_method: 'UPI / Razorpay Live',
    date: '15 Jan 2026',
    status: 'SUCCESS',
    support_phone: '+91 91576 97394',
    support_email: 'mssc.trust2019@gmail.com'
  },
  {
    invoice_number: 'GMTS-INV-2026-00204',
    order_id: 'order_gmts_1710002002_R2',
    payment_id: 'pay_live_LwK829471928',
    user_id: 'usr_001',
    registration_number: 'GMTS260918001',
    participant_name: 'Pooja Varma',
    email: 'pooja.varma@example.com',
    mobile: '9876543210',
    round_number: 2,
    round_name: 'Round 2: State Level Championship',
    amount: 600,
    payment_method: 'Credit Card / Razorpay Live',
    date: '10 Feb 2026',
    status: 'SUCCESS',
    support_phone: '+91 91576 97394',
    support_email: 'mssc.trust2019@gmail.com'
  }
];

