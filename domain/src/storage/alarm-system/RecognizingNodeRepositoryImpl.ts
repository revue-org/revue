import { RecognizingNode } from '../../domain/alarm-system/core/RecognizingNode.js'
import { Model, Promise } from 'mongoose'
import { RecognizingNodeRepository } from '../../domain/alarm-system/repositories/RecognizingNodeRepository'

export class RecognizingNodeRepositoryImpl implements RecognizingNodeRepository {
  recognizingNodeModel: Model<RecognizingNode>

  constructor(recognizingNodeModel: Model<RecognizingNode>) {
    this.recognizingNodeModel = recognizingNodeModel
  }

  async getRecognizingNodes(): Promise<Array<RecognizingNode>> {
    return this.recognizingNodeModel.find()
  }

  async getRecognizingNode(recognizingNodeId: number): Promise<RecognizingNode> {
    return this.recognizingNodeModel.findById(recognizingNodeId).orFail()
  }

  async insertRecognizingNode(recognizingNode: RecognizingNode): Promise<void> {
    await this.recognizingNodeModel.create({
      _id: recognizingNode.recognizingNodeId,
      ipAddress: recognizingNode.ipAddress,
      deviceIds: recognizingNode.deviceIds
    })
  }

  async updateRecognizingNode(recognizingNode: RecognizingNode): Promise<void> {
    await this.recognizingNodeModel.findByIdAndUpdate(recognizingNode.recognizingNodeId, {
      ipAddress: recognizingNode.ipAddress,
      deviceIds: recognizingNode.deviceIds
    })
  }

  async deleteRecognizingNode(recognizingNodeId: number): Promise<void> {
    await this.recognizingNodeModel.findByIdAndDelete(recognizingNodeId)
  }
}
