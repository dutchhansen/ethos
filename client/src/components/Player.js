import SpotifyPlayer from "react-spotify-web-playback";


function Player(props) {
    return (
        <div>
            <SpotifyPlayer token={props.token}></SpotifyPlayer>
        </div>
    );
}

export default Player;
