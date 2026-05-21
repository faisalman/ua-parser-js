# UAParser.js: How to Contribute

Thank you for your interest in contributing to UAParser.js! This document covers everything you need to get started, from setting up your environment to submitting a pull request.

## Table of Contents

- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Testing](#testing)
- [Security Guidelines](#security-guidelines)
- [Dependency ](#dependency)
- [Commit Message Convention](#commit-message-convention)
- [Submitting a Pull Request](#submitting-a-pull-request)
- [Code of Conduct](#code-of-conduct)

---

## Getting Started

1. Fork this repository and clone your fork:
   ```bash
   git clone https://github.com/<your-username>/ua-parser-js.git
   cd ua-parser-js
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Verify everything works before making changes:
   ```bash
   npm run build+test
   ```

---

## Development Workflow

- Source files are under `/src` directory.
- Test files are under `/test` directory.
- After editing source files, rebuild the distribution bundles:
  ```bash
  npm run build
  ```

### Adding New Detection Rules

When adding a new detection rule, make sure to also update the enums in `/src/enums/ua-parser-enum.js`.

### Adding or Updating Regex Patterns

- Add patterns to the relevant section inside `/src/main/ua-parser.js` or `/src/extensions/ua-parser-extensions.js`.
- Every new pattern must have a corresponding unit test.
- Run `safe-regex` checks to confirm no new pattern introduces catastrophic backtracking by running:
   ```bash
   npm run test
   ```
- Keep in mind that UA strings are capped at 500 characters at parse time.

---

## Testing

All pull requests must pass the full test suite. Please add or update tests under `/test` when changing parser behaviour.

---

## Security Guidelines

We take security seriously. Please follow these rules when contributing:

- No `eval()`, `new Function()`, or other unsafe pattern.
- Validate and sanitize inputs: User-Agent strings are untrusted data.
- Regex safety: verify patterns with `safe-regex` before adding new regular expressions.
- Do not introduce new production dependencies without prior discussion in an issue. The current production dependency footprint is intentionally minimal.

To report a security vulnerability, please follow the process described in [SECURITY.md](SECURITY.md).

---

## Dependency

### Adding Dependencies

- Production dependencies (`dependencies` in `package.json`): requires explicit maintainer approval. Open an issue before adding one.
- Dev dependencies (`devDependencies`): allowed for tooling, but well-maintained packages are preferred.
- All dependencies must use OSI-approved permissive licenses.

---

## Commit Message Convention

This project adopts the [Conventional Commits](https://www.conventionalcommits.org/) specification. All commit messages should be structured as:

```
<type>(<scope>): <short summary>

[optional body]

[optional footer(s)]
```

### Breaking Changes

Append `!` after the type/scope and add a `BREAKING CHANGE:` footer:

```
feat!: rename getUA() to getUserAgent()

BREAKING CHANGE: getUA() has been renamed to getUserAgent() for clarity.
```

> Commits with `BREAKING CHANGE` trigger a minor/major version bump in releases.

---

## Submitting a Pull Request

1. Create a feature branch from `master`:
   ```bash
   git checkout -b fix/my-improvement
   ```
2. Make your changes, with tests.
3. Run the full suite:
   ```bash
   npm run build+test
   ```
4. Push and open a Pull Request against `master`.
5. Don't forget to check the CLA acknowledgement in the PR submission form.
6. A maintainer will review your PR. Please be responsive to feedback.

---

## Code of Conduct

This project follows the [UAParser.js Code of Conduct](CODE_OF_CONDUCT.md). By participating, you agree to uphold it.