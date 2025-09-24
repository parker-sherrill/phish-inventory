# Phish-Fil-A: Phishing Inventory Management System

A full-stack application for tracking, analyzing, and managing phishing reports with Chick-fil-A inspired branding.

## 🏗️ Project Structure

```
phish-inventory/
├── frontend/                 # Next.js React Frontend (current)
│   ├── src/
│   │   ├── app/            # Next.js 13+ App Router
│   │   ├── components/     # Reusable UI components
│   │   └── data/           # Mock data
│   ├── public/             # Static assets
│   └── package.json
├── backend/                 # Flask + AWS Backend (coming soon)
│   ├── api/                # Flask API routes
│   ├── models/            # Database models
│   └── requirements.txt
└── README.md
```

## 🚀 Current Features (Frontend)

### **Dashboard**
- Interactive charts and metrics
- Monthly report trends
- Status distribution analysis
- Real-time statistics

### **Reports Management**
- Searchable and filterable reports table
- Detailed report view with modal
- Status tracking (pending, verified, false positive)
- Reporter information

### **Report Submission**
- Comprehensive form with validation
- Multiple attack types (email, SMS, social media)
- Severity levels and descriptions
- Success notifications with Radix Toast

### **UI/UX Features**
- 🎨 **Chick-fil-A Branding** with external logo
- 📱 **Responsive Design** for all devices
- ♿ **Accessibility** with Radix UI components
- 🎯 **Modern UI** with Tailwind CSS
- 🔍 **Advanced Search** and filtering

## 🛠️ Tech Stack

### **Frontend**
- **Next.js 15** with App Router
- **React 19** with TypeScript
- **Tailwind CSS** for styling
- **Radix UI** for accessible components
- **Recharts** for data visualization
- **Lucide React** for icons

### **Backend** (Planned)
- **Flask** Python web framework
- **AWS** for cloud services
- **Database** (TBD: PostgreSQL/MongoDB)

## 🚀 Getting Started

### **Prerequisites**
- Node.js 18+ 
- npm or yarn

### **Installation**
```bash
# Clone the repository
git clone https://github.com/parker-sherrill/phish-inventory.git
cd phish-inventory

# Install dependencies
npm install

# Start development server
npm run dev
```

### **Available Scripts**
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🌐 Deployment

The frontend is ready for deployment on:
- **Vercel** (recommended for Next.js)
- **Netlify**
- **GitHub Pages**

## 📊 Data Structure

### **Report Object**
```typescript
interface Report {
  id: string;
  url: string;
  type: 'email' | 'sms' | 'social' | 'website' | 'other';
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'verified' | 'false_positive';
  submittedAt: string;
  reporterName: string;
  reporterEmail: string;
}
```

## 🎨 Design System

### **Color Palette**
- **Primary**: Chick-fil-A Red (#E51636)
- **Secondary**: Various pastels for charts
- **Text**: Gray scale for readability

### **Components**
- **Layout**: Responsive navigation with logo
- **Forms**: Validated inputs with error states
- **Tables**: Sortable, filterable data display
- **Charts**: Interactive data visualization

## 🔮 Future Enhancements

- [ ] **Backend API** with Flask
- [ ] **Database Integration** with AWS
- [ ] **User Authentication**
- [ ] **Real-time Updates**
- [ ] **Email Notifications**
- [ ] **Advanced Analytics**
- [ ] **API Documentation**

## 📝 License

This project is for educational and demonstration purposes.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

**Built with ❤️ and inspired by Chick-fil-A's commitment to excellence**
