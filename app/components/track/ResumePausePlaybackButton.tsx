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
  uris,
}: {
  token: string;
  pagePlaylistURI?: string;
  uris?: string[];
  variant?: "GREEN" | "DEFAULT";
}) {
  const { deviceId } = useContext(DeviceContext);

  const handlePlay = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!pagePlaylistURI && !uris) {
      resumePlayback(token, deviceId);
    } else if (pagePlaylistURI) {
      resumePlayback(token, deviceId, 0, pagePlaylistURI);
    } else if (uris) {
      resumePlayback(token, deviceId, 0, undefined, uris);
    }

    e.stopPropagation();
  };
  return (
    <Button
      className={`flex h-8 w-8 items-center justify-center rounded-full ${variant === "GREEN" ? "bg-green hover:bg-light-green hover:scale-105 active:scale-95" : "bg-white hover:bg-white/80 hover:scale-105 active:scale-95"}`}
      onClick={(e) => handlePlay(e)}
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
  uris,
  variant = "DEFAULT",
}: {
  token: string;
  pagePlaylistURI?: string;
  uris?: string[];
  variant?: "GREEN" | "DEFAULT";
}) {
  let pathname = usePathname();
  pathname = `spotify` + pathname.replaceAll("/", ":");

  const { is_paused, currentTrackContext } = useContext(PlayerContext);

  let pageAndContextURIMatch =
    pathname === currentTrackContext ||
    (pathname === "spotify:collection:tracks" && currentTrackContext === "");

  const showPlayButton =
    ((pagePlaylistURI || uris) && !pageAndContextURIMatch) ||
    (is_paused &&
      pathname === "spotify:collection:tracks" &&
      currentTrackContext !== "");

  if (showPlayButton) {
    return (
      <PlayTrackButton
        token={token}
        variant={variant}
        pagePlaylistURI={pagePlaylistURI}
        uris={uris}
      />
    );
  }

  const showResumeButton =
    is_paused && (pageAndContextURIMatch || !pagePlaylistURI || !uris);

  if (showResumeButton) {
    return <PlayTrackButton token={token} variant={variant} />;
  }

  return <PauseTrackButton token={token} variant={variant} />;
}
