# Better Auth Setup Guide for VlogCut

This document summarizes the official Better Auth documentation and what is required for our setup.

---

## 1. Required Environment Variables

From the official docs, these environment variables are **REQUIRED**:

```bash
# REQUIRED - Secret key for encryption/hashing (minimum 32 characters, high entropy)
BETTER_AUTH_SECRET=your_secret_here

# REQUIRED - The URL where your app is hosted  
BETTER_AUTH_URL=https://www.vlogcut.io

# REQUIRED - Database connection string
DATABASE_URL=postgresql://user:password@host:5432/database?sslmode=require
```

**Note**: `BETTER_AUTH_URL` is used by the server. `NEXT_PUBLIC_BETTER_AUTH_URL` is used by the client (browser).

---

## 2. Server Configuration (auth.ts)

According to the official PostgreSQL docs, the setup should be:

```typescript
import { betterAuth } from "better-auth";
import { Pool } from "pg";

export const auth = betterAuth({
  // PostgreSQL database connection
  database: new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false, // Required for Supabase/hosted PostgreSQL
    },
  }),
  
  // Secret for encryption
  secret: process.env.BETTER_AUTH_SECRET,
  
  // Base URL of your app
  baseURL: process.env.BETTER_AUTH_URL,
  
  // Enable email/password authentication
  emailAndPassword: {
    enabled: true,
  },
  
  // App name (shown in emails, etc.)
  appName: "VlogCut",
  
  // Trusted origins for CORS
  trustedOrigins: [
    "http://localhost:3000",
    "https://vlogcut.io",
    "https://www.vlogcut.io",
  ],
});

export type Auth = typeof auth;
```

---

## 3. Client Configuration (auth-client.ts)

```typescript
import { createAuthClient } from "better-auth/react";

export const { signIn, signUp, signOut, useSession } = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
});
```

---

## 4. Next.js API Route Handler

Create `app/api/auth/[...all]/route.ts`:

```typescript
import { auth } from "@/lib/auth"; // or your auth path
import { toNextJsHandler } from "better-auth/next-js";

export const { GET, POST } = toNextJsHandler(auth);
```

---

## 5. Email & Password Sign Up

**Client-side:**
```typescript
const { data, error } = await authClient.signUp.email({
  name: "John Doe",
  email: "john@example.com",
  password: "password1234", // Min 8 chars, max 128
  callbackURL: "/dashboard", // Optional redirect after signup
});
```

**Server-side:**
```typescript
const data = await auth.api.signUpEmail({
  body: {
    name: "John Doe",
    email: "john@example.com", 
    password: "password1234",
  },
});
```

---

## 6. Email & Password Sign In

**Client-side:**
```typescript
const { data, error } = await authClient.signIn.email({
  email: "john@example.com",
  password: "password1234",
  rememberMe: true, // Optional, default true
  callbackURL: "/dashboard", // Optional redirect after signin
});
```

---

## 7. Sign Out

**Client-side:**
```typescript
await authClient.signOut({
  fetchOptions: {
    onSuccess: () => {
      router.push("/login");
    },
  },
});
```

---

## 8. Database Schema

Better Auth automatically creates these tables:
- `user` - User information (id, name, email, emailVerified, image, createdAt, updatedAt)
- `session` - Session data (id, expiresAt, token, userId, ipAddress, userAgent, createdAt, updatedAt)
- `account` - Auth accounts (id, accountId, providerId, userId, password for credentials, createdAt, updatedAt)
- `verification` - Email verification tokens

**Run migrations:**
```bash
bunx @better-auth/cli@latest migrate
```

---

## 9. Key Issues We Encountered

### Issue 1: Missing SSL for Supabase
Supabase requires SSL connections. The Pool config needs:
```typescript
ssl: { rejectUnauthorized: false }
```

### Issue 2: Drizzle Adapter vs Pool
The official PostgreSQL docs show using `Pool` from `pg` directly, NOT the Drizzle adapter. We were using `drizzleAdapter(db, { provider: "pg" })` which may have caused issues.

### Issue 3: Missing Environment Variables
Both `BETTER_AUTH_URL` (server) and `NEXT_PUBLIC_BETTER_AUTH_URL` (client) are needed.

### Issue 4: Database Column Defaults
The `created_at` and `updated_at` columns need `DEFAULT NOW()` to allow inserts without explicitly providing these values.

---

## 10. Vercel Environment Variables Checklist

- [ ] `BETTER_AUTH_SECRET` - 32+ character secret
- [ ] `BETTER_AUTH_URL` - https://www.vlogcut.io
- [ ] `NEXT_PUBLIC_BETTER_AUTH_URL` - https://www.vlogcut.io
- [ ] `DATABASE_URL` - PostgreSQL connection string with `?sslmode=require`

---

## 11. Current Status

**What's working:**
- Local development signup/signin works
- Database migrations applied
- Tables have correct defaults

**What's NOT working:**
- Production (Vercel) still returns 500 on signup
- Likely cause: SSL configuration for `pg` Pool

**Next step to try:**
Add SSL configuration to the Pool:
```typescript
database: new Pool({
  connectionString: DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
}),
```

---

## References

- [Better Auth Installation](https://www.better-auth.com/docs/installation)
- [Better Auth Email & Password](https://www.better-auth.com/docs/authentication/email-password)
- [Better Auth Next.js Integration](https://www.better-auth.com/docs/integrations/next)
- [Better Auth PostgreSQL](https://www.better-auth.com/docs/databases/postgresql) - Note: This URL was 404, the PostgreSQL docs may be at a different path
