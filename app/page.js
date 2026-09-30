import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
    <div className="flex justify-center items-center flex-col gap-4 p-8 my-16">
      <div className="md:text-5xl text-4xl font-bold flex items-center justify-center gap-4">Buy Me a Chai <span><Image src="/tea.gif" alt="Chai Icon" width={64} height={64}></Image></span></div>
      <p className="my-2 max-w-2xl text-center">
        A crowdfunding platform for creators to receive support from their fans and followers. Support your favorite creators by buying them a chai!
      </p>
      <div className="flex gap-4">
        <Link href="/login">
        <button type="button" className="text-white bg-linear-to-br from-purple-600 to-blue-500 hover:bg-linear-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5 transition-colors rounded-md cursor-pointer">Start here</button>
        </Link>
        <Link href="/about">
        <button type="button" className="text-white bg-linear-to-br from-purple-600 to-blue-500 hover:bg-linear-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5 transition-colors rounded-md cursor-pointer">Read More</button>
        </Link>
      </div>
      <div className="flex flex-col items-center gap-3 text-sm text-gray-300">
        <p>This is a demo website created by Nishant Kumar.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <a
            href="https://github.com/nishantrana012"
            target="_blank"
            rel="noreferrer"
            className="rounded-md border border-cyan-400 px-4 py-2 font-medium text-cyan-300 transition-colors hover:bg-cyan-400 hover:text-slate-950"
          >
            GitHub Profile
          </a>
          <Link
            href="/nishantrana012"
            className="rounded-md bg-cyan-400 px-4 py-2 font-medium text-slate-950 transition-colors hover:bg-cyan-300"
          >
            View Demo Profile
          </Link>
        </div>
      </div>
    </div>
    <div className="min-h-0.5 bg-gray-100 opacity-20"></div>
    <div className="container mx-auto px-4 my-16">
      <h2 className="text-2xl font-bold text-center mb-12">Your fans can buy you a chai!</h2>
      <div className="flex flex-col md:flex-row md:justify-around gap-12 md:gap-4 my-16">
        <div className="item flex flex-col justify-center items-center space-y-3">  
          <Image src="/man.gif" alt="Creator" width={100} height={100} style={{ borderRadius: '100%', backgroundColor: 'lightgray', padding: '10px' }}></Image>
          <p className="text-lg font-semibold">Your Fans want to help</p>
          <p>Your fans are available to support you!</p>
        </div>
        <div className="item flex flex-col justify-center items-center space-y-3">
          <Image src="/coin.gif" alt="Creator" width={100} height={100} style={{ borderRadius: '100%', backgroundColor: 'lightgray', padding: '10px' }}></Image>
          <p className="text-lg font-semibold">Your Fans want to help</p>
          <p>Your fans are available to support you!</p>
        </div>
        <div className="item flex flex-col justify-center items-center space-y-3">
          <Image src="/group.gif" alt="Creator" width={100} height={100} style={{ borderRadius: '100%', backgroundColor: 'lightgray', padding: '10px' }}></Image>
          <p className="text-lg font-semibold">Your Fans want to help</p>
          <p>Your fans are available to support you!</p>
        </div>
      </div>
    </div>
    <div className="min-h-0.5 bg-gray-100 opacity-20"></div>
    <div className="container mx-auto px-4 flex flex-col justify-center items-center gap-4 my-16">
      <h2 className="text-2xl font-bold text-center mb-8">Learn More</h2>
      <iframe width="420" height="236" src="https://www.youtube.com/embed/ghkxLVK8YQc" title="We&#39;re charity: water. Join us."  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
    </div>
    </>
  );
}
