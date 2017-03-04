/**
 * Created by rafael on 03/03/17.
 */
export default githubApi = {
    searchRepo(query) {
        const uri = `https://api.github.com/search/repositories?q=${query}&page=1&per_page=10&sort=stars&order=desc`;

        return new Promise((resolve, reject) => {
            $.getJSON(uri, {}).done(data => {
                resolve(data);
            }).fail(data => {
                reject(data);
            })
        });
    }
};
