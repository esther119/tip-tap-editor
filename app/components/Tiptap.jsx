"use client";

// import { useEditor, EditorContent } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";

// const Tiptap = () => {
//   const editor = useEditor({
//     extensions: [StarterKit],
//     content: "<p>Hello World! 🌎️</p>",
//   });

//   return <EditorContent editor={editor} />;
// };

// export default Tiptap;
import "../styles.scss";

import Document from "@tiptap/extension-document";
import Dropcursor from "@tiptap/extension-dropcursor";
import Image from "@tiptap/extension-image";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import { EditorContent, useEditor } from "@tiptap/react";
import React from "react";

const Tiptap = () => {
  const editor = useEditor({
    extensions: [Document, Paragraph, Text, Image, Dropcursor],
    content: `
      <p>This is a basic example of implementing images. Drag to re-order.</p>
      <img src="https://placehold.co/600x400" />
      <img src="https://placehold.co/800x400" />
    `,
  });

  const addImage = () => {
    const url = window.prompt("URL");

    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  if (!editor) {
    return null;
  }

  return (
    <div>
      <button onClick={addImage}>add image from URL</button>
      <EditorContent editor={editor} />
    </div>
  );
};
export default Tiptap;
