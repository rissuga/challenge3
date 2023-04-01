const express = require('express');
const app = express();
const port = 8000;
const path = require('path');

const publicDir = path.join(__dirname, '../public')
app.use(express.static(publicDir))


app.get('/', (req,res)=>{
    res.status(200);
    res.sendFile(path.join(publicDir, 'index.html')) 
});

app.get('/cars', (req,res)=>{
    res.status(200);
    res.sendFile(path.join(publicDir, 'carimobil.html')) 
});

app.listen(port, ()=>{
    console.log("Server jalan buka http://127.0.0.1:%d", port)
})