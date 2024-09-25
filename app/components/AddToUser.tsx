"use client";

import { revalidatePath } from "next/cache";
import {
  removeAlbumforCurrentUser,
  saveAlbumsForCurrentUser,
} from "../api/spotify/spotify-api";
import Button from "./Button";
import { useState } from "react";

export default function AddToUser({
  token,
  context,
  isInLibrary,
}: {
  token: string;
  context: string;
  isInLibrary: boolean;
}) {
  const [inLibrary, setInLibrary] = useState(isInLibrary);
  const removeAlbum = () => {
    removeAlbumforCurrentUser(token, context);
    setInLibrary(false);
  };

  const addAlbum = () => {
    saveAlbumsForCurrentUser(token, context);
    setInLibrary(true);
  };
  return (
    <>
      {inLibrary ? (
        <Button onClick={removeAlbum}>
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
        </Button>
      ) : (
        <Button onClick={addAlbum}>
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
            data-icon="SvgPlusCircle"
            aria-hidden="true"
          >
            <path d="M12 3a9 9 0 11-6.364 2.636A8.972 8.972 0 0112 3zm0 5v8m-4-4h8"></path>
          </svg>
        </Button>
      )}
    </>
  );
}
