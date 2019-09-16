import {ReperioCoreConnector} from "./connector";
import {RolePermission} from "../models/rolePermission";
import { QueryParameters } from "../models/queryParameters";

export class PermissionService {
    constructor(public connector: ReperioCoreConnector) { }
    
    async getPermissionById(permissionName: string) {
        return await this.connector.axios.get(`/permissions/${permissionName}`);
    }

    async getPermissions() {
        return await this.connector.axios.get(`/permissions`);
    }

    async getPermissionsQuery(queryParameters: QueryParameters) {
        return await this.connector.axios.post(`/permissions/query`, queryParameters);
    }

    async editPermission(permissionName: string, displayName: string, description: string, isSystemAdminPermission: boolean, rolePermissions: RolePermission[]) {
        const payload = {
            displayName,
            description,
            isSystemAdminPermission,
            rolePermissions: rolePermissions.map(rolePermission => {
                return {
                    roleId: rolePermission.roleId,
                    permissionName: rolePermission.permissionName
                }
            })
        }
        return await this.connector.axios.put(`/permissions/${permissionName}`, payload);
    }
}