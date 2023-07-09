import { Role } from "../../roles/models/role.model";

export class CreateUserDto {
    public name: string;
    public lastname: string;
    public dni: string;
    public username: string;
    public password: string;
    public email: string;
    public role: Role;
}