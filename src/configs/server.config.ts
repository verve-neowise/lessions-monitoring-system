export default {
    port: process.env.PORT || 3000,
    supervisorKey: process.env.SUPERVISOR_KEY || 'supervisor-token' + new Date().getTime(),
    jwtEngine: process.env.JWT_ENGINE || 'local'
}