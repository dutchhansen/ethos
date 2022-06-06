import {useState, useEffect} from "react";
import './App.css';
import Login from "./components/Login";
import {access_token, getCurrentUserProfile, getTopTracks, searchTracks} from './spotify';
import Home from "./components/Home";


function App() {
    const [token, setToken] = useState(null);
    const [profile, setProfile] = useState(null);
    const [topTracks, setTopTracks] = useState(null);
    const [searchString, setSearchString] = useState('Cleo Sol');

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

    useEffect(() => {

        const fetchSearch = async (search) => {

            const searchTracks = await searchTracks(search);
            setTopTracks(searchTracks.data.items);

            console.log(searchTracks.data.items)

        }
        try {
            fetchSearch(searchString);

        } catch (err) {
            console.error(err);
        }

    }, [searchString]);

    const today = new Date()
    let day = today.getDate();
    let month = today.getMonth() + 1;
    let year = today.getFullYear();
    let date = `${month}/${day}/${year}`;

    return (
        <div className="App">
            <div className="navbar-primary">
                <p className="status-item">Now playing: <input type='text' placeholder='music topic' value={searchString} onChange={(e) => setSearchString(e.target.value)} /></p>
                <p className='status-item'>00:00/00:00</p>
                <p className='status-item'>{date}</p>
            </div>
            {!token ? (
                <Login />
            ) : (
                <>
                    <Home tracks={topTracks}/>
                    {/*<h1>Logged in</h1>*/}
                    {/*{profile && (*/}
                    {/*    <div>*/}
                    {/*        <h1>{profile.display_name}</h1>*/}
                    {/*        <p>{profile.followers.total} followers</p>*/}
                    {/*        {profile.images.length && profile.images[0].url && (*/}
                    {/*            <img src={profile.images[0].url} alt="Avatar" />*/}
                    {/*        )}*/}
                    {/*    </div>*/}
                    {/*)}*/}

                </>
            )}
        </div>
    );
}

export default App;
