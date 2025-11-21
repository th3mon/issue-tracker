import Link from "next/link";
import { GiBugNet } from "react-icons/gi";

const NavBar = () => {
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];

  return (
    <nav className="flex gap-5 border-b mb-5 px-5 h-14 items-center">
      <Link className="hover:text-zinc-500 transition-colors" href="/">
        <GiBugNet />
      </Link>
      <ul className="flex gap-5">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              className="text-zinc-400 hover:text-zinc-500 transition-colors"
              href={link.href}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
