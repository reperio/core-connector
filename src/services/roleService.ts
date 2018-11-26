import {ReperioCoreConnector} from "./connector";

export class RoleService {
    constructor(public connector: ReperioCoreConnector) { }
    
    async getRoleById(roleId: string) {
        return await this.connector.axios.get(`/roles/${roleId}`, {baseURL: this.connector.config.baseURL});
    }

    async getRoles() {
        return await this.connector.axios.get(`/roles`, {baseURL: this.connector.config.baseURL});
    }

    async createRole(name: string, applicationId: string, organizationId: string, permissions: string[]) {
        const payload = {
            name, 
            applicationId,
            organizationId,
            permissions
        }
        return await this.connector.axios.post(`/roles`, payload, {baseURL: this.connector.config.baseURL});
    }

    async editRole(roleId: string, name: string, permissions: string[]) {
        const payload = {
            name, 
            permissions
        }
        return await this.connector.axios.put(`/roles/${roleId}`, payload, {baseURL: this.connector.config.baseURL});
    }

    async deleteRole(roleId: string) {
        return await this.connector.axios.delete(`/roles/${roleId}`, {baseURL: this.connector.config.baseURL});
    }
}