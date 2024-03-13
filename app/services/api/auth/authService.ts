import { GeneralApiProblem, mapAxiosErrorToGeneralApiProblem } from "../apiProblem"
import clientInstance from "app/services/client/client"
import axios, { AxiosResponse } from "axios"

interface LoginParams {
  email: string
  password: string
}

export const login = async ({
  email,
  password,
}: LoginParams): Promise<{ kind: "ok"; data: any } | GeneralApiProblem> => {
  console.log(email, password, "acaccacaca")
  try {
    // Make the API call
    const response: AxiosResponse<any> = await clientInstance.post("/authentication", {
      email,
      password,
    })

    // Transform the data into the format you expect
    const token = response.data
    console.log(token)

    return { kind: "ok", data: token }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const apiProblem = mapAxiosErrorToGeneralApiProblem(error)
      console.error(apiProblem)
      throw apiProblem
    } else {
      console.error("Error desconocido:", error)
      // eslint-disable-next-line no-throw-literal
      throw { kind: "unknown", temporary: true }
    }
  }
}
