export default {
    app: {
        port: 5000,
        ip: "127.0.0.1"
    },
    corsHeaders: ["Link"],
    winston: {
        transports:
        [{
            name: "console1",
            type: "console",
            options: {
                level: "debug"
            }
        },
        {
            name: "file1",
            type: "file",
            options: {
                level:"debug",
                filename: "./dist/log/ghoster.log",
                tailable: true
            }
        }]
    }
}