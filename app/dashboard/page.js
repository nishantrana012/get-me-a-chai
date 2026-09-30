"use client"
import React from 'react';
import { useEffect, useState } from 'react'
import { useSession } from "next-auth/react"
import { redirect, RedirectType } from "next/navigation";
import { fetchUser, updateProfile } from '@/actions/serveractions.js'
import { ToastContainer, toast, Bounce } from 'react-toastify';

const Dashboard = () => {
  const { data: session, status } = useSession()
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    profilePic: "",
    coverPic: "",
    razorpayId: "",
    razorpaySecret: "",
  })

  useEffect(() => {
    if (!session?.user) return
    getUserData()

  }, [session])

  if (status === "loading")
    return <div>Loading...</div>

  if (status === "unauthenticated")
    redirect("/login", RedirectType.replace)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((currentData) => ({ ...currentData, [name]: value }))
  }

  const getUserData = async () => {
    let response = await fetchUser(session.user.username)
    setFormData({
      name: response.name ?? "",
      username: response.username ?? "",
      email: response.email ?? "",
      profilePic: response.profilePic ?? "",
      coverPic: response.coverPic ?? "",
      razorpayId: response.razorpayId ?? "",
      razorpaySecret: response.razorpaySecret ?? "",
    })
  }

  const handleSubmit = async () => {
    let response = await updateProfile(session.user.username, formData)
    toast(response.message, {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <div className='max-w-3xl mx-auto px-4 py-10'>
        <h1 className='text-3xl font-bold text-center mb-8'>Welcome to your Dashboard</h1>
        <form action={handleSubmit} className='bg-slate-700 rounded-lg p-6 flex flex-col gap-5'>
          <div className='flex flex-col gap-2'>
            <label className='flex flex-col gap-2'>
              Name
              <input name='name' value={formData.name} onChange={handleChange} type='text' placeholder='Your name' required className='p-3 rounded-lg bg-slate-800' />
            </label>
            <label className='flex flex-col gap-2'>
              Username
              <input name='username' value={formData.username} onChange={handleChange} type='text' placeholder='your-username' required className='p-3 rounded-lg bg-slate-800' />
            </label>
            <label className='flex flex-col gap-2'>
              Email
              <input name='email' value={formData.email} onChange={handleChange} type='email' placeholder='you@example.com' required className='p-3 rounded-lg bg-slate-800' />
            </label>
            <label className='flex flex-col gap-2'>
              Profile picture URL
              <input name='profilePic' value={formData.profilePic} onChange={handleChange} type='url' placeholder='https://...' className='p-3 rounded-lg bg-slate-800' />
            </label>
            <label className='flex flex-col gap-2'>
              Cover picture URL
              <input name='coverPic' value={formData.coverPic} onChange={handleChange} type='url' placeholder='https://...' className='p-3 rounded-lg bg-slate-800' />
            </label>
            <label className='flex flex-col gap-2'>
              Razorpay ID
              <input name='razorpayId' value={formData.razorpayId} onChange={handleChange} type='text' placeholder='rzp_...' className='p-3 rounded-lg bg-slate-800' />
            </label>
          </div>
          <label className='flex flex-col gap-2'>
            Razorpay secret
            <input name='razorpaySecret' value={formData.razorpaySecret} onChange={handleChange} type='password' placeholder='Enter your Razorpay secret' className='p-3 rounded-lg bg-slate-800' />
          </label>
          <button type='submit' className='bg-green-500 hover:bg-green-600 rounded-lg px-4 py-3 font-semibold cursor-pointer' >Save profile</button>
        </form>
      </div>
    </>
  )
}

export default Dashboard