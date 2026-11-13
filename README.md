# electraEMF Health™ — Mobile Application

A modern, professional, fully responsive mobile application built for **electraEMF Health** (https://electraemfhealth.com/). Rebuilt from the ground up to transform the complete electraEMF website experience into a premium mobile application inspired by the **PlanEnroll** mobile layout.

---

## 🌟 Key Features & Layout Architecture

### 1. PlanEnroll-Inspired UI/UX Design System
- **Mobile Container Shell**: Responsive device frame with iPhone 15 Pro, iPad/Tablet, and Fluid Desktop view toggles.
- **Clean Header**: Features the official electraEMF logo (`5G-antenna-now.gif`), global search trigger, notification bell with unread badge counter, and user profile drawer.
- **Top Licensed Expert Assistant Card**:
  - *"Our Licensed Experts are here to help. ❤️"*
  - Direct quick action buttons: **Chat** (interactive triage AI), **Call** (dual direct dialer), **Inquiry** (consultation form).
  - Expert profile avatar featuring **Prof. Dr. Josef Dumanov, Esq.** with online status and IBEW license badge.
- **Gradient Hero Banner**: Deep electric indigo gradient card with biological exposure messaging, *"Explore Services"*, and *"Book Assessment"*.
- **Horizontally Scrollable Category Pills**: Categorized service filters with dynamic counters (`All Services`, `Residential`, `Schools & Edu`, `Commercial & Corp`, `Health & Implants`, `Legal & Court`, `Shielding`).
- **Two-Column Action Cards**:
  - **Electric Blue**: *Find Services >* (10 Services)
  - **Emerald Green**: *Compare Limits >* (Interactive IEEE/FCC vs Biological Guidelines)
  - **Warm Amber**: *Health & ICD >* (Medical implants & clinical studies)
  - **Magenta/Rose**: *Lawful Experts >* (Civil, tort & stigmatized real estate)
- **Floating Pill Bottom Navigation**: Fixed bottom navigation bar with 5 primary sections: **Home**, **About**, **Services**, **Resources**, and **Contact**.

---

## 🔬 100% Website Content & Data Mapping

All 48 accessible pages and posts from `https://electraemfhealth.com/` were scraped, parsed, and integrated without omitting or watering down authentic information:

### A. Home Dashboard
- Real service locations across NY, NJ, PA, CT & DE.
- Interactive **EMF Exposure Risk Self-Assessment Tool** (3-step environmental check).
- Forensic case studies previews.
- Verified customer feedback carousel.
- Instant consultation hotline.

### B. About Us (`/about/`)
- Company history dating back to **2003** with 25+ years of experience and 1,000+ exposure research studies.
- **State & Industry-Licensed IBEW electronics and communications engineering**.
- **RCA Sarnoff Princeton New Jersey & EECT** engineering pedigree.
- Lead expert profile: **Prof. Dr. Josef Dumanov, Esq.** (IEEE, legal counsellor, author of Volume One).
- Transparent consumer alert exposing unaccredited 48-hour *"EMF certification certificates"*.
- Industries served: Residential, Schools, Hospitals, Corporate Headquarters, Police Departments (PBA, FOP), Municipalities, and Legal Counsel.

### C. Services Catalog (`/services/`, `/emf-testing/`, `/emf-solutions/`)
- Advanced EMF/EMI Environmental Studies.
- 2G, 3G, 4G, 5G, and 6G Wireless Spectrum Analysis.
- Power Distribution & Substation 60 Hz Magnetic Field Profiling.
- Medical Implant Device Interference (ICD, Pacemakers, Neurostimulators).
- Schools & Educational Institution Audits.
- New Home Buyers & Sellers Pre-Closing Inspections.
- Rehabilitation of EMF Stigmatized Properties.
- Corporate, Commercial & Municipal Building Safety.
- Lawful Experts & Court Trial Testimony (Daubert/Frye standards).
- Architectural Shielding Specifications & Faraday Cage Construction.

### D. Technical Reports & Case Studies
- **ABC News Case Study**: Stray ground voltage keeping an NJ family out of their swimming pool and off their lawn.
- **NYC Luxury High-Rise**: Rooftop cellular antenna penetration and 99.4% RF barrier reduction.
- **Tri-State Middle School**: Comprehensive 230 kV power line corridor audit for 800+ students and staff.
- **Hamptons Luxury Estate**: Resolving substation proximity stigma for a $6.2M closing.

### E. Health, Safety & Standards (`/medcial-effects/`, `/understanding-the-ieee-emf-exposure-standards/`)
- 20+ years of medically integrated exposure studies (**electraEMF sC-Ve protocol**).
- Neurological, cardiovascular, and pediatric sensitivity documentation.
- Comparison matrix: Thermal limits (FCC/IEEE) vs electraEMF biological guidelines.

### F. Customer Feedback (`/reviews/`)
All 10 authentic, unedited testimonials:
1. Police Officer, Westchester County, NY (14-Sep-2020)
2. John Lyons, Bridgehampton, NY (23-June-2020)
3. Municipal Government Office, Bergen County, NJ (15-July-2018)
4. Donna Benvenides, Tarrytown, NY (15-May-2016)
5. Jay Samson, Princeton, NJ (06-Nov-2012)
6. Sarah Johnson, Manhattan, NY (09-March-2011)
7. Police Benevolent Association, North Jersey
8. Middle School Administrator, Pennsylvania
9. Chabad Rabbi, New York
10. Yeshiva Rabbi, Lakewood, NJ

### G. Educational Resources (`/what-is-emf-in-physics/`, `/how-to-use-an-emf-meter/`, etc.)
- What is EMF in physics?
- Why consumer meters (Trifield, etc.) fail and trigger false panic.
- 10 household items that produce electromagnetic waves.
- Truth about weekend "EMF consultant" certificates.
- Physics of room shielding and single-point grounding.

### H. Contact & Support (`/contact/`)
- Direct Phone Lines:
  - **NYC, CT, Hudson Valley, Long Island**: `(347) 491-9867`
  - **NJ, PA, DE, Delaware Valley**: `(973) 726-9559`
- Email: `EMFmedicalExpert@gmail.com`
- Operating Hours: Monday – Sunday, 8:00 AM – 5:00 PM EST.
- Fully validated consultation request form with support categories:
  - Technical Commercial Industrial
  - Government Local State Federal
  - Health Safety Clinical
  - Legal contractual buyer/seller/agent
  - Other legal / in tort
  - Harassment / threat
  - Private confidential Agents/Trustee

---

## 🛠️ Tech Stack & Architecture

- **Framework**: React 19 + Vite 8
- **Styling**: Tailwind CSS v4 + Glassmorphism Design System
- **Icons**: Lucide React
- **Typography**: Plus Jakarta Sans & Outfit
- **Data Engine**: Centralized structured content store (`src/data/electraData.js` and `src/data/allPagesFull.js`)
- **Asset Pipeline**: 36+ locally downloaded original images and logos stored in `public/assets/`

---

## 🚀 Running the Project

```bash
# Install dependencies
npm install

# Start Vite development server
npm run dev
# Server runs at http://localhost:5173/

# Create optimized production build
npm run build
```

# Electraemf_health-
# Electraemf_health-
