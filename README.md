# 🚀 Prop Firm Backend — To'liq Qo'llanma

## 📁 Papka Strukturasi (Folder Structure)

```
your-project/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── [...nextauth]/
│   │   │   │   └── route.ts          ← NextAuth handler
│   │   │   └── register/
│   │   │       └── route.ts          ← Ro'yxatdan o'tish API
│   │   ├── payment/
│   │   │   └── click/
│   │   │       ├── create/
│   │   │       │   └── route.ts      ← To'lov yaratish (Invoice)
│   │   │       └── webhook/
│   │   │           └── route.ts      ← Click Prepare & Complete
│   │   └── user/
│   │       └── profile/
│   │           └── route.ts          ← Profil ma'lumotlari
│   ├── dashboard/
│   │   └── page.tsx                  ← Foydalanuvchi dashboard
│   ├── auth/
│   │   ├── login/
│   │   │   └── page.tsx              ← Login sahifa (o'zingiz qiling)
│   │   └── error/
│   │       └── page.tsx              ← NextAuth error sahifa
│   ├── layout.tsx                    ← SessionProvider qo'shing
│   └── page.tsx                      ← Mavjud landing page
│
├── components/
│   ├── BuyNowButton.tsx              ← "Start Challenge" tugmasi ← YA N G I
│   ├── providers/
│   │   └── SessionProvider.tsx       ← NextAuth provider
│   └── ... (mavjud V0 komponentlar)
│
├── lib/
│   ├── prisma.ts                     ← Prisma client singleton
│   ├── auth.ts                       ← NextAuth konfiguratsiya
│   └── validations/
│       └── auth.ts                   ← Zod schemalar
│
├── prisma/
│   └── schema.prisma                 ← Ma'lumotlar bazasi sxemasi
│
├── types/
│   └── next-auth.d.ts                ← NextAuth type extension
│
├── .env.local                        ← Maxfiy kalitlar (git'ga yo'q!)
├── .env.local.example                ← Namuna (git'ga qo'shing)
└── .gitignore                        ← .env.local ni qo'shing
```

---

## ⚙️ O'rnatish Bosqichlari

### 1. Paketlarni o'rnatish

```bash
npm install next-auth @auth/prisma-adapter prisma @prisma/client bcryptjs zod
npm install -D @types/bcryptjs
```

### 2. Prisma sozlash

```bash
# Prisma'ni loyihaga qo'shish
npx prisma init

# schema.prisma ni ko'chirib, keyin migrate qiling
npx prisma migrate dev --name init

# Prisma Client generatsiya
npx prisma generate

# Ma'lumotlar bazasini ko'rish (ixtiyoriy)
npx prisma studio
```

### 3. `.env.local` fayl yaratish

```bash
cp .env.local.example .env.local
# Keyin .env.local ni tahrirlang va real qiymatlarni kiriting
```

### 4. `.gitignore` ga qo'shing

```
.env.local
.env*.local
```

### 5. NextAuth Secret yaratish

```bash
openssl rand -base64 32
# Natijani NEXTAUTH_SECRET ga kiriting
```

### 6. Google OAuth sozlash

