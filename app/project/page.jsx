import Link from 'next/link';
import Image from 'next/image';

const projects = [
  {
    name: 'Portfolio 2024',
    description:
      'Modern Portfolio crafted with Next.js 14 & Tailwind CSS. Features dark mode, responsive design, and seamless animations.',
    tech: 'Next.js, Tailwind CSS, Framer Motion',
    url: 'https://www.argretya.my.id',
    logo: '/sena.jpg',
  },
  {
    name: 'Amikom Connect',
    description: 'A powerful social platform built for students.',
    tech: 'React, Node.js, MongoDB, Socket.io',
    url: 'https://amikomconnect.vercel.app',
    logo: '/amikom.png',
  },
  {
    name: 'GoMealSaver',
    description:
      '🏆 Award-Winning Platform - Best Capstone by Dicoding Indonesia. Revolutionizing food waste management with smart solutions.',
    tech: 'Next.js, Server Actions, MongoDB,',
    url: 'https://www.gomealsaver.store/',
    logo: '/gomealsaver.png',
  },
  {
    name: 'GameStation Pro',
    description:
      'Next-gen gaming center management system with real-time monitoring and automated billing.',
    tech: 'C#, .NET, SQL Server, WPF',
    url: 'https://github.com/Anezz12/PsRental',
    logo: '/amikom.png',
  },
];

export default function Page() {
  return (
    <section className="sm:px-8 pt-20 sm:mt-0">
      <div className="relative px-4 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-2xl lg:max-w-2xl">
          <header className="text-4xl font-bold leading-[3rem] sm:leading-normal sm:text-5xl mt-20 text-gray-900 dark:text-gray-100">
            {'Innovative Solutions & Digital Experiences 🚀'}
          </header>
          <p className="text-gray-600 dark:text-gray-400 mx-auto leading-8 mt-10">
            {
              'Passionate Full-Stack Developer crafting cutting-edge web solutions. From award-winning platforms to innovative apps, each project represents a unique challenge conquered. Most projects are open-source - feel free to explore and contribute! ✨'
            }
          </p>
          <ul className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 mt-20 mb-40">
            {projects.map((project) => (
              <li
                key={project.name}
                className="group relative flex flex-col items-start"
              >
                <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white dark:bg-zinc-800 shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:ring-0">
                  <Image
                    src={project.logo}
                    alt={project.name}
                    className="rounded-full"
                    width={48}
                    height={48}
                  />
                </div>
                <h2 className="mt-6 text-base font-semibold text-gray-900 dark:text-gray-100">
                  <div className="absolute -inset-y-6 -inset-x-4 z-0 scale-95 bg-gray-50 dark:bg-zinc-800/50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 sm:-inset-x-6 sm:rounded-2xl"></div>
                  <Link
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="absolute -inset-y-6 -inset-x-4 z-20 sm:-inset-x-6 sm:rounded-2xl"></span>
                    <span className="relative z-10">{project.name}</span>
                  </Link>
                </h2>
                <p className="relative z-10 mt-2 text-sm text-gray-600 dark:text-gray-400">
                  {project.description}
                </p>
                <p className="relative z-10 mt-2 text-xs text-gray-500 dark:text-gray-500">
                  {project.tech}
                </p>
                <p className="relative z-10 mt-6 flex text-sm font-medium text-blue-600 dark:text-blue-400 transition group-hover:text-blue-500">
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="h-6 w-6 flex-none"
                  >
                    <path
                      d="M15.712 11.823a.75.75 0 1 0 1.06 1.06l-1.06-1.06Zm-4.95 1.768a.75.75 0 0 0 1.06-1.06l-1.06 1.06Zm-2.475-1.414a.75.75 0 1 0-1.06-1.06l1.06 1.06Zm4.95-1.768a.75.75 0 1 0-1.06 1.06l1.06-1.06Zm3.359.53-.884.884 1.06 1.06.885-.883-1.061-1.06Zm-4.95-2.12 1.414-1.415L12 6.344l-1.415 1.413 1.061 1.061Zm0 3.535a2.5 2.5 0 0 1 0-3.536l-1.06-1.06a4 4 0 0 0 0 5.656l1.06-1.06Zm4.95-4.95a2.5 2.5 0 0 1 0 3.535L17.656 12a4 4 0 0 0 0-5.657l-1.06 1.06Zm1.06-1.06a4 4 0 0 0-5.656 0l1.06 1.06a2.5 2.5 0 0 1 3.536 0l1.06-1.06Zm-7.07 7.07.176.177 1.06-1.06-.176-.177-1.06 1.06Zm-3.183-.353.884-.884-1.06-1.06-.884.883 1.06 1.06Zm4.95 2.121-1.414 1.414 1.06 1.06 1.415-1.413-1.06-1.061Zm0-3.536a2.5 2.5 0 0 1 0 3.536l1.06 1.06a4 4 0 0 0 0-5.656l-1.06 1.06Zm-4.95 4.95a2.5 2.5 0 0 1 0-3.535L6.344 12a4 4 0 0 0 0 5.656l1.06-1.06Zm-1.06 1.06a4 4 0 0 0 5.657 0l-1.061-1.06a2.5 2.5 0 0 1-3.535 0l-1.061 1.06Zm7.07-7.07-.176-.177-1.06 1.06.176.178 1.06-1.061Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                  <span className="ml-2">
                    {project.url.replace(/^https?:\/\//, '')}
                  </span>
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
