import axios from 'axios'
import { logError } from '../utils/logger.js'

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN

export async function sendMessage (recipientId, message) {
  try {
    await axios.post(
      `https://graph.facebook.com/v17.0/me/messages?access_token=${PAGE_ACCESS_TOKEN}`,
      {
        recipient: { id: recipientId },
        message: { text: message }
      }
    )
    console.log(`Mensaje enviado a ${recipientId}`)
  } catch (error) {
    logError(error, 'messengerService.sendMessage')
  }
}
