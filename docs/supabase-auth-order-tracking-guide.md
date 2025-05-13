# Supabase Auth & Order Tracking Integration Guide

This guide will walk you through adding user authentication (sign up, log in) and order tracking to the OMNIS project using Supabase. This approach is free, scalable, and requires minimal backend experience.

---

## Overview

- **Goal:** Allow users to sign up, log in, and track their orders.
- **Stack:** Supabase (Auth + Database), React (Vite), TypeScript
- **Why Supabase?** Free generous tier, easy integration, handles both auth and data, no backend code required for basic features.

---

## Step-by-Step Plan

### 1. Create a Free Supabase Project
- Go to [Supabase](https://supabase.com/) and sign up.
- Click "New Project" and fill in the details.
- Once created, access your project dashboard.

### 2. Set Up Supabase Auth
- In the dashboard, go to **Authentication > Providers**.
- Enable **Email** (default).
- (Optional) Customize email templates.

### 3. Create an Orders Table
- Go to **Table Editor** in the dashboard.
- Click **New Table** and name it `orders`.
- Add columns:
  - `id` (UUID, primary key, default: `gen_random_uuid()`)
  - `user_id` (UUID, foreign key to `auth.users.id`)
  - `order_number` (text, unique)
  - `status` (text)
  - (Optional: `created_at` timestamp, default: now())
- Enable **Row Level Security (RLS)**.
- Add a policy: Users can select their own orders (`user_id = auth.uid()`).

### 4. Get Supabase Project URL and Anon Key
- Go to **Project Settings > API** in the dashboard.
- Copy the **Project URL** and **anon public key**.

### 5. Install Supabase Client in the Project
- In your project root, run:
  ```sh
  npm install @supabase/supabase-js
  ```

### 6. Create a Supabase Client
- Create `src/lib/supabaseClient.ts`:
  ```ts
  import { createClient } from '@supabase/supabase-js';
  const supabaseUrl = 'YOUR_SUPABASE_URL';
  const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY';
  export const supabase = createClient(supabaseUrl, supabaseAnonKey);
  ```

### 7. Add Auth UI (Sign Up & Log In)
- Create `src/components/AuthForm.tsx` with forms for sign up and log in using Supabase Auth.

### 8. Add Auth Context (Recommended)
- Create `src/contexts/AuthContext.tsx` to manage user state and session.
- Wrap your app in `AuthProvider`.

### 9. Order Tracking UI
- Create `src/components/OrderTracker.tsx`:
  - Input for order number
  - Fetch and display order status for the logged-in user

### 10. Add Components to Pages
- Add `<AuthForm />` to your login/signup page.
- Add `<OrderTracker />` to your order tracking page (protected for logged-in users).

### 11. (Optional) Add Orders via Supabase Dashboard
- Manually add rows to the `orders` table for testing, linking them to your test user's `user_id`.

---

## Next Steps

1. Create your Supabase account and project.
2. Follow the steps above to set up authentication and the orders table.
3. Provide your Supabase Project URL and anon key to proceed with code integration.

---

**Need help?**
- [Supabase Docs](https://supabase.com/docs)
- Ask for code snippets or further guidance for any step! 