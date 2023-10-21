import { Link } from "react-router-dom";
import ShowPosts from "../components/ShowPosts";



const Dash = () => {
   

    return (
        <div className="">
            <div className="">
                <Link to={"/new"}>
                    Make a post
                </Link>
                
            </div>
            <div className="">

                <ShowPosts />
            </div>
        </div>
    );
};

export default Dash;
