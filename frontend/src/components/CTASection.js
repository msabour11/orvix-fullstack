import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Zap } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="py-20 px-4">
      <div className="container-custom mx-auto">
        <div className="glass relative overflow-hidden p-12 text-center">
          <div className="absolute top-0 right-0 w-64 h-64 bg-orvix-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-orvix-green/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orvix-green/10 border border-orvix-green/20 text-orvix-green text-sm font-medium mb-6">
              <Zap size={16} />
              <span>ابدأ الآن</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              جاهز لتحويل <span className="gradient-text">أعمالك</span> رقمياً؟
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto mb-8">
              دعنا نساعدك في بناء الحل التقني المثالي لشركتك. تواصل معنا اليوم واحصل على استشارة مجانية.
            </p>
            <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
              ابدأ مشروعك الآن <ArrowLeft size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
