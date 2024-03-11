import { RecognizingNode } from '../../domain/alarm-system/core/RecognizingNode.js'

export interface RecognizingNodeService {
  getRecognizingNodeById(id: string): Promise<RecognizingNode>

  getRecognizingNodes(): Promise<RecognizingNode[]>

  insertRecognizingNode(recognizingNode: RecognizingNode): Promise<void>

  updateRecognizingNode(recognizingNode: RecognizingNode): Promise<void>

  deleteRecognizingNode(id: string): Promise<void>
}
