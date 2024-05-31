"use client";
import Image from "next/image";
import Tiptap from "./components/Tiptap";
import MyBlock from "./components/Block";
import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";

export default function Home() {
  // const editor = useCreateBlockNote();

  // Renders the editor instance using a React component.
  return (
    <div>
      <MyBlock></MyBlock>;
    </div>
  );
}
