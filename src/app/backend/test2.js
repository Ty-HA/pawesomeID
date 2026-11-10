async function fetchFile(hash) {
  const url = new URL('https://ipfs.infura.io:5001/api/v0/cat');
  url.searchParams.set('arg', hash);

  const response = await fetch(url, { method: 'POST' });
  if (!response.ok) {
    throw new Error(`IPFS returned HTTP ${response.status}`);
  }
  return response.text();
}

fetchFile('408DB59992F378AF39E7C4DDC7A96ACE826F9475E564FF3E4BFD9D72EE0E667E')
  .then(content => console.log(content))
  .catch(error => console.error(error));
