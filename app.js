const express=require("express");
const bodyParser=require("body-parser");
const https=require("https");
const app=express();
app.use(bodyParser.urlencoded({extended:true}));




app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html");        
});
app.post("/",function(req,res){
    const apikey="a12b8d543944b59b03357a7c5c9a728d";
    const query=req.body.city;
    const units="metric";
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${query}&units=${units}&appid=${apikey}`; 
    https.get(url,(response)=>{
        console.log(response.statusCode);
        response.on("data",(data)=>{
           const weatherData= JSON.parse(data);
           const temp=weatherData.main.temp;
           const descp=weatherData.weather[0].description;
           const icon=weatherData.weather[0].icon;
           const imageUrl=`https://openweathermap.org/img/wn/${icon}@2x.png`;
           res.write("<h1> The weather is "+descp+" </h1>");
           res.write(".<br> <h2>The tempr. is "+temp+" </h2>") ;
           res.write(`<img src=${imageUrl}>`);         
           res.send();
        })
    });    
});


// app.get("/",(req,res)=>{
//     const apikey=a12b8d543944b59b03357a7c5c9a728d;
//     const query="london";
//     const units="metric";
//     const url=`https://api.openweathermap.org/data/2.5/weather?q=${query}&units=${units}&appid=${apikey}`;
  

//     https.get(url,(response)=>{
//         console.log(response.statusCode);
//         response.on("data",(data)=>{
//            const weatherData= JSON.parse(data);
//            const temp=weatherData.main.temp;
//            const descp=weatherData.weather[0].description;
//            const icon=weatherData.weather[0].icon;
//            const imageUrl=`https://openweathermap.org/img/wn/${icon}@2x.png`;
//            res.write("<h1> The weather is "+descp+" </h1>");
//            res.write(".<br> <h2>The tempr. is "+temp+" </h2>") ;
//            res.write(`<img src=${imageUrl}>`);         
//            res.send();
//         })
//     });    
// });

app.listen(3000,()=>{
    console.log("localhost:3000");
});
