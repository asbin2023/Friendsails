import React, { useEffect, useState } from 'react'
import axios from 'axios'
const Search = () => {
    const [input, setInput] = useState('')
    const [results, setResults] = useState([])

    function handleInputChange(e) {
        setInput(e.target.value)
    }
    //https://api.deezer.com/search?q=artist:%22lorde%22
    async function handleSearch() {

        try {
            let newInput = ''
            let idx = '';
            for (let i = 0; i < input.length; i++) {
                console.log(input[i], input.indexOf(input[i]))
                if (input[i] === ' ') {
                    idx = input.indexOf(input[i])
                }
            }
            // console.log(idx, 'this is idx')
            if (idx) {
                let arr2 = input.split('')
                console.log(arr2)
                arr2.splice(idx, 9999)
                newInput = arr2.join('')
            }
            // console.log('this is newInput', newInput)


            const response = await axios.get(`/deezer/search?q=artist:"${newInput ? newInput : input}"`)
            let artistNames = []

            for (let i of response.data.data) {
                // console.log(i.artist.name === input)
                // console.log(i.artist.name.toLowerCase(), 'and input:', newInput ? newInput : input)
                if (!artistNames.includes(i.artist.name) && i.artist.name.toLowerCase().includes(newInput ? newInput : input.toLowerCase())) {

                    artistNames.push(i.artist.name)
                }
            }
            // console.log('this is arr', artistNames)
            setResults(artistNames)

        } catch (err) {
            console.log(err.message)
        }
    }

    useEffect(() => {
        handleSearch()
    }, [input])
    return (
        <div>
            search by aritst name:
            <br />
            <input type="text" value={input} required onChange={handleInputChange} />

            <div>
                {results.length > 0 && results.map((item, idx) => <p key={idx}>{item}</p>)}

            </div>
        </div>
    )
}

export default Search
