<!-- 29ba9ff2-1534-482f-a569-994b6f817e46 844a8816-5c46-4769-86e0-bc741c9796de -->
# QR Code Event Check-in System - Development Plan

## 🎯 Project Overview

Build a lightweight, mobile-first event check-in application using Next.js 14 (App Router), Supabase, Stripe (future), Resend, and Vercel. The MVP focuses on single-event management with architecture prepared for multi-tenant SaaS expansion.

## 🏗️ Technical Architecture

### Tech Stack
- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Next.js API Routes, Supabase (PostgreSQL + Auth + Storage)
- **QR Code**: `qrcode` (generation), `html5-qrcode` or `@zxing/browser` (scanning)
- **Email**: Resend for QR code delivery
- **File Processing**: `papaparse` for CSV parsing
- **Deployment**: Vercel (Edge Functions for scanning)
- **Future**: Stripe for commission model

### Design System (Inspired by Nexis Solutions)
- **Color Palette**: Whites, oranges, and purples
- **Style**: Modern, minimalistic design
- **UI Components**: Beautiful CTA buttons and auth flows
- **Inspiration**: [Nexis Solutions](https://nexissolutions.vercel.app/) landing page design

### Database Schema (Supabase)

```sql
-- Events table (prepared for multi-event, currently single)
events (
  id uuid PRIMARY KEY,
  name text,
  date timestamp,
  created_at timestamp
)

-- Attendees table
attendees (
  id uuid PRIMARY KEY,
  event_id uuid REFERENCES events(id),
  name text NOT NULL,
  email text,
  photo_url text,
  qr_code text UNIQUE, -- encrypted UUID
  checked_in boolean DEFAULT false,
  checked_in_at timestamp,
  created_at timestamp
)

-- Admin auth (simple password)
admins (
  id uuid PRIMARY KEY,
  password_hash text,
  created_at timestamp
)
```

### Key Technical Decisions

1. **QR Code Format**: Encrypted UUID stored as `qr_code` field → prevents tampering
2. **Image Storage**: Supabase Storage bucket for attendee photos
3. **Auth**: Beautiful signup/login with modern UI design
4. **Camera Access**: Use `html5-qrcode` library for cross-device compatibility
5. **Real-time Updates**: Supabase Realtime for live check-in dashboard

## 📱 User Flows

### Flow 1: Admin Setup & Import
1. Admin signs up/logs in with beautiful modern UI → `/admin/login`
2. Lands on admin dashboard → `/admin/dashboard`
3. Can either:
   - Click "Import CSV" → Modal opens for bulk import
   - Click "Create Attendee" → Wizard-style form opens
   - Click "Manage Staff" → Create/manage staff members
4. System validates → Creates attendees → Generates QR codes
5. Option to "Send All QR Codes via Email"
6. Staff management: Create staff accounts with simple credentials

### Flow 2: Wizard-Style Attendee Creation
1. Admin clicks "Create Attendee" button
2. Step 1: Enter attendee name
3. Step 2: Enter email address
4. Step 3: Upload photo or enter photo URL
5. Step 4: Review and confirm
6. System generates QR code automatically
7. Option to send QR code via email immediately

### Flow 3: QR Code Delivery
1. Admin clicks "Email QR Codes" (bulk) or individual "Send QR"
2. System generates QR code PNG via `qrcode` library
3. Resend sends email with:
   - Attendee name
   - Event details
   - QR code image attachment
   - "Your Check-in Code" message

### Flow 4: Staff Portal & Event Check-in (Mobile)
1. Staff accesses dedicated staff portal → `/staff/login`
2. Staff logs in with simple credentials (staff code + password)
3. Lands on mobile-optimized scanning interface → `/staff/scan`
4. Camera activates (permission requested)
5. Scans attendee QR code
6. API validates QR → Returns attendee data
7. Full-screen shows:
   - ✅ Attendee photo (large)
   - Name (bold, large text)
   - "Checked In" status + timestamp
   - Staff member who processed check-in
   - Auto-close after 3 seconds
8. Updates Supabase `checked_in = true` + `checked_in_by = staff_id`
9. Real-time sync across all staff devices and admin dashboard

### Flow 5: Real-time Monitoring
1. Admin views `/dashboard`
2. See metrics: Total attendees / Checked in / Pending
3. Live list updates as people check in (Supabase Realtime)
4. Search/filter functionality
5. Export checked-in list as CSV

## 🚀 Implementation Phases

### Phase 1: Foundation & Auth (Day 1)
- Initialize Next.js 14 project with TypeScript
- Setup Tailwind CSS + shadcn/ui components
- Configure Supabase project (database, auth, storage)
- Implement beautiful admin signup/login UI with Nexis Solutions inspired design
- Create dedicated staff portal authentication system
- Create protected route middleware for admin and staff roles
- Build CTA button flows for both authentication systems
- Setup role-based access control (RBAC)

### Phase 2: Attendee & Staff Management (Day 2)
- Build CSV upload component with validation
- Implement CSV parsing with `papaparse`
- Create wizard-style "Create Attendee" form (Name, Email, Photo URL)
- Implement attendee CRUD operations
- Build staff management interface (create, edit, deactivate staff)
- Setup Supabase Storage for photos
- Build attendee list UI with search/filter
- Design modern, intuitive UI for quick attendee creation
- Implement staff credential generation and management

### Phase 3: QR Code System (Day 3)
- Generate unique encrypted QR codes per attendee
- Implement QR code image generation
- Build Resend email templates
- Create bulk & individual email sending
- Add "Download All QR Codes" feature (ZIP)

### Phase 4: Staff Portal & Scanning (Day 4)
- Build dedicated staff portal with mobile-optimized interface
- Implement camera-based QR scanner (`html5-qrcode`)
- Build scan validation API route with staff tracking
- Create check-in confirmation UI (full-screen)
- Add manual check-in option (search by name)
- Implement check-in sound/haptic feedback
- Build real-time sync between staff devices and admin dashboard
- Add offline capability for staff scanning

### Phase 5: Dashboard & Real-time (Day 5)
- Build real-time dashboard with Supabase subscriptions
- Create metrics cards (total, checked-in, pending)
- Add check-in activity feed
- Implement export functionality
- Build event reset/archive feature

### Phase 6: Polish & Deploy (Day 6)
- Mobile responsiveness testing
- Performance optimization (image compression)
- Error handling & loading states
- Deploy to Vercel
- Setup environment variables
- End-to-end testing

### Phase 7: Post-MVP (Future)
- Multi-event support (event selection dropdown)
- Commission model integration with Stripe
- Organization/workspace accounts
- Advanced analytics dashboard
- API for third-party integrations

## 📂 Project Structure

```
/app
  /(admin)
    /admin
      /login
        page.tsx
      /signup
        page.tsx
      /dashboard
        page.tsx
      /staff
        page.tsx
    layout.tsx (admin protected)
  /(staff)
    /staff
      /login
        page.tsx
      /scan
        page.tsx
      /dashboard
        page.tsx
    layout.tsx (staff protected)
  /api
    /auth
      /admin
        /login
          route.ts
        /signup
          route.ts
      /staff
        /login
          route.ts
    /attendees
      route.ts (CRUD)
    /staff
      route.ts (CRUD)
    /upload-csv
      route.ts
    /generate-qr
      route.ts
    /send-email
      route.ts
    /check-in
      route.ts
    /attendee
      /[qr_code]
        route.ts
  layout.tsx
  page.tsx (redirect to admin login)

/components
  /ui (shadcn components)
  /auth
    /admin
      admin-login-form.tsx
      admin-signup-form.tsx
    /staff
      staff-login-form.tsx
    auth-wrapper.tsx
  /admin
    attendee-list.tsx
    csv-upload-modal.tsx
    create-attendee-wizard.tsx
    staff-management.tsx
    metrics-cards.tsx
  /staff
    qr-scanner.tsx
    check-in-confirmation.tsx
    staff-dashboard.tsx

/lib
  /supabase
    client.ts
    server.ts
  /utils
    csv-parser.ts
    qr-generator.ts
    email-sender.ts
    auth-utils.ts
  /types
    database.types.ts

/public
  /email-templates
```

## 🎨 Design System Specifications

### Color Palette (Inspired by Nexis Solutions)
- **Primary White**: #FFFFFF (backgrounds, cards)
- **Orange Primary**: #FF6B35 (CTA buttons, accents)
- **Purple Secondary**: #8B5CF6 (secondary actions, highlights)
- **Orange Light**: #FFE4D6 (subtle backgrounds)
- **Purple Light**: #F3F0FF (subtle backgrounds)
- **Text Dark**: #1F2937 (primary text)
- **Text Light**: #6B7280 (secondary text)

### UI Components
- **Buttons**: Rounded corners, gradient backgrounds, hover effects
- **Forms**: Clean inputs with focus states
- **Cards**: Subtle shadows, rounded corners
- **Typography**: Modern font stack, clear hierarchy
- **Spacing**: Consistent 8px grid system

## 🔐 Security Considerations

1. **QR Code Security**: Use signed/encrypted UUIDs (not sequential IDs)
2. **Rate Limiting**: Prevent brute-force QR scanning
3. **Environment Variables**: Never expose Supabase anon key in client (use RLS)
4. **Row Level Security**: Enable RLS on all Supabase tables
5. **HTTPS Only**: Force secure connections for camera access

## 🎨 UI/UX Highlights

- **Mobile-first design**: Optimized for 375px-428px screens
- **Large touch targets**: Min 44x44px for scan buttons
- **High contrast**: Ensure readability in event lighting
- **Offline fallback**: Show cached data if connection drops
- **Haptic feedback**: Vibration on successful scan
- **Auto-focus**: Camera auto-focuses on QR codes
- **Modern aesthetics**: Clean, minimalistic design with beautiful color scheme

## 📊 Future SaaS Architecture (Post-MVP)

### Multi-tenancy Model
```sql
organizations (id, name, stripe_customer_id)
users (id, org_id, email, role)
events (id, org_id, name, pricing_tier)
billing_usage (id, org_id, attendees_checked_in, amount_due)
```

### Commission Model Integration
- Track check-ins per event
- Calculate commission: `checked_in_count * price_per_attendee`
- Monthly invoicing via Stripe
- Usage dashboard for organizations

## 🚀 Deployment Checklist

- [ ] Supabase project created with RLS policies
- [ ] Resend API key configured
- [ ] Vercel project linked to GitHub
- [ ] Environment variables set in Vercel
- [ ] Domain configured (optional)
- [ ] Database migrations run
- [ ] Test admin account created
- [ ] Sample CSV template provided

## 📝 Deliverables

1. Fully functional Next.js application
2. Supabase database with sample data
3. Deployed Vercel URL for testing
4. Admin credentials document
5. CSV upload template
6. Quick start guide (README)
7. Video walkthrough (Loom)

## ⏱️ Estimated Timeline

**MVP Delivery**: 6-8 days (with buffer)
**Post-MVP (Multi-event)**: +3-4 days
**SaaS/Commission Model**: +10-14 days

**Recommendation**: Propose 10-day timeline to client for production-ready MVP with your tech stack, emphasizing long-term benefits over Bubble.io's limitations for scaling.


### To-dos

- [ ] Initialize Next.js 14 project with TypeScript, Tailwind CSS, and shadcn/ui
- [ ] Configure Supabase project with database schema, auth, and storage bucket
- [ ] Implement beautiful admin signup/login UI with Nexis Solutions inspired design
- [ ] Create dedicated staff portal authentication system
- [ ] Build role-based access control (RBAC) for admin and staff
- [ ] Build CTA button flows for both authentication systems
- [ ] Build CSV upload and parsing system for attendee import
- [ ] Create wizard-style "Create Attendee" form (Name, Email, Photo URL)
- [ ] Create attendee management CRUD operations and UI
- [ ] Build staff management interface (create, edit, deactivate staff)
- [ ] Implement QR code generation with encrypted UUIDs
- [ ] Build Resend email integration for QR code delivery
- [ ] Build dedicated staff portal with mobile-optimized interface
- [ ] Implement mobile camera-based QR code scanner
- [ ] Build check-in validation and confirmation UI with staff tracking
- [ ] Create real-time sync between staff devices and admin dashboard
- [ ] Add offline capability for staff scanning
- [ ] Create real-time dashboard with metrics and activity feed
- [ ] Add CSV export and event reset functionality
- [ ] Deploy to Vercel with environment configuration and testing
