This app is currently on development mode on the Spotify API so in order to access the app via [`sclonetify`](https://sclonetify.jodarini.dev), i have to grant you access with your Spotify email/username or, alternatively, you can use these non-premium credentials:

Test account:

```
sclonetifytest@gmail.com
```

Test password:

```
test12345!
```

[![Watch the video](https://img.youtube.com/vi/GvJ5nk6481g/maxresdefault.jpg)](https://www.youtube.com/watch?v=GvJ5nk6481g)
![Playlist view](https://github.com/Jodarini/spotify-clone/blob/main/public/screenshots/Screenshot_1.png)
![Playlist view](https://github.com/Jodarini/spotify-clone/blob/main/public/screenshots/Screenshot_2.png)

In order to use the player, you'll need Spotify Premium.

To run this locally, follow the documentation on [`Spotify`](api.spotify.com) and [`Clerk`](www.clerk.com), you need your own .env variables.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## TODO

- [x] Filtering to user library (tags).
- [x] Seek to track position functionality.
- [x] Volume slider.
- [x] Show currently playing album/playlist on user library.
- [x] Currently playing track tab title.
- [x] Play button for playlist component.
- [x] Play button for playlist page.
- [ ] Fix album list ui (show headers only when used).
- [ ] Fix save to liked songs button not updating after a request success (album, etc).
- [ ] Fix spacing on Your Library for currently playing status icon.
- [ ] Play button for album page.
- [ ] Sort by options to user library.
- [ ] Filtering options for search page.
- [ ] Liked songs playlist on library.
- [ ] Different view options for playlists.
- [ ] Background color based on item's image.
- [ ] Disable navigation buttons when needed.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
