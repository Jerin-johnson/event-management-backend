import { LOG_LEVEL } from "../constants/logger.constants";

const formatMessage = (level, message, meta = {}) => ({
    timestamp: new Date().toISOString(),
    level,
    message,
    ...meta,
});

const info = (message, meta = {}) => {
    console.info(formatMessage(LOG_LEVEL.INFO, message, meta));
};

const warn = (message, meta = {}) => {
    console.warn(formatMessage(LOG_LEVEL.WARN, message, meta));
};

const error = (message, meta = {}) => {
    console.error(formatMessage(LOG_LEVEL.ERROR, message, meta));
};

const logger = Object.freeze({
    info,
    warn,
    error,
});

export default logger;
