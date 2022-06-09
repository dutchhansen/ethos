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
                        <p className="status-item">'Ethos'</p>
                        <div className="navbar-secondary">
                            <a href='https://github.com/dutchhansen' target='_blank'><button className='middle-button github'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M9.6533203,20.8652344c-0.0001831-0.1481934-0.065979-0.2887573-0.1796875-0.3837891c-0.114624-0.093689-0.2642212-0.1332397-0.4101562-0.1083984c-1.5908203,0.2949219-3.6083984,0.2988281-4.1943359-1.3466797c-0.3604126-0.8795166-0.9379883-1.6533203-1.6787109-2.2490234c-0.1533203-0.0786133-0.2915039-0.1837158-0.4082031-0.3104858c-0.0394287-0.2409058-0.2471313-0.4180298-0.4912109-0.4190063H2.2890015c-0.2753296,0-0.4989014,0.2226562-0.5,0.4980469c-0.0029297,0.5703125,0.7109375,0.9970703,0.921875,1.109375c0.5300293,0.4760742,0.9473267,1.06427,1.2217407,1.7217407C4.28125,20.3565063,5.34375,21.8721313,8.6552734,21.4492798c0.0029297,0.3642578,0.0078125,0.5527344,0.0117188,0.6962891l0.0048828,0.2949219c0,0.276123,0.223877,0.5,0.5,0.5s0.5-0.223877,0.5-0.5l-0.0048828-0.3223267C9.6611328,21.9169922,9.6533203,21.6270142,9.6533203,20.8652344z M20.9208984,5.2236328c-0.0302734-0.0380859-0.0625-0.078125-0.0957031-0.1181641c0.0671387-0.2113647,0.1199341-0.427002,0.1582031-0.6454468c0.1547852-1.0731812,0.0175171-2.1682739-0.3974609-3.1700439C20.53125,1.1523438,20.4181519,1.0460815,20.2773438,1c-0.1416016-0.046875-1.4335938-0.3945312-4.1298828,1.3818359c-2.2589722-0.5742188-4.6257324-0.5742188-6.8847656,0C6.5673828,0.6259766,5.2832031,0.9550781,5.140625,0.9970703C4.9971313,1.0423584,4.8814087,1.1494751,4.8251953,1.2890625c-0.4225464,1.0169067-0.55896,2.1299438-0.3945312,3.21875c0.038269,0.199646,0.086853,0.3971558,0.1455078,0.5917969C4.5410156,5.1426392,4.5078125,5.1855469,4.4765625,5.2275391C3.6300049,6.3015747,3.1795654,7.6346436,3.2011719,9.0020142C3.1987305,9.3121338,3.2130737,9.6221313,3.2441406,9.9307251c0.3398438,4.6640625,3.3486328,5.9619141,5.9473267,6.4052734c-0.1692505,0.3034058-0.2957764,0.6287231-0.3760376,0.9667969c-0.0657959,0.2680054,0.0981445,0.5386963,0.3662109,0.6044922s0.5386963-0.0981445,0.6044922-0.3662109c0.0925293-0.4596558,0.3247681-0.8795166,0.664978-1.2021484c0.2080688-0.1820068,0.229248-0.49823,0.0472412-0.7062988c-0.0820312-0.093689-0.1959839-0.1535034-0.3197021-0.1677246c-2.7567749-0.3125-5.618103-1.2236328-5.9384766-5.625C4.2119141,9.5615234,4.1989136,9.2817993,4.2011719,9.0020142C4.182312,7.854248,4.5603638,6.7351685,5.2714844,5.8339844c0.0751953-0.1015625,0.1591797-0.1943359,0.2421875-0.2861328c0.12677-0.1398926,0.1641846-0.3392334,0.0966797-0.515625C5.5250244,4.8067017,5.4599609,4.5740356,5.4160156,4.3369141c-0.119751-0.803894-0.039917-1.6248779,0.2324219-2.390625c1.187561,0.1653442,2.309082,0.645874,3.2479858,1.3916016c0.1212158,0.0817871,0.2723389,0.1060791,0.4130859,0.0664062c2.2244263-0.6035156,4.569519-0.6035156,6.7939453,0c0.1415405,0.0395508,0.2932739,0.0148926,0.414978-0.0673828c0.932312-0.753418,2.0534058-1.2368164,3.241272-1.3974609c0.269165,0.7542114,0.3505859,1.5626831,0.2373047,2.3554688c-0.0441895,0.2519531-0.1132202,0.4989624-0.2060547,0.7373047c-0.0675049,0.1763916-0.0301514,0.3756714,0.0966797,0.515625c0.0878906,0.0966797,0.1757812,0.2050781,0.2528687,0.3017578c0.7128296,0.8942261,1.0913696,2.0090332,1.0704346,3.1524048c0.0023193,0.2860107-0.0117188,0.5719604-0.0419922,0.8564453c-0.3173828,4.3808594-3.1894531,5.2919922-5.9570312,5.6064453c-0.2745972,0.0314941-0.4716797,0.2797241-0.4401245,0.5543823c0.0142212,0.1236572,0.0739746,0.2376099,0.1676636,0.3195801c0.3447266,0.3249512,0.5755615,0.7523193,0.6582642,1.21875c0.0852051,0.3293457,0.124939,0.6687622,0.118103,1.0087891v2.4590454c-0.0106812,0.6757812-0.0106812,1.1826172-0.0106812,1.414978c0.0003662,0.276123,0.2245483,0.4996948,0.5006714,0.4993286c0.2755737-0.0004272,0.4989014-0.2237549,0.4993286-0.4993286c0-0.2304688,0-0.7314453,0.0106812-1.4072266v-2.4667969c0.0078735-0.4234619-0.0424194-0.8460083-0.149353-1.2558594c-0.0752563-0.3407593-0.1988525-0.6689453-0.3671875-0.9746094c2.6083984-0.4423828,5.6288452-1.7392578,5.9658203-6.3847656c0.0330811-0.3153076,0.0484009-0.6322021,0.0458984-0.9492188C22.2337646,7.6307373,21.7775269,6.2945557,20.9208984,5.2236328z"/></svg></button></a>
                            <a href='https://twitter.com/dutchhansen' target='_blank'><button className='middle-button twitter'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M22.5,3.5888672c0.0002441-0.2761841-0.2234497-0.5002441-0.4996338-0.5004883c-0.0898438-0.000061-0.1779785,0.0240479-0.255249,0.0698242c-0.7038574,0.4194946-1.4684448,0.7275391-2.2666016,0.9130859c-0.8716431-0.8326416-2.0318604-1.2953491-3.2373047-1.2910156c-2.6089478,0.0032349-4.7229004,2.1176758-4.7255859,4.7265625c0,0.1347656,0.0058594,0.2714844,0.0185547,0.4091797C8.5112915,7.5945435,5.7377319,6.09198,3.8173828,3.7353516c-0.175354-0.2139282-0.4909668-0.2451782-0.704895-0.0698242c-0.0467529,0.0383301-0.0861816,0.0848389-0.116394,0.137207C2.581604,4.5263672,2.3637695,5.3458252,2.3642578,6.1797485C2.362915,7.0950928,2.6275635,7.9910889,3.1259766,8.7587891c-0.0195312-0.0107422-0.039978-0.0214844-0.0595703-0.0332031c-0.1596069-0.0778809-0.3484497-0.065979-0.4970703,0.03125c-0.1546631,0.1004028-0.2477417,0.272583-0.2470703,0.4570312C2.3181152,9.3320923,2.3253174,9.4505005,2.34375,9.5673218c0.0957642,1.3353882,0.7573853,2.5662842,1.8183594,3.3828735c-0.0925903,0.0269165-0.1751709,0.0805664-0.2373047,0.1542969c-0.1132812,0.1314087-0.1502686,0.3121948-0.0976562,0.4775391c0.468811,1.461731,1.62146,2.6026611,3.0878296,3.0566406c-1.4753418,0.8259277-3.1745605,1.1630249-4.8535156,0.9628906c-0.274231-0.0336304-0.5238037,0.161438-0.5574341,0.4356689c-0.0233154,0.1904297,0.06427,0.3773804,0.2254639,0.4813232C3.7386475,19.812439,6.0780029,20.5003662,8.4677734,20.5c5.5748291,0.0617676,10.4938965-3.6341553,11.9863281-9.0058594c0.3389282-1.1375122,0.5119019-2.3179321,0.5136719-3.5048828c0-0.1201172,0-0.2451172-0.0029297-0.3720703C22.0166626,6.5477295,22.5733032,5.0870972,22.5,3.5888672z M20.0761719,7.1220703c-0.0820923,0.0969849-0.1240234,0.2217407-0.1171875,0.3486328c0.0087891,0.1767578,0.0087891,0.3525391,0.0087891,0.5185547c-0.0020142,1.0913086-0.1611938,2.1766968-0.4726562,3.2226562C18.1668701,16.1845703,13.6137085,19.6067505,8.4677734,19.5c-1.5258789,0.0005493-3.036377-0.3045654-4.4423828-0.8974609c1.6526489-0.1833496,3.220459-0.8276367,4.5244141-1.859375c0.2172241-0.1707764,0.2548828-0.4852905,0.0841064-0.7025146C8.5411377,15.9225464,8.4001465,15.852417,8.25,15.8496094c-1.3014526-0.0209351-2.4966431-0.7225342-3.1494141-1.8486328c0.4240723,0.0012817,0.8461914-0.057251,1.2539062-0.1738281c0.2652588-0.0761719,0.4185181-0.3529053,0.3423462-0.6181641C6.6450806,13.0286255,6.4966431,12.8924561,6.3125,12.8564453c-1.463562-0.2926636-2.6086426-1.4346924-2.9052734-2.8974609c0.4245605,0.1375122,0.8664551,0.2141113,1.3125,0.2275391c0.2264404,0.0168457,0.4329224-0.1294556,0.4921875-0.3486328C5.2793579,9.625,5.1976929,9.3931885,5.0117188,9.2695312C3.9785156,8.581604,3.3596802,7.4209595,3.3642578,6.1796875C3.3639526,5.7672119,3.4312134,5.3574829,3.5634766,4.9667969C5.7807617,7.361084,8.84552,8.7946777,12.1044922,8.9619141c0.1580811,0.0167236,0.3132935-0.0512085,0.4082031-0.1787109c0.1005859-0.1207275,0.138855-0.2814941,0.1035156-0.4345703c-0.0661621-0.2757568-0.0999756-0.5582275-0.1005859-0.8417969c0.0019531-2.0569458,1.6686401-3.7240601,3.7255859-3.7265625c1.0283203-0.0029297,2.0109863,0.4244995,2.710022,1.1787109c0.1178589,0.1260986,0.2926025,0.182251,0.4619141,0.1484375c0.7096558-0.1395874,1.3995972-0.3652344,2.0546265-0.671875C21.2976074,5.4550171,20.81073,6.3949585,20.0761719,7.1220703z"/></svg></button></a>
                        </div>
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
