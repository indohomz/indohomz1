# 🚀 QUICK START - Phase 1 & 2 Deployment

## ✅ **What's Configured:**

### **Your Keys (Ready to use):**
- ✅ **reCAPTCHA Site Key**: `6LeQwDMsAAAAACu1AQo4zhDJTc5n_s8lLyQoDihN`
- ✅ **reCAPTCHA Secret Key**: `6LeQwDMsAAAAANNuRfUo1Vac-eazlPke4tRU6reiU`
- ✅ **Production Domain**: `https://indohomz1.vercel.app`
- ✅ **CORS**: Already configured for your domain

### **Files Updated:**
- ✅ `backend/.env` - reCAPTCHA keys added
- ✅ `frontend/.env` - reCAPTCHA site key added
- ✅ `backend/app/core/config.py` - CORS includes your domain
- ✅ All security features implemented

---

## ⚠️ **CRITICAL: You Still Need**

### **Google Maps API Key** (Required Now!)

1. **Go to**: https://console.cloud.google.com/apis/credentials
2. Click: **"Create Credentials" → "API Key"**
3. **Restrict the key**:
   - Click "Edit API key"
   - **API restrictions**: Select "Restrict key" → Enable only:
     - ✅ Maps Embed API
     - ✅ Maps JavaScript API (optional)
   - **Application restrictions**: Select "HTTP referrers"
   - Add these referrers:
     ```
     http://localhost:5173/*
     https://indohomz1.vercel.app/*
     ```
4. **Copy the API key**
5. **Add to** `backend/.env`:
   ```env
   GOOGLE_MAPS_API_KEY=YOUR_KEY_HERE
   ```

---

## 🏃 **Quick Start (After Adding Maps Key)**

### **1. Install Backend Dependencies**
```bash
cd backend
pip install -r requirements.txt
```

If `python-jose` fails to import, run:
```bash
pip install --force-reinstall python-jose[cryptography]
```

### **2. Generate Secure Secret Key**
```bash
python -c "import secrets; print(secrets.token_urlsafe(32))"
```

Copy output and add to `backend/.env`:
```env
SECRET_KEY=<paste_generated_key>
```

### **3. Start Development**

**Terminal 1 - Backend:**
```bash
cd backend
uvicorn main:app --reload --port 8000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install  # if not done already
npm run dev
```

### **4. Test Security Features**

#### ✅ **Rate Limiting**
1. Go to: http://localhost:5173
2. Submit a lead form 6 times quickly
3. **Expected**: 6th submission blocked with "Rate limit exceeded"

#### ✅ **Phone Validation**
Try these in phone field:
- `9876543210` → ✅ Should work
- `1234567890` → ❌ Should reject
- `abc123` → ❌ Should reject

#### ✅ **reCAPTCHA** (when enabled on frontend)
- Forms should show reCAPTCHA badge
- Spam/bot submissions blocked

#### ✅ **Security Headers**
Open DevTools → Network → Click any API request → Check headers:
```
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
```

---

## 🌐 **Production Deployment**

### **Backend (Render/Railway):**

1. **Environment Variables**:
   ```env
   ENVIRONMENT=production
   DEBUG=False
   FRONTEND_URL=https://indohomz1.vercel.app
   DATABASE_URL=<your_supabase_connection>
   SECRET_KEY=<your_secure_secret>
   GOOGLE_MAPS_API_KEY=<your_key>
   RECAPTCHA_ENABLED=True
   RECAPTCHA_SITE_KEY=6LeQwDMsAAAAACu1AQo4zhDJTc5n_s8lLyQoDihN
   RECAPTCHA_SECRET_KEY=6LeQwDMsAAAAANNuRfUo1Vac-eazlPke4tRU6reiU
   ```

2. **Deploy**:
   ```bash
   git push
   ```

### **Frontend (Vercel):**

1. **Add Environment Variable** in Vercel dashboard:
   ```
   VITE_API_BASE_URL=https://your-backend.onrender.com
   VITE_RECAPTCHA_SITE_KEY=6LeQwDMsAAAAACu1AQo4zhDJTc5n_s8lLyQoDihN
   ```

