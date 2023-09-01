
import { useNavigate } from 'react-router-dom'

const Notfound = () => {
    const navigate = useNavigate()
    return (
        <div>
            <h1>Not found, this page doesnt exist, click the button in order to go back to the previous page</h1>
            <h1 onClick={() => navigate(-1)}><button>Back</button></h1>

        </div>
    )
}

export default Notfound
