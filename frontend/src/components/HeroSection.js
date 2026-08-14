import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-orvix-dark via-orvix-navy to-orvix-dark" />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-orvix-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-orvix-green/10 rounded-full blur-3xl" />

      <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-20">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orvix-green/10 border border-orvix-green/20 text-orvix-green text-sm font-medium mb-8">
            <Sparkles size={16} />
            <span>حلول تقنية مبتكرة لأعمالك</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            نبني <span className="gradient-text">المستقبل الرقمي</span><br />لشركتك
          </h1>

          <p className="text-lg sm:text-xl text-gray-400 mb-10 leading-relaxed max-w-2xl mx-auto">
            ORVIX Solutions تقدم حلول برمجية متكاملة تشمل أنظمة ERP، التطبيقات الجوالة، ومواقع الويب المتقدمة لتطوير أعمالك.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/contact" className="btn-primary flex items-center gap-2">
              ابدأ مشروعك
              <ArrowLeft size={18} />
            </Link>
            <Link to="/portfolio" className="btn-secondary">تصفح أعمالنا</Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-1">
          <div className="w-1.5 h-3 bg-orvix-green rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
