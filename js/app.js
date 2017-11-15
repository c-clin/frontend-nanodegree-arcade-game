// Enemies our player must avoid

class Enemy {
    constructor (x, y, speed) {
        this.sprite = 'images/enemy-bug.png';
        this.x = x;
        this.y = y;
        this.speed = speed;
    }
    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    }
    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

};



// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor(x, y) {
        this.sprite = 'images/char-horn-girl.png';
        this.x = x;
        this.y = y; 
    }

    update(dt) {

    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }


    handleInput(event) {

        switch (event) {
            case "left":
              this.x -= 100;
              break;
            case "right":
              this.x += 100;
              break;
            case "up":
              this.y -= 85;
              break;
            case "down":
              this.y += 85;
              break;
        }
        // going left = x - 100
        // going right = x + 100
        // going up = y - 80
        // going down = y + 80
    }

    reset() {
        this.x = 305;
        this.y = 465;
    }

    // Create collision 
    // If enemy.x = player.x, reset 



};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// Creates the player object
const player = new Player(305, 465);



// Creates the enemies objects
allEnemies = [];
const enemy1 = new Enemy(100, 40);
const enemy2 = new Enemy(250, 125);
const enemy3 = new Enemy(200, 210);
const enemy4 = new Enemy(150, 295);
// Adds the enemy objects to the enemies array
allEnemies.push(enemy1, enemy2, enemy3, enemy4);



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
