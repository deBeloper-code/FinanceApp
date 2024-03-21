import { GeneralApiProblem } from "../apiProblem"
import clientInstance from "app/services/client/client"
import { AxiosResponse } from "axios"

interface LoginParams {
  email: string
  password: string
}

export const login = async ({
  email,
  password,
}: LoginParams): Promise<{ kind: "ok"; token: string } | GeneralApiProblem> => {
  // eslint-disable-next-line no-useless-catch
  try {
    // Make the API call
    const response: AxiosResponse<any> = await clientInstance.post("/authentication", {
      email,
      password,
    })

    // Transform the data into the format you expect
    const token = response.data
    // Token
    return { kind: "ok", token }
  } catch (error: any) {
    throw error
  }
}
