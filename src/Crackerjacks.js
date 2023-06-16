import { Route, Routes } from "react-router-dom"
import { NavBar } from "./components/nav/NavBar"
import { ApplicationViews } from "./components/views/ApplicationViews"
import { Login } from "./components/auth/Login"
import { Register } from "./components/auth/Register"

export const Crackerjacks = () => {
	return <Routes>
		<Route path="/login" element={<Login />} />
		<Route path="/register" element={<Register />} />

		<Route path="*" element={
				<>
					<NavBar />
					<ApplicationViews />
				</>

		} />
	</Routes>
}
