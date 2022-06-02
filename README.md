<div align="center">
<h1>Vue admin</h1>
</div>

## Introduction
Vue Admin is a free and open source middle and back-end template. Using the latest `vue3`, `vite2`, `TypeScript` and other mainstream technology development, the out-of-the-box middle and back-end front-end solutions can also be used for learning reference.

## Preparation

- [node](http://nodejs.org/) and [git](https://git-scm.com/) - Project development environment
- [Vite](https://vitejs.dev/) - Familiar with vite features
- [Vue3](https://v3.vuejs.org/) - Familiar with Vue basic syntax
- [TypeScript](https://www.typescriptlang.org/) - Familiar with the basic syntax of `TypeScript`
- [Es6+](https://www.javascripttutorial.net/es6/) - Familiar with es6 basic syntax
- [Vue-Router-Next](https://next.router.vuejs.org/) - Familiar with the basic use of vue-router
- [Ant-Design-Vue](https://2x.antdv.com/docs/vue/introduce/) - ui basic use

## Install and use

- Installation dependencies

```bash
npm install
```

- run

```bash
npm run dev
```

- build

```bash
# build for production
npm run build:production
# build for staging
npm run build:staging
```

- check eslint

```bash
npm run lint:eslint
```

- format code

```bash
npm run lint:prettier
```

## How to pull request

1. Fork code!
2. Create your own branch: `git checkout -b feature/xxxx`
3. Submit your changes: `git commit -m 'type: subject'`
4. Push your branch: `git push origin feature/xxxx`
5. submit`pull request`

## Git Contribution submission specification

- reference [vue](https://github.com/vuejs/vue/blob/dev/.github/COMMIT_CONVENTION.md) specification ([Angular](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular))

  - `feat` Add new features
  - `fix` Fix the problem/BUG
  - `style` The code style is related and does not affect the running result
  - `perf` Optimization/performance improvement
  - `refactor` Refactor
  - `revert` Undo edit
  - `test` Test related
  - `docs` Documentation/notes
  - `chore` Dependency update/scaffolding configuration modification etc.
  - `workflow` Workflow improvements
  - `ci` Continuous integration
  - `types` Type definition file changes
  - `wip` In development
  

- Example: `git commit -m "chore: lint commit message"`
- Exception: Can't find node in PATH, trying to find a node binary on your system
  - Run: `echo "export PATH=\"$(dirname $(which node)):\$PATH\"" > ~/.huskyrc`
## License
Copyright (c) 2022
