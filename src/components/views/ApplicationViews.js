import { Route, Routes } from "react-router-dom"
import { Authorized } from "./Authorized"
import { Login } from "../auth/Login"
import { Register } from "../auth/Register"
import { ParkList } from "../parks/ParkList"
import { HomeFeed } from "../posts/HomeFeed"
import { TeamList } from "../teams/TeamList"
import { TripList } from "../trips/TripList"
import { TripForm } from "../trips/TripForm"
import { PostForm } from "../posts/PostForm"
import { UserProfile } from "../profile/UserProfile"
import { OtherUserProfile } from "../profile/OtherUserProfile"


export const ApplicationViews = () => {
    return <>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route element={<Authorized />}>
                <Route path="/" element={<HomeFeed />} />
                <Route path="/posts/create" element={<PostForm />} />

                <Route path="/myprofile" element={ <UserProfile /> } />
                <Route path="/profile/:userId" element={ <OtherUserProfile /> } />
                
                <Route path="/parks" element={<ParkList />} />
                <Route path="/teams" element={<TeamList />} />

                <Route path="/trips" element={<TripList />} />
                <Route path="/trips/create" element={<TripForm />} />
            </Route>

        </Routes>
    </>
}
