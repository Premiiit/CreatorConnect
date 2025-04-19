"use server"

import Razorpay from "razorpay"
import Payment from "@/models/Payment"
import connectDB from "@/db/connectDB"
import User from "@/models/nonameUser"

export const initiate = async (amount, to_username, paymentform) => {
    await connectDB()
    let user = await User.findOne({ username: to_username })
    const secret = user.razorpaysecret
    const id = user.razorpayid

    var instance = new Razorpay({ key_id: id, key_secret: secret })
    // if(!amount){
    //     amount = paymentform.amount
    //}

    const finalAmount = amount ? Number.parseInt(amount) : Number.parseInt(paymentform.amount);

    let options = {
        amount: finalAmount,
        currency: "INR",
    }

    let x = await instance.orders.create(options)
    await Payment.create({
        oid: x.id,
        amount: amount,
        to_user: to_username,
        name: paymentform.name,
        message: paymentform.message
    })

    return x
}

//important to convert object to plain text or viceversa if not error
export const fetchuser = async (username) => {
    await connectDB()
    let u = await User.findOne({ username: username })
    let user = u.toObject()
    user._id = user._id.toString();
    if (user.createdAt) user.createdAt = user.createdAt.toISOString(); // Convert Date to string
    if (user.updatedAt) user.updatedAt = user.updatedAt.toISOString();
    return user
}

export const fetchpayments = async (username) => {
    await connectDB()
    const payments = await Payment.find({ to_user: username })
        .sort({ amount: -1 }).limit(5)
        .lean(); // Retrieve plain objects
    return payments.map(payment => {
        payment._id = payment._id.toString(); // Convert ObjectId to string
        if (payment.createdAt) payment.createdAt = payment.createdAt.toISOString(); // Convert Date to string
        if (payment.updatedAt) payment.updatedAt = payment.updatedAt.toISOString(); // Convert Date to string

        return payment;
    });
}

export const updateProfile = async (data, oldusername) => {
    try {
        await connectDB();
        const ndata = { ...data };
        let updatedUser;

        // Check for username conflict if the username is being changed
        if (oldusername !== ndata.username) {
            const existingUser = await User.findOne({ username: ndata.username });
            if (existingUser) {
                return { error: "Username already exists" };
            }

            // Update username in the Payment collection
            await Payment.updateMany({ to_user: oldusername }, { to_user: ndata.username });
        }

        // Update the user data
        updatedUser = await User.findOneAndUpdate(
            { email: ndata.email }, // Find the user by email
            ndata,                  // Update the user with the new data
            { new: true }           // Return the updated document
        );

        if (!updatedUser) {
            return { error: "User not found or no changes made" };
        }

        return { success: true };
    } catch (error) {
        console.error("Error updating profile:", error);
        return { error: "An error occurred while updating the profile" };
    }
};
