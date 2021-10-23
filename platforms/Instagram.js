const Platform = require('./Platform');

class Instagram extends Platform {
    /**
     * @param {String} username
     */
    constructor(username) {
        super(
            `https://www.instagram.com/${username}`,
            /"edge_followed_by":\{"count":(?<followers>\d+?)\}/gm,
        );
        this.name = 'Instagram';
    }
}

module.exports = Instagram;
