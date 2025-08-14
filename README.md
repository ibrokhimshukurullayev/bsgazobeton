# BSGazabeton - Building Materials E-commerce Platform

A modern, responsive e-commerce web application for building materials and construction supplies, built with Next.js 15 and TypeScript.

## 🏗️ Project Overview

BSGazabeton is a comprehensive e-commerce platform designed for the construction industry, providing users with an intuitive interface to browse, compare, and purchase building materials. The platform features a modern design with multi-language support, responsive layouts, and optimized performance.

## ✨ Features

- **🛍️ E-commerce Functionality**: Product catalog, shopping cart, and checkout system
- **🌐 Multi-language Support**: Internationalization (i18n) with i18next
- **📱 Responsive Design**: Mobile-first approach with modern UI components
- **🔍 Advanced Search**: Product filtering and comparison tools
- **👤 User Management**: User registration, login, and profile management
- **📊 Admin Panel**: Comprehensive admin interface for product and order management
- **🎨 Modern UI**: Built with React components and SASS styling
- **⚡ Performance**: Optimized with Next.js 15 and Turbopack

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **UI Library**: React 19
- **Styling**: SASS
- **State Management**: Redux Toolkit
- **Icons**: Lucide React, React Icons
- **Internationalization**: i18next, react-i18next
- **UI Components**: Custom components with modern design

### Development Tools
- **Package Manager**: npm
- **Linting**: ESLint
- **Build Tool**: Turbopack (Next.js 15)

### Deployment
- **Containerization**: Docker
- **CI/CD**: GitHub Actions
- **Registry**: GitHub Container Registry (GHCR)
- **Server**: SSH-based deployment

## 🚀 Getting Started

### Prerequisites
- Node.js 20 or higher
- npm or yarn package manager

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/bsgazabeton.git
   cd bsgazabeton
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint for code quality

## 🐳 Docker Deployment

### Build and Run with Docker

```bash
# Build the Docker image
docker build -t bsgazabeton .

# Run the container
docker run -p 3000:3000 --name bsgazabeton-app bsgazabeton

# Stop and remove the container
docker stop bsgazabeton-app
docker rm bsgazabeton-app
```

### Docker Features
- Multi-stage build for optimized production images
- Alpine Linux base for minimal image size
- Non-root user execution for security
- Health check endpoint at `/api/health`

## 🔄 CI/CD Pipeline

The project includes automated CI/CD using GitHub Actions:

- **Automatic Build**: Builds Docker image on every push to master
- **Container Registry**: Pushes to GitHub Container Registry (GHCR)
- **Auto-deployment**: Deploys to server via SSH
- **Health Monitoring**: Built-in health checks for container status

### Required Secrets
- `SERVER_IP` - Target server IP address
- `SERVER_USERNAME` - SSH username
- `SSH_PRIVATE_KEY` - SSH private key for server access

## 📁 Project Structure

```
bsgazabeton/
├── src/
│   ├── app/                 # Next.js App Router pages
│   ├── components/          # Reusable React components
│   ├── context/            # React context providers
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions and libraries
│   ├── assets/             # Static assets (images, icons)
│   └── static/             # Static files
├── public/                 # Public assets
├── .github/                # GitHub Actions workflows
├── Dockerfile              # Docker configuration
├── .dockerignore           # Docker build exclusions
├── next.config.mjs         # Next.js configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies and scripts
```

## 🌍 Environment Configuration

The application supports various environment configurations:

- **Development**: Local development with hot reload
- **Production**: Optimized build with Docker deployment
- **Multi-language**: Configurable language settings
- **Image Domains**: Configurable external image sources

## 📱 Responsive Design

The application is built with a mobile-first approach:
- Responsive layouts for all screen sizes
- Touch-friendly interface elements
- Optimized performance on mobile devices
- Progressive Web App (PWA) ready

## 🔒 Security Features

- Non-root Docker container execution
- Environment variable protection
- Secure authentication system
- Input validation and sanitization

## 📊 Performance Optimization

- Next.js 15 with App Router
- Turbopack for fast development builds
- Optimized image loading and caching
- Code splitting and lazy loading
- Static generation where possible

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary. All rights reserved.

## 🆘 Support

For support and questions:
- Create an issue in the GitHub repository
- Contact the development team
- Check the project documentation

---

**Built with ❤️ using Next.js 15, React 19, and modern web technologies**
