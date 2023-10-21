import { Link } from "react-router-dom";
const Notfound = () => {
    return <div className="ml-64">
        <h1>Page not found</h1>
        <Link to={"/"}> Go back home</Link>;
    </div>
};

export default Notfound;
