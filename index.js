const express = require("express")
const { port } = require("./config")

let users = [] //Estado actual

const app = express()

//middleware para poder enviar un json, un body en formato json
app.use(express.json())

//GET obtener recursos
app.get("/", (req, res) => {
  return res.json({ users })
})


//POST Crear recursos
app.post("/", (req, res) => {//voy a recibir mi body, mi usuario
  const user = req.body
  users.push(user)

  return res.status(201).json(users)
})

app.put("/:id", (req, res) => {
  //Aqui tenia ***
  //const id = req.params.id
  //const body = req.body
  const { body, params: { id } } = req

  //users = users.map(user=>{
  //     if(user.id===id){
  //         return body
  //     }

  //     return user
  // })
  users = users.map(user => user.id === id ? body : user)

  return res.status(201).json(users)
})

//Indicar que recurso queremos eliminar con el delete
app.delete("/:id", (req, res) => {
  const id = req.params.id
  users = users.filter(user => id !== user.id)

  return res.json(users)   //no hace falta poner return pero es una buena practica
})

app.listen(port, () => {
  console.log("Escuchando: http://localhost:" + port)
})