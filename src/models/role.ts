import { Organization } from "./organization";
import { RolePermission } from "./rolePermission";

export interface Role {
    id: string;
    name: string;
    organization: Organization;
    organizationId: string;
    visible: boolean;
    rolePermissions: RolePermission[];
}