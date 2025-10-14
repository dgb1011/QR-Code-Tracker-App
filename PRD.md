# Product Requirements Document (PRD)
## QR Code Event Check-in System

**Document Version:** 1.0  
**Date:** December 2024  
**Product Manager:** Senior Project Manager  
**Development Team:** Full-Stack Development Team  

---

## 1. Executive Summary

### 1.1 Product Vision
Build a lightweight, mobile-first event check-in application that enables event organizers to efficiently manage attendee registration and check-in processes through QR code technology. The system will serve as the foundation for a future SaaS platform with commission-based revenue model.

### 1.2 Business Objectives
- **Primary Goal:** Streamline event check-in process for event organizers
- **Secondary Goal:** Reduce check-in friction and improve attendee experience
- **Long-term Vision:** Transform into multi-tenant SaaS platform with usage-based billing

### 1.3 Success Metrics
- **Operational:** 90% reduction in check-in time per attendee
- **User Experience:** <2 second scan-to-confirmation response time
- **Reliability:** 99.9% uptime during events
- **Business:** Foundation for $50K+ ARR SaaS product

---

## 2. Market Analysis & Opportunity

### 2.1 Problem Statement
Event organizers currently face significant challenges:
- **Manual Check-in Bottlenecks:** Long lines and delays at event entrances
- **Hardware Costs:** Expensive badge scanners ($500-2000 per device)
- **Limited Flexibility:** Fixed hardware tied to specific locations
- **Poor Analytics:** Limited real-time insights into attendance patterns

### 2.2 Target Market
- **Primary:** Small to medium event organizers (50-2000 attendees)
- **Secondary:** Corporate events, conferences, workshops
- **Tertiary:** Wedding planners, private parties, community events

### 2.3 Competitive Landscape
- **Direct Competitors:** Eventbrite Mobile App (3.5% + fees), dedicated badge scanners
- **Indirect Competitors:** Manual paper lists, Excel-based tracking
- **Competitive Advantage:** Lower cost, higher flexibility, better analytics

---

## 3. Product Requirements

### 3.1 Core Features (MVP)

#### 3.1.1 Authentication System
**Priority:** P0 (Critical)
- Beautiful, modern admin signup/login system
- Dedicated staff portal authentication
- Minimalistic design with whites, oranges, and purples color scheme
- CTA button flow connecting signup/login auth system
- Session management with automatic logout
- Protected routes for admin and staff functions

**Acceptance Criteria:**
- Modern, minimalistic UI inspired by Nexis Solutions design
- Color scheme: Whites, oranges, and purples
- Admin can signup and log in with secure credentials
- Staff can access dedicated portal with simple credentials
- Intuitive CTA button flow for auth process
- Session persists across browser refreshes
- Automatic logout after 8 hours of inactivity (admin) / 4 hours (staff)
- Role-based access control (admin vs staff permissions)

#### 3.1.2 Attendee Management
**Priority:** P0 (Critical)
- CSV bulk import functionality
- Wizard-style "Create Attendee" form (Name, Email, Photo URL)
- Individual attendee record management
- Photo upload and storage
- Data validation and error handling

**Acceptance Criteria:**
- Accept CSV files with columns: Name, Email, Photo URL
- Wizard-style create attendee form with step-by-step flow
- Validate email format and required fields
- Handle duplicate entries gracefully
- Display clear error messages for invalid data
- Support 1000+ attendees per event
- Quick attendee creation with modern, intuitive UI

#### 3.1.3 QR Code Generation
**Priority:** P0 (Critical)
- Generate unique QR code for each attendee
- Encrypted UUID-based QR codes for security
- High-quality PNG image generation
- Batch generation capability

**Acceptance Criteria:**
- Each QR code is unique and tamper-proof
- QR codes scan reliably on all mobile devices
- Generation time <1 second per attendee
- Support for 1000+ concurrent QR codes

