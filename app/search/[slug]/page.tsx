import { getToken } from "@/app/api/clerk/getToken";
import { search } from "@/app/api/spotify/spotify-api";
import TrackList from "@/app/components/TrackSourceCard";
import Track from "@/app/components/track/Track";
import Link from "next/link";
import Image from "next/image";

export default async function Page({ params }: { params: { slug: string } }) {
  const searchQuery = await search(params.slug, undefined, 4);
  const token = await getToken();

  if (!searchQuery) return <div>No results found</div>;

  const uris = searchQuery.tracks?.items.map((item) => item.uri);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 lg:flex-row">
        <div className="flex min-w-[40%] flex-col gap-4">
          <h3 className="text-2xl font-bold">Top Result</h3>
          {searchQuery.artists && (
            <Link
              href={`/artist/${searchQuery.artists.items[0].id}`}
              className="flex h-full flex-col items-stretch justify-around gap-4 rounded bg-zinc-800/50 p-4"
            >
              <Image
                className="rounded-full"
                width={112}
                height={112}
                src={searchQuery.artists.items[0].images[0].url}
                alt={searchQuery.artists.items[0].name}
              />
              <div className="flex flex-col gap-1">
                <span className="overflow-hidden text-ellipsis whitespace-nowrap text-2xl font-bold">
                  {searchQuery.artists.items[0].name}
                </span>
                <span className="text-gray-400">
                  {searchQuery.artists.items[0].type}
                </span>
              </div>
            </Link>
          )}
        </div>
        <div className="flex w-full flex-col gap-4">
          <h3 className="text-2xl font-bold">Songs</h3>
          <div className="flex flex-col gap-2">
            {searchQuery.tracks &&
              searchQuery?.tracks.items.map((track, index) => (
                <Track
                  token={token}
                  key={track.id}
                  item={track}
                  index={index}
                  uris={uris}
                  variant="trackOnly"
                />
              ))}
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-bold">Albums</h3>
        {searchQuery.albums && <TrackList list={searchQuery.albums.items} />}
      </div>

      <div>
        <h3 className="text-2xl font-bold">Artists</h3>

        {searchQuery.artists && <TrackList list={searchQuery.artists.items} />}
      </div>
    </div>
  );
}
