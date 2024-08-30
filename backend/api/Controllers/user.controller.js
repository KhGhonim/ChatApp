import UserModel from "../Models/user.model.js"

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
