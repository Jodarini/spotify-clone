"use client";

import { removeAlbumforCurrentUser } from "../api/spotify/spotify-api";
import Button from "./Button";

export default function AddToUser({
  token,
  context,
}: {
  token: string;
  context: string;
}) {
  return (
    <Button onClick={() => removeAlbumforCurrentUser(token, context)}>
      akldsjflaksdjf
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        data-icon="SvgCheckCircle"
        aria-hidden="true"
      >
        <path d="M8.5 13.1l1.05.95 1.05.95 2.45-3 2.45-3M12 3a9 9 0 11-6.364 2.636A8.972 8.972 0 0112 3z"></path>
      </svg>
      WTJASKDJFKASDJFKASJDF
    </Button>
  );
}
