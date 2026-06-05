# Home Page Structure

## Preferred organization

- Put reusable page UI under `src/components/app/page/<page>/`.
- Keep the route file thin; it should only connect the route to a page component.
- Split role-specific UI into separate files such as `client/`, `vendor/`, or `shared/`.
- Keep types in `src/types/` when they are reused by page components.
- Keep constants near the page feature in a `constants.ts` file.
- Keep hooks near the page feature in a `hooks/` file.

## Home page layout

- `HomePage.tsx` decides between client and vendor flows.
- `ClientHomePage.tsx` renders the client dashboard.
- `VendorHomePage.tsx` renders the vendor dashboard.
- `constants.ts` stores shared static data such as stats and dates.

## Notes

- Avoid placing reusable page components inside route modules.
- Avoid defining multiple unrelated reusable components in a single file.
