document.addEventListener("DOMContentLoaded", () => {
  [...document.querySelectorAll('table')].forEach((e) => {
    new Tablesort(e, {
      descending: true
    });
  });
});
