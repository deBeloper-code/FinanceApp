import { useQueries } from "react-query"
import { getUserCards, getUserInformation, getUserTransactions } from "../api"

// This hook works to get general information.
// Calls three different endpoints (User, Cards and Transactions)
export const useUserGeneralInformation = () => {
  return useQueries([
    { queryKey: "user", queryFn: getUserInformation },
    { queryKey: "cards", queryFn: getUserCards },
    // { queryKey: "transactions", queryFn: getUserTransactions },
  ])
}
