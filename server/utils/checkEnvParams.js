function checkEnvParams(params) {
    const missingParams = params.filter(param => !process.env[param]);
    console.log("\x1b[37m\x1b[40m");
    if (missingParams.length) console.log("\x1b[31m", `Missing params: ${missingParams.join(", ")}`)
    console.log("\x1b[37m\x1b[40m");
}

module.exports = checkEnvParams;