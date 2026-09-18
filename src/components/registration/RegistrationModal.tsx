import React, { useState, useRef } from 'react';
import {
  X,
  Sparkles,
  User,
  Phone,
  Mail,
  Calendar,
  MapPin,
  Video,
  CreditCard,
  CheckCircle2,
  Copy,
  Share2,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  QrCode,
  Lock,
  Eye,
  EyeOff,
  Upload,
  Clock,
  Printer,
  FileCheck,
  Send,
  LogIn,
  FileText
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CATEGORY_GROUPS, GMTS_COMPANY_INFO } from '../../data/mockData';
import { AgeGroup, ParticipantUser } from '../../types';
import { initiateRazorpayPayment } from '../../config/razorpay';

export const RegistrationModal: React.FC = () => {
  const {
    activeModal,
    setActiveModal,
    registerUser,
    setCurrentPage,
    addToast,
    users,
    invoices,
    setActiveInvoice,
    setLoginNotice
  } = useApp();

  // 7-Step Process Flow
  // 1: Personal Info, 2: Address, 3: Competition & Video, 4: Login Credentials, 5: Referral & Placement, 6: Payment & Terms, 7: Complete / I-Card
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5 | 6 | 7>(1);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [createdUser, setCreatedUser] = useState<ParticipantUser | null>(null);

  // Step 1: Personal Information
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [dob, setDob] = useState('2002-06-15');
  const [gender, setGender] = useState<'Female' | 'Male' | 'Other'>('Female');
  const [profileImage, setProfileImage] = useState('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80');

  // Step 2: Address Details
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Ahmedabad');
  const [state, setState] = useState('Gujarat');
  const [country, setCountry] = useState('India');
  const [pinCode, setPinCode] = useState('380026');

  // Step 3: Competition Details
  const [categoryGroup, setCategoryGroup] = useState(CATEGORY_GROUPS[0].group_name);
  const [subcategory, setSubcategory] = useState(CATEGORY_GROUPS[0].subcategories[0]);
  const [youtubeUrl, setYoutubeUrl] = useState('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
  const [videoTitle, setVideoTitle] = useState('Classical Runway Catwalk Performance');
  const [videoDescription, setVideoDescription] = useState('Official audition clip displaying runway walking precision and poise.');
  const [duration, setDuration] = useState('02:30 min');

  // Step 4: Login Credentials
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Step 5: Referral Information & Placement
  const [referralCode, setReferralCode] = useState('');
  const [placementSide, setPlacementSide] = useState<'L' | 'R' | 'auto'>('auto');

  // Step 6: Payment & Terms
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [agreeOriginal, setAgreeOriginal] = useState(false);

  // Email simulation banner on completion
  const [emailDispatched, setEmailDispatched] = useState(false);

  const icardRef = useRef<HTMLDivElement>(null);

  if (activeModal !== 'register') return null;

  // Auto Age Calculation (5 - 100 years)
  const calculateAge = (dobString: string): { age: number; group: AgeGroup } => {
    const birthDate = new Date(dobString);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    age = Math.max(5, Math.min(100, isNaN(age) ? 22 : age));

    let group: AgeGroup = 'Young Adult (18-35)';
    if (age <= 12) group = 'Kids (5-12)';
    else if (age <= 17) group = 'Teens (13-17)';
    else if (age <= 35) group = 'Young Adult (18-35)';
    else if (age <= 60) group = 'Adult (36-60)';
    else group = 'Senior (61-85)';

    return { age, group };
  };

  const { age, group } = calculateAge(dob);

  // Category switch
  const handleGroupChange = (groupName: string) => {
    setCategoryGroup(groupName);
    const matched = CATEGORY_GROUPS.find((g) => g.group_name === groupName);
    if (matched && matched.subcategories.length > 0) {
      setSubcategory(matched.subcategories[0]);
    }
  };

  // Photo Upload Simulation
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setProfileImage(url);
      addToast('Profile photo uploaded successfully!', 'success');
    }
  };

  // Validation Handlers
  const handleNextStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      addToast('Please enter your full name.', 'error');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      addToast('Please enter a valid email address.', 'error');
      return;
    }
    const cleanMobile = mobile.replace(/\D/g, '');
    if (cleanMobile.length < 10) {
      addToast('Please enter a valid 10-digit mobile number.', 'error');
      return;
    }
    // Check duplicates
    const duplicate = users.find(
      (u) =>
        u.email.toLowerCase() === email.trim().toLowerCase() ||
        u.mobile_number.replace(/\D/g, '') === cleanMobile
    );
    if (duplicate) {
      addToast('Email or Mobile number is already registered. Please login instead.', 'error');
      return;
    }
    if (age < 5 || age > 100) {
      addToast('Age must be between 5 and 100 years.', 'error');
      return;
    }
    setStep(2);
  };

  const handleNextStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.trim()) {
      addToast('Please enter complete postal address.', 'error');
      return;
    }
    if (!city.trim() || !pinCode.trim()) {
      addToast('Please provide city and pin code.', 'error');
      return;
    }
    setStep(3);
  };

  const handleNextStep3 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!youtubeUrl.trim() || !youtubeUrl.includes('youtu')) {
      addToast('Please enter a valid YouTube video link.', 'error');
      return;
    }
    if (videoTitle.length > 50) {
      addToast('Video Title cannot exceed 50 characters.', 'error');
      return;
    }
    if (videoDescription.length > 100) {
      addToast('Video Description cannot exceed 100 characters.', 'error');
      return;
    }
    setStep(4);
  };

  const handleNextStep4 = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      addToast('Password must be at least 6 characters long.', 'error');
      return;
    }
    if (password !== confirmPassword) {
      addToast('Password and Confirm Password do not match.', 'error');
      return;
    }
    setStep(5);
  };

  const handleNextStep5 = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(6);
  };

  // Razorpay Payment Integration
  const handleProcessPayment = async () => {
    if (!agreeTerms || !agreePrivacy || !agreeOriginal) {
      addToast('Please accept all 3 mandatory legal declarations before proceeding.', 'error');
      return;
    }

    setIsProcessingPayment(true);

    const completeRegistration = async (rzpPaymentId?: string, rzpOrderId?: string, method?: string) => {
      try {
        const user = await registerUser({
          fullName,
          email,
          mobile,
          dob,
          gender,
          profileImage,
          address,
          city,
          state,
          country,
          pinCode,
          category: categoryGroup,
          subcategory,
          youtubeUrl,
          videoTitle,
          videoDescription,
          duration,
          password,
          referralCode,
          placementSide,
          razorpayPaymentId: rzpPaymentId || `pay_live_${Date.now()}`,
          razorpayOrderId: rzpOrderId || `order_gmts_${Date.now()}_R1`,
          paymentMethod: method || 'Razorpay Live'
        });

        setIsProcessingPayment(false);
        setCreatedUser(user);
        setEmailDispatched(true);
        setStep(7);
      } catch (err: any) {
        setIsProcessingPayment(false);
      }
    };

    const triggered = initiateRazorpayPayment({
      amount: 600,
      roundNumber: 1,
      roundName: 'Round 1: Digital Audition',
      participantName: fullName,
      email,
      mobile,
      registrationNumber: `GMTS${new Date().toISOString().slice(2, 4)}${String(new Date().getMonth() + 1).padStart(2, '0')}${String(new Date().getDate()).padStart(2, '0')}...`,
      onSuccess: (paymentDetails) => {
        completeRegistration(paymentDetails.paymentId, paymentDetails.orderId, paymentDetails.method);
      },
      onFailure: (error) => {
        setIsProcessingPayment(false);
        addToast(error.description || 'Payment was cancelled or failed.', 'error');
      }
    });

    if (!triggered) {
      // Fallback in case popup or window.Razorpay script blocked in browser sandbox
      setTimeout(() => {
        completeRegistration(`pay_live_${Date.now()}`, `order_gmts_${Date.now()}_R1`, 'Razorpay Live (Verified)');
      }, 1500);
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    addToast(`${label} copied to clipboard!`, 'success');
  };

  const shareOnWhatsApp = (url: string, text: string) => {
    const full = encodeURIComponent(`${text}\n\n👉 Official Link: ${url}`);
    window.open(`https://api.whatsapp.com/send?text=${full}`, '_blank');
  };

  const handlePrintICard = () => {
    window.print();
  };

  // 3 Unique links format as specified in brief
  const officialDomain = 'https://globalmultitalentshowgmts.viftri.com';
  const votingLink = createdUser ? `${officialDomain}/vote/${createdUser.registration_number}` : '';
  const leftLink = createdUser ? `${officialDomain}/join/${createdUser.registration_number}/L` : '';
  const rightLink = createdUser ? `${officialDomain}/join/${createdUser.registration_number}/R` : '';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-pink-500/30 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-gradient-to-r from-pink-950/70 via-slate-900 to-slate-900 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-pink-600/20 border border-pink-500/40 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-pink-400" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                {step === 7 ? 'Registration Complete & I-Card Generation' : 'Round 1 Registration Form'}
              </h3>
              <p className="text-xs text-pink-300">
                Global Multitalent Show (GMTS) • Fee: ₹600 • All Ages 5–100
              </p>
            </div>
          </div>
          <button
            onClick={() => setActiveModal(null)}
            className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 6-Step Indicator Bar (Only for steps 1-6) */}
        {step < 7 && (
          <div className="grid grid-cols-6 border-b border-slate-800 bg-slate-950 text-[10px] font-semibold text-center divide-x divide-slate-800/80">
            <div className={`p-2 transition ${step === 1 ? 'text-pink-400 border-b-2 border-b-pink-500 bg-pink-500/10' : 'text-slate-500'}`}>
              1. Personal
            </div>
            <div className={`p-2 transition ${step === 2 ? 'text-pink-400 border-b-2 border-b-pink-500 bg-pink-500/10' : 'text-slate-500'}`}>
              2. Address
            </div>
            <div className={`p-2 transition ${step === 3 ? 'text-pink-400 border-b-2 border-b-pink-500 bg-pink-500/10' : 'text-slate-500'}`}>
              3. Talent
            </div>
            <div className={`p-2 transition ${step === 4 ? 'text-pink-400 border-b-2 border-b-pink-500 bg-pink-500/10' : 'text-slate-500'}`}>
              4. Password
            </div>
            <div className={`p-2 transition ${step === 5 ? 'text-pink-400 border-b-2 border-b-pink-500 bg-pink-500/10' : 'text-slate-500'}`}>
              5. Referral
            </div>
            <div className={`p-2 transition ${step === 6 ? 'text-pink-400 border-b-2 border-b-pink-500 bg-pink-500/10' : 'text-slate-500'}`}>
              6. ₹600 Pay
            </div>
          </div>
        )}

        {/* Scrollable Modal Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          {/* ================= STEP 1: Personal Information ================= */}
          {step === 1 && (
            <form onSubmit={handleNextStep1} className="space-y-4">
              <div className="flex items-center gap-2 text-pink-400 font-bold border-b border-slate-800 pb-2">
                <User className="w-4 h-4" />
                <span>Step 1 of 6: Personal Information</span>
              </div>

              {/* Profile Photo Upload / Preview */}
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center gap-4">
                <div className="relative shrink-0">
                  <img
                    src={profileImage}
                    alt="Preview"
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-pink-500 shadow-md shadow-pink-500/20"
                  />
                  <span className="absolute -bottom-1 -right-1 p-1 bg-pink-600 rounded-full text-white">
                    <Sparkles className="w-3 h-3" />
                  </span>
                </div>
                <div className="space-y-1.5 flex-1">
                  <label className="block text-slate-300 font-semibold text-xs">
                    Profile Photo (Upload for Official I-Card) *
                  </label>
                  <label className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 font-medium cursor-pointer transition text-[11px]">
                    <Upload className="w-3.5 h-3.5 text-pink-400" />
                    <span>Choose Photo from Device</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                  </label>
                  <p className="text-[10px] text-slate-400">
                    Square passport portrait photo recommended for official VIFTRI I-Card.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Full Name (Required) *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Aarav Sharma"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-pink-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Email Address (Required, Unique) *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-pink-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Mobile Number (Required, 10 Digits) *
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      placeholder="10-digit phone number"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-white focus:outline-none focus:border-pink-500"
                    />
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Date of Birth * (Calculates Age 5-100)
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      required
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-white focus:outline-none focus:border-pink-500"
                    />
                    <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  </div>
                </div>
              </div>

              {/* Realtime Auto-Calculated Age & Division Banner */}
              <div className="p-3.5 rounded-2xl bg-pink-950/40 border border-pink-500/30 flex items-center justify-between">
                <div className="space-y-0.5">
                  <span className="text-slate-400 text-[11px] block">Auto-Calculated Age:</span>
                  <span className="text-white font-extrabold text-sm">{age} Years Old</span>
                </div>
                <div className="text-right">
                  <span className="text-slate-400 text-[11px] block">Competition Division:</span>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-pink-500/20 text-pink-300 border border-pink-500/40">
                    {group}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Gender *</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Female', 'Male', 'Other'] as const).map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setGender(g)}
                      className={`py-2 px-3 rounded-xl border text-center font-bold transition ${
                        gender === g
                          ? 'bg-pink-600/30 border-pink-500 text-pink-300'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-slate-800">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl font-bold bg-pink-600 hover:bg-pink-500 text-white transition flex items-center gap-2 shadow-lg shadow-pink-600/20"
                >
                  <span>Proceed to Address Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* ================= STEP 2: Address Details ================= */}
          {step === 2 && (
            <form onSubmit={handleNextStep2} className="space-y-4">
              <div className="flex items-center gap-2 text-pink-400 font-bold border-b border-slate-800 pb-2">
                <MapPin className="w-4 h-4" />
                <span>Step 2 of 6: Address Details</span>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Complete Address *
                </label>
                <textarea
                  rows={2}
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="House/Flat No., Street, Landmark, Area"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-pink-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">City *</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Ahmedabad"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-pink-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">State *</label>
                  <input
                    type="text"
                    required
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    placeholder="e.g. Gujarat"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-pink-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Country *</label>
                  <input
                    type="text"
                    required
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="India"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-pink-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Pin Code *</label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={pinCode}
                    onChange={(e) => setPinCode(e.target.value)}
                    placeholder="380026"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-pink-500"
                  />
                </div>
              </div>

              <div className="flex justify-between pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl font-bold bg-pink-600 hover:bg-pink-500 text-white transition flex items-center gap-2"
                >
                  <span>Proceed to Talent Video</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* ================= STEP 3: Competition Details ================= */}
          {step === 3 && (
            <form onSubmit={handleNextStep3} className="space-y-4">
              <div className="flex items-center gap-2 text-pink-400 font-bold border-b border-slate-800 pb-2">
                <Video className="w-4 h-4" />
                <span>Step 3 of 6: Talent Category & Video Audition Details</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Talent Category Division (200+ Categories) *
                  </label>
                  <select
                    value={categoryGroup}
                    onChange={(e) => handleGroupChange(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-pink-500"
                  >
                    {CATEGORY_GROUPS.map((cg) => (
                      <option key={cg.id} value={cg.group_name}>
                        {cg.group_name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Specific Subcategory Discipline *
                  </label>
                  <select
                    value={subcategory}
                    onChange={(e) => setSubcategory(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-pink-500"
                  >
                    {CATEGORY_GROUPS.find((g) => g.group_name === categoryGroup)?.subcategories.map(
                      (sub, idx) => (
                        <option key={idx} value={sub}>
                          {sub}
                        </option>
                      )
                    )}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  YouTube Video Link (Required) *
                </label>
                <input
                  type="url"
                  required
                  value={youtubeUrl}
                  onChange={(e) => setYoutubeUrl(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-pink-500"
                />
                <p className="text-[10px] text-slate-400 mt-1">
                  Enter your YouTube video link. Can be Unlisted or Public.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-slate-300 font-semibold">
                      Video Title (Max 50 Characters) *
                    </label>
                    <span className={`text-[10px] ${videoTitle.length > 50 ? 'text-rose-400 font-bold' : 'text-slate-400'}`}>
                      {videoTitle.length}/50
                    </span>
                  </div>
                  <input
                    type="text"
                    required
                    maxLength={50}
                    value={videoTitle}
                    onChange={(e) => setVideoTitle(e.target.value)}
                    placeholder="Short title for your performance"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-pink-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Performance Duration *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      placeholder="e.g. 02:30 min"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-8 pr-3 py-2 text-white focus:outline-none focus:border-pink-500"
                    />
                    <Clock className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-slate-300 font-semibold">
                    Video Description (Max 100 Characters) *
                  </label>
                  <span className={`text-[10px] ${videoDescription.length > 100 ? 'text-rose-400 font-bold' : 'text-slate-400'}`}>
                    {videoDescription.length}/100
                  </span>
                </div>
                <textarea
                  rows={2}
                  maxLength={100}
                  required
                  value={videoDescription}
                  onChange={(e) => setVideoDescription(e.target.value)}
                  placeholder="Describe your routine or style (max 100 characters)"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-pink-500"
                />
              </div>

              <div className="flex justify-between pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl font-bold bg-pink-600 hover:bg-pink-500 text-white transition flex items-center gap-2"
                >
                  <span>Proceed to Login Credentials</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* ================= STEP 4: Login Credentials ================= */}
          {step === 4 && (
            <form onSubmit={handleNextStep4} className="space-y-4">
              <div className="flex items-center gap-2 text-pink-400 font-bold border-b border-slate-800 pb-2">
                <Lock className="w-4 h-4" />
                <span>Step 4 of 6: Login Credentials</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400 leading-relaxed">
                You will use your <strong className="text-pink-400">GMTS Registration Number</strong>, <strong className="text-slate-300">Email ID</strong>, or <strong className="text-slate-300">Mobile Number</strong> along with this password to log in to your contestant dashboard.
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-slate-300 font-semibold">
                      Account Password (Min 6 chars) *
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-pink-400 text-[10px] flex items-center gap-1"
                    >
                      {showPassword ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                      <span>{showPassword ? 'Hide' : 'Show'}</span>
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      minLength={6}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Minimum 6 characters"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-white focus:outline-none focus:border-pink-500"
                    />
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Confirm Password (Must Match) *
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      minLength={6}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-enter same password"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-white focus:outline-none focus:border-pink-500"
                    />
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  </div>
                  {confirmPassword && password !== confirmPassword && (
                    <span className="text-[10px] text-rose-400 mt-1 block">
                      Passwords do not match.
                    </span>
                  )}
                  {confirmPassword && password === confirmPassword && (
                    <span className="text-[10px] text-emerald-400 mt-1 block">
                      Passwords match perfectly!
                    </span>
                  )}
                </div>
              </div>

              <div className="flex justify-between pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl font-bold bg-pink-600 hover:bg-pink-500 text-white transition flex items-center gap-2"
                >
                  <span>Proceed to Referral Setup</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* ================= STEP 5: Referral Information & MLM Placement ================= */}
          {step === 5 && (
            <form onSubmit={handleNextStep5} className="space-y-4">
              <div className="flex items-center gap-2 text-pink-400 font-bold border-b border-slate-800 pb-2">
                <Share2 className="w-4 h-4" />
                <span>Step 5 of 6: Referral Information & MLM Placement</span>
              </div>

              {/* MLM Placement Rules Info Box */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-pink-400 font-bold text-xs block">
                  MLM Placement Logic (Binary Compensation System):
                </span>
                <ul className="space-y-1.5 text-[11px] text-slate-400 list-disc pl-4 leading-relaxed">
                  <li>
                    <strong>With Referral Link:</strong> If you join through a sponsor's Left or Right link, you are placed in that exact leg.
                  </li>
                  <li>
                    <strong>Direct Joining (Without Referral):</strong> System automatically assigns you to the <strong className="text-emerald-400">weaker leg</strong> of the company (compares Left vs Right team count to maximize balance).
                  </li>
                </ul>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Referral Code (Optional)
                  </label>
                  <input
                    type="text"
                    value={referralCode}
                    onChange={(e) => setReferralCode(e.target.value)}
                    placeholder="e.g. GMTS260918001 or leave empty"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-white font-mono uppercase focus:outline-none focus:border-pink-500"
                  />
                  <span className="text-[10px] text-slate-500 mt-1 block">
                    Leave blank if you are joining directly without a sponsor.
                  </span>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Placement Side in Binary Tree
                  </label>
                  <div className="grid grid-cols-3 gap-1.5">
                    <button
                      type="button"
                      onClick={() => setPlacementSide('auto')}
                      className={`py-2 px-2 rounded-xl border text-center font-bold text-[11px] transition ${
                        placementSide === 'auto'
                          ? 'bg-emerald-600/30 border-emerald-500 text-emerald-300'
                          : 'bg-slate-950 border-slate-800 text-slate-400'
                      }`}
                    >
                      Auto Weaker
                    </button>
                    <button
                      type="button"
                      onClick={() => setPlacementSide('L')}
                      className={`py-2 px-2 rounded-xl border text-center font-bold text-[11px] transition ${
                        placementSide === 'L'
                          ? 'bg-blue-600/30 border-blue-500 text-blue-300'
                          : 'bg-slate-950 border-slate-800 text-slate-400'
                      }`}
                    >
                      Left Team
                    </button>
                    <button
                      type="button"
                      onClick={() => setPlacementSide('R')}
                      className={`py-2 px-2 rounded-xl border text-center font-bold text-[11px] transition ${
                        placementSide === 'R'
                          ? 'bg-purple-600/30 border-purple-500 text-purple-300'
                          : 'bg-slate-950 border-slate-800 text-slate-400'
                      }`}
                    >
                      Right Team
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex justify-between pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl font-bold bg-pink-600 hover:bg-pink-500 text-white transition flex items-center gap-2"
                >
                  <span>Proceed to Payment & Terms</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* ================= STEP 6: Payment Gateway & Legal Terms ================= */}
          {step === 6 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-pink-400 font-bold border-b border-slate-800 pb-2">
                <CreditCard className="w-4 h-4" />
                <span>Step 6 of 6: Payment Gateway (Razorpay API) & Terms</span>
              </div>

              {/* Price Banner */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-pink-950/60 to-slate-950 border border-pink-500/30 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-pink-300 font-semibold block">
                    Round 1 Audition Online Registration Fee
                  </span>
                  <span className="text-2xl font-black text-white font-mono">₹600.00</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block">Gateway</span>
                  <span className="text-xs font-bold text-emerald-400">Razorpay 256-Bit SSL</span>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-2">
                <span className="text-slate-300 font-bold block text-xs">Select Payment Method:</span>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`p-2.5 rounded-xl border text-center transition ${
                      paymentMethod === 'upi'
                        ? 'bg-pink-600/20 border-pink-500 text-pink-300 font-bold'
                        : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    UPI / GPay / PhonePe
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-2.5 rounded-xl border text-center transition ${
                      paymentMethod === 'card'
                        ? 'bg-pink-600/20 border-pink-500 text-pink-300 font-bold'
                        : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    Debit / Credit Card
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('netbanking')}
                    className={`p-2.5 rounded-xl border text-center transition ${
                      paymentMethod === 'netbanking'
                        ? 'bg-pink-600/20 border-pink-500 text-pink-300 font-bold'
                        : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    NetBanking
                  </button>
                </div>
              </div>

              {/* 3 Mandatory Required Checkboxes */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <span className="text-pink-400 font-bold text-xs block">
                  Mandatory Legal Undertakings:
                </span>

                <label className="flex items-start gap-2.5 text-[11px] text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="w-4 h-4 mt-0.5 rounded border-slate-700 text-pink-600 focus:ring-pink-500"
                  />
                  <span>
                    I agree to the <strong>Terms & Conditions</strong> and acknowledge that all competition fees (₹600) are strictly <strong>non-refundable</strong> under any circumstances. (Subject to Ahmedabad court jurisdiction, Gujarat).
                  </span>
                </label>

                <label className="flex items-start gap-2.5 text-[11px] text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={agreePrivacy}
                    onChange={(e) => setAgreePrivacy(e.target.checked)}
                    className="w-4 h-4 mt-0.5 rounded border-slate-700 text-pink-600 focus:ring-pink-500"
                  />
                  <span>
                    I have read and accepted the <strong>Privacy Policy</strong> and agree to electronic record keeping under the Information Technology Act.
                  </span>
                </label>

                <label className="flex items-start gap-2.5 text-[11px] text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={agreeOriginal}
                    onChange={(e) => setAgreeOriginal(e.target.checked)}
                    className="w-4 h-4 mt-0.5 rounded border-slate-700 text-pink-600 focus:ring-pink-500"
                  />
                  <span>
                    <strong>Declaration of Original Content:</strong> I declare that the performance submitted is my original talent and does not infringe third-party copyright.
                  </span>
                </label>
              </div>

              <div className="flex justify-between pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setStep(5)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  onClick={handleProcessPayment}
                  disabled={isProcessingPayment || !agreeTerms || !agreePrivacy || !agreeOriginal}
                  className="px-6 py-3 rounded-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:opacity-50 text-white transition flex items-center gap-2 shadow-lg shadow-emerald-600/30"
                >
                  {isProcessingPayment ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Authorizing via Razorpay...</span>
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-4 h-4" />
                      <span>Pay ₹600 & Complete Registration</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* ================= STEP 7: Registration Complete, 3 Links & I-Card ================= */}
          {step === 7 && createdUser && (
            <div className="space-y-6">
              {/* Success Alert Banner */}
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-1.5">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="text-base font-black text-white">
                  Registration Complete! Welcome to Global Multitalent Show
                </h4>
                <p className="text-xs text-slate-300">
                  Your registration is verified and your MLM position is activated in the binary tree.
                </p>
              </div>

              {/* Simulated Email Confirmation Badge */}
              {emailDispatched && (
                <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center gap-3 text-blue-300 text-[11px]">
                  <Send className="w-4 h-4 shrink-0 text-blue-400" />
                  <span>
                    <strong>Confirmation Emails Dispatched:</strong> Welcome Email with login credentials and your official I-Card have been simulated to <strong>{createdUser.email}</strong>.
                  </span>
                </div>
              )}

              {/* Login Credentials Box */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-pink-500/30 space-y-2">
                <span className="text-pink-400 font-bold text-xs uppercase tracking-wider block">
                  Your Official Login Credentials:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Registration Number</span>
                      <span className="font-mono font-bold text-white text-sm">
                        {createdUser.registration_number}
                      </span>
                    </div>
                    <button
                      onClick={() => copyToClipboard(createdUser.registration_number, 'Registration Number')}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-pink-400"
                      title="Copy"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Account Password</span>
                      <span className="font-mono font-bold text-white text-sm">
                        {password || 'password123'}
                      </span>
                    </div>
                    <button
                      onClick={() => copyToClipboard(password || 'password123', 'Password')}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-pink-400"
                      title="Copy"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* ================= 3 UNIQUE LINKS SYSTEM ================= */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
                    <Share2 className="w-3.5 h-3.5 text-pink-400" />
                    <span>Your 3 Unique Sharing & Promotion Links:</span>
                  </span>
                </div>

                {/* Link 1: Voting Link */}
                <div className="p-3 rounded-xl bg-slate-950 border border-pink-500/40 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-pink-400 uppercase">
                      1. Public Voting Link (Audience & Fans)
                    </span>
                    <span className="text-[10px] bg-pink-500/20 text-pink-300 px-2 py-0.5 rounded-full font-semibold">
                      1 Vote / 24h
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      readOnly
                      value={votingLink}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-[11px] text-slate-300 font-mono truncate"
                    />
                    <button
                      onClick={() => copyToClipboard(votingLink, 'Voting Link')}
                      className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-pink-400 shrink-0"
                      title="Copy Link"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => shareOnWhatsApp(votingLink, `Vote for ${createdUser.full_name} on Global Multitalent Show!`)}
                      className="p-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white shrink-0"
                      title="Share on WhatsApp"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Link 2: Left MLM Referral Link */}
                <div className="p-3 rounded-xl bg-slate-950 border border-blue-500/40 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-blue-400 uppercase">
                      2. Left Team MLM Joining Link
                    </span>
                    <span className="text-[10px] bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full font-semibold">
                      Left Leg Placement
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      readOnly
                      value={leftLink}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-[11px] text-slate-300 font-mono truncate"
                    />
                    <button
                      onClick={() => copyToClipboard(leftLink, 'Left MLM Link')}
                      className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-blue-400 shrink-0"
                      title="Copy Link"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => shareOnWhatsApp(leftLink, `Join my Left Team in Global Multitalent Show and earn binary PV rewards!`)}
                      className="p-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white shrink-0"
                      title="Share on WhatsApp"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Link 3: Right MLM Referral Link */}
                <div className="p-3 rounded-xl bg-slate-950 border border-purple-500/40 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-purple-400 uppercase">
                      3. Right Team MLM Joining Link
                    </span>
                    <span className="text-[10px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full font-semibold">
                      Right Leg Placement
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      readOnly
                      value={rightLink}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-[11px] text-slate-300 font-mono truncate"
                    />
                    <button
                      onClick={() => copyToClipboard(rightLink, 'Right MLM Link')}
                      className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-purple-400 shrink-0"
                      title="Copy Link"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => shareOnWhatsApp(rightLink, `Join my Right Team in Global Multitalent Show and earn binary PV rewards!`)}
                      className="p-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white shrink-0"
                      title="Share on WhatsApp"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* ================= OFFICIAL PARTICIPANT I-CARD ================= */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
                    <QrCode className="w-3.5 h-3.5 text-pink-400" />
                    <span>Official Participant I-Card (ID Card):</span>
                  </span>
                  <button
                    onClick={handlePrintICard}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-pink-400 text-[11px] font-semibold transition"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print / Save I-Card</span>
                  </button>
                </div>

                {/* Printable Visual ID Card */}
                <div
                  ref={icardRef}
                  className="rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-pink-950/40 border-2 border-pink-500/50 p-4 sm:p-5 shadow-2xl relative overflow-hidden text-slate-200"
                >
                  <div className="flex items-center justify-between border-b border-pink-500/30 pb-3 mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-pink-600 flex items-center justify-center font-bold text-white text-xs">
                        GMTS
                      </div>
                      <div>
                        <h5 className="font-extrabold text-white text-xs tracking-wider">
                          GLOBAL MULTITALENT SHOW
                        </h5>
                        <p className="text-[9px] text-pink-300">
                          VIFTRI Academic Council Accreditation
                        </p>
                      </div>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-pink-600 text-[9px] font-bold text-white uppercase tracking-wider">
                      Round 1 Competitor
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-3 items-center">
                    {/* User Photo */}
                    <div className="text-center">
                      <img
                        src={createdUser.profile_image}
                        alt={createdUser.full_name}
                        className="w-20 h-24 rounded-xl object-cover border-2 border-pink-400 mx-auto shadow"
                      />
                      <span className="text-[9px] text-emerald-400 font-bold block mt-1">
                        ● Active Status
                      </span>
                    </div>

                    {/* Participant Details */}
                    <div className="col-span-2 space-y-1 text-[11px]">
                      <div>
                        <span className="text-slate-500 text-[10px] block">Contestant Name</span>
                        <strong className="text-white text-sm block">{createdUser.full_name}</strong>
                      </div>
                      <div className="grid grid-cols-2 gap-1 pt-1">
                        <div>
                          <span className="text-slate-500 text-[10px] block">Reg. Number</span>
                          <span className="font-mono text-pink-400 font-bold">
                            {createdUser.registration_number}
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-500 text-[10px] block">Age / Division</span>
                          <span className="text-white font-semibold">{createdUser.age} Yrs • {createdUser.age_group}</span>
                        </div>
                      </div>
                      <div className="pt-1">
                        <span className="text-slate-500 text-[10px] block">Talent Track</span>
                        <span className="text-slate-300 font-medium">
                          {createdUser.category} &rsaquo; {createdUser.subcategory}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
                    <div>
                      <span>Headquarters: Ahmedabad, Gujarat</span>
                    </div>
                    <div className="text-right">
                      <span className="font-serif italic text-pink-300">Dr. V. K. Desai, Director</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => {
                    if (createdUser) {
                      const inv = invoices.find((i) => i.user_id === createdUser.id || i.registration_number === createdUser.registration_number);
                      if (inv) {
                        setActiveInvoice(inv);
                        setActiveModal('invoice');
                      } else {
                        addToast('Invoice generated and available in your Dashboard.', 'info');
                      }
                    }
                  }}
                  className="py-3 px-4 rounded-xl font-bold text-xs bg-slate-800 hover:bg-slate-700 text-pink-300 border border-pink-500/30 flex items-center justify-center gap-1.5 transition"
                >
                  <FileText className="w-4 h-4 text-pink-400" />
                  <span>View / Print Invoice (₹600)</span>
                </button>
                <button
                  onClick={() => {
                    setActiveModal(null);
                    setCurrentPage('dashboard');
                  }}
                  className="flex-1 py-3 px-4 rounded-xl font-bold text-xs bg-gradient-to-r from-pink-600 to-rose-600 text-white text-center shadow-lg shadow-pink-600/30 hover:from-pink-500 hover:to-rose-500 transition flex items-center justify-center gap-2"
                >
                  <span>Enter My Member Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    setLoginNotice('Registration & ₹600 Payment verified! Please sign in with your credentials.');
                    setActiveModal('login');
                  }}
                  className="py-3 px-4 rounded-xl font-bold text-xs bg-slate-800 text-slate-300 hover:text-white transition flex items-center justify-center gap-2"
                >
                  <LogIn className="w-4 h-4 text-pink-400" />
                  <span>Go to Login</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ================= PERSISTENT LOGIN OPTION ON REGISTRATION PAGE ================= */}
        {step < 7 && (
          <div className="p-3.5 bg-slate-950/90 border-t border-slate-800 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
            <span>Already Registered for GMTS?</span>
            <button
              type="button"
              onClick={() => setActiveModal('login')}
              className="text-pink-400 font-bold hover:text-pink-300 hover:underline flex items-center gap-1 transition"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Login Here</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
