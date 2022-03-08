/* eslint-disable no-lone-blocks */
import React from 'react'
import { dateFunction, sunTimings, dateSuffix, day, time} from '../util/MausamUtil'
import "../css/CurrentData.css"
import sunrise from "../assets/sunrise.png"
import sunset from "../assets/sunset.png"

const CurrentData = ({item, showUnit, cityName, country, timezone}) => { 
  
  const letterCount = (cityName) => {
    return cityName.replace(/[^a-zA-Z]/g, '').length;
  }

  return (
    <div className='current'>
        <div className={ letterCount(cityName) > 20 ? 'citynameBig' : 'cityName'}>{cityName}, {letterCount(cityName) >= 20 ? <br/> : null} {country}</div>
          <div className='date'>{day(item.dt, timezone)}, {time(item.dt, timezone)}</div>
          <div className='date'>{dateSuffix(item.dt, timezone)}{dateFunction(item.dt,timezone)}</div>
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
                  <span>{sunTimings(item.sunrise, timezone)}</span>
                </div>
                <div className='sun'>
                  <img src={sunset} alt=" " className='sun-icon' /> 
                  <span>{sunTimings(item.sunset, timezone)}</span>
                </div>
            </div>
         </div>
    </div>
    
  )
}

export default CurrentData
