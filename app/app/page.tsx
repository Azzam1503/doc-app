import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      Click <Link href={"/documents/1212"}>here</Link> to go to document
    </div>
  );
}
