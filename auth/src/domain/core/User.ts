import { UserId } from "@/domain/core/UserId";

export interface User {
  get id(): UserId;

  get username(): string;

  get password(): string;

  get permissions(): Permission[];

  get accessToken(): string;

  get refreshToken(): string;

}
