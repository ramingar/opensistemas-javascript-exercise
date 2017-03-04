/**
 * Created by rafael on 03/03/17.
 */
var githubApi$1 = githubApi = {
    searchRepo: function searchRepo(query) {
        var uri = "https://api.github.com/search/repositories?q=" + query + "&page=1&per_page=10&sort=stars&order=desc";

        return new Promise(function (resolve, reject) {
            $.getJSON(uri, {}).done(function (data) {
                resolve(data);
            }).fail(function (data) {
                reject(data);
            });
        });
    }
};

/**
 * Created by rafael on 03/03/17.
 */

// Debounce function is based on Underscore.js' debounce function.
// Try to run a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
var debounce = {
    timeout: null,
    run: function run(func, wait, immediate) {
        var context = this,
            args = arguments;
        var later = function later() {
            this.timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !this.timeout;
        clearTimeout(this.timeout);
        this.timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    }
};

var utils = {
    debounce: debounce
};

/**
 * Created by rafael on 03/03/17.
 */
$(function () {

    var setMessage = function setMessage(message) {
        var elementTemplate = '<a href="#" class="collection-item">' + message + '</a>';
        var repoList = $('#repoList');

        repoList.children().remove();
        repoList.append(elementTemplate);
    };

    var setData = function setData(data) {
        var repoList = $('#repoList');

        if (!data.items.length) {
            setMessage('No results');
            return;
        }

        repoList.children().remove();
        data.items.forEach(function (repo) {
            var elementTemplate = '<a href="' + repo.svn_url + '" class="collection-item">' + '<div class="row">' + '<div class="col s3 truncate">' + repo.name + '</div>' + '<div class="col s9 truncate">' + repo.svn_url + '</div>' + '</div>' + '</a>';
            repoList.append(elementTemplate);
        });
    };

    $('#query').on('keyup', function (e) {
        utils.debounce.run(function () {
            var query = $('#query').val();

            if (!query.length) {
                return;
            }

            setMessage('Searching repo...');
            githubApi$1.searchRepo(query).then(function (data) {
                setData(data);
            }, function () {
                setMessage('Ooops, something wrong happened...');
            });
        }, 1200);
    });
});
