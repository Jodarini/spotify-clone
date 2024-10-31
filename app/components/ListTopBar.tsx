"use client";

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
  console.log(isInLibrary);
  const addToLibrary = async () => {
    const contextId = playlistUri.split(":").splice(2);
    const res = await saveAlbumsForCurrentUser(token, contextId[0]);
    console.log(res);
  };

  const removeFromLibrary = async () => {
    const contextId = playlistUri.split(":").splice(2);
    const res = await removeAlbumforCurrentUser(token, contextId[0]);
    console.log(res);
  };

  return (
    <div className="flex items-center gap-4 py-4">
      <ResumePausePlaybackButton
        token={token}
        pagePlaylistURI={playlistUri}
        uris={uris}
        variant="GREEN"
      />
      <DropdownMenu>
        <DropdownMenuTrigger>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
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
          <DropdownMenuItem>Add to queue</DropdownMenuItem>
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
