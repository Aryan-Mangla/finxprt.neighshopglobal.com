import { 
  FileText, 
  ShieldCheck, 
  Briefcase, 
  BarChart3, 
  Award, 
  ChevronRight, 
  ChevronLeft,
  Info,
  Home,
  Grid,
  Bell,
  User,
  Zap,
  CheckCircle2,
  Lock,
  Search
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useCallback, memo, useEffect } from 'react';
import { createPortal } from 'react-dom';
import './Taxation.css';

// Static Data
const BANNERS = [
  {
    id: 1,
    title: 'Fastest ITR Filing',
    subtitle: 'Trusted by 50,000+ professionals.',
    cta: 'File Now',
    bg: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
    icon: FileText,
  },
  {
    id: 2,
    title: 'Secure Your Future',
    subtitle: 'Plan taxes & save up to Rs 1.5 Lakh.',
    cta: 'Plan Now',
    bg: 'linear-gradient(135deg, #4f46e5 0%, #4338ca 100%)',
    icon: ShieldCheck,
  },
  {
    id: 3,
    title: 'GST Compliance',
    subtitle: 'Expert filing for your business growth.',
    cta: 'Manage GST',
    bg: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
    icon: BarChart3,
  },
];

const SERVICES = [
  { id: 'itr', title: 'ITR Filing', icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50', desc: 'Secure and accurate Income Tax Return filing.' },
  { id: 'gst', title: 'GST Filing', icon: BarChart3, color: 'text-emerald-600', bg: 'bg-emerald-50', desc: 'Manage your GST compliance with ease.' },
  { id: 'trademark', title: 'Trade Mark', icon: Award, color: 'text-amber-600', bg: 'bg-amber-50', desc: 'Protect your brand identity globally.' },
  { id: 'company', title: 'Company Reg.', icon: Briefcase, color: 'text-violet-600', bg: 'bg-violet-50', desc: 'Start your business journey with expert help.' },
];

const TRUST_STATS = [
  { label: 'Trusted Clients', value: '50K+' },
  { label: 'Expert Advisors', value: '200+' },
  { label: 'Compliance Rate', value: '99.9%' },
];

const TAX_TIPS = [
  "Did you know? You can save up to ₹1.5 Lakh under Section 80C.",
  "GST returns must be filed by the 11th of every month for monthly filers.",
  "Trademark registration lasts for 10 years and is renewable.",
  "Digital signatures are mandatory for company registration."
];

// Reusable Components
const ServiceCard = memo(({ service, onClick }) => (
  <button 
    onClick={() => onClick(service.title)}
    className="tax-service-card group"
  >
    <div className={`tax-service-icon-wrap ${service.bg} ${service.color}`}>
      <service.icon size={24} />
    </div>
    <span className="tax-service-title">{service.title}</span>
  </button>
));

const TaxPlanningCard = memo(({ onSelect }) => (
  <section className="tax-section space-y-4">
    <div className="flex items-center justify-between">
      <h3 className="tax-kicker">Growth & Planning</h3>
      <div className="tax-badge">New</div>
    </div>
    <div className="tax-promo-card-indigo">
      <div className="relative z-10 flex flex-col gap-6">
        <div>
          <h4 className="tax-promo-title">Strategic <br /><span className="text-indigo-200">Tax Planning</span></h4>
          <p className="tax-promo-desc">Maximize your deductions and legally reduce tax liability with expert-led harvesting strategies.</p>
        </div>
        <div className="tax-promo-grid">
          <div className="tax-promo-subcard">
            <div className="text-indigo-200 mb-1"><BarChart3 size={16} /></div>
            <div className="text-[10px] font-bold">Invest Analysis</div>
          </div>
          <div className="tax-promo-subcard">
            <div className="text-indigo-200 mb-1"><ShieldCheck size={16} /></div>
            <div className="text-[10px] font-bold">80C/D Audit</div>
          </div>
        </div>
        <button 
          onClick={() => onSelect('Comprehensive Tax Planning')}
          className="tax-promo-btn"
        >
          Get My Plan
          <ChevronRight size={16} />
        </button>
      </div>
      <div className="tax-promo-blob"></div>
    </div>
  </section>
));

const ExpertCard = memo(({ onSelect }) => (
  <section className="tax-expert-card">
    <div className="relative z-10 flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <div className="tax-expert-avatar">
          <User className="text-white" size={20} />
        </div>
        <div>
          <h4 className="text-sm font-bold tracking-tight">Talk with our Expert</h4>
          <p className="text-[10px] text-white/80">Available 9 AM - 9 PM</p>
        </div>
      </div>
      <button 
        onClick={() => onSelect('General Consultation')}
        className="tax-expert-btn"
      >
        Connect Now
      </button>
    </div>
    <div className="tax-expert-blob"></div>
  </section>
));

const BannerSlider = memo(({ onSelect }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % BANNERS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const currentBanner = BANNERS[current];
  const Icon = currentBanner.icon;

  return (
    <div className="tax-banner-slider">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          className="tax-banner-slide"
          style={{ background: currentBanner.bg }}
        >
          <div className="tax-banner-top">
            <div className="tax-banner-copy">
              <h3 className="tax-banner-title">{currentBanner.title}</h3>
              <p className="tax-banner-subtitle">{currentBanner.subtitle}</p>
            </div>
            <div className="tax-banner-icon" aria-hidden="true">
              <Icon className="tax-banner-icon-svg" size={22} />
            </div>
          </div>
          <div className="tax-banner-footer">
            <button type="button" onClick={() => onSelect(currentBanner.title)} className="tax-banner-cta">
              {currentBanner.cta}
            </button>
            <div className="tax-banner-dots" role="tablist" aria-label="Banner slides">
              {BANNERS.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setCurrent(i)}
                  className={`tax-banner-dot ${i === current ? 'is-active' : ''}`}
                  aria-label={`Go to slide ${i + 1}`}
                  aria-current={i === current || undefined}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
});

const NavItem = memo(({ id, active, icon: Icon, label, onClick }) => (
  <button onClick={() => onClick(id)} className={`tax-nav-item ${active ? 'is-active' : ''}`}>
    <Icon size={22} strokeWidth={active ? 2.5 : 2} />
    <span className="tax-nav-label">{label}</span>
  </button>
));

const ConsultationModal = memo(({ service, isSubmitted, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({ name: '', number: '', pincode: '' });

  const modalContent = (
    <div className="tax-modal-overlay">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="tax-modal-backdrop"
      />
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="tax-modal-sheet"
      >
        <div className="tax-modal-handle" />
        
        {isSubmitted ? (
          <div className="tax-modal-success">
            <div className="tax-modal-success-icon">
              <CheckCircle2 size={40} />
            </div>
            <h3 className="tax-modal-success-title">Thank You!</h3>
            <p className="tax-modal-success-desc">
              Our expert team will connect soon to assist you with {service}.
            </p>
          </div>
        ) : (
          <>
            <div className="tax-modal-head">
              <div className="tax-modal-icon-box">
                <Zap size={32} />
              </div>
              <h3 className="tax-modal-title">{service}</h3>
              <p className="tax-modal-kicker">Expert Connect</p>
            </div>
            
            <form onSubmit={onSubmit} className="tax-modal-form">
              <div className="tax-modal-field">
                <label className="tax-modal-label">Full Name</label>
                <input 
                  required
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData(p => ({...p, name: e.target.value}))}
                  placeholder="John Doe"
                  className="tax-modal-input"
                />
              </div>
              <div className="tax-modal-field">
                <label className="tax-modal-label">Mobile Number</label>
                <input 
                  required
                  type="tel" 
                  inputMode="numeric"
                  pattern="[0-9]{10}"
                  title="10-digit mobile number required"
                  value={formData.number}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                    setFormData(p => ({...p, number: val}));
                  }}
                  placeholder="Ex: 9876543210"
                  className="tax-modal-input"
                />
              </div>
              <div className="tax-modal-field">
                <label className="tax-modal-label">Pincode</label>
                <input 
                  required
                  type="text" 
                  inputMode="numeric"
                  pattern="[0-9]{6}"
                  title="6-digit pincode required"
                  maxLength={6}
                  value={formData.pincode}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '').slice(0, 6);
                    setFormData(p => ({...p, pincode: val}));
                  }}
                  placeholder="Ex: 110001"
                  className="tax-modal-input"
                />
              </div>

              <div className="tax-modal-actions">
                <button 
                  type="submit"
                  className="tax-modal-submit"
                >
                  Talk to Our Expert
                </button>
                <button 
                  type="button"
                  onClick={onClose}
                  className="tax-modal-cancel"
                >
                  Go Back
                </button>
              </div>
            </form>
          </>
        )}
      </motion.div>
    </div>
  );

  return createPortal(modalContent, document.body);
});

