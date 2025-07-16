# ✅ Client Portal Ticketing System (Next.js + TypeScript)
 A roubest client support system with real-time updates,, role-based access, and synamic ticket managment. 

 ## ✅ Project Overview
 This app alows users to submit various IT tickets (Siftware,Hardware, Network, Other), and enables engineers/admins to manage through a structer dashboard.

 ---

 ## ✅ Progress Checklist (Up to Step 31)

### 🧱 Core Architecture
- [x] Initialized with `create-next-app --typescript`
- [x] Global dark/light theme and RTL support using `UserSettingsContext`
- [x] Authentication context `useAuth` with role-based access (`admin`, `engineer`, `user`)
- [x] WebSocket hook (`useWebSocket`) for real-time ticket updates

---

### 🧩 Components
- [x] `Sidebar` with dynamic role-based links (admin/engineer)
- [x] `Header` with theme/direction toggle and user avatar
- [x] `InnerLayout` combining Header and Sidebar for page scaffolding


### 📁 Pages and Routes

#### ✅ Public
- [x] `/` - Landing page
- [x] `/login` & `/register` - Auth pages
- [x] `/unauthorized` - Role guard fallback

#### ✅ Admin
- [x] `/admin` - Ticket list with filter/search
- [x] `/admin/ticket/[id]` - Ticket detail view with:
  - Status control dropdown
  - Comment system with WebSocket broadcast
  - JSON preview

#### ✅ Dashboard (New Pages)
- [x] `/dashboard/tickets` - For admin/engineer ticket management
- [x] `/dashboard/engineers` - Placeholder for managing engineers
- [x] `/dashboard/settings` - Placeholder for user settings

---

## 🔧 Tech Stack
- **Next.js** (App Router + File-Based Routing)
- **TypeScript**
- **Tailwind CSS** for UI
- **WebSocket** (custom hook)
- **Yup + React Hook Form** for ticket forms
- **LocalStorage** for ticket persistence

---

## 🔜 Coming Next
- [ ] Route Guards for `/dashboard/*`
- [ ] Engineer Assignment System
- [ ] Notification System
- [ ] Persistent backend (e.g., Firebase, Supabase, or API)

---

## 🧠 Tips for Development


- Use `pnpm dev` or `npm run dev` to start
- Layout wrappers (`InnerLayout`) are placed in `src/Components`
- Tickets are stored in `localStorage` under `allTickets`
- Run a simple WebSocket server at `ws://localhost:3001` for real-time updates

---

## 🏗 Directory Structure


src/

├── app/

│ ├── admin/

│ │ ├── ticket/[id]/page.tsx

│ │ └── page.tsx

│ ├── dashboard/

│ │ ├── layout.tsx

│ │ ├── tickets/page.tsx

│ │ ├── engineers/page.tsx

│ │ └── settings/page.tsx

│ └── login, register, unauthorized...

├── Components/

│ ├── Header.tsx

│ ├── Sidebar.tsx

│ ├── InnerLayout.tsx

│ └── LayoutClientWrapper.tsx

├── context/

│ ├── AuthProvider.tsx

│ └── UserSettingsContext.tsx

├── hooks/

│ └── useWebSocket.ts

└── types/

└── ticket.ts

---

## 💬 Contact
Maintained by **Ali Razi**  
Feel free to contribute or raise issues!
