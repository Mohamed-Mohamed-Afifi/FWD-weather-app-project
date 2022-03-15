// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

/* Global Variables */

const apiKey='&appid=6532c93edff5b6bc8efaabe9d09789bb&units=imperial';//get the api key

let url="http://localhost:8000/";//the localServer
console.log(url)//for testing

let zip=document.querySelector('#zip');//to get ZipCode from the input text
console.log(zip);//for testing

let feelings=document.querySelector('#feelings');//to get the feelings from the input
console.log(feelings);//for testing

let date=document.querySelector('#date');//used to show date after coming from server
console.log(date);//for testing

let temperature=document.querySelector('#temp');//used to show temp after coming from the server
console.log(temperature);//for testing

let con=document.querySelector('#content');//the container of date and temp and feelings
console.log(con);//for testing

let btn=document.querySelector('#generate');
//for debuging errors and detect this error
let getE=function(error){
    return console.log('there is error on',error);
}
//using addEventListener to generate the data on clicking on button
btn.addEventListener('click',()=>{
    //give data to  API
    let data={
        zipCode:zip.value,
        content:feelings.value,
        date:new Date(),
        temp:"",
    };
    getzipCode(data.zipCode).then(zipInfo=>{//getZipCodeInformation
        //if data is not found give alert
        if(zipInfo.cod !=200){
            return alert(zipInfo.message)
        }
        data.temp=zipInfo.list[0].main.temp;
        console.log(data.temp +"this is temp")//for testing
        sendToserver(data);
    }).catch(getE);//check errors
});
//get ziPcode
async function getzipCode(zipCode){
    return await (await fetch(`http://api.openweathermap.org/data/2.5/forecast?zip=${zipCode}${apiKey}`)).json()
};
//PostData
async function sendToserver(data){
    let response=await fetch(`${url}postData`,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(data)
    });
    try {
        response.json().then(data=>{//if server is responsed get data and pass it to div elements
            if(response.ok){
                again();
            }else{
                alert('get data faild');//if server is faild show alert
            }
        }).catch(getE);
    }catch(error){
        getE(error);
    }
}
async function again(){//pass data to div element to showing it on screen
    let response=await fetch(`${url}all`);
    try{
        response.json().then(data=>{
            date.innerHTML=`Date is ${data.date}`;
            temperature.innerHTML=`Temp is ${data.temp}`;
            con.innerHTML=`my feel is ${data.content}`;
        }).catch(getE);

    }catch(error){
        getE(error);
    }
}
btn.addEventListener('click',()=>{
    if(feelings.value==""){
        con.remove();
    }
});
btn.addEventListener('click',()=>{
    if(feelings.value!=="" && entryHolder.childNodes[4].id!=="content"){
        entryHolder.append(con);
    }
})