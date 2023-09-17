export const STATUS = ["To do", "In progress", "Done"];
export const ROLES = ["User", "Co-Admin", "Admin"];

export const isStatus = (status) => STATUS.includes(status);
export const isRoles = (role) => ROLES.includes(role);
export const isOwner = (role) => ["Co-Admin", "Admin"].includes(role);
