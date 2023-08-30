import React, { useEffect, useState } from "react";
import axios from "axios";

const Search = () => {
    const [result, setResult] = useState({});

    const [artist, setArtist] = useState("");
    const [track, setTrack] = useState("");
    const [album, setAlbum] = useState("");

    async function handleSubmit() {
        try {
            let newInput = "";
            let idx = "";
            for (let i = 0; i < artist.length; i++) {
                if (artist[i] === " ") {
                    idx = artist.indexOf(artist[i]);
                }
            }

            if (idx) {
                let arr = artist.split("");

                arr.splice(idx, 9999);
                newInput = arr.join("");
            }
            const response = await axios.get(
                `/deezer/search?q=artist:"${newInput ? newInput : artist
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
                        <h4>Artist Name: {result?.artist.name || "none"}</h4>
                        {track && <h4>Track Name: {result?.title || "none"}</h4>}
                        {album && <h4>Album Name: {result?.album.title || "none"}</h4>}
                    </div>
                ) : (
                    <h4>No match found. Please make sure all the fields are correct</h4>
                )}
            </div>
        </div>
    );
};

export default Search;
