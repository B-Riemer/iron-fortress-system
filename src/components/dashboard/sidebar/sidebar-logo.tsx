import Link from "next/link";

export function SidebarLogo() {
  return (
    <Link
      href="/"
      className="block border-b border-zinc-800 px-6 py-6"
    >
      <h1 className="font-mono text-xl font-bold uppercase tracking-wider text-zinc-200">
        IRON FORTRESS
      </h1>
    </Link>
  );
}

