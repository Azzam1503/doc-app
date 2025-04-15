"use client";

import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
import io, { Socket } from "socket.io-client";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";

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

function Editor() {
  const { documentId } = useParams();
  const [socket, setSocket] = useState<Socket | null>(null);
  const quillRef = useRef<any>(null);
  const [enable, setEnable] = useState(false);
  const [quillReady, setQuillReady] = useState(false);
  const { data: session } = useSession();
  console.log(session);

  useEffect(() => {
    if (!session?.user?.jwt) return;

    const connection = io("http://localhost:4000", {
      auth: {
        token: session.user.jwt,
      },
    });

    connection.on("connect", () => {
      console.log("✅ Connected to socket server");
      console.log("🔗 Socket ID:", connection.id);
    });

    setSocket(connection);

    return () => {
      connection.disconnect();
    };
  }, [session]);

  useEffect(() => {
    if (!socket) return;

    socket.on("receive-changes", (delta) => {
      console.log(delta);
      const quill = quillRef.current;
      if (quill) {
        quill.updateContents(delta);
      }
    });

    return () => {
      socket.off("receive-changes");
    };
  }, [socket]);

  useEffect(() => {
    if (!socket || !quillReady) return;
    socket.once("load-document", (document) => {
      console.log(document);
      const quill = quillRef.current;
      if (quill) {
        quillRef.current.setContents(document);
      }
    });
    socket.emit("get-document", documentId);
  }, [socket, quillReady, documentId]);

  const saveDoc = () => {
    console.log(quillRef.current.getContents());
    if (!socket) return;
    socket.emit("save-document", documentId, quillRef.current.getContents());
  };

  const handleChange = (content: string, delta: any, source: string) => {
    if (source !== "user" || !socket) return;
    socket.emit("document-change", delta);
  };

  return (
    <div className="w-[8.5in] mx-auto min-h-[11in] p-4 bg-white">
      <ReactQuill
        theme="snow"
        modules={MODULES}
        ref={(el: any) => {
          if (el && !quillReady) {
            quillRef.current = el.getEditor();
            setQuillReady(true);
          }
        }}
        onChange={(content, delta, source) =>
          handleChange(content, delta, source)
        }
      />
      <button onClick={saveDoc} className="bg-green-600 p-2 rounded mt-2">
        Save content
      </button>
    </div>
  );
}

export default Editor;
