import React from "react";
import Card from "./ui/Card";
import { Album, CurrentUserPlaylist } from "../types/spotify";
import Link from "next/link";
import {
  getCurrentUserPlaylists,
  getUsersAlbums,
} from "../api/spotify/spotify-api";
import YourLibraryExpandButton from "./YourLibraryExpandButton";

export default async function Dashboard() {
  let playlists = await getCurrentUserPlaylists().then((data) => data.items);
  let albums = await getUsersAlbums();

  let library: Array<CurrentUserPlaylist | Album> = [...playlists];
  albums?.items.forEach(({ album }) => {
    library.push(album);
  });

  return (
    <div className="mb-2 flex w-full flex-col gap-2 md:mb-0 md:h-full">
      <Card className="overflow-clip ">
        <Link href="/">
          <div className="flex items-center gap-2 text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1"
              viewBox="0 0 24 24"
              data-icon="SvgHome"
              aria-hidden="true"
            >
              <path d="M4.75 10.75v9a1.16 1.16 0 00.213.725.717.717 0 00.587.275h12.4a.737.737 0 00.55-.275 1.1 1.1 0 00.25-.725v-9m-16 2l4.5-5 4.5-5 4.5 5 4.5 5m-11.5 8v-5a.945.945 0 011-1h3a.945.945 0 011 1v5"></path>
            </svg>
            Home
          </div>
        </Link>
        <Link href="/search">
          <div className="flex items-center gap-2 text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              data-icon="SvgSearch"
              aria-hidden="true"
            >
              <path d="M10.1 3a7.1 7.1 0 11-5.02 2.08A7.074 7.074 0 0110.1 3zM21 21l-2.9-2.9-2.9-2.9"></path>
            </svg>
            Search
          </div>
        </Link>
      </Card>
      <YourLibraryExpandButton library={library} />
    </div>
  );
}
