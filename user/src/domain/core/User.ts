import { UserId } from "@/domain/core/UserId";
import { Contact } from "@common/domain/core/Contact";

export interface User {
  get id(): UserId

  get name(): string

  get surname(): string

  get mail(): string

  get contacts(): Contact[]

}
