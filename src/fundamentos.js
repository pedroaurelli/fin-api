const { response } = require('express')
const express = require('express')

// iniciando o app

const app = express()

// habilita o app a usar json() no body

app.use(express.json())

// métodos de requisição e tipos de parametros

app.get('/courses', (req, res) => {
  const query = req.query
  console.log(query)
  return res.json(["Curso 1", "Curso 2", "Curso 3"])
})

app.post('/courses', (req, res) => {
  const body = req.body
  console.log(body)
  return res.json([ "Curso 1","Curso 2","Curso 3", "Curso 4" ])
})

app.patch('/courses/:id', (req, res) => {
  const params = req.params
  console.log(params)
  return res.json(["Curso 6","Curso 2","Curso 3","Curso 4"])
})

app.delete('/courses/:id', (req, res) => {
  return res.json(["Curso ","Curso 2","Curso 4"])
})


// abre o servidor na porta
app.listen(3333)
