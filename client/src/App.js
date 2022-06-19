import {useState, useEffect} from "react";
import './App.css';
import Login from "./components/Login";
import {access_token, getCurrentUserProfile, getTopTracks, searchTracks} from './spotify';
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

        }
        try {
            fetchData();

        } catch (err) {
            console.error(err);
        }

    }, []);


    const today = new Date()
    let day = today.getDate();
    let month = today.getMonth() + 1;
    let year = today.getFullYear();
    let date = `${month}/${day}/${year}`;

    return (
        <div className="App">
            {!token ? (
                <Login />
            ) : (
                <>
                    <div className="navbar-primary">
                        <p className="status-item">Ethos</p>
                        <div className='status-item'>
                            {profile && (
                                <div>
                                    <p>{profile.display_name}</p>
                                </div>
                            )}
                        </div>
                    </div>
                    <Home token={token} tracks={topTracks} />
                </>
            )}
        </div>
    );
}

export default App;
