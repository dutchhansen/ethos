
function Login() {

    const LOGIN_URI =
        (process.env.NODE_ENV !== 'production')
            ? 'https://ethos-io.herokuapp.com/login'
            : 'https://ethos-io.herokuapp.com/login'

    return (
        <div>
            <div className="navbar-primary intro">
                <p className="status-left">'Ethos'</p>
                <p className='status-right'>Project by Dutch Hansen</p>
            </div>
            <div className='flex-login'>
                <h1 className='login-item'>Welcome</h1>
                <a href={LOGIN_URI}><button className='login-item login-button'>Log in</button></a>
            </div>
        </div>
    );
}

export default Login;
