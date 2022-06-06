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
                            [Intro]
                            Aight, yeah, yeah

                            [Verse 1]
                            The way you suck a dick, you get a B+ (You got it, ho)
                            The way you suck a dick, you get a Prius (You got it, ho)
                            You runnin' to the dope, they need to keep up (You's runnin', ho)
                            That bitch can't keep no balance on that dick, but she a Libra
                            That bitch can't get a dollar from this shit, it's Ebenezer
                            I busted on her features and gave her back to Jesus
                            'Cause if I try to keep it (Yo, my baby mama would be beat your ass, bitch)
                            She know I got issue, Tisha, Kiesha
                            You know I got season ticket pleasers
                            You know I got niggas sittin' in my whip lookin' at this shit like I won't buss
                            All my dogs got it filled up, it's still crunk, ayy
                            [Bridge]
                            All my dogs got it filled up, it's real crunk (Yeah)
                            All my dogs got it filled up, it's still jumpin'
                            Just imagine how niggas came up from the South
                            Knowin' them streets donе did you dirt
                            Comin' up, these niggas wasn't no fans
                            Pussy-ass nigga, don't touch my stash

                            [Break]
                            You got it (Yeah, yеah, yeah)
                            Top ain't gonna like that, but I like this, check me out
                            Aight, this my part right here

                            [Verse 2]
                            Look, I'm tryna take all these bitches to work
                            Workin' the curbs, workin' the curbs
                            I wanna count all the Benjamins
                            She wanna fuck on the Benjamins
                            Suck on my Benjamins, make a predicament
                            Breakin' a ligament, have an epiphany
                            Have her like evidence, have her like every day
                            We were just kickin' it, we were just kickin' it, ho
                            I'm tryna take all these bitches to work (Yeah)
                            Workin' the curbs, workin' the curbs (Man)
                            I wanna count all the Benjamins (Yeah)
                            She wanna fuck on the Benjamins (Yeah)
                            Suck on my Benjamins, make a predicament
                            Breakin' a ligament, have an epiphany
                            Have her like evidence, have her like every day
                            We were just kickin' it, we were just kickin' it, ho (Bitch, haha)
                            [Outro]
                            You got it, yeah, yeah
                            Top ain't gonna like that, but I like this, check me out
                            Aight, this my part right here
                            Look—
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Home;
