
export default {
  register() {
    console.log('🔧 Register ejecutado');
  },

  bootstrap({ strapi }) {

    strapi.log.info('🚀 Bootstrap ejecutado correctamente');

    setInterval(async () => {
      const now = new Date();

      try {
        // Obtener artículos con `scheduledAt <= now` y aún no publicados
        const drafts = await strapi.documents('api::article.article').findMany({
          filters: {
            estado: 'Borrador',
            scheduledAt: { $lte: now }
          },
          limit: 100,
        });

        for (const article of drafts) {
          try {

            await strapi.documents('api::article.article', article.id).update({
              data: {
                estado: 'Publicado',
                publishedAt: now,
                scheduledAt: null,
              },
            })

            strapi.log.info(`✅ Publicado automáticamente: ${article.title}`);
          } catch (err) {
            strapi.log.error(`❌ Error publicando ${article.title}: ${err.message}`);
          }
        }
      } catch (err) {
        strapi.log.error(`❌ Error autopublicación: ${err.message}`);
      }
    }, 60 * 1000); // cada minuto
  },
};


