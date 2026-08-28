# SimpleStore CI/CD

SimpleStore is a full-stack e-commerce application built with React, TypeScript, Redux Toolkit, React Query, and Firebase. The project includes a complete Continuous Integration and Continuous Deployment (CI/CD) pipeline using GitHub Actions and Vercel to automatically test, build, and deploy the application.

## Live Application

**Live Demo:** https://simplestore-cicd.vercel.app/

## GitHub Repository

https://github.com/shadowless005/simplestore-cicd

## Features

- User registration and login with Firebase Authentication
- User profile management (Create, Read, Update, Delete)
- Browse products from Firestore
- Search products
- Filter products by category
- Add new products
- Edit existing products
- Delete products
- Shopping cart with quantity management
- Secure checkout
- Store orders in Firestore
- View order history
- View order details
- Responsive design

## Testing

The project follows Test-Driven Development (TDD) principles using React Testing Library and Vitest.

### Unit Tests

- Footer component renders correctly.
- Navbar correctly displays the cart item count.

### Integration Test

- Verifies that adding a product updates the shopping cart state and user interface correctly.

## Continuous Integration (CI)

GitHub Actions automatically:

- Installs project dependencies
- Runs all unit and integration tests
- Builds the production application
- Prevents deployment if any step fails

## Continuous Deployment (CD)

After all tests and the production build pass successfully, GitHub Actions automatically deploys the application to Vercel.

## Technologies Used

- React
- TypeScript
- Redux Toolkit
- React Query
- React Router
- Firebase Authentication
- Firebase Firestore
- Vitest
- React Testing Library
- GitHub Actions
- Vercel
- CSS

## Installation

Clone the repository:

```bash
git clone https://github.com/shadowless005/simplestore-cicd.git
```

Install dependencies:

```bash
npm install
```

Run the application:

```bash
npm run dev
```

Run the test suite:

```bash
npm test
```

## Author

Matthew Shin

Coding Temple Software Engineering Bootcamp
