const Platform = require('./class/Platform');

const regex = /"edge_followed_by":\{"count":(?<followers>\d+?)\}/gm;
const platform = new Platform('https://www.instagram.com/therock', regex);

platform.run().then((x) => console.log(x));
