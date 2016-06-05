function mokuji(first, last) {
  var mokujiDiv = document.getElementById('mokuji');
  var query = "";
  for (var i = first; i <= last; i++) {
    if (i == first) {
      query += 'h' + i;
    } else {
      query += ',h' + i;
    }
  }
  var headings = document.querySelectorAll(query);
  var ul = document.createElement('ul');
  for (var j = 0; j < headings.length; j++) {
    var heading = headings[j];
    var escapeHeadingText = encodeURIComponent(heading.innerText.replace(/\n+$/g,''));
    heading.id = escapeHeadingText;
    var level = parseInt(heading.tagName.charAt(1));
    var line = document.createElement('li');
    line.setAttribute('class', 'mokuji' + level);
    var a = document.createElement('a');
    a.setAttribute('href', '#' + escapeHeadingText);
    a.innerText = heading.innerText.replace(/\n+$/g,'');
    line.appendChild(a);
    ul.appendChild(line);
  }
  mokujiDiv.appendChild(ul);
}
