import { Role } from "./role";
import { Permission } from "./permission";

export interface RolePermission {
    roleId: string;
    role: Role;
    permissionName: string;
    permission: Permission;
}