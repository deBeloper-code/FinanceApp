import axios, { AxiosError, AxiosResponse } from "axios"
import { ApiConfig } from "../api/api.types"
import Config from "../../config"
import { mapAxiosErrorToGeneralApiProblem } from "../api/apiProblem"
import { load } from "app/utils/storage"

export const DEFAULT_API_CONFIG: ApiConfig = {
  url: Config.API_URL,
  timeout: 10000,
}

const clientInstance = axios.create({
  baseURL: DEFAULT_API_CONFIG.url,
  timeout: DEFAULT_API_CONFIG.timeout,
  headers: {
    Accept: "application/json",
  },
})
clientInstance.interceptors.request.use(async (config) => {
  const token = await load("token")
  // console.log(token, "desde el cleinte async")
  if (token.token) {
    config.headers.Authorization = `Bearer ${token?.token}`
  }
  return config
})

clientInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    throw mapAxiosErrorToGeneralApiProblem(error)
  },
)

export default clientInstance
