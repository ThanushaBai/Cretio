🚀 Cretio – Project Management & Funnel Builder



Cretio is a full-featured B2B SaaS platform built with Next.js, TypeScript, Node.js, and MongoDB.
It helps agencies and businesses manage clients, tasks, workflows, websites, funnels, and billing in one seamless dashboard.

✨ Features

📊 Project Management – Task boards, Kanban workflow, and productivity tools

🌐 Website & Funnel Builder – Build and customize websites & funnels

🧑‍🤝‍🧑 CRM System – Manage leads, clients, and relationships

💳 Billing System – Integrated PayPal subscriptions and add-ons

🛠 Admin Portal – Role-based access and user management

🌗 Accessibility – Light/Dark mode & color blindness support

📈 Dashboards & Analytics – Funnel performance, client & agency insights

📂 Media Library – Upload, store, and manage files & assets

🛠 Tech Stack

Frontend: Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui

Backend: Node.js, Prisma ORM, MongoDB

Authentication: JWT

Payments: PayPal

Other: Notifications, role-based access control, analytics

📂 Project Structure
cretio/
│── app/              # Next.js App Router pages & layouts
│── components/       # Reusable UI components (shadcn/ui + custom)
│── lib/              # Helpers & utilities
│── prisma/           # Prisma schema & migrations
│── public/           # Static assets
│── styles/           # Global styles
│── .env.example      # Environment variables template
│── package.json      # Dependencies & scripts

🚀 Getting Started
1️⃣ Clone the Repository
git clone https://github.com/your-username/cretio.git
cd cretio

2️⃣ Install Dependencies
npm install
# or
yarn install
# or
bun install

3️⃣ Set Up Environment Variables

Create a .env file in the root directory:

MONGODB_URI=
JWT_SECRET=

# PayPal Configuration
PAYPAL_CLIENT_ID=
PAYPAL_CLIENT_SECRET=
PAYPAL_API_URL=
NEXT_PUBLIC_PAYPAL_CLIENT_ID=
PAYPAL_WEBHOOK_ID=

# Application URLs
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_URL=

4️⃣ Run the Application
npm run dev
# or
yarn dev
# or
bun dev


The app will be available at: http://localhost:3000

📸 Screenshots (Optional)

Add screenshots here to showcase dashboards, funnels, and project boards.

🛣 Roadmap

✅ Core project management system

✅ CRM & PayPal billing

⬜ AI-powered task & workflow suggestions

⬜ Advanced funnel analytics & reports

⬜ Mobile app version (React Native / Expo)

🤝 Contributing

Contributions, issues, and feature requests are welcome!

Fork the repo

Create your feature branch (git checkout -b feature/your-feature)

Commit your changes (git commit -m "Add new feature")

Push to the branch (git push origin feature/your-feature)

Open a Pull Request 🎉

Built with ❤️ using Next.js, TypeScript, Node.js, MongoDB, Prisma, Tailwind CSS, shadcn/ui, and PayPal.
