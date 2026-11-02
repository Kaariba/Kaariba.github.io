# Kaariba Khan · Portfolio

A one-page portfolio for a Business Analyst. It's a static site with no build step and no frameworks, so it can be hosted free on GitHub Pages.

**Live site:** `https://<github-username>.github.io/`

---

## 1. Project structure

```
<github-username>.github.io/
├── index.html                 ← page layout and fixed copy (hero, experience, toolkit, contact)
├── .nojekyll                  ← tells GitHub Pages to serve files as-is
├── README.md
└── assets/
    ├── css/
    │   └── style.css          ← all styling (colours at the top in :root)
    ├── js/
    │   ├── projects.js        ← EDIT THIS: résumé link + all case-study content
    │   └── main.js            ← behaviour (cards, 4-slide viewer, menu). No need to edit.
    ├── images/
    │   ├── favicon.svg
    │   ├── og-cover.png       ← 1200×630 preview image shown when the link is shared
    │   └── intro-poster.jpg   ← ADD: still frame shown before the video plays (1280×720)
    ├── video/
    │   ├── intro.mp4          ← ADD: 25–30 second intro video
    │   └── intro.vtt          ← ADD (recommended): captions file
    └── projects/
        ├── profitability-simulator/
        │   ├── thumb.png      ← card image      (1600×1000, 16:10)
        │   ├── approach.png   ← slide 2 diagram (1600×900, 16:9)
        │   └── dashboard.png  ← slide 3 dashboard (1600×900, 16:9)
        └── new-project/
            └── (same three files)
```

Any image or the video that is missing shows a neat placeholder, so the site can go live before every asset is ready.

---

## 2. Deploy on GitHub Pages (first time, about 10 minutes)

1. **Create the repository.** On GitHub, click **New repository** and name it exactly `<github-username>.github.io` (for example `kaaribakhan.github.io`). Make it **Public**. Don't add a README, because this folder already has one.
2. **Upload the files.**
   - *Easiest (browser):* open the new repo, click **uploading an existing file**, drag in **the contents** of this folder (`index.html`, `assets/`, `.nojekyll`, `README.md`), then click **Commit changes**.
     Note: `.nojekyll` is a hidden file, so turn on "show hidden files" (macOS: `Cmd+Shift+.`) or create it in GitHub with **Add file → Create new file**, name it `.nojekyll` and leave it empty.
   - *Or with git:*
     ```bash
     cd kaariba-portfolio
     git init
     git add .
     git commit -m "Initial portfolio"
     git branch -M main
     git remote add origin https://github.com/<github-username>/<github-username>.github.io.git
     git push -u origin main
     ```
3. **Turn on Pages.** Go to repo **Settings → Pages → Build and deployment**, set Source to **Deploy from a branch**, Branch to **main**, folder **/ (root)**, then **Save**.
4. Wait 1–2 minutes and open `https://<github-username>.github.io/`. The **Actions** tab shows the deploy status.
5. If the username isn't `kaaribakhan`, update the two `https://kaaribakhan.github.io/...` URLs near the top of `index.html` (link preview).

Every later change is just: edit, commit, push (or upload). The site updates in about a minute.

---

## 3. Before going live: checklist

- [ ] **Résumé link:** in `assets/js/projects.js`, set `resumeUrl`. Use a direct link to the PDF (Drive: right-click the file → **Share** → *Anyone with the link · Viewer* → **Copy link**). A folder link works but costs recruiters an extra click.
- [ ] **Video:** add `assets/video/intro.mp4` and `assets/images/intro-poster.jpg`.
- [ ] **Case studies:** replace every `[bracketed]` placeholder in `projects.js`.
- [ ] **Project images:** add `thumb.png`, `approach.png` and `dashboard.png` per project.
- [ ] **Certifications:** make sure LinkedIn matches the site (CCBA in particular).
- [ ] Test on a phone and check the link preview with LinkedIn's [Post Inspector](https://www.linkedin.com/post-inspector/).

---

## 4. The intro video

- **Length:** 25–30 seconds. **Format:** MP4 (H.264), 1280×720, **under 10 MB** (GitHub warns over 50 MB and blocks files over 100 MB).
- **Compress** with HandBrake (preset "Fast 720p30") or ffmpeg:
  ```bash
  ffmpeg -i raw.mov -vf scale=1280:-2 -c:v libx264 -crf 26 -preset slow -c:a aac -b:a 96k -movflags +faststart intro.mp4
  ```
- **Poster frame:** a still of her smiling or mid-sentence, saved as `intro-poster.jpg`:
  ```bash
  ffmpeg -ss 00:00:02 -i intro.mp4 -frames:v 1 -q:v 3 intro-poster.jpg
  ```
- **Captions:** many recruiters watch muted. Create `intro.vtt` (YouTube Studio or a free tool can auto-generate and export it):
  ```
  WEBVTT

  00:00:00.000 --> 00:00:04.000
  Hi, I'm Kaariba, a Business Analyst based in Galway.
  ```
- **Suggested script (about 30 seconds):** who she is (5s) → one proof point from EY (10s) → how she works / what she brings (10s) → what she's looking for (5s).

---

## 5. Adding or editing a case study

All case-study content lives in `assets/js/projects.js`. Each entry is one card on the homepage and one viewer.

| Field | Meaning |
|---|---|
| `id` | lowercase-with-dashes; also the folder name under `assets/projects/` |
| `type` | `"full"` = 4 slides (Problem → Approach → Analysis → Recommendation); `"nda"` = one-screen summary, no visuals |
| `status` | `"published"` or `"in-progress"` (dashed card with an amber label) |
| `outcome` | the one line shown on the card. Make it a number. |
| `deckUrl` | optional link to the full PDF deck; leave `""` to hide |
| `slides.analysis.liveUrl` | optional link to a published Power BI / Tableau Public dashboard |

To add a new project, copy an existing `{ ... }` block, change the `id`, and create its image folder. To remove one, delete its block.

**Direct link to a case study:** `https://<github-username>.github.io/#case/<id>`. This is useful in a cover letter or application ("see my margin-optimisation case study").

### Writing the four slides (what recruiters scan for)
1. **Problem:** one business question, who cares, what's at stake in € or %.
2. **Approach:** the four steps she took, data sources, assumptions. Show a process map or data model.
3. **Analysis:** one clean dashboard screenshot plus three findings, each with a number and a "so what".
4. **Recommendation:** three actions with impact, effort and owner. This is the slide that shows business judgment.

### NDA / internal work
Use `type: "nda"`. Describe the problem, what she did and the outcome, with **no screenshots, client names or internal data**. Don't recreate a confidential dashboard, even with dummy data, unless the employer allows it.

---

## 6. Customising the look

Colours and fonts are CSS variables at the top of `assets/css/style.css`:

```css
--bg: #FAFAF7;     /* warm white */
--slate: #1F2B36;  /* deep slate */
--teal: #24706A;   /* accent */
--serif: "Newsreader"...; --sans: "Inter"...;
```

## 7. Optional: custom domain

Buy a domain (e.g. `kaaribakhan.com`), then in **Settings → Pages → Custom domain** enter it and follow GitHub's DNS instructions (four `A` records plus a `CNAME` for `www`). Tick **Enforce HTTPS**.

## 8. Preview locally

```bash
cd kaariba-portfolio
python3 -m http.server 8000
# open http://localhost:8000
```
