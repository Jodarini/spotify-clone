'use client'
import { useContext } from "react";
import { PlayerContext } from "../context/appContext";
import Link from "next/link";

export default function Player({ className }: { className: string }) {
  const { player, is_active, is_paused, current_track } = useContext(PlayerContext)
  const getId = (string: string) => {
    const id = string.split(':')
    return id[id.length - 1]
  }

  return (
    <div className={`flex h-16 w-full items-center justify-between ${className}`} >
      <div className="flex gap-2 items-center w-1/3">
        {current_track &&
          <>
            <img src={current_track.album.images[current_track.album.images.length - 1].url} className="now-playing__cover size-12 rounded" alt={current_track.album.name} />
            <Link href={`../artist/${getId(current_track.artists[0].uri)}`} className="now-playing__side">
              <div className="now-playing__name">
                {current_track.name}
              </div>

              <div className="now-playing__artist text-xs text-gray-400">
                {current_track.artists[0].name}
              </div>
            </Link>
          </>
        }
      </div>
      <div className="flex items-center justify-center gap-4 w-1/3">
        <button className="btn-spotify" onClick={() => { player?.previousTrack() }} >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" stroke="currentColor" fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" viewBox="0 0 24 24" data-icon="SvgSkipBack" aria-hidden="true"><path d="M17.767 19.664a1 1 0 001.633-.774V5.11a1 1 0 00-1.633-.774L13.9 7.5l-4.554 3.726a1 1 0 000 1.548L13.9 16.5zM4.6 21V3"></path></svg>
        </button>

        <button className="btn-spotify" onClick={() => { player?.togglePlay() }} >
          {is_paused ?
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" stroke="currentColor" fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" data-icon="SvgPlayCircle" aria-hidden="true"><path d="M15.149 12.418a.582.582 0 000-.9L12.5 9.351l-2.247-1.839a.581.581 0 00-.949.45v8.012a.581.581 0 00.949.449l2.247-1.839zM21 12a9 9 0 11-9-9 9 9 0 019 9z"></path></svg> :
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" stroke="#0a0a0a" fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" data-icon="SvgPauseCircle" aria-hidden="true"><path d="M21 12a9 9 0 11-9-9 9 9 0 019 9zm-6.955 3.409V8.864m-3.818 6.545V8.864"></path></svg>
          }
        </button>
        <button className="btn-spotify" onClick={() => { player?.nextTrack() }} >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" stroke="currentColor" fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" viewBox="0 0 24 24" data-icon="SvgSkipForward" aria-hidden="true"><path d="M14.4 12.524a1 1 0 000-1.548L9.85 7.25 5.983 4.086a1 1 0 00-1.633.774v13.78a1 1 0 001.633.774L9.85 16.25zm4.75-9.774v18"></path></svg>
        </button>
      </div>
      <div className="w-1/3"></div>
    </div >
  )
}

