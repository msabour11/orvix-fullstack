import React from 'react';
import { Link } from 'react-router-dom';
import { Check, Zap, Crown, Star, ArrowLeft, MessageCircle } from 'lucide-react';

const plans = [
  {
    name: 'Start',
    nameAr: 'البداية',
    price: '1,000',
    priceZatca: '1,500',
    period: 'سنوياً',
    desc: 'مثالية للأنشطة الصغيرة والناشئة',
    icon: Star,
    color: 'from-gray-500 to-gray-600',
    features: [
      'المبيعات والفواتير',
      'المشتريات والموردين',
      'إدارة المخزون',
      'سندات القبض والصرف',
      'تقارير مالية أساسية',
      'مستخدم واحد',
      'دعم فني عبر البريد',
    ],
    disabled: ['الموارد البشرية', 'التصنيع', 'القطاع الطبي', 'إيجار المعدات', 'لوحة تحكم متقدمة'],
    popular: false,
  },
  {
    name: 'Pro',
    nameAr: 'المتقدمة',
    price: '2,000',
    priceZatca: '2,500',
    period: 'سنوياً',
    desc: 'للأنشطة المتوسطة والمتنامية',
    icon: Zap,
    color: 'from-orvix-primary to-blue-600',
    features: [
      'جميع مميزات باقة Start',
      'الحسابات العامة المتقدمة',
      'إدارة العملاء والأقساط',
      'التقارير المالية التفصيلية',
      'التقارير الضريبية (VAT)',
      'إدارة الفروع المتعددة',
      'مستخدمين (حتى 5)',
      'دعم فني عبر الهاتف والبريد',
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
    priceZatca: '4,000',
    period: 'سنوياً',
    desc: 'الحل الشامل للشركات الكبيرة',
    icon: Crown,
    color: 'from-amber-500 to-orange-500',
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

const Pricing = () => {
  return (
    <div className="pt-24 pb-12">
      <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            باقات <span className="gradient-text">ORVIX</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            اختر الباقة المناسبة لنشاطك التجاري مع إمكانية الربط مع هيئة الزكاة والدخل
          </p>
        </div>

        {/* ZATCA Banner */}
        <div className="glass mb-12 p-6 text-center bg-gradient-to-r from-orvix-primary/10 to-orvix-green/10 border-orvix-primary/20">
          <h3 className="text-lg font-bold text-white mb-2">جميع الباقات تدعم الربط مع هيئة الزكاة والدخل</h3>
          <p className="text-gray-400 text-sm mb-4">معتمد في المرحلة الأولى والثانية - فواتير إلكترونية - QR Code - توقيع رقمي</p>
          <div className="flex justify-center gap-4 flex-wrap">
            {plans.map((plan) => (
              <div key={plan.name} className="px-4 py-2 rounded-lg bg-white/5">
                <span className="text-gray-400 text-xs">{plan.name} + ZATCA</span>
                <div className="text-orvix-green font-bold">{plan.priceZatca} ر.س</div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative glass p-8 transition-all duration-500 hover:-translate-y-2 ${
                plan.popular ? 'lg:scale-105 border-2 border-orvix-primary/50' : ''
              }`}
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
                <h2 className="text-2xl font-bold text-white mb-1">{plan.name}</h2>
                <p className="text-orvix-green text-sm font-medium mb-1">{plan.nameAr}</p>
                <p className="text-gray-500 text-sm">{plan.desc}</p>
              </div>

              <div className="text-center mb-6 pb-6 border-b border-white/10">
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl lg:text-5xl font-bold text-white">{plan.price}</span>
                  <span className="text-gray-400 text-sm">ر.س</span>
                </div>
                <span className="text-gray-500 text-sm">/ {plan.period}</span>
                <div className="mt-2 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-orvix-green/10 text-orvix-green text-xs">
                  +500 ر.س مع ربط الزكاة = {plan.priceZatca} ر.س
                </div>
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

        {/* Comparison Table */}
        <div className="mt-16 glass overflow-hidden">
          <h3 className="text-xl font-bold text-white p-6 border-b border-white/10">مقارنة الباقات</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="text-right text-gray-400 text-sm font-medium py-4 px-6">الميزة</th>
                  <th className="text-center text-gray-400 text-sm font-medium py-4 px-6">Start</th>
                  <th className="text-center text-gray-400 text-sm font-medium py-4 px-6 text-orvix-primary">Pro</th>
                  <th className="text-center text-gray-400 text-sm font-medium py-4 px-6 text-amber-500">Premium</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['المبيعات والفواتير', true, true, true],
                  ['المشتريات والموردين', true, true, true],
                  ['إدارة المخزون', true, true, true],
                  ['التقارير المالية', true, true, true],
                  ['إدارة الفروع', false, true, true],
                  ['تطبيق الجوال', false, true, true],
                  ['الموارد البشرية', false, false, true],
                  ['التصنيع والإنتاج', false, false, true],
                  ['القطاع الطبي', false, false, true],
                  ['مستخدمين غير محدود', false, false, true],
                  ['دعم 24/7', false, false, true],
                  ['API مفتوح', false, false, true],
                ].map(([feature, start, pro, premium], i) => (
                  <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-3 px-6 text-white text-sm">{feature}</td>
                    <td className="py-3 px-6 text-center">{start ? <Check size={16} className="text-orvix-green mx-auto" /> : <span className="text-gray-600">—</span>}</td>
                    <td className="py-3 px-6 text-center">{pro ? <Check size={16} className="text-orvix-green mx-auto" /> : <span className="text-gray-600">—</span>}</td>
                    <td className="py-3 px-6 text-center">{premium ? <Check size={16} className="text-orvix-green mx-auto" /> : <span className="text-gray-600">—</span>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-gray-400 mb-6">هل تحتاج باقة مخصصة لشركتك؟</p>
          <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
            <MessageCircle size={18} /> تواصل معنا للحصول على عرض مخصص
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
