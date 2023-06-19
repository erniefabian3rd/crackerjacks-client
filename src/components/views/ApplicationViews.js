import { Route, Routes } from "react-router-dom"
import { Authorized } from "./Authorized"
import { ParkList } from "../parks/ParkList"
import { HomeFeed } from "../posts/HomeFeed"
import { TeamList } from "../teams/TeamList"
import { TripList } from "../trips/TripList"
import { TripForm } from "../trips/TripForm"
import { UserProfile } from "../profile/UserProfile"
import { OtherUserProfile } from "../profile/OtherUserProfile"
import { UpdatePostForm } from "../posts/UpdatePostForm"
import { UpdateTripForm } from "../trips/UpdateTripForm"
import { ParkDetails } from "../parks/ParkDetails"
import { UpdateProfileForm } from "../profile/UpdateProfileForm"
import { TeamDetails } from "../teams/TeamDetails"
import { TripDetails } from "../trips/TripDetails"
import { PostDetails } from "../posts/PostDetails"
import { ParkReviewForm } from "../parks/ParkReviewForm"
import { UserList } from "../profile/UserList"


export const ApplicationViews = () => {
    return <>
        <Routes>

            <Route element={<Authorized />}>
                <Route path="/" element={<HomeFeed />} />
                <Route path="/posts/:postId" element={<PostDetails />} />
                <Route path="/posts/:postId/edit" element={<UpdatePostForm />} />

                <Route path="/parks" element={<ParkList />} />
                <Route path="/parks/:parkId" element={<ParkDetails />} />
                <Route path="/parks/:parkId/review" element={<ParkReviewForm />} />

                <Route path="/teams" element={<TeamList />} />
                <Route path="/teams/:teamId" element={<TeamDetails />} />

                <Route path="/trips" element={<TripList />} />
                <Route path="/trips/create" element={<TripForm />} />
                <Route path="/trips/:tripId" element={ <TripDetails /> } />
                <Route path="/trips/:tripId/edit" element={<UpdateTripForm />} />

                <Route path="/users" element={<UserList />} />

                <Route path="/myprofile" element={ <UserProfile /> } />
                <Route path="/profile/:userId" element={ <OtherUserProfile /> } />
                <Route path="/profile/:userId/edit" element={ <UpdateProfileForm /> } />
            </Route>

        </Routes>
    </>
}
