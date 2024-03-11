import { RecognizingNodeService } from '../RecognizingNodeService.js'
import { RecognizingNode } from '../../../domain/alarm-system/core/RecognizingNode.js'
import { RecognizingNodeRepository } from '../../../domain/alarm-system/repositories/RecognizingNodeRepository.js'

export class RecognizingNodeServiceImpl implements RecognizingNodeService {
  private recognizingNodes: RecognizingNode[] = []
  private recognizingNodeRepository: RecognizingNodeRepository

  constructor(recognizingNodeRepository: RecognizingNodeRepository) {
    this.recognizingNodeRepository = recognizingNodeRepository
  }

  getRecognizingNodeById(id: string): Promise<RecognizingNode> {
    return this.recognizingNodeRepository.getRecognizingNodeById(id)
  }

  getRecognizingNodes(): Promise<RecognizingNode[]> {
    return this.recognizingNodeRepository.getRecognizingNodes()
  }

  async insertRecognizingNode(recognizingNode: RecognizingNode): Promise<void> {
    await this.recognizingNodeRepository.insertRecognizingNode(recognizingNode)
    this.recognizingNodes.push(recognizingNode)
  }

  async updateRecognizingNode(recognizingNode: RecognizingNode): Promise<void> {
    await this.recognizingNodeRepository.updateRecognizingNode(recognizingNode)
    this.recognizingNodes = this.recognizingNodes.map(
      (node: RecognizingNode): RecognizingNode =>
        node.recognizingNodeId === recognizingNode.recognizingNodeId ? recognizingNode : node
    )
  }

  deleteRecognizingNode(id: string): Promise<void> {
    return this.recognizingNodeRepository.deleteRecognizingNode(id)
  }
}
