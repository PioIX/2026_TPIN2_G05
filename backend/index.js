
const express = require("express");
var bodyParser = require('body-parser'); //Convierte los JSON
const cors = require("cors");
const session = require("express-session");
const { Server } = require("socket.io");
const { realizarQuery } = require('./modulos/mysql');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

const sessionMiddleware = session({
  secret: "supersarasa",
  resave: false,
  saveUninitialized: false,
});
app.use(sessionMiddleware);

const server = app.listen(PORT, () => {
  console.log(`Servidor NodeJS corriendo en http://localhost:${PORT}/`);
});

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:3001"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  },
});

io.use((socket, next) => {
  sessionMiddleware(socket.request, {}, next);
});

let contador = 0;

io.on("connection", (socket) => {
  const req = socket.request;

  socket.on("joinRoom", (data) => {
    if (req.session.room != undefined && req.session.room.length > 0) {
      socket.leave(req.session.room);
    }
    req.session.room = data.room;
    socket.join(req.session.room);

    io.to(req.session.room).emit("chat-messages", {
      user: req.session.user,
      room: req.session.room,
    });
  });

  socket.on("pingAll", (data) => {
    console.log("PING ALL:", data);
    io.emit("pingAll", { event: "Ping to all", message: data });
  });

  socket.on("sendMessage", (data) => {
    io.to(req.session.room).emit("newMessage", {
      room: req.session.room,
      message: data.message,
    });
  });

  socket.on("eventoPersonalizado", () => {
    contador++;
    socket.emit("respuestaPersonalizada", { contador });
  });

  socket.on("disconnect", () => {
    console.log("Disconnect");
  });
});

app.get('/', function(req, res){
    res.status(200).send({ 
        message: 'Funciona'
    });
});








// ==================================================================================================


app.get('/login', async function(req,res){
  try {
    
    let respuesta;

    respuesta = await realizarQuery(`
      SELECT * 
      FROM Usuarios 
      WHERE correo = "${req.query.correo}" AND contra="${req.query.contra}"
    `)
  
  
    res.send(respuesta);

  } catch (error) {
    console.log(error.message);
  

  }
})

app.post('/registrar', async function(req,res) {
  try {


    let existe = await realizarQuery(`
      SELECT * 
      FROM Usuarios 
      WHERE correo = "${req.body.correo}" OR usuario = "${req.body.usuario}"
    `);



    if (existe.length > 0){

      res.send({ ok: false })

    } else{
      
      realizarQuery(`
      INSERT INTO Animales (usuario, correo, contra, foto) 
      VALUES ("${req.body.usuario}", 
        "${req.body.correo}", 
        "${req.body.contra}", 
        "${req.body.foto}");
      `)


      res.send({ ok: true })

    }


  } catch (error) {
    
    console.log(error.message);
      
      
  }
})





