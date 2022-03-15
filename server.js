let cors=require('cors');
let express=require('express');
let bodyParser=require('body-parser');
//local server
const port=8000;
// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes

// Start up an instance of app
let app=express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());//may be {}
// Initialize the main project folder
app.use(express.static('website'));

//Test the server
app.listen(port,function(){
    return console.log(`running at http://localhost:${port}`);
});

// Setup Server
let getA=(request,response)=>{
    return response.send(projectData);
};
app.get('/all',getA);
//post Data
let postD=(request,response)=>{
    projectData={
        temp:request.body.temp,
        date:request.body.date,
        content:request.body.content
    };
    response.send(projectData).status(404).end();
}
app.post('/postData',postD);