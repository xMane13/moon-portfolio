# moon: portfolio

Personal site of Manuel M. Muñoz-Cárdenas. Next.js 15, exported as static files, in English and Spanish, light and dark.

## Run it locally

```bash
npm install
npm run dev        # http://localhost:3000
```

## Deploy on Vercel

1. Push this folder to a new GitHub repository (for example `xMane13/portfolio`).
2. On vercel.com, choose **Add New → Project**, import the repository and press **Deploy**. No settings to change.
3. Your link will be `https://<project>.vercel.app`. Add your own domain later under Settings → Domains.

It also works on GitHub Pages or any static host: `npm run build` writes the whole site to `out/`.

## Where to change things

| What | File |
| --- | --- |
| All the text, projects and links | `app/page.tsx` |
| Colours (violet, both modes) | `app/tokens.css` |
| Layout and type | `app/globals.css` |
| The Moon picture | `lib/moon.ts` |
| The portrait | `lib/portrait.json` (made from your photo) |
| The CV linked from the site | `public/cv.pdf` (no phone number) |

Every sentence lives in an `en` and an `es` version side by side; edit both.

## Regenerating the portrait

The portrait is your photo reduced to 118 x 89 cells of brightness 0 to 8 (0 is blank).
To use a new photo, cut out the background, convert it to that grid and replace `rows_data` in `lib/portrait.json`.

## Design notes

Built with the Hallmark design skill (Terminal theme, re-coloured violet). The stamp at the top of `app/tokens.css` records every design decision and waiver.
