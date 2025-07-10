# Contributing to AgdayoUI

First off, thank you for considering contributing to AgdayoUI! It's people like you that make open source such a great community.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18 or higher)
- [npm](https://www.npmjs.com/)

### Setting Up the Development Environment

1.  **Fork the repository** on GitHub.
2.  **Clone your fork** locally:

    ```bash
    git clone https://github.com/your-username/agdayoUI.git
    cd agdayoUI
    ```

3.  **Install dependencies**:

    ```bash
    npm install
    ```

4.  **Run the development server**:

    ```bash
    npm run dev
    ```

    The application should now be running on [http://localhost:4321](http://localhost:4321).

## How to Contribute

We welcome contributions in various forms, including:

-   Reporting bugs
-   Suggesting new features
-   Improving documentation
-   Submitting pull requests with code changes

### Reporting Bugs

If you find a bug, please open an issue on GitHub and provide the following information:

-   A clear and descriptive title.
-   A detailed description of the bug, including steps to reproduce it.
-   Information about your environment (e.g., browser, operating system).

### Submitting Pull Requests

1.  Create a new branch for your changes:

    ```bash
    git checkout -b feature/your-feature-name
    ```

2.  Make your changes and commit them with a clear and descriptive commit message.

3.  Push your changes to your fork:

    ```bash
    git push origin feature/your-feature-name
    ```

4.  Open a pull request on the original repository and provide a detailed description of your changes.

## Running Tests

We use Vitest for testing. To run the tests, use the following command:

```bash
npx vitest
```

Please make sure that all tests are passing before submitting a pull request. If you are adding a new feature, please also add tests for it.

> **Note**: You can also add a `test` script to your `package.json` for convenience:
> ```json
> "scripts": {
>   "test": "vitest"
> }
> ```
> Then you can run tests with `npm test`.

## Questions?

If you have any questions, feel free to open an issue on GitHub.
