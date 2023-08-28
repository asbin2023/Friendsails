import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const regex = /[^A-Za-z0-9]+/g;

const Signup = () => {
    const navigate = useNavigate();


    const [formInput, setFormInput] = useState({
        email: '',
        username: '',
        password: ''
    })

    function handleReset() {
        setFormInput({
            email: '',
            username: '',
            password: ''
        })
    }
    function handleFormChanges(e) {

        if (e.target.name !== 'email') {
            let form = {
                ...formInput,
                [e.target.name]: e.target.value.replace(regex, '')
            }
            setFormInput(form)

        } else {
            let form = {
                ...formInput,
                [e.target.name]: e.target.value
            }
            setFormInput(form)
        }

    }

    async function handleFormSubmit(e) {

        e.preventDefault()

        try {
            const response = await axios.post('/api/user/signup', (formInput))
            const token = await response.data.token
            localStorage.setItem("token", token)


        } catch (err) {
            console.log('error on signup')
            console.log(err.message)
        }

        setFormInput({
            email: '',
            username: '',
            password: ''
        })
    }

    return (
        <div>
            <form onSubmit={handleFormSubmit}>
                <label htmlFor="email">Your email</label>
                <input type="email" maxLength={40} id="email" name="email" required value={formInput.email} onChange={handleFormChanges} />
                <br />
                <label htmlFor="username">Your username</label>
                <input type="text" minLength={5} maxLength={20} id="username" name="username" required value={formInput.username} onChange={handleFormChanges} />
                <br />
                <label htmlFor="password">Enter your password</label>
                <input type="password" required minLength={8} maxLength={30} id="password" name="password" value={formInput.password} onChange={handleFormChanges} />
                {/* <br />
                <label htmlFor="password"> Re-Enter your password</label>
                <input type="password" required id="password" name="password" /> */}
                <br />
                <button type="submit">Signup!</button>
                <button onClick={handleReset} type="reset">Clear</button>
            </form>
        </div>
    );
};

export default Signup;