export default function TaxationScreen({ onBack }) {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedService, setSelectedService] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleServiceSelect = useCallback((service) => {
    setSelectedService(service);
  }, []);

  const handleDismiss = useCallback(() => {
    setSelectedService(null);
    setIsSubmitted(false);
  }, []);

  const handleFormSubmit = useCallback((e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setSelectedService(null);
    }, 3000);
  }, []);

  return (
    <div className="taxation-screen">
      <div className="taxation-screen-inner">
        {/* Main Content */}
        <main className="taxation-main">
          <BannerSlider onSelect={handleServiceSelect} />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="tax-section-title">Our Services</h3>
              <button className="tax-view-all">VIEW ALL</button>
            </div>
            <div className="tax-services-grid">
              {SERVICES.map((service) => (
                <ServiceCard key={service.id} service={service} onClick={handleServiceSelect} />
              ))}
            </div>
          </div>

          <section className="tax-stats-card">
            {TRUST_STATS.map((stat, i) => (
              <div key={i} className="tax-stat-item">
                <div className="tax-stat-value">{stat.value}</div>
                <div className="tax-stat-label">{stat.label}</div>
              </div>
            ))}
          </section>

          <div className="space-y-4">
            <h3 className="tax-section-title">Tax Awareness</h3>
            <div className="tax-tips-scroller no-scrollbar">
              {TAX_TIPS.map((tip, i) => (
                <div key={i} className="tax-tip-card">
                  <div className="tax-tip-icon-box">
                    <Info size={16} />
                  </div>
                  <p className="tax-tip-text">"{tip}"</p>
                </div>
              ))}
            </div>
          </div>

          <TaxPlanningCard onSelect={handleServiceSelect} />
          <ExpertCard onSelect={handleServiceSelect} />

          <div className="tax-footer-seals">
             <div className="tax-seal-item">
               <ShieldCheck size={14} className="text-emerald-500" />
               <p className="tax-seal-text">ISO CERTIFIED</p>
             </div>
             <div className="tax-seal-item">
               <Lock size={14} className="text-emerald-500" />
               <p className="tax-seal-text">SECURE DATA</p>
             </div>
          </div>
        </main>
      </div>

      <AnimatePresence>
        {selectedService && (
          <ConsultationModal 
            service={selectedService} 
            isSubmitted={isSubmitted} 
            onClose={handleDismiss} 
            onSubmit={handleFormSubmit} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