#### 3.1.4 Email Delivery System
**Priority:** P0 (Critical)
- Automated email delivery of QR codes
- Bulk email functionality
- Individual email resend capability
- Professional email templates

**Acceptance Criteria:**
- Emails delivered within 30 seconds of generation
- 99%+ email delivery rate
- Mobile-optimized email templates
- Include event details and instructions

#### 3.1.5 Staff Portal & Mobile Scanner
**Priority:** P0 (Critical)
- Dedicated staff portal with mobile-optimized interface
- Camera-based QR code scanning
- Cross-platform compatibility (iOS/Android/Desktop)
- Real-time scan validation and sync
- Offline capability for scanned data
- Multi-staff support with live updates

**Acceptance Criteria:**
- Dedicated staff portal accessible via simple credentials
- Mobile-first interface with large touch targets
- Scan success rate >95% in normal lighting
- Works on devices with 5MP+ cameras
- Auto-focus and image stabilization
- Handles damaged/partial QR codes
- Real-time sync across multiple staff devices
- Offline mode with data sync when connection restored

#### 3.1.6 Check-in Confirmation
**Priority:** P0 (Critical)
- Full-screen attendee confirmation display
- Large photo and name display
- Check-in timestamp recording
- Visual and haptic feedback

**Acceptance Criteria:**
- Display updates within 500ms of scan
- Clear visual confirmation of check-in status
- Prevents duplicate check-ins
- Auto-advance to next scan after 3 seconds

#### 3.1.7 Real-time Dashboard
**Priority:** P1 (High)
- Live attendance metrics
- Real-time check-in activity feed
- Search and filter capabilities
- Export functionality

**Acceptance Criteria:**
- Dashboard updates within 1 second of check-in
- Display total attendees, checked-in count, pending count
- Search attendees by name or email
- Export checked-in list as CSV

### 3.2 Future Features (Post-MVP)

#### 3.2.1 Multi-Event Management
**Priority:** P2 (Medium)
- Event selection and switching
- Event-specific attendee lists
- Event scheduling and management

#### 3.2.2 Advanced Analytics
**Priority:** P2 (Medium)
- Check-in time analytics
- Peak attendance tracking
- Attendance pattern insights
- Custom reporting

#### 3.2.3 SaaS Platform Features
**Priority:** P3 (Low)
- Organization/workspace accounts
- User role management
- Usage-based billing integration
- API for third-party integrations

---

## 4. Technical Specifications

### 4.1 Architecture Overview
- **Frontend:** Next.js 14 with App Router
- **Backend:** Next.js API Routes with Supabase
- **Database:** PostgreSQL via Supabase
- **Authentication:** Custom password-based auth
- **File Storage:** Supabase Storage
- **Email Service:** Resend
- **Deployment:** Vercel

