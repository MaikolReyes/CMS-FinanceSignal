export default {
  register() {},

  bootstrap({ strapi }) {
    setInterval(async () => {
      const now = new Date();

      try {
        const articles = await strapi.entityService.findMany('api::article.article', {
          filters: {
            publishedAt: null,
            scheduledAt: {
              $lte: now,
            },
          },
          limit: 100,
        });

        for (const article of articles) {
          await strapi.entityService.update('api::article.article', article.id, {
            data: {
              publishedAt: new Date(),
            },
          });

          strapi.log.info(`✅ Publicado automáticamente: ${article.title}`);
        }
      } catch (err) {
        strapi.log.error(`❌ Error en publicación automática: ${err.message}`);
      }
    }, 60 * 1000); // cada 60 segundos
  },
};

