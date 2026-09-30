"use client"
import Script from 'next/script'
import React, { useState, useEffect } from 'react'
import { initializeRazorpay } from '@/actions/serveractions.js'
import { fetchUser, fetchUserPayments } from '@/actions/serveractions.js'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

const PaymentsPage = ({ username }) => {
    const [paymentForm, setPaymentForm] = useState({ name: '', amount: '', message: '' })
    const [currentUser, setCurrentUser] = useState({ name: '', username: '', profilePic: '', coverPic: '', razorpayId: '', razorpaySecret: '' })
    const [payments, setPayments] = useState([])
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        getUserPayments();
        getUser();

        if (searchParams.get('paymentSuccess') === 'true') {
            toast.success('Payment successful!', {
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
        if (searchParams.get('paymentSuccess') === 'false') {
            toast.error('Payment failed!', {
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
        router.replace(pathname); // Remove query parameters from the URL after showing the toast
    }, []);

    const getUserPayments = async () => {
        try {
            const response = await fetchUserPayments(username);
            setPayments(response);
        } catch (error) {
            console.error('Error fetching user payments:', error);
        }
    }

    const getUser = async () => {
        try {
            const response = await fetchUser(username);
            setCurrentUser(response);
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setPaymentForm({ ...paymentForm, [name]: value })
    }

    const handlePayment = async (amount) => {
        const paymentAmount = Number(amount)
        if (!paymentForm.name || !paymentAmount) {
            return
        }

        const response = await initializeRazorpay(paymentAmount, username, paymentForm);
        const options = {
            "key": response.keyId,
            "amount": response.amount,
            "currency": "INR",
            "name": "Get Me A Chai",
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": response.id,
            "callback_url": `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
            "prefill": {
                "name": paymentForm.name,
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        };
        const rzp1 = new Razorpay(options);
        rzp1.open();

    }
    return (<>
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
        <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
        <Script>
            {``}</Script>

        <div className='cover w-full relative'>
            <img className='object-contain w-full' src={currentUser.coverPic || "https://c10.patreonusercontent.com/4/patreon-media/p/campaign/4842667/452146dcfeb04f38853368f554aadde1/eyJ3IjoxOTIwLCJ3ZSI6MX0%3D/20.gif?token-hash=1Kbnq1kmdaOuXBdeATyNc6HRB1AM8eoyjiAg29yBoF4%3D&token-time=1788480000"} alt="" />
            <div className='absolute left-1/2 -translate-x-1/2 -bottom-16 overflow-hidden border-2 border-white rounded-full'>
                <img width={150} height={150} className='block aspect-square rounded-full object-cover' src={currentUser.profilePic || "/avatar.gif"} alt="" />
            </div>
        </div>
        <div className='info flex flex-col justify-center items-center mt-20 mb-8 gap-1 mx-4 text-center'>
            <div className='text-3xl'>
                @{currentUser.username}
            </div>
            <div className='text-sm text-gray-400'>
                Let's help {currentUser.name} get a chai! Support them by donating and leaving a message.
            </div>
            <div className='text-sm text-gray-400'>
                {payments.length} supporters have donated ₹{payments.reduce((acc, payment) => acc + payment.amount, 0)} so far.
            </div>

        </div>

        <div className="payment md:flex md:flex-row flex-col w-4/5 mx-auto gap-3 justify-center my-8">
            <div className="supporters bg-slate-700 p-5 rounded-lg w-full my-2">
                {/* Show list of all the supporters as leaderboard */}
                <h2 className="text-xl font-bold mb-4">Top 10 Supporters</h2>
                <ul className="mx-1">
                    {payments.length === 0 && <div className="text-gray-400">No supporters yet. Be the first one to support!</div>}
                    {payments.map((payment) => (
                        <li key={payment._id} className="flex gap-2 mb-1 w-full">
                            <img src="avatar.gif" alt="" className="w-12 h-12 rounded-full" />
                            <div className="mt-1">
                                {payment.name} donated <span className="font-bold">₹{payment.amount}</span> with a message "{payment.message}"
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="makePayment bg-slate-700 p-5 rounded-lg w-full my-2">
                <h2 className="text-xl font-bold mb-4">Make Payment</h2>
                <form className="flex flex-col gap-3">
                    <input type="text" value={paymentForm.name} onChange={handleChange} name="name" placeholder="Enter your name" className="p-2 rounded-lg bg-slate-800 text-white" required />
                    <input type="text" value={paymentForm.amount} onChange={handleChange} name="amount" placeholder="Enter amount" className="p-2 rounded-lg bg-slate-800 text-white" />
                    <textarea value={paymentForm.message} onChange={handleChange} name="message" placeholder="Enter message" className="p-2 rounded-lg bg-slate-800 text-white"></textarea>
                    <button type="button" onClick={() => handlePayment(paymentForm.amount)} className="text-white bg-linear-to-br from-green-400 to-blue-600 hover:bg-linear-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5 rounded-md cursor-pointer disabled:opacity-80" disabled={paymentForm.amount < 1 || paymentForm.name.length < 3 || paymentForm.message.length < 3}>Donate</button>
                    Choose from the following amounts:
                    <div className="amounts flex gap-2">
                        <button type="button" className="bg-slate-600 p-2 rounded-lg text-white w-full cursor-pointer" onClick={() => handlePayment(5)}>₹5</button>
                        <button type="button" className="bg-slate-600 p-2 rounded-lg text-white w-full cursor-pointer" onClick={() => handlePayment(10)}>₹10</button>
                        <button type="button" className="bg-slate-600 p-2 rounded-lg text-white w-full cursor-pointer" onClick={() => handlePayment(20)}>₹20</button>
                        <button type="button" className="bg-slate-600 p-2 rounded-lg text-white w-full cursor-pointer" onClick={() => handlePayment(50)}>₹50</button>
                        <button type="button" className="bg-slate-600 p-2 rounded-lg text-white w-full cursor-pointer" onClick={() => handlePayment(100)}>₹100</button>
                    </div>
                </form>
            </div>
        </div>
    </>
    )
}

export default PaymentsPage
