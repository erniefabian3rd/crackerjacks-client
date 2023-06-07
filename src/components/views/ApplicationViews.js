import { Route, Routes } from "react-router-dom"
import { Authorized } from "./Authorized"
import { Login } from "../auth/Login"
import { Register } from "../auth/Register"


export const ApplicationViews = () => {
    return <>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<Authorized />}>
            </Route>
        </Routes>
    </>
}
