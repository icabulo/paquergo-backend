import mongoose, { Schema } from "mongoose";

//user image: userImageUrl
//waste list: myWasteList
//paca list: myPacaList
const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      default: function () {
        const myName = this.email.split("@")[0];
        return myName;
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    currentRole: {
      type: String,
      enum: ["not selected", "amigo", "paquerx"],
      default: "not selected",
    },
    mapLocation: Array,
    userImage: String,
    chat: {
      contacts: Array,
      conversations: Array,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;
