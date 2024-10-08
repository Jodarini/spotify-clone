import { pausePlayback, resumePlayback } from "@/app/api/spotify/spotify-api";
import { DeviceContext, PlayerContext } from "@/app/context/appContext";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useContext } from "react";
import Button from "../Button";

function PauseTrackButton({
  token,
  variant,
}: {
  token: string;
  variant?: "GREEN" | "DEFAULT";
}) {
  const { deviceId } = useContext(DeviceContext);

  return (
    <Button
      className={`flex h-8 w-8 items-center justify-center rounded-full ${variant === "GREEN" ? "bg-green hover:bg-light-green hover:scale-105 active:scale-95" : "bg-white hover:scale-105 active:scale-95"} text-black`}
      onClick={(e) => {
        pausePlayback(token, deviceId);
        e.stopPropagation();
      }}
    >
      <Image
        width={32}
        height={32}
        src="/icons/track/pauseBlack.svg"
        alt="Pause"
      />
    </Button>
  );
}

function PlayTrackButton({
  token,
  pagePlaylistURI,
  variant,
}: {
  token: string;
  pagePlaylistURI?: string;
  variant?: "GREEN" | "DEFAULT";
}) {
  const { deviceId } = useContext(DeviceContext);
  return (
    <Button
      className={`flex h-8 w-8 items-center justify-center rounded-full ${variant === "GREEN" ? "bg-green hover:bg-light-green hover:scale-105 active:scale-95" : "bg-white hover:bg-white/80 hover:scale-105 active:scale-95"}`}
      onClick={(e) => {
        !pagePlaylistURI
          ? resumePlayback(token, deviceId)
          : resumePlayback(token, deviceId, 0, pagePlaylistURI);
        e.stopPropagation();
      }}
    >
      <Image
        width={48}
        height={48}
        src="/icons/track/playBlack.svg"
        alt="Play"
      />
    </Button>
  );
}

export default function ResumePausePlaybackButton({
  token,
  pagePlaylistURI,
  variant = "DEFAULT",
}: {
  token: string;
  pagePlaylistURI?: string;
  variant?: "GREEN" | "DEFAULT";
}) {
  let pathname = usePathname();
  pathname = `spotify` + pathname.replaceAll("/", ":");

  const { is_paused, currentTrackContext } = useContext(PlayerContext);

  const pageAndContextURIMatch = pathname === currentTrackContext;

  const showResumeButton =
    is_paused && (pageAndContextURIMatch || !pagePlaylistURI);

  const showPlayButton = pagePlaylistURI && !pageAndContextURIMatch;

  if (showResumeButton) {
    return <PlayTrackButton token={token} variant={variant} />;
  }

  if (showPlayButton) {
    return (
      <PlayTrackButton
        token={token}
        variant={variant}
        pagePlaylistURI={pagePlaylistURI}
      />
    );
  }

  return <PauseTrackButton token={token} variant={variant} />;
}
