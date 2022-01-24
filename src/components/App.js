import React, { Component} from 'react';
import HeaderPage from './HeaderPage';
import ContentComponents from './ContentComponents';
import './App.css';
 //zmienić nazwe zmiennych main => mainDescriptionWeather
 // zmienić nazwe zmiennej description => longDescriptionWeather
 // backData => isLocationExists
 
 const LOCATION_API_BASE_URL = 'https://eu1.locationiq.com/v1/reverse.php';
 const LOCATION_API_KEY= 'pk.0bbce48c6bbd4d797a24305ea7a2304b';

 //TO SAMO Z DRUGIM API ==> 

class App extends Component {
  state = { 
    value: '',//inputvalue
    data: { //weatherData
      id:"",
      cityname:"", // cityName
      temperature:"",
            icon: "",
            main: "",
            description: ""
    },
    isValid:true,
    longitude: 0,
    latitude: 0,
    backData:false
   } 
   getCityNameByGeoLocation  = async (lat, lon) => 
   fetch(`${LOCATION_API_BASE_URL}?key=${LOCATION_API_KEY}&lat=${lat}&lon=${lon}&format=json`)
     .then(response => {
       if (response.ok) {
         return response;
       }
       throw Error(response.status);
     })
     .then(response => response.json())
     .then(data =>  data.address.village)
     .catch(eror => console.log(eror))

 getLocation  = () => {
  if(!navigator.geolocation) {
    console.log( 'Geolocation is not supported by your browser');
   } 
   else {
     navigator.geolocation.getCurrentPosition(position => {
        const {latitude, longitude} = position.coords; 
    
        this.setState({
            longitude,
            latitude,
          backData: true
        })
     });
   }
 };


   componentDidMount  = () => {
      this.getLocation()
    };

   componentDidUpdate  = () => {
     const {latitude, longitude, backData} = this.state;  
    if(backData) 
    {
      this.getCityNameByGeoLocation(latitude,longitude).then(city => {
        this.setState({
          value:city,
          backData:false
        })
        this.handleFetchTheWeather()
      })
    }
   };


   handleFetchTheWeather  = () => {
  
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
          this.checkApiResponseStatusCode(response)
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
          
                icon:`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`,
                main: data.weather[0].main,
                description: data.weather[0].description,
          }
        })
      })
      .catch(error => this.checkApiResponseStatusCode(error))
   };
   //zmiana nazyw funckcji na bardziej sensowną xd 
   checkApiResponseStatusCode  = (res) => {
     const {status} = res;
      if(status ===404)
      {
        alert("bład servera")
      }
      else if(status=== 400)
      {
        alert("błąd zapytania")
      }
   };

   handleInputChange  = (e) => {
 
      this.setState({
        value:e.target.value,
      })
   };
  render() { 

    const {data , value, isValid} =   this.state;
 

    return (
   
//zmienic change na => handleChange itp....
// przekazac data zamiazt temp desc main , icon 
     <>
      <HeaderPage  isValid ={isValid} value ={value}
     change = {this.handleInputChange} click = {this.handleFetchTheWeather} />
      <ContentComponents 
        data = {data} /> 
  
      </>
    );
  }
}
 
export default App;