import React, { useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./Auth.css"
import { registerUser } from "../managers/AuthManager"
import { getTeamsForRegistration } from "../managers/TeamManager"

export const Register = () => {
    const firstName = useRef()
    const lastName = useRef()
    const email = useRef()
    const username = useRef()
    const bio = useRef()
    const password = useRef()
    const favoriteTeam = useRef()
    const profileImage = useRef()
    const verifyPassword = useRef()
    const passwordDialog = useRef()
    const navigate = useNavigate()
    const [teams, setTeams] = useState([])

    useEffect(() => {
        getTeamsForRegistration()
            .then(teamData => setTeams(teamData))
    }, [])

    const handleRegister = (e) => {
        e.preventDefault()

        if (password.current.value === verifyPassword.current.value) {
            const newUser = {
                "username": username.current.value,
                "first_name": firstName.current.value,
                "last_name": lastName.current.value,
                "email": email.current.value,
                "bio": bio.current.value,
                "password": password.current.value,
                "favorite_team": parseInt(favoriteTeam.current.value),
                "profile_image_url": profileImage.current.value
            }

            registerUser(newUser)
                .then(res => {
                    if ("token" in res) {
                        localStorage.setItem("cj_token", res.token)
                        navigate("/")
                    }
                })
        } else {
            passwordDialog.current.showModal()
        }
    }

    return (
        <main className="container--login" style={{ textAlign: "center" }}>

            <dialog className="dialog dialog--password" ref={passwordDialog}>
                <div>Passwords do not match</div>
                <button className="button--close" onClick={e => passwordDialog.current.close()}>Close</button>
            </dialog>

            <form className="form--login" onSubmit={handleRegister}>
                <h2 className="h3 mb-3 font-weight-normal register_header">Register</h2>
                <fieldset className="name_container">
                    <input ref={firstName} type="text" name="firstName" className="form-control-first-name" placeholder="First name" required autoFocus />
                    <input ref={lastName} type="text" name="lastName" className="form-control-last-name" placeholder="Last name" required />
                </fieldset>
                <fieldset>
                    <input ref={email} type="text" name="email" className="form-control" placeholder="Email" required />
                </fieldset>
                <fieldset>
                    <input ref={username} type="text" name="username" className="form-control" placeholder="Username" required />
                </fieldset>
                <fieldset>
                    <input ref={profileImage} type="text" name="profileImage" className="form-control" placeholder="Profile Image URL" required />
                </fieldset>
                <fieldset>
                    <select ref={favoriteTeam} name="favoriteTeam" className="form-control-select">
                        <option value="0">Choose your favorite team...</option>
                        {teams.map((team) => (
                                    <option key={team.id} value={team.id}>
                                        {team.name}
                                    </option>
                        ))}
                    </select>
                </fieldset>
                <fieldset>
                    <textarea ref={bio} name="bio" className="form-control bio_text" placeholder="Let other users know a little bit about you..." />
                </fieldset>
                <fieldset>
                    <input ref={password} type="password" name="password" className="form-control" placeholder="Password" required />
                </fieldset>
                <fieldset>
                    <input ref={verifyPassword} type="password" name="verifyPassword" className="form-control" placeholder="Verify password" required />
                </fieldset>
                <fieldset style={{
                    textAlign: "center"
                }}>
                    <button className="btn btn-1 btn-sep icon-send" type="submit">Register</button>
                </fieldset>
                <div className="login_link">Already registered? <Link to="/login">Login</Link></div>
            </form>
        </main>
    )
}
