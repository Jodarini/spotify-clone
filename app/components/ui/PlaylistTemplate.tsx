import { checkUsersSavedAlbums, getUser } from "@/app/api/spotify/spotify-api";
import { getMostCommonColor } from "@/app/lib/utils/getCommonColor";
import { Album, Playlist } from "@/app/types/spotify";
import Image from "next/image";
import Track from "../track/Track";
import { getToken } from "@/app/api/clerk/getToken";
import ListTopBar from "../ListTopBar";
import isPlaylist from "@/app/lib/utils/isPlaylist";
import Link from "next/link";

export default async function PlaylistTemplate({
  context,
}: {
  context: Playlist | Album;
}) {
  const token = await getToken();
  const contextColor = await getMostCommonColor(context.images[0].url);
  let owner;
  if (isPlaylist(context)) {
    owner = await getUser(context.owner.id);
  }
  const isInLibrary = await checkUsersSavedAlbums(context.id);

  return (
    <div className="flex flex-col overflow-x-hidden overflow-y-scroll">
      <div
        className="p-5"
        style={{
          background: `linear-gradient(to bottom, ${contextColor} 0%, ${contextColor}80 20%, transparent 100%)`,
        }}
      >
        <div className="flex w-full flex-col items-center gap-4 md:flex-row md:items-end">
          <Image
            className="xs:order-2 rounded shadow"
            width={224}
            height={224}
            src={context.images[0].url}
            alt={context.name}
            priority={true}
          />
          <div className="xs:order-1 flex flex-col gap-4">
            <span className="xs:order-2 capitalize">{context.type}</span>
            <h2 className="sm:text:sm xs:order-1 font-bold md:text-xl lg:text-4xl xl:text-5xl 2xl:text-6xl">
              {context.name}
            </h2>
            <span className="xs:order-3 italic text-gray-400">
              {isPlaylist(context) && context.description}
            </span>
            <div className="flex flex-row gap-2">
              {owner?.images[0] && (
                <Image
                  width={24}
                  height={24}
                  src={owner?.images[0].url}
                  alt={
                    isPlaylist(context)
                      ? context.owner.display_name
                      : context.name
                  }
                  className="max-w-6 rounded-2xl"
                />
              )}
              {isPlaylist(context) ? (
                <span className="font-bold">{context.owner.display_name} </span>
              ) : (
                <Link
                  href={context.artists[0].href}
                  className="font-bold hover:underline"
                >
                  {context.artists[0].name}
                </Link>
              )}
              <span>• {context.tracks.total} songs </span>
            </div>
          </div>
        </div>
        <ListTopBar
          token={token}
          playlistUri={context.uri}
          isInLibrary={isInLibrary}
        />
      </div>
      <div className="flex flex-col w-full text-sm text-zinc-400 p-5">
        <div className="text-zinc-400 grid grid-cols-[24px_minmax(200px,35%)_30%_20%_auto] max-w-full text-sm overflow-hidden gap-x-3 items-center text-left py-1 px-2 rounded max-h-16">
          <span className="w-full text-center">#</span>
          <span>Title</span>
          <span>Album</span>
          <span>Date added</span>
          <span className="justify-self-end pr-4">
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
              data-icon="SvgClock"
              aria-hidden="true"
            >
              <path d="M11.75 2.75a9 9 0 11-6.364 2.636A8.972 8.972 0 0111.75 2.75zm0 5.2v4h4.2"></path>
            </svg>
          </span>
        </div>
        <hr className="mb-4 mt-2 opacity-20" />
        {isPlaylist(context)
          ? context.tracks.items.map((item, index) => (
              <Track
                variant={"all"}
                token={token}
                key={item.track.id + item.track.album.id}
                item={item.track}
                added_at={item.added_at}
                index={index}
                playlist_uri={context.uri}
              />
            ))
          : context.tracks.items.map((track, index: number) => (
              <Track
                variant="trackOnly"
                token={token}
                key={track.id}
                item={track}
                index={index}
                playlist_uri={context.uri}
              />
            ))}
      </div>
    </div>
  );
}
