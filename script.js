async function getData(url) {
  let response = await fetch(url);

  if (response.ok) {
    return response.json();
  } else {
    console.log("Error HTTP", response.status);
  }
}

const list = document.querySelector(".list-alboms");
const albomPhotos = document.querySelector(".list-photos");
const albumList = document.querySelector(".main-wrap__section-first");

class Albom {
  constructor(list, users) {
    this.list = list;
    this.users = users;

    albumList.addEventListener("click", (e) => {
      let eventTarget = e.target;
      this.getPictures(eventTarget.getAttribute("data-id"));
    });
  }

  getListAlbums() {
    getData("https://jsonplaceholder.typicode.com/albums").then((data) => {
      this.renderListAlbums(data);
    });
  }

  getPictures(id) {
    getData(`https://jsonplaceholder.typicode.com/photos?albumId=${id}`).then(
      (data) => {
        this.renderPicture(data);
        console.log(data);
      }
    );
  }

  renderListAlbums(render = []) {
    let lis = "";
    for (let el of render) {
      if (!el) {
        return;
      }
      lis += `<li data-id="${el.id}" class = 'list-alboms__style'>
      ${el.title}
      </li>`;
    }
    this.list.innerHTML = lis;
  }

  renderPicture(render = []) {
    let lis = "";
    for (let el of render) {
      if (!el) {
        return;
      }
      lis += `<img src='${el.url}' class="style-img" alt="${el.title}"></img>`;
    }
    this.users.innerHTML = lis;
  }
}

let todo = new Albom(list, albomPhotos);

todo.getPictures(1);

document.addEventListener("load", todo.getListAlbums());
