import React, { useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./Auth.css"
import { loginUser } from "../managers/AuthManager"
import logo from "../../images/crackerjacks-logo.png"


export const Login = () => {
    const username = useRef()
    const password = useRef()
    const invalidDialog = useRef()
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()
        const user = {
            username: username.current.value,
            password: password.current.value
        }
        loginUser(user)
            .then(res => {
                if ("valid" in res && res.valid && "token" in res) {
                    localStorage.setItem("cj_token", res.token)
                    localStorage.setItem("cj_userId", res.user_id)
                    navigate("/")
                }
                else {
                    invalidDialog.current.showModal()
                }
            })
    }

    return (
        <main className="container--login">
            <dialog className="dialog dialog--auth" ref={invalidDialog}>
                <div>Username or password is not valid.</div>
                <button className="button--close" onClick={e => invalidDialog.current.close()}>Close</button>
            </dialog>
            <section>
                <form className="form--login" onSubmit={handleLogin}>
                    <section className="login_info_container">
                    <img className="login_logo" src={logo} />
                    <h2 className="login_header">Please sign in</h2>
                    <fieldset>
                        <input ref={username} type="username" id="username" className="form-control" placeholder="Username" required autoFocus />
                    </fieldset>
                    <fieldset>
                        <input ref={password} type="password" id="password" className="form-control" placeholder="Password" required />
                    </fieldset>
                    <fieldset style={{
                        textAlign: "center"
                    }}>
                        <button className="btn btn-1 btn-sep icon-send" type="submit">Sign In</button>
                    </fieldset>
                    <Link to="/register" className="register_link">Not a member yet?</Link>
                    </section>
                </form>
            </section>
 
        </main>
    )
}
