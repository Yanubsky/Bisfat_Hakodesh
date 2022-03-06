// Environment.d.ts file
declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DB_HOST: string;
            DB_PORT: string;
            DB_USER: string;
            DB_PASS: string;
        }
    }
}

export {};

// Use environment variables when needed.
import {env} from "process";

