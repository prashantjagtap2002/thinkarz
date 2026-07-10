# ThinkArz

Marketing website for ThinkArz, the pre-owned car venture of Gautam Modi Group. Built with Next.js (App Router), TypeScript and Tailwind CSS.

## Pages

- `/` — Home
- `/about-us` — About Us
- `/pre-owned-cars` — Pre-owned car listings with filters, and `/pre-owned-cars/[id]` detail pages
- `/sell-your-car` — Instant valuation form
- `/book-a-test-drive` — Test drive booking form
- `/blogs` — Blog listing and `/blogs/[slug]` detail pages
- `/contact-us` — Contact form, map and FAQs

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Notes

- Car listing data and photos in `lib/cars.ts` are sourced from thinkarz.com's live inventory. Pricing/EMI for a few units without published prices are estimated.
- Pages that don't yet exist on the live site (About, Sell, Test Drive, Blogs) use stock placeholder imagery until real photography is available.
- Forms are front-end only for now (no backend wired up) — submitting shows a success state locally.