### 4.2 Database Schema
```sql
-- Events table (prepared for multi-event expansion)
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Attendees table
CREATE TABLE attendees (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID REFERENCES events(id),
  name TEXT NOT NULL,
  email TEXT,
  photo_url TEXT,
  qr_code TEXT UNIQUE NOT NULL, -- encrypted UUID
  checked_in BOOLEAN DEFAULT FALSE,
  checked_in_at TIMESTAMP WITH TIME ZONE,
  checked_in_by UUID REFERENCES staff(id), -- track which staff member checked in
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Admin authentication
CREATE TABLE admins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Staff authentication and management
CREATE TABLE staff (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID REFERENCES events(id),
  name TEXT NOT NULL,
  staff_code TEXT UNIQUE NOT NULL, -- simple code for staff login
  password_hash TEXT NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 4.3 API Endpoints

#### Admin Endpoints
- `POST /api/auth/admin/login` - Admin authentication
- `POST /api/auth/admin/signup` - Admin registration
- `GET /api/attendees` - List all attendees
- `POST /api/attendees` - Create new attendee
- `PUT /api/attendees/[id]` - Update attendee
- `DELETE /api/attendees/[id]` - Delete attendee
- `POST /api/upload-csv` - Bulk import attendees
- `POST /api/generate-qr/[id]` - Generate QR code
- `POST /api/send-email` - Send QR code email
- `GET /api/export` - Export attendee data
- `GET /api/staff` - List event staff
- `POST /api/staff` - Create staff member
- `PUT /api/staff/[id]` - Update staff member
- `DELETE /api/staff/[id]` - Deactivate staff member

#### Staff Endpoints
- `POST /api/auth/staff/login` - Staff authentication
- `GET /api/staff/check-ins` - Get check-in statistics
- `POST /api/check-in` - Process attendee check-in
- `GET /api/attendee/[qr_code]` - Get attendee by QR code

### 4.4 Security Requirements
- Row Level Security (RLS) enabled on all tables
- Encrypted QR codes using signed UUIDs
- Rate limiting on API endpoints
- HTTPS enforcement for all connections
- Input validation and sanitization
- CSRF protection on state-changing operations

---

## 5. User Experience Design

### 5.1 User Personas

#### 5.1.1 Event Admin (Primary User)
- **Role:** Event organizer or manager
- **Goals:** Efficiently manage attendee data and monitor check-in process
- **Pain Points:** Complex data management, poor visibility into event flow
- **Technical Comfort:** Basic to intermediate
- **Access:** Full admin dashboard with attendee management

#### 5.1.2 Event Staff (Secondary User)
- **Role:** Check-in staff at event entrance
- **Goals:** Quickly scan and confirm attendee check-ins
- **Pain Points:** Slow scanning, unclear confirmations, complex interfaces
- **Technical Comfort:** Basic (mobile device users)
- **Access:** Dedicated staff portal optimized for mobile scanning

### 5.2 User Journey Maps

#### 5.2.1 Admin Setup Journey
1. **Login** → Secure password authentication
2. **Import Data** → CSV upload with validation
3. **Generate QR Codes** → Batch QR code creation
4. **Send Emails** → Automated QR code delivery
5. **Monitor Event** → Real-time dashboard monitoring
6. **Export Data** → Post-event data export

#### 5.2.2 Staff Portal Journey
1. **Staff Login** → Access dedicated staff portal with staff credentials
2. **Navigate to Scanner** → Mobile-optimized scan interface
3. **Scan QR Code** → Point camera at attendee QR
4. **Confirm Identity** → View attendee photo and name (full-screen)
5. **Complete Check-in** → Automatic status update with haptic feedback
6. **Next Attendee** → Auto-advance to next scan (3 seconds)
7. **Real-time Sync** → All staff see live updates across devices

#### 5.2.3 Staff Portal Features
- **Dedicated Authentication**: Simple staff codes or QR-based login
- **Mobile-First Interface**: Large buttons, simplified navigation
- **Offline Capability**: Continue scanning during connectivity issues
- **Multi-Staff Support**: Multiple staff can work simultaneously
- **Real-time Updates**: Live sync with admin dashboard

### 5.3 Design Principles
- **Mobile-First:** Optimized for smartphone use
- **Speed:** Minimize clicks and loading times
- **Clarity:** Large text and high contrast
- **Reliability:** Graceful error handling
- **Accessibility:** WCAG 2.1 AA compliance

---

## 6. Performance Requirements

### 6.1 Response Times
- **Page Load:** <2 seconds on 3G connection
- **QR Scan Response:** <500ms from scan to confirmation
- **Email Delivery:** <30 seconds from generation
- **Dashboard Updates:** <1 second real-time updates

### 6.2 Scalability
- **Concurrent Users:** Support 50+ simultaneous check-ins
- **Attendee Capacity:** Handle 2000+ attendees per event
- **Database Performance:** <100ms query response time
- **File Storage:** 10GB+ storage capacity

### 6.3 Reliability
- **Uptime:** 99.9% availability during events
- **Error Rate:** <0.1% failed check-ins
- **Data Integrity:** Zero data loss tolerance
- **Backup:** Automated daily backups

---

## 7. Integration Requirements

### 7.1 Third-Party Services
- **Resend:** Email delivery service
- **Supabase:** Database and authentication
- **Vercel:** Hosting and deployment
- **Future:** Stripe for payment processing

### 7.2 Browser Compatibility
- **Mobile:** iOS Safari 14+, Android Chrome 90+
- **Desktop:** Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Camera Access:** WebRTC support required

### 7.3 Device Requirements
- **Minimum Camera:** 5MP resolution
- **RAM:** 2GB+ recommended
- **Storage:** 100MB available space
- **Network:** 3G+ connection required

---

## 8. Data & Privacy Requirements

### 8.1 Data Collection
- **Personal Data:** Name, email, photo (with consent)
- **Event Data:** Check-in timestamps, attendance status
- **Usage Data:** Scan attempts, error logs (anonymized)

### 8.2 Data Protection
- **Encryption:** AES-256 for data at rest
- **Transmission:** TLS 1.3 for data in transit
- **Access Control:** Role-based permissions
- **Retention:** Configurable data retention policies

### 8.3 Compliance
- **GDPR:** Right to deletion, data portability
- **CCPA:** Consumer privacy rights
- **SOC 2:** Security controls implementation

---

## 9. Testing Strategy

### 9.1 Testing Types
- **Unit Testing:** 80%+ code coverage
- **Integration Testing:** API endpoint validation
- **End-to-End Testing:** Complete user workflows
- **Performance Testing:** Load and stress testing
- **Security Testing:** Penetration testing

### 9.2 Test Scenarios
- **Happy Path:** Complete check-in workflow
- **Edge Cases:** Invalid QR codes, network failures
- **Error Handling:** Graceful degradation
- **Mobile Testing:** Various device sizes and OS versions

---

## 10. Launch Strategy

### 10.1 MVP Launch (Phase 1)
- **Timeline:** 6-8 days development
- **Scope:** Single event, basic features
- **Testing:** 2-day beta with select event organizers
- **Rollout:** Gradual feature enablement

### 10.2 Post-MVP Roadmap
- **Month 1:** Multi-event support
- **Month 2:** Advanced analytics
- **Month 3:** SaaS platform foundation
- **Month 6:** Commission model launch

### 10.3 Success Metrics
- **Adoption:** 10+ events in first month
- **Satisfaction:** 4.5+ star rating
- **Performance:** <1% error rate
- **Growth:** 20% month-over-month user growth

---

## 11. Risk Assessment

### 11.1 Technical Risks
- **Camera Compatibility:** Mitigation through extensive device testing
- **Network Reliability:** Offline mode implementation
- **Scalability Issues:** Load testing and optimization

### 11.2 Business Risks
- **Market Competition:** Focus on unique value proposition
- **User Adoption:** Comprehensive onboarding and support
- **Revenue Model:** Validated through customer feedback

### 11.3 Mitigation Strategies
- **Backup Plans:** Manual check-in fallback
- **Support Systems:** 24/7 technical support
- **Continuous Monitoring:** Real-time error tracking

---

## 12. Appendices

### 12.1 Glossary
- **QR Code:** Quick Response code, 2D barcode
- **MVP:** Minimum Viable Product
- **RLS:** Row Level Security
- **API:** Application Programming Interface
- **SaaS:** Software as a Service

### 12.2 References
- Next.js Documentation: https://nextjs.org/docs
- Supabase Documentation: https://supabase.com/docs
- Resend Documentation: https://resend.com/docs
- WebRTC Standards: https://webrtc.org/

### 12.3 Change Log
- **v1.0** (Dec 2024): Initial PRD creation
- **Future versions:** Will track feature additions and modifications

---

**Document Approval:**
- [ ] Product Manager
- [ ] Engineering Lead
- [ ] Design Lead
- [ ] Business Stakeholder

**Next Steps:**
1. Technical architecture review
2. Design system creation
3. Development sprint planning
4. QA strategy finalization
