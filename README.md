# AI Engineer Portfolio

A content-driven AI/ML Engineer portfolio built with React, TypeScript, and Vite. The portfolio features a dynamic, zero-code content management architecture. You can update the profile picture, resumes, projects, and certifications by simply adding or replacing files in the `public/content/` directory.

## Features

- **Dynamic Content Scanner**: A custom Vite plugin automatically scans the `public/content` directory and generates a `manifest.json` on build/dev, keeping the frontend synchronized without manual hardcoding.
- **Modern UI/UX**: Built with Framer Motion for smooth animations and Three.js (via React Three Fiber/Drei) for 3D interactions.
- **Custom Liquid Cursor**: Features a premium, interactive custom cursor that perfectly inverts the background color beneath it (`mix-blend-mode: difference`).
- **Modular Sections**: Dedicated sections for About, Projects, and Certificates.
- **Quick Contact Options**: Dedicated "Contact Me" and "Resume" dropdowns in the About section for fast professional engagement.

## How to Manage Content

To update the portfolio content, place your files inside the `public/content/` subdirectories:
- **Profile Image**: Add your photo (e.g., `.jpg`, `.png`) to `public/content/profile/`.
- **Resumes**: Add your resume PDFs in subfolders under `public/content/resume/` (e.g., `resume/ai-ml/`).
- **Projects**: Create a folder for each project in `public/content/projects/`, include a thumbnail image, and a `metadata.json`.
- **Certificates**: Create a folder for each certificate in `public/content/certificates/`, include the certificate thumbnail image, and a `metadata.json`.

## Getting Started

1. **Install Dependencies**
   Make sure you have Node.js installed, then run:
   ```bash
   npm install
   ```

2. **Start the Development Server**
   Run the following command to start the Vite dev server and automatically generate the content manifest:
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173`.

3. **Build for Production**
   ```bash
   npm run build
   ```
