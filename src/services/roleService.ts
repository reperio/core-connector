import {ReperioCoreConnector} from "./connector";
import { QueryParameters } from "../models/queryParameters";

export class RoleService {
    constructor(public connector: ReperioCoreConnector) { }
    
    async getRoleById(roleId: string) {
        return await this.connector.axios.get(`/roles/${roleId}`);
    }

    async getRoles() {
        return await this.connector.axios.get(`/roles`);
    }

    async getRolesQuery(queryParameters: QueryParameters) {
        return await this.connector.axios.post(`/roles/query`, queryParameters);
    }

    async createRole(name: string, applicationId: string, organizationId: string, permissions: string[]) {
        const payload = {
            name, 
            applicationId,
            organizationId,
            permissions
        }
        return await this.connector.axios.post(`/roles`, payload);
    }

    async editRole(roleId: string, name: string, permissions: string[]) {
        const payload = {
            name, 
            permissions
        }
        return await this.connector.axios.put(`/roles/${roleId}`, payload);
    }

    async deleteRole(roleId: string) {
        return await this.connector.axios.delete(`/roles/${roleId}`);
    }
}