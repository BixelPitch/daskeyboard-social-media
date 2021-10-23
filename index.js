const q = require('daskeyboard-applet');
const Instagram = require('./platforms/Instagram');

const { logger } = q;
const COLORS = {
    increase: '#00FF00',
    decrease: '#FF0000',
    polling: '#0000FF',
    badConfig: '#FF0000',
};

class SocialMediaApplet extends q.DesktopApp {
    constructor() {
        super();
        this.pollingInterval = 1 * 60 * 1000;
        this.followers = null;
        const { username, platform } = this.config;

        switch (platform) {
        case 'instagram':
            this.platform = new Instagram(username);
            break;
        default:
            logger.error('Platform not recognized!');
            throw new Error('Illegal social media platform omitted');
        }
    }

    async run() {
        logger.info('Social media applet running');
        const { username, platform } = this.config;
        const followers = this.platform.run();
        logger.info(`Fetch successful, ${followers} followers on ${platform} for user ${username}`);

        if (this.followers !== null && this.followers !== followers) {
            const color = this.followers > followers ? COLORS.decrease : COLORS.increase;
            return new q.Signal({
                points: [[new q.Point(color)]],
                link: {
                    url: this.platform.url,
                    label: 'Show Profile',
                },
                name: this.platform.name,
                message: `${username} has <b>${followers}</b>`,
            });
        }

        this.followers = followers;
        return null;
    }
}

module.exports = { SocialMediaApplet };

// eslint-disable-next-line no-unused-vars
const applet = new SocialMediaApplet();
