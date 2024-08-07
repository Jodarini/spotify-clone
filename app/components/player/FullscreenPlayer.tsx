import {
  pausePlayback,
  resumePlayback,
  skipToNext,
  skipToPrev,
} from "@/app/api/spotify/spotify-api";
import { DeviceContext, PlayerContext } from "@/app/context/appContext";
import { convertMsToTimestamp } from "@/app/lib/utils/convertMsToTimestamp";
import Image from "next/image";
import Link from "next/link";
import React, {
  ChangeEvent,
  Dispatch,
  MouseEvent,
  SetStateAction,
  useContext,
} from "react";

export const FullscreenPlayer = ({
  fullScreen,
  getId,
  setFullScreen,
  handleFullScreen,
  trackPositionInMs,
  handleTrackPosition,
  handleMouseUp,
  token,
}: {
  handleFullScreen: () => void;
  getId: (string: string) => string;
  setFullScreen: Dispatch<SetStateAction<boolean>>;
  token: string;
  isMobile: boolean;
  trackPositionInMs: number;
  setTrackPositionInMs: Dispatch<SetStateAction<number>>;
  handleTrackPosition: (e: ChangeEvent<HTMLInputElement>) => void;
  fullScreen: boolean;
  handleVolume: (e: ChangeEvent<HTMLInputElement>) => void;
  handleMute: () => void;
  handleMouseUp: () => void;
  volume: number;
  isMuted: boolean;
}) => {
  const { deviceId } = useContext(DeviceContext);
  const { is_paused, current_track } = useContext(PlayerContext);

  const handleSetFullScreen = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setFullScreen(false);
  };

  const fullScreenPlayer = fullScreen
    ? `flex flex-col md:h-16 w-full items-center justify-between col-span-full h-screen absolute left-0 top-0 bg-background p-4`
    : `flex h-16 w-full items-center justify-between `;

  return (
    <div onClick={handleFullScreen} className="col-span-full w-full">
      <div className={fullScreenPlayer}>
        {fullScreen && (
          <button onClick={(e) => handleSetFullScreen(e)} className="mr-auto">
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
              data-icon="SvgChevronDown"
              aria-hidden="true"
            >
              <path d="M6 9.1L9 12l3 2.9 3-2.9 3-2.9"></path>
            </svg>
          </button>
        )}
        <div className="flex w-full flex-col items-center justify-center gap-2 ">
          {current_track && (
            <>
              <Image
                src={current_track.album.images[0].url}
                width={500}
                height={500}
                className="size-full rounded"
                alt={current_track.album.name}
              />
              <div className="w-full text-left">
                <Link
                  className="block w-fit"
                  href={`../artist/${getId(current_track.artists[0].uri)}`}
                >
                  <div className="">{current_track.name}</div>

                  <div className="text-zinc-400">
                    {current_track.artists[0].name}
                  </div>
                </Link>
              </div>
            </>
          )}
        </div>
        <div className="flex w-full flex-col items-center justify-center gap-6 overflow-hidden">
          <div className="w-full">
            <div className="flex flex-row items-center gap-1 text-sm text-zinc-400">
              <span>
                {current_track && trackPositionInMs > current_track.duration_ms
                  ? convertMsToTimestamp(current_track.duration_ms)
                  : convertMsToTimestamp(trackPositionInMs)}
              </span>
              <input
                id="default-range"
                onChange={(e) => handleTrackPosition(e)}
                onMouseUp={handleMouseUp}
                type="range"
                min={0}
                max={current_track?.duration_ms}
                step={1000}
                value={trackPositionInMs}
                className="h-1.5 w-full cursor-pointer accent-green "
              />
              {current_track && (
                <span>{convertMsToTimestamp(current_track?.duration_ms)}</span>
              )}
            </div>
          </div>
          <div className="mb-16 flex w-full justify-center gap-16">
            <button
              className="w-12"
              onClick={() => {
                skipToPrev(token);
              }}
            >
              <Image
                width={48}
                height={48}
                src="/icons/track/previousTrack.svg"
                alt="Previous track"
              />
            </button>
            {is_paused ? (
              <button
                className="flex w-12 items-center justify-center rounded-full bg-white text-black"
                onClick={() => {
                  resumePlayback(token, deviceId);
                }}
              >
                <Image
                  width={48}
                  height={48}
                  src="/icons/track/playBlack.svg"
                  alt="Play"
                />
              </button>
            ) : (
              <button
                className="flex w-12 items-center justify-center rounded-full bg-white text-black"
                onClick={() => {
                  pausePlayback(token, deviceId);
                }}
              >
                <Image
                  width={48}
                  height={48}
                  src="/icons/track/pauseBlack.svg"
                  alt="Pause"
                />
              </button>
            )}
            <button
              className="w-12"
              onClick={() => {
                skipToNext(token);
              }}
            >
              <Image
                width={48}
                height={48}
                src="/icons/track/nextTrack.svg"
                alt="Next track"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
