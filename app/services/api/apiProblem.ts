import { AxiosError } from "axios"

export type GeneralApiProblem =
  | { kind: "timeout"; temporary: true }
  | { kind: "cannot-connect"; temporary: true }
  | { kind: "server" }
  | { kind: "unauthorized" }
  | { kind: "forbidden" }
  | { kind: "not-found" }
  | { kind: "rejected" }
  | { kind: "unknown"; temporary: true }
  | { kind: "bad-data" }

export function mapAxiosErrorToGeneralApiProblem(error: AxiosError): GeneralApiProblem {
  if (error.code === "ECONNABORTED") {
    return { kind: "timeout", temporary: true }
  }
  if (!error.response) {
    return { kind: "cannot-connect", temporary: true }
  }
  const { status } = error.response

  switch (status) {
    case 401:
      return { kind: "unauthorized" }
    case 403:
      return { kind: "forbidden" }
    case 404:
      return { kind: "not-found" }
    case 500:
      return { kind: "server" }
    default:
      return { kind: "rejected" }
  }
}
