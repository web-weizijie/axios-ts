import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import { formatUrls } from '../helper/url'
import { flattenHeaders } from '../helper/header'
import xhr from './xhr'
import transfrom from './transfrom'

function transformResponseData(response: AxiosResponse): AxiosResponse {
  response.data = transfrom(response.data, response.headers, response.config.transformResponse)
  return response
}

function transformUrl(config: AxiosRequestConfig): string {
  return formatUrls(config.url!, config.params)
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformUrl(config)
  config.data = transfrom(config.data, config.headers, config.transformRequest)
  config.headers = flattenHeaders(config.headers, config.method!)
}

function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  return xhr(config).then(response => {
    return transformResponseData(response)
  })
}

export default dispatchRequest
