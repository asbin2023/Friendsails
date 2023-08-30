import React, { useEffect, useState } from "react";
import axios from "axios";

const Search = () => {
    const [result, setResult] = useState({});

    const [artist, setArtist] = useState("");
    const [track, setTrack] = useState("");
    const [album, setAlbum] = useState("");

    async function handleSubmit() {
        console.clear()
        try {
            let taylorPut = "";
            if (artist.includes('taylor')) {
                let idx = "";
                if (artist)
                    for (let i = 0; i < artist.length; i++) {
                        if (artist[i] === " ") {
                            idx = artist.indexOf(artist[i]);
                        }
                    }
                if (idx) {
                    let arr = artist.split("");

                    arr.splice(idx, 9999);
                    taylorPut = arr.join("")
                }
            }
            for (let i of artist) {
                if (i === ' ') {
                    artist.replace(" ", '_')
                }
            }

            console.log(taylorPut)
            const response = await axios.get(
                `/deezer/search?q=artist:"${taylorPut ? taylorPut : artist
                }"track:"${track}"album:"${album}"`
            );

            setResult(response.data.data[0]);
        } catch (err) {
            console.log(err.message);
        }
    }

    useEffect(() => {
        handleSubmit();
    }, [album, artist, track]);
    return (
        <div>
            <div>
                <label htmlFor="artist_name">Artist Name:</label>
                <input
                    type="text"
                    id="artist_name"
                    value={artist}
                    onChange={(e) => setArtist(e.target.value.toLowerCase())}
                />
                <br />

                <label htmlFor="track_name">Track Name:</label>
                <input
                    type="text"
                    id="track_name"
                    value={track}
                    onChange={(e) => setTrack(e.target.value.toLowerCase())}
                />
                <br />
                <label htmlFor="album_name">Album Name:</label>
                <input
                    type="text"
                    id="album_name"
                    value={album}
                    onChange={(e) => setAlbum(e.target.value.toLowerCase())}
                />
                <br />


                {result?.artist || result?.track || result?.album ? (
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <img style={{ borderRadius: '50%' }} src={result.artist.picture} width={30} alt="" />
                            <span style={{ color: 'white' }}>i</span>
                            <h2>{result?.artist.name || "none"}</h2>
                        </div>
                        {track && <div>
                            <h2> Track: {result?.title || "none"}</h2>

                        </div>}
                        {album && <div>
                            <h4>         {result?.album.title || "none"}</h4>
                            <img src={result?.album.cover} alt="" />
                        </div>}
                    </div>
                ) : (
                    <h4>No match found. Please make sure all the fields are correct</h4>
                )}
            </div>
        </div>
    );
};

export default Search;
