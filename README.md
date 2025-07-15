# 🛒 E-Commerce Website

A modern, responsive e-commerce web application built with **Next.js**, **TypeScript**, **Tailwind CSS**, **Zustand**, and **ShadCN UI**. This project demonstrates best practices in frontend development with clean architecture, reusable components, and seamless UI/UX design.

![Next.js](https://img.shields.io/badge/Next.js-15.x-000000.svg?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6.svg?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC.svg?style=flat-square&logo=tailwind-css)
![ShadCN UI](https://img.shields.io/badge/ShadCN_UI-111827?style=for-the-badge)
![Zustand](https://img.shields.io/badge/Zustand-000000?style=for-the-badge&logo=Zustand&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-8.x-4B32C3.svg?style=flat-square&logo=eslint)
![Prettier](https://img.shields.io/badge/Prettier-3.x-F7B93E.svg?style=flat-square&logo=prettier)
![Husky](https://img.shields.io/badge/Husky-8.x-000000.svg?style=flat-square)
![Lint-Staged](https://img.shields.io/badge/Lint--Staged-13.x-000000.svg?style=flat-square)
![Vercel](https://img.shields.io/badge/Vercel-Deploy-000000.svg?style=flat-square&logo=vercel)
![License](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)


---

## 📚 Table of Contents

- [📦 Tech Stack](#-tech-stack)
- [✨ Features](#-features)
- [🧱 Folder Structure](#-folder-structure)
- [🚀 Getting Started](#-getting-started)
- [🏗️ Detailed Project Structure](#-detailed-project-structure)
- [🚀 Live Demo](#-live-demo)
- [📄 License](#-license)
- [👤 Author](#-author)

---

## 📦 Tech Stack

- **Framework**: [Next.js (App Router)](https://nextjs.org/docs/app)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Library**: [ShadCN UI](https://ui.shadcn.com/)
- **Icons**: [Lucide Icons](https://lucide.dev/)
- **Forms**: [React Hook Form](https://react-hook-form.com/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)

---

## ✨ Features

- ⚡️ Fast and optimized with Next.js App Router  
- 💡 Type-safe components with TypeScript  
- 💅 Beautiful, responsive design with Tailwind CSS  
- 🧩 Reusable UI components from ShadCN  
- 🔍 Product listing, filtering, and detailed views  
- 🛍️ Shopping cart (add/remove items)  
- 📦 Modular structure for scalability  

---


## 🧱 Folder Structure

```
.
├── app/ # Application routes, layout, pages (App Router)
├── components/ # Reusable UI components
├── lib/ # Utilities and helpers
├── hooks/ # Custom React hooks (e.g., useCart)
├── types/ # TypeScript types and interfaces
├── public/ # Static files (images, icons)
├── styles/ # Global styles and Tailwind setup
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 18  
- pnpm (preferred), npm, yarn, or bun  
- (Optional) Stripe key or mock payment setup  

### Installation

```bash
git clone https://github.com/DakshSitapara/e-commerce-website.git
cd e-commerce-website
pnpm install
# or
npm install
# or
yarn install
# or
bun install
```

### Development

```bash
pnpm dev
# or
npm run dev
# or
yarn dev
# or
bun dev
```

---

## 🏗️ Detailed Project Structure

```
.
├── public/             # Static assets (images, icons, fonts)
├── app/                # App Router routes and layout
│   ├── page.tsx        # Home page
│   ├── products/       # Product listing and details
│   ├── cart/           # Shopping cart page
│   └── checkout/       # Checkout process
├── components/         # UI components (Navbar, ProductCard, etc.)
├── hooks/              # Custom React hooks
├── lib/                # Utilities (API, formatters)
├── styles/             # Tailwind and global styles
├── types/              # Custom TypeScript types
├── tailwind.config.ts  # Tailwind configuration
├── tsconfig.json       # TypeScript configuration
└── package.json        # Project metadata and scripts
```

---

## 🚀 Live Demo

[View Live Site](https://e-commerce-website-theta-rust.vercel.app/)

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

## 👤 Author

**Daksh Sitapara**  
- GitHub: [@DakshSitapara](https://github.com/DakshSitapara)  
- LinkedIn: [Daksh Sitapara](www.linkedin.com/in/daksh-sitapara-02b06b288)

---

> Built with using Next.js, TypeScript, Tailwind CSS, and ShadCN UI.
