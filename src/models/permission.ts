import { RolePermission } from "./rolePermission";

interface Permission {
    name: string;
    rolePermissions: RolePermission[];
    displayName: string;
    description: string;
    isSystemAdminPermission: boolean;
    lastModified: Date;
}

class CorePermissions {
    static ViewUsers: string = "ViewUsers";
    static CreateUsers: string = "CreateUsers";
    static DeleteUsers: string = "DeleteUsers";
    static ManageUserOrganizations: string = "ManageUserOrganizations";
    static ManageUserRoles: string = "ManageUserRoles";
    static AddEmail: string = "AddEmail";
    static SetPrimaryEmail: string = "SetPrimaryEmail";
    static DeleteEmail: string = "DeleteEmail";
    static ViewRoles: string = "ViewRoles";
    static CreateRoles: string = "CreateRoles";
    static UpdateRoles: string = "UpdateRoles";
    static DeleteRoles: string = "DeleteRoles";
    static ViewOrganizations: string = "ViewOrganizations";
    static CreateOrganizations: string = "CreateOrganizations";
    static UpdateOrganizations: string = "UpdateOrganizations";
    static DeleteOrganizations: string = "DeleteOrganizations";
    static ViewPermissions: string = "ViewPermissions";
    static UpdatePermissions: string = "UpdatePermissions";
    static UpdateBasicUserInfo: string = "UpdateBasicUserInfo";
    static ResendVerificationEmails: string = "ResendVerificationEmails";
}

export { Permission, CorePermissions }