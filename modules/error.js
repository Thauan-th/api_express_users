module.exports = (err, ...p) => {
  const message_error = {
    message: err
  }
  res.json(message_error)
  return false
} 