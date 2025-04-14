"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

const page = () => {
  const router = useRouter();
  const session = useSession();
  // console.log(session.data);
  // if (!session.data) {
  //   router.push("/signin");
  // }

  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const res = await fetch("/api/document/get-docs");
        const data = await res.json();
        console.log("this is the get doc data", data);
        setDocs(data.documents);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDocs();
  }, []);

  const createDoc = async () => {
    try {
      const res = await fetch("/api/document/create", {
        method: "POST",
      });
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log("heres the type", typeof docs);
  return (
    <div>
      <div>
        <h2>Old Docs</h2>
        <ul>
          {docs &&
            docs.map((doc: any) => (
              <li key={doc.documentId}>
                <a href={`/documents/${doc.documentId}`}>{doc.id}</a>
              </li>
            ))}
        </ul>
      </div>
      <button className="bg-teal-800" onClick={createDoc}>
        Create new Doc
      </button>
    </div>
  );
};

export default page;
