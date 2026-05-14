import { motion, AnimatePresence } from "motion/react";
import React, { useState, useCallback, useMemo } from "react";
import { 
  FileText, 
  TrendingUp, 
  ShieldCheck, 
  AlertTriangle,
  RotateCcw,
  Wrench,
  CheckCircle2,
  HelpCircle,
  Star,
  Users,
  ArrowRight,
  Phone as PhoneIcon,
  ShieldAlert,
  Zap,
  X,
  User as UserIcon,
  CreditCard,
  Calendar as CalendarIcon,
  MapPin,
  Lock as LockIcon
} from "lucide-react";
import "./CibilScorePanel.css";

// Checkout Modal Component
const CheckoutModal = React.memo(({ isOpen, onClose, isProcessing, isSubmitted, onSubmit }) => (
  <AnimatePresence>
    {isOpen && (
      <div className="cibil-modal-overlay">
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="cibil-modal-backdrop"
          onClick={() => { if (!isProcessing && !isSubmitted) onClose(); }}
        />
        <motion.div 
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="cibil-modal-sheet"
        >
          {!isSubmitted ? (
            <>
              <div className="flex justify-between items-center mb-6">
                <h3 className="cibil-modal-title" style={{ marginBottom: 0 }}>Confirm Details</h3>
                <button onClick={onClose} disabled={isProcessing} className="p-2 hover:bg-gray-50 rounded-full transition-colors border-none bg-transparent cursor-pointer">
                  <X size={18} />
                </button>
              </div>

              {isProcessing ? (
                <div style={{ padding: '48px 0', textAlign: 'center' }}>
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    style={{ width: 48, height: 48, border: '4px solid var(--cibil-orange)', borderTopColor: 'transparent', borderRadius: '50%', margin: '0 auto 24px' }}
                  />
                  <h4 className="font-bold text-xl mb-2">Processing Payment</h4>
                  <p className="text-sm text-gray-500">Securely connecting to portal...</p>
                </div>
              ) : (
                <form onSubmit={onSubmit}>
                  <div className="cibil-input-wrap">
                    <UserIcon className="cibil-input-icon" size={16} />
                    <input required type="text" placeholder="Customer Name (as per PAN)" className="cibil-input" />
                  </div>
                  <div className="cibil-input-wrap">
                    <PhoneIcon className="cibil-input-icon" size={16} />
                    <input required type="tel" pattern="[0-9]{10}" maxLength={10} placeholder="Mobile Number" className="cibil-input" />
                  </div>
                  <div className="cibil-input-wrap">
                    <CreditCard className="cibil-input-icon" size={16} />
                    <input required type="text" pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}" maxLength={10} placeholder="Pancard Number" className="cibil-input uppercase" />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
                    <div className="cibil-input-wrap" style={{ marginBottom: 0 }}>
                      <CalendarIcon className="cibil-input-icon" size={16} />
                      <input required type="date" className="cibil-input" />
                    </div>
                    <select required className="cibil-input" style={{ paddingLeft: 16 }}>
                      <option value="">Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div style={{ padding: 16, background: '#fff7ed', borderRadius: 20, border: '1px solid #ffedd5', display: 'flex', gap: 12, marginBottom: 24 }}>
                    <input required type="checkbox" id="consent-check" style={{ width: 16, height: 16, marginTop: 2 }} />
                    <label htmlFor="consent-check" style={{ fontSize: 10, color: '#9a3412', lineHeight: 1.4, fontWeight: 500 }}>
                      I hereby appoint FinExprt as my authorized representative to receive my Credit Information from TransUnion CIBIL on my behalf.
                    </label>
                  </div>

                  <button type="submit" className="cibil-btn-main">
                    Pay ₹199 & Get Report <ArrowRight size={20} />
                  </button>
                  
                  <div style={{ textAlign: 'center', fontSize: 10, color: '#9ca3af', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1, marginTop: 16 }}>
                    <LockIcon size={10} style={{ verticalAlign: 'middle', marginRight: 4 }} /> 256-bit Secure Transaction
                  </div>
                </form>
              )}
            </>
          ) : (
            <div style={{ padding: '40px 0', textAlign: 'center' }}>
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} style={{ width: 80, height: 80, background: '#dcfce7', color: '#16a34a', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                <CheckCircle2 size={40} />
              </motion.div>
              <h3 className="cibil-modal-title">Thank You!</h3>
              <p className="cibil-feature-desc" style={{ marginBottom: 32 }}>Your request has been received successfuly. Our experts are gathering your credit insights.</p>
              <div className="cibil-success-card">
                <div style={{ fontSize: 10, fontWeight: 'bold', opacity: 0.5, textTransform: 'uppercase', marginBottom: 4 }}>Estimated Delivery</div>
                <div className="cibil-success-hero">24 - 48 Hours</div>
              </div>
              <button onClick={onClose} className="cibil-btn-blue">Back to Home</button>
            </div>
          )}
        </motion.div>
      </div>
    )}
  </AnimatePresence>
));

