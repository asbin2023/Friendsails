import { Link } from "react-router-dom"
import Router from "./Router"


const App = () => {
    function handleLogout() {

        localStorage.clear()
    }

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
                <Link onClick={handleLogout}>
                    <button>Logout</button>
                </Link>
                <span style={{ marginLeft: '10px' }}>
                    Welcome {localStorage.getItem('username') ? localStorage.getItem('username') : 'Stranger'}
                </span>
                <Link to={'/dash'}>
                    <button>
                        Dashboard</button></Link>

            </nav>



            <Router />
        </div>
    )
}

export default App
