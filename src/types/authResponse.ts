export type authResponse={
  message: string,
  user: {
    name: string,
    email: string,
    role: string
  },
  token: string
}