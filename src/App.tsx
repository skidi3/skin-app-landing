import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useAnimation, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import confetti from 'canvas-confetti';
import { 
  Sparkles, Camera, Scan, TrendingUp, Crown, Heart, 
  ArrowRight, Star, Instagram, Twitter, Facebook,
  Smartphone, Shield, Zap, Menu, X, MoveRight,
  Check, ChevronDown, ChevronUp, Quote
} from 'lucide-react';

// Real app screenshots with correct paths
const mockScreenshots = [
  "/discover.jpeg",
  "/skin-analysis.jpeg",
  "/key-findings.jpeg",
  "/recommended-products.jpeg"
];

const featureImages = [
  "/selfie-model.jpg",
  "/routine.jpg",
  "/scanner.jpg"
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Skincare Enthusiast",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=128&q=80",
    quote: "This app has completely transformed my skincare routine. The daily tracking and personalized recommendations are game-changers!",
    rating: 5
  },
  {
    name: "Michael Chen",
    role: "Beauty Blogger",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=128&q=80",
    quote: "As a beauty blogger, I've tried countless skincare apps. This one stands out with its AI-powered analysis and intuitive interface.",
    rating: 5
  },
  {
    name: "Emily Rodriguez",
    role: "Dermatologist",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=128&q=80",
    quote: "I recommend this app to all my patients. It helps them stay consistent with their routines and track progress effectively.",
    rating: 5
  }
];

const pricingPlans = [
  {
    name: "Basic",
    price: "Free",
    description: "Perfect for getting started",
    features: [
      "Daily skin tracking",
      "Basic skin analysis",
      "Product recommendations",
      "Community access"
    ]
  },
  {
    name: "Pro",
    price: "$9.99",
    period: "month",
    description: "Most popular for enthusiasts",
    features: [
      "Everything in Basic",
      "Advanced AI analysis",
      "Personalized routines",
      "Progress tracking",
      "Priority support"
    ],
    highlighted: true
  },
  {
    name: "Expert",
    price: "$19.99",
    period: "month",
    description: "For serious skincare lovers",
    features: [
      "Everything in Pro",
      "1-on-1 expert consultation",
      "Custom ingredient analysis",
      "Early access to features",
      "Exclusive content"
    ]
  }
];

const faqs = [
  {
    question: "How does the skin analysis work?",
    answer: "Our AI-powered technology analyzes your daily selfies to track changes in your skin's condition, including texture, tone, and concerns. It provides detailed insights and recommendations based on this analysis."
  },
  {
    question: "Is my data secure?",
    answer: "Yes! We take your privacy seriously. All your data is encrypted and stored securely. Your photos and personal information are never shared without your explicit consent."
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer: "Absolutely! You can cancel your subscription at any time. If you cancel, you'll continue to have access to your plan's features until the end of your current billing period."
  },
  {
    question: "Do you offer refunds?",
    answer: "Yes, we offer a 30-day money-back guarantee for all paid plans. If you're not satisfied with our service, just reach out to our support team."
  }
];

const floatingAnimation = {
  y: [0, -10, 0],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-pink-100">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2"
            >
              <Sparkles className="h-8 w-8 text-pink-500" />
              <span className="text-xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 text-transparent bg-clip-text">
                Glow
              </span>
            </motion.div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink href="#features">Features</NavLink>
            <NavLink href="#pricing">Pricing</NavLink>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-pink-500 text-white px-4 py-2 rounded-full font-medium"
            >
              Join Waitlist
            </motion.button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                <MobileNavLink href="#features">Features</MobileNavLink>
                <MobileNavLink href="#pricing">Pricing</MobileNavLink>
                <MobileNavLink href="#about">About</MobileNavLink>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="w-full text-center bg-pink-500 text-white px-4 py-2 rounded-full font-medium mt-4"
                >
                  Download App
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <motion.a
      href={href}
      whileHover={{ scale: 1.05 }}
      className="text-gray-600 hover:text-pink-500 font-medium"
    >
      {children}
    </motion.a>
  );
}

function MobileNavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <motion.a
      href={href}
      whileTap={{ scale: 0.95 }}
      className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-pink-500 hover:bg-pink-50"
    >
      {children}
    </motion.a>
  );
}

