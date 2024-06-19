import ffmpeg from 'fluent-ffmpeg'
import ffmpegInstaller from '@ffmpeg-installer/ffmpeg'
import RequestHelper, {
  mediaServerHost,
  mediaServerRtspPort,
  monitoringHost,
  monitoringPort
} from '@/utils/RequestHelper.js'
import { AxiosResponse } from 'axios'
import path from 'path'

ffmpeg.setFfmpegPath(ffmpegInstaller.path)

const CAMERA_CODE = process.env.CAMERA_CODE

if (CAMERA_CODE === undefined) {
  console.log('No camera code provided')
  process.exit(1)
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
        console.log('stdout:\n' + stdout)
        console.log('stderr:\n' + stderr)
        throw new Error(err.message)
      }
    })
    .run()
}
