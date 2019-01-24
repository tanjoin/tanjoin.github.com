// `<div id="mokuji" first="3" last="3">`` を置換する
class Mokuji {
  constructor(id) {
    this.className = "mokuji";
    this.DEFAULT_FIRST = 3;
    this.DEFAULT_LAST = 3;
    if (id) {
      this.id = id;
    }
  }

  _getMokujiElements() {
    return [...document.querySelectorAll('.mokuji')];
  }

  _getHeadings(query) {
    return [...document.querySelectorAll(query)];
  }

  apply() {
    this._getMokujiElements().forEach((e) => {
      let headings = this._getHeadings(this._query(e));
      e.appendChild(this._createList(headings));
    });
  }

  _createList(headings) {
    let ul = document.createElement('ul');
    for (let i = 0; i < headings.length; i++) {
      const heading = headings[i];
      const escapeHeadingText = encodeURIComponent(heading.innerText.replace(/\n+$/g,''));
      heading.id = escapeHeadingText;
      const level = parseInt(heading.tagName.charAt(1));
      let li = document.createElement('li');
      li.setAttribute('class', 'mokuji-' + level);
      let a = document.createElement('a');
      a.setAttribute('href', '#' + escapeHeadingText);
      a.innerText = heading.innerText.replace(/\n+$/g,'');
      li.appendChild(a);
      ul.appendChild(li);
    }
    return ul;
  }

  _query(e) {
    let first = this.DEFAULT_FIRST;
    let last = this.DEFAULT_LAST;
    if (e.getAttribute('first') && !isNaN(parseInt(e.getAttribute('first')))) {
      first = parseInt(e.getAttribute('first'));
    }
    if (e.getAttribute('first') && !isNaN(parseInt(e.getAttribute('last')))) {
      last = parseInt(e.getAttribute('last'));
    }
    let query = "";
    for (var i = first; i <= last; i++) {
      if (i === first) {
        query += 'h' + i;
      } else {
        query += ',h' + i;
      }
    }
    return query;
  }
}

document.addEventListener("DOMContentLoaded", () => new Mokuji().apply());
