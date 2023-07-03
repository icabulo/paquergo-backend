import mongoose, { Schema } from "mongoose";

const wasteSchema = new Schema(
  {
    location: Array,
    date: {
      type: Date,
      default: Date.now(),
    },
    description: String,
    deliveryState: {
      type: String,
      enum: ["pendiente", "asignado", "entregado"],
      default: "pendiente",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Waste = mongoose.model("Waste", wasteSchema);
export default Waste;
