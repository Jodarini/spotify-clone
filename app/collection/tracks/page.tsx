import { getTracks } from "@/app/api/spotify/spotify-api";

export default async function Page() {
  const { items } = await getTracks();
  return (
    <div>
      {items.map(({ track }) => (
        <div key={track.id}>{track.name}</div>
      ))}
    </div>
  );
}
