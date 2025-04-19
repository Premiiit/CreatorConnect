import PaymentPage from '@/components/PaymentPage'
import React from 'react'
import { notFound } from 'next/navigation'
import connectDB from '@/db/connectDB'
import User from '@/models/nonameUser'

const Username = async ({ params }) => {
  const check = async () => {
    await connectDB()
    const u = await User.findOne({ username: params.username })
    if (!u) {
      return notFound()
    }
  }
  await check()

  return (<>
    {/* {params.username} */}
    <PaymentPage username={params.username} />
  </>
  )
}

export default Username
