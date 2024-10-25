export type ApiRequest<P = {}> = P & {
  limit: number
  offset: number
}
