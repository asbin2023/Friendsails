import { Link } from "react-router-dom";
import ShowPosts from "../components/ShowPosts";

const Dash = () => {
    return (
        <div>
            <div className="p-10">
                <Link to={"/new"}>
                    <button className="p-2 bg-green-700 text-white">Make a post</button>
                </Link>
                <ShowPosts />
            </div>
        </div>
    );
};

export default Dash;
