import Player from "./Player";
import {useState, useEffect} from 'react';
import {getLyrics} from "../lyrics";

function Home(props) {
    const [selectedTrack, setSelectedTrack] = useState('');
    const [playNow, setPlayNow] = useState(false);
    const [artistText, setArtistText] = useState('');

    useEffect(() => {

        const fetchArtistInfo = async (artist, title) => {

            setArtistText('Loading...')
            const artistLyrics = await getLyrics(artist, title);
            return artistLyrics.data.lyrics.split('\n');

        }
        try {
            const text = fetchArtistInfo(selectedTrack.artists[0].name, selectedTrack.name);
            setArtistText(text);

        } catch (err) {
            console.error(err);
        }

    }, [selectedTrack]);

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
                                    setSelectedTrack(track)
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
                    {selectedTrack ? (
                        <div className='upper-media'>
                            <div className='album-cover'>
                                <img src={selectedTrack.album.images[0].url} alt='album artwork'/>
                            </div>
                            <div className='song-name'>
                                <p>{selectedTrack.artists[0].name}</p>
                                <h1>{selectedTrack.name}</h1>
                                <Player token={props.token} selectedURI={selectedTrack.uri} playNow={playNow} />
                            </div>
                        </div>
                        ) : (
                        <div className='upper-media'>
                            <h2>Select a song to play.</h2>
                        </div>
                        )}

                    <div className='lower-media'>
                        {artistText ? (
                            artistText.map((line) => (
                                <div>{line}</div>
                            ))
                        ) : (
                            <p>No Lyrics</p>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Home;
