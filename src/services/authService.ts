import {ReperioCoreConnector} from "./connector";

export class AuthService {
    constructor(public connector: ReperioCoreConnector) { }

    async validateCurrentJWT() {
        return await this.connector.axios.get(`/auth`);
    }
    
    async login(primaryEmailAddress: string, password: string) {
        return await this.connector.axios.post(`/auth/login`, {primaryEmailAddress, password});
    }

    async generateOTP() {
        return (await this.connector.axios.post<{otp: string}>(`/auth/otp/generate`, null)).data;
    }

    async authenticateWithOTP(otp: string) {
        return await this.connector.axios.post<{otp: string}>(`/auth/otp`, {otp});
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
        return await this.connector.axios.post(`/auth/signup`, payload);
    }

    async recaptcha(response: string) {
        return await this.connector.axios.post(`/auth/recaptcha`, {response});
    }

    async emailVerification(token: string) {
        const payload = {
            token
        }
        return await this.connector.axios.post(`/auth/emailVerification`, payload);
    }

    async forgotPassword(primaryEmailAddress: string) {
        const payload = {
            primaryEmailAddress
        }
        return await this.connector.axios.post(`/auth/forgotPassword`, payload);
    }

    async resetPassword(token: string, password: string, confirmPassword: string) {
        const payload = {
            token, 
            password, 
            confirmPassword
        }
        return await this.connector.axios.post(`/auth/resetPassword`, payload);
    }

    async verifyResetPassword(token: string) {
        return await this.connector.axios.get(`/auth/resetPassword/${token}`);
    }

    async sendVerificationEmail(userId: string, email: string) {
        const payload = {
            userId, 
            email
        }
        return await this.connector.axios.post(`/auth/sendVerificationEmail`, payload);
    }
}