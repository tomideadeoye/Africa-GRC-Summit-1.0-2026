"use client";

import { useState, useCallback, useMemo } from "react";
import {
  Check,
  Plus,
  Minus,
  CreditCard,
  Building2,
  ChevronDown,
  Sparkles,
  Shield,
  Users,
  Star,
} from "lucide-react";

/* ──────────────────────────────────────────────
   TYPES
   ────────────────────────────────────────────── */
interface Delegate {
  fullName: string;
  jobTitle: string;
  email: string;
  mobile: string;
}

interface CompanyDetails {
  companyName: string;
  companyAddress: string;
  city: string;
  country: string;
  officePhone: string;
  officeMobile: string;
}

type PassType = "conference" | "full" | "industry" | null;
type PaymentMethod = "credit" | "bank" | null;

/* ──────────────────────────────────────────────
   CONSTANTS
   ────────────────────────────────────────────── */
const PASSES = [
  {
    id: "conference" as const,
    name: "Conference Pass",
    price: 899,
    icon: <Users size={24} />,
    color: "from-[#d4af37] to-[#b4941f]",
    features: [
      "Access to all plenary sessions, keynotes, panel discussions, closed-door briefings, and networking sessions",
      "Access to Free Workshops (No separate registration needed, First Come First Served)",
      "Connect with industry peers from across Africa",
      "Enjoy access to all 3 networking breaks",
      "Access all conference content, including speaker presentations, post-event",
      "Receive an attendance certificate after the summit",
    ],
  },
  {
    id: "full" as const,
    name: "Full Summit Pass",
    price: 1699,
    icon: <Star size={24} />,
    color: "from-[#fcd34d] to-[#d4af37]",
    popular: true,
    features: [
      "Conference Delegate Pass + Access to 2 Master Classes",
      "Access to all plenary sessions, keynotes, panel discussions, free workshops, networking sessions and exhibition areas",
      "Access pass to Certified Master Classes",
      "Enjoy access to all networking breaks and refreshments",
      "Access all conference content, including speaker presentations, post-event",
      "Receive an attendance certificate after the event",
      "Plus 2 Masterclass Certificates",
    ],
  },
  {
    id: "industry" as const,
    name: "Industry Pass",
    price: 1899,
    icon: <Shield size={24} />,
    color: "from-[#d4af37] to-[#92711a]",
    subtitle: "(Solution Providers, Consultants)",
    features: [
      "Access to all plenary sessions, keynotes, panel discussions, closed-door briefings, networking sessions, and exhibition areas",
      "Network with C-level attendees, decision makers from your target industries",
      "Access to Free Workshops (No separate registration needed, First Come First Served)",
      "Enjoy access to all 3 networking breaks",
      "Access all conference content, including speaker presentations, post-event",
    ],
  },
];

const COUNTRIES = [
  "Nigeria",
  "South Africa",
  "Kenya",
  "Ghana",
  "Egypt",
  "Morocco",
  "Tanzania",
  "Ethiopia",
  "Rwanda",
  "Ivory Coast",
  "Senegal",
  "Uganda",
  "Cameroon",
  "Angola",
  "Mozambique",
  "United Kingdom",
  "United States",
  "United Arab Emirates",
  "Saudi Arabia",
  "India",
  "Other",
];

const REFERRAL_SOURCES = [
  "Select",
  "Social Media",
  "LinkedIn",
  "Email Campaign",
  "Colleague / Word of Mouth",
  "Company Nomination",
  "Search Engine",
  "Previous GRC Event",
  "Partner Organization",
  "Other",
];

const VAT_RATE = 0.075; // 7.5% VAT
const GROUP_DISCOUNT_THRESHOLD = 3;
const GROUP_DISCOUNT_RATE = 0.25; // 25%

/* ──────────────────────────────────────────────
   COMPONENT
   ────────────────────────────────────────────── */
