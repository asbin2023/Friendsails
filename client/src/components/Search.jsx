import React, { useEffect, useState } from "react";
import axios from "axios";

const Search = () => {
    const [input, setInput] = useState("");
    const [searchBy, setSearchBy] = useState("");
    const [results, setResults] = useState([]);
    const [results2, setResults2] = useState({});

    const [toggle, setToggle] = useState(false);

    const [advName, setAdvName] = useState("");
    const [advTrack, setAdvTrack] = useState("");
    const [advAlbum, setAdvAlbum] = useState("");

    function handleInputChange(e) {
        setInput(e.target.value.toLowerCase());
    }

    async function handleSearch() {
        if (!searchBy) {
            return;
        }

        console.clear();
        try {
            let newInput = "";
            let idx = "";
            for (let i = 0; i < input.length; i++) {
                if (input[i] === " ") {
                    idx = input.indexOf(input[i]);
                }
            }

            if (idx) {
                let arr2 = input.split("");

                arr2.splice(idx, 9999);
                newInput = arr2.join("");
            }
            if (searchBy === "track" || searchBy === "album") {
                newInput = false;
            }

            const response = await axios.get(
                `/deezer/search?q=${searchBy}:"${newInput ? newInput : input}"`
            );
            if (searchBy === "artist") {
                let artistNames = [];
                console.log(response.data.data);

                for (let i of response.data.data) {
                    if (
                        !artistNames.includes(i.artist.name) &&
                        i.artist.name.toLowerCase().includes(newInput ? newInput : input)
                    ) {
                        artistNames.push(i.artist.name);
                    }
                }

                setResults(artistNames);
            } else if (searchBy === "album") {
                console.log("inside album now");
                let albumNames = [];
                console.log(response.data.data);

                for (let i of response.data.data) {
                    if (
                        !albumNames.includes(i.album.title) &&
                        i.album.title.toLowerCase().includes(input)
                    ) {
                        albumNames.push(i.album.title);
                    }
                }

                setResults(albumNames);
            } else if (searchBy === "track") {
                console.log("inside track now");
                let trackNames = [];
                console.log(response.data.data);

                for (let i of response.data.data) {
                    console.log("this is input inside search by track", input);
                    if (
                        !trackNames.includes(i.title) &&
                        i.title.toLowerCase().includes(input)
                    ) {
                        trackNames.push(i.title);
                    }
                }

                setResults(trackNames);
            } else {

                return;
            }
        } catch (err) {
            console.log(err.message);
        }
    }
    async function handleAdvancedSubmit() {

        try {
            let newInput2 = "";
            let idx = "";
            for (let i = 0; i < advName.length; i++) {
                if (advName[i] === " ") {
                    idx = advName.indexOf(advName[i]);
                }
            }

            if (idx) {
                let arr2 = advName.split("");

                arr2.splice(idx, 9999);
                newInput2 = arr2.join("");
            }
            const response = await axios.get(
                `/deezer/search?q=artist:"${newInput2 ? newInput2 : advName}"track:"${advTrack}"album:"${advAlbum}"`
            );
            console.log(response.data.data[0])
            setResults2(response.data.data[0])
        } catch (err) {
            console.log(err.message)
        }
    }

    useEffect(() => {
        handleSearch();
    }, [input]);

    useEffect(() => {
        handleAdvancedSubmit()
    }, [advAlbum, advName, advTrack])
    return (
        <div>
            <div style={{ display: toggle ? "none" : "block" }}>
                <label htmlFor="searchBy">Search by..</label>
                <select
                    name="searchBy"
                    id="searchBy"
                    value={searchBy}
                    onChange={(e) => setSearchBy(e.target.value)}
                >
                    <option value="">---Please choose an option---</option>
                    <option value="artist">artist</option>
                    <option value="track">track</option>
                    <option value="album">album</option>
                </select>
            </div>
            <button onClick={() => setToggle(!toggle)}>Advanced Search </button>
            {toggle && (
                <div>

                    <label htmlFor="artist_name">Artist Name:</label>
                    <input
                        type="text"
                        id="artist_name"

                        value={advName}
                        onChange={(e) => setAdvName(e.target.value.toLowerCase())}
                    />
                    <br />

                    <label htmlFor="track_name">Track Name:</label>
                    <input
                        type="text"
                        id="track_name"

                        value={advTrack}
                        onChange={(e) => setAdvTrack(e.target.value.toLowerCase())}
                    />
                    <br />
                    <label htmlFor="album_name">Album Name:</label>
                    <input
                        type="text"
                        id="album_name"

                        value={advAlbum}
                        onChange={(e) => setAdvAlbum(e.target.value.toLowerCase())}
                    />
                    <br />

                    <button type="submit">Search</button>

                    {results2?.artist ? <div>

                        <h2>Artist Name: {results2?.artist.name || 'none'}</h2>
                        {advTrack && <h2>Track Name: {results2?.title || 'non'}</h2>}
                        {advAlbum && <h2>Album Name: {results2?.album.title || 'none'}</h2>}
                    </div> : <h2>No match found. Please make sure all the fields are correct</h2>}

                </div>
            )}


            <div style={{ display: toggle ? 'none' : 'block' }}>
                <p>
                    {results.length < 1 &&
                        "make sure to include appropriate spacing. taylor swift !== taylorswift"}
                </p>
                <input type="text" value={input} required onChange={handleInputChange} />
                <button>Search</button>
                <div>
                    {results.length > 0 &&
                        results.map((item, idx) => <p key={idx}>{item}</p>)}
                </div>
            </div>
        </div>
    );
};

export default Search;
