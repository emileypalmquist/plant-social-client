# Plant Social Client

Plant Social Client is a React application that allows users to share their plants, plant care notes, like other users' plants and care notes, and comment on other users' plants. Additionally, users can explore different plant species in the database and view the most liked care notes for those species.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [Dependencies](#dependencies)
- [Scripts](#scripts)
- [Contributing](#contributing)
- [License](#license)
- [Backend Repository](#backend-repository)

## Installation

To get started with Plant Social Client, follow these steps:

1. Clone the repository:

   ```shell
   git clone https://github.com/yourusername/plant-social-client.git
   ```

2. Change into the project directory:

   ```shell
   cd plant-social-client
   ```

3. Install the necessary dependencies:

   ```shell
   npm install
   ```

## Usage

Once you have installed the dependencies, you can start the development server:

```shell
npm start
```

This will launch the Plant Social Client application on `http://localhost:3001` in your web browser.

## Environment Variables

Before running the application, make sure to create an `.env` file in the root directory of the project and define the following environment variables:

- `REACT_APP_BACKEND_BASE_URL`: The base URL of your backend server, which should be set to the server's URL. In this case, it should be set to the URL of the Plant Social Server backend (e.g., `https://yourbackendurl.com/api/v1`).

- `REACT_APP_BACKEND_IMAGE_BASE_URL`: The base URL for serving images from the backend. This should also be set to the URL of your backend server's image storage or API (e.g., `https://yourbackendurl.com`).

Here is an example of the `.env` file:

```env
REACT_APP_BACKEND_BASE_URL=https://yourbackendurl.com/api/v1
REACT_APP_BACKEND_IMAGE_BASE_URL=https://yourbackendurl.com
```

Make sure to replace `https://yourbackendurl.com` with the actual URLs of your backend server and image storage.

## Dependencies

Plant Social Client relies on the following packages and libraries:

- [animated-burgers/burger-squeeze](https://www.npmjs.com/package/@animated-burgers/burger-squeeze) - A package for animated burger menu icons.
- [testing-library/jest-dom](https://www.npmjs.com/package/@testing-library/jest-dom) - Jest matchers for DOM elements.
- [testing-library/react](https://www.npmjs.com/package/@testing-library/react) - Utilities for testing React components.
- [testing-library/user-event](https://www.npmjs.com/package/@testing-library/user-event) - User event simulation library for testing.
- [animate.css](https://www.npmjs.com/package/animate.css) - A cross-browser library of CSS animations.
- [classnames](https://www.npmjs.com/package/classnames) - A utility for conditionally joining class names together.
- [react](https://www.npmjs.com/package/react) - The core library for building user interfaces in React.
- [react-dom](https://www.npmjs.com/package/react-dom) - ReactDOM for rendering React components.
- [react-redux](https://www.npmjs.com/package/react-redux) - Official React bindings for Redux.
- [react-router-dom](https://www.npmjs.com/package/react-router-dom) - Declarative routing for React.
- [react-scripts](https://www.npmjs.com/package/react-scripts) - Configuration and scripts for Create React App.
- [redux](https://www.npmjs.com/package/redux) - A predictable state container for JavaScript apps.
- [redux-thunk](https://www.npmjs.com/package/redux-thunk) - Thunk middleware for Redux.
- [semantic-ui-css](https://www.npmjs.com/package/semantic-ui-css) - CSS files for Semantic UI.
- [semantic-ui-react](https://www.npmjs.com/package/semantic-ui-react) - Official Semantic UI integration for React.
- [web-vitals](https://www.npmjs.com/package/web-vitals) - A library for measuring web performance.

All dependencies are listed in the `package.json` file.

## Scripts

Plant Social Client comes with several scripts that can be executed using npm:

- `start`: Starts the development server on `http://localhost:3001`.
- `build`: Builds the production-ready version of the app.

To run a script, use the following command:

```shell
npm run <script-name>
```

## Contributing

If you would like to contribute to Plant Social Client, please open an issue or create a pull request on the [GitHub repository](https://github.com/emileypalmquist/plant-social-client).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Backend Repository

The backend server for this application is located in its [GitHub repository](https://github.com/emileypalmquist/plant-social-server). You can find more information about the backend server, its setup, and how it interacts with the Plant Social Client frontend in that repository.
