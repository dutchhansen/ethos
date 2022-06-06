import {useState, useEffect} from "react";
import './App.css';
import Login from "./components/Login";
import {access_token, getCurrentUserProfile, getTopTracks} from './spotify';
import Home from "./components/Home";


function App() {
    const [token, setToken] = useState(null);
    const [profile, setProfile] = useState(null);
    const [topTracks, setTopTracks] = useState(null);

    useEffect(() => {
        setToken(access_token);

        const fetchData = async () => {

            const userProfile = await getCurrentUserProfile();
            setProfile(userProfile.data);

            const userTopTracks = await getTopTracks();
            setTopTracks(userTopTracks.data.items);

            console.log(userTopTracks.data.items)

        }

        try {
            fetchData();
        } catch (err) {
            console.error(err);
        }

    }, []);


    return (
        <div className="App">
            {!token ? (
                <Login />
            ) : (
                <>
                    <Home />
                    <h1>Logged in</h1>
                    {profile && (
                        <div>
                            <h1>{profile.display_name}</h1>
                            <p>{profile.followers.total} followers</p>
                            {profile.images.length && profile.images[0].url && (
                                <img src={profile.images[0].url} alt="Avatar" />
                            )}
                        </div>
                    )}
                    {topTracks && topTracks.length ? (
                        topTracks.map((track, i) => (
                                <div className='song-item'>
                                    <p>{track.name}</p>
                                    <p>{track.artists[0].name}</p>
                                </div>
                            ))
                    ) : (
                        <p>Cannot get tracks at the moment.</p>
                    )}
                </>
            )}
        </div>
    );
}

export default App;
