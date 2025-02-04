// export const navLink = [
//   {
//     name: 'Home',
//     href: '/',
//   },
//   {
//     name: 'About',
//     href: '/about',
//   },
//   {
//     name: 'Tools',
//     href: '/tools',
//   },
//   {
//     name: 'Projects',
//     href: '/projects',
//   },
// ];

export default function Footer() {
  return (
    <footer className="mt-auto text-center text-zinc-400 py-5 px-24 border-t border-zinc-800 dark:border-zinc-100">
      <div className="items-center">
        {/* <div className="flex items-center gap-5 mb-5 text-white dark:text-black">
          {navLink.map((link, index) => {
            return (
              <Link
                className="hover:text-cyan-400"
                href={link.href}
                key={index}
                aria-label={link.name}
              >
                {link.name}
              </Link>
            );
          })}
        </div> */}
        <small className=" items-center gap-5 mb-5 text-white dark:text-black">
          &copy; 2025 Harsena Argretya All right reserved.
        </small>
      </div>
    </footer>
  );
}
