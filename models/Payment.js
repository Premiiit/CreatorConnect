import mongoose from "mongoose";
const {Schema, model} = mongoose;

const PaymentSchema = new Schema({
    name:{type:String, required:true},
    to_user:{type:String, required:true},
    oid:{type:String, required:true},
    message:{type:String},
    amount:{type: Number},
    done:{type: Boolean, default: false}
}, { timestamps: true })

const Payment = mongoose.models.Payment || mongoose.model("Payment", PaymentSchema);

export default Payment;