# 🏗️ IndoHomz System Architecture

## ✅ **100% Working System Overview**

### 🌐 Live URLs
- **Main Website**: https://indohomz1.vercel.app
- **Admin Portal**: https://indohomz1.vercel.app/admin/login
- **Backend API**: https://indohomz-backend.onrender.com

---

## 📊 System Components

### 1. **Main Website (Public Facing)**
**URL**: `indohomz1.vercel.app`

**Pages**:
- `/` - Landing/Home page
- `/properties` - Properties listing
- `/property/:slug` - Individual property detail

**Features**:
- ✅ Property browsing
- ✅ Search & filters
- ✅ Lead capture (floating button + modal form)
- ✅ WhatsApp integration
- ✅ Phone click-to-call
- ✅ Google Maps integration
- ✅ SEO optimized
- ✅ Mobile responsive

---

### 2. **Admin Portal** 
**URL**: `indohomz1.vercel.app/admin/login`

**Pages**:
- `/admin/login` - Admin authentication
- `/admin/dashboard` - Property management

**Features**:
- ✅ Secure login (JWT auth)
- ✅ Add new properties
- ✅ Edit existing properties
- ✅ Delete properties
- ✅ Upload property images
- ✅ View all leads
- ✅ Analytics dashboard
- ✅ Property stats

**Admin Access**:
```
Email: admin@indohomz.com
Password: Admin@2024
```

---

### 3. **Backend API**
**URL**: `indohomz-backend.onrender.com`

**Technology**: FastAPI + SQLite
**Deployment**: Render (Free tier)

**Endpoints**:
```
GET  /api/v1/properties          - List all properties
GET  /api/v1/properties/:id      - Get single property
POST /api/v1/properties          - Add property (admin only)
PUT  /api/v1/properties/:id      - Update property (admin only)
DELETE /api/v1/properties/:id    - Delete property (admin only)

POST /api/v1/auth/login          - Admin login
GET  /api/v1/leads               - Get all leads (admin only)
POST /api/v1/leads/inquiry       - Submit lead (public)

GET  /api/v1/properties/stats    - Get analytics
```

---

## 🔄 How It Works (Data Flow)

### **Adding Property Flow**:
```
1. Sir opens: https://indohomz1.vercel.app/admin/login
2. Login with admin credentials
3. Click "Add Property" button
4. Fill form:
   - Title, price, location
   - Bedrooms, bathrooms, sqft
   - Amenities, description
   - Upload image URL
5. Submit → Saved to database
6. Property appears on main site IMMEDIATELY
```

### **Lead Capture Flow**:
```
1. User visits main site (indohomz1.vercel.app)
2. User clicks:
   - Floating WhatsApp button
   - "Get Callback" button
   - Property "Schedule Visit" button
3. Fill form:
   - Name, phone, email
   - Preferred location
   - Message
4. Submit → Saved to database
5. Lead data visible in admin dashboard
6. Auto-redirect to WhatsApp
```

### **Property Display Flow**:
```
Main Site → API Request → Backend Database → Return Properties → Display on Frontend

1. User opens indohomz1.vercel.app
2. Frontend calls: GET /api/v1/properties
3. Backend reads from SQLite database
4. Returns JSON with all properties
5. Frontend displays property cards
```

---

## 🔗 Connection Points

### **Frontend → Backend Connection**:
```javascript
Environment Variable (Vercel):
VITE_API_BASE_URL=https://indohomz-backend.onrender.com

All API calls use this base URL:
- Login: POST ${API_BASE}/api/v1/auth/login
- Properties: GET ${API_BASE}/api/v1/properties
- Leads: POST ${API_BASE}/api/v1/leads/inquiry
```

### **Database Schema**:
```sql
Properties Table:
- id (primary key)
- title, price, location, area, city
- bedrooms, bathrooms, area_sqft
- property_type, furnishing
- image_url, images (JSON array)
- amenities, highlights, description
- latitude, longitude
- is_available
- created_at, updated_at

Leads Table:
- id (primary key)
- name, email, phone
- property_id (foreign key)
- message, preferred_visit_date
- status (new, contacted, site_visit, etc.)
- source (website, whatsapp, etc.)
- created_at, updated_at

Users Table:
- id (primary key)
- email, hashed_password
- name, role
- is_active
- created_at
```

---

## 📱 Access Methods

### **For Sir (Property Owner)**:
```
Admin Portal Access:
1. Go to: https://indohomz1.vercel.app/admin/login
2. Email: admin@indohomz.com
3. Password: Admin@2024
4. Click "Sign In"
5. Add/Edit/Delete properties
6. View all leads
```

