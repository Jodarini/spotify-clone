"use client";

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
    <div className="flex justify-between items-center py-4">
      <ResumePausePlaybackButton
        token={token}
        pagePlaylistURI={playlistUri}
        uris={uris}
        variant="GREEN"
      />
    </div>
  );
}
