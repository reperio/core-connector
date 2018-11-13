import {ReperioCoreConnector} from "../connector";

export class AuthService {
    constructor(public connector: ReperioCoreConnector) { }
    
    async login(primaryEmailAddress: string, password: string) {
        return await this.connector.axios.post(`/auth/login`, {primaryEmailAddress, password}, {baseURL: this.connector.config.baseURL});
    }

    parseJwt(token: string): any {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');

        return JSON.parse(window.atob(base64));
    }

    async signup(primaryEmailAddress: string, firstName: string, lastName: string, password: string, confirmPassword: string) {
        const payload = {
            primaryEmailAddress,
            firstName, 
            lastName, 
            password, 
            confirmPassword
        }
        return await this.connector.axios.post(`/auth/signup`, payload, {baseURL: this.connector.config.baseURL});
    }

    async recaptcha(response: string) {
        return await this.connector.axios.post(`/auth/recaptcha`, {response}, {baseURL: this.connector.config.baseURL});
    }

    async emailVerification(token: string) {
        const payload = {
            token
        }
        return await this.connector.axios.post(`/auth/emailVerification`, payload, {baseURL: this.connector.config.baseURL});
    }

    async forgotPassword(primaryEmailAddress: string) {
        const payload = {
            primaryEmailAddress
        }
        return await this.connector.axios.post(`/auth/forgotPassword`, payload, {baseURL: this.connector.config.baseURL});
    }

    async resetPassword(token: string, password: string, confirmPassword: string) {
        const payload = {
            token, 
            password, 
            confirmPassword
        }
        return await this.connector.axios.post(`/auth/resetPassword`, payload, {baseURL: this.connector.config.baseURL});
    }

    async verifyResetPassword(token: string) {
        return await this.connector.axios.get(`/auth/resetPassword/${token}`, {baseURL: this.connector.config.baseURL});
    }

    async sendVerificationEmail(userId: string, email: string) {
        const payload = {
            userId, 
            email
        }
        return await this.connector.axios.post(`/auth/sendVerificationEmail`, payload, {baseURL: this.connector.config.baseURL});
    }
}