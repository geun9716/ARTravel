import crypto from 'crypto'

async function security(pw) {
    return new Promise(async (resolve, reject) => {
        try {
            const buf = await getRandomBytes()
            const encryptPw = await pbkdf2(pw, buf)
            resolve(encryptPw)
        } catch(error) {
            reject(error)
        }
    })
}

function pbkdf2(pw, bufString) {
    return new Promise((resolve, reject) => {
        crypto.pbkdf2(pw, bufString, 100000, 64, 'sha512', (err, key) => {
            if(err) {
                reject(err)
            }
            else {
                const secret = {
                    pw : key.toString('base64'),
                    pwKey : bufString
                }
                resolve(secret)
            }
        })
    })
}

function getRandomBytes() {
    return new Promise((resolve, reject) => {
        crypto.randomBytes(64, (err, buf) => {
            if(err) {
                reject(err)
            }
            else {
                resolve(buf.toString('base64'))
            }
        })
    })
}

export default {
    security,
    pbkdf2
}