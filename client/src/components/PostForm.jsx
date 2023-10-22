import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PostForm = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  let token = localStorage.getItem("token");

  const [image, setImage] = useState("");

  async function handleFormSubmit(e) {
    e.preventDefault();
    try {
      let data = {
        title,
        body,
        image,
      };
      await axios.post("/api/user/posts", data, {
        headers: {
          Authorization: token,
        },
      });
      console.log("im here");
      navigate("/dash");
      //title. body, image is opt
    } catch (err) {
      console.log(err);
    }
  }

  function handleImageChange(e) {
    const file = e.target.files[0];
    const render = new FileReader();
    render.onloadend = () => setImage(render.result);
    render.readAsDataURL(file);
  }

  return (
    <div className="sm:ml-80 max-md:max-w-xs max-md:sm:ml-72 max-w-sm m-10 mt-8 sm:mt-14 max-sm:max-w-full  ">
      <div className="flex items-center gap-10 ">
        <button
          onClick={() => navigate(-1)}
          type="button"
          className=" text-sm font-semibold rounded-l-md border-2 border-gray-700 py-2 hover:bg-gray-900 hover:text-white px-4  "
        >
          <div className="flex flex-row align-middle">
            <svg
              className="w-5 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            <p className=" ">back</p>
          </div>
        </button>
        <h1 className="text-lg p-1 border-b-2 font-bold border-black">Create a post</h1>
      </div>

      <form
        className="flex flex-col gap-7  mt-16 w-full"
        onSubmit={handleFormSubmit}
      >
        <input
          type="text"
          id="title"
          placeholder="Enter post title"
          className=" rounded-md p-3 text-sm  border-2 border-gray-400 "
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          required
        />

        <textarea
          id="body"
          cols="20"
          required
          placeholder="Enter text body"
          className="rounded-md p-3 text-sm border-2  border-gray-400 resize-none"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows="5"
        ></textarea>

        <input
          onChange={handleImageChange}
          className="block  outline-none text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-200  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          id="small_size"
          accept="image/*"
          type="file"
        />

        <div className="flex items-center gap-7 my-2">
          <button type="submit" className="bg-white  hover:bg-gray-700 hover:text-white text-black font-semibold py-1 border border-b-4 border-r-4 border-gray-700 px-7  rounded-md">
            Post
          </button>
         
          <button type="reset" onClick={() => navigate(-1)} className="bg-white  hover:bg-gray-700 hover:text-white text-black font-semibold py-1 border border-b-4 border-r-4 border-gray-700 px-5  rounded-md">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
