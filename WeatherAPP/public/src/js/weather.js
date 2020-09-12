const appkey='6de9da3c7f74b863491793f1af45c6da'
let img=document.querySelector('.img_clim')
let response=document.querySelector('.res')
let btn=document.querySelector('.btn--search__wth');
let resultDiv=document.querySelector('.main--result')
let dt=document.querySelector(".res__data__dt")
let sunrise=document.querySelector('.res__data__sunrise')
let sunset=document.querySelector('.res__data__sunset')
let temp=document.querySelector('.res__data__temp')
let feels_like=document.querySelector('.res__data__feels_like')
let pressure=document.querySelector('.res__data__pressure')
let humidity=document.querySelector('.res__data__humidity')
let dew_point=document.querySelector('.res__data__dew_point')
let uvi=document.querySelector('.res__data__uvi')
let clouds=document.querySelector('.res__data__clouds')
let visibility=document.querySelector('.res__data__visibility')
let speed=document.querySelector('.res__wind_speed')
let wind__deg=document.querySelector('.res__data__wind_deg')
let description=document.querySelector('.res__data__description')
let date_field=document.querySelector('.field_date')
let divIndicat=document.querySelectorAll('.indic')
let weatherDiv=document.querySelectorAll('.res__weather')
let cityDiv=document.querySelector('.res__data__town')



let date=new Date()
let the_year=date.getFullYear()
let the_month=date.getMonth()
let the_day=date.getDay()
let the_date=date.getUTCDate()
dateFormat(the_day,the_date,the_month,the_year)




let long=null;
let lat=null;


navigator.geolocation.watchPosition((data)=>{

if(data){
   lat=data.coords.latitude;
   long=data.coords.longitude;

}
})

if(localStorage.getItem('climate')){
    for( let divIndic of divIndicat){
        divIndic.style.display='none'
    }
     
    let data=localStorage.getItem('climate')
    let dat=localStorage.getItem('date')
    let obj=JSON.parse(data)
    let arrZone=obj.timezone.split('/')
      let zone=arrZone[1]

      let stringCel=String(obj.current.temp)
      let celsui=stringCel.split('.')
      let celsuisdat=celsui[0].split('')
      let celsuisDi=`${celsuisdat[0]}${celsuisdat[1]}.${celsuisdat[2]}`

    getdata(celsuisDi,obj,dat,zone)
}else{
    for(let resDiv of weatherDiv){
        resDiv.style.display='none'
    }

}


btn.addEventListener('click',()=>{
if(long==null || lat===null){
    return
}

fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&
exclude=hourly,daily&appid=${appkey}`)
.then((res)=>{
    return res.json()
})
.then((result)=>{
if(result){
        localStorage.removeItem('climate')
        localStorage.removeItem('date')
        for(let resDiv of weatherDiv){
            resDiv.style.display='block'
        }
        for( let divIndic of divIndicat){
            divIndic.style.display='none'
        }

}

let data=JSON.stringify(result)
let date=dateFormat(the_day,the_date,the_month,the_year)
localStorage.setItem('climate',data)
localStorage.setItem('date',date)



let obj=JSON.parse(data)
let arrZonedata=obj.timezone.split('/')
let zonedata=arrZonedata[1] 

resultDiv.style.display='flex'
let stringCels=String(obj.current.temp)
let celsuis=stringCels.split('.')
let celsuisdata=celsuis[0].split('')
let celsuisDis=`${celsuisdata[0]}${celsuisdata[1]}.${celsuisdata[2]}`

console.log(celsuisDis)
console.log(zonedata)

    
getdata(celsuisDis,obj,date,zonedata)




})
.catch((err)=>{
    console.log(err)
})


})


function getdata(cels,obj,the_dat,zone){
temp.textContent=cels+' °C'
dt.textContent=obj.current.dt;
sunrise.textContent=obj.current.sunrise
sunset.textContent=obj.current.sunset
feels_like.textContent=obj.current.feels_like
pressure.textContent=obj.current.pressure
humidity.textContent=obj.current.humidity
dew_point.textContent=obj.current.dew_point
clouds.textContent=obj.current.clouds
visibility.textContent=obj.current.visibility
speed.textContent=obj.current.wind_speed
wind__deg.textContent=obj.current.wind_deg
description.textContent=obj.current.weather[0].description
date_field.textContent=the_dat
cityDiv.textContent=zone


}

function dateFormat(day,dat,month,year){

const months=['january','february','march','april','may','june','july','august','september','october','november','December']
const days=['Monday', 'Tuesday', 'Wednesday', 'Thursday','Friday','Saturday','Sunday']

return  days[day-1]+' '+dat+' '+months[month]+' '+year


}