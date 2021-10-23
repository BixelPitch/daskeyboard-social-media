const fetch = require('node-fetch');

class Platform {
    /**
     * Base class for social media platform
     * @param {String} url    The URL to a persons page on a social media platform
     * @param {RegExp} regex  A RegExp which returns a group named "followers"
     */
    constructor(url, regex) {
        this.url = url;
        this.regex = regex;
    }

    async run() {
        const request = await fetch(this.url);
        const html = await request.text();
        const { followers } = this.regex.exec(html).groups;
        return parseInt(followers, 10);
    }
}

module.exports = Platform;