1. [Google Cloud Console](https://console.cloud.google.com) → Create Project
2. APIs & Services → Credentials → Create OAuth 2.0 Client
3. Authorized redirect URIs: `http://localhost:3000/api/auth/callback/google`
4. Production: `https://yourdomain.com/api/auth/callback/google`

### 7. Click.uz sozlash

1. [my.click.uz](https://my.click.uz) → Merchant Panel'ga kiring
2. Xizmatlar → Yangi xizmat qo'shing
3. Webhook URL: `https://yourdomain.com/api/payment/click/webhook`
4. `service_id`, `merchant_id`, `secret_key` ni oling

---

## 🔒 Xavfsizlik Tizimi

### 1. API Route Himoya (NextAuth Session)

```typescript
// Har qanday himoyalangan route'da:
import { requireAuth } from "@/lib/auth";

export async function GET() {
  const session = await requireAuth(); // throws "UNAUTHORIZED" if not logged in
  // session.user.id — xavfsiz foydalanuvchi ID
}
```

### 2. SQL Injection Himoya (Prisma ORM)

```typescript
// ❌ XA TER LI (raw SQL, hech qachon qilmang):
await prisma.$queryRaw`SELECT * FROM users WHERE email = ${userInput}`

// ✅ TO'G'RI (Prisma ORM):
await prisma.user.findUnique({ where: { email: userInput } })
// Prisma avtomatik parametrlashtiradi → SQL Injection mumkin emas
```

### 3. XSS Himoya (Zod + Next.js)

```typescript
// Har doim Zod bilan validate qiling:
const parsed = registerSchema.safeParse(body);
if (!parsed.success) return NextResponse.json({ error: "..." }, { status: 400 });

// Next.js React avtomatik XSS dan himoya qiladi (JSX escaping)
```

### 4. Click.uz HMAC Sign Tekshirish

Webhook'ga kelgan har bir so'rov kriptografik imzo bilan tekshiriladi.
`timingSafeEqual` ishlatiladi → timing attack'ga qarshi.

### 5. Parol Xavfsizligi

```typescript
// bcrypt hash (12 rounds):
const hashed = await bcrypt.hash(password, 12);

// Tekshirish:
const isValid = await bcrypt.compare(inputPassword, hashedFromDB);
```

---

## 🔗 TradingModels.tsx ga BuyNowButton qo'shish

`components/TradingModels.tsx` da "Start Challenge" tugmasi o'rniga:

```tsx
import { BuyNowButton } from "@/components/BuyNowButton"

// selectedPath va selectedSize state'laringizni map qiling:
const sizeMap: Record<string, string> = {
  "$5k":  "SIZE_5K",
  "$10k": "SIZE_10K",
  "$25k": "SIZE_25K",
}

const pathMap: Record<string, string> = {
  "strike-1": "STRIKE_1",
  "instant":  "INSTANT",
  "1-step":   "ONE_STEP",
  "2-step":   "TWO_STEP",
}

// Pricing Card ichida:
<BuyNowButton
  accountSize={sizeMap[selectedSize] ?? "SIZE_5K"}
  challengeType={pathMap[selectedPath] ?? "STRIKE_1"}
/>
```

---

## 📡 API Endpointlar

| Method | URL | Himoya | Vazifasi |
|--------|-----|--------|----------|
| `POST` | `/api/auth/register` | Ochiq | Ro'yxatdan o'tish |
| `POST` | `/api/auth/signin` | Ochiq | Kirish (NextAuth) |
| `GET`  | `/api/user/profile` | ✅ Auth | Profil + accountlar |
| `POST` | `/api/payment/click/create` | ✅ Auth | To'lov yaratish |
| `POST` | `/api/payment/click/webhook` | Click HMAC | Prepare/Complete |

---

## 🗄️ Ma'lumotlar Bazasi Sxemasi

```
User
 ├── id, name, email, password (hashed), balance
 ├── PropAccount[]  (1 user → ko'p account)
 └── Transaction[]  (1 user → ko'p to'lov)

PropAccount
 ├── accountSize: SIZE_5K | SIZE_10K | SIZE_25K | SIZE_50K | SIZE_100K
 ├── challengeType: STRIKE_1 | INSTANT | ONE_STEP | TWO_STEP
 └── status: PENDING → ACTIVE → PASSED/FAILED → FUNDED

Transaction
 ├── merchantTransId (bizning unikal ID)
 ├── clickTransId (Click bergan ID)
 ├── amount, currency (UZS)
 └── status: PENDING → PREPARING → COMPLETED | CANCELLED
```

---

## 🚀 Production Deploy (Vercel)

1. `vercel.com` → Import your GitHub repo
2. Environment Variables bo'limiga `.env.local` dagi barcha o'zgaruvchilarni kiriting
3. `DATABASE_URL` uchun [Supabase](https://supabase.com) yoki [Neon](https://neon.tech) ishlatishingiz mumkin (bepul PostgreSQL)
4. Deploy!

```bash
# Database migration (production)
npx prisma migrate deploy
```
