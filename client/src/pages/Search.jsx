import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'


const Search = () => {
    const inputRef = useRef('')
    const [user, setUser] = useState('')
    // .current.value and set ref={inputRef}

    async function getUsers() {

        let input = inputRef.current.value
        try {

            let token = localStorage.getItem('token')

            const user = await axios.get(`/api/user/search/${input}`, {
                headers: {
                    Authorization: token
                }
            })
            if (user.data.user) {
                setUser(user.data.user)
            } else {
                setUser('')
            }

        } catch (err) {
            console.log(err.message)
        }
        console.log(user)
    }

    return (
        <div>
            <div>
                <form className=' p-3 flex flex-col w-7/12'>
                    <div className='flex gap-3 items-center'>
                        <label htmlFor="user">User search:</label>
                        <input className='border-2 border-gray-300 outline-none' type="text" id='user' ref={inputRef} onChange={getUsers} />
                    </div>

                    <button className='p-1 m-2 bg-yellow-100' type='submit'>Search</button>
                    <button className='p-1 m-2 bg-blue-100' type='reset'>Back</button>
                </form>
                {user ? <div>
                    <h1 className='p-3 bg-green-200 m-4'>
                        {user.username}
                    </h1>
                </div> : 'No results found '}
            </div>
        </div>
    )
}

export default Search
