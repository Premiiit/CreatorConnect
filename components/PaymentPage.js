"use client"

import React, { useEffect, useState } from 'react'
import Script from 'next/script'
import { initiate, fetchpayments, fetchuser } from '@/actions/useractions';
import { useSession } from 'next-auth/-react';
import { useSearchParams } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';
import { useRouter } from 'next/navigation';

const PaymentPage = ({ username }) => {
    const { data: session } = useSession()
    const [paymentform, setpaymentform] = useState({
        name: "",
        message: "",
        amount: "",
    })

    const [currentUser, setCurrentUser] = useState({})
    const [payments, setPayments] = useState([])
    const searchParams = useSearchParams()
    const router = useRouter()

    useEffect(() => {
        getData()

    }, [])

    useEffect(() => {
        if(session && searchParams.get("paymentdone") == "true"){
        toast('Payment has been made', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
            });
        }
        router.push(`/${username}`)
    }
    , [session])
    

    const handleChange = (e) => {
        setpaymentform({ ...paymentform, [e.target.name]: e.target.value })
    }

    const getData = async () => {
        let u = await fetchuser(username)
        setCurrentUser(u)
        let dbpayments = await fetchpayments(username)
        setPayments(dbpayments)
    }

    const pay = async (amount) => {
        // if (!paymentform.amount) {
        //     paymentform.amount = amount
        // }

        let a = await initiate(amount, username, paymentform)
        let orderId = a.id
        var options = {
            "key": process.env.NEXT_PUBLIC_KEY_ID, // Enter the Key ID generated from the Dashboard
            "amount": amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "Yours Truly", //your business name
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "callback_url": "http://localhost:3000/api/razorpay",
            "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                "name": "Gaurav Kumar", //your customer's name
                "email": "gaurav.kumar@example.com",
                "contact": "9000090000" //Provide the customer's phone number for better conversion rates 
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        };
        var rzp1 = new Razorpay(options);
        rzp1.open();
    };
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
            />
            <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

            <div className='text-white relative w-full'>
                <img className="w-full object-cover" style={{ height: '40vh' }} src={currentUser.coverpic} alt="" />
                <div className="profilepic absolute -bottom-16 right-[44%]">
                    <img className='rounded-full' height={165} width={165} src={currentUser.profilepic} alt="" />
                </div>
            </div>
            <div className="info flex justify-center items-center my-16 flex-col gap-1">
                <div className='font-bold text-xl'>@{username}</div>
                <div className='text-slate-400'>Description Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>
                <div className='text-slate-400'>{payments.length} donations . ₹{payments.reduce((a, b) => a + b.amount, 0)/100} raised</div>

                <div className='w-[75%] flex gap-3 m-9'>
                    <div className="supporters bg-slate-900 p-7 rounded-lg w-1/2">
                        <h2 className='font-bold text-lg text-center pb-2'>Supporters</h2>
                        <ul className='mx-2'>
                            {payments.length == 0 && <li>No payments yet</li>}
                            {payments
                                .filter((p) => p.done === true) // Filter payments with done: true
                                .map((p) => (
                                    <li key={p._id} className="p-2 flex items-center">
                                        <img width={44} height={44} src="avatar.gif" alt="Avatar" />
                                        <span>
                                            {p.name} donated <span className="font-bold">₹{Number.parseInt((p.amount) / 100)}</span> with a message "{p.message}" 💖
                                        </span>
                                    </li>
                                ))}

                        </ul>
                    </div>
                    <div className="makepayment bg-slate-900 p-7 rounded-lg w-1/2">
                        <h2 className='font-bold text-lg text-center pb-2'>Make a Payment</h2>
                        <div className='flex flex-col gap-2'>
                            <div>
                                <input onChange={handleChange} value={paymentform.name} name='name' type="text" className='w-full rounded-lg p-3 bg-slate-800' placeholder='Enter Name' />
                            </div>
                            <div>
                                <input onChange={handleChange} value={paymentform.message} name='message' type="text" className='w-full rounded-lg p-3 bg-slate-800' placeholder='Enter Message' />
                            </div>
                            <div className='flex gap-2 items-baseline'>
                                <input onChange={handleChange} value={paymentform.amount} name='amount' type="text" className='w-1/2 rounded-lg p-3 bg-slate-800' placeholder='Enter Amount in paisa' />
                                <button onClick={() => pay(Number.parseInt(paymentform.amount) * 100)} type="button" className="text-white w-1/2 bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Pay</button>
                            </div>
                        </div>

                        <div className='flex gap-2 mt-5 justify-around'>
                            <button onClick={() => pay(1000)} className='rounded-lg p-3 bg-slate-800 w-[100px]'>Pay ₹10</button>
                            <button onClick={() => pay(2000)} className='rounded-lg p-3 bg-slate-800 w-[100px]'>Pay ₹20</button>
                            <button onClick={() => pay(3000)} className='rounded-lg p-3 bg-slate-800 w-[100px]'>Pay ₹30</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PaymentPage
