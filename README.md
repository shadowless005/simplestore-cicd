# SimpleStore CI/CD

SimpleStore is an e-commerce application built with React, TypeScript, Redux Toolkit, React Query, and Firebase. This project adds automated testing with Jest and a GitHub Actions pipeline that tests, builds, and deploys the application to Vercel.

## Live Application

[Open SimpleStore](https://simplestore-cicd.vercel.app/)

## GitHub Repository

https://github.com/shadowless005/simplestore-cicd

## Features

- User registration, login, and logout with Firebase Authentication
- User profile management
- Product browsing, searching, and category filtering
- Create, edit, and delete products stored in Firestore
- Shopping cart with quantity controls and product removal
- Cart totals that update when items change
- Cart persistence using sessionStorage
- Demonstration checkout that saves orders in Firestore
- Order history and individual order details
- Responsive design

Checkout demonstrates order storage and does not process real payments.

## Technologies Used

- React
- TypeScript
- Vite
- React Router
- Redux Toolkit
- React Query
- Firebase Authentication
- Cloud Firestore
- Jest
- React Testing Library
- Testing Library user-event
- GitHub Actions
- Vercel
- CSS

## Getting Started

### Prerequisites

- Node.js 24
- npm
- A configured Firebase project with Email/Password Authentication and Firestore enabled

### Installation

Clone the repository and enter the project folder:

```bash
git clone https://github.com/shadowless005/simplestore-cicd.git
cd simplestore-cicd
```

Install dependencies using the lockfile:

```bash
npm ci
```

Start the development server:

```bash
npm run dev
```

Open the Local URL displayed in the terminal.

### Firebase Configuration

Firebase initialization is located in `src/firebaseConfig.ts`.

To use your own Firebase project:

1. Register a web application in the Firebase console.
2. Update the Firebase web configuration in `src/firebaseConfig.ts`.
3. Enable Email/Password Authentication.
4. Create a Firestore database.
5. Configure Firestore security rules for products, user profiles, and orders.
6. Add products through the application.

The application uses the `users`, `products`, and `orders` collections. Firestore rules must enforce access permissions; frontend route protection alone does not secure database records.

## Testing

The project uses Jest and React Testing Library. Firebase dependencies are mocked in relevant tests so they do not require a live Firebase connection.

### Unit Tests

- **Footer.test.tsx:** Verifies that the SimpleStore branding and shopping description render.
- **Navbar.test.tsx:** Renders the Navbar with controlled Redux state and verifies the cart quantity.

### Integration Test

**Cart.integration.test.tsx** renders ProductCard, Navbar, and Cart with a shared Redux store.

It simulates user interactions to verify:

- Adding a product through the Add to Cart button
- Displaying the product in the cart
- Updating the Navbar cart count
- Increasing and decreasing quantities
- Updating totals and sessionStorage
- Removing the product and displaying the empty cart

### Run Tests

```bash
npm test
```

Run tests in watch mode:

```bash
npm run test:watch
```

Generate a coverage report:

```bash
npm run coverage
```

## Build and Lint

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

Run ESLint:

```bash
npm run lint
```

## Continuous Integration

The workflow is defined in `.github/workflows/main.yml` and runs automatically when code is pushed to `main`.

The `build-and-test` job:

1. Checks out the repository.
2. Sets up Node.js 24.
3. Installs dependencies.
4. Runs the Jest tests.
5. Builds the production application.

If the tests or build fail, the job fails.

## Continuous Deployment

The `deploy` job uses `needs: build-and-test`, so this workflow deploys only after the testing and build job succeeds.

It uses the Vercel CLI to:

1. Pull the production project configuration.
2. Build the Vercel production artifact.
3. Deploy the prebuilt artifact.

The following GitHub Actions repository secrets are required:

- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`
- `VERCEL_TOKEN`

Secret values should never be committed to the repository.

## Manual Verification

Before presenting or submitting:

- Confirm the latest GitHub Actions test/build and deployment jobs succeeded.
- Open the live Vercel application.
- Verify products load from Firestore.
- Add a product to the cart, change its quantity, and remove it.
- Confirm Firebase account and order features work with the deployed configuration.

Automated tests cover selected behavior. Live Firebase permissions and deployment configuration also require verification.

## Author

Matthew Shin  
Coding Temple Software Engineering Bootcamp
