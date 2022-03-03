import React from 'react'
import { dateFunction, sunTimings, dateSuffix, day, time} from '../util/MausamUtil'
import "../css/CurrentData.css"
import sunrise from "../assets/sunrise.png"
import sunset from "../assets/sunset.png"

const CurrentData = ({item, showUnit, cityName}) => {

  return (
    <div className='current'>
        <div className='cityName'>{cityName}</div>
          <div className='date'>{day(item.dt)}, {time(item.dt)}</div>
          <div className='date'>{dateSuffix(item.dt)}{dateFunction(item.dt)}</div>
        <div className='main-current-holder'>
            <div className='current-holder'>
                <div className='main-holder'>
                  <div className='main-temp'>{item.temp} °{showUnit}</div>
                  <div className='feels-like'>feels like {item.feels_like} °{showUnit}</div>
                </div>
                <div className='icon-holder'>
                  <img className='current-icon' src={require(`../assets/icons/${item.weather[0].icon}.png`)} alt="" />
                  <div className='current-description'>{item.weather[0].description}</div>
                </div>
            </div>
            <div className='sun-holder'>
                <div className='sun'>
                  <img src={sunrise} alt=" " className='sun-icon' />
                  <span>{sunTimings(item.sunrise)}</span>
                </div>
                <div className='sun'>
                  <img src={sunset} alt=" " className='sun-icon' /> 
                  <span>{sunTimings(item.sunset)}</span>
                </div>
            </div>
         </div>
    </div>
    
  )
}

export default CurrentData
