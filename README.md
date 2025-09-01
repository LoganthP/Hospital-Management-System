# HealthHub Central 🏥

<div align="center">

![HealthHub Central](https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/3c399a74-43fa-4216-974d-97c4225953f8.png)

**Your integrated solution for efficient hospital management and seamless patient care.**

[![Next.js](https://img.shields.io/badge/Next.js-15.2.3-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.1-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-11.7.0-orange?style=for-the-badge&logo=firebase)](https://firebase.google.com/)
[![AI Powered](https://img.shields.io/badge/AI-Powered-purple?style=for-the-badge&logo=openai)](https://ai.google.dev/)

</div>

## ✨ Features

### 🤖 **AI-Powered Healthcare Solutions**
- **AI Specialist Finder**: Intelligent doctor recommendations based on symptoms analysis
- **AI Prescription Generator**: Automated prescription creation with structured medical protocols
- **Hospital Guide Chat**: Interactive AI assistant for hospital navigation and information

### 📊 **Comprehensive Management System**
- **Role-Based Dashboards**: Tailored interfaces for admins, doctors, nurses, and patients
- **Patient Data Management**: Secure CRUD operations for comprehensive patient records
- **Appointment System**: Advanced scheduling and management capabilities
- **Medical Records**: Complete digital health record management
- **Billing & Payments**: Streamlined financial management with rupee-based calculations

### 🔐 **Enterprise-Grade Features**
- **Secure Authentication**: Role-based access control
- **Real-time Analytics**: Live dashboard with performance metrics
- **Responsive Design**: Mobile-first approach for all devices
- **Data Visualization**: Interactive charts and reporting tools

## 🛠️ Tech Stack

<table>
<tr>
<td><strong>Frontend</strong></td>
<td>
  <img src="https://img.shields.io/badge/Next.js-black?logo=next.js" alt="Next.js"/>
  <img src="https://img.shields.io/badge/React-61DAFB?logo=react" alt="React"/>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript" alt="TypeScript"/>
</td>
</tr>
<tr>
<td><strong>Styling</strong></td>
<td>
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css" alt="Tailwind"/>
  <img src="https://img.shields.io/badge/shadcn/ui-000000?logo=shadcnui" alt="shadcn/ui"/>
  <img src="https://img.shields.io/badge/Radix_UI-161618?logo=radixui" alt="Radix UI"/>
</td>
</tr>
<tr>
<td><strong>Backend & Database</strong></td>
<td>
  <img src="https://img.shields.io/badge/Firebase-FFCA28?logo=firebase" alt="Firebase"/>
  <img src="https://img.shields.io/badge/TanStack_Query-FF4154?logo=reactquery" alt="TanStack Query"/>
</td>
</tr>
<tr>
<td><strong>AI & Analytics</strong></td>
<td>
  <img src="https://img.shields.io/badge/Google_AI-4285F4?logo=google" alt="Google AI"/>
  <img src="https://img.shields.io/badge/Genkit-purple" alt="Genkit"/>
  <img src="https://img.shields.io/badge/Recharts-FF6384?logo=chartdotjs" alt="Recharts"/>
</td>
</tr>
<tr>
<td><strong>Development</strong></td>
<td>
  <img src="https://img.shields.io/badge/Zod-3E67B1?logo=zod" alt="Zod"/>
  <img src="https://img.shields.io/badge/React_Hook_Form-EC5990?logo=reacthookform" alt="React Hook Form"/>
  <img src="https://img.shields.io/badge/Lucide-F56565?logo=lucide" alt="Lucide Icons"/>
</td>
</tr>
</table>

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (18.0 or later)
- **npm** or **yarn**
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/LoganthP/Hospital-Management-System.git
   cd Hospital-Management-System
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Configure your environment variables:
   ```env
   # AI Configuration
   GOOGLE_GENAI_API_KEY=your_google_ai_api_key
   
   # Firebase Configuration
   NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:9002` to see the application.

## 📱 Application Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── ai-prescriptions/   # AI prescription generator
│   ├── appointments/       # Appointment management
│   ├── billing/           # Billing and payments
│   ├── dashboard/         # Main dashboard
│   ├── doctor-data/       # Doctor management
│   ├── medical-records/   # Patient medical records
│   ├── patient-data/      # Patient management
│   ├── search-records/    # Record search functionality
│   └── specialist-finder/ # AI specialist finder
├── components/
│   ├── layout/           # Layout components
│   └── ui/               # Reusable UI components
├── ai/
│   └── flows/           # AI workflow definitions
├── hooks/               # Custom React hooks
└── lib/                # Utility functions
```

## 🎯 Key Features Deep Dive

### 🏥 Dashboard Analytics
- Real-time patient statistics
- Appointment tracking and trends
- Revenue analytics in Indian Rupees (₹)
- Interactive charts and visualizations

### 🤖 AI Specialist Finder
```typescript
// Example usage
const recommendation = await findSpecialist({
  symptoms: "chest pain, shortness of breath",
  urgency: "high"
});
```

### 💊 AI Prescription Generator
```typescript
// Generate prescriptions automatically
const prescription = await generatePrescription({
  name: "Patient Name",
  diagnosis: "Hypertension"
});
```

### 👥 Role-Based Access
- **Admin**: Full system access and management
- **Doctor**: Patient records, prescriptions, appointments
- **Nurse**: Patient care, basic record updates
- **Patient**: Personal records, appointment booking

## 🎨 Design System

### Color Palette
- **Primary**: Teal (#008080) - Trust and health
- **Secondary**: Light Gray (#F0F0F0) - Clean backgrounds
- **Accent**: Blue (#007BFF) - Interactive elements
- **Success**: Green (#28A745)
- **Warning**: Orange (#FFC107)
- **Error**: Red (#DC3545)

### Typography
- **Font**: Inter - Clean, modern sans-serif
- **Heading Scale**: rem-based scaling
- **Body Text**: Optimized for readability

## 📊 Development Scripts

```bash
# Development
npm run dev              # Start development server with Turbopack
npm run genkit:dev       # Start AI development environment
npm run genkit:watch     # Watch mode for AI flows

# Production
npm run build            # Build for production
npm run start            # Start production server

# Quality
npm run lint             # Run ESLint
npm run typecheck        # TypeScript type checking
```

## 🔧 Configuration

### Next.js Configuration
- **Turbopack**: Enabled for faster development builds
- **TypeScript**: Strict mode enabled
- **Image Optimization**: Configured for external sources
- **Port**: 9002 (customizable)

### Tailwind CSS
- **Custom color schemes**: Hospital-themed palette
- **Component library**: shadcn/ui integration
- **Responsive design**: Mobile-first approach
- **Dark mode**: Class-based toggle support

## 🚦 API Endpoints

### AI Flows
- `/api/ai/specialist-finder` - Get doctor recommendations
- `/api/ai/prescriptions` - Generate prescriptions
- `/api/ai/hospital-guide` - Chat assistant

### Data Management
- `/api/patients` - Patient CRUD operations
- `/api/doctors` - Doctor management
- `/api/appointments` - Appointment scheduling
- `/api/billing` - Financial operations

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## 🚀 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Connect repository to Vercel
3. Configure environment variables
4. Deploy automatically

### Docker
```dockerfile
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000
CMD ["npm", "start"]
```

## 📈 Performance

- **Core Web Vitals**: Optimized for excellent scores
- **Bundle Size**: Minimized with tree shaking
- **Image Optimization**: Next.js automatic optimization
- **Caching Strategy**: Aggressive caching for static assets

## 🔒 Security

- **Authentication**: Firebase Auth integration
- **Data Validation**: Zod schema validation
- **API Security**: Rate limiting and input sanitization
- **HIPAA Compliance**: Privacy-first design principles

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests and linting
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Code Standards
- **ESLint**: Follow the configured rules
- **Prettier**: Code formatting
- **TypeScript**: Strict type checking
- **Conventional Commits**: For clear commit history

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **LoganthP** - *Lead Developer* - [@LoganthP](https://github.com/LoganthP)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [shadcn/ui](https://ui.shadcn.com/) - Beautiful component library
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Firebase](https://firebase.google.com/) - Backend infrastructure
- [Google AI](https://ai.google.dev/) - AI capabilities

## 📞 Support

If you have any questions or need help:

- 📧 Email: [support@healthhubcentral.com](mailto:support@healthhubcentral.com)
- 💬 GitHub Issues: [Create an issue](https://github.com/LoganthP/Hospital-Management-System/issues)
- 📖 Documentation: [Visit our docs](https://docs.healthhubcentral.com)

---

<div align="center">

**Made with ❤️ for better healthcare management**

[⭐ Star this repo](https://github.com/LoganthP/Hospital-Management-System) • [🐛 Report Bug](https://github.com/LoganthP/Hospital-Management-System/issues) • [✨ Request Feature](https://github.com/LoganthP/Hospital-Management-System/issues)

</div>