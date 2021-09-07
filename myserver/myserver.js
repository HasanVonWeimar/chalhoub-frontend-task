const express = require('express')
const fs = require('fs');
const path = require('path');
const app = express()
const port = 3000
const cors = require('cors');

app.use(cors());

app.listen(port, () => {

    console.log(`Example app listening at http://localhost:${port}`)
})

app.get('/', (req, res) => {
    const pathToData = path.resolve("../assets", "data.json")
    console.log(pathToData)
    fs.readFile(pathToData, 'utf8',  function(err, data){
        if(err){
            console.log("request error") //request failed
            res.send("unexpected error") //todo: expect errors on client side
        }

        // Display the file content
        console.log(data);
        res.send(data)
        return
    });
})