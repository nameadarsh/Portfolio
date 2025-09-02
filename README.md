# Adarsh Bajpai – Portfolio (Static HTML)

A simple, fast, single-file portfolio built with HTML + Tailwind CDN and Font Awesome. Edit in any editor and open locally; no build step needed.

## Run Locally

- Double-click `index.html`, or
- Use a local server (recommended for smooth scrolling and caching):
  - Node: `npx http-server -p 5500 -c-1` then open `http://localhost:5500`

## Where to Edit Content

All content is in `index.html`. Search for the section ids.

### 1) About (top of page)
- Photo: replace `profilephotojpg.jpg` with your image, or change the `src` on the `<img>` inside the About section.
- Name and title: edit the `<h1>` and `<h2>` in `#about`.
- Intro paragraphs: edit the two `<p>` tags right under the title.
- Buttons:
  - Download CV: replace the `href` on the "Download CV" link with your PDF filename (keep file in the root next to `index.html`).
  - Contact Me: keeps scrolling to `#contact`.

### 2) Skills
- Categories are rendered as titled blocks (Programming, ML & Deep Learning, Frontend & Dev Tools, Design & Creative).
- Each skill is an individual tile. To add/remove skills, duplicate or delete a tile `<div>` within the corresponding category grid.
- In light theme the tile background is light and icons/text are dark; in dark theme they invert automatically.

Tip: use the same tile structure when adding new skills:
```
<div class="bg-white/95 dark:bg-gray-900/70 ring-1 ring-gray-300 dark:ring-white/10 rounded-xl p-6 text-center shadow-lg w-44 flex flex-col items-center">
  <i class="fab fa-react text-3xl text-gray-800 dark:text-sky-400 mb-3"></i>
  <div class="text-gray-900 dark:text-gray-100">React.js</div>
</div>
```

### 3) Projects
- Each project card has a title, description, tags, and a "View Project" link.
- To change the GitHub links, update the `href` in each project's anchor tag.

### 4) Roles & Responsibilities
- Timeline-style cards. To add a new role, duplicate one card block and edit the text. Dots and connecting line align automatically.

### 5) Contact (Get in touch)
- Email line: update the `mailto:` link and visible email.
- LinkedIn & GitHub tiles: update the `href` URLs only.

## Theme
- Dark by default. Click the moon/sun icon in the navbar to toggle.
- Preference is saved to `localStorage` and the background overlay adjusts per theme for readability.

## Assets
- Place your `profilephotojpg.jpg`, `background.png`, and `Adarsh Bajpai CV.pdf` alongside `index.html`.
- Update filenames in `index.html` if you rename assets.

## Notes
- Uses Tailwind CDN; no build pipeline. If offline, cached assets may be required.
- Animations use CSS and IntersectionObserver.

## Editing Safely
- Keep the class names on tiles to preserve theming.
- Search for section headers (`#about`, `#skills`, `#projects`, `#experience`, `#contact`) to find the right places.

## Deploy
- Commit and push to your GitHub repo (`Portfolio`). GitHub Pages (if enabled) can serve the static site.


