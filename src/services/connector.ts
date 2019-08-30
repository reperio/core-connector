import axiosStatic, {AxiosInstance} from "axios";
import {ApplicationService} from "./applicationService";
import {AuthService} from "./authService";
import {OrganizationService} from "./organizationService";
import {PermissionService} from "./permissionService";
import {RoleService} from "./roleService";
import {UserService} from "./userService";

export interface ReperioCoreConnectorConfig {
    baseURL: string;
    applicationToken?: string;
}

const reperioCoreConnectorDefaultConfig: ReperioCoreConnectorConfig = {
    baseURL: ""
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
            if (this.config.applicationToken != null && this.config.applicationToken != '') {
                config.headers['Application-Token'] = this.config.applicationToken
            }
            return config;
        });
    }
}