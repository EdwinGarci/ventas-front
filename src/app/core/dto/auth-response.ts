import { User } from "src/app/admin/components/users/models/user.model";

export class AuthResponse {
    public user: User;
    public token: string;
}