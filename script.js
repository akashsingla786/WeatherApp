const time=document.getElementById('time');
const date=document.getElementById('date');
const currweatheritem=document.getElementById('current-weather-items');
const timezone=document.getElementById('time-zone');
const country=document.getElementById('country');
const weatherforecast=document.getElementById('weather-forecast');
const currrenttemp=document.getElementById('current-temp');


const days=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
const months=['January','February','March','April','May','June','July','August','September','October','November','December'];

const api_key='adc6eca57412ce5289933fb185fdf99b';

setInterval(() => {
    const time1=new Date();
    const month=time1.getMonth();
    const date1=time1.getDate();
    const day=time1.getDay();
    const hour=time1.getHours();
    const hourin12hr=hour>=13?hour%12:hour;
    const minute=time1.getMinutes();
   const minute1=minute<10?'0'+ minute:minute;
    const ampm=hour>=12?"PM":"AM";

    time.innerHTML=(hourin12hr<10?'0'+hourin12hr:hourin12hr) + ':' + minute1+ ' ' +`<span id="am-pm">${ampm}</span>`

    date.innerHTML=days[day] + ', '+ date1 + ' '+ months[month]
}, 1000);


getWeatherData();
function getWeatherData (){
navigator.geolocation.getCurrentPosition((success)=>{
    let {latitude,longitude}=success.coords;

    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${api_key}`).then(res=>res.json()).then(data=>{
    showWeatherData(data);
    })



    
})
}

function showWeatherData(data){
let {humidity,pressure,sunrise,sunset,wind_speed}=data.current;





timezone.innerHTML=data.timezone;
country.innerHTML=data.lat+'N '+data.lon+'E';

currweatheritem.innerHTML=
` <div class="weather-item">
<div>Humidity</div>
<div>${humidity}%</div>
</div>
<div class="weather-item">
<div>Pressure</div>
<div>${pressure}</div>
</div>
<div class="weather-item">
<div>Wind Speed</div>
<div>${wind_speed}</div>
</div>
<div class="weather-item">
<div>Sunrise</div>
<div>${window.moment(sunrise*1000).format('HH:mm a')}</div>
</div>
<div class="weather-item">
<div>Sunset</div>
<div>${window.moment(sunset*1000).format('HH:mm a')}</div>
</div>`;

let otherDayForecast="";
data.daily.forEach((day,idx)=>{
if(idx==0)
{
currrenttemp.innerHTML=`<img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@4x.png" alt="weather icon" class="w-icon">
<div class="other">
    <div class="day">${window.moment(day.dt*1000).format('ddd')}</div>
    <div class="temp">Night - ${day.temp.night}&#176; C</div>
    <div class="temp">Day - ${day.temp.day}&#176; C</div>
</div>
`
} else {
otherDayForecast+=` <div class="weather-forecast-item">
<div class="day">${window.moment(day.dt*1000).format('ddd')}</div>
<img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon">

<div class="temp">Night - ${day.temp.night}&#176; C</div>
<div class="temp">Day - ${day.temp.day}&#176; C</div>
</div>`
}
})


weatherforecast.innerHTML=otherDayForecast;


}