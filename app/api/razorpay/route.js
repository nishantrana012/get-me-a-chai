import { NextResponse } from 'next/server';
import Payment from '@/models/Payment';
import connectDb from '@/db/connectDb';
import { validatePaymentVerification } from 'razorpay/dist/utils/razorpay-utils';

export async function POST(request) {
    await connectDb();
    const formData = await request.formData();
    const data = Object.fromEntries(formData.entries());
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = data;

    //Check if payment exists
    const payment = await Payment.findOne({ orderId: razorpay_order_id }).populate('toUser');
    if (!payment) {
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/${payment.toUser.username}?paymentSuccess=false`);
    }

    //Validate the payment signature
    const isValidSignature = validatePaymentVerification({"order_id": razorpay_order_id, "payment_id": razorpay_payment_id }, razorpay_signature, payment.toUser.razorpaySecret);

    //Update the payment status based on the signature validation
    if (isValidSignature) {
        payment.done = true;
        await payment.save();
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/${payment.toUser.username}?paymentSuccess=true`);
    } else {
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/${payment.toUser.username}?paymentSuccess=false`);
    }

}