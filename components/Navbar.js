"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"

const Navbar = () => {
  const { data: session } = useSession()
  const [showDashboard, setShowDashboard] = useState(false)
  return (
    <>
      <nav className="bg-slate-900 flex items-center justify-between p-3 px-6 sticky top-0 z-50">
        <Link href="/"><div className='text-white text-lg font-bold flex items-center gap-1'><Image src="/tea.gif" alt="Chai Icon" width={40} height={40}></Image> Get Me A Chai!</div></Link>
        <div className='relative'>
          {!session && <Link href="/login">
            <button type="button" className="cursor-pointer text-white bg-linear-to-r from-cyan-500 to-blue-500 hover:bg-linear-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5 rounded-md">Login</button>
          </Link>}
          {
            session && <>
              <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown" onClick={()=>setShowDashboard(!showDashboard)} className="flex items-center justify-center cursor-pointer text-white bg-linear-to-r from-cyan-500 to-blue-500 hover:bg-linear-to-bl dark:focus:ring-cyan-800 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5 rounded-md" type="button">
                Welcome! {session.user.name.split(" ")[0]}
                <svg className="w-4 h-4 ms-1.5 -me-0.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7" /></svg>
              </button>

              <div id="dropdown" className={`z-10 ${!showDashboard && "hidden"} w-44 absolute bg-linear-to-r from-cyan-500 to-blue-500 rounded-md text-white my-4 right-0 cursor-pointer`} onMouseLeave={() => setTimeout(() => {
                setShowDashboard(false)
              }, 500)}>
                <div className='flex w-full justify-between items-center'>
                  <div className='px-2 mt-1'>Menu</div>
                  <button type="button" onClick={() => setShowDashboard(false)} className='border-2 rounded-sm px-2 mt-1 mx-1 cursor-pointer'><img src="/cross-x.svg" alt="Close" className='w-4 h-4 invert ' /></button>
                </div>
                <ul className="p-1 text-sm text-body font-medium" aria-labelledby="dropdownDefaultButton">
                  <li>
                    <hr />
                    <Link href={"/dashboard"} className="inline-flex items-center w-full p-1 hover:text-gray-200 hover:opacity-90">Dashboard</Link>
                  </li>
                  <li>
                    <hr />
                    <Link href={`/${session.user.username}`} className="inline-flex items-center w-full p-1 hover:text-gray-200 hover:opacity-90">Your Page</Link>
                  </li>
                  <li>
                    <hr />
                    <button type="button" onClick={() => signOut({ callbackUrl: "/" })} className="inline-flex items-center w-full p-1 hover:text-gray-200 cursor-pointer hover:opacity-90">Sign out</button>
                  </li>
                </ul>
              </div>
          </>
          }
        </div>
      </nav>
    </>
  )
}

export default Navbar
