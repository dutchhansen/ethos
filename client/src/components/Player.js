import SpotifyPlayer from "react-spotify-web-playback";


function Player(props) {


    return (
        <div className='audio-player'>
            <SpotifyPlayer
                token={props.token}
                play={props.playNow}
                uris={[props.selectedURI]}
                styles={{
                    activeColor: '#fff',
                    color: '#000',
                    loaderColor: '#fff',
                    sliderColor: '#000',
                    trackArtistColor: '#fff',
                    trackNameColor: '#fff',
                }}
            ></SpotifyPlayer>
        </div>
    );
}

export default Player;
