# 🔐 Security Implementation Guide - Phase 1 & 2

## ✅ **What's Been Implemented**

### **Phase 1: Critical Security** 
- ✅ Removed hardcoded Google Maps API key → Backend proxy
- ✅ Generated secure JWT secret with better randomization
- ✅ Fixed CORS to use specific domains (no more wildcard)
- ✅ Added rate limiting (in-memory, Redis-ready)
- ✅ Input sanitization for XSS prevention
- ✅ Security headers middleware (HSTS, X-Frame-Options, etc.)

### **Phase 2: Data Protection**
- ✅ Phone number validation (Indian format)
- ✅ reCAPTCHA v3 support for lead forms
- ✅ OTP service (Twilio/MSG91 ready)
- ✅ JWT authentication infrastructure
- ✅ Password hashing utilities (bcrypt)
- ✅ Rate limiting on sensitive endpoints

---

## 🚀 **Setup Instructions**

### **1. Install Backend Dependencies**

```bash
cd backend
pip install -r requirements.txt
```

New packages added:
- `slowapi` - Rate limiting
- `bleach` - HTML sanitization
- `python-jose` - JWT tokens
- `passlib` - Password hashing
- `cryptography` - Enhanced security

### **2. Get Required API Keys**

#### **A. Google Maps API** (Required)
1. Go to: https://console.cloud.google.com/apis/credentials
2. Create a new project or select existing
3. Enable these APIs:
   - Maps Embed API
   - Maps JavaScript API
4. Create API Key → Click "Restrict Key"
5. **HTTP referrers**: Add your domains
   ```
   http://localhost:5173/*
   https://indohomz.vercel.app/*
   ```
6. Copy the API key

#### **B. reCAPTCHA v3** (Highly Recommended)
1. Go to: https://www.google.com/recaptcha/admin/create
2. Choose **reCAPTCHA v3**
3. Label: "IndoHomz Lead Protection"
4. Domains: 
   ```
   localhost
   indohomz.vercel.app
   ```
5. Copy **Site Key** (public) and **Secret Key** (private)

#### **C. SMS Service** (Optional - for OTP)

**Option 1: Twilio** (Easiest, $15 free credit)
1. Sign up: https://www.twilio.com/try-twilio
2. Get a phone number
3. Copy: Account SID, Auth Token, Phone Number

**Option 2: MSG91** (Cheaper for India)
1. Sign up: https://msg91.com/signup
2. Verify your account
3. Copy: Auth Key
4. Set Sender ID: INDOHZ

### **3. Configure Environment Variables**

#### **Backend (.env)**
```bash
cd backend
cp .env.example .env
```

Edit `.env` and add:
```env
# REQUIRED
SECRET_KEY=<generate_with_command_below>
GOOGLE_MAPS_API_KEY=<your_google_maps_key>

# RECOMMENDED
RECAPTCHA_ENABLED=True
RECAPTCHA_SITE_KEY=<your_recaptcha_site_key>
RECAPTCHA_SECRET_KEY=<your_recaptcha_secret_key>

# OPTIONAL (for OTP)
SMS_PROVIDER=twilio
TWILIO_ACCOUNT_SID=<your_twilio_sid>
TWILIO_AUTH_TOKEN=<your_twilio_token>
TWILIO_PHONE_NUMBER=<your_twilio_number>

# For production
ENVIRONMENT=production
FRONTEND_URL=https://indohomz.vercel.app
```

**Generate SECRET_KEY:**
```bash
python -c "import secrets; print(secrets.token_urlsafe(32))"
```

#### **Frontend (.env)**
```bash
cd frontend
cp .env.example .env
```

Edit `.env`:
```env
VITE_API_BASE_URL=http://localhost:8000
VITE_RECAPTCHA_SITE_KEY=<your_recaptcha_site_key>
```

### **4. Test the Implementation**

Start backend:
```bash
cd backend
uvicorn main:app --reload --port 8000
```

Start frontend:
```bash
cd frontend
npm run dev
```

### **5. Verify Security Features**

