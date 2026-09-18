export type AgeGroup = 'Kids (5-12)' | 'Teens (13-17)' | 'Young Adult (18-35)' | 'Adult (36-60)' | 'Senior (61-85)';

export type RankType = 'Silver' | 'Gold' | 'Platinum' | 'Diamond';

export type VideoStatus = 'pending' | 'approved' | 'rejected';

export type KYCStatus = 'not_submitted' | 'pending' | 'approved' | 'rejected';

export interface ParticipantUser {
  id: string;
  registration_number: string; // e.g. GMTS260918001
  full_name: string;
  email: string;
  mobile_number: string;
  dob: string;
  age: number;
  age_group: AgeGroup;
  gender: 'Male' | 'Female' | 'Other';
  address: string;
  city: string;
  state: string;
  country: string;
  pin_code: string;
  category: string;
  subcategory: string;
  youtube_video_link: string;
  video_title: string;
  video_description: string;
  performance_duration?: string;
  video_status: VideoStatus;
  password?: string;
  registration_fee_paid: number;
  current_round: number; // 1 to 5
  sponsor_id: string; // e.g. GMTS260918000
  placement_side: 'L' | 'R';
  purchase_code: string;
  role: 'distributor' | 'admin';
  rank: RankType;
  self_purchase_pv: number;
  left_pv: number;
  right_pv: number;
  carry_left_pv: number;
  carry_right_pv: number;
  total_earned: number;
  wallet_balance: number;
  kyc_status: KYCStatus;
  pancard_status: 'Not Provided' | 'Pending' | 'Verified' | 'Rejected';
  cheque_status: 'Not Provided' | 'Pending' | 'Verified' | 'Rejected';
  direct_referrals_count: number;
  votes_count: number;
  join_date: string;
  profile_image?: string;
  is_active: boolean;
}

export interface VideoItem {
  id: string;
  user_id: string;
  user_name: string;
  registration_number: string;
  category: string;
  subcategory: string;
  youtube_video_link: string;
  youtube_embed_id: string;
  video_title: string;
  video_description: string;
  thumbnail_url: string;
  votes_count: number;
  status: VideoStatus;
  submitted_at: string;
  country: string;
  city: string;
  is_trending?: boolean;
}

export interface VoteRecord {
  id: string;
  video_id: string;
  user_id: string;
  voter_email: string;
  voter_ip: string;
  vote_date: string;
}

export interface BinaryTreeNode {
  id: string;
  user_id: string;
  registration_number: string;
  name: string;
  rank: RankType;
  side?: 'L' | 'R';
  left_pv: number;
  right_pv: number;
  left_count: number;
  right_count: number;
  status: 'Active' | 'Pending' | 'Inactive';
  left_child?: BinaryTreeNode;
  right_child?: BinaryTreeNode;
}

export interface TransactionRecord {
  id: string;
  user_id: string;
  type: 'matching' | 'generation' | 'royalty' | 'retail' | 'withdrawal' | 'milestone_award';
  amount: number;
  pv?: number;
  description: string;
  date: string;
  status: 'completed' | 'pending' | 'rejected';
  reference_id?: string;
}

export interface KYCData {
  user_id: string;
  aadhar_number: string;
  pan_number: string;
  bank_name: string;
  account_number: string;
  ifsc_code: string;
  status: KYCStatus;
  submitted_at: string;
  remarks?: string;
}

export interface CategoryGroup {
  id: string;
  group_name: string;
  icon_name: string;
  color: string;
  subcategories: string[];
}

export interface CertificateRecord {
  id: string;
  user_id: string;
  participant_name: string;
  registration_number: string;
  category: string;
  certificate_type: 'Registration Certificate' | 'Round 1 Audition Completion' | 'Round 2 Qualification' | 'Round 3 Excellence' | 'Semi-Finalist Certificate' | 'Grand Finalist Certificate' | 'Winner ₹1 Lakh Puraskar';
  round_number: number;
  issue_date: string;
  unique_certificate_number: string;
  qr_token: string;
  signatory: string;
}

export interface InquiryItem {
  id: string;
  name: string;
  email: string;
  mobile: string;
  category: string;
  city: string;
  message: string;
  created_at: string;
}

export interface RoundSubmission {
  id: string;
  user_id: string;
  registration_number: string;
  participant_name: string;
  round_number: 1 | 2 | 3 | 4 | 5;
  round_name: string;
  fee_amount: number;
  payment_status: 'paid' | 'pending' | 'failed';
  razorpay_payment_id: string;
  razorpay_order_id: string;
  youtube_video_link: string;
  video_title: string;
  video_description: string;
  duration: string;
  submission_date: string;
  approval_status: 'pending' | 'approved' | 'rejected';
  admin_remarks?: string;
  approved_at?: string;
}

export interface InvoiceRecord {
  invoice_number: string;
  order_id: string;
  payment_id: string;
  user_id: string;
  registration_number: string;
  participant_name: string;
  email: string;
  mobile: string;
  round_number: number;
  round_name: string;
  amount: number;
  payment_method: string;
  date: string;
  status: 'SUCCESS' | 'FAILED';
  support_phone: string;
  support_email: string;
}

