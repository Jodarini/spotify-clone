import {
  getFeaturedPlaylists,
  getRecentlyPlayed,
  getUsersTopItems,
} from "./api/spotify/spotify-api";
import { Item } from "./types/spotify";
import Track from "./components/track/Track";
import { getToken } from "./api/clerk/getToken";
import TrackList from "./components/TrackSourceCard";

export default async function Page() {
  const { items: recentlyPlayed } = await getRecentlyPlayed(6);
  const { items: usersTopArtists } = await getUsersTopItems("artists", 6);
  const { playlists: featuredPlaylists } = await getFeaturedPlaylists(6);
  const token = await getToken();

  const removeDuplicates = (items: Item[]) => {
    const seenItems = new Set();
    const itemsWithoutDuplicates = items.filter((item) => {
      const value = item.track.id;
      if (seenItems.has(value)) {
        return false;
      }
      seenItems.add(value);
      return true;
    });
    return itemsWithoutDuplicates;
  };

  let recentTracks = removeDuplicates(recentlyPlayed);
  let recentTracksUris = recentTracks.map(({ track }) => track.uri);

  return (
    <div className="flex flex-col gap-8 overflow-x-hidden overflow-y-scroll p-5"></div>
  );
}
