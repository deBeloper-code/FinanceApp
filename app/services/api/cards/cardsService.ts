import { CardResponse } from "app/models/card/card-model"
import clientInstance from "app/services/client/client"

import { AxiosResponse } from "axios"

export const getUserCards = async (): Promise<CardResponse[]> => {
  // eslint-disable-next-line no-useless-catch
  try {
    // Make the API call
    const response: AxiosResponse<CardResponse[]> = await clientInstance.get("/cards")
    console.log(response, "Cards")
    // Data user
    return response?.data
  } catch (error: any) {
    console.log(error)
    throw error
  }
}
