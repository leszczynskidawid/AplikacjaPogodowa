import React from 'react';
import './ContentComponents.css'
import DetailsWeather from './DetailsWeather';
const ConentComponents = (props) => (

        <main className='main' key = {props.id}>
        <h1>{props.name}</h1>
        <div className='containerTemperature'>
        <img src={props.icon} alt={props.description} />
         <p className='temperatureTxt'>{Math.round(props.temperature)}<sup>o</sup>C</p>
         <div>
      <DetailsWeather 
      key= {props.idWeather}
      description = {props.description}
      main ={props.main}
      icon ={props.icon}
      /> 
         </div>
        </div>

        </main>
);
export default ConentComponents;

