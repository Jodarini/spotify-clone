"use client";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import ResumePausePlaybackButton from "./track/ResumePausePlaybackButton";
import {
  removeAlbumforCurrentUser,
  saveAlbumsForCurrentUser,
} from "../api/spotify/spotify-api";
import { usePathname, useRouter } from "next/navigation";

export default function ListTopBar({
  playlistUri,
  token,
  uris,
  isInLibrary,
}: {
  playlistUri?: string;
  uris?: string[];
  token: string;
  isInLibrary: boolean[];
}) {
  const [inLibrary, setInLibrary] = useState(isInLibrary[0]);
  const router = useRouter();
  const pathName = usePathname();
  const isAlbum = pathName.includes("album");

  const addToLibrary = async () => {
    setInLibrary(true);
    const contextId = playlistUri.split(":").splice(2);
    const res = await saveAlbumsForCurrentUser(token, contextId[0]);
    router.refresh();
  };

  const removeFromLibrary = async () => {
    setInLibrary(false);
    const contextId = playlistUri.split(":").splice(2);
    const res = await removeAlbumforCurrentUser(token, contextId[0]);
    router.refresh();
  };

  return (
    <div className="flex items-center gap-4 py-4">
      <ResumePausePlaybackButton
        token={token}
        pagePlaylistURI={playlistUri}
        uris={uris}
        variant="GREEN"
      />
      {isAlbum && (
        <>
          {inLibrary ? (
            <button onClick={removeFromLibrary}>
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
                data-icon="SvgCheckCircle"
                aria-hidden="true"
              >
                <path d="M8.5 13.1l1.05.95 1.05.95 2.45-3 2.45-3M12 3a9 9 0 11-6.364 2.636A8.972 8.972 0 0112 3z"></path>
              </svg>
            </button>
          ) : (
            <button onClick={addToLibrary}>
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
                data-icon="SvgPlus"
                aria-hidden="true"
              >
                <path d="M12 4v16m8-8H4"></path>
              </svg>
            </button>
          )}
        </>
      )}
      <DropdownMenu>
        <DropdownMenuTrigger>
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
            data-icon="SvgMoreVertical"
            aria-hidden="true"
          >
            <path d="M11 20a1 1 0 11.293.707A1 1 0 0111 20zm0-8a1 1 0 11.293.707A1 1 0 0111 12zm0-8a1 1 0 11.293.707A1 1 0 0111 4z"></path>
          </svg>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
          {isInLibrary[0] ? (
            <DropdownMenuItem onClick={removeFromLibrary}>
              Remove from Your Library
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem onClick={addToLibrary}>
              Add to Your Library
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem>Add to profile</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Report</DropdownMenuItem>
          <DropdownMenuItem>Exclude from your taste profile</DropdownMenuItem>
          <DropdownMenuItem>Move to folder</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Share</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>About recommendations</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Open in Desktop app</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
