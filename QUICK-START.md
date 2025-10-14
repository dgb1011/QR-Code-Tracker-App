# Quick Start Guide 🚀

## Your QR Check-in App is Ready!

The development server is running at: **http://localhost:3000**

## 🎨 What You Can Do Right Now

### 1. Create Your Admin Account
👉 **Navigate to**: `http://localhost:3000/admin/signup`

- Enter your email
- Create a secure password (8+ characters)
- Click "Create Account"
- You'll be automatically logged in!

### 2. Access the Admin Portal
👉 **URL**: `http://localhost:3000/admin/login`

- Beautiful orange gradient design
- Secure authentication
- Protected dashboard access

### 3. Check Out the Staff Portal
👉 **URL**: `http://localhost:3000/staff/login`

- Purple gradient design
- Mobile-optimized interface
- Staff code authentication (staff accounts created in Phase 2)

## 🎯 Authentication Flow

```
Step 1: Visit /admin/signup
   ↓
Step 2: Enter email + password
   ↓
Step 3: Account created automatically
   ↓
Step 4: Logged in and redirected to dashboard
   ↓
Step 5: Start managing your event!
```

## 🔐 Security Features Active

✅ Passwords hashed with bcrypt
✅ HTTP-only session cookies
✅ Role-based access control
✅ Protected routes
✅ Input validation
✅ Supabase RLS policies

## 📊 Database Ready

Your Supabase database has:
- ✅ Events table (with default event)
- ✅ Admins table (for your account)
- ✅ Staff table (for check-in staff)
- ✅ Attendees table (for QR check-in)

## 🎨 Design System

**Colors** (Nexis Solutions Inspired):
- 🧡 Orange Primary: `#FF6B35` (CTA buttons)
- 💜 Purple Secondary: `#8B5CF6` (Staff portal)
- ⚪ White Backgrounds with gradients
- 🎨 Beautiful modern UI

## 🚀 Next Steps

After Phase 1, you can:
1. ✅ Create admin accounts
2. ✅ Login securely
3. ✅ Access protected routes
4. ⏳ Upload attendees (Phase 2)
5. ⏳ Generate QR codes (Phase 3)
6. ⏳ Scan at events (Phase 4)

## 📱 Test the App

### Test Admin Flow
```bash
1. Open: http://localhost:3000/admin/signup
2. Create account: your-email@example.com / password123
3. See dashboard: http://localhost:3000/admin/dashboard
4. Logout (clear cookies)
5. Login again: http://localhost:3000/admin/login
```

### Test Protection
```bash
1. Try accessing: http://localhost:3000/admin/dashboard
   (without login → redirects to login page)
2. Login first
3. Now dashboard is accessible ✅
```

## 🛠️ Development Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## 📁 Important Files

```
.env.local          → Environment variables (Supabase keys)
README.md           → Full documentation
PHASE-1-COMPLETE.md → Phase 1 completion summary
middleware.ts       → Route protection logic
app/admin/*         → Admin portal pages
app/staff/*         → Staff portal pages
components/auth/*   → Authentication forms
```

## 🎯 Current Phase

**Phase 1**: ✅ COMPLETE
- Foundation setup
- Authentication system
- Beautiful UI
- Database schema
- Security measures

**Phase 2**: 🔄 NEXT
- CSV upload
- Attendee wizard
- Staff management
- Photo storage

## 💡 Pro Tips

1. **Admin Account**: Create your first admin account via signup
2. **Session Duration**: Admin sessions last 8 hours, Staff 4 hours
3. **Mobile Ready**: Staff portal is optimized for mobile devices
4. **Secure**: All passwords are hashed, never stored in plain text
5. **Color Scheme**: Orange for admin, Purple for staff

## 🔗 Quick Links

- Admin Signup: http://localhost:3000/admin/signup
- Admin Login: http://localhost:3000/admin/login  
- Admin Dashboard: http://localhost:3000/admin/dashboard
- Staff Login: http://localhost:3000/staff/login
- Staff Scanner: http://localhost:3000/staff/scan

## 🐛 Troubleshooting

**Server not starting?**
```bash
npm install
npm run dev
```

**Database connection issues?**
- Check `.env.local` file exists
- Verify Supabase URL and keys
- Supabase project status: ACTIVE_HEALTHY ✅

**Can't create admin?**
- Check password is 8+ characters
- Verify email format
- Check browser console for errors

## 📞 Support

- Check README.md for full documentation
- Review PHASE-1-COMPLETE.md for technical details
- Examine middleware.ts for route protection logic

---

**Status**: 🚀 Ready to use!
**Server**: http://localhost:3000
**Phase**: 1 of 7 complete
**Next**: Attendee & Staff Management

