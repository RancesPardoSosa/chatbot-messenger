import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import messengerRoutes from './routes/messengerRoutes.js'

dotenv.config()
const app = express()

app.use(bodyParser.json())
app.use('/webhook', messengerRoutes)

app.use((err, req, res, next) => {
  console.error(`Error: ${err.message}`)
  res.status(err.status).json({
    success: false,
    message: err.message
  })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`server running port: ${PORT}`)
})
