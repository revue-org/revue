import type { Request } from 'express'
import { Model, model } from 'mongoose'
import { RecognizingNode } from '@domain/alarm-system/core/RecognizingNode.js'
import { RecognizingNodeFactory } from '@domain/alarm-system/factories/RecognizingNodeFactory.js'
import { RecognizingNodeFactoryImpl } from '@domain/alarm-system/factories/impl/RecognizingNodeFactoryImpl.js'
import { RecognizingNodeRepository } from '@domain/alarm-system/repositories/RecognizingNodeRepository.js'
import { RecognizingNodeRepositoryImpl } from '@storage/alarm-system/RecognizingNodeRepositoryImpl.js'
import { recognizingNodeSchema } from '@storage/alarm-system/schemas/RecognizingNodeSchema.js'

const recognizingNodeModel: Model<RecognizingNode> = model<RecognizingNode>(
  'RecognizingNode',
  recognizingNodeSchema,
  'recognizingNode'
)
const recognizingNodeManager: RecognizingNodeRepository = new RecognizingNodeRepositoryImpl(
  recognizingNodeModel
)
const recognizingNodeFactory: RecognizingNodeFactory = new RecognizingNodeFactoryImpl()

export const recognizingNodeController = {
  getRecognizingNode: async (req: Request): Promise<RecognizingNode> => {
    return await recognizingNodeManager.getRecognizingNodeById(req.params.id)
  },
  getRecognizingNodes: async (): Promise<RecognizingNode[]> => {
    return await recognizingNodeManager.getRecognizingNodes()
  },
  createRecognizingNode: async (req: Request): Promise<void> => {
    //recognizingNodeManager.insertRecognizingNode()
  },
  updateRecognizingNode: async (req: Request): Promise<void> => {
    //recognizingNodeManager.updateRecognizingNode()
  },
  deleteRecognizingNode: async (req: Request): Promise<void> => {
    //recognizingNodeManager.deleteRecognizingNode()
  }
}
