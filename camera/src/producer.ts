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

export const produce = async (): Promise<void> => {
  ffmpeg(path.resolve(`video/${inputFilePath}`))
    .inputOptions([
      '-re', // Read input at native frame rate
      '-stream_loop -1' // Loop input indefinitely
    ])
    .videoCodec('libx264')
    .addOption('-bf', '0') // Set maximum number of consecutive B-frames to 0
    .outputOptions([
      '-f rtsp', // Output format
      '-rtsp_transport tcp' // Use TCP transport for RTSP
    ])
    .output(rtspStreamUrl)
    .on('start', commandLine => {
      console.log('FFmpeg command:', commandLine)
    })
    .on('error', err => {
      console.error('An error occurred:', err.message)
    })
    .on('end', () => {
      console.log('FFmpeg command execution finished')
    })
    .run()
}
