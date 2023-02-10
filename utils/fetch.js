//Given an API url, returns a return a promise with the data
function getData(url){
    try{
        return fetch(url)
            .then(res => res.json())
    } catch (err){
        console.log(err);
    }
}

module.exports = {getData}