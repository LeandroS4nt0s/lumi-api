import express from 'express'
const AppRouter = express.Router()

AppRouter.get('/hello', (req, res) => {
  res.send('Hello World')
})

export default AppRouter