export default function Registration() {
  // --- State ---
  const [selectedPass, setSelectedPass] = useState<PassType>(null);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState("");
  const [numDelegates, setNumDelegates] = useState(1);
  const [delegates, setDelegates] = useState<Delegate[]>([
    { fullName: "", jobTitle: "", email: "", mobile: "" },
  ]);
  const [company, setCompany] = useState<CompanyDetails>({
    companyName: "",
    companyAddress: "",
    city: "",
    country: "Nigeria",
    officePhone: "",
    officeMobile: "",
  });
  const [referralSource, setReferralSource] = useState("Select");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(null);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // --- Computed ---
  const passPrice = useMemo(() => {
    const pass = PASSES.find((p) => p.id === selectedPass);
    return pass?.price ?? 0;
  }, [selectedPass]);

  const feePerDelegate = passPrice;
  const subtotal = feePerDelegate * numDelegates;
  const discountApplied = numDelegates >= GROUP_DISCOUNT_THRESHOLD;
  const discountAmount = discountApplied
    ? subtotal * GROUP_DISCOUNT_RATE
    : 0;
  const afterDiscount = subtotal - discountAmount;
  const vatAmount = afterDiscount * VAT_RATE;
  const totalFee = afterDiscount + vatAmount;

  // --- Delegate handlers ---
  const handleDelegateChange = useCallback(
    (index: number, field: keyof Delegate, value: string) => {
      setDelegates((prev) => {
        const updated = [...prev];
        updated[index] = { ...updated[index], [field]: value };
        return updated;
      });
    },
    []
  );

  const handleNumDelegatesChange = useCallback(
    (newCount: number) => {
      if (newCount < 1 || newCount > 20) return;
      setNumDelegates(newCount);
      setDelegates((prev) => {
        if (newCount > prev.length) {
          return [
            ...prev,
            ...Array.from({ length: newCount - prev.length }, () => ({
              fullName: "",
              jobTitle: "",
              email: "",
              mobile: "",
            })),
          ];
        }
        return prev.slice(0, newCount);
      });
    },
    []
  );

  const handleCompanyChange = useCallback(
    (field: keyof CompanyDetails, value: string) => {
      setCompany((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const handleApplyPromo = useCallback(() => {
    if (!promoCode.trim()) {
      setPromoError("Please enter a promo code");
      return;
    }
    // Placeholder promo logic
    if (promoCode.toUpperCase() === "GRCSUMMIT2026") {
      setPromoApplied(true);
      setPromoError("");
    } else {
      setPromoError("Invalid promo code");
      setPromoApplied(false);
    }
  }, [promoCode]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!selectedPass || !paymentMethod || !acceptTerms) return;
      setIsSubmitting(true);
      // Simulate submission
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitted(true);
      }, 2000);
    },
    [selectedPass, paymentMethod, acceptTerms]
  );

  // --- Success screen ---
  if (submitted) {
    return (
      <section className="min-h-screen bg-[#0f172a] flex items-center justify-center pt-20 px-4">
        <div className="max-w-lg w-full text-center animate-fade-in-up">
          <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-gradient-to-br from-[#d4af37] to-[#fcd34d] flex items-center justify-center shadow-[0_0_60px_rgba(212,175,55,0.3)]">
            <Check size={40} className="text-white" />
          </div>
          <h1 className="text-4xl font-black text-white mb-4">
            Registration Submitted!
          </h1>
          <p className="text-slate-400 text-lg mb-8 leading-relaxed">
            Your registration for the{" "}
            <span className="text-[#d4af37] font-semibold">
              Africa GRC Summit 2026
            </span>{" "}
            has been received. A confirmation email will be sent to your
            registered address shortly.
          </p>
          <a
            href="/"
            className="glow-btn inline-flex items-center justify-center px-8 py-3 text-base font-bold uppercase tracking-wider rounded-lg"
          >
            Return to Home
          </a>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#0b1120] via-[#0f172a] to-[#0b1120] pt-28 pb-20 relative overflow-hidden">
      {/* Background Glow Effects */}
      <div className="absolute -top-[30%] -left-[15%] w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(212,175,55,0.08)_0%,transparent_70%)] blur-[80px] pointer-events-none" />
      <div className="absolute -bottom-[20%] -right-[10%] w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(212,175,55,0.06)_0%,transparent_70%)] blur-[80px] pointer-events-none" />

      <div className="container px-4 md:px-6 mx-auto max-w-6xl relative z-10">
        {/* ── Header ── */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/20 mb-6">
            <Sparkles size={14} className="text-[#d4af37]" />
            <span className="text-xs font-bold uppercase tracking-[3px] text-[#d4af37]">
              Registration
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight">
            Africa <span className="text-gradient">GRC</span> Summit — Registration
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Join the 1st Annual Africa GRC Summit 2026. Choose Your Perfect Way
            to Participate!
          </p>
        </div>

        {/* ── Pass Selection ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 animate-fade-in-up">
          {PASSES.map((pass) => {
            const isSelected = selectedPass === pass.id;
            return (
              <div
                key={pass.id}
                onClick={() => setSelectedPass(pass.id)}
                className={`relative cursor-pointer rounded-2xl p-[1px] transition-all duration-300 ${
                  isSelected
                    ? "scale-[1.02] shadow-[0_0_40px_rgba(212,175,55,0.25)]"
                    : "hover:scale-[1.01] hover:shadow-[0_0_20px_rgba(212,175,55,0.1)]"
                }`}
                style={{
                  background: isSelected
                    ? "linear-gradient(135deg, #d4af37, #fcd34d, #d4af37)"
                    : "linear-gradient(135deg, rgba(212,175,55,0.3), rgba(212,175,55,0.1))",
                }}
              >
                {/* Popular Badge */}
                {pass.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                    <span className="px-4 py-1 text-[10px] font-black uppercase tracking-[2px] rounded-full bg-gradient-to-r from-[#d4af37] to-[#fcd34d] text-[#0f172a] shadow-lg">
                      Most Popular
                    </span>
                  </div>
                )}

                <div
                  className={`rounded-2xl p-6 h-full flex flex-col ${
                    isSelected ? "bg-[#0f172a]" : "bg-[#0f172a]/95"
                  }`}
                >
                  {/* Pass Header */}
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className={`w-10 h-10 rounded-xl bg-gradient-to-br ${pass.color} flex items-center justify-center text-white shadow-lg`}
                    >
                      {pass.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">
                        {pass.name}
                      </h3>
                      {pass.subtitle && (
                        <p className="text-xs text-slate-500">{pass.subtitle}</p>
                      )}
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mb-5 mt-3">
                    <span className="text-3xl font-black text-[#d4af37]">
                      USD {pass.price.toLocaleString()}
                    </span>
                    <span className="text-slate-500 text-sm ml-1">+ VAT</span>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 flex-1 mb-6">
                    {pass.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <Check
                          size={14}
                          className="text-[#d4af37] mt-0.5 shrink-0"
                        />
                        <span className="text-slate-400 text-sm leading-snug">
                          {feat}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Select Button */}
                  <button
                    type="button"
                    className={`w-full py-3 rounded-xl font-bold text-sm uppercase tracking-wider transition-all ${
                      isSelected
                        ? "bg-gradient-to-r from-[#d4af37] to-[#fcd34d] text-[#0f172a] shadow-[0_4px_20px_rgba(212,175,55,0.3)]"
                        : "bg-white/5 text-white border border-white/10 hover:bg-white/10"
                    }`}
                  >
                    {isSelected ? "✓ Selected" : "Select"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Registration Form ── */}
        <form onSubmit={handleSubmit}>
          <div className="space-y-8">
            {/* Form Prompt */}
            {!selectedPass && (
              <div className="text-center py-12 rounded-2xl border border-dashed border-[#d4af37]/30 bg-[#d4af37]/5">
                <p className="text-slate-400 text-lg">
                  Please select a package above to continue with your
                  registration.
                </p>
              </div>
            )}

            {selectedPass && (
              <>
                {/* ━━ Package Details ━━ */}
                <SectionCard title="Package Details" icon={<Sparkles size={18} />}>
                  {/* Promo Code */}
                  <div className="mb-6">
                    <label className="block text-sm text-slate-400 mb-2">
                      Enter your promo code and click &quot;Apply Code&quot; to activate
                      it.
                    </label>
                    <div className="flex gap-3">
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="Enter Promo Code"
                        className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-[#d4af37]/50 focus:ring-1 focus:ring-[#d4af37]/30 transition-all"
                      />
                      <button
                        type="button"
                        onClick={handleApplyPromo}
                        className="px-6 py-3 bg-gradient-to-r from-[#d4af37] to-[#b4941f] text-white font-bold text-sm rounded-xl hover:shadow-[0_4px_20px_rgba(212,175,55,0.3)] transition-all uppercase tracking-wider"
                      >
                        Apply Code
                      </button>
                    </div>
                    {promoApplied && (
                      <p className="text-emerald-400 text-sm mt-2 flex items-center gap-1">
                        <Check size={14} /> Promo code applied successfully!
                      </p>
                    )}
                    {promoError && (
                      <p className="text-red-400 text-sm mt-2">{promoError}</p>
                    )}
                  </div>

                  {/* Group Discount Notice */}
                  <div className="bg-[#d4af37]/10 border border-[#d4af37]/20 rounded-xl px-4 py-3 mb-6">
                    <p className="text-[#d4af37] font-semibold text-sm">
                      🎉 Group discount of 25% available for 3 or more delegates.
                    </p>
                  </div>

                  {/* Fee Breakdown */}
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {/* Number of Delegates */}
                    <div>
                      <label className="block text-xs text-slate-500 uppercase tracking-wider mb-2 font-semibold">
                        Number of delegates <span className="text-red-400">*</span>
                      </label>
                      <div className="flex items-center rounded-xl bg-white/5 border border-white/10 overflow-hidden">
                        <button
                          type="button"
                          onClick={() =>
                            handleNumDelegatesChange(numDelegates - 1)
                          }
                          className="px-3 py-3 text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="flex-1 text-center text-white font-bold">
                          {numDelegates}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            handleNumDelegatesChange(numDelegates + 1)
                          }
                          className="px-3 py-3 text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                    <FeeBox label="Fee (USD)" value={`$${feePerDelegate.toLocaleString()}`} />
                    <FeeBox
                      label="Discount (USD)"
                      value={
                        discountApplied
                          ? `-$${discountAmount.toLocaleString()}`
                          : "—"
                      }
                      highlight={discountApplied}
                    />
                    <FeeBox label="VAT 7.5%" value={`$${vatAmount.toFixed(2)}`} />
                    <FeeBox
                      label="Total Fee (USD)"
                      value={`$${totalFee.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                      highlight
                    />
                  </div>
                </SectionCard>

                {/* ━━ Delegate Details ━━ */}
                <SectionCard title="Delegate Details" icon={<Users size={18} />}>
                  <div className="space-y-6">
                    {delegates.map((delegate, idx) => (
                      <div key={idx}>
                        <p className="text-xs text-[#d4af37] font-bold uppercase tracking-widest mb-3">
                          {idx + 1}) Delegate {idx + 1}
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                          <FormInput
                            label="Full Name"
                            required
                            placeholder="Enter full name"
                            value={delegate.fullName}
                            onChange={(v) =>
                              handleDelegateChange(idx, "fullName", v)
                            }
                          />
                          <FormInput
                            label="Job Title"
                            required
                            placeholder="Enter job title"
                            value={delegate.jobTitle}
                            onChange={(v) =>
                              handleDelegateChange(idx, "jobTitle", v)
                            }
                          />
                          <FormInput
                            label="Email Address"
                            required
                            type="email"
                            placeholder="Enter email address"
                            value={delegate.email}
                            onChange={(v) =>
                              handleDelegateChange(idx, "email", v)
                            }
                          />
                          <FormInput
                            label="Mobile Number"
                            required
                            type="tel"
                            placeholder="Enter mobile number"
                            value={delegate.mobile}
                            onChange={(v) =>
                              handleDelegateChange(idx, "mobile", v)
                            }
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </SectionCard>

                {/* ━━ Company Details ━━ */}
                <SectionCard title="Company Details" icon={<Building2 size={18} />}>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <FormInput
                      label="Company Name"
                      required
                      placeholder="Enter company name"
                      value={company.companyName}
                      onChange={(v) => handleCompanyChange("companyName", v)}
                    />
                    <FormInput
                      label="Company Address"
                      required
                      placeholder="Enter Company Address"
                      value={company.companyAddress}
                      onChange={(v) => handleCompanyChange("companyAddress", v)}
                    />
                    <FormInput
                      label="City"
                      required
                      placeholder="Enter city"
                      value={company.city}
                      onChange={(v) => handleCompanyChange("city", v)}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div>
                      <label className="block text-xs text-slate-500 uppercase tracking-wider mb-2 font-semibold">
                        Country <span className="text-red-400">*</span>
                      </label>
                      <div className="relative">
                        <select
                          value={company.country}
                          onChange={(e) =>
                            handleCompanyChange("country", e.target.value)
                          }
                          className="w-full appearance-none bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#d4af37]/50 focus:ring-1 focus:ring-[#d4af37]/30 transition-all cursor-pointer"
                        >
                          {COUNTRIES.map((c) => (
                            <option key={c} value={c} className="bg-[#0f172a]">
                              {c}
                            </option>
                          ))}
                        </select>
                        <ChevronDown
                          size={16}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
                        />
                      </div>
                    </div>
                    <FormInput
                      label="Office Phone"
                      required
                      type="tel"
                      placeholder="Enter Office Phone"
                      value={company.officePhone}
                      onChange={(v) => handleCompanyChange("officePhone", v)}
                    />
                    <FormInput
                      label="Office Mobile"
                      type="tel"
                      placeholder="Enter office mobile"
                      value={company.officeMobile}
                      onChange={(v) => handleCompanyChange("officeMobile", v)}
                    />
                  </div>

                  {/* Referral Source */}
                  <div className="max-w-sm">
                    <label className="block text-xs text-slate-500 uppercase tracking-wider mb-2 font-semibold">
                      How did you hear about us?
                    </label>
                    <div className="relative">
                      <select
                        value={referralSource}
                        onChange={(e) => setReferralSource(e.target.value)}
                        className="w-full appearance-none bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#d4af37]/50 focus:ring-1 focus:ring-[#d4af37]/30 transition-all cursor-pointer"
                      >
                        {REFERRAL_SOURCES.map((s) => (
                          <option key={s} value={s} className="bg-[#0f172a]">
                            {s}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        size={16}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
                      />
                    </div>
                  </div>
                </SectionCard>

                {/* ━━ Payment Method ━━ */}
                <SectionCard title="Payment Method" icon={<CreditCard size={18} />}>
                  <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                    For credit card payments, confirmation email will be sent
                    after the payment is received. For bank transfers or direct
                    deposits, confirmation will be provided upon receiving proof
                    of payment and confirmation of funds. For any inquiries,
                    please contact us at{" "}
                    <a
                      href="mailto:info@africagrcsummit.com"
                      className="text-[#d4af37] hover:underline font-medium"
                    >
                      info@africagrcsummit.com
                    </a>
                  </p>

                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-4 font-semibold">
                    Select the payment method{" "}
                    <span className="text-red-400">*</span>
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    <PaymentOption
                      selected={paymentMethod === "credit"}
                      onClick={() => setPaymentMethod("credit")}
                      icon={<CreditCard size={20} />}
                      title="Credit / Debit Card"
                      description="Register now and pay by credit card"
                    />
                    <PaymentOption
                      selected={paymentMethod === "bank"}
                      onClick={() => setPaymentMethod("bank")}
                      icon={<Building2 size={20} />}
                      title="Bank Transfer"
                      description="Register now and pay by bank transfer"
                    />
                  </div>

                  {/* Card Logos */}
                  {paymentMethod === "credit" && (
                    <div className="flex items-center gap-3 mb-6 animate-fade-in">
                      <div className="px-4 py-2 bg-white/5 rounded-lg border border-white/10 flex items-center gap-2">
                        <span className="text-blue-400 font-bold text-sm">VISA</span>
                      </div>
                      <div className="px-4 py-2 bg-white/5 rounded-lg border border-white/10 flex items-center gap-2">
                        <span className="text-red-400 font-bold text-sm">Mastercard</span>
                      </div>
                    </div>
                  )}

                  {/* Terms */}
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <div
                      className={`w-5 h-5 mt-0.5 rounded border-2 flex items-center justify-center shrink-0 transition-all ${
                        acceptTerms
                          ? "bg-[#d4af37] border-[#d4af37]"
                          : "border-slate-600 group-hover:border-[#d4af37]/50"
                      }`}
                      onClick={() => setAcceptTerms(!acceptTerms)}
                    >
                      {acceptTerms && (
                        <Check size={12} className="text-[#0f172a]" />
                      )}
                    </div>
                    <span className="text-slate-400 text-sm leading-relaxed">
                      I accept the terms & conditions of Registration and Payment
                      Policy.{" "}
                      <a
                        href="#"
                        className="text-[#d4af37] hover:underline font-medium"
                      >
                        Privacy Policy
                      </a>
                    </span>
                  </label>
                </SectionCard>

                {/* ━━ Submit ━━ */}
                <div className="flex justify-center pt-4">
                  <button
                    type="submit"
                    disabled={
                      !selectedPass ||
                      !paymentMethod ||
                      !acceptTerms ||
                      isSubmitting
                    }
                    className={`px-16 py-4 rounded-xl font-bold text-base uppercase tracking-wider transition-all ${
                      !selectedPass || !paymentMethod || !acceptTerms
                        ? "bg-slate-700 text-slate-500 cursor-not-allowed"
                        : "bg-gradient-to-r from-[#d4af37] to-[#fcd34d] text-[#0f172a] shadow-[0_4px_30px_rgba(212,175,55,0.3)] hover:shadow-[0_6px_40px_rgba(212,175,55,0.5)] hover:-translate-y-0.5"
                    }`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <svg
                          className="animate-spin h-5 w-5"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                          />
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      "Register"
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   SUB-COMPONENTS
   ────────────────────────────────────────────── */

function SectionCard({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/10 overflow-hidden animate-fade-in-up">
      <div className="flex items-center gap-2.5 px-6 py-4 bg-gradient-to-r from-[#0f172a] to-[#1e293b] border-b border-white/10">
        <span className="text-[#d4af37]">{icon}</span>
        <h2 className="text-lg font-bold text-white">{title}</h2>
      </div>
      <div className="p-6 bg-[#0b1120]/80">{children}</div>
    </div>
  );
}

function FormInput({
  label,
  required,
  type = "text",
  placeholder,
  value,
  onChange,
}: {
  label: string;
  required?: boolean;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="block text-xs text-slate-500 uppercase tracking-wider mb-2 font-semibold">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <input
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-[#d4af37]/50 focus:ring-1 focus:ring-[#d4af37]/30 transition-all"
      />
    </div>
  );
}

function FeeBox({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs text-slate-500 uppercase tracking-wider mb-2 font-semibold">
        {label}
      </label>
      <div
        className={`px-4 py-3 rounded-xl text-center font-bold ${
          highlight
            ? "bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#d4af37]"
            : "bg-white/5 border border-white/10 text-white"
        }`}
      >
        {value}
      </div>
    </div>
  );
}

function PaymentOption({
  selected,
  onClick,
  icon,
  title,
  description,
}: {
  selected: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer rounded-xl p-5 border-2 transition-all flex items-start gap-4 ${
        selected
          ? "border-[#d4af37] bg-[#d4af37]/10 shadow-[0_0_20px_rgba(212,175,55,0.1)]"
          : "border-white/10 bg-white/5 hover:border-white/20"
      }`}
    >
      {/* Radio */}
      <div
        className={`w-5 h-5 mt-0.5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
          selected ? "border-[#d4af37]" : "border-slate-600"
        }`}
      >
        {selected && (
          <div className="w-2.5 h-2.5 rounded-full bg-[#d4af37]" />
        )}
      </div>

      {/* Content */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className={selected ? "text-[#d4af37]" : "text-slate-400"}>
            {icon}
          </span>
          <span className="text-white font-bold text-sm">{title}</span>
        </div>
        <p className="text-slate-500 text-sm">{description}</p>
      </div>
    </div>
  );
}
