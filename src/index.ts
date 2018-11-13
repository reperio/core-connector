import axiosStatic, {AxiosInstance} from "axios";
import {ApplicationService} from "./services/applicationService";
import {AuthService} from "./services/authService";
import {OrganizationService} from "./services/organizationService";
import {PermissionService} from "./services/permissionService";
import {RoleService} from "./services/roleService";
import {UserService} from "./services/userService";

export interface ReperioCoreHttpConnectorConfig {
    baseURL?: string;
    getAuthToken?: () => string | Promise<string>;
    onAuthTokenReceived?: (authToken: string) => void | Promise;
}

export const reperioCoreHttpConnectorDefaultConfig: ReperioCoreHttpConnectorConfig = {
    baseURL: null,
    getAuthToken: null,
    onAuthTokenReceived: null
};

export class ReperioCoreHttpConnector {
    axios: AxiosInstance;
    config: ReperioCoreHttpConnectorConfig;

    _applicationService: ApplicationService;
    _authService: AuthService;
    _organizationService: OrganizationService;
    _permissionService: PermissionService;
    _roleService: RoleService;
    _userService: UserService;

    constructor(config: ReperioCoreHttpConnectorConfig) {
        this.config = {...reperioCoreHttpConnectorDefaultConfig, ...config};
        this.axios = axiosStatic.create();
        this.setAxiosInterceptors();

        this._applicationService = new ApplicationService(this);
    }

    setAxiosInterceptors() {
        this.axios.interceptors.request.use(async config => {
            const authToken = typeof this.config.getAuthToken === "function" ? await this.config.getAuthToken() : null;
            if (authToken != null) {
                config.headers.authorization = `Bearer ${authToken}`;
            }
            return config;
        });

        this.axios.interceptors.response.use(async response => {
            if (typeof this.config.onAuthTokenReceived === "function" && response.headers != null && response.headers.authorization != null && response.headers.authorization.slice(0, 6) === "Bearer") {
                const authToken = response.headers.authorization.slice(7);
                await this.config.onAuthTokenReceived(authToken);
            }
            return response;
        });
    }

    get applicationService() {
        return this._applicationService;
    }

    get authService() {
        return this._authService;
    }

    get organizationService() {
        return this._organizationService;
    }

    get permissionService() {
        return this._permissionService;
    }

    get roleService() {
        return this._roleService;
    }

    get userService() {
        return this._userService;
    }
}