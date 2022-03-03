import React from 'react'
import { timeFunction} from '../util/MausamUtil';
import "../css/HourlyData.css"


const HourlyData = ({item, showUnit}) => {
  const hour = Math.floor(new Date().getTime() / 1000);
  const data = item.slice(0,48);

  return (
    <div>
      {
        item ? 
        <>
            {
              data.map((data) => {
                return (
                  <div key={data.dt} className='hourly-data'>
                    {
                      data.dt >= hour ? 
                      <div className="hourly">
                        <div className='time'>{timeFunction(data.dt)}</div>
                        <div className='temp'>{data.temp} °{showUnit}</div>
                        <img className='hourly-icon' src={require(`../assets/icons/${data.weather[0].icon}.png`)} alt="" />
                      </div>
                      :
                      null
                    }
                  </div>
                )
              })
            }
            <div className='scroller'>Scroll for more</div>
        </> 
        :
        null
      }
    </div>
  )
}

export default HourlyData