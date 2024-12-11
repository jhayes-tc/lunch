# Lunch

This is a Turbo Monorepo! Which means the frontend and backend live together and you can run all the necessary scripts from the root.

## Setup

Setting up on a new computer and need to setup your dev environment with you SQLite DB?

1. Make a `.env` file in the root of the project
2. Put the following line into it:

```bash
DATABASE_URL="file:./dev.db"
```

3. Then just run the setup NPM scripts to get everything ready:

```bash
npm i
npm run prisma:generate
npm run prisma:migrate
```

### Alternatively the two Prisma commands have been combined into one

```bash
npm run prisma:setup
```

And you're ready to go!

---

## Dev Server

It's a monorepo, but you can run this from the root

```bash
npm run dev
```

> [!WARNING]
> I have had some problems with the frontend freezing when using turbo _after_ adding DaisyUI. So I have been running them in separate terminals, would appreciate someone fixing that though.

### Alternatively you can run each in a separate terminal

> [!NOTE]
> After doing setup

Terminal #1

```bash
cd apps/api
npm run dev
```

Terminal #2

```bash
cd apps/client
npm run dev
```

---

## Production setup

You'll want to keep sqlite db file in a safe spot, maybe even back it up. It is just a file.

If you're setting up a new instance you'll want to do the setup steps from above.

A pipeline could be easily setup to do these steps. But this is all TypeScript.

Build it all with one command, this will also keep a cache for anything unchanged, so building should be faster the second time.

```bash
npm run build
```

Serving it all goes through Nest.js. Nest is setup to serve the static React files from the front-end after the build

```bash
npm run start
```
