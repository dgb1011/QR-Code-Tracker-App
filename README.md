# QR Code Event Check-in System

A modern, mobile-first event check-in application built with Next.js 14, Supabase, and TypeScript. Features a beautiful UI inspired by Nexis Solutions with whites, oranges, and purples color scheme.

## 🚀 Phase 1: Foundation & Authentication (COMPLETED)

### What's Been Built

#### ✅ Project Setup
- Next.js 14 with App Router
- TypeScript configuration
- Tailwind CSS with custom Nexis Solutions color scheme
- shadcn/ui components
- Supabase integration

#### ✅ Database Schema
- **Events table**: Stores event information
- **Admins table**: Admin authentication
- **Staff table**: Staff authentication and management
- **Attendees table**: Attendee data with QR codes and check-in status
- Row Level Security (RLS) policies enabled

#### ✅ Authentication System
- **Admin Portal** (`/admin/*`)
  - Beautiful signup page with form validation
  - Login page with session management
  - Role-based access control
  - 8-hour session duration

- **Staff Portal** (`/staff/*`)
  - Dedicated staff login with staff codes
  - Mobile-optimized interface
  - 4-hour session duration
  - Simple credential system

#### ✅ Design System
- Custom color palette (Orange #FF6B35, Purple #8B5CF6)
- Gradient backgrounds
- Modern, minimalistic UI
- Mobile-first responsive design

### Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **Auth**: Custom bcrypt-based authentication
- **Deployment**: Vercel

### Getting Started

1. **Environment Setup**
   ```bash
   # Already configured in .env.local
   NEXT_PUBLIC_SUPABASE_URL=https://pxwuzfqtintjmfhtlvuu.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=[your-key]
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Run Development Server**
```bash
npm run dev
   ```

4. **Access the Application**
   - Admin Signup: `http://localhost:3000/admin/signup`
   - Admin Login: `http://localhost:3000/admin/login`
   - Staff Login: `http://localhost:3000/staff/login`

### Database Structure

```sql
-- Events (multi-event ready)
events (id, name, date, created_at)

-- Admin authentication
admins (id, email, password_hash, created_at)

-- Staff authentication
staff (id, event_id, name, staff_code, password_hash, is_active, created_at)

-- Attendees with check-in tracking
attendees (id, event_id, name, email, photo_url, qr_code, checked_in, checked_in_at, checked_in_by, created_at)
```

### API Endpoints (Phase 1)

- `POST /api/auth/admin/login` - Admin login
- `POST /api/auth/admin/signup` - Admin registration
- `POST /api/auth/staff/login` - Staff login

### Security Features

✅ Password hashing with bcryptjs (12 rounds)
✅ HTTP-only cookies for session management
✅ Role-based access control (admin vs staff)
✅ Row Level Security on all Supabase tables
✅ Protected routes with middleware
✅ Input validation and sanitization

## 🔄 Next Steps (Phase 2)

### Attendee & Staff Management
- [ ] CSV upload component with validation
- [ ] Wizard-style "Create Attendee" form
- [ ] Attendee CRUD operations
- [ ] Staff management interface
- [ ] Supabase Storage setup for photos
- [ ] Attendee list with search/filter

### Upcoming Phases

- **Phase 3**: QR Code Generation & Email System
- **Phase 4**: Staff Portal & Mobile Scanner
- **Phase 5**: Real-time Dashboard
- **Phase 6**: Polish & Deployment
- **Phase 7**: Multi-event & SaaS Features

## 📁 Project Structure

```
/app
  /admin
    /login         - Admin login page
    /signup        - Admin signup page
    /dashboard     - Admin dashboard (placeholder)
  /staff
    /login         - Staff login page
    /scan          - QR scanner page (placeholder)
  /api
    /auth
      /admin       - Admin auth endpoints
      /staff       - Staff auth endpoints

/components
  /ui              - shadcn/ui components
  /auth
    /admin         - Admin auth forms
    /staff         - Staff auth forms

/lib
  /supabase        - Supabase client utilities
  /utils           - Helper functions (auth, QR, etc.)
  /types           - TypeScript type definitions
```

## 🎨 Design Features

### Color Scheme (Nexis Solutions Inspired)
- **Primary Orange**: `#FF6B35` - CTA buttons, accents
- **Secondary Purple**: `#8B5CF6` - Secondary actions
- **Background**: White with subtle gradients
- **Light Accents**: Light orange (#FFE4D6), Light purple (#F3F0FF)

### UI Components
- Rounded corners with subtle shadows
- Gradient backgrounds on auth pages
- Large, accessible touch targets
- Modern typography with clear hierarchy

## 🔐 Default Credentials

No default admin account exists. Create one via:
1. Navigate to `/admin/signup`
2. Enter email and password
3. Account will be created and logged in automatically

Staff accounts are created by admins (coming in Phase 2).

## 📝 Development Notes

- Session cookies are HTTP-only for security
- Admin sessions last 8 hours
- Staff sessions last 4 hours
- All routes are protected by middleware
- Database uses UUIDs for all primary keys
- QR codes use encrypted UUIDs (not sequential)

## 🚀 Deployment

The application is configured for Vercel deployment:
- Environment variables configured
- Supabase connection established
- Edge functions ready for Phase 4 scanner

---

**Status**: Phase 1 Complete ✅
**Next Phase**: Attendee & Staff Management
**Timeline**: 6-8 days for MVP completion
