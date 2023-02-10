    const {readFileSync} = require('fs')

//Parse coordinates from .txt file
const parseCoords = (path) => {
    try {
        return readFileSync(path,'utf-8');
    }
    catch (err){
        console.log(err);
    }
}

module.exports = {parseCoords}