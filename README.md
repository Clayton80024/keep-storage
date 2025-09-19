# KeepStorage - Cloud Storage Management App

A modern, responsive cloud storage management application built with Next.js 15, React 19, and Tailwind CSS. KeepStorage provides an intuitive interface for managing files and folders with a clean, mobile-first design.

## ✨ Features

- **📁 File Management**: Organize files and folders with intuitive drag-and-drop interface
- **🔍 Search**: Quick search functionality across all files
- **📱 Responsive Design**: Optimized for both desktop and mobile devices
- **🗑️ Trash Management**: Safe deletion with restore capabilities
- **🎨 Modern UI**: Beautiful gradients, animations, and glass-morphism effects
- **⚡ Fast Performance**: Built with Next.js 15 and Turbopack for lightning-fast development

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Frontend**: React 19 with TypeScript
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Build Tool**: Turbopack

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/keep-storage.git
cd keep-storage
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📱 Usage

- **Desktop**: Use the sidebar navigation and desktop-optimized interface
- **Mobile**: Tap the hamburger menu to access navigation, use the floating action button for quick actions
- **File Operations**: Click "New" to create files/folders, use search to find content quickly
- **Trash**: Access deleted files and restore or permanently delete them

## 🎨 Design Features

- **Responsive Layout**: Adapts seamlessly from mobile to desktop
- **Modern Animations**: Smooth transitions and hover effects
- **File Type Icons**: Visual file type recognition with color-coded icons
- **Glass-morphism**: Modern backdrop blur effects
- **Gradient Backgrounds**: Beautiful color schemes throughout the app

## 📁 Project Structure

```
app/
├── components/          # React components
│   ├── ActionMenu.tsx   # Create new files/folders modal
│   ├── FloatingActionButton.tsx  # Mobile quick action button
│   ├── MainContent.tsx  # Main file management interface
│   ├── MobileHeader.tsx # Mobile navigation header
│   ├── Sidebar.tsx      # Navigation sidebar
│   └── TrashContent.tsx # Trash management interface
├── globals.css          # Global styles
├── layout.tsx          # Root layout component
└── page.tsx            # Main page component
```

## 🚀 Deployment

### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/keep-storage)

### Other Deployment Options

- **Netlify**: Connect your GitHub repository for automatic deployments
- **Railway**: Deploy with zero configuration
- **AWS Amplify**: Full-stack deployment with backend integration

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Icons by [Lucide](https://lucide.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Fonts by [Geist](https://vercel.com/font)
