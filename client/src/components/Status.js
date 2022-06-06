const today = new Date()
let day = today.getDate();
let month = today.getMonth() + 1;
let year = today.getFullYear();
let date = `${month}/${day}/${year}`;

function Status() {
    return (
        <div className="navbar-primary">
            <p className="status-item">Now playing: {/* props. whatever song is now playing*/}</p>
            <p className='status-item'>00:00/00:00{/* props.time playing / props.total time left  ??  */}</p>
            <p className='status-item'>{date}</p>
        </div>
    );
}

export default Status;
