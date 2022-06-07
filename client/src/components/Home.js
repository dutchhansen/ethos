import SongItem from "./SongItem";
import Player from "./Player";
import {useState} from 'react';

function Home(props) {
    const [selectedURI, setSelectedURI] = useState('');
    const [selectedAlbumCover, setSelectedAlbumCover] = useState('');
    const [playNow, setPlayNow] = useState(false);

    return (
        <div>
            <div className='dashboard-flex'>
                <div className='dashboard-panel'>
                    <div className='library-info-flex'>
                        <p className='library-option'>Title</p>
                        <p className='library-option'>Top Tracks</p>
                        <p className='library-option'>Artist</p>
                    </div>
                    <div className='song-selection'>
                        {props.tracks && props.tracks.length ? (
                            props.tracks.map((track, i) => (
                                <div key={track.id} className='song-item' onClick={() => {
                                    setSelectedURI(track.uri)
                                    setSelectedAlbumCover(track.album.images[0].url)
                                    setPlayNow(true)
                                }}>
                                    <p className='song-text'>{track.name}</p>
                                    <p className='song-text song-text-right'>{track.artists[0].name}</p>
                                </div>
                            ))
                        ) : (
                            <p>Cannot get tracks. Please reload page.</p>
                        )}

                    </div>
                </div>
                <div className='dashboard-panel media-panel'>
                    {selectedAlbumCover ? (
                        <div className='upper-media'>
                            <div className='album-cover'>
                                <img src={selectedAlbumCover} alt='album artwork'/>
                            </div>
                            <div className='song-name'>
                                <p>Isaiah Rashad</p>
                                <h1>9-5 Freestyle</h1>
                                <Player token={props.token} selectedURI={selectedURI} playNow={playNow} />
                            </div>
                        </div>
                        ) : (
                        <div className='upper-media'>
                            <h2>No media selected.</h2>
                        </div>
                        )}

                    <div className='lower-media'>
                        <p>
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Home;
