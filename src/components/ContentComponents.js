import React from 'react';
import './ContentComponents.css'
import DetailsWeather from './DetailsWeather';
const ConentComponents = ({data}) => {
    
        console.log(data)
        
return(
        <main className='main' >
        <h1>{data.cityname}</h1>
        <div className='containerTemperature'>
        <img src={data.icon} alt={data.description} />
         <p className='temperatureTxt'>{Math.round(data.temperature)}<sup>o</sup>C</p>
         <div>
      <DetailsWeather 
      data ={data}
      /> 
         </div>
        </div>

        </main>
)

};
export default ConentComponents;

