const { response } = require('express')
const express = require('express')
const { v4 } = require('uuid')

const app = express()

app.use(express.json())

// cpf - string
// name - string
// id - uuid
// statement - []

// Middleware

function verifyIfCPFExists (req, res, next) {
  const { cpf } = req.headers

  const customer = customers.find(customer => customer.cpf === cpf)

  if (!customer) {
    return res.status(401).json('Customer with cpf not exists')
  }

  req.customer = customer;

  return next()
}

const customers = []

app.post('/account', (req, res) => {
  const { cpf, name } = req.body

  const costumerAlreadyExists = customers.some(custumer => custumer.cpf === cpf)

  if (costumerAlreadyExists) {
    return res.status(400).json('Customer already exists')
  }

  customers.push({
    cpf,
    name,
    id: v4(),
    statement: []
  })

  return res.status(201).end()
})

// Adicionando middleware no 2 paramentro
app.get('/statement', verifyIfCPFExists, (req, res) => {
  const { customer } = req

  return res.status(201).json(customer.statement)
})

app.post('/deposit', verifyIfCPFExists, (req, res) => {
  const { description, amount } = req.body

  const { customer } = req

  const statementOperation = {
    description,
    amount,
    created_at: new Date(),
    type: 'credit'
  }

  customer.statement.push(statementOperation)

  return res.status(201).end()
})

app.get('/statement/date', verifyIfCPFExists, (req, res) => {
  const { customer } = req
  const { date } = req.query

  const dateFormat = new Date(date + " 00:00");

  console.log(dateFormat)

  const statement = customer.statement.filter(
    (item) =>
      item.created_at.toDateString() ===
      new Date(dateFormat).toDateString()
    )

  return res.json(statement)
})

app.put('/account', verifyIfCPFExists, (req, res) => {
  const { name } = req.body
  const { customer } = req

  customer.name = name

  return res.status(201).send()
})

app.get('/account', verifyIfCPFExists, (req, res) => {
  const { customer } = req

  return res.json(customer)
})

app.delete('/account', verifyIfCPFExists, (req, res) => {
  const { customer } = req

  customers.splice(customer, 1)

  return res.status(200).json(customers)
})

app.listen(3333)
