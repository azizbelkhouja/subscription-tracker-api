import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    price: { type: Number, required: [true, "Price is required"], min: 0 },
    currency: {
      type: String,
      enum: ["USD", "EUR", "GBP", "JPY", "AUD", "CAD"],
      default: "EUR",
    },
    frequency: {
      type: String,
      enum: ["monthly", "yearly"],
      default: "monthly",
    },
    category: {
      type: String,
      enum: ["entertainment", "productivity", "education", "health", "other"],
      default: "other",
    },
    paymentMethod: {
      type: String,
      enum: ["credit_card", "debit_card", "paypal", "bank_transfer", "other"],
      default: "credit_card",
    },
    status: {
      type: String,
      enum: ["active", "paused", "canceled"],
      default: "active",
    },
    startDate: {
      type: Date,
      required: [true, "Start date is required"],
      validate: {
        validator: (value) => value < new Date(),
        message: "Start date must be in the past",
      },
    },
    endDate: {
      type: Date,
      validate: {
        validator: (value) => !value || value > this.startDate,
        message: "End date must be after start date",
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

export const Subscription = mongoose.model("Subscription", subscriptionSchema);

// For usage in other files to create different subscriptions
export default Subscription;
