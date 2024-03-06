import type { Request } from 'express'
import { Model, model } from 'mongoose'
import { RecognizingNode } from '@domain/alarm-system/core/RecognizingNode.js'
import { RecognizingNodeFactory } from '@domain/alarm-system/factories/RecognizingNodeFactory.js'
import { RecognizingNodeFactoryImpl } from '@domain/alarm-system/factories/impl/RecognizingNodeFactoryImpl.js'
import { RecognizingNodeRepository } from '@domain/alarm-system/repositories/RecognizingNodeRepository.js'
import { RecognizingNodeRepositoryImpl } from '@storage/alarm-system/RecognizingNodeRepositoryImpl.js'
import { recognizingNodeSchema } from '@storage/alarm-system/schemas/RecognizingNodeSchema.js'
import { recognizingNodeService } from '../init.js'

const recognizingNodeFactory: RecognizingNodeFactory = new RecognizingNodeFactoryImpl()
export const recognizingNodeController = {
  getRecognizingNodeById: async (id: string): Promise<RecognizingNode> => {
    return await recognizingNodeService.getRecognizingNodeById(id)
  },
  getRecognizingNodes: async (): Promise<RecognizingNode[]> => {
    return await recognizingNodeService.getRecognizingNodes()
  },
  createRecognizingNode: async (req: Request): Promise<void> => {
    await recognizingNodeService.insertRecognizingNode(
      recognizingNodeFactory.createRecognizingNode('', req.body.ipAddress, req.body.deviceIds)
    )
  },
  updateRecognizingNode: async (req: Request): Promise<void> => {
    await recognizingNodeService.updateRecognizingNode(
      recognizingNodeFactory.createRecognizingNode(req.body.id, req.body.ipAddress, req.body.deviceIds)
    )
  },
  deleteRecognizingNode: async (id: string): Promise<void> => {
    return await recognizingNodeService.deleteRecognizingNode(id)
  }
}
