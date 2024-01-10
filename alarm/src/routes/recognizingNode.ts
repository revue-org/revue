import { recognizingNodeController } from '../controller/recognizingNode.js'
import express, { Router } from 'express'
import { RecognizingNode } from 'domain/dist/domain/alarm-system/core/RecognizingNode.js'

export const recognizingNodeRouter: Router = express.Router()

recognizingNodeRouter.route('/:id').get((req, res) => {
  recognizingNodeController
    .getRecognizingNode(req)
    .then((recognizingNode: RecognizingNode): void => {
      res.send(recognizingNode)
    })
    .catch((): void => {
      res.send({ error: 'No recognizing node found' })
    })
})

recognizingNodeRouter.route('/').get((req, res) => {
  recognizingNodeController
    .getRecognizingNodes()
    .then((recognizingNodes: RecognizingNode[]): void => {
      res.send(recognizingNodes)
    })
    .catch((): void => {
      res.send({ error: 'No recognizing nodes found' })
    })
})

recognizingNodeRouter.route('/').post((req, res) => {
  recognizingNodeController
    .createRecognizingNode(req)
    .then((): void => {
      res.send({ success: 'Recognizing node created' })
    })
    .catch(() => {
      res.send({ error: 'Recognizing node not created' })
    })
})
recognizingNodeRouter.route('/').put((req, res) => {
  recognizingNodeController
    .updateRecognizingNode(req)
    .then((): void => {
      res.send({ success: 'Recognizing node correctly updated' })
    })
    .catch((): void => {
      res.send({ error: 'Recognizing node not updated' })
    })
})

recognizingNodeRouter.route('/:id').delete((req, res) => {
  recognizingNodeController.deleteRecognizingNode(req)
})