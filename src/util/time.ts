import { resolve } from "path"

/**
 * Sleep specified time
 * @param sleepTime sleep time in million secondes
 * @returns Promise object
 */
export const sleep = async (sleepTime: number) => {
    return new Promise((resolve, reject) => setTimeout(resolve, sleepTime));
}