#### ✅ **Rate Limiting Test**
Try submitting a lead form 6 times in a row:
- First 5 should succeed
- 6th should return: `429 Too Many Requests`

#### ✅ **Phone Validation Test**
Try these phone numbers:
- ✅ `9876543210` → Valid
- ✅ `+919876543210` → Valid
- ❌ `1234567890` → Invalid (doesn't start with 6-9)
- ❌ `98765` → Invalid (too short)

#### ✅ **XSS Protection Test**
Try entering in name field: `<script>alert('xss')</script>`
- Should be escaped to: `&lt;script&gt;alert('xss')&lt;/script&gt;`

#### ✅ **CORS Test**
Try accessing API from a different domain:
- If not in ALLOWED_ORIGINS → `403 Forbidden`

#### ✅ **Security Headers**
Check response headers (in browser DevTools):
```
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Strict-Transport-Security: max-age=31536000 (production only)
```

---

## 📝 **What You Need to Provide**

### **Must Have (Can Start Now)**
1. ✅ **Google Maps API Key** with domain restrictions
2. ✅ **reCAPTCHA Keys** (v3, site + secret)

### **Can Add Later Today**
3. **Twilio/MSG91 Account** for SMS OTP (optional but recommended)
4. **Production Domain** for CORS whitelist

### **For Production Deployment**
5. Set `ENVIRONMENT=production` in Render/Vercel
6. Set `FRONTEND_URL=https://your-actual-domain.com`
7. Ensure `SECRET_KEY` is unique and secure
8. Enable HTTPS-only mode

---

## 🔄 **Migration Notes**

### **Breaking Changes**
1. Google Maps now requires backend API key configuration
2. Lead form submissions are rate-limited (5 per hour per IP)
3. Phone numbers must be valid Indian format

### **Non-Breaking**
- All changes are backward compatible
- reCAPTCHA is optional (disabled by default)
- OTP service won't break if not configured

---

## 🚨 **Security Checklist**

Before going live, ensure:

- [ ] `SECRET_KEY` is changed from default
- [ ] Google Maps API key has domain restrictions
- [ ] `ENVIRONMENT=production` in production
- [ ] `DEBUG=False` in production
- [ ] CORS allows only your domains (no localhost in production)
- [ ] reCAPTCHA is enabled (`RECAPTCHA_ENABLED=True`)
- [ ] Database has SSL enabled (Supabase does by default)
- [ ] HTTPS is enforced on frontend
- [ ] API rate limits are tested

---

## 📞 **Need Help?**

### **Common Issues**

**Issue**: "Google Maps not loading"
- **Fix**: Check `GOOGLE_MAPS_API_KEY` is set in backend `.env`
- **Fix**: Verify API key has Maps Embed API enabled
- **Fix**: Check domain restrictions allow your domain

**Issue**: "429 Too Many Requests"
- **Explanation**: Working as intended! Rate limit = 5 leads/hour
- **For Testing**: Clear rate limit by restarting backend
- **For Production**: Adjust limits in `app/core/rate_limit.py`

**Issue**: "reCAPTCHA verification failed"
- **Fix**: Ensure `RECAPTCHA_SITE_KEY` matches backend `RECAPTCHA_SECRET_KEY`
- **Fix**: Check domains are registered in reCAPTCHA admin
- **Temporary**: Set `RECAPTCHA_ENABLED=False` to disable

---

## 📈 **Next Steps (Phase 3-5)**

Once Phase 1 & 2 are working:
- [ ] Add Redis for distributed rate limiting
- [ ] Implement email OTP (SendGrid)
- [ ] Add user authentication endpoints (login/register)
- [ ] Database field encryption for PII
- [ ] Admin dashboard with role-based access
- [ ] Audit logging for sensitive operations

---

## 🎯 **Success Criteria**

Phase 1 & 2 complete when:
1. ✅ Google Maps works without exposed API key
2. ✅ Lead forms have rate limiting
3. ✅ Phone validation rejects invalid numbers
4. ✅ reCAPTCHA blocks bot submissions
5. ✅ Security headers appear in responses
6. ✅ No authentication errors in console
7. ✅ Site works on localhost AND production
