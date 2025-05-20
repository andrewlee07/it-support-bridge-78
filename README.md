# IT Support Application

This project is a sample IT service management application built with Vite, React and TypeScript. It provides dashboards, backlog tracking, asset management, security cases and a self-service user portal.

## Project info

**URL**: https://lovable.dev/projects/ed77c9c0-25c8-44a5-93fb-9627bd52af33

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/ed77c9c0-25c8-44a5-93fb-9627bd52af33) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm install

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## Local development

The project requires a recent Node.js version (18+). Useful scripts include:

- `npm run dev` – start the development server.
- `npm run build` – create a production build.
- `npm run lint` – run ESLint over the source code.
- `npm run test` – execute the unit tests with Vitest.
- `npm run test:ui` – open the Vitest UI.
- `npm run test:coverage` – generate coverage reports.

## Testing guidelines

Unit tests live next to their components or utilities under `src/`. New features should include tests using [Vitest](https://vitest.dev/) and [React Testing Library](https://testing-library.com/). Run all tests with:

```sh
npm run test
```

Coverage reports are output to the `coverage/` directory when running `npm run test:coverage`.

## Environment and configuration

The application works out of the box with the default configuration. The only environment variable currently used is `NODE_ENV` to control logging in production vs development.

## Directory overview

- `src/components` – reusable UI components.
- `src/pages` – page level components used for routing.
- `src/utils` – helper utilities, mock API modules and common types.
- `src/routes.tsx` – main application route definitions.
- `docs/routes.md` – security routing guide.

## Routing documentation

Detailed instructions for integrating security routes can be found in [docs/routes.md](docs/routes.md).

## API and data layer

Mock API modules under `src/utils/api/` return sample data for development and testing. Data type definitions live in `src/utils/types/` and are reused throughout the app.

## Contribution & license

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on contributing. This project is released under the [proprietary license](LICENSE).

## Changelog

Major feature additions and fixes are tracked in [CHANGELOG.md](CHANGELOG.md).

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/ed77c9c0-25c8-44a5-93fb-9627bd52af33) and click on Share -> Publish.

## I want to use a custom domain - is that possible?

We don't support custom domains (yet). If you want to deploy your project under your own domain then we recommend using Netlify. Visit our docs for more details: [Custom domains](https://docs.lovable.dev/tips-tricks/custom-domain/)
