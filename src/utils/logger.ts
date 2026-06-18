/**
 * Simple logger utility
 * Makes console messages colorful and organized
 */

const COLORS = {
    info: '\x1b[36m',   // Cyan
    success: '\x1b[32m', // Green
    error: '\x1b[31m',   // Red
    warning: '\x1b[33m', // Yellow
    reset: '\x1b[0m'     // Reset color
};

export class Logger {
    static info(message: string) {
        console.log(`${COLORS.info}ℹ️ ${message}${COLORS.reset}`);
    }

    static success(message: string) {
        console.log(`${COLORS.success}✅ ${message}${COLORS.reset}`);
    }

    static error(message: string) {
        console.log(`${COLORS.error}❌ ${message}${COLORS.reset}`);
    }

    static warning(message: string) {
        console.log(`${COLORS.warning}⚠️ ${message}${COLORS.reset}`);
    }

    static step(message: string) {
        console.log(`\n📋 ${message}`);
    }
}