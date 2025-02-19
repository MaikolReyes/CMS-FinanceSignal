module.exports = ({ env }) => ({
    'users-permissions': {
        config: {
            jwtSecret: env('ADMIN_JWT_SECRET'),  // Asegúrate de que lea desde el archivo .env
        },
    },
    upload: {
        config: {
            provider: 'aws-s3',
            providerOptions: {
                accessKeyId: env('AWS_ACCESS_KEY_ID', process.env.AWS_ACCESS_KEY_ID),
                secretAccessKey: env('AWS_ACCESS_SECRET', process.env.AWS_ACCESS_SECRET),
                region: env('AWS_REGION', process.env.AWS_REGION),
                params: {
                    signedUrlExpires: env('AWS_SIGNED_URL_EXPIRES', 15 * 60),
                    Bucket: env('AWS_BUCKET', process.env.AWS_BUCKET),
                },
            },
            actionOptions: {
                upload: {
                    ACL: null
                },
                uploadStream: {
                    ACL: null
                },
            }
        },
    }
});


