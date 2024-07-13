import { getFeaturedPlaylists, getRecentlyPlayed, getUsersTopItems } from "./api/spotify/spotify-api";
import { Artist, Item, Playlist } from "./types/spotify";
import Link from "next/link";
import Track from "./components/track/Track";
import { getToken } from "./api/clerk/getToken";

export default async function Page() {
  const recentlyPlayed = await getRecentlyPlayed(6).then(data => data.items)
  const usersTopArtists = await getUsersTopItems('artists', 6).then(data => data.items)
  const featuredPlaylist = await getFeaturedPlaylists(6).then(data => data.playlists)
  const token = await getToken()
  let uris = ['']

  const removeDuplicates = (items: Item[]) => {
    const seenItems = new Set()
    const itemsNoDup = items.filter(item => {
      const value = item.track.id
      if (seenItems.has(value)) {
        return false
      }
      seenItems.add(value)
      return true
    })
    uris = itemsNoDup.map(item => item.track.uri)
    return itemsNoDup
  }

  return (
    <div className="overflow-y-scroll overflow-x-hidden gap-8 flex flex-col">
      <section className="flex flex-col gap-4 ">
        <h3 className="text-2xl font-bold">Recently played tracks</h3>
        <div className="grid grid-cols-2 gap-4 xl:grid-cols-3">
          {removeDuplicates(recentlyPlayed).map((item, index) => (
            <Track token={token} key={item.track.id} item={item.track} index={index} uris={uris} variant="trackOnly" />
          ))}
        </div>
      </section>
      <section className="flex flex-col gap-4 ">
        <h3 className="text-2xl font-bold">Your favorite artists</h3>
        {(usersTopArtists.length < 1) ? <div className="text-xs italic">You dont have favorite artists yet</div> :
          <div style={{ scrollbarWidth: 'none' }} className="flex flex-row gap-4 overflow-x-scroll">
            {usersTopArtists.map((artist: Artist) => (
              <Link href={`/artist/${artist.id}`} key={artist.id} className="flex flex-col items-start gap-2 p-2 rounded hover:bg-gray-50/10">
                <img src={artist.images[1].url} className="min-w-[11rem] max-w-[11rem] ratio aspect-square rounded" alt={artist.name} />
                <div className="flex flex-col">
                  <p className="w-full font-bold text-sm">
                    {artist.name}
                  </p>
                  <p className="w-full text-sm text-zinc-400">
                    {artist.type}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        }
      </section>
      <section className="flex flex-col gap-4">
        <h3 className="text-2xl font-bold">Featured playlists</h3>
        <div style={{ scrollbarWidth: 'none' }} className="flex flex-row gap-4 w-full overflow-x-scroll">
          {featuredPlaylist.items.map((playlist: Playlist) => (
            <Link href={`/playlist/${playlist.id}`} key={playlist.id} className="flex flex-col items-start gap-2 p-2 rounded hover:bg-gray-50/10">
              <img src={playlist.images[0].url} className="min-w-[11rem] max-w-[11rem] ratio aspect-square rounded" alt={playlist.name} />
              <div className="flex flex-col">
                <p className="w-full font-bold text-sm whitespace-nowrap text-ellipsis">
                  {playlist.name}
                </p>
                <p className="w-full text-sm text-zinc-400">
                  {playlist.type}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
