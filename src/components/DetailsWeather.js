import React from 'react';
import "./ContentComponents.css"


const DetailsWeather = (props) => (

   

<div className='detailContainer' key = {props.idWeather}>
<h2>{props.main}</h2>
<p>{props.description}</p>


</div>


    
     
);
export default DetailsWeather; 