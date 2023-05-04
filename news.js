const xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
  if (this.readyState === 4 && this.status === 200) {
    const parser = new DOMParser();
    const html = parser.parseFromString(this.responseText, 'text/html');
    const title = html.querySelector('title').textContent;
    console.log(title);
  }
};
xhr.open('GET', 'https://www.mariokart64.com/mk7/afc.php?cfilter=&full=on');
xhr.send();
