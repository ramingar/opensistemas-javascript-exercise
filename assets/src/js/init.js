/**
 * Created by rafael on 03/03/17.
 */
import githubApi from './githubApi';
import utils from './utils';

$(() => {

    const setMessage = message => {
        const elementTemplate = '<a href="#" class="collection-item">' + message + '</a>';
        const repoList = $('#repoList');

        repoList.children().remove();
        repoList.append(elementTemplate);
    };

    const setData = data => {
        const repoList = $('#repoList');

        if (!data.items.length) {
            setMessage('No results');
            return;
        }

        repoList.children().remove();
        data.items.forEach(repo => {
            const elementTemplate =
                '<a href="' + repo.svn_url + '" class="collection-item">' +
                '<div class="row">' +
                '<div class="col s3 truncate">' + repo.name + '</div>' +
                '<div class="col s9 truncate">' + repo.svn_url + '</div>' +
                '</div>' +
                '</a>';
            repoList.append(elementTemplate);
        });
    };

    $('#query').on('keyup', e => {
        utils.debounce.run(() => {
            const query = $('#query').val();

            if (!query.length) {
                return;
            }

            setMessage('Searching repo...');
            githubApi.searchRepo(query).then(data => {
                setData(data);
            }, () => {
                setMessage('Ooops, something wrong happened...');
            });

        }, 1200);
    });

});
