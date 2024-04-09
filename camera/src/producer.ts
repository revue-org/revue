import ffmpeg from 'fluent-ffmpeg'
import ffmpegInstaller from '@ffmpeg-installer/ffmpeg'
import { DeviceIdFactoryImpl } from '@domain/device/factories/impl/DeviceIdFactoryImpl.js'
import { DeviceFactoryImpl } from '@domain/device/factories/impl/DeviceFactoryImpl.js'
import { ResolutionFactoryImpl } from '@domain/device/factories/impl/ResolutionFactoryImpl.js'
import type { Camera } from '@domain/device/core/Camera.js'
import RequestHelper, {
  mediaServerHost,
  mediaServerRtspPort,
  monitoringHost,
  monitoringPort
} from '@/utils/RequestHelper.js'
import { AxiosResponse } from 'axios'
import path from 'path'
import * as console from 'console'

ffmpeg.setFfmpegPath(ffmpegInstaller.path)

if (process.env.CAMERA_CODE === undefined && process.env.NODE_ENV !== 'develop') {
  console.log('No camera code provided')
  process.exit(1)
}
const CAMERA_CODE: string = process.env.CAMERA_CODE || 'cam-01'

let sourceCamera: Camera

export const getCameraInfo = async (): Promise<void> => {
  const monitoringUrl: string = `http://${monitoringHost}:${monitoringPort}`
  console.log('Monitoring URL:', monitoringUrl)
  try {
    const res: AxiosResponse = await RequestHelper.get(`${monitoringUrl}/devices/cameras/${CAMERA_CODE}`)
    console.log('Response:', res.data)
    sourceCamera = new DeviceFactoryImpl().createCamera(
      new DeviceIdFactoryImpl().createCameraId(res.data._id.code),
      false,
      res.data.ipAddress,
      new ResolutionFactoryImpl().createResolution(res.data.resolution.width, res.data.resolution.height)
    )
    console.log(sourceCamera)
  } catch (e) {
    throw new Error('Error while getting camera info')
  }
}

const inputFilePath: string = 'video.mp4'
const rtspStreamUrl: string = `rtsp://${mediaServerHost}:${mediaServerRtspPort}/${CAMERA_CODE}/stream`
console.log('RTSP Stream URL:', rtspStreamUrl)

export const produce = async (): Promise<void> => {
  // ffmpeg -re -stream_loop -1 -i input.mp4 -c:v libx264 -bf 0 -f rtsp -rtsp_transport tcp rtsp://localhost:8554/mystream
  ffmpeg()
    .input(path.resolve(`video/${inputFilePath}`))
    .inputFormat('mp4')
    .inputOptions(['-re', '-stream_loop', '-1'])
    .videoCodec('libx264')
    .addOption('-bf', '0')
    .outputFormat('rtsp')
    .outputOptions(['-rtsp_transport tcp'])
    .output(rtspStreamUrl)
    .on('end', () => {
      console.log('Conversion finished')
    })
    .on('error', (err, stdout, stderr) => {
      if (err) {
        console.log(err.message)
        console.log('stdout:\n' + stdout)
        console.log('stderr:\n' + stderr)
      }
    })
    .run()
}
