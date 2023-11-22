import mongoose from 'mongoose'
import { deviceModel } from '../model/device'
import { Request, Response } from 'express'

export const deviceController = {
  readAllMovies: async (req: Request, res: Response) => {
    try {
      res.json(await deviceModel.find({}))
    } catch (err) {
      console.log(err)
    }
  },

  readMovie: async (req: Request, res: Response) => {
    try {
      res.json(await deviceModel.findById(req.params.id))
    } catch (err) {
      console.log(err)
    }
  },

  createMovie: async (req: Request, res: Response) => {
    try {
      res.json(await deviceModel.findById(req.params.id))
    } catch (err) {
      console.log(err)
    }
    deviceModel.create({})
  },

  updateMovie: async (req: Request, res: Response) => {}
}
