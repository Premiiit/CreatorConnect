import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (<>
    <div className="flex flex-col justify-center items-center h-[43vh] text-white p-5 gap-5">
      <h1 className="text-5xl ">
        BAKA😳😳
      </h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis numquam illum amet quasi nulla minus soluta modi doloribus atque. Amet, vero. Rem, hic!</p>
      <div>
        <Link href={"/login"}>
        <button type="button" className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Start Now!</button>
        </Link>
        <Link href={"/about"}>
        <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Read More          </span>
        </button>
        </Link>
      </div>
    </div>

    <div className="bg-white h-1 opacity-10"></div>

    <div className="text-white container mx-auto">
      <h2 className="flex justify-center text-lg my-10 font-bold">Discover premium, handpicked anime merchandise.</h2>
      <div className="flex justify-around mb-6">
        <div className="flex flex-col space-y-3 m-5 items-center justify-center">
          <div className="font-bold">Fund your Projects</div>
          <img className="bg-gray-400 rounded-full p-2" width={100} src="man.gif" alt="" /><span>fans want to help you</span>
        </div>
        <div className="flex flex-col space-y-3 m-5 items-center justify-center">
          <div className="font-bold">Fund your Projects</div>
          <img className="bg-gray-400 rounded-full p-2" width={100} src="coin.gif" alt="" /><span>fans want to help you</span>
        </div>
        <div className="flex flex-col space-y-3 m-5 items-center justify-center">
          <div className="font-bold">Fund your Projects</div>
          <img className="bg-gray-400 rounded-full p-2" width={100} src="group.gif" alt="" /><span>fans want to help you</span>
        </div>
      </div>
    </div>

    <div className="bg-white h-1 opacity-10"></div>

    <div className="text-white container mx-auto">
      <h2 className="flex justify-center text-lg my-10 font-bold">Learn more about us</h2>
      <div className="flex justify-center pb-10">
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/pge4IvwQFA8?si=LTPvj0vm7EQjuVU7"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  </>
  );
}
