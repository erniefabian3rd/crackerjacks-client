import { useEffect, useState } from "react"
import "./UserProfile.css"
import { filterUsersBySearch, getUsers } from "../managers/UserManager"
import { useNavigate } from "react-router-dom"

export const UserList = () => {
    const [CJUsers, setUsers] = useState([])
    const navigate = useNavigate()
    const [ filterBySearch, setFilterBySearch ] = useState()

    const getAllUsers = () => {
        getUsers()
            .then((userData) => {
                const randomizedUsers = [...userData]
                randomizedUsers.sort(() => Math.random() - 0.5)
                setUsers(randomizedUsers)
        })
    }

    useEffect(
        () => {
            getAllUsers()
        }, []
    )

    useEffect(
        () => {
            if (filterBySearch) {
                filterUsersBySearch(filterBySearch)
                    .then((filteredData) => setUsers(filteredData))
            } else {
                getAllUsers()
            }
        }, [filterBySearch]
    )

    const formatDate = (dateString) => {
        const day = dateString.slice(5, 7)
        const month = dateString.slice(8, 10)
        const year = dateString.slice(0, 4)
        return `${day}/${month}/${year}`
    }

    return <>
        <h1 className="users_header">Crackerjacks Users</h1>
        <input type="text"
                className="user_search_box"
                placeholder="Search users..."
                onChange={(changeEvent) => {
                    setFilterBySearch(changeEvent.target.value)
                }} />
        <section className="all_users_container">
        {CJUsers.map((CJUser) => {
            return <div className="users_container" key={CJUser.id}>
                <img className="all_profile_images" src={CJUser.profile_image_url} onClick={() => navigate(`/profile/${CJUser.id}`)}/>
                <div className="profile_info_container">
                    <h4 className="profile_username" onClick={() => navigate(`/profile/${CJUser.id}`)}>{CJUser.user.username}</h4>
                    <p className="profile_fav_team">{CJUser.favorite_team.name} Fan</p>
                    <p className="profile_member_since">Member since: {formatDate(CJUser.created_on)}</p>
                </div>
            </div>
        })

        }
        </section>
    </>
}