# Focus App

A mobile productivity app for students who struggle with time management, ADHD, and time blindness. The core feature is an adjustable alarm system: instead of a single reminder, you pick how often you want to be nagged before an event, and the app also calculates a "need to leave by" time so you actually arrive on time. Around that sit a color coded calendar, long term goal tracking, and study and break timers.

Built for the CMPSC 3943 Agile/Scrum course, Team 2.

## Tech stack

- **Frontend:** Expo (React Native), TypeScript. Expo SDK 57.
- **Backend:** Flask. Not started yet, lives in `backend/`.
- **Database:** not decided yet.

## Prerequisites

You need three things.

1. **Node.js on a current LTS version.** Expo SDK 57 requires Node `20.19.4` or newer on the 20 line, `22.13.0` or newer on the 22 line, or `24.3.0` or newer. If you have a choice, install **Node 22 LTS**. Odd numbered versions like 19, 21, and 23 are not supported and will print `EBADENGINE` warnings during install. Download from [nodejs.org](https://nodejs.org).
2. **npm.** It ships with Node, so installing Node covers this.
3. **The Expo Go app on your phone.** Get it from the [App Store](https://apps.apple.com/app/expo-go/id982107779) or [Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent). This is how you run the app during development.

Check what you have:

```bash
node --version
npm --version
```

### You do not need a Mac

Windows, Linux, and macOS all work for developing this project. This came up more than once while we were picking the stack, so to be clear about why:

- You test on your own physical phone through Expo Go, so you do not need an iOS simulator and you do not need Xcode.
- When we eventually produce real installable builds, EAS Build compiles them in the cloud, including the iOS build. That happens on Expo's machines, not yours.

An iPhone plus a Windows laptop is a perfectly normal setup for this team.

## Setup

Clone the repo and install dependencies. Note that dependencies live in `mobile/`, not at the repo root.

```bash
git clone https://github.com/CMPSC3943FA26/Team-2---Focus-App.git
cd Team-2---Focus-App/mobile
npm install
```

The install pulls down roughly 600 packages and can take a few minutes the first time.

## Running the app

From inside `mobile/`:

```bash
npx expo start
```

Metro, the bundler, starts up and prints a QR code in your terminal.

- **iPhone:** open the Camera app, point it at the QR code, tap the notification.
- **Android:** open Expo Go, tap "Scan QR code", point it at the code.

The first load takes a while because the whole app has to be bundled and sent to your phone. Later reloads are fast, and saving a file refreshes the app automatically.

### Your phone and your computer must be on the same wifi

This is the single most common reason the QR code does not work. Your phone connects directly to the dev server running on your laptop, so both devices have to be on the same network.

If they are not, or if you are on a campus or guest network that blocks devices from talking to each other, use tunnel mode:

```bash
npx expo start --tunnel
```

Tunnel mode routes the connection through Expo's servers instead of your local network. It works almost anywhere, including on campus wifi and phone hotspots. It is noticeably slower, so use normal mode when you can and keep this as the fallback.

Press `Ctrl + C` in the terminal to stop the server.

## Folder structure

```
/
├── mobile/      Expo (React Native) app. All frontend work happens here.
├── backend/     Flask API. Empty for now, a separate task will fill it in.
├── .gitignore   Covers both halves of the project.
└── README.md    This file.
```

`backend/` contains only a `.gitkeep` file. Git does not track empty folders, so that placeholder is what keeps the folder in the repo until the backend work starts.

Inside `mobile/`, the code you care about is under `src/`. Routing uses Expo Router, which means files in `src/app/` become screens automatically based on their filename.

The `.gitignore` lives only at the repo root. The one that `create-expo-app` generates inside `mobile/` was merged into it and deleted, so there is a single file to check when you are wondering whether something is tracked.

## Branching convention

Most of the team has not worked this way before, so read this section before your first commit.

| Branch | Purpose |
| --- | --- |
| `main` | Stable and demo ready. Never commit here directly. Only merges from `dev`. |
| `dev` | Integration branch. All feature branches merge here first. |
| `feature/<short-name>` | One per user story. For example `feature/alarm-frequency`, `feature/calendar-view`. |
| `fix/<short-name>` | Bug fixes. For example `fix/timer-reset`. |

The rule that matters: **nothing goes into `main` except a merge from `dev`.** `main` is what we demo from, so it needs to stay working.

Starting a new piece of work:

```bash
git checkout dev
git pull origin dev
git checkout -b feature/alarm-frequency
```

Finishing it:

```bash
git add .
git commit -m "Add alarm frequency tier selection"
git push -u origin feature/alarm-frequency
```

Then open a pull request on GitHub targeting `dev`, not `main`.

Keep branch names short and lowercase, and use hyphens rather than spaces or underscores.

## Troubleshooting

**The QR code scans but the app never loads.**
Almost always the wifi problem described above. Confirm both devices are on the same network, then fall back to `npx expo start --tunnel`.

**Weird bundler errors, or changes not showing up.**
Metro caches aggressively and the cache goes stale after dependency changes or branch switches. Clear it:

```bash
npx expo start -c
```

If that does not fix it, delete the dependencies and reinstall:

```bash
rm -rf node_modules
npm install
```

On Windows PowerShell, use `Remove-Item -Recurse -Force node_modules` instead of `rm -rf`.

**`npm install` fails, or you see `EBADENGINE` warnings.**
Your Node version is wrong. Check it:

```bash
node --version
```

If it does not satisfy `20.19.4+`, `22.13.0+`, or `24.3.0+`, install Node 22 LTS from [nodejs.org](https://nodejs.org) and run `npm install` again. `EBADENGINE` on its own is a warning rather than an error and the app may still run, but do not leave it that way, because unsupported versions cause problems that are hard to diagnose later. If you need to keep several Node versions side by side, use [nvm-windows](https://github.com/coreybutler/nvm-windows) on Windows or [nvm](https://github.com/nvm-sh/nvm) on macOS and Linux.

**`npx expo start` says the port is in use.**
An earlier dev server is still running. Either stop it, or start on another port:

```bash
npx expo start --port 8082
```

**You are in the wrong folder.**
Every npm and Expo command in this README runs from inside `mobile/`, not the repo root. If a command is not found or npm complains there is no `package.json`, run `cd mobile` first.
