import { Link } from "react-router-dom"
import Router from "./Router"


const App = () => {

    return (
        <div>
            <nav style={{ marginBottom: '30px' }}>
                <Link to={'/signup'}> <button>
                    Signup
                </button>
                </Link>
                <Link to={'/login'}> <button>
                    Login
                </button>
                </Link>
            </nav>

            <Router />
        </div>
    )
}

export default App
