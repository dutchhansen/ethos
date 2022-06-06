import SpotifyPlayer from "react-spotify-web-playback";


function Player(props) {
    return (
        <div>
            <SpotifyPlayer
                token={props.token}
                showSaveIcon
                uris={['spotify:track:6kP92fKzIyVJtNobCRsZ6G']}
            ></SpotifyPlayer>
        </div>
    );
}

export default Player;
