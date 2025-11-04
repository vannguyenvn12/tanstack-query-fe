# React Query Course - Base Project

This is a clean React + TypeScript project built with Vite, designed as a starting codebase for a React Query course on Udemy.

## 🎯 Project Purpose

This project serves as the foundation for learning React Query (TanStack Query). It includes:

- A mock data layer with fake API calls
- Simple routing with React Router
- Product catalog functionality
- Form handling for adding products
- **No React Query integration yet** - this will be added during the course lessons

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Layout.tsx      # Main layout wrapper
│   ├── Navbar.tsx      # Navigation component
│   ├── ProductItem.tsx # Individual product card
│   └── ProductList.tsx # Product grid component
├── pages/              # Page components
│   ├── HomePage.tsx    # Product catalog page
│   ├── ProductDetailPage.tsx # Product details
│   └── AddProductPage.tsx    # Add new product form
├── data/               # Mock data
│   └── products.ts     # Sample product data
├── router/             # Routing configuration
│   └── index.tsx       # React Router setup
├── types/              # TypeScript type definitions
│   └── product.ts      # Product interface
├── utils/              # Utility functions
│   └── fakeApi.ts      # Mock API functions
├── App.tsx             # Main app component
└── main.tsx            # Application entry point
```

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

## 🛠 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Features

### Current Features (Pre-React Query)

- **Product Catalog**: Browse a list of products with images, prices, and descriptions
- **Product Details**: View detailed information about individual products
- **Add Products**: Form to add new products to the catalog
- **Responsive Design**: Mobile-friendly layout with TailwindCSS
- **TypeScript**: Full type safety throughout the application
- **Mock API**: Simulated API calls with realistic delays

### Routes

- `/` - Home page (product catalog)
- `/products/:id` - Product detail page
- `/add` - Add new product page

## 🔧 Technical Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router v6** - Client-side routing
- **TailwindCSS** - Utility-first CSS framework
- **ESLint** - Code linting

## 📚 Course Learning Path

This base project will be enhanced throughout the course with:

1. **React Query Setup** - Installing and configuring TanStack Query
2. **Data Fetching** - Replacing mock API calls with React Query
3. **Caching** - Understanding query caching and stale data
4. **Mutations** - Adding, updating, and deleting products
5. **Optimistic Updates** - Improving user experience
6. **Error Handling** - Proper error states and retry logic
7. **Advanced Features** - Infinite queries, prefetching, and more

## 🎯 Learning Objectives

By the end of the course, you'll understand:

- How to replace traditional data fetching with React Query
- Query caching and invalidation strategies
- Mutation patterns and optimistic updates
- Error handling and loading states
- Performance optimization techniques
- Real-world React Query patterns

## 📝 Notes

- This project uses mock data and simulated API delays
- No backend server is required
- All data is stored in memory and resets on page refresh
- The focus is on learning React Query patterns, not backend integration

---

**Ready to start learning React Query? Let's begin! 🚀**