// CallBack Modal Component
const CallBackModal = React.memo(({ isOpen, onClose, isProcessing, isSubmitted, onSubmit }) => (
  <AnimatePresence>
    {isOpen && (
      <div className="cibil-modal-overlay">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="cibil-modal-backdrop" onClick={() => { if (!isProcessing && !isSubmitted) onClose(); }} />
        <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }} className="cibil-modal-sheet">
          {!isSubmitted ? (
            <>
              <div className="flex justify-between items-center mb-6">
                <h3 className="cibil-modal-title" style={{ marginBottom: 0 }}>Expert Call Back</h3>
                <button onClick={onClose} disabled={isProcessing} className="p-2 hover:bg-gray-50 rounded-full transition-colors border-none bg-transparent cursor-pointer">
                  <X size={18} />
                </button>
              </div>

              {isProcessing ? (
                <div style={{ padding: '48px 0', textAlign: 'center' }}>
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} style={{ width: 48, height: 48, border: '4px solid var(--cibil-orange)', borderTopColor: 'transparent', borderRadius: '50%', margin: '0 auto 24px' }} />
                  <h4 className="font-bold text-xl mb-2">Sending Request</h4>
                  <p className="text-sm text-gray-500">Connecting you with our specialists...</p>
                </div>
              ) : (
                <form onSubmit={onSubmit}>
                  <div className="cibil-input-wrap">
                    <UserIcon className="cibil-input-icon" size={16} />
                    <input required type="text" placeholder="Your Full Name" className="cibil-input" />
                  </div>
                  <div className="cibil-input-wrap">
                    <PhoneIcon className="cibil-input-icon" size={16} />
                    <input required type="tel" pattern="[0-9]{10}" maxLength={10} placeholder="Phone Number" className="cibil-input" />
                  </div>
                  <div className="cibil-input-wrap">
                    <MapPin className="cibil-input-icon" size={16} />
                    <input required type="text" pattern="[0-9]{6}" maxLength={6} placeholder="Pincode" className="cibil-input" />
                  </div>
                  <button type="submit" className="cibil-btn-blue" style={{ height: 56 }}>
                    Request Call Back <ArrowRight size={20} />
                  </button>
                  <p style={{ textAlign: 'center', fontSize: 10, color: '#9ca3af', fontWeight: 'bold', textTransform: 'uppercase', marginTop: 16 }}>Our expert team will call you soon</p>
                </form>
              )}
            </>
          ) : (
            <div style={{ padding: '40px 0', textAlign: 'center' }}>
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} style={{ width: 80, height: 80, background: '#dcfce7', color: '#16a34a', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                <CheckCircle2 size={40} />
              </motion.div>
              <h3 className="cibil-modal-title">Request Sent!</h3>
              <p className="cibil-feature-desc" style={{ marginBottom: 32 }}>Thank you! Your request has been received. Our expert team will call you soon.</p>
              <button onClick={onClose} className="cibil-btn-blue">Close</button>
            </div>
          )}
        </motion.div>
      </div>
    )}
  </AnimatePresence>
));

