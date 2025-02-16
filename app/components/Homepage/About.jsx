import Social from './Social';
import Image from 'next/image';

export default function About() {
  return (
    <section className="sm:px-8 pt-2 md:pt-36 sm:mt-0">
      <div className="mx-auto max-w-7xl lg:px-8">
        <div className="relative px-4 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-2xl lg:max-w-5xl">
            <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
              <div className="lg:pl-20">
                <div className="max-w-xs px-2.5 lg:max-w-none">
                  <Image
                    width={300}
                    height={1000}
                    src="/avatar.jpeg"
                    alt="Gambar"
                    className="aspect-square rotate-3 rounded-2xl items-center mt-20"
                  />
                </div>
              </div>
              <div className="lg:order-first lg:row-span-2">
                <h1 className="text-4xl font-bold leading-[3rem] sm:leading-normal sm:text-5xl text-black dark:text-white">
                  I'm{' '}
                  <span className="underline decoration-blue-500 decoration-2">
                    Harsena Argretya
                  </span>
                  , an indonesia Developer Living in{' '}
                  <span className="underline decoration-blue-500 decoration-2">
                    Yogyakarta ID
                  </span>
                  .
                </h1>
                <div className="mx-auto text-zinc-600 dark:text-zinc-400 leading-8 mt-10 mb-20">
                  <p>
                    Hello I am Sena. a self-taught Indonesian programmer. since
                    2022, I've been learning programming. Now a{' '}
                    <span className="underline decoration-blue-500 decoration-2">
                      software engineering student
                    </span>{' '}
                    with more web development experience.
                  </p>
                  <br />
                  <p>
                    I'am a{' '}
                    <span className="underline decoration-blue-500 decoration-2">
                      5th semester student
                    </span>{' '}
                    majoring in{' '}
                    <span className="underline decoration-blue-500 decoration-2">
                      Informatics
                    </span>
                    👨🏻‍💻, I decided to pursue my passion for programming. I
                    studied{' '}
                    <span className="underline decoration-blue-500 decoration-2">
                      full-stack web development
                    </span>
                    . My favorite part of programming is the problem-solving
                    aspect🔥
                  </p>
                  <br />
                  <p>
                    I love the feeling of finally figuring out a solution to a
                    problem. My core stack is{' '}
                    <span className="underline decoration-blue-500 decoration-2">
                      React, Next.js, Node.js, MYSQL and MongoDB
                    </span>
                    . I'am also familiar with{' '}
                    <span className="underline decoration-blue-500 decoration-2">
                      Javascript
                    </span>{' '}
                    and I'am starting to learn{' '}
                    <span className="underline decoration-blue-500 decoration-2">
                      Typescript
                    </span>{' '}
                    as well. I'am always looking to learn new technologies. I'am
                    currently studying to develop my potential.
                  </p>
                  <br />
                  <p>
                    When I'm not coding, I enjoy playing{' '}
                    <span className="underline decoration-blue-500 decoration-2">
                      video games
                    </span>
                    ⚔️, watching movies🍿. I also enjoy learning new things. I
                    am currently learning about history I'm also learning how to
                    use{' '}
                    <span className="underline decoration-blue-500 decoration-2">
                      Linux OS 🐧
                    </span>
                    .
                  </p>
                </div>
              </div>
              <div className="lg:pl-20">
                <Social />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
