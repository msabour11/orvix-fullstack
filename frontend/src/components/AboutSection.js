import React from 'react';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import { Users, Briefcase, Award, Clock } from 'lucide-react';

const stats = [
  { icon: Users, value: 500, suffix: '+', label: 'عميل سعيد' },
  { icon: Briefcase, value: 1200, suffix: '+', label: 'مشروع منجز' },
  { icon: Award, value: 15, suffix: '', label: 'سنة خبرة' },
  { icon: Clock, value: 99, suffix: '%', label: 'رضا العملاء' },
];

const AboutSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section className="section-padding bg-orvix-navy/50" ref={ref}>
      <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orvix-primary/10 border border-orvix-primary/20 text-orvix-primary text-sm font-medium mb-6">
              <Award size={16} />
              <span>من نحن</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              شريكك الموثوق في <span className="gradient-text">التحول الرقمي</span>
            </h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              ORVIX Solutions شركة سعودية متخصصة في تطوير الحلول البرمجية المتكاملة. نقدم خدماتنا للشركات والمؤسسات في المملكة العربية السعودية والخليج العربي.
            </p>
            <p className="text-gray-400 leading-relaxed mb-8">
              فريقنا يضم نخبة من المطورين والمصممين والاستشاريين التقنيين الذين يعملون بشغف لتقديم أفضل الحلول التقنية التي تلبي احتياجات عملائنا.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {['أنظمة ERP متكاملة', 'تطبيقات الجوال', 'مواقع الويب', 'الاستشارات التقنية'].map((item) => (
                <div key={item} className="flex items-center gap-2 text-gray-300 text-sm">
                  <div className="w-2 h-2 rounded-full bg-orvix-green" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="glass p-6 text-center hover:bg-white/10 transition-all duration-300">
                <stat.icon className="w-8 h-8 text-orvix-green mx-auto mb-4" />
                <div className="text-3xl font-bold text-white mb-2">
                  {inView ? <CountUp end={stat.value} duration={2.5} /> : '0'}{stat.suffix}
                </div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
