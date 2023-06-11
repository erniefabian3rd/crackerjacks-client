import { useEffect, useState } from "react"
import "./Parks.css"
import { getParks } from "../managers/ParkManager"

export const ParkList = () => {
    const [parks, setParks] = useState([])

    useEffect(
        () => {
            getParks()
                .then((parksData) => setParks(parksData))
        }, []
    )

    return <>
    <h1 className="parks_header">MLB Parks</h1>
    <section className="parks_container">
    {
        parks.map((park) => {
            return (
                <div className="parks_info" key={`parks--${park.id}`}>
                    <img className="parks_image" src={park.image_url} alt="Park" />
                    <div className="parks_text">
                        <div className="parks_sub_container">
                            <h3 className="parks_name">{park.name}</h3>
                            <p className="parks_avg_rating">Rating: </p>
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