function TestimonialCard({ testimonial, index }: { testimonial: typeof testimonials[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2 }}
      className="bg-white rounded-2xl p-6 shadow-xl relative"
    >
      <div className="absolute -top-4 -left-4 w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center">
        <Quote className="w-4 h-4 text-white" />
      </div>
      <div className="flex items-center gap-4 mb-4">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h4 className="font-semibold">{testimonial.name}</h4>
          <p className="text-sm text-gray-600">{testimonial.role}</p>
        </div>
      </div>
      <p className="text-gray-700 mb-4">{testimonial.quote}</p>
      <div className="flex gap-1">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
        ))}
      </div>
    </motion.div>
  );
}

function PricingCard({ plan, index }: { plan: typeof pricingPlans[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2 }}
      className={`relative rounded-2xl p-8 ${
        plan.highlighted
          ? 'bg-gradient-to-br from-pink-500 to-rose-500 text-white'
          : 'bg-white'
      }`}
    >
      {plan.highlighted && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-pink-600 text-white px-4 py-1 rounded-full text-sm font-medium">
          Most Popular
        </div>
      )}
      <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
      <div className="mb-4">
        <span className="text-4xl font-bold">{plan.price}</span>
        {plan.period && (
          <span className={`text-sm ${plan.highlighted ? 'text-pink-100' : 'text-gray-500'}`}>
            /{plan.period}
          </span>
        )}
      </div>
      <p className={`text-sm mb-6 ${plan.highlighted ? 'text-pink-100' : 'text-gray-600'}`}>
        {plan.description}
      </p>
      <ul className="space-y-4 mb-8">
        {plan.features.map((feature, i) => (
          <li key={i} className="flex items-center gap-2">
            <Check className={`w-5 h-5 ${plan.highlighted ? 'text-pink-200' : 'text-pink-500'}`} />
            <span className="text-sm">{feature}</span>
          </li>
        ))}
      </ul>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`w-full py-3 rounded-full font-medium ${
          plan.highlighted
            ? 'bg-white text-pink-500'
            : 'bg-pink-500 text-white'
        }`}
      >
        Get Started
      </motion.button>
    </motion.div>
  );
}

