import multer from "multer";
import { uploadStream } from "../../utils/CloudinaryUploader.js";
import UserModel from "../Models/user.model.js"


// Multer setup for handling file uploads in memory
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Middleware for parsing form data and files
export const uploadMiddleware = upload.single("profilePic");


export const GetUsersForSideBar = async (req, res, next) => {
  const { id } = req.user

  const users = await UserModel.find({ _id: { $ne: id } }).select("-password");
  res.status(200).json({ users })

}

export const SearchUsers = async (req, res, next) => {

  const { q } = req.query

  if (!q) {
    return res.status(400).json({ message: "Search term is required" })
  }
  try {

    const user = await UserModel.find({
      fullName: { $regex: q, $options: "i" }
    }).select("-password");

    res.status(200).json({ user })

  } catch (error) {
    res.status(404).json({ message: error.message })
  }

}

export const UpdateProfile = async (req, res, next) => {

  const { id } = req.user
  const { name, email } = req.body;
  let profilePicUrl = req.body.currentProfilePic; // Assuming you're sending current profile pic URL if not changed

  if (req.file) {
    const buffer = req.file.buffer;
    const uploadedImg = await uploadStream(buffer);
    profilePicUrl = uploadedImg.url;
  }

  try {

    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      { $set: { fullName: name, email, profilePic: profilePicUrl } },
      { new: true }
    ).select("-password");
    res.status(200).json({ updatedUser })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }

}
