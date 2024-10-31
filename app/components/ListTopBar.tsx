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

export default function ListTopBar({
  playlistUri,
  token,
  uris,
}: {
  playlistUri?: string;
  uris?: string[];
  token: string;
}) {
  return (
    <div className="flex gap-4 items-center py-4">
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
          <DropdownMenuItem>Remove from Your Library</DropdownMenuItem>
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
