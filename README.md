# AMAN Portfolio Website

AMAN is a music producer and sound architect focused on modern music production and audio branding.

**Live Site:** [https://thisisamann.netlify.app/](https://thisisamann.netlify.app/)

## Features

- **Interactive 3D Hero:** Visuals powered by Three.js and React Three Fiber.
- **Smooth Scrolling:** Uses Lenis for fluid, momentum-based scrolling.
- **Dynamic Animations:** Scroll-linked animations built with Framer Motion.
- **Portfolio Sections:** Clear layouts for Discography, Jingles, Gallery, and Works.
- **Performance Optimized:** Includes CSS fallbacks for devices with reduced motion.

## Tech Stack

- **Framework:** Next.js (App Router), React
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion, Lenis
- **3D Graphics:** Three.js, React Three Fiber

## Getting Started

Follow these steps to run the website on your local machine.

1. **Install dependencies:**
   ```bash
   npm install
   ```
   *(You can also use `yarn`, `pnpm`, or `bun`)*

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **View the site:**
   Open [http://localhost:3000](http://localhost:3000) in your web browser.

## Project Structure

- `/app`: Main pages and Next.js routing logic.
- `/components`: UI elements like `HeroCanvas`, `Discography`, and `Jingles`.
- `/public`: Static assets like images, audio files, and icons.

## Deployment

This project is ready to be deployed on platforms like Vercel or Netlify. To create a production build manually, run:

```bash
npm run build
```
