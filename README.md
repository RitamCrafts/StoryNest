# StoryNest

**Write. Share. Discover.**

StoryNest is a personal educational blogging platform built to explore how a modern web application is designed, secured, and deployed.

It combines a clean writing and reading experience with authentication, protected routing, Appwrite databases and storage, reusable React components, responsive UI, and progressively improved error and security handling.

> **Educational / Personal Project**
>
> StoryNest was built primarily for learning and experimentation. It is not intended to be copied, redistributed, republished, or presented as someone else's work.
>
> The source code, UI, branding, assets, and implementation are not provided under a license for reuse.

---

## What StoryNest Does

StoryNest lets users:

- Create blog posts
- Write using a rich-text editor
- Upload featured images
- Publish or keep posts private
- Edit and delete their own posts
- Discover published stories
- Open individual story pages
- Maintain a user profile
- Log in and out using email/password authentication
- Follow shareable/deep links and return to the originally requested page after login

The application is designed around a simple idea:

**writing should be easy, reading should be peaceful, and the interface should stay out of the way.**

---

## Features

### ✍️ Writing

- Create posts with a reusable `PostForm`
- Edit existing posts
- Rich-text content editing
- Locally hosted TinyMCE editor
- Featured image uploads
- Image preview and replacement handling
- Public and private post states
- Author-specific update/delete permissions
- Reusable form and input components

### 📖 Reading & Discovery

- Home page for published content
- Dedicated Discover page
- Story detail pages
- Story grids and responsive layouts
- Featured image previews
- Shareable story links
- Deep-link handling that preserves the requested destination through login

### 👤 Authentication & Accounts

- Email/password account creation
- Email/password login
- Session restoration
- Logout and session cleanup
- Protected routes
- Public routes
- Banned-route handling
- User profile creation
- Automatic recovery of missing user profiles during login
- Authentication-aware UI and navigation

### 🔐 Database Security

StoryNest uses **Appwrite row-level permissions** rather than relying only on frontend route protection.

Posts are assigned permissions according to their visibility:

- Public posts can be read according to their configured public permissions
- Private posts are restricted to their owner
- Owners can update their own posts
- Owners can delete their own posts
- User profile modification is restricted to the corresponding user

The project also went through a dedicated security-hardening stage after discovering an authorization issue during development.

This included investigating and fixing database access paths that could otherwise be abused through client-side requests, and moving important access control into Appwrite permissions instead of assuming that hiding UI elements was sufficient.

### 🛡️ Error & Recovery Handling

The application has been progressively hardened against common failure cases, including:

- Invalid credentials
- Existing accounts
- Missing documents
- Missing user profiles
- Failed profile creation
- Failed image uploads
- Orphaned image handling
- Appwrite service errors
- Failed post operations
- Loading states
- Route errors
- Missing/invalid story routes
- Session failures
- Authentication state mismatches

A missing user profile can also be automatically recreated when a valid user successfully logs in, preventing users from getting stuck with incomplete account data.

---

## UI & UX

StoryNest has been designed around a lightweight, reusable component system.

### UI work includes

- Responsive Home page
- Responsive Discover page
- Responsive story layouts
- Reusable common inputs, buttons, boxes, and selects
- Custom navigation/header
- Footer
- Authentication page layouts
- Loading screens
- Toast notifications
- Error states
- Empty/fallback states
- Responsive mobile layouts
- Green-focused visual identity
- Leaf-inspired backgrounds
- Separate lightweight background treatment for logged-in areas
- Improved spacing, typography, and visual hierarchy
- Custom StoryNest logo treatment
- Clean reading-focused story presentation

The UI was repeatedly refined during development instead of being treated as a one-time implementation.

---

## Authentication Notes

### Currently available

- Account creation
- Email/password login
- Session persistence/restoration
- Logout
- Protected routes
- Redirect-back-after-login behavior

### Not currently available

These features are intentionally not part of the current release:

- ❌ Email verification
- ❌ Forgot password
- ❌ Password recovery
- ❌ Password reset
- ❌ Google/GitHub authentication

Account recovery and verification are planned for a future version when a more suitable custom backend/authentication flow is implemented.

Some footer links are also currently placeholders and may not lead to functional pages yet.

---

## Notable Technical Work

StoryNest evolved considerably during development. Some of the less visible work was as important as the UI itself.

### Routing

- Migrated to structured React Router routing
- Added protected and public route layers
- Added route-specific behavior
- Added advanced redirect handling
- Preserved the original destination when authentication is required
- Added SPA rewrite configuration for Vercel
- Added a dedicated application error page
- Fixed routing-related production issues

### Appwrite

- Authentication service
- Database service abstraction
- Storage service abstraction
- Post CRUD operations
- User profile CRUD operations
- Row-level document permissions
- Featured image storage
- Profile recovery
- Session management
- Error handling around Appwrite operations

### Security Hardening

During development, a **major security issue was discovered and fixed** and previous accounts with bad permission setup were migrated using JS scripts.

The project was tested against the assumption that frontend restrictions alone were enough to protect data. That led to a deeper review of Appwrite permissions and database access.

The final architecture relies on Appwrite's permissions at the database/document level, providing authorization independently from what the frontend happens to display.

### Image Handling

The image system was refined to handle:

