📝 Notoora — A Modern & Intuitive Note-Taking Application

Notoora is a clean, minimal, and fully responsive note-taking application designed to make organizing your thoughts effortless. Built with React + Vite, it delivers a smooth, fast, and delightful user experience with powerful productivity features.

👉 Live Demo:
https://notoora.netlify.app

✨ Features

Create, Edit & Delete Notes
Simple and intuitive UI to manage your notes without clutter.

Smart Tag Management
Add, edit, and delete tags to keep your notes organized.

Real-time Search & Filters
Filter notes instantly by keywords or tags.

Organized Note View
Notes display with tag badges, timestamps, and a clean design.

Local Storage Persistence
Your notes and tags are auto-saved — nothing gets lost on refresh.

Fully Responsive UI
Optimized for desktops, tablets, and mobile devices.

Blazing Fast
Powered by Vite for quick builds and fast loading.

🛠 Tech Stack

React 18

Vite

React Router

React Bootstrap

Local Storage API

📂 Folder Structure
notoora/
│
├── public/
│   └── _redirects
│
└── src/
    ├── components/
    ├── pages/
    ├── hooks/
    ├── context/
    ├── styles/
    ├── App.jsx
    └── main.jsx

🚀 Getting Started
1️⃣ Clone the repository
git clone https://github.com/your-username/notoora.git
cd notoora

2️⃣ Install dependencies
npm install

3️⃣ Start development server
npm run dev

4️⃣ Build for production
npm run build

🔧 Deployment Notes (Netlify)

To ensure client-side routing works (e.g., /about, /new), include:

File: public/_redirects

/*    /index.html   200


This prevents 404 errors on page refresh.

🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to fork the repo and open a pull request.

📄 License

This project is licensed under the MIT License — free for personal and commercial use.
