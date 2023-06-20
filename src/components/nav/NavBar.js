import { Link, useNavigate } from "react-router-dom"
import alt_logo from "../../images/crackerjacks-alt-logo.png"
import "./NavBar.css"

export const NavBar = () => {
    const navigate = useNavigate()

    return (
        <ul className="navbar">
            <img className="home_logo" src={alt_logo} onClick={() => {navigate('/')}}/>
            <div className="nav_links">
            <h3 className="navbar__item" onClick={() => {navigate('/parks')}}>
                Parks
            </h3>
            <h3 className="navbar__item" onClick={() => {navigate('/teams')}}>
                Teams
            </h3>
            <h3 className="navbar__item" onClick={() => {navigate('/trips')}}>
                Trips
            </h3>
            <h3 className="navbar__item" onClick={() => {navigate('/users')}}>
                Users
            </h3>
            <h3 className="navbar__item" onClick={() => {navigate(`/myprofile`)}}>
                Profile
            </h3>
            {
                (localStorage.getItem("cj_token") !== null) ?
                        <h3 className="navbar__item nav-link fakeLink" onClick={() => {
                                localStorage.removeItem("cj_token")
                                navigate('/login')
                            }}
                        >Logout</h3> :
                    <>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/register">Register</Link>
                        </li>
                    </>
            }        </div>
            </ul>
    )
}
