const Platform = require('./Platform');

class DevRant extends Platform {
    /**
     * @param {String} username
     */
    constructor(username) {
        super(
            `https://devrant.com/users/${username}`,
            /<div class="profile-score">\+(?<followers>\d*)<\/div>/gm,
        );
        this.name = 'DevRant';
    }
}

module.exports = DevRant;
