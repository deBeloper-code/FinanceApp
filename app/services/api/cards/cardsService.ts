import { GeneralApiProblem } from "../apiProblem"
import clientInstance from "app/services/client/client"

import { AxiosResponse } from "axios"

export const getUserCards = async (): Promise<{ kind: "ok"; data: string } | GeneralApiProblem> => {
  // eslint-disable-next-line no-useless-catch
  try {
    // Make the API call
    const response: AxiosResponse<any> = await clientInstance.get("/cards")
    console.log(response.data, "Cards")
    // Data user
    return { kind: "ok", data: "response" }
  } catch (error: any) {
    throw error
  }
}
