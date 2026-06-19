# 🚀 Eximly - Quick Start Guide

Welcome to Eximly! This guide will help you get started with the application.

## ⚡ Quick Setup (5 minutes)

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure MongoDB
Update `.env.local` with your MongoDB Atlas URL:
```env
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/eximly
JWT_SECRET=your_secret_key
```

### 3. Run Development Server
```bash
npm run dev
```

### 4. Open in Browser
Visit [http://localhost:3000](http://localhost:3000)

---

## 📝 Test Credentials (After Creating Account)

Use the signup form to create a test account with:
- Name: Test User
- Email: test@example.com
- Password: testpass123

---

## 🎯 Core Features to Try

### 1. **Home Page** (`/`)
- Overview of Eximly
- Quick access to login/signup
- Feature highlights

### 2. **Sign Up** (`/auth/signup`)
- Create your account
- Secure password hashing with bcrypt

### 3. **Dashboard** (`/dashboard`)
- View your shipments
- See statistics (total, active, completed)
- Quick access to add new shipment

### 4. **Add Shipment** (`/export/form`)
- Fill in basic details (product, quantity, countries)
- Choose export type:
  - **Domestic**: Simple domestic shipment
  - **International**: Requires passport, customs ID, export license, shipping method

### 5. **Shipment Details** (`/shipment/[id]`)
- View complete shipment information
- Delete shipments
- See international fields (if applicable)

### 6. **Static Pages**
- `/about` - About Eximly
- `/services` - Our services
- `/contact` - Contact form
- `/faq` - Frequently asked questions
- `/privacy-policy` - Privacy policy
- `/terms` - Terms of service

---

## 🔑 Key API Endpoints

### Register New User
```bash
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepass123",
  "confirmPassword": "securepass123"
}
```

### Login
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepass123"
}
```

### Create Shipment (Domestic)
```bash
POST /api/shipments
Authorization: Bearer <token>
Content-Type: application/json

{
  "productName": "Electronics",
  "quantity": 100,
  "originCountry": "India",
  "destinationCountry": "India",
  "exportType": "domestic"
}
```

### Create Shipment (International)
```bash
POST /api/shipments
Authorization: Bearer <token>
Content-Type: application/json

{
  "productName": "Textiles",
  "quantity": 50,
  "originCountry": "India",
  "destinationCountry": "USA",
  "exportType": "international",
  "passportNumber": "A12345678",
  "customsDeclarationId": "CD-2024-001",
  "exportLicenseNumber": "EL-2024-001",
  "shippingMethod": "air"
}
```

---

## 📂 Project Structure Highlights

```
eximly/
├── app/
│   ├── api/              # Backend routes
│   ├── auth/             # Authentication pages
│   ├── dashboard/        # Main dashboard
│   ├── export/form/      # Shipment creation
│   ├── shipment/[id]/    # Shipment details
│   └── [static pages]/   # About, FAQ, etc.
├── components/
│   └── Navbar.tsx        # Navigation bar
├── lib/
│   ├── db.ts            # MongoDB connection
│   ├── auth.ts          # JWT utilities
│   └── models/          # User & Shipment models
└── tailwind.config.ts   # Styling config
```

---

## 🎨 UI Components & Styling

All components use Tailwind CSS with custom color classes:

### Button Styles
```tsx
<button className="btn-primary">Primary Button</button>
<button className="btn-secondary">Secondary Button</button>
<button className="btn-danger">Danger Button</button>
```

### Card Component
```tsx
<div className="card">
  {/* Card content */}
</div>
```

### Color Palette
- Primary: `#0d6efd` (Blue)
- Success: `#198754` (Green)
- Danger: `#dc3545` (Red)
- Warning: `#ffc107` (Yellow)
- Info: `#0dcaf0` (Cyan)

---

## 🔐 Security Notes

1. **JWT Token Storage**: Stored in localStorage (can be upgraded to httpOnly cookies)
2. **Password Hashing**: All passwords hashed with bcrypt (10 salt rounds)
3. **API Protection**: All shipment endpoints require valid JWT token
4. **Input Validation**: Both client-side and server-side validation

---

## 🐛 Troubleshooting

### MongoDB Connection Error
- Check `.env.local` has correct `MONGODB_URI`
- Ensure MongoDB Atlas IP whitelist includes your IP
- Verify credentials are correct

### Port 3000 Already in Use
```bash
# Use a different port
PORT=3001 npm run dev
```

### Dependencies Not Installing
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

---

## 📚 Next Steps

1. **Explore the dashboard** after logging in
2. **Create test shipments** (both domestic and international)
3. **Review the code** in `/app/api` and `/lib`
4. **Customize colors** in `tailwind.config.ts`
5. **Deploy** to Vercel when ready

---

## 💡 Tips & Tricks

- Use the navbar dropdown to see user menu
- Tables are responsive - scroll on mobile
- Forms have real-time validation
- All timestamps are formatted to local date format
- Use browser DevTools to inspect network requests

---

## 📞 Need Help?

- Check `/faq` page for common questions
- Visit `/contact` to reach support
- Review the main `IMPLEMENTATION_GUIDE.md` for detailed documentation

---

**Happy shipping with Eximly! 🚀**
