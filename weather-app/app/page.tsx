import Image from "next/image";
import Link from "next/link"
import SearchForm from "./components/searchForm";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <p>weather app</p>
      <ul>
        <li><Link href="/weather/helsinki">Helsinki</Link></li>
        <li><Link href="/weather/oulu">Oulu</Link></li>
        <li><Link href="/weather/jyvaskyla">Jyväskylä</Link></li>
        <SearchForm />
      </ul>
    </div>
  );
}
