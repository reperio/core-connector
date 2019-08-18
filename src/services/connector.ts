import axiosStatic, {AxiosInstance} from "axios";
import {ApplicationService} from "./applicationService";
import {AuthService} from "./authService";
import {OrganizationService} from "./organizationService";
import {PermissionService} from "./permissionService";
import {RoleService} from "./roleService";
import {UserService} from "./userService";

export interface ReperioCoreConnectorConfig {
    baseURL: string;
    getAuthToken?: () => string | Promise<string>;
    onAuthTokenReceived?: (authToken: string) => void | Promise<any>;
    applicationToken?: string;
}

const reperioCoreConnectorDefaultConfig: ReperioCoreConnectorConfig = {
    baseURL: "",
    getAuthToken: void(0),
    onAuthTokenReceived: void(0),
    applicationToken: ""
};

export class ReperioCoreConnector {
    axios: AxiosInstance;
    config: ReperioCoreConnectorConfig;

    readonly applicationService: ApplicationService;
    readonly authService: AuthService;
    readonly organizationService: OrganizationService;
    readonly permissionService: PermissionService;
    readonly roleService: RoleService;
    readonly userService: UserService;

    constructor(config?: Partial<ReperioCoreConnectorConfig>) {
        this.config = {...reperioCoreConnectorDefaultConfig, ...config};
        this.axios = axiosStatic.create({
            baseURL: this.config.baseURL,
            withCredentials: true
        });
        this.setAxiosInterceptors();

        this.applicationService = new ApplicationService(this);
        this.authService = new AuthService(this);
        this.organizationService = new OrganizationService(this);
        this.permissionService = new PermissionService(this);
        this.roleService = new RoleService(this);
        this.userService = new UserService(this);
    }

    setAxiosInterceptors() {
        this.axios.interceptors.request.use(async config => {
            const authToken = typeof this.config.getAuthToken === "function" ? await this.config.getAuthToken() : null;
            if (authToken != null) {
                config.headers.authorization = `Bearer ${authToken}`;
            }
            if (this.config.applicationToken != null && this.config.applicationToken !== '') {
                config.headers['Application-Token'] = this.config.applicationToken
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
}