export type Message = {
  user_id: number
  chat_id: number
  sent_at: string
  content: string
}

export type MessageCreate = {
  chat_id: number
  content: string
}
