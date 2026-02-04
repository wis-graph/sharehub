export async function fetchFile(filename, githubConfig) {
  const { owner, repo, branch } = githubConfig;
  const url = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${filename}`;

  const response = await fetch(url);
  const type = response.headers.get('content-type');

  if (!response.ok) {
    return null;
  }

  if (type.startsWith('text/')) {
    return { type: 'markdown', content: await response.text() };
  } else if (type.startsWith('image/')) {
    return { type: 'image', url: url };
  }

  return null;
}

export async function fetchMOC(filename, githubConfig) {
  const result = await fetchFile(filename, githubConfig);
  return result?.content || null;
}