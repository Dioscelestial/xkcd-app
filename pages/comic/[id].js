// import { Link, Image } from "@nextui-org/react";
// import { readdir, readFile } from "fs/promises";

// function Comics2({ lastestComics }) {
//   return (
//     <>
//       {lastestComics.map((comic) => {
//         return (
//           <Link key={comic.id} href={`/comic/${comic.id}`}>
//             <a>
//               <Image
//                 width={550}
//                 height={400}
//                 layout="intrinsic"
//                 objectFit="none"
//                 src={comic.img}
//                 alt={comic.alt}
//               />
//             </a>
//           </Link>
//         );
//       })}
//     </>
//   );
// }
// export async function getStaticProps() {
//   const files = await readdir("./comics");
//   const lastestComicsFiles = files.slice(-100, files.length);

//   const promisesReadFiles = lastestComicsFiles.map(async (file) => {
//     const content = await readFile(`./comics/${file}`, "utf8");
//     return JSON.parse(content);
//   });
//   const lastestComics = await Promise.all(promisesReadFiles);

//   return {
//     props: {
//       lastestComics,
//     },
//   };
// }

// export default Comics2