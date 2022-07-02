const error = require('./error')
const nedb = require('nedb')

//simple configuration
const db = new nedb({
  filename: 'users.db',
  autoload: true
})

//utils - not exported
const req_success = (res, json_return, status = 200) => res.status(status).json(json_return)

//get users
const allUsers = (req, res) => {
  db.find({}).sort({ name: 1 }).exec((err, users) => {
    if (err) return error(err, res)
    req_success(res, users)
  })
}
// 'get /user/:id'
const findUser = (req, res) => {
  const { id } = req.params
  db.findOne({ _id: id }).exec((err, user) => {
    if (err) return error(err, res)
    req_success(res, user)
  })
}
// 'post /register'
const saveUser = (req, res) => {
  const { user } = req.body
  db.insert(user, (err, usr) => {
    if (err) return error(err, res)
    req_success(res, { message: 'user created successfully' }, 201)
  })
}
const loginUser = (req, res) => {
  const { user } = req.body
  db.findOne({ email: user.email, senha: user.senha }).exec((err, usr) => {
    if (err) return error(err, res)
    if (usr) req_success(res, { message: 'user logged' })
    return res.json({ message: 'user not found' })
  })
}
// 'put /user/:id'
const updateUser = (req, res) => {
  const { id } = req.params
  const { user } = req.body
  db.update({ _id: id }, user, err => {
    if (err) return error(err, res)
    req_success(res, Object.assign(req.params, req.body))
  });
}
// 'delete /user/:id
const deleteUser = (req, res) => {
  const { id } = req.params
  db.remove({ _id: id }, {}, err => {
    if (err) return error(err, res)
    req_success(res, { 'user removed': id })
  })
}
module.exports = {
  allUsers,
  saveUser,
  loginUser,
  findUser,
  updateUser,
  deleteUser
}