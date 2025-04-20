# Contributing to GPTyrant

Thank you for your interest in contributing to GPTyrant! We welcome contributions from everyone.

## Getting Started

1. **Fork the repository** on GitHub.
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/yourusername/gptyrant-core.git
   cd gptyrant-core
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Create a branch** for your feature or bugfix:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Workflow

1. **Make your changes** in your feature branch.
2. **Run tests** to ensure your changes don't break existing functionality:
   ```bash
   npm run test
   ```
3. **Lint your code** to ensure it follows our style guidelines:
   ```bash
   npm run lint
   ```
4. **Build the project** to verify your changes compile correctly:
   ```bash
   npm run build
   ```
5. **Commit your changes** with a clear, descriptive commit message:
   ```bash
   git commit -m "feat: add support for new provider"
   ```
   We follow [Conventional Commits](https://www.conventionalcommits.org/) format.

## Pull Request Process

1. **Push your changes** to your fork on GitHub:
   ```bash
   git push origin feature/your-feature-name
   ```
2. **Create a Pull Request** from your fork to the main repository.
3. **Describe your changes** in the PR description, explaining what problem it solves and how it was implemented.
4. **Wait for review** - maintainers will review your PR and provide feedback.
5. **Address any feedback** and update your PR as needed.

## Code Style Guidelines

- We use TypeScript for type safety
- Follow the existing code style in the project
- Add JSDoc comments for all public APIs
- Keep your code modular and focused
- Write clear, descriptive variable and function names
- Avoid unnecessary dependencies

## Adding New Providers

When adding a new AI provider:

1. Create a new file in `src/providers/your-provider.ts`
2. Implement the `AIProvider` interface
3. Update the provider type in `src/types.ts`
4. Add provider initialization in the `GPTyrant` constructor
5. Update documentation
6. Add tests
7. Create an example in the `examples` directory

## Testing

- Write tests for all new functionality
- Make sure existing tests pass 
- Run tests with `npm test`

## Documentation

If your changes require documentation updates:

1. Update the README.md for high-level changes
2. Update API_DOCS.md for API changes
3. Update relevant example files
4. Add JSDoc comments to your code

## License

By contributing to GPTyrant, you agree that your contributions will be licensed under the project's MIT License.

## Questions?

If you have any questions about contributing, please open an issue on GitHub.