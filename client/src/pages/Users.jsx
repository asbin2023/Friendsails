import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const Users = () => {
  const navigate = useNavigate();
  const [allUsers, setAllUsers] = useState("");

  useEffect(() => {
    async function getAllUsers() {
      try {
        const users = await axios.get("/api/user/allUsers", {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        setAllUsers(users.data.users);
      } catch (err) {
        console.log(err);
      }
    }
    getAllUsers();
  }, []);
  return (
    <div className="ml-64">
      <h1>List of users:</h1>

      {allUsers &&
        allUsers.map((user) => {
          if (user.username !== localStorage.getItem("username"))
            return (
              <div className="" key={user._id}>
                <button onClick={() => navigate(`/profile/${user.username}`)}>
                  {" "}
                  {user.username}
                </button>
              </div>
            );
        })}
    </div>
  );
};

export default Users;
