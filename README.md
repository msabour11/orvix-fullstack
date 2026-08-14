# ORVIX Solutions - Full Stack Website
## نظام ORVIX الكامل - Backend + Frontend + Database + Admin Dashboard

---

## 📦 ما يحتويه المشروع

| المكون | التقنية | الحالة |
|--------|---------|--------|
| **Frontend** | React 18 + Tailwind CSS + React Router | ✅ كامل |
| **Backend** | Node.js + Express + MongoDB + JWT | ✅ كامل |
| **Database** | MongoDB + Mongoose + Seeder | ✅ كامل |
| **Admin Dashboard** | لوحة تحكم كاملة مع إدارة الرسائل والمشاريع | ✅ كامل |
| **Docker** | Docker + Docker Compose + Nginx | ✅ كامل |
| **Deploy Scripts** | deploy.sh + .env.example + nginx.conf | ✅ كامل |

---

## 🚀 طرق النشر

### الطريقة 1: Docker (الأسهل والأفضل)

```bash
# 1. استخرج الملفات
cd orvix-fullstack

# 2. شغل Docker Compose
docker-compose up -d

# 3. انتظر 30 ثانية ثم افتح:
#    الموقع: http://localhost
#    API:    http://localhost:5000/api/health
#    Admin:  http://localhost/admin/login
```

### الطريقة 2: Manual Setup (Development)

```bash
# 1. استخرج الملفات
cd orvix-fullstack

# 2. شغل deploy.sh
chmod +x deploy.sh
./deploy.sh

# 3. ابدأ MongoDB
sudo systemctl start mongod

# 4. شغل Backend (Terminal 1)
cd backend && npm run dev

# 5. شغل Frontend (Terminal 2)
cd frontend && npm start
```

### الطريقة 3: Production Build

```bash
# Backend
# - انسخ backend/ إلى السيرفر
# - شغل: npm install && npm start

# Frontend
# - عدل frontend/src/utils/api.js وغير API_URL إلى رابط السيرفر
# - شغل: npm install && npm run build
# - انسخ مجلد build/ إلى public_html أو nginx
```

---

## 📁 هيكل المشروع

```
orvix-fullstack/
├── backend/                    # Node.js Backend
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js           # اتصال MongoDB
│   │   ├── models/
│   │   │   ├── User.js         # نموذج المستخدم
│   │   │   ├── Contact.js      # نموذج رسائل التواصل
│   │   │   └── Portfolio.js    # نموذج المشاريع
│   │   ├── routes/
│   │   │   ├── auth.js         # تسجيل الدخول والمصادقة
│   │   │   ├── contact.js      # API رسائل التواصل
│   │   │   └── portfolio.js    # API المشاريع
│   │   ├── middleware/
│   │   │   ├── auth.js         # حماية JWT
│   │   │   └── errorHandler.js # معالجة الأخطاء
│   │   ├── utils/
│   │   │   ├── generateToken.js# توليد JWT
│   │   │   └── seeder.js       # بيانات تجريبية
│   │   └── server.js           # نقطة البداية
│   ├── .env.example            # نموذج الإعدادات
│   ├── .env                    # الإعدادات الحالية
│   └── package.json
│
├── frontend/                   # React Frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/         # مكونات مشتركة
│   │   │   ├── Navbar.js
│   │   │   ├── Footer.js
│   │   │   ├── HeroSection.js
│   │   │   ├── AboutSection.js
│   │   │   ├── ServicesSection.js
│   │   │   ├── ModulesSection.js
│   │   │   ├── PortfolioSection.js
│   │   │   ├── ContactSection.js
│   │   │   ├── CTASection.js
│   │   │   ├── WhatsAppButton.js
│   │   │   ├── Layout.js
│   │   │   └── ProtectedRoute.js
│   │   ├── pages/              # الصفحات
│   │   │   ├── Home.js
│   │   │   ├── Services.js
│   │   │   ├── Modules.js
│   │   │   ├── Portfolio.js
│   │   │   ├── Contact.js
│   │   │   ├── AdminLogin.js
│   │   │   └── AdminDashboard.js
│   │   ├── utils/
│   │   │   ├── api.js          # Axios client
│   │   │   └── helpers.js
│   │   ├── App.js              # التوجيه
│   │   ├── index.js            # نقطة البداية
│   │   └── index.css           # Tailwind + Custom styles
│   ├── package.json
│   ├── tailwind.config.js
│   └── postcss.config.js
│
├── docker-compose.yml          # Docker Compose
├── Dockerfile.backend          # Docker Backend
├── Dockerfile.frontend         # Docker Frontend
├── nginx.conf                  # Nginx Config
├── deploy.sh                   # سكربت التثبيت
└── README.md                   # هذا الملف
```

---

## 🔐 بيانات الدخول الافتراضية

| الدور | البريد | كلمة المرور |
|-------|--------|-------------|
| Admin | admin@orvix.com | admin123 |

**⚠️ مهم:** غير كلمة المرور في الإنتاج!

---

## 🔌 API Endpoints

### Authentication
| Method | Endpoint | وصف |
|--------|----------|-----|
| POST | /api/auth/login | تسجيل الدخول |
| GET | /api/auth/verify | التحقق من التوكن |
| GET | /api/auth/profile | بيانات المستخدم |

### Contact
| Method | Endpoint | وصف |
|--------|----------|-----|
| POST | /api/contact | إرسال رسالة (عام) |
| GET | /api/contact | قائمة الرسائل (Admin) |
| GET | /api/contact/:id | تفاصيل رسالة (Admin) |
| PUT | /api/contact/:id/status | تحديث الحالة (Admin) |
| DELETE | /api/contact/:id | حذف رسالة (Admin) |

### Portfolio
| Method | Endpoint | وصف |
|--------|----------|-----|
| GET | /api/portfolio | قائمة المشاريع (عام) |
| GET | /api/portfolio/:id | تفاصيل مشروع (عام) |
| POST | /api/portfolio | إضافة مشروع (Admin) |
| PUT | /api/portfolio/:id | تعديل مشروع (Admin) |
| DELETE | /api/portfolio/:id | حذف مشروع (Admin) |

---

## 🛠️ التقنيات المستخدمة

### Frontend
- React 18.2
- React Router DOM 6
- Tailwind CSS 3
- Axios
- Lucide React (Icons)
- React CountUp
- React Intersection Observer
- React Hot Toast

### Backend
- Node.js 18+
- Express 4
- MongoDB + Mongoose
- JWT Authentication
- BcryptJS
- Helmet (Security)
- Express Rate Limit
- Compression
- CORS

### DevOps
- Docker & Docker Compose
- Nginx Reverse Proxy
- MongoDB 6.0

---

## ⚙️ ملف .env

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/orvix_solutions
JWT_SECRET=your_super_secret_key_here
ADMIN_EMAIL=admin@orvix.com
ADMIN_PASSWORD=admin123
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

---

## 📞 الدعم

- **Email:** info@orvix.com
- **Website:** https://orvix.com
- **WhatsApp:** +966 50 000 0000

---

**© 2026 ORVIX Solutions. جميع الحقوق محفوظة.**