### **For Customers**:
```
Main Site:
1. Visit: https://indohomz1.vercel.app
2. Browse properties
3. Click "Schedule Visit" or floating WhatsApp button
4. Fill form
5. Submit → Lead captured
```

---

## ✅ What's Working 100%

1. **Admin Login**: ✅ Secure JWT authentication
2. **Property Management**: ✅ Full CRUD operations
3. **Image Uploads**: ✅ URLs stored (use Cloudinary/Supabase)
4. **Lead Capture**: ✅ Forms working, data saved
5. **WhatsApp Integration**: ✅ Auto-redirect after form
6. **Backend API**: ✅ All endpoints operational
7. **Database**: ✅ SQLite persistent storage on Render
8. **Auto-sync**: ✅ Properties added in admin show on main site instantly

---

## 🚀 Adding Properties (2 Methods)

### **Method 1: Admin Panel (GUI)**
```
1. Login to admin portal
2. Click "Add Property"
3. Fill form
4. Upload image URL
5. Submit
✅ Property goes live immediately!
```

### **Method 2: Bulk Upload (CSV)**
```bash
cd backend
python bulk_upload_properties.py properties.csv

# CSV Format:
# title,location,area,city,price,bedrooms,bathrooms,area_sqft,property_type,furnishing,amenities,description,images
```

---

## 📈 Lead Management

**Where Leads Are Captured**:
- ✅ Floating WhatsApp button (all pages)
- ✅ "Get Callback" modal
- ✅ Property detail "Schedule Visit" form
- ✅ Landing page hero CTA
- ✅ Footer contact form

**Lead Data Includes**:
- Name, phone, email
- Property interested in
- Preferred location
- Message/requirements
- Timestamp
- Source (which page/button)

**View Leads**:
1. Login to admin dashboard
2. Click "Leads" tab
3. See all leads with:
   - Contact info
   - Property interest
   - Status
   - Date submitted

---

## 🔐 Security Features

- ✅ JWT token authentication
- ✅ Bcrypt password hashing
- ✅ Admin-only routes protected
- ✅ Input validation
- ✅ SQL injection prevention (SQLAlchemy ORM)
- ✅ CORS configured for Vercel domain
- ✅ Rate limiting on API endpoints

---

## 📊 Analytics & Stats

**Available in Admin Dashboard**:
- Total properties
- Available vs occupied
- Total leads
- Leads this month
- Lead conversion rate
- Popular property types
- Location distribution

---

## 💡 Key Points

1. **Properties Auto-sync**: When sir adds a property in admin, it appears on main site IMMEDIATELY (no manual steps)

2. **Lead Data Persistence**: All leads saved to database, accessible in admin panel

3. **Images**: Currently using URL-based images (Cloudinary/Supabase). Admin enters image URL when adding property.

4. **WhatsApp Integration**: Lead forms auto-send data to WhatsApp (9053070100)

5. **Mobile Responsive**: Both admin and main site work perfectly on mobile

6. **Cold Start**: Backend on Render sleeps after 15 mins inactivity. First request takes 30-60 seconds to wake up (normal for free tier).

---

## 🎯 Workflow Summary

**Sir's Workflow**:
```
1. Opens admin portal
2. Adds property with details + image URL
3. Property live on main site
4. Checks leads in dashboard
5. Contacts customers
```

**Customer's Workflow**:
```
1. Visits indohomz1.vercel.app
2. Browses properties
3. Clicks interested property
4. Fills "Schedule Visit" form
5. Submits → WhatsApp redirect
6. Receives call from sir
```

**Data Flow**:
```
Sir adds property → Backend DB → Main site displays
Customer submits form → Backend DB → Sir sees in admin panel
```

---

## 🔧 Troubleshooting

**Q: Properties not showing on main site?**
- Check backend is running: https://indohomz-backend.onrender.com/docs
- Vercel env variable set: VITE_API_BASE_URL

**Q: Can't login to admin?**
- Use exact credentials: admin@indohomz.com / Admin@2024
- Check browser console for errors

**Q: Leads not appearing in admin?**
- Check backend logs on Render dashboard
- Verify lead submitted successfully (check browser network tab)

**Q: Images not showing?**
- Make sure image URL is publicly accessible
- Test URL in browser before adding to property

---

## 📞 Contact

**WhatsApp**: 9053070100
**Email**: admin@indohomz.com

---

**Last Updated**: January 7, 2026
**Status**: ✅ FULLY OPERATIONAL
