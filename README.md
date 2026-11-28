# Notebook for Forms

Store reusable form values in your browser, organize them into tabs, and copy a field to the clipboard.

## Development

Run the following commands from the repository root. The toolchain has been tested with Node.js 24.

- `npm ci` installs the dependencies recorded in the lockfile.
- `npm start` starts Vite at [localhost:3000](http://localhost:3000) with hot reload.
- `npm test` runs Playwright tests in Chromium. Use `npm test -- --ui` for interactive mode.
- `npm run build` checks TypeScript, runs ESLint, and builds the production site in `build/`.

Run `npx playwright install chromium` to install the test browser. Playwright starts Vite automatically and discovers tests in `tests/`. There are currently no tests, so `npm test` reports that no tests were found.

To deploy, serve the contents of `build/` from a static host. Set `PUBLIC_URL` when building for a subpath, for example `PUBLIC_URL=/notebook npm run build`.
