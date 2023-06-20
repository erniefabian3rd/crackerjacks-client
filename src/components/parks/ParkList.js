import { useEffect, useState } from "react"
import "./Parks.css"
import { filterParksBySearch, getParks } from "../managers/ParkManager"
import { useNavigate } from "react-router-dom"

export const ParkList = () => {
    const [parks, setParks] = useState([])
    const navigate = useNavigate()
    const [ filterBySearch, setFilterBySearch ] = useState()

    const getAllParks = () => {
        getParks()
            .then((parksData) => {
                setParks(parksData)
        })
    }

    useEffect(
        () => {
            getAllParks()
        }, []
    )

    useEffect(
        () => {
            if (filterBySearch) {
                filterParksBySearch(filterBySearch)
                    .then((filteredData) => setParks(filteredData))
            } else {
                getAllParks()
            }
        }, [filterBySearch]
    )

    return <>
    <input type="text"
                className="park_search_box"
                placeholder="Search parks..."
                onChange={(changeEvent) => {
                    setFilterBySearch(changeEvent.target.value)
                }} />
    <section className="parks_container">
    {
        parks.map((park) => {
            return (
                <div className="parks_info" key={`parks--${park.id}`}>
                    <img className="parks_image" src={park.image_url} alt="Park" onClick={() => navigate(`/parks/${park.id}`)}/>
                    <div className="parks_text">
                        <div className="parks_sub_container">
                            <h3 className="parks_name" onClick={() => navigate(`/parks/${park.id}`)}>{park.name}</h3>
                            <p className="parks_avg_rating">Rating: {park.avg_rating}</p>
                        </div>
                        <p className="parks_location">{park.location}</p>
                    </div>
                </div>
            )
        })
    }
    </section>

    </>
}