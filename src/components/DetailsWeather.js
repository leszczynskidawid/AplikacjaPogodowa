import React from 'react';
import "./ContentComponents.css"


const DetailsWeather = ({data}) => (

   

<div className='detailContainer'> 
<h2>{data.main}</h2>
<p>{data.description}</p>


</div>


    
     
);
export default DetailsWeather; 