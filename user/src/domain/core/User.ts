import { UserId } from "@/domain/core/UserId";

export interface User {
  get id(): UserId

  get name(): string

  get surname(): string

  get mail(): string

  get contacts(): Contact[]

}
