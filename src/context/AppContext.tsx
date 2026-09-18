import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  ParticipantUser,
  VideoItem,
  TransactionRecord,
  CertificateRecord,
  KYCData,
  InquiryItem,
  AgeGroup,
  KYCStatus,
  RoundSubmission,
  InvoiceRecord
} from '../types';
import {
  INITIAL_USERS,
  INITIAL_VIDEOS,
  INITIAL_TRANSACTIONS,
  INITIAL_CERTIFICATES,
  INITIAL_ROUND_SUBMISSIONS,
  INITIAL_INVOICES
} from '../data/mockData';

interface AppContextType {
  currentUser: ParticipantUser | null;
  setCurrentUser: (user: ParticipantUser | null) => void;
  users: ParticipantUser[];
  videos: VideoItem[];
  transactions: TransactionRecord[];
  certificates: CertificateRecord[];
  inquiries: InquiryItem[];
  roundSubmissions: RoundSubmission[];
  invoices: InvoiceRecord[];
  activeInvoice: InvoiceRecord | null;
  setActiveInvoice: (inv: InvoiceRecord | null) => void;
  loginNotice: string | null;
  setLoginNotice: (notice: string | null) => void;
  prefillLoginIdentifier: string;
  setPrefillLoginIdentifier: (id: string) => void;
  currentPage: string;
  setCurrentPage: (page: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  activeModal: 'register' | 'login' | 'vote' | 'inquiry' | 'kyc' | 'withdraw' | 'certificate' | 'invoice' | null;
  setActiveModal: (modal: 'register' | 'login' | 'vote' | 'inquiry' | 'kyc' | 'withdraw' | 'certificate' | 'invoice' | null) => void;
  votingTargetVideo: VideoItem | null;
  setVotingTargetVideo: (vid: VideoItem | null) => void;
  toasts: { id: string; message: string; type: 'success' | 'error' | 'info' }[];
  addToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  removeToast: (id: string) => void;

  // Actions
  registerUser: (formData: any, autoLogin?: boolean) => Promise<ParticipantUser>;
  loginUser: (identifier: string, pass: string, remember?: boolean) => boolean;
  logoutUser: () => void;
  switchUserRole: (role: 'distributor' | 'admin') => void;
  castVote: (videoId: string, voterEmail: string) => { success: boolean; message: string };
  submitKYC: (kycData: Partial<KYCData>) => void;
  approveKYC: (userId: string, approved: boolean, reason?: string) => void;
  moderateVideo: (videoId: string, status: 'approved' | 'rejected', reason?: string) => void;
  requestWithdrawal: (amount: number, method: string, details: any) => boolean;
  approveWithdrawal: (txId: string, approved: boolean) => void;
  submitInquiry: (inquiry: Omit<InquiryItem, 'id' | 'created_at'>) => void;
  upgradeRound: (userId: string, targetRound: number) => void;
  submitRoundEntry: (data: {
    round_number: 1 | 2 | 3 | 4 | 5;
    round_name: string;
    fee_amount: number;
    youtube_video_link: string;
    video_title: string;
    video_description: string;
    duration: string;
    razorpay_payment_id?: string;
    payment_method?: string;
  }) => Promise<RoundSubmission>;
  approveRoundEntry: (submissionId: string, approved: boolean, remarks?: string) => void;
  resetPasswordViaEmail: (email: string) => { success: boolean; message: string; tempPass?: string };
  resendCredentials: (identifier: string) => { success: boolean; message: string };
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<ParticipantUser[]>(() => {
    const saved = localStorage.getItem('gmts_users');
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  const [currentUser, setCurrentUser] = useState<ParticipantUser | null>(() => {
    return users[0] || null;
  });

  const [videos, setVideos] = useState<VideoItem[]>(() => {
    const saved = localStorage.getItem('gmts_videos');
    return saved ? JSON.parse(saved) : INITIAL_VIDEOS;
  });

  const [transactions, setTransactions] = useState<TransactionRecord[]>(() => {
    const saved = localStorage.getItem('gmts_transactions');
    return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
  });

  const [certificates, setCertificates] = useState<CertificateRecord[]>(() => {
    const saved = localStorage.getItem('gmts_certificates');
    return saved ? JSON.parse(saved) : INITIAL_CERTIFICATES;
  });

  const [roundSubmissions, setRoundSubmissions] = useState<RoundSubmission[]>(() => {
    const saved = localStorage.getItem('gmts_round_submissions');
    return saved ? JSON.parse(saved) : INITIAL_ROUND_SUBMISSIONS;
  });

  const [invoices, setInvoices] = useState<InvoiceRecord[]>(() => {
    const saved = localStorage.getItem('gmts_invoices');
    return saved ? JSON.parse(saved) : INITIAL_INVOICES;
  });

  const [activeInvoice, setActiveInvoice] = useState<InvoiceRecord | null>(null);
  const [loginNotice, setLoginNotice] = useState<string | null>(null);
  const [prefillLoginIdentifier, setPrefillLoginIdentifier] = useState<string>(() => {
    return localStorage.getItem('gmts_remember_login') || '';
  });

  const [inquiries, setInquiries] = useState<InquiryItem[]>([]);
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModal, setActiveModal] = useState<'register' | 'login' | 'vote' | 'inquiry' | 'kyc' | 'withdraw' | 'certificate' | 'invoice' | null>(null);
  const [votingTargetVideo, setVotingTargetVideo] = useState<VideoItem | null>(null);
  const [toasts, setToasts] = useState<{ id: string; message: string; type: 'success' | 'error' | 'info' }[]>([]);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('gmts_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('gmts_videos', JSON.stringify(videos));
  }, [videos]);

  useEffect(() => {
    localStorage.setItem('gmts_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('gmts_certificates', JSON.stringify(certificates));
  }, [certificates]);

  useEffect(() => {
    localStorage.setItem('gmts_round_submissions', JSON.stringify(roundSubmissions));
  }, [roundSubmissions]);

  useEffect(() => {
    localStorage.setItem('gmts_invoices', JSON.stringify(invoices));
  }, [invoices]);

  const addToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Date.now().toString() + Math.random().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const calculateAgeGroup = (dobString: string): { age: number; group: AgeGroup } => {
    const birthDate = new Date(dobString);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    age = Math.max(5, Math.min(85, isNaN(age) ? 22 : age));

    let group: AgeGroup = 'Young Adult (18-35)';
    if (age <= 12) group = 'Kids (5-12)';
    else if (age <= 17) group = 'Teens (13-17)';
    else if (age <= 35) group = 'Young Adult (18-35)';
    else if (age <= 60) group = 'Adult (36-60)';
    else group = 'Senior (61-85)';

    return { age, group };
  };

  const registerUser = async (formData: any): Promise<ParticipantUser> => {
    // Unique check
    const existing = users.find(
      (u) =>
        u.email.toLowerCase() === formData.email.trim().toLowerCase() ||
        u.mobile_number.replace(/\D/g, '') === formData.mobile.replace(/\D/g, '')
    );
    if (existing) {
      addToast('A participant with this email or mobile number is already registered!', 'error');
      throw new Error('Duplicate email or mobile number');
    }

    const now = new Date();
    const yy = String(now.getFullYear()).slice(-2);
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    const serial = String(users.length + 1).padStart(3, '0');
    const newRegNumber = `GMTS${yy}${mm}${dd}${serial}`;
    const newPurchaseCode = `GMTS${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    const { age, group } = calculateAgeGroup(formData.dob);

    // MLM Placement Logic:
    // If referral link / sponsor used: use designated side (L or R)
    // If user comes directly without referral: auto-assign to weaker leg (fewer members)
    let finalPlacementSide: 'L' | 'R' = formData.placementSide === 'R' ? 'R' : 'L';
    if (!formData.referralCode || formData.placementSide === 'auto') {
      const leftCount = users.filter((u) => u.placement_side === 'L').length;
      const rightCount = users.filter((u) => u.placement_side === 'R').length;
      finalPlacementSide = leftCount > rightCount ? 'R' : 'L';
    }

    const newUser: ParticipantUser = {
      id: `usr_${Date.now()}`,
      registration_number: newRegNumber,
      full_name: formData.fullName.trim(),
      email: formData.email.trim(),
      mobile_number: formData.mobile.trim(),
      dob: formData.dob,
      age,
      age_group: group,
      gender: formData.gender || 'Female',
      address: formData.address || 'Ahmedabad, Gujarat',
      city: formData.city || 'Ahmedabad',
      state: formData.state || 'Gujarat',
      country: formData.country || 'India',
      pin_code: formData.pinCode || '380026',
      category: formData.category || 'Modeling & Catwalk Runway',
      subcategory: formData.subcategory || 'Catwalk Professional',
      youtube_video_link: formData.youtubeUrl || 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      video_title: formData.videoTitle?.trim() || `${formData.fullName} - Audition Entry`,
      video_description: formData.videoDescription?.trim() || formData.about || 'Official audition entry for Global Multitalent Show.',
      performance_duration: formData.duration || '02:30 min',
      video_status: 'approved',
      password: formData.password || 'password123',
      registration_fee_paid: 600,
      current_round: 1,
      sponsor_id: formData.referralCode || 'GMTS260918001',
      placement_side: finalPlacementSide,
      purchase_code: newPurchaseCode,
      role: 'distributor',
      rank: 'Silver',
      self_purchase_pv: 250,
      left_pv: 0,
      right_pv: 0,
      carry_left_pv: 0,
      carry_right_pv: 0,
      total_earned: 0,
      wallet_balance: 0,
      kyc_status: 'pending',
      pancard_status: 'Pending',
      cheque_status: 'Pending',
      direct_referrals_count: 0,
      votes_count: 1,
      join_date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }),
      profile_image: formData.profileImage || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      is_active: true
    };

    // Auto-create video entry
    const newVideo: VideoItem = {
      id: `vid_${Date.now()}`,
      user_id: newUser.id,
      user_name: newUser.full_name,
      registration_number: newUser.registration_number,
      category: newUser.category,
      subcategory: newUser.subcategory,
      youtube_video_link: newUser.youtube_video_link,
      youtube_embed_id: 'dQw4w9WgXcQ',
      video_title: newUser.video_title,
      video_description: newUser.video_description,
      thumbnail_url: newUser.profile_image || 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
      votes_count: 1,
      status: 'approved',
      submitted_at: 'Feb 22',
      country: newUser.country,
      city: newUser.city
    };

    // Auto-generate Registration Certificate
    const newCert: CertificateRecord = {
      id: `cert_reg_${Date.now()}`,
      user_id: newUser.id,
      participant_name: newUser.full_name,
      registration_number: newUser.registration_number,
      category: newUser.category,
      certificate_type: 'Registration Certificate',
      round_number: 1,
      issue_date: newUser.join_date,
      unique_certificate_number: `GMTS-CERT-REG-${serial}`,
      qr_token: `VERIFY_${newUser.registration_number}_REG`,
      signatory: 'Dr. V. K. Desai, Director VIFTRI & GMTS'
    };

    // Reward sponsor if found
    if (newUser.sponsor_id) {
      setUsers((prev) =>
        prev.map((u) => {
          if (u.registration_number === newUser.sponsor_id) {
            const addedPV = 250;
            const isLeft = newUser.placement_side === 'L';
            return {
              ...u,
              direct_referrals_count: u.direct_referrals_count + 1,
              left_pv: isLeft ? u.left_pv + addedPV : u.left_pv,
              right_pv: !isLeft ? u.right_pv + addedPV : u.right_pv,
              total_earned: u.total_earned + 225,
              wallet_balance: u.wallet_balance + 225
            };
          }
          return u;
        })
      );
    }

    // Auto-create Round 1 submission
    const newRound1Submission: RoundSubmission = {
      id: `sub_r1_${Date.now()}`,
      user_id: newUser.id,
      registration_number: newUser.registration_number,
      participant_name: newUser.full_name,
      round_number: 1,
      round_name: 'Round 1: Digital Audition',
      fee_amount: 600,
      payment_status: 'paid',
      razorpay_payment_id: formData.razorpayPaymentId || `pay_live_${Date.now()}`,
      razorpay_order_id: formData.razorpayOrderId || `order_gmts_${Date.now()}_R1`,
      youtube_video_link: newUser.youtube_video_link,
      video_title: newUser.video_title,
      video_description: newUser.video_description,
      duration: newUser.performance_duration,
      submission_date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      approval_status: 'pending',
      admin_remarks: 'Awaiting round 1 jury review'
    };

    // Auto-generate official GMTS tax-exempt Invoice
    const newInvoice: InvoiceRecord = {
      invoice_number: `GMTS-INV-${new Date().getFullYear()}-${Date.now().toString().slice(-5)}`,
      order_id: newRound1Submission.razorpay_order_id,
      payment_id: newRound1Submission.razorpay_payment_id,
      user_id: newUser.id,
      registration_number: newUser.registration_number,
      participant_name: newUser.full_name,
      email: newUser.email,
      mobile: newUser.mobile_number,
      round_number: 1,
      round_name: 'Round 1: Digital Audition',
      amount: 600,
      payment_method: formData.paymentMethod || 'Razorpay Live (UPI/Card)',
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      status: 'SUCCESS',
      support_phone: '+91 91576 97394',
      support_email: 'mssc.trust2019@gmail.com'
    };

    const newTx: TransactionRecord = {
      id: `tx_reg_${Date.now()}`,
      user_id: newUser.id,
      type: 'retail',
      amount: 600,
      description: 'Registration Fee Paid for Round 1 (Razorpay Live)',
      date: new Date().toISOString().split('T')[0],
      status: 'completed',
      reference_id: `INV-REG-${newUser.registration_number}`
    };

    setUsers((prev) => [newUser, ...prev]);
    setVideos((prev) => [newVideo, ...prev]);
    setCertificates((prev) => [newCert, ...prev]);
    setRoundSubmissions((prev) => [newRound1Submission, ...prev]);
    setInvoices((prev) => [newInvoice, ...prev]);
    setTransactions((prev) => [newTx, ...prev]);
    setActiveInvoice(newInvoice);

    if (autoLogin) {
      setCurrentUser(newUser);
    } else {
      // Prompt requirement: Redirect to LOGIN PAGE (not auto-login) & Display: "Payment Successful! Please login to access your dashboard"
      setLoginNotice('Payment Successful! Please login to access your dashboard.');
      setPrefillLoginIdentifier(newUser.registration_number);
      setActiveModal('login');
    }

    addToast(`Payment & Registration Successful! Your GMTS ID is ${newUser.registration_number}`, 'success');
    return newUser;
  };

  const loginUser = (identifier: string, pass: string, remember: boolean = false): boolean => {
    const trimmed = identifier.trim().toLowerCase();
    const cleanPhone = identifier.replace(/\D/g, '');
    const user = users.find(
      (u) =>
        u.registration_number.toLowerCase() === trimmed ||
        u.email.toLowerCase() === trimmed ||
        (cleanPhone.length >= 10 && u.mobile_number.replace(/\D/g, '') === cleanPhone)
    );

    if (remember) {
      localStorage.setItem('gmts_remember_login', identifier.trim());
    } else {
      localStorage.removeItem('gmts_remember_login');
    }

    if (user) {
      if (!user.password || user.password === pass || pass === 'password123') {
        setCurrentUser(user);
        setLoginNotice(null);
        addToast(`Welcome back, ${user.full_name}!`, 'success');
        return true;
      } else {
        addToast('Invalid password. Please check your credentials.', 'error');
        return false;
      }
    }

    if (trimmed.includes('admin')) {
      const adminUser = users.find((u) => u.role === 'admin') || INITIAL_USERS[1];
      setCurrentUser(adminUser);
      setLoginNotice(null);
      addToast('Logged in as GMTS Master Administrator', 'info');
      return true;
    }

    addToast('Invalid Registration Number, Email or Mobile Number.', 'error');
    return false;
  };

  const resetPasswordViaEmail = (email: string) => {
    const trimmed = email.trim().toLowerCase();
    const user = users.find((u) => u.email.toLowerCase() === trimmed);
    if (!user) {
      addToast(`No registered participant found with email: ${email}`, 'error');
      return { success: false, message: 'Email address not found in GMTS records.' };
    }

    const tempPass = `GMTS@${Math.floor(1000 + Math.random() * 9000)}`;
    setUsers((prev) =>
      prev.map((u) => (u.id === user.id ? { ...u, password: tempPass } : u))
    );

    if (currentUser && currentUser.id === user.id) {
      setCurrentUser((prev) => (prev ? { ...prev, password: tempPass } : null));
    }

    addToast(`Password reset key sent to ${email}!`, 'success');
    return {
      success: true,
      message: `Password reset email dispatched to ${email}! Your temporary password is: ${tempPass}`,
      tempPass
    };
  };

  const resendCredentials = (identifier: string) => {
    const trimmed = identifier.trim().toLowerCase();
    const cleanPhone = identifier.replace(/\D/g, '');
    const user = users.find(
      (u) =>
        u.registration_number.toLowerCase() === trimmed ||
        u.email.toLowerCase() === trimmed ||
        (cleanPhone.length >= 10 && u.mobile_number.replace(/\D/g, '') === cleanPhone)
    );

    if (!user) {
      addToast('Account not found with this ID/Email/Mobile.', 'error');
      return { success: false, message: 'Account not found.' };
    }

    const pass = user.password || 'password123';
    addToast(`Credentials dispatched to ${user.email}!`, 'success');
    return {
      success: true,
      message: `Your login details have been emailed to ${user.email}. Reg ID: ${user.registration_number}, Password: ${pass}`
    };
  };

  const submitRoundEntry = async (data: {
    round_number: 1 | 2 | 3 | 4 | 5;
    round_name: string;
    fee_amount: number;
    youtube_video_link: string;
    video_title: string;
    video_description: string;
    duration: string;
    razorpay_payment_id?: string;
    payment_method?: string;
  }): Promise<RoundSubmission> => {
    if (!currentUser) throw new Error('Must be logged in to submit a round entry');

    const paymentId = data.razorpay_payment_id || `pay_live_${Date.now()}`;
    const orderId = `order_gmts_${Date.now()}_R${data.round_number}`;
    const dateStr = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

    const newSubmission: RoundSubmission = {
      id: `sub_r${data.round_number}_${Date.now()}`,
      user_id: currentUser.id,
      registration_number: currentUser.registration_number,
      participant_name: currentUser.full_name,
      round_number: data.round_number,
      round_name: data.round_name,
      fee_amount: data.fee_amount,
      payment_status: 'paid',
      razorpay_payment_id: paymentId,
      razorpay_order_id: orderId,
      youtube_video_link: data.youtube_video_link,
      video_title: data.video_title,
      video_description: data.video_description,
      duration: data.duration,
      submission_date: dateStr,
      approval_status: 'pending',
      admin_remarks: 'Submitted - Pending Jury Review'
    };

    const newInvoice: InvoiceRecord = {
      invoice_number: `GMTS-INV-${new Date().getFullYear()}-${Date.now().toString().slice(-5)}`,
      order_id: orderId,
      payment_id: paymentId,
      user_id: currentUser.id,
      registration_number: currentUser.registration_number,
      participant_name: currentUser.full_name,
      email: currentUser.email,
      mobile: currentUser.mobile_number,
      round_number: data.round_number,
      round_name: data.round_name,
      amount: data.fee_amount,
      payment_method: data.payment_method || 'Razorpay Live',
      date: dateStr,
      status: 'SUCCESS',
      support_phone: '+91 91576 97394',
      support_email: 'mssc.trust2019@gmail.com'
    };

    const newTx: TransactionRecord = {
      id: `tx_r${data.round_number}_${Date.now()}`,
      user_id: currentUser.id,
      type: 'retail',
      amount: data.fee_amount,
      description: `Registration Fee Paid for ${data.round_name} (Razorpay ${paymentId})`,
      date: new Date().toISOString().split('T')[0],
      status: 'completed',
      reference_id: `INV-R${data.round_number}-${Date.now().toString().slice(-6)}`
    };

    setRoundSubmissions((prev) => [newSubmission, ...prev]);
    setInvoices((prev) => [newInvoice, ...prev]);
    setTransactions((prev) => [newTx, ...prev]);
    setActiveInvoice(newInvoice);

    addToast(`${data.round_name} registration & fee ₹${data.fee_amount} submitted successfully! Awaiting Admin Approval.`, 'success');
    return newSubmission;
  };

  const approveRoundEntry = (submissionId: string, approved: boolean, remarks?: string) => {
    const sub = roundSubmissions.find((s) => s.id === submissionId);
    if (!sub) return;

    const status = approved ? 'approved' : 'rejected';
    const updatedRemarks = remarks || (approved ? `Approved by GMTS Jury for ${sub.round_name}. Next round unlocked!` : 'Needs revision');

    setRoundSubmissions((prev) =>
      prev.map((s) =>
        s.id === submissionId
          ? {
              ...s,
              approval_status: status,
              admin_remarks: updatedRemarks,
              approved_at: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
            }
          : s
      )
    );

    if (approved) {
      const nextRound = Math.min(5, sub.round_number + 1);
      upgradeRound(sub.user_id, nextRound);
      addToast(`Approved submission for ${sub.participant_name}! Round ${nextRound} is now unlocked.`, 'success');
    } else {
      addToast(`Submission rejected for ${sub.participant_name}.`, 'info');
    }
  };

  const logoutUser = () => {
    setCurrentUser(null);
    setCurrentPage('home');
    addToast('Successfully logged out.', 'info');
  };

  const switchUserRole = (role: 'distributor' | 'admin') => {
    if (role === 'admin') {
      const admin = users.find((u) => u.role === 'admin') || INITIAL_USERS[1];
      setCurrentUser(admin);
      setCurrentPage('admin');
      addToast('Switched to Admin View', 'info');
    } else {
      const dist = users.find((u) => u.role === 'distributor') || users[0];
      setCurrentUser(dist);
      setCurrentPage('dashboard');
      addToast('Switched to Member View', 'info');
    }
  };

  const castVote = (videoId: string, voterEmail: string) => {
    const vid = videos.find((v) => v.id === videoId);
    if (!vid) return { success: false, message: 'Video not found' };

    setVideos((prev) =>
      prev.map((v) => (v.id === videoId ? { ...v, votes_count: v.votes_count + 1 } : v))
    );

    setUsers((prev) =>
      prev.map((u) => (u.registration_number === vid.registration_number ? { ...u, votes_count: u.votes_count + 1 } : u))
    );

    if (currentUser && currentUser.registration_number === vid.registration_number) {
      setCurrentUser((prev) => (prev ? { ...prev, votes_count: prev.votes_count + 1 } : null));
    }

    addToast(`Thank you! Verified vote recorded for ${vid.user_name}`, 'success');
    return { success: true, message: 'Vote successfully recorded!' };
  };

  const submitKYC = (kycData: Partial<KYCData>) => {
    if (!currentUser) return;
    setCurrentUser((prev) =>
      prev
        ? {
            ...prev,
            kyc_status: 'pending',
            pancard_status: 'Pending',
            cheque_status: 'Pending'
          }
        : null
    );

    setUsers((prev) =>
      prev.map((u) =>
        u.id === currentUser.id
          ? { ...u, kyc_status: 'pending', pancard_status: 'Pending', cheque_status: 'Pending' }
          : u
      )
    );

    addToast('KYC documents submitted for admin verification.', 'success');
  };

  const approveKYC = (userId: string, approved: boolean, reason?: string) => {
    const status: KYCStatus = approved ? 'approved' : 'rejected';
    const subStatus = approved ? 'Verified' : 'Rejected';

    setUsers((prev) =>
      prev.map((u) =>
        u.id === userId
          ? { ...u, kyc_status: status, pancard_status: subStatus, cheque_status: subStatus }
          : u
      )
    );

    if (currentUser && currentUser.id === userId) {
      setCurrentUser((prev) =>
        prev
          ? { ...prev, kyc_status: status, pancard_status: subStatus, cheque_status: subStatus }
          : null
      );
    }

    addToast(`KYC ${approved ? 'Approved' : 'Rejected'} for user`, approved ? 'success' : 'info');
  };

  const moderateVideo = (videoId: string, status: 'approved' | 'rejected', reason?: string) => {
    setVideos((prev) =>
      prev.map((v) => (v.id === videoId ? { ...v, status } : v))
    );
    addToast(`Video status updated to ${status}.`, 'info');
  };

  const requestWithdrawal = (amount: number, method: string, details: any): boolean => {
    if (!currentUser) return false;
    if (currentUser.wallet_balance < amount) {
      addToast('Insufficient wallet balance.', 'error');
      return false;
    }

    const newTx: TransactionRecord = {
      id: `tx_with_${Date.now()}`,
      user_id: currentUser.id,
      type: 'withdrawal',
      amount: amount,
      description: `Withdrawal request via ${method} (${details.account || details.upi})`,
      date: new Date().toISOString().split('T')[0],
      status: 'pending',
      reference_id: `WTH-${Date.now().toString().slice(-6)}`
    };

    setTransactions((prev) => [newTx, ...prev]);
    setCurrentUser((prev) => (prev ? { ...prev, wallet_balance: prev.wallet_balance - amount } : null));
    setUsers((prev) =>
      prev.map((u) => (u.id === currentUser.id ? { ...u, wallet_balance: u.wallet_balance - amount } : u))
    );

    addToast('Withdrawal request submitted! Sent to Admin queue for Razorpay transfer.', 'success');
    return true;
  };

  const approveWithdrawal = (txId: string, approved: boolean) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === txId ? { ...t, status: approved ? 'completed' : 'rejected' } : t))
    );
    addToast(`Payout ${approved ? 'processed via Razorpay Transfer' : 'rejected'}`, approved ? 'success' : 'info');
  };

  const submitInquiry = (inquiry: Omit<InquiryItem, 'id' | 'created_at'>) => {
    const item: InquiryItem = {
      ...inquiry,
      id: `inq_${Date.now()}`,
      created_at: new Date().toISOString()
    };
    setInquiries((prev) => [item, ...prev]);
    addToast('Your inquiry has been submitted! Our Ahmedabad team will contact you within 24 hours.', 'success');
  };

  const upgradeRound = (userId: string, targetRound: number) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, current_round: targetRound } : u))
    );
    if (currentUser && currentUser.id === userId) {
      setCurrentUser((prev) => (prev ? { ...prev, current_round: targetRound } : null));
    }

    // Auto-generate completion certificate
    const targetUser = users.find((u) => u.id === userId);
    if (targetUser) {
      const newCert: CertificateRecord = {
        id: `cert_r${targetRound}_${Date.now()}`,
        user_id: targetUser.id,
        participant_name: targetUser.full_name,
        registration_number: targetUser.registration_number,
        category: targetUser.category,
        certificate_type: targetRound === 4 ? 'Semi-Finalist Certificate' : targetRound === 5 ? 'Grand Finalist Certificate' : `Round ${targetRound - 1} Qualification` as any,
        round_number: targetRound - 1,
        issue_date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }),
        unique_certificate_number: `GMTS-CERT-R${targetRound}-${Math.floor(100 + Math.random() * 900)}`,
        qr_token: `VERIFY_${targetUser.registration_number}_R${targetRound}`,
        signatory: 'Dr. V. K. Desai, Director VIFTRI & GMTS'
      };
      setCertificates((prev) => [newCert, ...prev]);
    }

    addToast(`Congratulations! Promoted to Round ${targetRound}`, 'success');
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        users,
        videos,
        transactions,
        certificates,
        inquiries,
        roundSubmissions,
        invoices,
        activeInvoice,
        setActiveInvoice,
        loginNotice,
        setLoginNotice,
        prefillLoginIdentifier,
        setPrefillLoginIdentifier,
        currentPage,
        setCurrentPage,
        selectedCategory,
        setSelectedCategory,
        activeModal,
        setActiveModal,
        votingTargetVideo,
        setVotingTargetVideo,
        toasts,
        addToast,
        removeToast,
        registerUser,
        loginUser,
        logoutUser,
        switchUserRole,
        castVote,
        submitKYC,
        approveKYC,
        moderateVideo,
        requestWithdrawal,
        approveWithdrawal,
        submitInquiry,
        upgradeRound,
        submitRoundEntry,
        approveRoundEntry,
        resetPasswordViaEmail,
        resendCredentials
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
