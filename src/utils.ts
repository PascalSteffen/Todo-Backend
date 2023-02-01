const crypto = require('crypto');
const util = require('util');
const hashPassword = util.promisify(crypto.pbkdf2);


export function isInteger(input: string) {

    return input?.match(/^\d+$/) ?? false;

};

export async function calculatePasswordHash(plainTextPassword: string, passwordSalt: string) {

    const passwordHash = await hashPassword(
        plainTextPassword,
        passwordSalt,
        1000,
        256,
        "sha512");

    return passwordHash.toString('hex');

};