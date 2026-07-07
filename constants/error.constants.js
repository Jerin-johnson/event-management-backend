export const ERROR_MESSAGES = {
    // Common
    SERVER_ERROR: "Internal server error.",
    BAD_REQUEST: "Bad request.",
    UNAUTHORIZED: "Unauthorized access.",
    FORBIDDEN: "Access denied.",
    NOT_FOUND: "Resource not found.",
    VALIDATION_ERROR: "Validation failed.",
    CONFLICT: "Resource already exists.",

    // Profile
    PROFILE_NOT_FOUND: "Profile not found.",
    PROFILE_ALREADY_EXISTS: "Profile already exists.",
    PROFILE_NAME_REQUIRED: "Profile name is required.",
    INVALID_PROFILE: "Invalid profile selected.",
    NAME_MUST_ATLEAST_TWO: "Name must be at least 2 characters",

    // Event
    EVENT_NOT_FOUND: "Event not found.",
    EVENT_ALREADY_EXISTS: "Event already exists.",
    EVENT_CREATION_FAILED: "Failed to create event.",
    EVENT_UPDATE_FAILED: "Failed to update event.",
    EVENT_DELETE_FAILED: "Failed to delete event.",

    // Date & Time
    INVALID_DATE: "Invalid date.",
    INVALID_TIME: "Invalid time.",
    INVALID_TIMEZONE: "Invalid timezone.",
    START_DATE_REQUIRED: "Start date is required.",
    END_DATE_REQUIRED: "End date is required.",
    START_DATE_IN_PAST: "Start date cannot be in the past.",
    END_DATE_IN_PAST: "End date cannot be in the past.",
    END_BEFORE_START: "End date/time must be after the start date/time.",

    // Database
    DATABASE_ERROR: "Database operation failed.",

    // Logs
    EVENT_LOG_NOT_FOUND: "Event logs not found.",
};
