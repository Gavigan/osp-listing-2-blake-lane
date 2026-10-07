# OSP Signature Property Collection — Listing Launch Guide

This repository is the working model for future OSP luxury listing microsites.

## Reusable buyer experience

Every OSP Signature Property Collection site should include:

- cinematic hero presentation and property status
- an above-fold construction snapshot and dated milestone timeline for active builds
- verified price, bedrooms, bathrooms and square footage
- architecture and lifestyle narrative
- floor-plan viewer
- approved photography or renderings only
- selections and finish collection
- community story and amenities
- buyer brochure
- common buyer questions
- one-tap SMS contact actions
- an approved-information property concierge
- brokerage attribution, rendering notices and controlling-document language
- canonical metadata, social-sharing image, structured data, sitemap and robots file
- direct project-social links for jobsite photos and progress updates
- mobile, tablet and desktop testing

## New-listing intake

Provide:

1. Property address, preferred subdomain and listing status.
2. Verified price, bedroom/bath count, heated square footage and total under roof.
3. MLS, Zillow or other public listing URL.
4. Eight to twenty approved images or renderings.
5. Floor plans.
6. Selection boards and finish specifications when applicable.
7. Buyer brochure or offering memorandum.
8. Community and amenity information.
9. Agent names, mobile numbers and approved SMS message.
10. Brokerage attribution, image-use authorization and required disclaimers.
11. For active construction: last verified update date, completed stage, current work, estimated duration and next two milestones.
12. Project Instagram/Facebook handles or other approved progress channels.

## Production workflow

1. Copy this repository into a new public repository named for the property.
2. Replace the values recorded in `listing-data.json`.
3. Replace the approved files in `assets/` and the brochure in `downloads/`.
4. Update the copy, FAQ answers, concierge answers, metadata and structured data in `index.html` and `script.js`.
   For an active build, update the hero snapshot, full milestone timeline and `construction` record in `listing-data.json` at the same time.
5. Set the property hostname in `CNAME`, `robots.txt` and `sitemap.xml`. The IndexNow script reads the hostname directly from `CNAME`; no script allowlist edit is required for a new listing. The hostname must be exactly one property subdomain under `osprealestate.com` (for example, `2blakelane.osprealestate.com`), not the apex domain, a nested subdomain or another domain.
6. Validate every image, link, modal, text action, concierge answer and responsive breakpoint.
7. Publish from the repository's default branch with GitHub Pages.
8. In GoDaddy DNS, create one property-specific CNAME pointing to `gavigan.github.io`.
9. Enforce HTTPS after DNS is verified.
10. Add the microsite URL to the OSP website, MLS/Zillow, social posts, email signatures and QR-coded print materials.

## Naming standard

- Repository: `osp-listing-<street-number>-<street-name>`
- Subdomain: a short address without punctuation, such as `2blakelane.osprealestate.com`
- Hero image: `front-rendering.jpeg` or `hero-exterior.jpeg`
- Floor plans: `main-level-plan.jpeg`, `upper-level-plan.jpeg`
- Brochure: `<address>-buyer-brochure.pdf`

## Guardrails

- Do not publish unapproved renderings or old selection imagery.
- Keep estimates labeled as estimates.
- Date every construction update and avoid publishing unverified milestone or completion dates.
- Keep availability and pricing tied to the live public listing or direct agent confirmation.
- Direct purchase terms, contract, legal, availability and project-specific decisions to the agents.
- Do not expose API keys in browser code. A future AI concierge must use a secure server-side service.
- Use one explicit DNS record per property. Do not use a wildcard listing subdomain.
- Keep `CNAME` limited to a single lowercase property hostname under `osprealestate.com`. Search submission is intentionally blocked if the configured hostname falls outside that boundary.
- Keep `indexnow-key.txt` at the site root. The search workflow verifies that the live ownership file exactly matches the repository key and that the live home page responds successfully before it submits the configured property URL.

## Launch acceptance checklist

- [ ] Public URL opens without a sign-in wall.
- [ ] HTTPS is active.
- [ ] Hero, gallery, floor plans and selection board load.
- [ ] Active-build status is dated and matches the latest field report.
- [ ] Construction-progress social links open the correct approved accounts.
- [ ] Only approved imagery is present.
- [ ] Zillow/MLS and brochure links open.
- [ ] Text Stacey and Text Billy open a prewritten SMS message.
- [ ] Concierge answers approved topics and routes contract questions to the agents.
- [ ] No horizontal overflow exists at phone width.
- [ ] Page title, description, canonical URL and social image match the property.
- [ ] Schema address, price, bedroom/bath count and square footage are current.
- [ ] Sitemap and robots file use the final hostname.
- [ ] Rendering and controlling-document notices are visible.
- [ ] OSP home/listing directory links to the microsite.
