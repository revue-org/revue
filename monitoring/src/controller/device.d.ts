import type { Request, Response } from 'express'
export declare const deviceController: {
  getCameras: (req: Request, res: Response) => Promise<void>
  getSensors: (req: Request, res: Response) => Promise<void>
  getDevice: (req: Request, res: Response) => Promise<void>
  createDevice: (req: Request, res: Response) => Promise<void>
  updateDevice: (req: Request, res: Response) => Promise<void>
}
