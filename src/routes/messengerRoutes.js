import express from 'express'
import webhooksController from '../controllers/webhookController.js'

export const router = express.Router()

router.get('/', webhooksController.verifyWebhook)
router.post('/', webhooksController.handleWebhook)
