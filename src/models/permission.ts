import { RolePermission } from "./rolePermission";

export interface Permission {
    name: string;
    rolePermissions: RolePermission[];
    displayName: string;
    description: string;
    isSystemAdminPermission: boolean;
    lastModified: Date;
}