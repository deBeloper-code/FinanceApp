import { UserResponse } from "app/models/User/user-model"
import clientInstance from "app/services/client/client"

import { AxiosResponse } from "axios"

export const getUserInformation = async (): Promise<UserResponse> => {
  // eslint-disable-next-line no-useless-catch
  try {
    // Make the API call
    const response: AxiosResponse<UserResponse> = await clientInstance.get("/user")
    // console.log(response.data, "User info")
    // Data user
    return response.data
  } catch (error: any) {
    throw error
  }
}
