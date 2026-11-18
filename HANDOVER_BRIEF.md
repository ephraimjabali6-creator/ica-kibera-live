# ICA Kibera — Handover & Brief for New Fresh Session

## 1. What This Project Is
- **Project Name**: ICA Kibera (International Christian Assemblies, Olympic, Makina, Kibera, Nairobi).
- **Overseers**: Presiding Bishop Andrew Ouma & Dr. Ruth Ouma.
- **Repository**: `https://github.com/ephraimjabali6-creator/ica-kibera-live`
- **Active Production Deployment**: `https://ica-kibera-live.vercel.app/`
- **Local Directory**: `/home/jabali/Desktop/ICA/ica-kibera`
- **Clean Archive (Backup)**: `/home/jabali/Desktop/ICA/ica-kibera-packaged.tar.gz`

---

## 2. Current Architecture & Key Components
1. **Homepage (`pages/index.tsx`)**:
   - Renders `components/templates/TrinityAnglicanTemplate.tsx` directly as the default root view.
   - Route `/` serves the church website.

2. **Primary Active Template (`components/templates/TrinityAnglicanTemplate.tsx`)**:
   - **Colors**: 60% Alabaster Canvas (`#FAF9F6`), 30% Cathedral Slate (`#0F172A`), 10% Brand Magenta (`#D90077` / `#FF80BF`).
   - **Typography**: 
     - Headlines: `Instrument Serif` (editorial cathedral style).
     - Body: `Inter` with generous leading (`1.8` - `1.9`).
     - Sign-off: `Caveat` script for authentic pastoral handwritten signature.
     - Numbers/Data: `JetBrains Mono` for dates, timestamps, and paybills.
   - **Header**: 64px auto-hiding frosted navigation (`ABOUT`, `WORSHIP`, `LIVESTREAM`, `MINISTRIES`, `COMMUNITY`).
   - **Strict Rule**: **NO Give/Tithe button in the top navigation bar**. Giving is gracefully located in the dedicated partnership section (`Paybill 247247`, `Account 1170271072550` with 1-tap copy buttons).

3. **In-Browser Visual Studio Editor (`components/VisualStudioEditor.tsx`)**:
   - Injected globally in `pages/_app.tsx`.
   - Floating dock with:
     - Element Selector (point-and-click to edit any text directly).
     - Undo / Redo action history.
     - Typography styling (font weight 300–900, letter spacing, font family, colors).
     - Photo replacement presets.
     - Section duplication, move up/down, deletion.
     - AI Copilot prompt assistant.

---

## 3. How to Deploy or Run in the New Chat
- **To run locally**: `npm run dev` (starts on port 3000).
- **To build**: `npm run build`.
- **To deploy to Vercel**: `npx --yes vercel --prod --yes` (linked to `ephraimjabali6-creators-projects/ica-kibera-live`).
- **To sync Git**: `git push origin main`.
