import { AxiosError } from "axios"

export enum ApiProblemKind {
  Timeout = "timeout",
  CannotConnect = "cannot-connect",
  Server = "server",
  Unauthorized = "unauthorized",
  Forbidden = "forbidden",
  NotFound = "not-found",
  Rejected = "rejected",
  Unknown = "unknown",
  BadData = "bad-data",
}
export interface GeneralApiProblem {
  kind: ApiProblemKind
  message: any
  temporary?: boolean
}

export function mapAxiosErrorToGeneralApiProblem(error: AxiosError): GeneralApiProblem {
  if (error.code === "ECONNABORTED") {
    return { kind: ApiProblemKind.Timeout, message: {}, temporary: true }
  }
  if (!error.response) {
    return { kind: ApiProblemKind.CannotConnect, message: {}, temporary: true }
  }
  const { status, data } = error.response

  switch (status) {
    case 401:
      return { kind: ApiProblemKind.Unauthorized, message: data }
    case 403:
      return { kind: ApiProblemKind.Forbidden, message: data }
    case 404:
      return { kind: ApiProblemKind.NotFound, message: data }
    case 500:
      return { kind: ApiProblemKind.Server, message: data }
    default:
      return { kind: ApiProblemKind.Rejected, message: data }
  }
}
