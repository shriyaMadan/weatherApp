window.addEventListener('load',()=>{
  let long;
  let lat;
  let temperatureDescription = document.querySelector('.temperature-description');
  let temperatureDegree = document.querySelector('.temperature-degree');
  let locationTimezone = document.querySelector('.location-timezone');
  let temperatureSection = document.querySelector('.temperature');
  let temperatureSpan = document.querySelector('.temperature span');
  let icon=document.querySelector('.icon');
  loc= document.getElementById('cityname');
  if(navigator.geolocation){

    navigator.geolocation.getCurrentPosition(position=>{
      lon = position.coords.longitude;
      lat = position.coords.latitude;
      const APIkey='a0afe73789e4305f8b69bd74bab60c64';
      const api=`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${APIkey}`; 
      
   const geoAPI=`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=${5}&appid=${APIkey}`;    
   fetch(geoAPI).then(res=>res.json()).then(data =>{
    console.log(data[0].name,data[0].country);  
    loc.innerHTML=`${data[0].name}, ${data[0].country}`;
   });   
   fetch(api)
       .then(response=>{
        return response.json();
      })
      .then(data=>{
        console.log(data)
        const temperature=Number(data.current.temp - 273.15).toFixed(0);
        const farhenheit = (temperature * 9/5) + 32;
        //const icon=`http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`;
        const summary  = data.current.weather[0].main;
        temperatureDegree.textContent = temperature;
        temperatureSpan.innerHTML="°C"
        temperatureDescription.textContent = summary;
        locationTimezone.textContent = data.timezone;
        //formula for celcius
        
        icon.src=`http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`;

        temperatureSection.addEventListener("click",()=>{
          if(temperatureSpan.textContent=== "°F"){
            temperatureSpan.textContent = "°C";
            temperatureDegree.textContent = temperature;
          }
          else {
            temperatureSpan.textContent = "°F";
            temperatureDegree.textContent = farhenheit;
          }
        });

        })
    })
  }

})
