import React from 'react'
import PaymentsPage from '@/components/PaymentsPage'
import { checkUserExists } from '@/actions/serveractions.js'
import { notFound } from 'next/navigation'

const Profile = async ({ params }) => {
  const { username } = await params

  const userExists = await checkUserExists(username)

  if (!userExists) {
    notFound()
  }

  return (
    <>
      <PaymentsPage username={username} />
    </>
  )
}

export default Profile
