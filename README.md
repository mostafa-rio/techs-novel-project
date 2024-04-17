## Project Structure

#### src/app/components: contains components used in home page (list of users)

#### src/app/details/[id]: is the user details page

#### src/hooks: contains project hooks

#### src/provider: contains configuration providers for MUI and Redux

#### src/redux: includes store structure and feature slices

#### src/types: contains typescript types used in application

#### src/constants.ts: contains project constants variables

## Getting Started

run the development server:

```bash
npm run dev
```

run tests:

```bash
npx cypress open
```

build the project:

```bash
npm run build
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.
