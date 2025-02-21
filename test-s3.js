const AWS = require('aws-sdk');

// Configura AWS con las variables de entorno ya definidas
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

s3.listBuckets((err, data) => {
    if (err) console.log("❌ Error al listar buckets:", err);
    else console.log("✅ Buckets disponibles:", data.Buckets);
});
