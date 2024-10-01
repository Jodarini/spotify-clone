import { Album, Playlist } from "@/app/types/spotify";

type PlaylistOrAlbum = Playlist | Album;

export default function isPlaylist(item: PlaylistOrAlbum): item is Playlist {
  return (item as Playlist).collaborative !== undefined;
}
