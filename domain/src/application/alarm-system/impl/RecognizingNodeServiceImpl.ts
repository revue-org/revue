import { RecognizingNodeService } from '../RecognizingNodeService.js'
import { RecognizingNode } from '../../../domain/alarm-system/core/RecognizingNode'
import { RecognizingNodeRepository } from '../../../domain/alarm-system/repositories/RecognizingNodeRepository'
import { Model } from 'mongoose'
import { RecognizingNodeRepositoryImpl } from '../../../storage/alarm-system/RecognizingNodeRepositoryImpl'

export class RecognizingNodeServiceImpl implements RecognizingNodeService {
  private recognizingNodes: RecognizingNode[] = []
  private recognizingNodeRepository: RecognizingNodeRepository

  constructor(recognizingNodeModel: Model<RecognizingNode>) {
    this.recognizingNodeRepository = new RecognizingNodeRepositoryImpl(recognizingNodeModel)
  }

  getRecognizingNodeById(id: string): Promise<RecognizingNode> {
    return this.recognizingNodeRepository.getRecognizingNodeById(id)
  }

  getRecognizingNodes(): Promise<RecognizingNode[]> {
    return this.recognizingNodeRepository.getRecognizingNodes()
  }

  insertRecognizingNode(recognizingNode: RecognizingNode): Promise<void> {
    return this.recognizingNodeRepository.insertRecognizingNode(recognizingNode)
  }

  updateRecognizingNode(recognizingNode: RecognizingNode): Promise<void> {
    return this.recognizingNodeRepository.updateRecognizingNode(recognizingNode)
  }

  deleteRecognizingNode(id: string): Promise<void> {
    return this.recognizingNodeRepository.deleteRecognizingNode(id)
  }
}
