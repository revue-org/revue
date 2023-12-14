import { recognizingNodeController } from '../controller/recognizingNode.js'
import express from 'express'

export const recognizingNodeRouter = express.Router()

recognizingNodeRouter.route('/').get((req, res) => {
  recognizingNodeController.getRecognizingNodes(req, res)
})
//TODO to add get dell'id
recognizingNodeRouter.route('/:id').get((req, res) => {
  recognizingNodeController.getRecognizingNode(req, res)
})
recognizingNodeRouter.route('/').post((req, res) => {
  recognizingNodeController.createRecognizingNode(req, res)
})
recognizingNodeRouter.route('/').put((req, res) => {
  recognizingNodeController.updateRecognizingNode(req, res)
})
//TODO to add get dell'id
recognizingNodeRouter.route('/:id').delete((req, res) => {
  recognizingNodeController.deleteRecognizingNode(req, res)
})
