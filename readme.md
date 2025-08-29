Chatty – Real-Time Chat Application 💬

Chatty is a real-time chat application built using the MERN stack (MongoDB, Express, React, Node.js), Socket.io, TailwindCSS, and DaisyUI. It offers smooth, instant messaging with real-time updates, user authentication, and a sleek, responsive design. Whether you want to chat with friends or collaborate with colleagues, Chatty makes communication seamless and enjoyable. 🚀

✨ Features

🔐 Authentication & Authorization with JWT – Secure login and registration using JSON Web Tokens (JWT).

⚡ Real-Time Messaging with Socket.io – Chat with friends in real-time, with instant message updates.

🟢 Online User Status – See who’s online and ready to chat.

🌍 Global State Management with Zustand – Efficient state handling across the application.

⚠️ Error Handling – Comprehensive error handling on both server and client to ensure reliability.

📱 Responsive UI – Clean, user-friendly interface designed with TailwindCSS and DaisyUI components.

🛠️ Tech Stack
Layer	Technology
Frontend	React, TailwindCSS, DaisyUI
Backend	Node.js, Express, Socket.io
Database	MongoDB
State Mgmt	Zustand
Auth	JWT
Real-Time	Socket.io
📂 Project Structure
Chatty/
│── client/           # React + TailwindCSS frontend
│── server/           # Node.js + Express backend
│── .env              # Environment variables (not committed)
│── README.md         # Project documentation

🚀 Getting Started

Follow these steps to set up and run the project locally.

1️⃣ Clone the Repository
git clone https://github.com/yourusername/Chatty.git
cd Chatty

2️⃣ Install Dependencies
Frontend:
cd client
npm install

Backend:
cd ../server
npm install

3️⃣ Set Up Environment Variables

In the server/ folder, create a .env file and configure the following:

JWT_SECRET=your_jwt_secret_key
MONGO_URI=your_mongo_connection_uri
PORT=5000

4️⃣ Run the Application

Start the backend:

cd server
npm run dev


Start the frontend:

cd ../client
npm start


Visit the app at 👉 http://localhost:3000

🧪 How It Works

🔐 Authentication & Authorization: Users can register, log in, and access protected routes with JWT authentication. Secure login ensures safe access to the chat platform.

⚡ Real-Time Messaging: Socket.io powers real-time communication. Messages are instantly sent and received across all connected users in a chat room, without the need for refreshing.

🟢 Online User Status: See a real-time status of online users. When users come online or leave, the status is updated instantly, keeping the chat environment interactive.

🌍 State Management with Zustand: Zustand handles global state management across the app, enabling seamless data sharing between components while keeping the app lightweight.

📈 Roadmap

🔔 Push Notifications: Get notified of new messages in real-time, even when you're not on the page.

💬 Message History: View and search past messages for reference.

👥 Group Chats: Enable multiple users to chat together in shared rooms.

🙂 Emoji Reactions: Add emoji support for messages and reactions.

🌙 Dark Mode: Implement a dark theme for night-time usage or a more flexible user experience.

🤝 Contributing

We welcome contributions! 🎉

To contribute to the project:

Fork the repo

Create a feature branch:

git checkout -b feature-name


Commit your changes:

git commit -m "Add feature"


Push to your branch:

git push origin feature-name


Open a Pull Request 🚀

👨‍💻 Author

🌐 Portfolio: sahil-gawade.netlify.app

💼 LinkedIn: linkedin.com/in/sahil-gawade-920a0a242

📌 GitHub: Sahil-2005

📜 License

This project is licensed under the MIT License – feel free to use and modify it for your own projects.

💬 Acknowledgments

This project was inspired by a tutorial video on building a MERN-based chat application: Watch the video here: https://www.youtube.com/watch?v=ntKkVrQqBYY
.

If you found this project helpful, don’t forget to ⭐ star the repository! Your support motivates us to continue improving the app. 🚀