import { PlayerContext } from "@/app/context/appContext";
import React, { useContext } from "react";
import type { Track } from "../../types/spotify";
import PlayTrackButton from "./PlayTrackButton";
import PauseTrackButton from "./PauseTrackButton";
import isCurrentlyPlaying from "@/app/lib/utils/isCurrentlyPlaying";
import Image from "next/image";

export default function HandleTrack({
  token,
  item,
  isHover,
  index,
  uris,
  playlist_uri,
}: {
  token: string;
  item: Track;
  isHover: boolean;
  index: number;
  uris?: string[];
  playlist_uri?: string;
}) {
  const { is_active, is_paused, current_track } = useContext(PlayerContext);

  const showPlay =
    (isHover && !isCurrentlyPlaying(current_track?.uri, item.uri)) ||
    (isHover && is_active && is_paused);
  const showPause =
    isHover && !is_paused && isCurrentlyPlaying(current_track?.uri, item.uri);
  const showPlaying =
    !isHover && isCurrentlyPlaying(current_track?.uri, item.uri) && !is_paused;
  const showActive =
    !isHover && isCurrentlyPlaying(current_track?.uri, item.uri) && is_paused;
  const showNumber = !showPlay && !showPause && !showPlaying && !showActive;

  return (
    <>
      {showPlay && (
        <PlayTrackButton
          index={index}
          token={token}
          uris={uris}
          playlist_uri={playlist_uri}
          isPlaying={isCurrentlyPlaying(current_track?.uri, item.uri)}
        />
      )}
      {showPause && <PauseTrackButton token={token} />}
      {showPlaying && (
        <Image
          width={24}
          height={24}
          src="/icons/track/playing.svg"
          alt="Playing"
        />
      )}
      {showActive && <span className="text-green">{index + 1}</span>}
      {showNumber && <span>{index + 1}</span>}
    </>
  );
}
