export default {
    port: Number(process.env.PORT || 3000),
    host: process.env.HOST || "localhost",
    supervisorKey: process.env.SUPERVISOR_KEY || 'supervisor-token' + new Date().getTime(),
    jwtEngine: process.env.JWT_ENGINE || 'local'
}