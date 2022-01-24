import React, { Component} from 'react';
import HeaderPage from './HeaderPage';
import ContentComponents from './ContentComponents';


import './App.css';
 

class App extends Component {
  state = { 
    value: '',
    data: {
      id:"",
      cityname:"",
      temperature:"",
        //details wheter
            idWeather:"",
            icon: "",
            main: "",
            description: ""
    },
    isValid:true,
    lon: 0,
    lat: 0,
    backData:false
   } 
   getCityNameByGeoLocation  = async (lat, lon) => 
   fetch(`https://eu1.locationiq.com/v1/reverse.php?key=pk.0bbce48c6bbd4d797a24305ea7a2304b&lat=${lat}&lon=${lon}&format=json`)
     .then(response => {
       if (response.ok) {
         return response;
       }
       throw Error(response.status);
     })
     .then(response => response.json())
     .then(data => {
       let city = data.address.village
       return city
     })
     .catch(eror => console.log(eror))

 getLocation  = (e) => {
  if(!navigator.geolocation) {
    console.log( 'Geolocation is not supported by your browser');
   } 
   else {
     navigator.geolocation.getCurrentPosition(position => {
       const lat = position.coords.latitude;
       const longitude = position.coords.longitude;
        this.setState({
          lon: longitude,
          lat:lat,
          backData: true
        })
     });
   }
 };


   componentDidMount  = (e) => {
      this.getLocation()
    };

   componentDidUpdate  = (e) => {
    if( this.state.backData === true) 
    {
      this.getCityNameByGeoLocation(this.state.lat,this.state.lon).then(city => {
        this.setState({
          value:city,
          backData:false
        })
        this.handleFetchTheWeather()
      })
    }
   };

   handleFetchTheWeather  = (e) => {
  
     fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.state.value}&appid=6c3ebadaa16d7e635a8901841517ee48&units=metric`)
     .then(response => 
      {
        if(response.ok)
        {
          this.setState({
            isValid:true,
          })
          return response
        }
        else 
        {
          this.ValidFunction(response)
          this.setState({
            isValid:false,
          })
          throw Error(response.status)
        }
      })
      .then(response => response.json())
      .then(data=>  {
        this.setState({
          data:{
            
            id:data.id,
            cityname: data.name,
            temperature:data.main.temp,
            //szczególy takie jak wiatr
                idWeather:data.weather[0].id,
                icon:`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`,
                main: data.weather[0].main,
                description: data.weather[0].description,
          }
        })
      })
      .catch(error => this.ValidFunction(error))
   };
   ValidFunction  = (res) => {
     console.log(this.state.value)
      if(res.status ===404)
      {
        alert("bład servera")
      }
      else if(res.status=== 400)
      {
        alert("błąd zapytania")
      }
    
      this.setState({
        value: ""
      })
   };

   handleInputChange  = (e) => {
 
      this.setState({
        value:e.target.value,
      })
   };
  render() { 

    const {data: {id, cityname, temperature,idWeather, description,main, icon}, value} =   this.state;
 

    return (
   

     <>
      {/* <div>{this.state.value}</div> */}
      <HeaderPage  isValid ={this.state.isValid} value ={value}
      change = {this.handleInputChange}click = {this.handleFetchTheWeather} />
      <ContentComponents id= {id} 
        name = {cityname}
        temperature ={temperature}
        idWeather ={idWeather}
        description ={description} 
        main={main} icon={icon} /> 
  
      </>
    );
  }
}
 
export default App;