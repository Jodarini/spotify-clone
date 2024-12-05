import {
  checkUsersSavedAlbums,
  getAlbum,
  getCurrentUser,
} from "@/app/api/spotify/spotify-api";
import PlaylistTemplate from "@/app/components/ui/PlaylistTemplate";

export default async function Page({ params }: { params: { slug: string } }) {
  const currentUser = await getCurrentUser();
  const album = await getAlbum(params.slug, currentUser!.country);
  let isInLibrary: boolean[] = [false];

  if (!album) {
    return <div>No album found</div>;
  }

  isInLibrary = await checkUsersSavedAlbums(album.id);

  return <PlaylistTemplate context={album} />;
}
