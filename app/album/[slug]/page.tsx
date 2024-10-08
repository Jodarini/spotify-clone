import { getToken } from "@/app/api/clerk/getToken";
import {
  checkUsersSavedAlbums,
  getAlbum,
  getCurrentUser,
} from "@/app/api/spotify/spotify-api";
import AddToUser from "@/app/components/AddToUser";
import ListTopBar from "@/app/components/ListTopBar";
import Track from "@/app/components/track/Track";
import { getMostCommonColor } from "@/app/lib/utils/getCommonColor";
import Image from "next/image";
import Link from "next/link";

export default async function Page({ params }: { params: { slug: string } }) {
  const currentUser = await getCurrentUser();
  const album = await getAlbum(params.slug, currentUser!.country);
  const token = await getToken();
  let isInLibrary: boolean[] = [false];
  if (album) {
    isInLibrary = await checkUsersSavedAlbums(album.id);
  }

  if (!album) {
    return <div>No album found</div>;
  }

  const contextColor = await getMostCommonColor(album.images[0].url);

  return (
    <div
      className="flex flex-col gap-6 overflow-x-hidden overflow-y-scroll p-5"
      style={{
        background: `linear-gradient(to bottom, ${contextColor} 0%, ${contextColor}40 20%, transparent 40%)`,
      }}
    >
      <div className="flex w-full flex-col items-center gap-4 md:flex-row md:items-end">
        {album.images.length > 0 ? (
          <Image
            className="xs:order-2 rounded shadow-md"
            width={224}
            height={224}
            src={album.images[0].url}
            alt={album.name}
          />
        ) : (
          <div className="flex h-40 w-40 items-center justify-center rounded bg-zinc-800">
            <svg
              data-encore-id="icon"
              role="img"
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="gray"
              className="h-12 w-12"
            >
              <path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM1 12C1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11S1 18.075 1 12z"></path>
              <path d="M12 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-4 2a4 4 0 1 1 8 0 4 4 0 0 1-8 0z"></path>
            </svg>
          </div>
        )}
        <div className="xs:order-1 flex flex-col gap-4 w-full">
          <span className="xs:order-2 capitalize">{album.type}</span>
          <h2 className="sm:text:sm xs:order-1 font-bold md:text-xl lg:text-4xl xl:text-5xl 2xl:text-6xl">
            {album.name}
          </h2>
          <div>
            {album.artists.map((artist, idx) => (
              <>
                <Link
                  key={artist.id}
                  href={`../artist/${artist.id}`}
                  className="hover:underline"
                >
                  {artist?.name}
                </Link>
                {idx + 1 < album.artists.length && ", "}
              </>
            ))}
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col text-sm text-zinc-400">
        <div className="flex gap-2 items-center">
          <ListTopBar token={token} playlistUri={album.uri} />
          <AddToUser
            isInLibrary={isInLibrary[0]}
            token={token}
            context={album.id}
          />
        </div>
        <h4 className="text-4xl font-bold text-white">Tracks</h4>
        {album.tracks.items.map((track, index: number) => (
          <Track
            variant="trackOnly"
            token={token}
            key={track.id}
            item={track}
            index={index}
            playlist_uri={album.uri}
          />
        ))}
      </div>
    </div>
  );
}
