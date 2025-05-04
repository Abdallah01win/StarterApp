# Vue.js Starter Kit (StarterApp)

[![Vue.js](https://img.shields.io/badge/Vue.js-4FC08D?style=flat-square&logo=vue.js&logoColor=white)](https://vuejs.org/) [![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/) [![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript) [![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen?style=flat-square)](https://example.com/your-ci-cd-link) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

## Overview

StarterApp is a comprehensive Vue.js 3 starter kit designed to significantly accelerate the development of modern SaaS (Software as a Service) and PaaS (Platform as a Service) applications. It provides a robust foundation with essential features out-of-the-box, removing redundant boilerplate code while maintaining flexibility for customization.

The primary goal is to let developers focus on building unique application features rather than spending time on initial setup and configuration of common functionalities like authentication, API handling, and UI components.

Built on top of the elegant [Shadcn/vue](https://www.shadcn-vue.com/) component library and leveraging the power of [Tailwind CSS](https://tailwindcss.com/), this starter kit offers a modern, responsive UI foundation that is both beautiful and easy to work with.

## Key Features

*   **Modern UI & Styling:** Built with [Shadcn/vue](https://www.shadcn-vue.com/) and [Tailwind CSS v4](https://tailwindcss.com/blog/tailwindcss-v4-alpha) for a highly customizable and utility-first styling approach. Includes dark mode support via Shadcn.
*   **Authentication:** Provides a structured for integrating API authentication logic vie barer-tokens and cookies.
*   **API Integration:** Full [Axios](https://axios-http.com/) configuration for making HTTP requests out of the box.
*   **Internationalization (i18n):** Setup with [Vue I18n](https://vue-i18n.intlify.dev/) for multi-language support.
*   **State Management:** Uses [Pinia](https://pinia.vuejs.org/) for easy and scalable state management.
*   **Routing:** Pre-configured [Vue Router](https://router.vuejs.org/) with file-based routing via `unplugin-vue-router`.
*   **Form Handling:** Integrated [VeeValidate](https://vee-validate.logaretm.com/v4/) with [Zod](https://zod.dev/) for robust form validation.
*   **TypeScript Support:** Fully typed codebase for better developer experience and code maintainability.
*   **Utility Libraries:** Includes [VueUse](https://vueuse.org/) and [Day.js](https://day.js.org/) among others for common utility functions.
*   **Alerts:** User feedback via [Vue Sonner](https://vue-sonner.vercel.app/).
*   **Linting & Formatting:** Pre-configured [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/) for code consistency.

## Tech Stack

*   **Framework:** [Vue.js 3](https://vuejs.org/)
*   **Build Tool:** [Vite](https://vitejs.dev/)
*   **UI Components:** [Shadcn/vue](https://www.shadcn-vue.com/)
*   **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
*   **State Management:** [Pinia](https://pinia.vuejs.org/)
*   **Routing:** [Vue Router](https://router.vuejs.org/) (`unplugin-vue-router`)
*   **HTTP Client:** [Axios](https://axios-http.com/)
*   **Form Validation:** [VeeValidate](https://vee-validate.logaretm.com/v4/) + [Zod](https://zod.dev/)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Icons:** [Lucide Vue Next](https://lucide.dev/), [Iconify](https://iconify.design/)
*   **Utilities:** [VueUse](https://vueuse.org/), [Day.js](https://day.js.org/), [Tailwind Merge](https://github.com/dcastil/tailwind-merge), [clsx](https://github.com/lukeed/clsx)
*   **Notifications:** [Vue Sonner](https://vue-sonner.vercel.app/)
*   **i18n:** [Vue I18n](https://vue-i18n.intlify.dev/)
*   **Linting/Formatting:** [ESLint](https://eslint.org/), [Prettier](https://prettier.io/)

## Getting Started

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/Abdallah01win/StarterApp
    ```
    ```bash
    cd starter-app
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```

### Running the Development Server

```bash
npm run dev
```
This will start the Vite development server, typically available at http://localhost:5173 .

### Linting and Formatting
- To check for linting errors run:
    ```bash
    npm run lint
    ```

- To automatically fix formatting and linting issues run:
    ```bash
    npm run format
    ```

## Configuration
- Environment Variables: Create a .env file based on .env.example and specify your API endpoint:

    ```bash
    cp .env.example .env
    ```

## Customization
This starter kit is designed to be easily customizable:

- Theming: Modify Tailwind CSS configuration `tailwind.config.js` and Shadcn/vue settings `src/style.css` to change colors, fonts, and overall look and feel.
- Components: Use the Shadcn/vue CLI to add new pre-built components to add or modify components in the src/components directory.
## Contributing
Contributions are welcome! Please feel free to submit pull requests or open issues to improve the starter kit.

## License
This project is licensed under the MIT License - see the LICENSE file for details.
