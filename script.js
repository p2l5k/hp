const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
canvas.width = 1024;
canvas.height = 576;
const gravity = 1;
class Player {
  constructor() {
    this.speed = 10;
    this.position = {
      x: 100,
      y: 100,
    };
    this.velocity = {
      x: 0,
      y: 0.5,
    };
    this.width = 20;
    this.height = 20;
  }
  draw() {
    c.fillStyle = "red";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
  update() {
    this.draw();
    this.position.y += this.velocity.y;
    this.position.x += this.velocity.x;
    if (this.height + this.position.y + this.velocity.y <= canvas.height)
      this.velocity.y += gravity;
  }
}
class Platform {
  constructor({ x, y, image }) {
    this.position = {
      x: x,
      y: y,
    };
    this.image = image;
    (this.width = image.width), (this.height = image.height);
  }
  draw() {
    c.drawImage(this.image, this.position.x, this.position.y);
  }
}
class GenericObject {
  constructor({ x, y, image2 }) {
    this.position = {
      x: x,
      y: y,
    };
    this.image2 = image2;
    (this.width = image2.width), (this.height = image2.height);
  }
  draw() {
    c.drawImage(this.image2, this.position.x, this.position.y);
  }
}
class GenericObject2 {
  constructor({ x, y, image3 }) {
    this.position = {
      x: x,
      y: y,
    };
    this.image3 = image3;
    (this.width = image3.width), (this.height = image3.height);
  }
  draw() {
    c.drawImage(this.image3, this.position.x, this.position.y);
  }
}

const image = new Image();
image.src = "img/platform.png";

const image2 = new Image();
image2.src = "img/background.png";
const image3 = new Image();
image3.src = "img/hills.png";

let player = new Player();
let platforms = [];
let genericObjects = [];
let genericObjects2 = [];

const keys = {
  right: {
    pressed: false,
  },
  left: {
    pressed: false,
  },
};
let screenOffset = 0;

function init() {
  player = new Player();
  platforms = [
    new Platform({ x: 0, y: 470, image }),
    new Platform({
      x: image.width - 2,
      y: 470,
      image,
    }),
    new Platform({
      x: image.width * 2 + 100,
      y: 470,
      image,
    }),
    new Platform({
      x: image.width * 3 + 300,
      y: 470,
      image,
    }),
    new Platform({
      x: image.width * 4 + 300,
      y: 270,
      image,
    }),
    new Platform({
      x: image.width * 5 + 300,
      y: 470,
      image,
    }),
  ];
  genericObjects = [new GenericObject({ x: -1, y: -1, image2 })];
  genericObjects2 = [new GenericObject2({ x: -1, y: -1, image3 })];

  screenOffset = 0;
}
function animate() {
  requestAnimationFrame(animate);
  c.fillStyle = "white";
  c.fillRect(0, 0, canvas.width, canvas.height);
  genericObjects.forEach((genericObject) => {
    genericObject.draw();
  });
  genericObjects2.forEach((genericObject2) => {
    genericObject2.draw();
  });
  platforms.forEach((platform) => {
    platform.draw();
  });
  player.update();

  if (keys.right.pressed && player.position.x < 400) {
    player.velocity.x = player.speed;
  } else if (keys.left.pressed && player.position.x > 100) {
    player.velocity.x = -player.speed;
  } else {
    player.velocity.x = 0;

    if (keys.right.pressed) {
      platforms.forEach((platform) => {
        screenOffset += player.speed;
        platform.position.x -= player.speed;
      });
    } else if (keys.left.pressed) {
      platforms.forEach((platform) => {
        screenOffset -= player.speed;
        platform.position.x += player.speed;
      });
    }
  }

  platforms.forEach((platform) => {
    if (
      player.position.y + player.height <= platform.position.y &&
      player.position.y + player.height + player.velocity.y >=
        platform.position.y &&
      player.position.x + player.width <=
        platform.position.x + platform.width &&
      player.position.x + player.width >= platform.position.x
    ) {
      player.velocity.y = 0;
    }
  });
  if (screenOffset > 2000) {
    console.log("you win");
  }
  if (player.position.y > canvas.height) {
    init();
  }
}
init();
animate();
window.addEventListener("keydown", ({ keyCode }) => {
  console.log(keyCode);
  switch (keyCode) {
    case 38:
      player.velocity.y -= 10;

      break;
    case 37:
      keys.left.pressed = true;
      break;
    case 39:
      keys.right.pressed = true;
      break;
    case 40:
      console.log("arrowDown");
      break;
  }
});
window.addEventListener("keyup", ({ keyCode }) => {
  console.log(keyCode);
  switch (keyCode) {
    case 38:
      player.velocity.y -= 20;

      break;
    case 37:
      keys.left.pressed = false;
      break;
    case 39:
      keys.right.pressed = false;
      break;
    case 40:
      console.log("arrowDown");
      break;
  }
});
