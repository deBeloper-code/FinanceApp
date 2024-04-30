export interface CardResponse {
  cardId: string
  userId: string
  accountNumber: string
  cardNumber: string
  balance: number
  expiryDate: string
  cvv: string
  type: "debit" | "credit"
}
