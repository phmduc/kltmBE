import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    isAdmin: {
      type: Number,
      require: true,
      default: "2",
    },
    isVerify: {
      type: Boolean,
      require: true,
      default: false,
    },
    isLock: {
      type: Number,
      require: true,
      default: 0,
    },
    date: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

//Login
userSchema.methods.matchPass = async function (enterPass) {
  return await bcrypt.compare(enterPass, this.password);
};

//Register
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

export default User;
