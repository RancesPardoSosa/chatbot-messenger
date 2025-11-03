import messengerService from '../services/messengerService.js'
import vectorDBService from '../services/vectorDBService.js'
import { logError } from '../utils/logger.js'

export const handleMessage = async (senderId, userMessage) => {
  try {
    const bestMatch = await vectorDBService.search(userMessage)
    let responseText = ''
    if (bestMatch) {
      responseText = `${bestMatch.text}\nPrecio: s/ ${bestMatch.metadata.price}`
    } else {
      responseText =
        'Lo siento, no encontre el producto. ¿Podrías especificarlo un poco más?'
    }
    await messengerService.sendMessage(senderId, responseText)
  } catch (error) {
    logError(error, 'botcontroller.handleMessage')
    await messengerService.sendMessage(
      senderId,
      'Ocurrio un error al procesar tu mensaje.'
    )
  }
}
