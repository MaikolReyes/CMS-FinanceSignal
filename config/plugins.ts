export default {
    'users-permissions': {
        config: {
            jwtSecret: process.env.ADMIN_JWT_SECRET || 'default-secret',  // Asegúrate de que lea desde el archivo .env
        },
    },
};

