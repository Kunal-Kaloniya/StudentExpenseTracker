import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    amount: {
        type: Number,
        required: true,
        min: 0,
    },
    category: {
        type: String,
        required: true,
        enum: ['Canteen', 'Tea/Coffee', 'Stationery', 'Travel', 'Entertainment', 'Other'],
        default: 'Other',
    },
    date: {
        type: Date,
        default: Date.now,
    },
}, {timestamps: true});

export const Expense = mongoose.model("Expense", expenseSchema);