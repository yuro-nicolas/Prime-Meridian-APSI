# AI usage

This project was built with AI assistance. This file is the record of it. It is
graded as the finals badge, and it is worth 100 points.

**How much I used AI:** a lot. I wrote the first version of the site myself as
static HTML pages, planned the features, and made the final decisions, then used
Claude and other AI chat assistants to turn it into a React + Express +
PostgreSQL app, write and fix code, review security, and write documentation.
Many files started as my own code and were then rewritten or extended with AI. I
tested every change and changed what the AI gave me when it was wrong (section 2).

## 1. How I used AI

### 2026-09-22 - SVG placeholder graphics
- **Tool:** Claude
- **What I asked for:** SVG code to use as placeholder images on the frontend,
  standing in for real photos until they're ready, fitted into the HTML and
  styles I had already written.
- **What it gave back:** Inline SVG drawings of houses made of basic shapes:
  rectangles for walls and windows, polygons for rooflines.
- **What I kept, what I changed, and why:** I kept them as temporary placeholders
  in the layout I had already designed, to swap for real photos later.
- **Commit:** [071a556](https://github.com/yuro-nicolas/Prime-Meridian-APSI/commit/071a55603091897beb4e5f532f0e8afdc88deca3)

### 2026-09-22 - CSS styling for my static pages
- **Tool:** Claude
- **What I asked for:** Help writing the CSS for the page layout I had designed.
- **What it gave back:** A full stylesheet (`css/styles.css`) with the colours,
  fonts, header, cards and grid layout.
- **What I kept, what I changed, and why:** I kept almost all of it because it
  matched the design I wanted. It became the base for the React styles later.
- **Commit:** [0b80603](https://github.com/yuro-nicolas/Prime-Meridian-APSI/commit/0b8060319b3adfad002f4cc9255400200bacb166)

### 2026-09-23 - Turning the static site into React components
- **Tool:** Claude and other AI chat assistants
- **What I asked for:** Convert my static HTML pages into a React + Vite app with
  reusable components and React Router pages.
- **What it gave back:** Components for the layout, home sections, property
  cards, gallery and forms, and pages for Home, Listings, Listing Detail, About Us
  and Contact.
- **What I kept, what I changed, and why:** I kept the component structure
  because it removed the copy-pasted header and footer from every HTML file, then
  deleted my old HTML files once the React pages replaced them.
- **Commit:** [66d1fe0](https://github.com/yuro-nicolas/Prime-Meridian-APSI/commit/66d1fe0228f7b3f15f0a8d5d09c32b81af766700), [c240426](https://github.com/yuro-nicolas/Prime-Meridian-APSI/commit/c24042636968314054278d74a913ac360e81b70c)

### 2026-09-25 to 09-27 - Express API and PostgreSQL schema
- **Tool:** Claude and other AI chat assistants
- **What I asked for:** An Express backend so listings and contact messages are
  stored in a real database instead of in the frontend.
- **What it gave back:** Routes for `/properties`, `/inquiries` and admin login,
  query functions in `server/db/`, and `schema.sql` with the `properties` and
  `inquiries` tables.
- **What I kept, what I changed, and why:** I kept the routes and queries, wrote
  my own real listing into the seed data (section 3), and changed `db/pool.js` so
  it works both locally and on Neon with SSL.
- **Commit:** [3897f71](https://github.com/yuro-nicolas/Prime-Meridian-APSI/commit/3897f715c79b922f7e34eb318e41dfc44b9ec3ff), [f7ffb81](https://github.com/yuro-nicolas/Prime-Meridian-APSI/commit/f7ffb816b6af4a31a0cbb91d758173269cc641b6), [143769c](https://github.com/yuro-nicolas/Prime-Meridian-APSI/commit/143769c0d8680f3b0604340295cde9fe17c9b49c), [0af973f](https://github.com/yuro-nicolas/Prime-Meridian-APSI/commit/0af973f1ff09e4021c690d8966ad2aa3c2d62a12), [a7dbc19](https://github.com/yuro-nicolas/Prime-Meridian-APSI/commit/a7dbc19c08190eb7ea71a807986f26c95e80a07f)

### 2026-09-27 - Server-side admin login with password hashing
- **Tool:** Claude
- **What I asked for:** Move the admin check out of the browser and make it
  secure.
- **What it gave back:** `server/middleware/adminAuth.js` with scrypt password
  hashing, session tokens, a login rate limit, and a script to generate the
  password hash.
- **What I kept, what I changed, and why:** I kept all of it. The old check ran
  in the browser, where anyone could read it. This one never sends the password
  or its hash to the browser. Section 3 explains how it works.
- **Commit:** [f5ea651](https://github.com/yuro-nicolas/Prime-Meridian-APSI/commit/f5ea65156e1696513ff385742992a15539a5c406), [22235bc](https://github.com/yuro-nicolas/Prime-Meridian-APSI/commit/22235bc79aec6f4f4f74dacd602f5921fd55785c), [a9ef183](https://github.com/yuro-nicolas/Prime-Meridian-APSI/commit/a9ef18312982b04d5680766ad9eff5fa1fe7c323)

### 2026-09-27 - Finding the template files mixed into my repository
- **Tool:** Claude
- **What I asked for:** Compare my repository with my working copy and tell me
  which files were missing or wrong.
- **What it gave back:** A list showing that `client/package.json` was actually
  the server's file, that `server/package.json` was missing `dotenv`, and that
  `App.jsx` and `server.js` were still the class template's. It built the client
  and started the server to confirm.
- **What I kept, what I changed, and why:** I replaced each wrong file myself,
  one commit per file, until a fresh copy of the repository built and started.
- **Commit:** [9dc723f](https://github.com/yuro-nicolas/Prime-Meridian-APSI/commit/9dc723fae883039fdfb2863b8aa25aa4cf3d6e40), [a830174](https://github.com/yuro-nicolas/Prime-Meridian-APSI/commit/a830174a85736a393cae32baf50095ff810b8fb3), [1b1a11c](https://github.com/yuro-nicolas/Prime-Meridian-APSI/commit/1b1a11c4c687907924b58d8f54b41dce82a66b8b)

### 2026-09-27 - Security checklist review
- **Tool:** Claude
- **What I asked for:** Fill in the security checklist from my real repository
  and point out anything unsafe.
- **What it gave back:** Evidence for each row, and three problems: my personal
  email in old commits, an unused GitHub Pages workflow still running, and CORS
  allowing every website when `CORS_ORIGIN` was not set.
- **What I kept, what I changed, and why:** I fixed all three. I removed the CORS
  fallback, deleted the workflow, rewrote my commit history to my GitHub noreply
  email, and created a limited database user. The row I could not make true (the
  database being reachable from the internet) I left as an honest No.
- **Commit:** [ac21bd8](https://github.com/yuro-nicolas/Prime-Meridian-APSI/commit/ac21bd826ddec275a316201d4344c1483f2f8049), [ec00c23](https://github.com/yuro-nicolas/Prime-Meridian-APSI/commit/ec00c237a323c4b7b646b133c9a0da8d730cd713)

### 2026-09-27 - README rewrite
- **Tool:** Claude
- **What I asked for:** Rewrite the README so it matches the real code.
- **What it gave back:** Setup steps, environment variables, the full API table,
  deployment steps and a security section.
- **What I kept, what I changed, and why:** I kept the structure, added my own
  screenshots, and removed an image link that pointed to a file that did not
  exist.
- **Commit:** [ab41457](https://github.com/yuro-nicolas/Prime-Meridian-APSI/commit/ab41457c193e053ae0835dd50f551b893f4165b5), [a777f8d](https://github.com/yuro-nicolas/Prime-Meridian-APSI/commit/a777f8d6486b38d505810fd74a9dd36494e50e8c), [d6464bf](https://github.com/yuro-nicolas/Prime-Meridian-APSI/commit/d6464bf0e134bb613537440c642922522425bba3)

### 2026-10-04 - Removing the parallax background
- **Tool:** Claude
- **What I asked for:** Remove the scrolling parallax effect on the home page
  backgrounds.
- **What it gave back:** Which files used the `useParallax` hook, and what to
  change so nothing still imported it.
- **What I kept, what I changed, and why:** Instead of keeping an empty hook, I
  deleted `useParallax.js` completely and removed its imports and refs myself, so
  there is no dead code left.
- **Commit:** [a1ea80f](https://github.com/yuro-nicolas/Prime-Meridian-APSI/commit/a1ea80f3cdb8e1c5178d8041725159f98bf421aa), [125fa81](https://github.com/yuro-nicolas/Prime-Meridian-APSI/commit/125fa816a557393e67ee2499b1bc32a1f5535782), [2915730](https://github.com/yuro-nicolas/Prime-Meridian-APSI/commit/2915730c100d41cc61f1f182c3b29d77a75cff28)

### 2026-10-04 - "Delete all" in the admin inbox
- **Tool:** Claude
- **What I asked for:** Fix "Delete all" so it does not delete unread messages.
- **What it gave back:** A change to the route, the query and the admin page, so
  "Delete all" only deletes the messages in the tab being viewed (read or unread).
- **What I kept, what I changed, and why:** I kept it and applied it file by
  file. The server now rejects a delete-all request that does not say which
  messages to delete.
- **Commit:** [73623c4](https://github.com/yuro-nicolas/Prime-Meridian-APSI/commit/73623c436a3baeeaf85d92ff467091a02f8b30a8), [f369d3f](https://github.com/yuro-nicolas/Prime-Meridian-APSI/commit/f369d3f1fcdf87caee72ae7ee91b0e56982c51a7), [d945d1c](https://github.com/yuro-nicolas/Prime-Meridian-APSI/commit/d945d1caa5d4a2c4b1ead693ebed0888081761b4), [0544df4](https://github.com/yuro-nicolas/Prime-Meridian-APSI/commit/0544df495dd0d92e8aa9d91d60a55aa48e1b0178), [4ca86e3](https://github.com/yuro-nicolas/Prime-Meridian-APSI/commit/4ca86e35235960917c9287c3b112ba7c08254600), [7e9cd68](https://github.com/yuro-nicolas/Prime-Meridian-APSI/commit/7e9cd686d6ea3fe6b6ae3218d0be7e53fe78bb76)

### 2026-10-04 - Phone field and one shared phone number
- **Tool:** Claude
- **What I asked for:** Add a phone field to the Contact page like the popup
  form, show a phone number in every footer, and use 09123456789 everywhere.
- **What it gave back:** The phone field, a new `client/src/lib/contact.js` that
  holds the number in one place, and footer changes.
- **What I kept, what I changed, and why:** I kept it. Keeping the number in one
  file means changing it later is a one-line edit.
- **Commit:** [fbd22eb](https://github.com/yuro-nicolas/Prime-Meridian-APSI/commit/fbd22eb4384f632d14e20c000bbd8ae42dc75313), [692c7ff](https://github.com/yuro-nicolas/Prime-Meridian-APSI/commit/692c7ffb2a10305273e47c6378638317ed663999), [f535318](https://github.com/yuro-nicolas/Prime-Meridian-APSI/commit/f535318e9730953d670a7b5ddd189c665abb7334), [a411f20](https://github.com/yuro-nicolas/Prime-Meridian-APSI/commit/a411f2053d91cce7bc01c163c8b7d4c3855f6d13), [9dfb4b7](https://github.com/yuro-nicolas/Prime-Meridian-APSI/commit/9dfb4b799fb799978f9b11f40c77d5f9b671a62f)

### 2026-10-04 - Phone number validation
- **Tool:** Claude
- **What I asked for:** Make the phone field reject letters and wrong lengths,
  like the email field.
- **What it gave back:** A browser `pattern` on both forms and a matching check
  on the server for numbers like `09123456789` or `+639123456789`.
- **What I kept, what I changed, and why:** I kept both. The browser check gives
  a quick message, and the server check stops anyone who skips the form.
- **Commit:** [7dc1921](https://github.com/yuro-nicolas/Prime-Meridian-APSI/commit/7dc1921e6d1a2bd0ab7421c732ebe65c1b6dd024), [d71cc3e](https://github.com/yuro-nicolas/Prime-Meridian-APSI/commit/d71cc3e910d26ace2d6ca4e3648e94c9a71cf535), [cc09f5c](https://github.com/yuro-nicolas/Prime-Meridian-APSI/commit/cc09f5c758e4b0ae8cd5ba2319e8a631f31bccc7)

## 2. Where the AI got it wrong

### Case 1 - CORS allowed every website
- **What it gave me:** In the AI-written `server.js`:
  `app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }))`
- **What was wrong with it:** If `CORS_ORIGIN` was ever missing on the host, the
  API silently allowed any website on the internet to call it, including the
  routes that change data. The security checklist caught it.
- **What I did instead:** I removed the `|| "*"` fallback, so only the address
  set in `CORS_ORIGIN` (my Vercel site) is allowed, and set it on Render.
- **Commit:** [ac21bd8](https://github.com/yuro-nicolas/Prime-Meridian-APSI/commit/ac21bd826ddec275a316201d4344c1483f2f8049) (fallback introduced in [a830174](https://github.com/yuro-nicolas/Prime-Meridian-APSI/commit/a830174a85736a393cae32baf50095ff810b8fb3))

### Case 2 - "Delete all" deleted unread messages too
- **What it gave me:** A `DELETE /inquiries` route running
  `DELETE FROM inquiries`, and a "Delete all" button in the admin inbox.
- **What was wrong with it:** The inbox has Unread and Read tabs, but the button
  deleted every message in both. Clearing old read messages would also delete
  new ones I had not opened yet. I found this while testing the admin page.
- **What I did instead:** "Delete all" now only deletes the tab being viewed. The
  route requires `?status=read` or `?status=unread`, and the query uses
  `WHERE is_read = $1`.
- **Commit:** [f369d3f](https://github.com/yuro-nicolas/Prime-Meridian-APSI/commit/f369d3f1fcdf87caee72ae7ee91b0e56982c51a7), [73623c4](https://github.com/yuro-nicolas/Prime-Meridian-APSI/commit/73623c436a3baeeaf85d92ff467091a02f8b30a8), [7e9cd68](https://github.com/yuro-nicolas/Prime-Meridian-APSI/commit/7e9cd686d6ea3fe6b6ae3218d0be7e53fe78bb76) (original in [143769c](https://github.com/yuro-nicolas/Prime-Meridian-APSI/commit/143769c0d8680f3b0604340295cde9fe17c9b49c))

### Case 3 - The new phone field accepted anything
- **What it gave me:** A phone input on the Contact page with only `type="tel"`.
- **What was wrong with it:** `type="tel"` does not check anything, so letters,
  `0912` or a 30-digit number were all accepted and saved. The server did not
  check it either. I found this by typing letters into the field.
- **What I did instead:** I asked for real validation. Both forms now use
  `pattern="(09|\+639)[0-9]{9}"` with a hint message, and the server rejects any
  other phone with a 400 error.
- **Commit:** [d71cc3e](https://github.com/yuro-nicolas/Prime-Meridian-APSI/commit/d71cc3e910d26ace2d6ca4e3648e94c9a71cf535), [cc09f5c](https://github.com/yuro-nicolas/Prime-Meridian-APSI/commit/cc09f5c758e4b0ae8cd5ba2319e8a631f31bccc7) (field added in [692c7ff](https://github.com/yuro-nicolas/Prime-Meridian-APSI/commit/692c7ffb2a10305273e47c6378638317ed663999))

## 3. Who wrote what

I wrote the first version of the site myself, and many of the files started as
my code before AI rewrote or extended them. These are the parts that are mine.

### Written by me

- **File:** `client/src/pages/index.html`, `listings.html`, `about.html`,
  `contact.html`, `listing-1.html` to `listing-6.html` (the original static site)
- **Commit:** [071a556](https://github.com/yuro-nicolas/Prime-Meridian-APSI/commit/071a55603091897beb4e5f532f0e8afdc88deca3)
- **What it does and why it is built this way:** I originally built these as
  separate static HTML pages for the main sections of the site: Home, Listings,
  About Us, Contact and individual listing pages. I kept the header and
  navigation consistent across the pages, and the listing cards linked directly
  to their corresponding listing pages. I later moved the site to React because
  maintaining the same header, footer and page structure separately in every
  HTML file was repetitive. React let me reuse those parts as components and
  use routing for the different pages instead of keeping a collection of
  duplicated HTML files.

- **File:** `server/db/seed.sql` (the real listing, property `0001`)
- **Commit:** [963b64d](https://github.com/yuro-nicolas/Prime-Meridian-APSI/commit/963b64d8306689571bbf35f3db7df5fa9b704b3b)
- **What it does and why it is built this way:** The `INSERT` names its
  columns explicitly so the values are tied to the correct fields instead of
  depending on the table's column order. The property with code `0001` contains
  the real listing information I entered for the project, including its
  location, price, floor and lot areas, bedrooms, bathrooms and other features.
  The other rows are sample properties used to populate and test the listings
  interface. I set `is_public` to `true` for property `0001` because it is the
  listing I want displayed on the public site, while the sample listings stay
  `false` so they can remain available for testing without being treated as
  public listings.

- **File:** `client/src/pages/AboutUs.jsx`, `client/src/pages/Contact.jsx` (my edits)
- **Commit:** [e8c4e49](https://github.com/yuro-nicolas/Prime-Meridian-APSI/commit/e8c4e49a061b4297a3723dd00bfcb7fcb6de668f), [c9a1b16](https://github.com/yuro-nicolas/Prime-Meridian-APSI/commit/c9a1b16ff8a63a2d3b826f0fb957012f1f92fd76), [ff0bb0e](https://github.com/yuro-nicolas/Prime-Meridian-APSI/commit/ff0bb0e21891bc635c9e4f479f4b872f7c40c6ed)
- **What it does and why it is built this way:** In `AboutUs.jsx`, I changed
  the broker details and license information so the page reflects the details
  I wanted for the project instead of leaving the template information
  unchanged. In `Contact.jsx`, I corrected the response-time and confirmation
  text so the messages shown to users are properly written. These were my own
  edits to the generated React pages rather than changes I simply accepted
  without checking.

### The AI-written part I understand best

- **File:** `server/middleware/adminAuth.js`
- **Commit:** [f5ea651](https://github.com/yuro-nicolas/Prime-Meridian-APSI/commit/f5ea65156e1696513ff385742992a15539a5c406), [22235bc](https://github.com/yuro-nicolas/Prime-Meridian-APSI/commit/22235bc79aec6f4f4f74dacd602f5921fd55785c)
- **What it does and why we kept it:** This file handles the admin password
  check on the server instead of putting the password or its hash in the
  browser. `scryptSync` takes the password and a salt and produces the password
  hash. The salt makes the same password produce a different stored value when
  a different salt is used, which makes precomputed password attacks harder.
  `ADMIN_PASSWORD_HASH` is stored as `salt:hash` so the server has both pieces
  needed to recreate the hash when a user logs in.

  When checking the password, the server hashes the submitted password with the
  stored salt and compares the resulting bytes with the stored hash using
  `timingSafeEqual` instead of a normal `===` comparison. The point of this is
  to make the comparison take a consistent amount of time rather than giving
  an attacker useful timing differences.

  The login also has a simple rate limit stored in memory. After 5 failed
  attempts from the same IP address, another login attempt is blocked for 15
  minutes. This is meant to slow down repeated password-guessing attempts.
  It is a basic project-level protection, not a full production authentication
  system.

  After a successful login, the server creates a random session token and
  keeps the token and its expiration time in an in-memory `Map`. Protected
  requests send that token in the `Authorization` header as
  `Bearer <token>`. The `requireAdmin` middleware reads that header, extracts
  the token, checks whether it is still valid, and returns `401` if it is
  missing, expired or unknown.

  The sessions are deliberately stored only in memory. That means they are
  lost whenever the server restarts, so an administrator has to log in again.
  For this project that is acceptable because there is only one admin account
  and it avoids adding a database-backed session system. The code itself also
  describes this as a simple session store rather than a production-grade
  authentication system.
