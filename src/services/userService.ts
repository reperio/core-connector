import {ReperioCoreConnector} from "./connector";
import {UserEmail} from "../models/userEmail";
import {AxiosResponse} from "axios";

export class UserService {
    constructor(public connector: ReperioCoreConnector) { }

    async getUserById(userId: string) {
        return await this.connector.axios.get(`/users/${userId}`);
    }

    async getUsers() {
        return await this.connector.axios.get(`/users`);
    }

    async checkUserExistsByEmail(primaryEmailAddress: string) : Promise<boolean> {
        const response = await this.connector.axios.get(`/users/exists?emailAddress=${primaryEmailAddress}`)
        return response.data;
    }

    async createUser(primaryEmailAddress: string, firstName: string, lastName: string, password: string, confirmPassword: string, organizationIds: string[]) {
        const payload = {
            primaryEmailAddress, 
            firstName, 
            lastName, 
            password, 
            confirmPassword, 
            organizationIds
        }
        return await this.connector.axios.post(`/users`, payload);
    }

    async editUser(userId: string, firstName: string, lastName: string, organizationIds: string[], roleIds: string[], userEmails: UserEmail[], primaryEmailId: string) {
        const payload = {
            firstName, 
            lastName, 
            organizationIds, 
            roleIds, 
            userEmails: userEmails.map((userEmail: UserEmail) => { 
                return { 
                    email: userEmail.email, 
                    id: userEmail.id 
                }
            }), 
            primaryEmailId
        }
        return await this.connector.axios.put(`/users/${userId}`, payload);
    }

    async editUserGeneral(userId: string, firstName: string, lastName: string) {
        const payload = {
            firstName, 
            lastName
        }
        return await this.connector.axios.put(`/users/${userId}/general`, payload);
    }

    async editUserEmails(userId: string, added: UserEmail[], deleted: UserEmail[]) {

        if(added.length > 0) {
            const payload = {
                userEmails: added
                    .map((x: UserEmail) => {
                        return {
                            email: x.email,
                            id: x.id
                        }
                    })
                }

            await this.connector.axios.post(`/users/${userId}/addUserEmails`, payload);
        }

        if(deleted.length > 0) {
            const payload = {
                userEmailIds: deleted.map((x: UserEmail) => x.id)
            };
    
            await this.connector.axios.post(`/users/${userId}/deleteUserEmails`, payload);
        }
    }

    async setPrimaryUserEmail(userId: string, primaryUserEmail: UserEmail) {
        const payload = {
            primaryUserEmailId: primaryUserEmail.id
        };

        await this.connector.axios.put(`/users/${userId}/setPrimaryUserEmail`, payload);
    }

    async editUserOrganizations(userId: string, organizationIds: string[]) {
        const payload = {
            organizationIds
        }
        return await this.connector.axios.put(`/users/${userId}/organizations`, payload);
    }

    async editUserRoles(userId: string, roleIds: string[]) {
        const payload = {
            roleIds
        }
        return await this.connector.axios.put(`/users/${userId}/roles`, payload);
    }

    async deleteUser(userId: string) {
        return await this.connector.axios.delete(`/users/${userId}`);
    }

    async getUserOrganizations(userId: string) {
        return await this.connector.axios.get(`/users/${userId}/organizations`);
    }

    async getUserOrganizationByOrganizationId(userId: string, organizationId: string) {
        return await this.connector.axios.get(`/users/${userId}/organizations/${organizationId}`);
    }

    async getUserRoles(userId: string) {
        return await this.connector.axios.get(`/users/${userId}/roles`);
    }

    async getUserPermissionsForOrganization(userId: string, organizationId: string) {
        return await this.connector.axios.get(`/users/${userId}/organizations/${organizationId}/permissions`);
    }
}