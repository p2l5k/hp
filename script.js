const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
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
const image = new Image();
image.src = "img/platform.png";
const player = new Player();
const platforms = [
  new Platform({ x: 100, y: 200, image }),
  new Platform({ x: 300, y: 300, image }),
];

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
  c.clearRect(0, 0, canvas.width, canvas.height);

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
