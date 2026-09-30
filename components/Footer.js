import React from 'react'

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <>
        <footer className="bg-slate-900 p-4 px-6 flex justify-center items-center">
            <p className="text-white text-sm">&copy; {currentYear} Get Me A Chai - All rights reserved.</p>
        </footer>
    </>
  )
}

export default Footer
