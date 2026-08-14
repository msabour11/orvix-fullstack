import React from 'react';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { Check, Zap, Crown, Star, ArrowLeft } from 'lucide-react';

const plans = [
  {
    name: 'Start',
    nameAr: 'البداية',
    price: '1,000',
    period: 'سنوياً',
    desc: 'مثالية للأنشطة الصغيرة والناشئة',
    icon: Star,
    color: 'from-gray-500 to-gray-600',
    borderColor: 'border-gray-500/30',
    features: [
      'المبيعات والفواتير',
      'المشتريات والموردين',
      'إدارة المخزون',
      'سندات القبض والصرف',
      'تقارير مالية أساسية',
      'مستخدم واحد',
      'دعم فني عبر البريد',
    ],
    disabled: ['الموارد البشرية', 'التصنيع', 'القطاع الطبي', 'إيجار المعدات'],
    popular: false,
  },
  {
    name: 'Pro',
    nameAr: 'المتقدمة',
    price: '2,000',
    period: 'سنوياً',
    desc: 'للأنشطة المتوسطة والمتنامية',
    icon: Zap,
    color: 'from-orvix-primary to-blue-600',
    borderColor: 'border-orvix-primary/50',
    features: [
      'جميع مميزات باقة Start',
      'الحسابات العامة المتقدمة',
      'إدارة العملاء والأقساط',
      'التقارير المالية التفصيلية',
      'التقارير الضريبية (VAT)',
      'إدارة الفروع المتعددة',
      'مستخدمين (حتى 5)',
      'دعم فني عبر الهاتف',
      'تطبيق الجوال',
      'تكامل مع البنوك',
    ],
    disabled: ['الموارد البشرية', 'التصنيع'],
    popular: true,
  },
  {
    name: 'Premium',
    nameAr: 'الشاملة',
    price: '3,500',
    period: 'سنوياً',
    desc: 'الحل الشامل للشركات الكبيرة',
    icon: Crown,
    color: 'from-amber-500 to-orange-500',
    borderColor: 'border-amber-500/50',
    features: [
      'جميع مميزات باقة Pro',
      'الموارد البشرية (HR)',
      'إدارة التصنيع والإنتاج',
      'القطاع الطبي والصيدليات',
      'إيجار المعدات والآليات',
      'النشاطات التجارية المتعددة',
      'مستخدمين غير محدود',
      'API مفتوح للتكامل',
      'دعم فني مخصص 24/7',
      'تخصيص كامل للنظام',
      'تدريب على الموقع',
      'استضافة خاصة متاحة',
    ],
    disabled: [],
    popular: false,
  },
];

const PricingSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="section-padding bg-orvix-navy/30" ref={ref}>
      <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orvix-green/10 border border-orvix-green/20 text-orvix-green text-sm font-medium mb-6">
            <Crown size={16} />
            <span>الباقات</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            اختر <span className="gradient-text">الباقة</span> المناسبة
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            باقات مرنة تناسب جميع الأحجام والأنشطة التجارية مع إمكانية الترقية في أي وقت
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative glass p-8 transition-all duration-700 hover:-translate-y-2 ${
                plan.popular ? 'lg:scale-105 border-2 ' + plan.borderColor : ''
              } ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-orvix-primary to-blue-600 text-white text-xs font-bold">
                  الأكثر طلباً
                </div>
              )}

              <div className="text-center mb-8">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${plan.color} flex items-center justify-center mx-auto mb-4`}>
                  <plan.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">{plan.name}</h3>
                <p className="text-orvix-green text-sm font-medium mb-1">{plan.nameAr}</p>
                <p className="text-gray-500 text-sm">{plan.desc}</p>
              </div>

              <div className="text-center mb-8 pb-8 border-b border-white/10">
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl lg:text-5xl font-bold text-white">{plan.price}</span>
                  <span className="text-gray-400 text-sm">ر.س</span>
                </div>
                <span className="text-gray-500 text-sm">/ {plan.period}</span>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-300 text-sm">
                    <Check size={16} className="text-orvix-green flex-shrink-0 mt-0.5" />
                    {feature}
                  </li>
                ))}
                {plan.disabled.map((feature, i) => (
                  <li key={`d-${i}`} className="flex items-start gap-3 text-gray-600 text-sm line-through">
                    <span className="w-4 flex-shrink-0 text-center">—</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                to="/contact"
                className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition-all ${
                  plan.popular
                    ? 'bg-gradient-to-r from-orvix-primary to-blue-600 text-white hover:shadow-lg hover:shadow-orvix-primary/30'
                    : 'bg-white/5 text-white border border-white/10 hover:bg-white/10'
                }`}
              >
                اختر الباقة <ArrowLeft size={16} />
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">
            جميع الباقات تشمل <span className="text-orvix-green">ربط مع هيئة الزكاة والدخل</span> بـ +500 ر.س سنوياً
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
