import botController from './botController.js'
import { logError } from '../utils/logger.js'

export const verifyWebhook = (req, res) => {
  const VERIFY_TOKEN = process.env.VERIFY_TOKEN
  const mode = req.query['hub.mode']
  const token = req.query['hub.verify_token']
  const challenge = req.query['hub.challenge']

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    console.log('Webhook verificado correctamente')
    res.status(200).send(challenge)
  } else {
    res.sendStatus(403)
  }
}

export const handleWebhook = async (req, res) => {
  try {
    const body = req.body

    if (body.object === 'page') {
      for (const entry of body.entry) {
        const event = entry.messaging[0]
        const senderId = event.sender.senderId

        if (event.message && event.message.text) {
          const userMessage = event.message.text
          console.log(`Mensaje: ${userMessage} senderId: ${senderId}`)
          await botController.handleMessage(senderId, userMessage)
        }
      }
      res.sendStatus(200)
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    logError(error, 'webhookController.handleWebhook')
    res.sendStatus(500)
  }
}
