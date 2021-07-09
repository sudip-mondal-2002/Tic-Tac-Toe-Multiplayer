const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.get("/", (req, res)=>{
    res.render("index");
})
server.listen(port, () => console.log(`Server running on port ${port}`));