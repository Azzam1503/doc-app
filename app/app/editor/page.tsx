"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

const MODULES = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    ["blockquote", "code-block"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    [{ align: [] }],
    ["link", "image", "video"],
    ["clean"],
  ],
};

function MyComponent() {
  const [value, setValue] = useState("");

  return (
    <div className="w-[8.5in] mx-auto min-h-[11in] p-4 bg-white">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        modules={MODULES}
      />
    </div>
  );
}

export default MyComponent;