export default function CibilScorePanel() {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCallBackOpen, setIsCallBackOpen] = useState(false);
  const [isCallBackSubmitted, setIsCallBackSubmitted] = useState(false);
  const [isCallBackProcessing, setIsCallBackProcessing] = useState(false);

  const handleOpenCheckout = useCallback(() => {
    setIsSubmitted(false);
    setIsCheckoutOpen(true);
  }, []);

  const handleOpenCallBack = useCallback(() => {
    setIsCallBackSubmitted(false);
    setIsCallBackOpen(true);
  }, []);

  const handleFormSubmit = useCallback((e) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSubmitted(true);
    }, 2000);
  }, []);

  const handleCallBackSubmit = useCallback((e) => {
    e.preventDefault();
    setIsCallBackProcessing(true);
    setTimeout(() => {
      setIsCallBackProcessing(false);
      setIsCallBackSubmitted(true);
    }, 1500);
  }, []);

  return (
    <div className="cibil-panel">
      <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} isProcessing={isProcessing} isSubmitted={isSubmitted} onSubmit={handleFormSubmit} />
      <CallBackModal isOpen={isCallBackOpen} onClose={() => setIsCallBackOpen(false)} isProcessing={isCallBackProcessing} isSubmitted={isCallBackSubmitted} onSubmit={handleCallBackSubmit} />

      <div className="cibil-hero">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="cibil-badge-zap">
          <Zap size={12} /> Over 1 Million Reports Delivered
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="cibil-h1">
          सिर्फ Score नहीं — <br />
          <span className="cibil-orange-text">पूरी CIBIL Report</span> <br />
          + Expert Analysis
        </motion.h1>

        {/* Gauge */}
        <div className="cibil-gauge-container">
          <div className="cibil-gauge-track"></div>
          <motion.div initial={{ rotate: -90 }} animate={{ rotate: 15 }} transition={{ type: "spring", stiffness: 40, damping: 10, delay: 0.5 }} className="cibil-gauge-progress"></motion.div>
          <div className="cibil-gauge-content">
            <div className="cibil-gauge-label">Credit Score</div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="cibil-gauge-score">748</motion.div>
            <div className="cibil-gauge-status">Excellent</div>
          </div>
        </div>

        <p className="cibil-desc">Get your TransUnion CIBIL score PDF and a comprehensive analysis report from our 10+ expert team.</p>

        {/* Pricing Card */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8 }}>
          <div className="cibil-pricing-card">
            <div className="cibil-promo-badge">Special Launch Price</div>
            <div className="cibil-price-row">
              <span className="cibil-price-main">₹199</span>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <span className="cibil-price-strike">₹499</span>
                <span className="cibil-price-off">60% OFF</span>
              </div>
            </div>
            <p className="cibil-price-sub">Official CIBIL PDF + Expert Fix Report</p>
            <button onClick={handleOpenCheckout} className="cibil-btn-main">
              Get Report & Analysis <ArrowRight size={20} />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Stats Grid */}
      <div className="cibil-stats-grid">
        {[
          { label: "Reports Generated", value: "1M+" },
          { label: "Expert Analysts", value: "10+" },
          { label: "Average Score Jump", value: "+85" },
        ].map((stat, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 * i }} className="cibil-stat-card">
            <div className="cibil-stat-value">{stat.value}</div>
            <div className="cibil-stat-label">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Features List */}
      <div className="cibil-features">
        <h3 className="cibil-feature-title" style={{ fontSize: 18, marginBottom: 16 }}>What's in the Report?</h3>
        {[
          { title: "TransUnion CIBIL PDF", description: "Official TransUnion CIBIL report in a downloadable PDF.", icon: <FileText size={20} /> },
          { title: "Expert Analysis", description: "Detailed breakdown by our top 10+ experts.", icon: <ShieldCheck size={20} /> },
          { title: "Score Improvement", description: "Actionable steps to boost your credit health.", icon: <TrendingUp size={20} /> },
        ].map((f, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="cibil-feature-card">
            <div className="cibil-feature-icon">{f.icon}</div>
            <div>
              <div className="cibil-feature-title">{f.title}</div>
              <div className="cibil-feature-desc">{f.description}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Repair Section */}
      <div className="cibil-repair-section">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="cibil-repair-card">
          <div className="cibil-repair-head">
            <div className="cibil-repair-title-wrap">
              <div className="cibil-repair-icon"><Wrench size={22} strokeWidth={2.5} /></div>
              <h3 className="cibil-modal-title" style={{ fontSize: 20, marginBottom: 0 }}>Credit Repair</h3>
            </div>
            <div className="cibil-repair-tag">Premium</div>
          </div>
          <p className="cibil-repair-desc">Struggling with complex CIBIL hurdles? Our legal & financial experts specialize in deep-profile cleanup.</p>
          <div className="cibil-issue-grid">
            {["DPD Issues", "Settlement", "Written Off", "NPA Status", "Suit Filed", "Fake Loans"].map((issue, i) => (
              <div key={i} className="cibil-issue-item">
                <CheckCircle2 size={12} className="cibil-orange-text" /> {issue}
              </div>
            ))}
          </div>
          <div className="cibil-repair-note">
             <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                <AlertTriangle size={16} className="cibil-orange-text" />
                <span style={{ fontSize: 12, fontWeight: 900, textTransform: 'uppercase', color: 'var(--cibil-blue)' }}>Why it works?</span>
             </div>
             <p className="cibil-feature-desc">We use legal avenues to resolve disputes. 92% of clients see improvement within 90 days.</p>
          </div>
          <button onClick={handleOpenCallBack} className="cibil-btn-blue" style={{ height: 56 }}>
            <PhoneIcon size={18} fill="currentColor" /> Request Expert Call Back
          </button>
        </motion.div>
      </div>

      {/* FAQ Section */}
      <div className="cibil-faq-section">
        <h3 className="cibil-feature-title" style={{ fontSize: 18, marginBottom: 24, textAlign: 'center' }}>Common Questions</h3>
        <div className="space-y-3">
          {[
            { q: "Is this my official CIBIL?", a: "Yes, we provide the official TransUnion CIBIL document plus our expert breakdown." },
            { q: "How much time it takes?", a: "PDF is instant. Expert analysis takes 24-48 working hours." },
            { q: "Will check effect score?", a: "No, checking your own score is a 'soft inquiry' and doesn't lower it." }
          ].map((item, idx) => (
            <details key={idx} className="cibil-faq-item">
              <summary className="cibil-faq-summary">
                {item.q} <HelpCircle size={14} className="cibil-orange-text" />
              </summary>
              <div className="cibil-faq-answer">{item.a}</div>
            </details>
          ))}
        </div>
      </div>

      {/* Trust Quote */}
      <div className="cibil-trust-card">
         <div style={{ display: 'flex', justifyContent: 'center', gap: 4, marginBottom: 16 }}>
            {[1, 2, 3, 4, 5].map((s) => <Star key={s} size={12} style={{ fill: 'var(--cibil-orange)', color: 'var(--cibil-orange)' }} />)}
         </div>
         <p style={{ fontSize: 14, fontStyle: 'italic', marginBottom: 16, lineHeight: 1.6 }}>
            "The analysis report helped me identify a wrong entry in my CIBIL. Fixed it and my score jumped by 90 points!"
         </p>
         <div style={{ fontSize: 12, fontWeight: 'bold', opacity: 0.7 }}>— Rahul S., Mumbai</div>
      </div>

      <div className="cibil-footer-seals">
         <ShieldCheck size={24} color="#d1d5db" />
         <div style={{ fontSize: 10, color: '#9ca3af', textAlign: 'left', lineHeight: 1.2 }}>
            256-bit Secure Encryption <br /> 100% Confidential Data
         </div>
      </div>
    </div>
  );
}
