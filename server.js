// Setup empty JS object to act as endpoint for all routes
projectData = {};

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());

app.use(express.static('website'));

const port = 5000;
const server = app.listen(port, ()=> {
    console.log(`http://localhost:${port}`);
})

app.post('/all', (req,res)=>{
    projectData.name = req.body.cName;
    projectData.temp = req.body.cTemp;
    projectData.date = req.body.cDate;
    projectData.feeling = req.body.cfeeling;
    res.send(projectData);
    console.log(projectData);
    return projectData;
}
);

app.get('/get', (req,res)=>{
 res.send(projectData);
})
