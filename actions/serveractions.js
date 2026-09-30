"use server"

import razorpay from "razorpay";
import Payment from "@/models/Payment";
import connectDb from "@/db/connectDb";
import User from "@/models/User";

const initializeRazorpay = async (amount, tousername, paymentform) => {
    await connectDb()

    const user = await User.findOne({ username: tousername })
    if (!user) {
        throw new Error("Creator not found")
    }

    const instance = new razorpay({
        key_id: user.razorpayId,
        key_secret: user.razorpaySecret,
    });
    let options = {
        amount: parseInt(amount) * 100, // amount in the smallest currency unit
        currency: "INR",
    }
    let order = await instance.orders.create(options)

    await Payment.create({
        name: paymentform.name,
        toUser: user._id,
        orderId: order.id,
        message: paymentform.message,
        amount: order.amount / 100,
        currency: order.currency,
    })
    return {
        id: order.id,
        amount: order.amount,
        currency: order.currency,
        keyId: user.razorpayId,
        keySecret: user.razorpaySecret
    };
}

const fetchUser = async (username) => {
    await connectDb()
    const user = await User.findOne({ username: username })
    if (!user) {
        throw new Error("User not found")
    }
    return JSON.parse(JSON.stringify(user));
}

const fetchUserPayments = async (username) => {
    await connectDb()
    const user = await User.findOne({ username: username })
    if (!user) {
        throw new Error("User not found")
    }
    const payments = (await Payment.find({ toUser: user._id, done: true }).populate('toUser').sort({ amount: -1 })).slice(0, 10);
    return JSON.parse(JSON.stringify(payments));
}

const updateProfile = async (username, formData) => {
    await connectDb()
    const user = await User.findOne({ username: username })
    if (!user) {
        return {message: "User not found"};
    }
    if(formData.email && formData.email !== user.email) {
        return {message: "Email cannot be changed"};
    }
    const existingUser = await User.findOne({ username: formData.username })
    if (existingUser && existingUser._id.toString() !== user._id.toString()) {
        return {message: "Username already exists"};
    }

    user.name = formData.name || user.name
    user.username = formData.username || user.username
    user.profilePic = formData.profilePic || user.profilePic
    user.coverPic = formData.coverPic || user.coverPic
    user.razorpayId = formData.razorpayId || user.razorpayId
    user.razorpaySecret = formData.razorpaySecret || user.razorpaySecret
    await user.save()
    return {message: "Profile updated successfully!"};
}

const checkUserExists = async (username) => {
    await connectDb()
    const user = await User.findOne({ username: username })
    return !!user;
}

export {initializeRazorpay, fetchUserPayments, fetchUser, updateProfile, checkUserExists}