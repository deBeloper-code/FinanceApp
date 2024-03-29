import { GeneralApiProblem } from "../apiProblem"
import clientInstance from "app/services/client/client"
import { remove, save } from "app/utils/storage"
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
    await save("token", token)
    // Token
    return { kind: "ok", token }
  } catch (error: any) {
    throw error
  }
}
export const logoutSession = async () => {
  // eslint-disable-next-line no-useless-catch
  try {
    // Remove token
    await remove("token")
  } catch (error: any) {
    throw error
  }
}
