class SideMenu {
  constructor(className) {
    if (!className) {
      this.className = 'sidebar';
    } else {
      this.className = className;
    }
  }

  apply() {
    if (this.className !== 'sidebar') {
      [...document.querySelectorAll(`.${this.className}`)].forEach((e) => {
        e.classList.add('sidebar');
      });
    }

    if ([...document.querySelectorAll('.sidebar')].length === 0) {
      let sidebar = document.createElement('div');
      sidebar.classList.add('sidebar');
      document.body.appendChild(sidebar);
    }

    [...document.querySelectorAll('.sidebar')].forEach((e) => {
      let homeButton = document.createElement('a');
      homeButton.className = 'home btn btn-light';
      homeButton.href = "/";
      let home = document.createElement('i');
      home.className = ('fas fa-home');
      homeButton.appendChild(home);
      e.appendChild(homeButton);

      let leftButton = document.createElement('button');
      leftButton.type = "button";
      leftButton.className = 'dismiss btn btn-light';
      let left = document.createElement('i');
      left.className = "fas fa-arrow-left";
      leftButton.appendChild(left);
      e.appendChild(leftButton);
    });

    [...document.querySelectorAll('.dismiss')].forEach((e) => {
      e.addEventListener('click', () => {
        // hide sidebar
        [...document.querySelectorAll('.sidebar')].forEach((e) => {
          e.classList.remove("active");
        });
        // hide overlay
        [...document.querySelectorAll('.overlay')].forEach((e) => {
          e.classList.remove("active");
        });
      });
    });

    [...document.querySelectorAll('.overlay')].forEach((e) => {
      e.addEventListener('click', () => {
        // hide sidebar
        [...document.querySelectorAll('.sidebar')].forEach((e) => {
          e.classList.remove("active");
        });
        // hide overlay
        [...document.querySelectorAll('.overlay')].forEach((e) => {
          e.classList.remove("active");
        });
      });
    });

    [...document.querySelectorAll('.mokuji > ul')].forEach((e) => {
      e.classList.add('list-group');
    });

    [...document.querySelectorAll('.mokuji > ul > li')].forEach((e) => {
      e.classList.add('list-group-item');
      e.classList.add('list-group-item-action');
    });

    let button = document.createElement('button');
    button.type = "button";
    button.className = 'btn btn-light btn-sidemenu';
    button.addEventListener('click', () => {
      // open sidebar
      [...document.querySelectorAll('.sidebar')].forEach((e) => {
        e.classList.add("active");
      });
      // hide overlay
      [...document.querySelectorAll('.overlay')].forEach((e) => {
        e.classList.add("active");
      });
      // collapse
      [...document.querySelectorAll('.collapse.in')].forEach((e) => {
        e.classList.toggle("in");
      });
    });
    let icon = document.createElement('i');
    icon.className = 'fas fa-bars';
    button.appendChild(icon);
    document.querySelector('body').appendChild(button);
  }
}

document.addEventListener("DOMContentLoaded", () => new SideMenu("mokuji").apply());
