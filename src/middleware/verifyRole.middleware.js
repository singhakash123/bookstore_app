import { ApiError } from "../utils/ApiError.js";

// allowedRoles = array of roles passed (e.g. ["admin", "manager"])
export const verifyRole = (...allowedRoles) => {
    // middleware function returned
    return (req, res, next) => {
        // 1. Check if user exists on request object and if user's role is in allowedRoles
        
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            throw new ApiError(403, "you are not authorized to access this role");
        }

        // 2. If valid, pass control to next middleware/controller
        next();
    };
};
