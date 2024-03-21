import { useMutation, useQueryClient } from "react-query"
import { login } from "../api"

export const useLogin = () => {
  const queryClient = useQueryClient()

  return useMutation(login, {
    onSuccess: () => {
      queryClient.invalidateQueries("userData")
    },
    onError(error: any) {
      return error
    },
  })
}
