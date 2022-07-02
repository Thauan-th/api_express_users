const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const port = 3000

const users_module = require('./modules/user')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/register', users_module.saveUser)
app.post('/login', users_module.loginUser)

app.get('/users', users_module.allUsers)
app.get('/user/:id', users_module.findUser)
app.put('/user/:id', users_module.updateUser)
app.delete('/user/:id', users_module.deleteUser)

app.get('/', (req, res) => {
  res.json({ message: 'running' })
})

app.listen(port, () => {
  console.log('server running')
})

