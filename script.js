const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
canvas.width = 1024;
canvas.height = 576;
const gravity = 2;
class Player {
  constructor() {
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
    else this.velocity.y = 0;
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

const player = new Player();
const platforms = [
  new Platform({ x: 0, y: 470, image }),
  new Platform({
    x: image.width - 2,
    y: 470,
    image,
  }),
];
const genericObjects = [new GenericObject({ x: -1, y: -1, image2 })];
const genericObjects2 = [new GenericObject2({ x: -1, y: -1, image3 })];
const keys = {
  right: {
    pressed: false,
  },
  left: {
    pressed: false,
  },
};
let screenOffset = 0;
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
    player.velocity.x = 5;
  } else if (keys.left.pressed && player.position.x > 100) {
    player.velocity.x = -5;
  } else {
    player.velocity.x = 0;

    if (keys.right.pressed) {
      platforms.forEach((platform) => {
        screenOffset += 5;
        platform.position.x -= 5;
      });
    } else if (keys.left.pressed) {
      platforms.forEach((platform) => {
        screenOffset -= 5;
        platform.position.x += 5;
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
}

animate();
window.addEventListener("keydown", ({ keyCode }) => {
  console.log(keyCode);
  switch (keyCode) {
    case 38:
      player.velocity.y -= 20;

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
