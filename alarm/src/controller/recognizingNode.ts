import type { Request, Response } from 'express'
import { Model, model } from 'mongoose'
import {RecognizingNode } from 'domain/dist/domain/alarm-system/core/RecognizingNode.js'
import { RecognizingNodeFactory } from 'domain/dist/domain/alarm-system/factories/RecognizingNodeFactory.js'
import { RecognizingNodeFactoryImpl } from 'domain/dist/domain/alarm-system/factories/impl/RecognizingNodeFactoryImpl.js'
import { RecognizingNodeRepository } from 'domain/dist/domain/alarm-system/repositories/RecognizingNodeRepository.js'
import { RecognizingNodeRepositoryImpl } from 'domain/dist/storage/alarm-system/RecognizingNodeRepositoryImpl.js'
import { recognizingNodeSchema } from 'domain/dist/storage/alarm-system/schemas/RecognizingNodeSchema.js'

const recognizingNodeModel: Model<RecognizingNode> = model<RecognizingNode>(
  'RecognizingNode',
  recognizingNodeSchema,
  'recognizingNode'
)
const recognizingNodeManager: RecognizingNodeRepository = new RecognizingNodeRepositoryImpl(
  recognizingNodeModel
)
const notificationFactory: RecognizingNodeFactory = new RecognizingNodeFactoryImpl()

export const recognizingNodeController = {
  getRecognizingNodes: async (req: Request, res: Response) => {
    res.json('ok')
  },
  getRecognizingNode: async (req: Request, res: Response) => {
    res.json('ok')
  },
  createRecognizingNode: async (req: Request, res: Response) => {
    res.json('ok')
  },
  updateRecognizingNode: async (req: Request, res: Response) => {
    res.json('ok')
  },
  deleteRecognizingNode: async (req: Request, res: Response) => {
    res.json('ok')
  }
}
