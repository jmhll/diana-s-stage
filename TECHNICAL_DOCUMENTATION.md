# WebFesDiana - Technical Documentation

> **Version:** 1.0  
> **Date:** March 2026  
> **Stack:** React 18 + TypeScript + Vite + Tailwind CSS + Supabase (Lovable Cloud)

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Architecture](#2-architecture)
3. [Database Schema](#3-database-schema)
4. [Routes](#4-routes)
5. [Components](#5-components)
6. [APIs & Edge Functions](#6-apis--edge-functions)
7. [Admin Panel](#7-admin-panel)
8. [Authentication & Authorization](#8-authentication--authorization)
9. [Integrations](#9-integrations)
10. [Internationalization (i18n)](#10-internationalization-i18n)
11. [Deployment](#11-deployment)

---

## 1. Project Overview

WebFesDiana is a professional portfolio platform for an actress and presenter. It integrates:

- **Artistic portfolio** (actress and presenter sections)
- **Event calendar/agenda**
- **Professional services** (psychology, career guidance, training)
- **Contact system** with email notifications
- **Admin panel** for content management

### Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18, TypeScript, Vite |
| Styling | Tailwind CSS, shadcn/ui |
| State | TanStack React Query |
| Routing | React Router v6 |
| Backend | Lovable Cloud (Supabase) |
| Auth | Supabase Auth |
| Database | PostgreSQL (via Supabase) |
| Storage | Supabase Storage |
| Email | Resend API |
| i18n | i18next |
| Animations | Framer Motion |

---

## 2. Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         FRONTEND (React)                        │
├─────────────────────────────────────────────────────────────────┤
│  src/                                                           │
│  ├── pages/           → Route-level components                  │
│  ├── components/      → Reusable UI components                  │
│  ├── contexts/        → React Context providers (AuthContext)   │
│  ├── hooks/           → Custom React hooks                      │
│  ├── integrations/    → Supabase client & types                 │
│  ├── i18n/            → Internationalization (CA/ES/EN)         │
│  └── lib/             → Utility functions                       │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                    LOVABLE CLOUD (Supabase)                     │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐  │
│  │  Auth       │  │  Database   │  │  Edge Functions         │  │
│  │  (users,    │  │  (PostgreSQL│  │  - manage-users         │  │
│  │   sessions) │  │   + RLS)    │  │  - send-contact-notif.  │  │
│  └─────────────┘  └─────────────┘  └─────────────────────────┘  │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │  Storage Bucket: media (public)                             ││
│  │  → Gallery images & videos                                  ││
│  └─────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                    EXTERNAL SERVICES                            │
├─────────────────────────────────────────────────────────────────┤
│  Resend API → Email notifications for contact form              │
└─────────────────────────────────────────────────────────────────┘
```

### Directory Structure

```
├── public/                  # Static assets
├── src/
│   ├── components/
│   │   ├── ui/              # shadcn/ui components
│   │   ├── Layout.tsx       # Main layout wrapper
│   │   ├── Navbar.tsx       # Navigation bar
│   │   ├── Footer.tsx       # Footer component
│   │   ├── ScrollReveal.tsx # Animation wrapper
│   │   ├── ProtectedRoute.tsx # Route guard
│   │   └── NavLink.tsx
│   ├── contexts/
│   │   └── AuthContext.tsx  # Authentication context
│   ├── hooks/
│   │   ├── use-toast.ts
│   │   └── use-mobile.tsx
│   ├── i18n/
│   │   ├── index.ts         # i18n configuration
│   │   └── locales/         # CA, ES, EN translations
│   ├── integrations/
│   │   └── supabase/
│   │       ├── client.ts    # Supabase client (auto-generated)
│   │       └── types.ts     # TypeScript types (auto-generated)
│   ├── pages/
│   │   ├── Index.tsx        # Home page
│   │   ├── Actress.tsx      # Actress portfolio
│   │   ├── Presenter.tsx    # Presenter portfolio
│   │   ├── Services.tsx     # Professional services
│   │   ├── Gallery.tsx      # Media gallery
│   │   ├── Agenda.tsx       # Events calendar
│   │   ├── Contact.tsx      # Contact form
│   │   ├── NotFound.tsx     # 404 page
│   │   └── admin/           # Admin panel pages
│   ├── lib/
│   │   └── utils.ts         # Utility functions (cn, etc.)
│   ├── App.tsx              # Root component & routing
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles & CSS variables
├── supabase/
│   ├── config.toml          # Supabase configuration
│   └── functions/           # Edge Functions
│       ├── manage-users/
│       └── send-contact-notification/
└── Configuration files (vite, tailwind, tsconfig, etc.)
```

---

## 3. Database Schema

### Entity Relationship Diagram

```
┌────────────────────┐     ┌────────────────────┐
│    auth.users      │     │     profiles       │
│ (Supabase managed) │     ├────────────────────┤
│                    │◄────┤ user_id (FK)       │
│                    │     │ display_name       │
│                    │     │ avatar_url         │
└────────────────────┘     └────────────────────┘
         │
         │
         ▼
┌────────────────────┐
│    user_roles      │
├────────────────────┤
│ user_id (FK)       │
│ role (enum)        │ → admin | gestor
└────────────────────┘

┌────────────────────┐     ┌────────────────────┐     ┌────────────────────┐
│      events        │     │   gallery_items    │     │     services       │
├────────────────────┤     ├────────────────────┤     ├────────────────────┤
│ id (uuid)          │     │ id (uuid)          │     │ id (uuid)          │
│ title              │     │ title              │     │ title              │
│ description        │     │ description        │     │ description        │
│ date               │     │ type (image/video) │     │ category           │
│ location           │     │ category           │     │ icon               │
│ event_type         │     │ media_url          │     │ sort_order         │
│ is_published       │     │ sort_order         │     │ created_at         │
│ created_at         │     │ created_at         │     │ updated_at         │
│ updated_at         │     └────────────────────┘     └────────────────────┘
└────────────────────┘

┌────────────────────┐     ┌────────────────────┐     ┌────────────────────┐
│ contact_messages   │     │   site_settings    │     │   social_links     │
├────────────────────┤     ├────────────────────┤     ├────────────────────┤
│ id (uuid)          │     │ id (uuid)          │     │ id (uuid)          │
│ name               │     │ corporate_email    │     │ platform           │
│ surname            │     │ whatsapp_number    │     │ url                │
│ phone              │     │ updated_at         │     └────────────────────┘
│ email              │     └────────────────────┘
│ subject            │
│ description        │
│ is_read            │
│ created_at         │
└────────────────────┘
```

### Tables Detail

#### `user_roles`
| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| user_id | uuid | Reference to auth.users |
| role | app_role (enum) | `admin` or `gestor` |

**RLS Policies:**
- Admins can INSERT, DELETE, SELECT all roles
- Users can SELECT their own role

#### `profiles`
| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| user_id | uuid | Reference to auth.users |
| display_name | text | User's display name |
| avatar_url | text | Profile image URL |
| created_at | timestamptz | Creation timestamp |
| updated_at | timestamptz | Last update |

#### `events`
| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| title | text | Event title |
| description | text | Event description |
| date | timestamptz | Event date/time |
| location | text | Event location |
| event_type | text | `espectacle`, `presentacio`, `formacio`, `altre` |
| is_published | boolean | Visibility flag |

**RLS:** Admin/Gestor can CRUD; public SELECT

#### `gallery_items`
| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| title | text | Item title |
| description | text | Item description |
| type | text | `image` or `video` |
| category | text | `actriu` or `presentadora` |
| media_url | text | URL to media file |
| sort_order | integer | Display order |

**RLS:** Admin/Gestor can CRUD; public SELECT

#### `services`
| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| title | text | Service title |
| description | text | Service description |
| category | text | `psicologia`, `orientacio`, `formacio` |
| icon | text | Icon identifier |
| sort_order | integer | Display order |

**RLS:** Admin-only CRUD; public SELECT

#### `contact_messages`
| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| name | text | Sender's name |
| surname | text | Sender's surname |
| phone | text | Phone (optional) |
| email | text | Email address |
| subject | text | Message subject |
| description | text | Message body |
| is_read | boolean | Read status |

**RLS:** Anyone can INSERT; Admin can SELECT, UPDATE, DELETE

#### `site_settings`
Single-row table for global configuration.

| Column | Type | Description |
|--------|------|-------------|
| corporate_email | text | Business email |
| whatsapp_number | text | WhatsApp contact |

**RLS:** Public SELECT; Admin/Gestor UPDATE

#### `social_links`
| Column | Type | Description |
|--------|------|-------------|
| platform | text | `instagram`, `facebook`, `linkedin`, `tiktok` |
| url | text | Profile URL |

**RLS:** Public SELECT; Admin/Gestor CRUD

### Database Functions

| Function | Description |
|----------|-------------|
| `has_role(uuid, app_role)` | Check if user has specific role |
| `is_admin_or_gestor(uuid)` | Check if user is admin or gestor |
| `update_updated_at_column()` | Trigger function for timestamps |
| `handle_new_user()` | Trigger: auto-create profile on signup |

---

## 4. Routes

### Public Routes

| Path | Component | Description |
|------|-----------|-------------|
| `/` | `Index` | Home page with hero, about, portfolio cards, events |
| `/actriu` | `Actress` | Actress portfolio (videobook, photos, shows) |
| `/presentadora` | `Presenter` | Presenter portfolio |
| `/serveis` | `Services` | Professional services listing |
| `/galeria` | `Gallery` | Media gallery with filters |
| `/agenda` | `Agenda` | Events calendar |
| `/contacte` | `Contact` | Contact form & info |

### Admin Routes (Protected)

| Path | Component | Required Role |
|------|-----------|---------------|
| `/admin/login` | `Login` | None (public) |
| `/admin` | `Dashboard > Overview` | admin, gestor |
| `/admin/gallery` | `AdminGallery` | admin, gestor |
| `/admin/events` | `AdminEvents` | admin, gestor |
| `/admin/services` | `AdminServices` | admin, gestor |
| `/admin/settings` | `AdminSettings` | admin, gestor |
| `/admin/messages` | `AdminMessages` | admin only |
| `/admin/users` | `AdminUsers` | admin only |

### Route Protection

Routes are protected via `ProtectedRoute` component:

```tsx
<ProtectedRoute allowedRoles={["admin", "gestor"]}>
  <Dashboard />
</ProtectedRoute>
```

---

## 5. Components

### Core Components

| Component | Location | Description |
|-----------|----------|-------------|
| `Layout` | `src/components/Layout.tsx` | Main layout with Navbar + Footer |
| `Navbar` | `src/components/Navbar.tsx` | Navigation with language switcher |
| `Footer` | `src/components/Footer.tsx` | Footer with links & social |
| `ProtectedRoute` | `src/components/ProtectedRoute.tsx` | Auth/role guard HOC |
| `ScrollReveal` | `src/components/ScrollReveal.tsx` | Framer Motion reveal wrapper |
| `NavLink` | `src/components/NavLink.tsx` | Active-aware navigation link |

### UI Components (shadcn/ui)

Located in `src/components/ui/`:
- Button, Card, Input, Textarea, Label
- Dialog, Sheet, Dropdown Menu
- Table, Tabs, Select
- Toast, Tooltip, Avatar
- And 40+ more...

### Page Components

| Page | Key Features |
|------|--------------|
| `Index` | Hero section, about, portfolio cards, upcoming events |
| `Gallery` | Filterable grid (photo/video, actress/presenter) |
| `Agenda` | Event list with type badges |
| `Contact` | Form with validation, WhatsApp integration |
| `Services` | Service cards by category |

---

## 6. APIs & Edge Functions

### Edge Functions

Located in `supabase/functions/`:

#### `manage-users`
Admin-only function for user management.

**Endpoint:** `POST /functions/v1/manage-users`

**Actions:**
| Action | Payload | Description |
|--------|---------|-------------|
| `create` | `{email, password, display_name, role}` | Create new user |
| `delete` | `{user_id}` | Delete user (cannot delete self) |
| `update_role` | `{user_id, role}` | Change user role |

**Security:** Validates caller has admin role via auth token.

#### `send-contact-notification`
Sends email notification when contact form is submitted.

**Endpoint:** `POST /functions/v1/send-contact-notification`

**Payload:**
```json
{
  "name": "string",
  "surname": "string",
  "phone": "string (optional)",
  "email": "string",
  "subject": "string",
  "description": "string",
  "corporateEmail": "string"
}
```

**Integration:** Uses Resend API with `RESEND_API_KEY` secret.

### Supabase Client Usage

```typescript
import { supabase } from "@/integrations/supabase/client";

// Query example
const { data } = await supabase
  .from("events")
  .select("*")
  .eq("is_published", true)
  .order("date", { ascending: true });

// Insert example
await supabase.from("contact_messages").insert({ ... });

// Invoke edge function
await supabase.functions.invoke("send-contact-notification", {
  body: { ... }
});
```

---

## 7. Admin Panel

### Structure

```
/admin
├── Overview      → Dashboard stats (future)
├── Gallery       → CRUD gallery items + file upload
├── Events        → CRUD events + publish toggle
├── Services      → CRUD services (admin only)
├── Messages      → View/manage contact messages (admin only)
├── Users         → User management (admin only)
└── Settings      → Site settings + social links
```

### Dashboard Layout

- **Sidebar:** Navigation with role-based visibility
- **Header:** Mobile menu toggle, panel title
- **Content:** Outlet for nested routes

### Role Badge Colors

| Role | Color |
|------|-------|
| Admin | Purple (`bg-primary/10 text-primary`) |
| Gestor | Yellow (`bg-secondary/20 text-secondary`) |

### Features by Section

| Section | Capabilities |
|---------|--------------|
| Gallery | Add/delete items, file upload to storage |
| Events | Create/delete events, toggle publish status |
| Services | Full CRUD with icon & sort order |
| Messages | View messages, mark as read, delete |
| Users | Create users, assign roles, delete users |
| Settings | Update email, WhatsApp, social links |

---

## 8. Authentication & Authorization

### Auth Flow

1. User navigates to `/admin/login`
2. Enters email/password
3. `AuthContext.signIn()` calls Supabase Auth
4. On success, fetches role from `user_roles` table
5. Redirects to `/admin`

### AuthContext

```typescript
interface AuthContextType {
  user: User | null;
  session: Session | null;
  role: "admin" | "gestor" | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}
```

### Role Permissions

| Feature | Admin | Gestor |
|---------|-------|--------|
| View dashboard | ✅ | ✅ |
| Manage gallery | ✅ | ✅ |
| Manage events | ✅ | ✅ |
| Manage services | ✅ | ❌ |
| View messages | ✅ | ❌ |
| Manage users | ✅ | ❌ |
| Update settings | ✅ | ✅ |

### Row-Level Security

All tables have RLS enabled with policies based on:
- `has_role(auth.uid(), 'admin')` for admin-only
- `is_admin_or_gestor(auth.uid())` for both roles
- `auth.uid() = user_id` for own-record access

---

## 9. Integrations

### Lovable Cloud (Supabase)

| Service | Usage |
|---------|-------|
| Auth | Email/password authentication |
| Database | PostgreSQL with RLS |
| Storage | `media` bucket for gallery files |
| Edge Functions | User management, email notifications |

### Resend (Email)

- **Secret:** `RESEND_API_KEY`
- **From:** `onboarding@resend.dev` (or verified domain)
- **Usage:** Contact form notifications

### React Query

- Cache management for all Supabase queries
- Automatic refetching & background updates
- Query keys: `["events"]`, `["gallery_items"]`, `["services"]`, etc.

---

## 10. Internationalization (i18n)

### Supported Languages

| Code | Language |
|------|----------|
| `ca` | Català (default) |
| `es` | Español |
| `en` | English |

### Configuration

```typescript
// src/i18n/index.ts
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: { ca, es, en },
    fallbackLng: "ca",
    interpolation: { escapeValue: false },
  });
```

### Usage

```tsx
import { useTranslation } from "react-i18next";

const { t, i18n } = useTranslation();
t("nav.home");            // Translated string
i18n.changeLanguage("es"); // Switch language
```

### Translation Files

Located in `src/i18n/locales/`:
- `ca.json` - Catalan
- `es.json` - Spanish
- `en.json` - English

---

## 11. Deployment

### URLs

| Environment | URL |
|-------------|-----|
| Preview | `https://id-preview--c45366f7-19ce-4a9f-97aa-f5d3f3a768ca.lovable.app` |
| Production | `https://fesdiana.lovable.app` |

### Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_SUPABASE_URL` | Supabase project URL |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Supabase anon key |
| `VITE_SUPABASE_PROJECT_ID` | Project identifier |

### Secrets (Edge Functions)

| Secret | Description |
|--------|-------------|
| `SUPABASE_SERVICE_ROLE_KEY` | Admin access to Supabase |
| `RESEND_API_KEY` | Resend email API key |
| `LOVABLE_API_KEY` | Lovable AI integration |

### Build & Deploy

Automatic deployment via Lovable platform:
1. Code changes trigger build
2. Vite builds production bundle
3. Deployed to Lovable CDN
4. Edge functions deployed automatically

---

## Appendix: Quick Reference

### Common Commands

```bash
# Development (handled by Lovable)
npm run dev

# Type checking
npm run typecheck

# Tests
npm run test
```

### Key Patterns

```typescript
// Protected admin route
<ProtectedRoute allowedRoles={["admin"]}>
  <Component />
</ProtectedRoute>

// Data fetching with React Query
const { data, isLoading } = useQuery({
  queryKey: ["table_name"],
  queryFn: async () => {
    const { data } = await supabase.from("table").select("*");
    return data ?? [];
  },
});

// Mutation with toast feedback
const mutation = useMutation({
  mutationFn: async (newItem) => {
    await supabase.from("table").insert(newItem);
  },
  onSuccess: () => {
    queryClient.invalidateQueries(["table_name"]);
    toast({ title: "Success!" });
  },
});
```

---

*Documentation generated: March 2026*
