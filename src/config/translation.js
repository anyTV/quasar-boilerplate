const i18nextConfig = process.env.I18NEXT;
const translationServer = process.env.SERVERS && process.env.SERVERS.translation;
const availableLanguages = process.env.TRANSLATION && process.env.TRANSLATION.availableLanguages;

export default {
    server: translationServer,
    availableLanguages,
    i18nextConfig,
};
