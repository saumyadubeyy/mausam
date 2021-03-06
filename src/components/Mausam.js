import React, {useEffect, useState} from 'react'
import CurrentData from "./CurrentData"
import DailyData from "./DailyData"
import HourlyData from "./HourlyData"
import "../css/Mausam.css"
import searchGlass from "../assets/search.svg"
import loader from "../assets/loader.svg"
import bg from "../assets/xyz2.gif"
import mainBg from "../assets/mainBg.jpg"
import mobileBG from "../assets/mobileBG.gif"
import Footer from './Footer'


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
    const [timezone, setTimezone] = useState('')
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
        const changeWidth = () => {
          setScreenWidth(window.innerWidth);
        }
        window.addEventListener('resize', changeWidth)
      }, []);


    function isEmptyOrSpaces(str){
        return str === null || str.match(/^ *$/) !== null;
    }

    const fetchData = async (e) => {
        setImg("")
        try {           
            // e.preventDefault();
            //fetching latitude and longitude from the searched city
            const url1 = `https://api.openweathermap.org/data/2.5/weather?q=${search.trim()}&appid=${API_KEY}`;
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
            // hourly forecast
            const tz = mainData.timezone;
            setTimezone(tz)
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
            if(isEmptyOrSpaces(search)){
                setError(true)
            }
            const url_images = `https://api.unsplash.com/search/photos/?client_id=${PLACES_KEY}&w=1400&query=${search.toLowerCase().trim()}&h=1000&orientation=landscape`
            const res_images = await fetch(url_images);
            const res_data = await res_images.json();
            if(res_data.results.length === 0){
                setImg(mainBg)
            }
            else {
                const image = res_data.results[0].urls.regular;
                setImg(image)
            }
            
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
                            <input
                                type="radio"
                                id="unit-one"
                                name="unit"
                                checked={unit === "imperial"}
                                value="imperial"
                                onChange = {(e) => setUnit(e.target.value)}
                            />
                        <label htmlFor='unit-one'>?? F</label>
                            <input
                                type="radio"
                                id='unit-two'
                                name="unit"
                                checked={unit === "metric"}
                                value="metric"
                                onChange = {(e) => setUnit(e.target.value)}
                            /> 
                        <label htmlFor='unit-two'>?? C</label>
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
                                <img src={img} alt=" " className='bg' /> 
                                
                                <div className='left'>
                                    <CurrentData item={currentData} showUnit={showUnit} cityName={cityName} country={country} timezone={timezone} />
                                    <DailyData item={dailyData} showUnit={showUnit} timezone={timezone} />
                                </div>
                                <div className='right'>
                                    <HourlyData item={hourlyData} showUnit={showUnit} timezone={timezone} />
                                </div>
                            </div>
                            :
                            <div className={!display ? '' : 'searchDisplay' }  >
                                <div className='heading'>Mausam</div>
                                <div className='heading-text'>not your regular weather forecast app ;)</div>
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
                                        <input
                                            type="radio"
                                            id="unit-one"
                                            name="unit"
                                            checked={unit === "imperial"}
                                            value="imperial"
                                            onChange = {(e) => setUnit(e.target.value)}
                                        />
                                        <label htmlFor='unit-one'>?? F</label>
                                        <input
                                            type="radio"
                                            id='unit-two'
                                            name="unit"
                                            checked={unit === "metric"}
                                            value="metric"
                                            onChange = {(e) => setUnit(e.target.value)}
                                        /> 
                                        <label htmlFor='unit-two'>?? C</label>
                                </div>
                                </div> 
                        { error ? <div className='error'>PLEASE ENTER A VALID CITY NAME</div> : null}
                        <Footer />
                    </div>
                }
            </>
        }      
            </>
            :
            <>
                <div className={display ? 'formDisplay' : 'searchDisplay' }  >
                                <div className='heading'>Mausam</div>
                                <div className='heading-text'>not your regular weather forecast app ;)</div>
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
                                        <input
                                            type="radio"
                                            id="unit-one"
                                            name="unit"
                                            checked={unit === "imperial"}
                                            value="imperial"
                                            onChange = {(e) => setUnit(e.target.value)}
                                        />
                                        <label htmlFor='unit-one'>?? F</label>
                                        <input
                                            type="radio"
                                            id='unit-two'
                                            name="unit"
                                            checked={unit === "metric"}
                                            value="metric"
                                            onChange = {(e) => setUnit(e.target.value)}
                                        /> 
                                        <label htmlFor='unit-two'>?? C</label>
                                    </div>
                        </div> 
                            { error ? <div className='error'>PLEASE ENTER A VALID CITY NAME</div> : null}
                </div>
                <Footer />
            </>
        }
        
        <div className='mainBg'><img src={!display ? screenWidth < 600 ? mobileBG : bg : mainBg} alt="" /></div>
    </div>
  )
}

export default Mausam