import React, {useState } from 'react'
import CurrentData from "./CurrentData"
import DailyData from "./DailyData"
import HourlyData from "./HourlyData"
import "../css/Mausam.css"
import searchGlass from "../assets/search.svg"
import loader from "../assets/loader.svg"
import bg from "../assets/xyz2.gif"
import mainBg from "../assets/mainBg.jpg"

const API_KEY = `${process.env.REACT_APP_MAUSAM_API_KEY}`
const PLACES_KEY = `${process.env.REACT_APP_UNSPLASH_API_KEY}`;

const Mausam = () => {
    const [search, setSearch] = useState('')
    const [unit, setUnit] = useState('imperial')
    const [currentData, setCurrentData] = useState(null);
    const [dailyData, setDailyData] = useState('')
    const [hourlyData, setHourlyData] = useState('')
    const [showUnit, setShowUnit] = useState('')
    const [cityName, setCityName] = useState('')
    const [img, setImg] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false);
    const [display, setDisplay] = useState(false)
    const [country, setCountry] = useState('')
    const [res, setRes] = useState(true)

    const fetchData = async (e) => {
        try {
            // e.preventDefault();
            //fetching latitude and longitude from the searched city
            const url1 = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${API_KEY}`;
            const res = await fetch(url1);
            const data = await res.json();
                // console.log(data.sys.country)
            let regionNames = new Intl.DisplayNames(['en'], {type: 'region'});
            const countryName = regionNames.of(data.sys.country);
            setCountry(countryName);
            const lat = data.coord.lat;
            const lon = data.coord.lon;
            const name = data.name;
            setCityName(name);
            //fetching data
            const baseURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&appid=${API_KEY}&units=${unit}`
            const mainRes = await fetch(baseURL);
            const mainData = await mainRes.json();
            //today's forecast:
            const current = mainData.current;
            setCurrentData(current);
            // console.log(current.weather[0].icon)
                    // const img = current.weather[0].icon;
                    // setImg(img);
            // hourly forecast
            const hourly = mainData.hourly;
            setHourlyData(hourly);
            //daily data
            const daily = mainData.daily;
            setDailyData(daily);
            if(unit === "imperial")
                setShowUnit("F");
            else
                setShowUnit("C")
            setError(false)
            setLoading(false)  
            setDisplay(true)
            // // fetching images for the entered city: 
            // const url_places = `https://pixabay.com/api/?key=${API_KEY_PLACES}&q=${name}&min_width=1400&min_height=560&orientation=horizontal&category=travel`
            // const places_res = await fetch(url_places);
            // const places_data = await places_res.json();
            // console.log(places_data.hits[1].largeImageURL)
            // const img = places_data.hits[1].largeImageURL;
            // setImg(img);


            //fetching images for searched cityname:
            // const url_images = `https://api.unsplash.com/search/photos/?client_id=${API_IMAGES}&w=1400&query=${cityName}&h=500`
            // const images_res = await fetch(url_images);
            // const images_data = await images_res.json();
            // console.log(images_data.results[0].urls.full)     ;
            // const bg = images_data.results[0].urls.full;
            // console.log(bg)
            // setDisplaySearch(false)

            const url_images = `https://api.unsplash.com/search/photos/?client_id=${PLACES_KEY}&w=1400&query=${search}&h=1000&orientation=landscape`
            const res_images = await fetch(url_images);
            const res_data = await res_images.json();
            if(res_data.results.length === 0){
                setImg(currentData.weather[0].icon);
                setRes(false)
            }
            else {
                const image = res_data.results[0].urls.regular;
                setImg(image)
            }
            
            // const lowQualityImage = res_data.results[0].urls.small;
            // for(let i=0; i<array.length; i++){
            // }
        } 
        catch(error) {
            setError(true);
            setLoading(false)
        }
    }

  return (
    <div className='weather'> 
                <div className={display ? 'form' : 'formDisplay'}>
                    <div className='search'>
                        <input 
                            value={search}
                            placeholder="Enter City Name"
                            onChange={(e) => setSearch(e.target.value)}
                            className="search-box"
                            onKeyDown={(e) => {if(e.key === 'Enter') {fetchData(); setLoading(true)}}}
                        />
                        <img className='img' src={searchGlass} alt=" " onClick={(e) => {fetchData(); setLoading(true);}} />
                    </div>
                    <div className='radio-buttons'>
                        <label>
                            <input
                                type="radio"
                                name="unit"
                                checked={unit === "imperial"}
                                value="imperial"
                                onChange = {(e) => setUnit(e.target.value)}
                            /> Fahrenheit
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="unit"
                                checked={unit === "metric"}
                                value="metric"
                                onChange = {(e) => setUnit(e.target.value)}
                            /> Celcius
                        </label>
                    </div>
        </div> 
        { error ? <div className={display ? 'error' : 'formDisplay'}>PLEASE ENTER A VALID CITY NAME</div> : null}
        {
            !error ? 
            <>
                {
                    loading ? 
                    <img src={loader} alt=" " />
                    :
                    <>
                        {
                            currentData ? 
                            <div className='main'>
                                <img src={res ? img : require(`../assets/backgrounds/${img}.jpg`)} alt=" " className='bg' />
                                <div className='left'>
                                    <CurrentData item={currentData} showUnit={showUnit} cityName={cityName} country={country} />
                                    <DailyData item={dailyData} showUnit={showUnit} />
                                </div>
                                <div className='right'>
                                    <HourlyData item={hourlyData} showUnit={showUnit} />
                                </div>
                            </div>
                            :
                            <div className={!display ? '' : 'searchDisplay' }  >
                                <div className='heading'>Mausam</div>
                                <div className='heading-text'>just a regular weather forecast app ;)</div>
                                <div className='form-initial form'>
                                    <div className='search'>
                                        <input 
                                            value={search}
                                            placeholder="Enter City Name"
                                            onChange={(e) => setSearch(e.target.value)}
                                            className="search-box"
                                            onKeyDown={(e) => {if(e.key === 'Enter') {fetchData(); setLoading(true)}}}
                                        />
                                        <img className='img' src={searchGlass} alt=" " onClick={(e) => {fetchData(); setLoading(true);}} />
                                    </div>
                                    <div className='radio-buttons'>
                                        <label>
                                            <input
                                                type="radio"
                                                name="unit"
                                                checked={unit === "imperial"}
                                                value="imperial"
                                                onChange = {(e) => setUnit(e.target.value)}
                                            /> Fahrenheit
                                        </label>
                                        <label>
                                            <input
                                                type="radio"
                                                name="unit"
                                                checked={unit === "metric"}
                                                value="metric"
                                                onChange = {(e) => setUnit(e.target.value)}
                                                position = "static"
                                            /> Celcius
                                        </label>
                                    </div>
                        </div> 
                        { error ? <div className='error'>PLEASE ENTER A VALID CITY NAME</div> : null}
                        <div className='footer'>Made by Saumya Dubey</div>
                    </div>
                }
            </>
        }      
            </>
            :
            <>
                <div className={display ? 'formDisplay' : 'searchDisplay' }  >
                                <div className='heading'>Mausam</div>
                                <div className='heading-text'>just a regular weather forecast app ;)</div>
                                <div className='form'>
                                    <div className='search'>
                                        <input 
                                            value={search}
                                            placeholder="Enter City Name"
                                            onChange={(e) => setSearch(e.target.value)}
                                            className="search-box"
                                            onKeyDown={(e) => {if(e.key === 'Enter') {fetchData(); setLoading(true)}}}
                                        />
                                        <img className='img' src={searchGlass} alt=" " onClick={(e) => {fetchData(); setLoading(true);}} />
                                    </div>
                                    <div className='radio-buttons'>
                                        <label>
                                            <input
                                                type="radio"
                                                name="unit"
                                                checked={unit === "imperial"}
                                                value="imperial"
                                                onChange = {(e) => setUnit(e.target.value)}
                                            /> Fahrenheit
                                        </label>
                                        <label>
                                            <input
                                                type="radio"
                                                name="unit"
                                                checked={unit === "metric"}
                                                value="metric"
                                                onChange = {(e) => setUnit(e.target.value)}
                                            /> Celcius
                                        </label>
                                    </div>
                                    {/* <img src={clouds} alt=" " className='gif-clouds'/> */}
                                    {/* <div className='clouds'>
                                        <img src={clouds} alt=" " />
                                        <img src={clouds} alt=" " />
                                    </div> */}
                        </div> 
                            { error ? <div className='error'>PLEASE ENTER A VALID CITY NAME</div> : null}
                </div>
                <div className='footer'>Made by Saumya Dubey</div>
            </>
        }
        
        <div className='mainBg'><img src={!display ? bg : mainBg} alt="" /></div>
    </div>
  )
}

export default Mausam