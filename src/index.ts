import { AxiosRequestConfig,AxiosPromise } from './types'
import xhr from './xhr'
import { formatUrls } from './helper/url'
import { transformRequest } from './helper/data'
import { processHeaders } from './helper/header'

function transformUrl(config: AxiosRequestConfig): string {
  return formatUrls(config.url, config.params)
}

function transformRequestData(config: AxiosRequestConfig): string {
  return transformRequest(config.data)
}

function transformHeaders(config: AxiosRequestConfig) {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformUrl(config)
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)
}

function axios(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  return xhr(config)
}

export default axios