function FaqItem({ faq, index }: { faq: typeof faqs[0]; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="border-b border-gray-200 last:border-0"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full py-4 text-left"
      >
        <span className="font-medium">{faq.question}</span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500" />
        )}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-4 text-gray-600">{faq.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function Footer() {
  return (
    <footer className="bg-white border-t border-pink-100">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="h-8 w-8 text-pink-500" />
              <span className="text-xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 text-transparent bg-clip-text">
                Glow
              </span>
            </div>
            <p className="text-gray-500 max-w-md">
              Your daily companion for achieving that perfect glow. Track, learn, and transform your skincare routine.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              <li><a href="#about" className="text-gray-500 hover:text-pink-500">About</a></li>
              <li><a href="#careers" className="text-gray-500 hover:text-pink-500">Careers</a></li>
              <li><a href="#press" className="text-gray-500 hover:text-pink-500">Press</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
              Connect
            </h3>
            <div className="flex space-x-4">
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                className="text-gray-400 hover:text-pink-500"
              >
                <Instagram />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                className="text-gray-400 hover:text-pink-500"
              >
                <Twitter />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                className="text-gray-400 hover:text-pink-500"
              >
                <Facebook />
              </motion.a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-100">
          <p className="text-gray-400 text-sm text-center">
            © 2024 Glow. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

function App() {
  const [email, setEmail] = useState('');
  const [isHovered, setIsHovered] = useState(-1);
  const [activeFeature, setActiveFeature] = useState(0);
  const { scrollYProgress } = useScroll();
  const controls = useAnimation();
  
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, staggerChildren: 0.2 }
      });
    }
  }, [controls, inView]);

  const handleJoinWaitlist = () => {
    if (email) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const features = [
    {
      icon: <Camera className="text-pink-500" size={24} />,
      title: "Daily Selfie Tracking",
      description: "Watch your skin transform over time with our smart progress tracking.",
      image: featureImages[0]
    },
    {
      icon: <TrendingUp className="text-pink-500" size={24} />,
      title: "Trending Routines",
      description: "Explore what's working for others and find your perfect routine match.",
      image: featureImages[1]
    },
    {
      icon: <Scan className="text-pink-500" size={24} />,
      title: "Ingredient Scanner",
      description: "Scan products to instantly check ingredients and get personalized recommendations.",
      image: featureImages[2]
    }
  ];

  const additionalFeatures = [
    {
      icon: <Smartphone className="text-pink-500" size={24} />,
      title: "Smart Reminders",
      description: "Never miss a step in your routine with personalized notifications."
    },
    {
      icon: <Shield className="text-pink-500" size={24} />,
      title: "Safe & Secure",
      description: "Your skin journey data is encrypted and protected."
    },
    {
      icon: <Zap className="text-pink-500" size={24} />,
      title: "AI-Powered",
      description: "Get intelligent recommendations based on your skin's needs."
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-pink-50 text-gray-800 overflow-hidden">
      <Header />
      
      {/* Floating Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-pink-200/20 to-rose-200/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-rose-200/20 to-pink-200/20 rounded-full blur-3xl"
        />
      </div>

      {/* Hero Section */}
      <div className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-16">
        <motion.div 
          style={{ opacity, scale }}
          className="max-w-6xl mx-auto w-full z-10"
        >
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Left Content */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="flex-1 text-center lg:text-left"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="inline-flex items-center gap-2 bg-pink-100/80 backdrop-blur-sm text-pink-600 px-6 py-3 rounded-full mb-8 font-medium hover:bg-pink-100 transition-colors"
              >
                <Sparkles size={18} className="animate-pulse" />
                <span>Your glow-up journey begins</span>
                <ArrowRight size={18} className="animate-bounce" />
              </motion.div>
              
              <motion.h1 
                className="text-5xl lg:text-7xl font-bold mb-6 tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                Your Skin's New{' '}
                <motion.span 
                  animate={floatingAnimation}
                  className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-500 inline-block"
                >
                  Bestie!
                </motion.span>
                <motion.span 
                  animate={floatingAnimation}
                  className="text-pink-400 inline-block ml-2"
                >
                  💖
                </motion.span>
              </motion.h1>

              <motion.p 
                className="text-lg text-gray-600 mb-8 max-w-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                Snap a selfie every day, track your glow-up, and get personalized skincare recs. No more guessing, no more endless scrolling! ✨
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto lg:mx-0"
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-6 py-4 rounded-full border border-pink-100 focus:border-pink-300 focus:ring focus:ring-pink-200 focus:ring-opacity-50 transition-all"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleJoinWaitlist}
                  className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-8 py-4 rounded-full font-medium shadow-lg shadow-pink-200/50 hover:shadow-xl hover:shadow-pink-300/50 transition-all whitespace-nowrap"
                >
                  Join Waitlist 💖
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Right Content - Single Phone Image */}
            <div className="flex-1 relative">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="relative max-w-[400px] mx-auto"
              >
                <img
                  src="/landing-page.png"
                  alt="App Screenshot"
                  className="w-full rounded-[2.5rem] transform hover:scale-105 transition-transform duration-300"
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 }}
                  className="absolute -bottom-6 -right-6 bg-white rounded-full p-4 shadow-lg"
                >
                  <Sparkles className="w-8 h-8 text-pink-500" />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Features Section */}
      <div ref={ref} className="py-24 px-4 relative" id="features">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Everything you need to glow ✨</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Track your progress, discover new routines, and get personalized recommendations.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="feature-card bg-white p-6 rounded-2xl shadow-lg"
              >
                <div className="relative mb-6 overflow-hidden rounded-xl">
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    src={feature.image}
                    alt={feature.title}
                    className="feature-image"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="bg-pink-50 w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {additionalFeatures.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-md hover:shadow-lg transition-all"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="bg-pink-50 w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/*  Testimonials Section */}
      <div className="py-24 px-4 bg-gradient-to-b from-white to-pink-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Loved by skincare enthusiasts</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join thousands of happy users who've transformed their skincare routine with our app.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} index={index} />
            ))}
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      {/* <div className="py-24 px-4 bg-gradient-to-b from-pink-50 to-white" id="pricing">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Simple, transparent pricing</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose the perfect plan for your skincare journey.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <PricingCard key={index} plan={plan} index={index} />
            ))}
          </div>
        </div>
      </div> */}

      {/* FAQ Section */}
      <div className="py-24 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600">
              Everything you need to know about the app and your subscription.
            </p>
          </motion.div>

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            {faqs.map((faq, index) => (
              <FaqItem key={index} faq={faq} index={index} />
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 px-4 bg-gradient-to-b from-transparent to-pink-50 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center relative z-10"
        >
          <motion.h2 
            className="text-4xl font-bold mb-6"
            whileInView={{ scale: [0.9, 1] }}
            transition={{ duration: 0.5 }}
          >
            It's like a skincare diary, but smarter. ✨
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Join thousands of skincare enthusiasts who've found their perfect routine.
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-10 py-4 rounded-full text-lg font-medium shadow-lg shadow-pink-200/50 hover:shadow-xl hover:shadow-pink-300/50 transition-all"
          >
            Get Early Access 💖
          </motion.button>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}

export default App;