- New uploads
- Existing images
- Image replacement
- Image deletion
- Failed upload scenarios
- Orphaned image cleanup/handling
- Loading and upload states

### Rich Text Editor

The text editor was changed to a **locally hosted TinyMCE setup**.

This avoids depending on an externally hosted editor configuration for normal editor usage and avoids unnecessary external API/rate-limit concerns during development.

### Production / Deployment

- Vercel deployment
- SPA rewrite configuration
- Production build fixes
- Case-sensitive import fixes
- Linux/Vercel compatibility fixes
- Metadata added to `index.html`
- Production routing corrections

---

## Development Journey

StoryNest was not built as one large implementation. It was developed incrementally, with bugs and architectural problems being discovered and fixed along the way.

Some notable milestones from the project's Git history include:

1. Initial routing and authentication functionality
2. Login and signup flows
3. Protected routes and logout handling
4. Reusable common UI components
5. StoryNest rebrand from BlogNest
6. Home page design and responsiveness
7. Discover page implementation and styling
8. Story creation/editing/routing
9. User profile Appwrite services
10. Automatic profile creation/recovery
11. Rich-text editor integration
12. Local TinyMCE setup
13. Custom image upload component
14. React Hot Toast integration
15. Loading and error-page improvements
16. Vercel SPA rewrite configuration
17. Production import/case-sensitivity fixes
18. Major security issue discovery
19. Security hardening and permission fixes
20. Additional UI refinements and bug fixes
21. Shareable/deep links with login redirection
22. Metadata and production polish

The Git history reflects the project being built, tested, broken, investigated, and improved rather than being presented as a finished template from the beginning.

---

## Technology

### Frontend

- React
- Vite
- React Router
- Tailwind CSS
- React Hook Form
- Lucide React
- Material UI
- React Hot Toast
- TinyMCE

### Backend / Services

- Appwrite Authentication
- Appwrite Databases
- Appwrite Row-Level Permissions
- Appwrite Storage

### Deployment

- Vercel

---

## Learning Approach

I am still learning several of the technologies used in StoryNest.

I do not claim to be an expert in every library in this project.

The application was developed through:

- Official documentation
- Library examples
- Experimentation
- Debugging
- Reading existing implementations
- AI-assisted development

A major part of the project was learning how the pieces fit together rather than memorizing every API.

For example, the project uses Material UI and TinyMCE even though I am not an expert in either library. I learned how to integrate and customize them by referring to their documentation and examples.

---

## Project Structure

```text
src/
├── appwrite/
│   ├── auth.js
│   └── config.js
│
├── assets/
│
├── components/
│   ├── Common/
│   ├── Backgrounds/
│   ├── Header/
│   └── ...
│
├── context/
│   └── AuthContext.jsx
│
├── pages/
│   ├── HomePage.jsx
│   ├── LoginPage.jsx
│   ├── SignUpPage.jsx
│   ├── DiscoverPage.jsx
│   ├── StoryPage.jsx
│   ├── WritePage.jsx
│   ├── EditPage.jsx
│   ├── AboutPage.jsx
│   └── ErrorPage.jsx
│
├── utils/
│
├── App.jsx
└── main.jsx
```

---

## Environment Variables

StoryNest uses Vite environment variables for its Appwrite configuration.

The exact variable names depend on the project's `conf.js` configuration.

Example:

```env
VITE_APPWRITE_URL=
VITE_APPWRITE_PROJECT_ID=
VITE_APPWRITE_DATABASE_ID=
VITE_APPWRITE_POSTS_COLLECTION_ID=
VITE_APPWRITE_USERS_COLLECTION_ID=
VITE_APPWRITE_BUCKET_ID=
```

Additional environment variables may be used by the project.

**Never commit private credentials or sensitive environment variables to version control.**

---

## Current Status

StoryNest currently contains:

- ✅ Authentication
- ✅ Session handling
- ✅ Protected routing
- ✅ Public/private posts
- ✅ Appwrite row-level permissions
- ✅ Post creation
- ✅ Post editing
- ✅ Post deletion
- ✅ Story discovery
- ✅ Story pages
- ✅ Shareable/deep links
- ✅ Login redirect preservation
- ✅ Featured image uploads
- ✅ Image cleanup handling
- ✅ User profiles
- ✅ Missing-profile recovery
- ✅ Rich-text editor
- ✅ Locally hosted TinyMCE
- ✅ Responsive UI
- ✅ Toast notifications
- ✅ Loading states
- ✅ Error handling
- ✅ Vercel deployment
- ✅ Production SPA rewrites
- ✅ Security hardening
- ❌ Email verification
- ❌ Forgot password / password recovery
- ❌ Social login
- ⚠️ Some footer links are still placeholders

---

## Future Improvements

Potential future work includes:

- Email verification
- Password recovery/reset
- Search
- Categories
- Bookmarks
- Comments
- Likes/reactions
- More advanced profile settings
- Better account recovery
- Additional moderation features
- Completing remaining footer links

---

## Project Ownership

**StoryNest** is a personal educational project.

The project is intended to demonstrate development progress, experimentation, and learning.

The source code, branding, UI, assets, and implementation are **not licensed for copying, redistribution, or reuse without permission**.

---

© 2026 StoryNest. All rights reserved.
