
module.exports = ({ env }) => ({
    'users-permissions': {
        config: {
            jwtSecret: env('ADMIN_JWT_SECRET'),  // Asegúrate de que lea desde el archivo .env
        },
    },
    upload: {
        config: {
            provider: 'aws-s3',
            s3Options: {
                accessKeyId: env('AWS_ACCESS_KEY_ID'),
                secretAccessKey: env('AWS_ACCESS_SECRET'),
                region: env('AWS_REGION'),
                params: {
                    Bucket: env('AWS_BUCKET'),
                },
            },
            // These parameters could solve issues with ACL public-read access — see [this issue](https://github.com/strapi/strapi/issues/5868) for details
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


