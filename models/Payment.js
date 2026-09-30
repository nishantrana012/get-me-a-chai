import mongoose from 'mongoose';

const PaymentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true  
    },
    toUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    orderId: {
        type: String,
        required: true
    },
    message: {
        type: String,
        default: ''
    },
    amount: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        default: 'INR'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    done: {
        type: Boolean,
        default: false
    }
});

export default mongoose.models.Payment || mongoose.model('Payment', PaymentSchema);