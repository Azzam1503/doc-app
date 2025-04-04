"use client";

import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
import io, { Socket } from "socket.io-client";

// ✅ Dynamically import Quill to prevent SSR issues
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

const MODULES = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["blockquote", "code-block"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    [{ align: [] }],
    ["link", "image", "video"],
    ["clean"],
  ],
};

function Editor({ documentId }: { documentId: string }) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const quillRef = useRef<any>(null); // ✅ Use `any` to avoid type issues

  useEffect(() => {
    const connection = io("http://localhost:4000");
    setSocket(connection);

    return () => {
      connection.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!socket || !quillRef.current) return;

    socket.on("document-update", (delta) => {
      const quill = quillRef.current.getEditor();
      if (quill) {
        quill.updateContents(delta);
      }
    });

    return () => {
      socket.off("document-update");
    };
  }, [socket]);

  const handleChange = (content: string, delta: any, source: string) => {
    if (source !== "user" || !socket) return; // ✅ Ignore system updates
    socket.emit("document-change", delta);
  };

  return (
    <div className="w-[8.5in] mx-auto min-h-[11in] p-4 bg-white">
      {/* ✅ Ensure Quill runs only in the browser */}
      <ReactQuill
        theme="snow"
        modules={MODULES}
        ref={quillRef}
        onChange={(content, delta, source) =>
          handleChange(content, delta, source)
        }
      />
    </div>
  );
}

export default Editor;
