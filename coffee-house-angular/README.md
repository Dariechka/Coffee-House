# Coffee-House: Creative Extension

## Technology stack used

The project uses the following technologies:

#### Core stack:

- Angular `v20.x`
- TypeScript
- RxJS
- SCSS
- Angular CDK
- coffee-shop-be backend

#### For developing:

- Husky with lint-staged and commitlint
- Prettier
- Eslint
- Stylelint

#### For deploy:

- Frontend: Firebase
- Backend: Cloud Run

#### Additional Project Features

- **Angular Reactive Forms** with custom validation functions
- **Angular route configuration** with lazy-loaded components
- **ViewportScroller** for anchor links
- **Icon component** with an SVG sprite
- **Not Found page**
- **Angular Signals** as the primary reactive primitive for local and component-level state management
- **HttpClient** for fetching backend data
- **rxResource** for managing loading, error, and success states of responses
- **API service** for backend requests and **Local Storage service** for calculating and storing data in localStorage
- **Custom Pipe** for value transformations
- **Custom Error Component** for form validation messages
- **Logout functionality**
- **Cart item controls** for incrementing and decrementing quantities
- **BehaviorSubjects** for managing `isLogged` and `price` data, with automatic price recalculation
- **Endpoint** for fetching order history for logged-in users and displaying it on the **Orders page**
