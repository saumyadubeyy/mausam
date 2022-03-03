import React from 'react'
import { dayFunction } from '../util/MausamUtil'
import "../css/DailyData.css"

const DailyData = ({item, showUnit}) => {
  const data = item.slice(1,6);
  return (
    <div className='daily-data'>
      {
        item ? 
        <div className='daily-data-holder'>
            {
              data.map((data) => {
                return (  
                  <div key={data.dt} className="data-box">
                    <div>{dayFunction(data.dt)}</div>
                    <img style={{width : "4vw"}} src={require(`../assets/icons/${data.weather[0].icon}.png`)} className='hello' alt="" />
                    <div>{data.temp.day} °{showUnit}</div>
                    {/* <div>Max: {data.temp.max} °{showUnit}</div>
                    <div>Min: {data.temp.min} °{showUnit}</div> */}
                  </div>
                )
              })
            }
        </div>
        :
        null
      }
    </div>
  )
}

export default DailyData
