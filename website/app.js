/* Global Variables */
let d = new Date();
let newDate = d.getMonth()+ 1 +'.'+ d.getDate()+'.'+ d.getFullYear();

const Api = 'http://api.openweathermap.org/data/2.5/weather?zip=';

const key = '&appid=f1b096dd02a7f8bc641de299ed2b5e77&units=metric';
document.querySelector('#button').addEventListener('click', (event)=>{
    const zipVal = document.querySelector('#zip').value;
    fetchWeather(Api,zipVal,key).then((myData)=>{
        const fel = document.querySelector('#feel').value;
        sendServer('/all',{cName: myData.name, cTemp: myData.main.temp, cDate: newDate, cfeeling: fel});
        getServer('/get');
    })
})
const fetchWeather = async (api, zip, key)=> {
    const res = await fetch(api+zip+key);
    try{
        const myData = await res.json();
        console.log(myData);
        return myData;
    } catch(error) {
        console.log(error);
    }
}

const sendServer = async (url = '', data = {})=> {
    const res = await fetch(url, {
        method:"POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    try{
        const sended = await res.json();
        console.log(sended);
    }catch(error){
        console.log(error);
    }
}

const getServer = async (url)=>{
    const res = await fetch(url);
    try{
        const newData = await res.json();
        document.querySelector('#name').innerHTML = newData.name;
        document.querySelector('#time').innerHTML = newData.date;
        document.querySelector('#temp').innerHTML = newData.temp;
        document.querySelector('#feeling').innerHTML = newData.feeling;
    }catch(error) {
        console.log(error);
    }
}