"use client";
import { Block, BlockNoteEditor, PartialBlock } from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
// import { useCreateBlockNote } from "@blocknote/react";
import "@blocknote/mantine/style.css";
import { useEffect, useMemo, useState } from "react";
// import CodeBlock from "@tiptap/extension-code-block";
// import HorizontalRule from "@tiptap/extension-horizontal-rule";

const uploadImageToCloud = async (imageUrl) => {
  try {
    const response = await fetch("http://127.0.0.1:5000/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: imageUrl }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    const secureURL = data.url;
    return secureURL;
  } catch (error) {
    console.error("Error:", error);
  }
};

async function uploadFile(file) {
  const body = new FormData();
  body.append("file", file);

  const ret = await fetch("https://tmpfiles.org/api/v1/upload", {
    method: "POST",
    body: body,
  });
  const resultUrl = (await ret.json()).data.url.replace(
    "tmpfiles.org/",
    "tmpfiles.org/dl/"
  );
  console.log("Result URL:", resultUrl);
  const secureURL = await uploadImageToCloud(resultUrl);
  console.log("secureURL front end", secureURL);

  return resultUrl;
}

async function saveToStorage(jsonBlocks) {
  // Save contents to local storage. You might want to debounce this or replace
  // with a call to your API / database.
  localStorage.setItem("editorContent", JSON.stringify(jsonBlocks));
}

async function loadFromStorage() {
  // Gets the previously stored editor contents.
  const storageString = localStorage.getItem("editorContent");
  return storageString ? JSON.parse(storageString) : undefined;
}

export default function EditorPage() {
  const [initialContent, setInitialContent] = useState("loading");

  // Loads the previously stored editor contents.
  useEffect(() => {
    loadFromStorage().then((content) => {
      setInitialContent(content);
    });
  }, []);

  // Creates a new editor instance.
  // We use useMemo + createBlockNoteEditor instead of useCreateBlockNote so we
  // can delay the creation of the editor until the initial content is loaded.
  const editor = useMemo(() => {
    if (initialContent === "loading") {
      return undefined;
    }
    return BlockNoteEditor.create({
      initialContent: initialContent,
      uploadFile: uploadFile,
    });
  }, [initialContent]);
  //   const editor = useCreateBlockNote({
  //     _tiptapOptions: {
  //       extensions: [HorizontalRule, CodeBlock],
  //     },
  //     initialContent: [
  //       {
  //         type: "paragraph",
  //         props: {
  //           textColor: "default",
  //           backgroundColor: "default",
  //           textAlignment: "left",
  //         },
  //         content: [],
  //         children: [],
  //       },
  //     ],
  //   });

  if (editor === undefined) {
    return "Loading content...";
  }

  // Renders the editor instance.
  return (
    <BlockNoteView
      editor={editor}
      theme="light"
      onChange={() => {
        saveToStorage(editor.document);
      }}
    />
  );
}