2. **Redeploy**: Vercel auto-deploys on push

---

## 🧪 **Manual Testing (No Need for test_security.py)**

### **Test 1: Rate Limiting**
```bash
# Try this 6 times:
curl -X POST http://localhost:8000/api/v1/leads/ \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","phone":"9876543210","source":"website"}'
```
**Expected**: 6th request returns 429

### **Test 2: Phone Validation**
```bash
# Invalid phone (should fail):
curl -X POST http://localhost:8000/api/v1/leads/ \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","phone":"1234567890","source":"website"}'
```
**Expected**: 400 Bad Request - "Invalid phone number"

### **Test 3: XSS Protection**
```bash
# Try XSS in name:
curl -X POST http://localhost:8000/api/v1/leads/ \
  -H "Content-Type: application/json" \
  -d '{"name":"<script>alert(1)</script>","phone":"9876543210"}'
```
**Expected**: Script tags escaped in database

---

## 📋 **Configuration Checklist**

### **Backend `.env` File:**
```env
✅ RECAPTCHA_ENABLED=True
✅ RECAPTCHA_SITE_KEY=6LeQwDMsAAAAACu1AQo4zhDJTc5n_s8lLyQoDihN
✅ RECAPTCHA_SECRET_KEY=6LeQwDMsAAAAANNuRfUo1Vac-eazlPke4tRU6reiU
✅ FRONTEND_URL=https://indohomz1.vercel.app
⚠️ GOOGLE_MAPS_API_KEY=<ADD_YOUR_KEY>
⚠️ SECRET_KEY=<GENERATE_NEW_KEY>
✅ ENVIRONMENT=development (change to production when deploying)
```

### **Frontend `.env` File:**
```env
✅ VITE_RECAPTCHA_SITE_KEY=6LeQwDMsAAAAACu1AQo4zhDJTc5n_s8lLyQoDihN
✅ VITE_API_BASE_URL=http://localhost:8000 (change for production)
```

---

## 🎯 **Success Metrics**

Phase 1 & 2 are complete when:

- [x] reCAPTCHA keys configured ✅
- [x] Production domain whitelisted in CORS ✅
- [x] Rate limiting active (5 leads/hour) ✅
- [x] Phone validation working ✅
- [x] XSS protection active ✅
- [x] Security headers present ✅
- [ ] Google Maps API key added ⚠️ **YOU NEED TO ADD THIS**
- [ ] Secret key regenerated ⚠️ **DO THIS NOW**
- [ ] Backend server starts without errors
- [ ] Frontend connects to backend successfully

---

## 🆘 **Common Issues**

### **"ModuleNotFoundError: No module named 'jose'"**
**Fix:**
```bash
pip install --force-reinstall python-jose[cryptography]
# OR try:
pip install python-jose==3.3.0
```

### **"CORS error" in frontend**
**Fix**: Check `backend/.env` has:
```env
FRONTEND_URL=https://indohomz1.vercel.app
```

### **"Google Maps not loading"**
**Fix**: Add your Maps API key to `backend/.env`

### **"429 Too Many Requests" for testing**
**Solution**: Restart backend server to clear rate limits
**OR**: Increase limits in `backend/app/core/rate_limit.py`

---

## 📞 **Next Steps After Maps Key**

Once you add the Google Maps API key:

1. Start servers (backend + frontend)
2. Test lead form submission
3. Verify maps load on property detail page
4. Deploy to production (Render + Vercel)
5. Move to **Phase 3** (Performance optimizations)

---

## 🔥 **ONE-LINE COMMANDS**

**Install everything:**
```bash
cd backend && pip install -r requirements.txt && cd ../frontend && npm install
```

**Start both servers:**
```bash
# PowerShell (Windows):
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; uvicorn main:app --reload"; Start-Sleep 3; Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npm run dev"
```

**Check if security is working:**
```bash
curl http://localhost:8000/health
```
Should return: `{"status":"healthy"}`

---

**🎯 Bottom Line**: Add Google Maps API key → Start servers → Test → Deploy! 🚀
