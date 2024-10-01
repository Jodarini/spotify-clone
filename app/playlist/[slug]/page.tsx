import { getCurrentUser, getPlaylist } from "@/app/api/spotify/spotify-api";
import PlaylistTemplate from "@/app/components/ui/PlaylistTemplate";

export default async function Page({ params }: { params: { slug: string } }) {
  const currentUser = await getCurrentUser();
  const playlist = await getPlaylist(params.slug, currentUser!.country);

  return <PlaylistTemplate context={playlist} />;
}
