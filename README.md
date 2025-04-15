# Pet Farm Management Application

A modern React application for managing farms and their pets, built with React, Redux, and TypeScript.

## Features

- Manage farms with detailed information
- Track pets (dogs and cats) for each farm
- Calculate statistics about pets on each farm
- Form validation using React Hook Form
- Responsive design using Bootstrap

## Tech Stack

- **Frontend**: React 18, TypeScript
- **State Management**: Redux with Redux Toolkit
- **Routing**: React Router v6
- **Styling**: Bootstrap 5, SCSS
- **API Client**: Axios
- **Form Handling**: React Hook Form
- **Code Quality**: ESLint, Prettier

## Project Structure

```
src/
  ├── assets/            # Static assets (images, SVGs)
  ├── components/        # UI components
  │   ├── farms/         # Farm-related components
  │   ├── pets/          # Pet-related components
  │   └── ui/            # Shared UI components
  ├── hoc/               # Higher-order components
  ├── redux/             # Redux state management
  │   ├── data/          # Store configuration
  │   └── reducer/       # Redux slices
  └── share/             # Shared utilities and interfaces
      └── interfaces/    # TypeScript interfaces
```

## Getting Started

### Prerequisites

- Node.js (v16 or newer)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd react-redux-petfarm
```

2. Install dependencies
```bash
npm install
# or
yarn
```

3. Start the development server
```bash
npm start
# or
yarn start
```

4. Open your browser and navigate to `http://localhost:3000`

## Available Scripts

- `npm start` - Starts the development server
- `npm build` - Builds the app for production
- `npm test` - Runs tests
- `npm lint` - Runs ESLint to check code quality
- `npm lint:fix` - Fixes ESLint issues
- `npm format` - Formats code using Prettier

## Best Practices Implemented

- Functional components with React hooks
- Typed Redux with slices using Redux Toolkit
- Modular and reusable component structure
- Proper error handling with HOCs
- Environment-based configuration
- Strong TypeScript typing throughout the application
- Code splitting for improved performance
- Consistent code style with ESLint and Prettier
