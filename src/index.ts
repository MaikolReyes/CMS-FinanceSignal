export default {
  register() { },

  bootstrap({ strapi }) {
    setInterval(async () => {
      const now = new Date();

      // Buscar artículos en borrador con scheduledAt ya pasado
      const articles = await strapi.entityService.findMany('api::article.article', {
        filters: {
          publishedAt: null,
          scheduledAt: { $lte: now },
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
    }, 60 * 1000); // cada 1 minuto
  },
};

