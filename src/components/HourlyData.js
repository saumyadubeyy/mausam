import React from 'react'
import { timeFunction} from '../util/MausamUtil';
import "../css/HourlyData.css"


const HourlyData = ({item, showUnit, timezone}) => {
  return (
    <div className='hourly-data-main'>
      {
        item.map((data) => {
          return (
            <div key={data.dt} className='hourly-data'>
                <div className="hourly">
                  <div>{timeFunction(data.dt, timezone)}</div>
                  <div>{data.temp} °{showUnit}</div>
                  <img className='hourly-icon' src={require(`../assets/icons/${data.weather[0].icon}.png`)} alt="" />
                </div>
            </div>
          )
        })
      }
      <div className='scroller'>Scroll for more</div>
    </div>
  )
}

export default HourlyData