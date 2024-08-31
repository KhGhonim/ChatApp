import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { UserUpdate } from "../Redux/UserSlice";

export default function Modal({ setIsModalOpen }) {
  const [NewName, setNewName] = useState("");
  const [NewEmailAdress, setNewEmailAdress] = useState("");
  const [Isloading, setIsloading] = useState(false);
  const [NewProfilePic, setNewProfilePic] = useState(null);
  const [ImageUrl, setImageUrl] = useState(null);

  const ImgHook = useRef(null);

  // @ts-ignore
  const { currentUser } = useSelector((state) => state.UserShop);
  const dispatch = useDispatch();

  // @ts-ignore
  const API = import.meta.env.VITE_DB_URL;


  const ImagePicker = (eo) => {
    let file = eo.target.files[0];
    if (file) {
      setImageUrl(URL.createObjectURL(file));
      setNewProfilePic(file);
    }
  };

  const UpdateProfile = async (e) => {
    e.preventDefault();
    setIsloading(true);

    if (NewName.length < 3) {
      toast.error("Name must be at least 3 characters");
      setIsloading(false);
      return;
    }

    if (NewEmailAdress.length < 5) {
      toast.error("Email must be a valid email address");
      setIsloading(false);
      return;
    }

    const formData = new FormData();
    formData.append("name", NewName);
    formData.append("email", NewEmailAdress);
    if (NewProfilePic) formData.append("profilePic", NewProfilePic);

    console.log(formData);
    try {
      const res = await fetch(`${API}/api/users/updateProfile`, {
        method: "PUT",
        body: formData,
        credentials: "include",
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message);
        setIsloading(false);
        return;
      }
      toast.success("Profile updated successfully.");
      const updatedUser = data.updatedUser;
      setImageUrl(updatedUser.profilePic);
      dispatch(UserUpdate(data.updatedUser));
      setIsloading(false);
      setIsModalOpen(false);
    } catch (error) {
      toast.error(error.message);
      setIsloading(false);
    } finally {
      setIsloading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="text-black bg-white rounded-lg shadow-lg p-6 mx-3 w-full max-w-md">
        <h2 className="text-xl text-[--UserName] font-semibold mb-4">
          Update Profile
        </h2>
        <form onSubmit={UpdateProfile} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              Name
            </label>
            <input
              onChange={(e) => setNewName(e.target.value)}
              type="text"
              id="name"
              name="name"
              className="mt-1 block w-full p-2 border border-input rounded-md outline-none "
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              onChange={(e) => setNewEmailAdress(e.target.value)}
              type="email"
              id="email"
              name="email"
              className="mt-1 block w-full p-2 border border-input rounded-md outline-none"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label htmlFor="profile-pic" className="block text-sm font-medium">
              Profile Picture
            </label>
            <input
              ref={ImgHook}
              type="file"
              hidden
              id="profile-pic"
              onChange={ImagePicker}
              name="profile-pic"
            />
            <div
              onClick={() => ImgHook.current.click()}
              className="w-full flex justify-center items-center"
            >
              <img
                src={ImageUrl || currentUser?.profilePic}
                alt="Profile"
                className="w-20 h-20 object-cover rounded-full cursor-pointer"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="bg-red-500 text-white hover:bg-red-600/80 px-4 py-2 rounded-md"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={Isloading}
              className="bg-blue-500 text-white hover:bg-blue-600/80 px-4 py-2 rounded-md cursor-pointer"
            >
              {Isloading ? <FaSpinner className="animate-spin" /> : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
