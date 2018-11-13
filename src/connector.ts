import axiosStatic, {AxiosInstance} from "axios";
import {ApplicationService} from "./services/applicationService";
import {AuthService} from "./services/authService";
import {OrganizationService} from "./services/organizationService";
import {PermissionService} from "./services/permissionService";
import {RoleService} from "./services/roleService";
import {UserService} from "./services/userService";

export interface ReperioCoreConnectorConfig {
    baseURL: string;
    getAuthToken?: () => string | Promise<string>;
    onAuthTokenReceived?: (authToken: string) => void | Promise<any>;
}

const reperioCoreConnectorDefaultConfig: ReperioCoreConnectorConfig = {
    baseURL: "",
    getAuthToken: void(0),
    onAuthTokenReceived: void(0)
};

export class ReperioCoreConnector {
    axios: AxiosInstance;
    config: ReperioCoreConnectorConfig;

    _applicationService: ApplicationService;
    _authService: AuthService;
    _organizationService: OrganizationService;
    _permissionService: PermissionService;
    _roleService: RoleService;
    _userService: UserService;

    constructor(config: Partial<ReperioCoreConnectorConfig>) {
        this.config = {...reperioCoreConnectorDefaultConfig, ...config};
        this.axios = axiosStatic.create();
        this.setAxiosInterceptors();

        this._applicationService = new ApplicationService(this);
        this._authService = new AuthService(this);
        this._organizationService = new OrganizationService(this);
        this._permissionService = new PermissionService(this);
        this._roleService = new RoleService(this);
        this._userService = new UserService(this);
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