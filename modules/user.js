// 'post /register'
const saveUser = (req, res) => {
  const { user } = req.body
  res.json({ message: user })
}

// 'get /user/:id'
const findUser = (req, res) => {
  const { id } = req.params
  res.json({ message: id })
}

// 'put /user/:id'
const updateUser = (req, res) => {
  const { id } = req.params
  res.json({ message: id })

}

// 'delete /user/:id
const deleteUser = (req, res) => {
  const { id } = req.params
  res.json({ message: id })
}

module.exports = {
  saveUser,
  findUser,
  updateUser,
  deleteUser
}