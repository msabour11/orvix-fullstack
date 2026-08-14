import React from 'react';
import { BookOpen, ShoppingCart, Truck, Package, Users, Building, BarChart3, FileText, Settings, Shield } from 'lucide-react';

const modules = [
  { icon: BookOpen, title: 'المحاسبة العامة', desc: 'إدارة الحسابات العامة والقيود المحاسبية والميزانية العمومية وقائمة الدخل.', features: ['قيود يومية', 'ميزانية عمومية', 'قائمة دخل', 'مطابقة بنكية'] },
  { icon: ShoppingCart, title: 'المبيعات', desc: 'إدارة الفواتير والعملاء والعروض والمتابعة وتحليل أداء المبيعات.', features: ['فواتير المبيعات', 'إدارة العملاء', 'عروض الأسعار', 'متابعة المدفوعات'] },
  { icon: Truck, title: 'المشتريات', desc: 'إدارة الموردين وطلبات الشراء والفواتير الواردة ومتابعة المستحقات.', features: ['فواتير المشتريات', 'إدارة الموردين', 'طلبات الشراء', 'متابعة المدفوعات'] },
  { icon: Package, title: 'المخزون والمستودعات', desc: 'تتبع المنتجات والمستودعات والجرد التلقائي وإدارة المستويات.', features: ['تتبع المنتجات', 'جرد تلقائي', 'تحويلات بين المستودعات', 'تنبيهات المخزون'] },
  { icon: Users, title: 'الموارد البشرية', desc: 'إدارة الموظفين والرواتب والإجازات والحضور والانصراف والتقييم.', features: ['إدارة الموظفين', 'حساب الرواتب', 'الإجازات', 'الحضور والانصراف'] },
  { icon: Building, title: 'CRM - إدارة العملاء', desc: 'إدارة علاقات العملاء والمتابعات والفرص والحملات التسويقية.', features: ['متابعة العملاء', 'إدارة الفرص', 'الحملات التسويقية', 'التقارير التحليلية'] },
  { icon: BarChart3, title: 'التقارير والتحليلات', desc: 'تقارير تحليلية متقدمة ولوحات معلومات تفاعلية لاتخاذ القرار.', features: ['لوحات معلومات', 'تقارير مخصصة', 'تصدير Excel/PDF', 'تحليلات ذكية'] },
  { icon: FileText, title: 'الفواتير الإلكترونية', desc: 'ربط مع هيئة الزكاة والدخل وإصدار فواتير إلكترونية معتمدة.', features: ['ربط ZATCA', 'QR Code', 'توقيع رقمي', 'أرشيف الفواتير'] },
  { icon: Settings, title: 'الإعدادات', desc: 'إدارة إعدادات النظام والمستخدمين والصلاحيات والفروع.', features: ['إدارة المستخدمين', 'الصلاحيات', 'الفروع', 'النسخ الاحتياطي'] },
  { icon: Shield, title: 'الأمان والحماية', desc: 'حماية متقدمة للبيانات مع تشفير SSL ونسخ احتياطي تلقائي.', features: ['تشفير SSL', 'نسخ احتياطي', 'سجل العمليات', 'حماية من الاختراق'] },
];

const Modules = () => {
  return (
    <div className="pt-24 pb-12">
      <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            وحدات <span className="gradient-text">النظام</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            نظام ERP متكامل يغطي جميع جوانب عملك التجاري والإداري بكفاءة عالية
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {modules.map((mod, index) => (
            <div key={index} className="glass p-8 hover:bg-white/10 transition-all duration-300 group">
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 rounded-xl bg-orvix-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-orvix-primary/30 transition-colors">
                  <mod.icon className="w-7 h-7 text-orvix-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-3">{mod.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">{mod.desc}</p>
                  <div className="grid grid-cols-2 gap-2">
                    {mod.features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-2 text-gray-300 text-xs">
                        <div className="w-1.5 h-1.5 rounded-full bg-orvix-green" />
                        {feat}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Modules;
