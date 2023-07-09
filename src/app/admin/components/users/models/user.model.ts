import { Role } from '../../roles/models/role.model';

export class User {
  uuid: string;
  name: string;
  lastname: string;
  dni: string;
  username: string;
  password: string;
  email: string;
  role: Role;
}
