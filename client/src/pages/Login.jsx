import axios from "axios"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { loggedIn } from "../../redux/loggedSlice"

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [formInput, setFormInput] = useState({
        username: '',
        password: ''
    })

    function handleFormReset() {
        setFormInput({
            username: '',
            password: ''
        })
    }

    function handleFormInputChange(e) {
        let data = {
            ...formInput,
            [e.target.name]: e.target.value
        }
        setFormInput(data)
    }

    async function handleFormSubmit(e) {
        e.preventDefault()

        try {
            const response = await axios.post('/api/user/login', formInput)
            let data = response.data
            localStorage.setItem('username', data.username)
            localStorage.setItem("token", data.token)
            let token = localStorage.getItem('token')
            dispatch(loggedIn(token))
        } catch (err) {
            console.log('err on login submit')
            console.log(err.message)
        }

        handleFormReset()
    }

    return (
        <div>
            <form onSubmit={handleFormSubmit}>
                <label htmlFor="username">Enter your Username</label>
                <input type="text" id="username" name="username" required value={formInput.username} onChange={handleFormInputChange} />
                <br />
                <label htmlFor="password">Enter your password</label>
                <input type="password" id="password" name="password" required value={formInput.password} onChange={handleFormInputChange} />
                <br />
                <button type="submit">Login</button>
                <button onClick={handleFormReset} type="reset">Clear</button>
            </form>
        </div>
    )
}

export default Login
