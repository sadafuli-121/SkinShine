# SkinShine - Expert Dermatology Care Platform

A comprehensive telemedicine platform for dermatology consultations with AI-powered skin analysis, real-time video consultations, and multi-language support.

## 🚀 Features

### Core Features
- **AI Skin Analysis** - Advanced machine learning for skin condition detection
- **Video Consultations** - HD video calls with certified dermatologists
- **Real-time Chat** - Instant messaging during consultations
- **3D Skin Models** - Interactive visualization of skin conditions
- **Payment Integration** - UPI, Cards, Net Banking, Digital Wallets
- **Multi-language Support** - 10 Indian languages supported

### Advanced Features
- **Progressive Web App** - Installable mobile app experience
- **Offline Support** - Works without internet connection
- **Push Notifications** - Real-time notifications
- **Analytics Dashboard** - Comprehensive health and business metrics
- **Medical Reports** - Digital prescriptions and analysis reports
- **Appointment Management** - Complete booking and scheduling system

## 🛠️ Tech Stack

- **Frontend**: Next.js 13, React 18, TypeScript
- **UI Components**: Radix UI, Tailwind CSS, Framer Motion
- **3D Graphics**: Three.js, React Three Fiber
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT with bcrypt
- **Payments**: Razorpay integration
- **Real-time**: Socket.IO (WebSocket)
- **AI/ML**: Custom AI service integration
- **PWA**: Service Workers, Web App Manifest

## 📋 Prerequisites

Before running this project, ensure you have:

1. **Node.js** (v18 or higher)
2. **MongoDB Atlas** account or local MongoDB
3. **Razorpay** account for payments
4. **AI Service** API access (optional for demo)

## 🔧 Installation & Setup

### 1. Clone and Install Dependencies

```bash
git clone <repository-url>
cd skinshine
npm install --legacy-peer-deps
```

### 2. Environment Configuration

Copy `.env.example` to `.env.local` and configure:

```bash
cp .env.example .env.local
```

### 3. Required API Keys & Services

#### **MongoDB Atlas Setup:**
1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get connection string and add to `MONGODB_URI`

#### **Razorpay Payment Setup:**
1. Create account at [Razorpay](https://razorpay.com/)
2. Get API keys from dashboard
3. Add `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET`

#### **Push Notifications (Optional):**
1. Generate VAPID keys using web-push library
2. Add `VAPID_PUBLIC_KEY` and `VAPID_PRIVATE_KEY`

#### **AI Service (Optional):**
1. Set up your AI/ML service endpoint
2. Add `AI_API_KEY` and `AI_API_URL`

### 4. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

## 🔑 Required API Integrations

### 1. **MongoDB Atlas** (Required)
- **Purpose**: User data, appointments, medical records
- **Setup**: Create cluster, get connection string
- **Cost**: Free tier available

### 2. **Razorpay** (Required for Payments)
- **Purpose**: Payment processing for consultations
- **Setup**: Create account, get API keys
- **Cost**: 2% transaction fee

### 3. **Socket.IO Server** (Optional - Real-time)
- **Purpose**: Real-time chat and video calls
- **Setup**: Deploy Socket.IO server or use service like Pusher
- **Cost**: Varies by provider

### 4. **AI/ML Service** (Optional - Enhanced AI)
- **Purpose**: Advanced skin analysis
- **Options**: 
  - Custom ML model deployment
  - Google Cloud Vision API
  - AWS Rekognition
  - Custom AI service
- **Cost**: Pay per API call

### 5. **Push Notification Service** (Optional)
- **Purpose**: Mobile push notifications
- **Setup**: Generate VAPID keys with web-push
- **Cost**: Free

### 6. **File Storage** (Optional)
- **Purpose**: Image and document storage
- **Options**: 
  - Cloudinary (recommended)
  - AWS S3
  - Google Cloud Storage
- **Cost**: Pay per storage/bandwidth

## 🚀 Production Deployment

### 1. **Vercel Deployment** (Recommended)
```bash
npm run build
vercel --prod
```

### 2. **Environment Variables**
Set all required environment variables in your deployment platform.

### 3. **Database Migration**
Ensure MongoDB Atlas is configured for production with proper indexes.

### 4. **Domain & SSL**
Configure custom domain with SSL certificate.

## 📱 PWA Installation

The app can be installed as a Progressive Web App:

1. Visit the website in Chrome/Edge
2. Click "Install" when prompted
3. Or go to `/pwa` page for manual installation

## 🌐 Multi-language Support

Supported languages:
- English, Hindi, Tamil, Telugu, Bengali
- Marathi, Gujarati, Kannada, Malayalam, Punjabi

## 🔐 Security & Compliance

- **DPDP Act 2023** compliant
- **End-to-end encryption** for medical data
- **HTTPS enforcement**
- **Security headers** configured
- **Input validation** and sanitization

## 📊 Analytics & Monitoring

- Built-in analytics dashboard
- Performance monitoring
- Error tracking
- User behavior analytics

## 🧪 Testing

### Demo Credentials:
- **Doctor**: `dr.sharma@skinshine.com` / `password123`
- **Patient**: Any email / Any password (6+ chars)

### Test Features:
1. Register as patient/doctor
2. Book appointments
3. Try AI analysis
4. Test real-time chat
5. Install as PWA

## 🆘 Support

For technical support or questions:
- Email: support@skinshine.com
- Documentation: [docs.skinshine.com]
- GitHub Issues: [repository-issues]

## 📄 License

This project is licensed under the MIT License.