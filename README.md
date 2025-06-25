# ☕ Espresso Emporium

A modern coffee shop web application built with React and Vite, offering a seamless coffee ordering and management experience.

## 🌐 Live Demo

**[Visit Espresso Emporium](https://espresso-emporium-3e4c2.web.app)** ☕

## ✨ Features

- 🛍️ **Product Catalog** - Browse through our extensive coffee collection
- ➕ **Add New Coffee** - Easily add new coffee varieties to the inventory
- ✏️ **Update Coffee** - Modify existing coffee details and information
- 🗑️ **Delete Coffee** - Remove coffee items from the catalog
- 👤 **User Management** - Handle user registration and authentication
- 📱 **Responsive Design** - Optimized for all device sizes
- 🎨 **Modern UI/UX** - Clean and intuitive user interface

## 🛠️ Tech Stack

### Frontend

- ⚛️ **React** - Component-based UI library
- ⚡ **Vite** - Fast build tool and development server
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 🔥 **Firebase** - Hosting and deployment

### Backend

- 🟢 **Node.js** - Runtime environment
- 🚀 **Express.js** - Web application framework
- 🍃 **MongoDB** - NoSQL database

## 📦 Installation & Setup

### Prerequisites

- 📋 Node.js (v14 or higher)
- 📦 npm or yarn
- 🍃 MongoDB account

### Client Setup

```bash
# Clone the repository
git clone <repository-url>

# Navigate to client directory
cd "Espresso Emporium/Client"

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Server Setup

```bash
# Navigate to server directory
cd "Espresso Emporium/Server"

# Install dependencies
npm install

# Set up environment variables
# Create .env file with:
# MONGODB_URI=your_mongodb_connection_string
# PORT=5000

# Start the server
npm start
```

## 🔧 Development Scripts

- `npm run dev` - Start development server with HMR
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint for code quality

## 📁 Project Structure

```
Espresso Emporium/
├── Client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Application pages
│   │   ├── assets/         # Static assets
│   │   └── utils/          # Utility functions
│   └── public/             # Public assets
└── Server/                 # Backend API
    ├── models/             # Database models
    ├── routes/             # API routes
    └── middleware/         # Custom middleware
```

## 🚀 Deployment

The application is deployed using Firebase Hosting. To deploy:

```bash
# Build the project
npm run build

# Deploy to Firebase
firebase deploy
```

## 🤝 Contributing

1. 🍴 Fork the repository
2. 🌿 Create a feature branch (`git checkout -b feature/amazing-feature`)
3. 💾 Commit your changes (`git commit -m 'Add amazing feature'`)
4. 📤 Push to the branch (`git push origin feature/amazing-feature`)
5. 🔄 Open a Pull Request

Created with ❤️ by **Abir**

---

⭐ **Don't forget to star this repository if you found it helpful!** ⭐
