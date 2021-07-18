import React, { useState } from 'react'
import DisplayWeather from './DisplayWeather'
import './weather.css'

const Weather = () => {

    const APIKEY = '506c8b95a3ac7940916f2ee133ba575d'

    const [form, setForm] = useState({
        city: '',
        country: '',
    })
    const [weather, setWeather] = useState([])

    const weatherData = async (e) => {
        e.preventDefault();
        if (form.city === '') {
            alert('Add input values')
        } else {
            const data = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${form.city},${form.country}&appid=${APIKEY}`
            )
                .then(res => res.json())
                .then(data => data)

            setWeather({ data: data })
        }
    }

    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value

        if (name == 'city') {
            setForm({ ...form, city: value })
        }

        if (name == 'country') {
            setForm({ ...form, country: value })
        }

        // console.log(form.city, form.country)
    }

    return (
        <div className="weather">
            <span className="title"> Weather app </span>
            <br />

            <form>
                <input type="text" name="city" placeholder="City" onChange={e => handleChange(e)} />
                <input type="text" name="country" placeholder="Country" onChange={e => handleChange(e)} />
                <button className="getweather" onClick={e => weatherData(e)}>Submit</button>
            </form>

            {
                weather.data !== undefined ?
                    <div>
                        <DisplayWeather data={weather.data} />
                    </div> : null

            }

        </div>
    )
}

export default Weather
