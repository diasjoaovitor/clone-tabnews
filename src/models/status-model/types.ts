export type TStatus = {
  updated_at: Date
  dependencies: {
    database: {
      version: string
      max_connections: number
      opened_connections: number
    }
  }
}
