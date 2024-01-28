async function getComments(repo_name, comment_id, page_id, acc) {
  const url =
    'https://api.github.com/repos/' +
    repo_name +
    '/issues/' +
    comment_id +
    '/comments' +
    '?page=' +
    page_id;
  const response = await fetch(url, {
    headers: { Accept: 'application/vnd.github.v3.html+json' },
  });
  if (response.status !== 200) {
    throw new Error(
      'Response status ' +
      response.status +
        ' while attempting to fetch comments from: ' +
        url,
    );
  }

  const comments = await response.json();

  for (let i = 0; i < comments.length; i++) {
    const comment = comments[i];
    const date = new Date(comment.created_at);
    acc.push(
      "<div class='github-comment'>" +
        "<img src='" + comment.user.avatar_url + "' width='32px' /> " +
        "<b><a href='" + comment.user.html_url + "'>" + comment.user.login + '</a></b>' +
        ' posted at ' +
        '<em>' + date.toUTCString() + '</em>' +
        comment.body_html +
      '</div>',
    );
  }

  const links = response.headers.get('Link');
  if (links) {
    const entries = links.split(',');
    for (let j = 0; j < entries.length; j++) {
      const entry = entries[j];
      if (-1 != entry.search('rel="next"')) {
        acc = await getComments(repo_name, comment_id, page_id + 1, acc);
        break; // recurse on "next" and then stop looking for "next".
      }
    }
  }
  return acc;
}

function DoGithubComments(repo_name, comment_id) {
  document.addEventListener('DOMContentLoaded', async function () {
    try {
      const url =
        'https://github.com/' +
        repo_name +
        '/issues/' +
        comment_id +
        '#new_comment_field';
      const comments = await getComments(repo_name, comment_id, 1, []);
      const commentsElement = document.getElementById('github-comments-list');
      const commentsHtml = comments.reverse().join('');

      commentsElement.innerHTML =
        "<form action='" +
        url +
        "'><input type='submit' value='Post a comment on Github' /></form>" +
        commentsHtml;
    } catch (error) {
      console.log(error.message);
    }
    return null;
  });
}
