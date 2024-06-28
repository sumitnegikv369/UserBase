import express from 'express'
import { swaggerDocs, swaggerUi } from './config/swaggerConfig.js'
import userRouter from './routes/user.route.js'
const app = express()

app.use(express.json())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.use('/api/v1/user', userRouter)

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send({ message: err.message })
})

export default app
