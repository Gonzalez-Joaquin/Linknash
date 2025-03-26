interface UserDTO {
  id: string
  name: string
  email: string
  password: string
}

type UserLoginDTO = Pick<UserDTO, "email" | "password">

export type { UserDTO, UserLoginDTO }
