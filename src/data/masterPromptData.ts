export const MASTER_PROMPT_CONTENT = `start Prompt:

You are a Principal WordPress Core & Enterprise Plugin Architect specializing in Multi-Level Marketing (MLM) binary compensation engines, WooCommerce e-commerce hooks, Razorpay financial gateways, and high-concurrency contest management systems.

Your objective is to generate the complete, 100% production-ready, clean, secure, and fully operational PHP, MySQL, HTML5, CSS3, and JavaScript codebase for the enterprise WordPress plugin named:

"Global Multitalent Show (GMTS) - MLM Binary & WooCommerce Pro"
(Text Domain: gmts-mlm, Plugin URI: https://globalmultitalentshowgmts.viftri.com/, License: GPLv2)

================================================================================
CRITICAL OPERATIONAL RULES & ZERO-OMISSION INSTRUCTIONS:
================================================================================
1. GENERATE COMPLETE IMPLEMENTATIONS ONLY. Absolutely no placeholders, no "/* implement logic here */", no truncated ellipses, and no missing method stubs. Every single function, hook callback, database table schema, template view, CSS style rule, JavaScript event listener, and shortcode handler must be fully written and directly functional.
2. ONE-CLICK ZERO-CONFIGURATION DEPLOYMENT. Upon standard WordPress plugin activation, the plugin must immediately:
   a. Create and verify all 12 custom database tables with optimized B-tree compound indexes using dbDelta().
   b. Automatically create all 12 public and member pages in WordPress (/gmts-registration, /gmts-login, /gmts-dashboard, /gmts-team-tree, /gmts-voting, /gmts-leaderboard, /gmts-wallet, /gmts-certificates, /gmts-terms, /gmts-privacy, /gmts-refund, /gmts-admin-panel) and inject their respective shortcodes without overwriting existing custom pages.
   c. Seed default system settings, Razorpay test/live hooks, PV conversion rates (1 PV = ₹0.90), 20-level generation incentive rates, daily capping thresholds, and official GMTS transactional email templates.
   d. Register custom user roles ("gmts_distributor", "gmts_participant") with granular capabilities, schedule WP-Cron automation tasks (daily matching, weekly payout settlement, monthly royalty pool calculation, round evaluation), and configure REST API routes.
3. 100% MOBILE-FIRST RESPONSIVE & PRODUCTION SEO READY:
   a. The frontend UI must be designed for mobile, tablet, laptop, and desktop (320px to 4K), compatible with Astra Theme standards utilizing a refined pink, blush, white, and dark charcoal palette with rounded-xl cards and subtle elevation shadows.
   b. Every page must output semantic HTML5 with Schema.org (Event, Organization, BreadcrumbList) JSON-LD structured data, dynamic OpenGraph meta tags, canonical URL tags, and WCAG AA accessibility contrast.
4. STRICT ENTERPRISE SECURITY:
   a. Full nonce verification (wp_verify_nonce, check_ajax_referer) across all AJAX endpoints, REST API authentication, input sanitization (sanitize_text_field, sanitize_email, esc_url_raw), output escaping (esc_html, esc_attr, wp_kses_post), and parameter binding via $wpdb->prepare().
   b. Dual-layer Razorpay webhook verification with HMAC-SHA256 signature validation and strict database-level idempotency locks to eliminate duplicate credits or double registration processing under high concurrency.

================================================================================
SECTION 1: BUSINESS LOGIC, ENTITIES & COMPENSATION SPECIFICATIONS
================================================================================

1. BRAND & ORGANIZATIONAL IDENTIFIERS:
   - Primary Entity: Global Multitalent Show – GMTS
   - Academic Partner: Vedansh Institute Of Fashion Technology and Research Institute – VIFTRI (Ahmedabad, Gujarat)
   - Product Line & Direct Selling: PECC (Herbal & FMCG Personal Care Products)
   - Official Address: 24-1st Floor, Sharda Shopping Center, Rabari Colony Cross Rd, opp. Rabari Colony, BRTS, Ahmedabad, Gujarat, India - 380026
   - Official Helpline / WhatsApp: +91 9157697394
   - Government Registration Number: GJ-01-0123286

2. COMPETITION CONTEST TIERS & 5-ROUND PROGRESSION:
   - Round 1 (Audition 1): Entry Fee ₹600 (or ₹750 configurable). Requirement: 100 direct referrals + 250 verified votes. Auto-unlocks Round 2 upon qualification.
   - Round 2 (Audition 2): Fee ₹600. Requirement: 100 direct referrals + 250 verified votes. Auto-unlocks Round 3.
   - Round 3 (Audition 3): Fee ₹600. Requirement: 100 direct referrals + 250 verified votes. Auto-unlocks Semi-Final.
   - Round 4 (Semi-Final): Fee ₹2,000 (non-refundable). Requirement: 100 direct referrals + 250 verified votes. Auto-unlocks Grand Final.
   - Round 5 (Grand Final): Fee ₹5,000. Requirement: 100 direct referrals + 250 verified votes. Qualifies the participant for the Grand Prize of ₹1,00,000 (One Lakh INR) cash award subject to admin KYC validation!
   - Progressive Milestone Expansion Beyond Round 5:
     * Round 6: 1,000 referrals + 2,200 votes = ₹2,00,000 Reward
     * Round 7: 2,000 referrals + 4,400 votes = ₹4,00,000 Reward
     * Round 8: 4,000 referrals + 8,800 votes = ₹8,00,000 Reward
     * Round 9: 8,000 referrals + 17,600 votes = ₹16,00,000 Reward
   - Carry-Forward Engine: All surplus referrals, surplus votes, and accumulated PV exceeding current round thresholds automatically carry forward to subsequent rounds. Zero expiration, zero time-limit open-ended progression.

3. 3 UNIQUE SHARING LINKS PER DISTRIBUTOR:
   - Voting Link: https://globalmultitalentshowgmts.viftri.com/vote/{GMTS_REG_NUMBER}
   - Left MLM Referral Link: https://globalmultitalentshowgmts.viftri.com/join/{GMTS_REG_NUMBER}/L
   - Right MLM Referral Link: https://globalmultitalentshowgmts.viftri.com/join/{GMTS_REG_NUMBER}/R

4. REGISTRATION NUMBER GENERATOR:
   - Automated sequential format: "GMTS" + yy + mm + dd + 3-digit serial (e.g. GMTS260918001). Generated strictly after Razorpay payment verification inside a transactional SQL table lock to prevent duplicates under concurrent traffic.

5. BINARY NETWORK PLACEMENT ENGINE:
   - If prospect arrives via Left Link (/L): placed into the sponsor's Left subtree (outermost or first available left leaf).
   - If prospect arrives via Right Link (/R): placed into the sponsor's Right subtree.
   - If prospect signs up directly without referral: auto-placed into the company's weaker leg (the leg with fewer members/PV).

6. GMTS / PECC COMPENSATION PLAN CALCULATIONS:
   - Point Value Currency Base: 1 PV = ₹0.90 INR (configurable in Admin Settings).
   - (A) Business Matching Incentive (BMI):
     * Matches Left PV vs Right PV daily.
     * Commission = min(Left PV, Right PV) × ₹0.90.
     * Unmatched PV carries forward indefinitely to the stronger leg.
     * Daily Matching Capping based on Self-Purchase PV / Rank:
       - Silver (250 PV Self-Purchase): Daily Cap 1,000 PV (₹900/day max)
       - Gold (500 PV Self-Purchase): Daily Cap 2,000 PV (₹1,800/day max)
       - Platinum (750 PV Self-Purchase): Daily Cap 3,000 PV (₹2,700/day max)
       - Diamond (1,000 PV Self-Purchase): Daily Cap 4,000 PV (₹3,600/day max)
     * Payout Settlement: Computed daily at 23:59:59 IST, consolidated for weekly payout processing every Tuesday.
   - (B) Royalty Incentive:
     * Exclusively for Diamond Rank distributors who generate 11,000 PV across 11 distinct direct referral teams within the calendar month.
     * Royalty Pool = 3% of the company's total monthly PV turnover.
     * Distributed in equal shares among all qualified Diamond achievers on the 5th of every month.
   - (C) Team Performance Incentive (20-Level Generation Income):
     * Distributes 80% of generated product/joining PV across 20 upline sponsor levels:
       Level 1: 45.00%
       Level 2: 6.00%
       Level 3: 6.00%
       Level 4: 6.00%
       Level 5: 6.00%
       Level 6: 6.00%
       Levels 7 to 20: 1.42% each (14 levels × 1.42% = 19.88%)
       Total Distributed = 94.88% of eligible PV slab.
   - (D) Retail Profit Margin:
     * 10% to 20% margin differential between Maximum Retail Price (MRP) and Distributor Price (DP) on direct product sales.
   - (E) Special Milestone Puraskar:
     * When any distributor achieves 500 direct referrals and 1,100 verified votes, an automatic milestone bonus of ₹1,00,000 is credited to their pending reward ledger for admin KYC verification and bank disbursement.

7. 200+ TALENT COMPETITION CATEGORIES ACROSS 10 MAJOR GROUPS:
   - Group 1: Dancing (Classical, Bharatanatyam, Kathak, Odissi, Contemporary, Freestyle, Bollywood, Hip-Hop, Salsa, Tango, Ballet, Zumba, Folk, etc. - 30 subcategories)
   - Group 2: Singing (Pop, Rock, Indie, Classical, Semi-Classical, Folk, Western, Fusion, Rap, etc. - 25 subcategories)
   - Group 3: Modeling & Runway (Catwalk, Rampwalk, Designer Show Walk, Editorial, Portfolio, Commercial, Teens/Kids, etc. - 20 subcategories)
   - Group 4: Acting (Monologue, Short Scene, Digital Film, Theatre, Character & Expression, Mimicry - 15 subcategories)
   - Group 5: Art & Painting (Sketching, Oil Painting, Acrylic, Watercolor, Digital Illustration, Charcoal, Canvas, Modern - 25 subcategories)
   - Group 6: Craft & Design (Paper Craft, Handmade Jewelry, Home Decor, Eco-Friendly Craft, Miniature - 15 subcategories)
   - Group 7: Fashion Designing (Apparel Design, Footwear & Accessories, Sustainable Fashion, Fabric Innovation - 20 subcategories)
   - Group 8: Instrumental & Music (Flute, Drums, Percussion, Guitar, Piano, Keyboard, Folk Instruments, Band - 15 subcategories)
   - Group 9: Comedy & Stand-Up (Solo Comedy, Skit, Improv, Stand-Up Special, Character Comedy - 10 subcategories)
   - Group 10: Yoga, Fitness & Special Talent (Traditional Asanas, Pranayama, Meditation, Strength & Mobility, Magic & Illusion, Beatboxing, Speed Art - 30 subcategories)

================================================================================
SECTION 2: COMPLETE FOLDER & FILE ARCHITECTURE
================================================================================

The output must provide the complete code for the following file hierarchy:

gmts-mlm-binary-pro/
├── gmts-mlm-binary-pro.php               (Main plugin bootstrap, hooks, autoloader, constants)
├── readme.txt                            (Plugin documentation, WordPress.org standards)
├── uninstall.php                         (Safe database cleanup routines)
├── includes/
│   ├── class-gmts-activator.php          (DB migration, page generation, default options, roles)
│   ├── class-gmts-deactivator.php        (Cron unregistration, transient clearing)
│   ├── class-gmts-db.php                 (Custom table definitions, schema upgrades, $wpdb helpers)
│   ├── class-gmts-auth.php               (User registration, login, session guards, OTP handlers)
│   ├── class-gmts-mlm-engine.php         (Binary placement, tree traversal, PV matching, caps)
│   ├── class-gmts-commission.php         (BMI, 20-level generation, royalty pool, milestone award)
│   ├── class-gmts-woocommerce.php        (Product PV/DP/MRP meta boxes, order completion hooks, refunds)
│   ├── class-gmts-razorpay.php           (Order API, checkout integration, HMAC webhook validation)
│   ├── class-gmts-voting.php             (Vote verification, 1-vote-per-IP/24h, email OTP, bot shield)
│   ├── class-gmts-certificates.php       (HTML/PDF certificate & ID card generator with dynamic QR)
│   ├── class-gmts-wallet.php             (Immutable double-entry ledger, withdrawal requests, payouts)
│   ├── class-gmts-cron.php               (Daily midnight matching, weekly Tuesday payouts, monthly royalty)
│   ├── class-gmts-shortcodes.php         (All frontend shortcodes registration and rendering)
│   └── class-gmts-admin.php              (Admin menus, settings screens, user manager, video queue)
├── templates/
│   ├── frontend/
│   │   ├── registration-form.php         (Multi-step responsive registration form with sponsor auto-fill)
│   │   ├── login-form.php                (Branded login with OTP / password reset)
│   │   ├── dashboard.php                 (Complete YashBiz-style distributor dashboard)
│   │   ├── binary-tree.php               (Interactive SVG / Canvas genealogy tree viewer with zoom/pan)
│   │   ├── video-gallery.php             (YouTube-style contestant video gallery with live vote buttons)
│   │   ├── leaderboard.php               (Real-time ranked contestant leaderboard)
│   │   ├── wallet.php                    (Transaction history, ledger breakdown, withdrawal form)
│   │   └── certificate-view.php          (Printable ID Card & completion certificate with QR)
│   └── admin/
│       ├── dashboard-overview.php        (Admin KPI cards, system health, revenue graphs)
│       ├── user-management.php           (User list, KYC approvals, sponsor reassignment, manual override)
│       ├── video-moderation.php          (Pending video queue with preview player, approve/reject tools)
│       ├── payout-settlement.php         (Pending withdrawal requests, bulk Razorpay bank transfers)
│       ├── mlm-tree-view.php             (Admin hierarchical tree explorer with search)
│       └── settings-page.php             (Compensation rates, Razorpay keys, email SMTP, capping limits)
├── assets/
│   ├── css/
│   │   ├── gmts-frontend.css             (Astra pink/white theme card styling, responsive grid)
│   │   └── gmts-admin.css                (WordPress admin styling, KPI badges, tree node styles)
│   └── js/
│       ├── gmts-frontend.js              (Live voting, AJAX registration, share link copy, toast alerts)
│       ├── gmts-binary-tree.js           (Interactive collapsible genealogy tree visualization)
│       └── gmts-admin.js                 (Bulk selection, live approval modals, chart rendering)
└── languages/
    └── gmts-mlm.pot                      (i18n translation template)

================================================================================
SECTION 3: DATABASE SCHEMA SPECIFICATIONS (AUTO-MIGRATED)
================================================================================

The activation routine must invoke dbDelta() to construct:
1. wp_gmts_users:
   id BIGINT AUTO_INCREMENT PRIMARY KEY, user_id BIGINT UNIQUE, registration_number VARCHAR(30) UNIQUE,
   full_name VARCHAR(150), email VARCHAR(100) UNIQUE, mobile_number VARCHAR(20), dob DATE, age INT,
   gender VARCHAR(15), category VARCHAR(100), subcategory VARCHAR(100), youtube_video_link TEXT,
   video_status ENUM('pending','approved','rejected') DEFAULT 'pending', sponsor_id BIGINT, parent_id BIGINT,
   placement_side ENUM('L','R'), rank ENUM('Starter','Silver','Gold','Platinum','Diamond') DEFAULT 'Silver',
   self_purchase_pv DECIMAL(12,2) DEFAULT 0, left_pv DECIMAL(14,2) DEFAULT 0, right_pv DECIMAL(14,2) DEFAULT 0,
   carry_left_pv DECIMAL(14,2) DEFAULT 0, carry_right_pv DECIMAL(14,2) DEFAULT 0, total_earned DECIMAL(14,2) DEFAULT 0,
   current_round INT DEFAULT 1, is_active TINYINT(1) DEFAULT 1, kyc_status ENUM('not_submitted','pending','approved','rejected') DEFAULT 'not_submitted',
   created_at DATETIME DEFAULT CURRENT_TIMESTAMP, INDEX idx_sponsor (sponsor_id), INDEX idx_parent (parent_id), INDEX idx_reg_no (registration_number)
2. wp_gmts_binary_tree:
   id BIGINT AUTO_INCREMENT PRIMARY KEY, user_id BIGINT UNIQUE, parent_id BIGINT, left_child_id BIGINT NULL,
   right_child_id BIGINT NULL, depth INT DEFAULT 0, lineage TEXT, updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
3. wp_gmts_pv_log:
   id BIGINT AUTO_INCREMENT PRIMARY KEY, user_id BIGINT, order_id BIGINT NULL, source_user_id BIGINT,
   pv_amount DECIMAL(12,2), side ENUM('L','R'), log_type ENUM('product_sale','registration','adjustment','refund'),
   created_at DATETIME DEFAULT CURRENT_TIMESTAMP, INDEX idx_user_side (user_id, side)
4. wp_gmts_commissions:
   id BIGINT AUTO_INCREMENT PRIMARY KEY, user_id BIGINT, commission_type ENUM('matching','level','royalty','retail','milestone_award'),
   amount DECIMAL(14,2), matched_pv DECIMAL(12,2) DEFAULT 0, level_depth INT DEFAULT 0, trigger_id BIGINT NULL,
   status ENUM('pending','approved','paid','reversed') DEFAULT 'pending', calculation_date DATE, payout_date DATE NULL,
   created_at DATETIME DEFAULT CURRENT_TIMESTAMP, INDEX idx_user_date (user_id, calculation_date)
5. wp_gmts_wallet_ledger:
   id BIGINT AUTO_INCREMENT PRIMARY KEY, user_id BIGINT, transaction_type ENUM('credit','debit'),
   amount DECIMAL(14,2), balance_after DECIMAL(14,2), reference_type VARCHAR(50), reference_id VARCHAR(100),
   remarks TEXT, created_at DATETIME DEFAULT CURRENT_TIMESTAMP, INDEX idx_user_ledger (user_id)
6. wp_gmts_withdrawals:
   id BIGINT AUTO_INCREMENT PRIMARY KEY, user_id BIGINT, amount DECIMAL(14,2), payment_method VARCHAR(50),
   account_details JSON, razorpay_payout_id VARCHAR(100) NULL, status ENUM('pending','approved','processing','paid','rejected') DEFAULT 'pending',
   admin_notes TEXT, request_date DATETIME DEFAULT CURRENT_TIMESTAMP, processed_date DATETIME NULL
7. wp_gmts_votes:
   id BIGINT AUTO_INCREMENT PRIMARY KEY, participant_user_id BIGINT, voter_email VARCHAR(100),
   voter_ip VARCHAR(50), device_fingerprint VARCHAR(128), round_number INT, otp_code VARCHAR(10),
   is_verified TINYINT(1) DEFAULT 0, created_at DATETIME DEFAULT CURRENT_TIMESTAMP, INDEX idx_participant_ip (participant_user_id, voter_ip)
8. wp_gmts_rounds_progress:
   id BIGINT AUTO_INCREMENT PRIMARY KEY, user_id BIGINT, round_number INT, referrals_count INT DEFAULT 0,
   votes_count INT DEFAULT 0, status ENUM('in_progress','qualified','locked') DEFAULT 'in_progress',
   fee_paid DECIMAL(10,2) DEFAULT 0, qualified_at DATETIME NULL
9. wp_gmts_certificates:
   id BIGINT AUTO_INCREMENT PRIMARY KEY, user_id BIGINT, certificate_number VARCHAR(100) UNIQUE,
   certificate_type ENUM('registration_id_card','round_completion','semi_final','winner'),
   round_number INT, qr_token VARCHAR(128), pdf_url TEXT, issued_date DATETIME DEFAULT CURRENT_TIMESTAMP
10. wp_gmts_kyc:
    id BIGINT AUTO_INCREMENT PRIMARY KEY, user_id BIGINT UNIQUE, aadhar_number VARCHAR(20), pan_number VARCHAR(20),
    aadhar_front_url TEXT, aadhar_back_url TEXT, pan_card_url TEXT, bank_name VARCHAR(100), account_number VARCHAR(50),
    ifsc_code VARCHAR(30), status ENUM('pending','approved','rejected') DEFAULT 'pending', rejection_reason TEXT, reviewed_at DATETIME NULL
11. wp_gmts_payments:
    id BIGINT AUTO_INCREMENT PRIMARY KEY, user_id BIGINT, round_number INT, razorpay_order_id VARCHAR(100),
    razorpay_payment_id VARCHAR(100) UNIQUE, amount DECIMAL(10,2), currency VARCHAR(10) DEFAULT 'INR',
    status ENUM('created','success','failed') DEFAULT 'created', receipt_url TEXT, created_at DATETIME DEFAULT CURRENT_TIMESTAMP
12. wp_gmts_system_settings:
    setting_key VARCHAR(100) PRIMARY KEY, setting_value LONGTEXT

================================================================================
SECTION 4: ESSENTIAL SHORTCODES & ROUTING
================================================================================

The plugin must register and automatically configure:
1. [gmts_registration] -> Multi-step participant registration with category picker, sponsor ID auto-detection, and Razorpay checkout initiation.
2. [gmts_login] -> Dedicated participant & distributor login form with instant dashboard redirection.
3. [gmts_dashboard] -> Full distributor control suite displaying live cards (Own Referrals, Unit Status, KYC Badge, Left/Right PV, Matching Bonus, Generation Income, Royalty Progress, 3 Unique Sharing Links).
4. [gmts_binary_tree] -> Interactive SVG/Canvas MLM tree visualization with search, zoom, and live node data inspect popups.
5. [gmts_video_gallery] -> YouTube-style public performance gallery with category filters, live vote counts, and OTP voting modal.
6. [gmts_leaderboard] -> Real-time ranked contestant scoreboard with category and round filters.
7. [gmts_wallet] -> Distributor earning ledger, available balance, and withdrawal request submission.
8. [gmts_certificates] -> Digital ID card and round completion certificate download portal with public QR verification.
9. [gmts_terms], [gmts_privacy], [gmts_refund] -> Pre-populated legal compliance templates emphasizing non-refundable registration fees and Ahmedabad court legal jurisdiction.

================================================================================
SECTION 5: DELIVERABLE FORMAT & CODE GENERATION INSTRUCTIONS
================================================================================

Generate the complete WordPress plugin source code directly inside your response. Output each file in sequence using the clear header format:
// File: gmts-mlm-binary-pro/[path/to/file]
followed by the complete, production-ready code inside Markdown code blocks. Do not summarize, do not skip functions, and do not use incomplete code snippets.

Ensure all PHP files strictly follow WordPress Coding Standards (WPCS), validate all inputs, escape outputs, support full localization (__ and _e), include complete SQL migration routines, and ensure the plugin is completely self-contained and ready to zip, upload, activate, and run on WordPress 6.x+ with WooCommerce.

End of Prompt`;
