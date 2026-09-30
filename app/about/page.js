import Image from 'next/image'
import Link from 'next/link'

const About = () => {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12 md:py-20">
      <section className="flex flex-col items-center text-center">
        <Image src="/tea.gif" alt="A cup of chai" width={100} height={100} />
        <p className="mt-6 text-sm text-cyan-300">About this project</p>
        <h1 className="mt-2 text-4xl font-bold text-white md:text-5xl">Get Me A Chai</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
          This is a personal project built around a simple idea: people should be able to support creators with a small contribution and a kind message.
        </p>
        <div className="mt-7 flex gap-3">
          <Link href="/" className="rounded-md bg-cyan-400 px-4 py-2 font-semibold text-slate-950 hover:bg-cyan-300">Home</Link>
          <Link href="/login" className="rounded-md border border-white/20 px-4 py-2 font-semibold text-white hover:border-cyan-300">Try it</Link>
        </div>
      </section>

      <section className="mt-16 border-y border-white/10 py-12">
        <h2 className="text-2xl font-bold text-white">How it works</h2>
        <div className="mt-8 grid gap-8 md:grid-cols-3">
          <div>
            <Image src="/man.gif" alt="Creator" width={72} height={72} className="rounded-full bg-slate-700 p-2" />
            <h3 className="mt-4 font-semibold text-white">Create a page</h3>
            <p className="mt-2 leading-7 text-slate-400">Creators can add their details and share their page with supporters.</p>
          </div>
          <div>
            <Image src="/coin.gif" alt="Contribution" width={72} height={72} className="rounded-full bg-slate-700 p-2" />
            <h3 className="mt-4 font-semibold text-white">Choose an amount</h3>
            <p className="mt-2 leading-7 text-slate-400">Supporters choose how much they want to contribute through Razorpay.</p>
          </div>
          <div>
            <Image src="/group.gif" alt="Community" width={72} height={72} className="rounded-full bg-slate-700 p-2" />
            <h3 className="mt-4 font-semibold text-white">Stay connected</h3>
            <p className="mt-2 leading-7 text-slate-400">A short message can make a contribution feel more personal.</p>
          </div>
        </div>
      </section>

      <section className="grid gap-10 py-12 md:grid-cols-2">
        <div>
          <h2 className="text-2xl font-bold text-white">Why I made it</h2>
          <p className="mt-4 leading-8 text-slate-300">
            I wanted to build a small, practical application that connects creators with the people who enjoy their work. It also gave me a place to practise authentication, payments, database operations, and building pages with Next.js.
          </p>
          <div className="mt-6 flex items-center gap-4">
            <Image src="/avatar.gif" alt="Supporter avatar" width={64} height={64} className="rounded-full bg-slate-700 p-2" />
            <p className="text-slate-400">Built for creators and chai lovers.</p>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Tech stack</h2>
          <ul className="mt-4 space-y-3 text-slate-300">
            <li className="border-b border-white/10 pb-3"><span className="font-semibold text-white">Next.js</span> and React for the application</li>
            <li className="border-b border-white/10 pb-3"><span className="font-semibold text-white">Tailwind CSS</span> for the styling</li>
            <li className="border-b border-white/10 pb-3"><span className="font-semibold text-white">MongoDB and Mongoose</span> for storing users and payments</li>
            <li className="border-b border-white/10 pb-3"><span className="font-semibold text-white">NextAuth.js</span> for authentication</li>
            <li><span className="font-semibold text-white">Razorpay</span> for payments</li>
          </ul>
        </div>
      </section>

      <section className="border-t border-white/10 pt-10 text-center">
        <Image src="/tea.gif" alt="Chai" width={48} height={48} className="mx-auto" />
        <p className="mt-4 text-slate-400">Thanks for visiting this project.</p>
      </section>
    </main>
  )
}

export default About

export const metadata = {
  title: 'About - Get Me A Chai',
  description: 'Learn more about Get Me A Chai, a crowdfunding platform for creators to receive support from their fans and followers.',
}