import mongoose, { Schema } from "mongoose";

const pacaSchema = new Schema(
  {
    location: Array,
    date: {
      type: Date,
      default: Date.now(),
    },
    pacaState: {
      type: String,
      enum: ["nuevo", "finalizado", "modificado"],
      default: "nuevo",
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

const Paca = mongoose.model("Paca", pacaSchema);
export default Paca;
