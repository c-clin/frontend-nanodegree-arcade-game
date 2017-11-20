let lives = 5;
let score = 0;

$(".lives").html(lives);
$(".score").html(score);

// xy coordinates for the heart collectible 
horizontals = [-1000, -1000, -1000, -1000, 105, 205, 305, 405, 505, 605];
verticals = [-1000, -1000, -1000, -1000, 40, 125, 201 ,295];

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

      //this.x++
      this.x += this.speed * dt;

      if (this.x > ctx.canvas.width) this.x = -100;

      this.checkCollision();

    }    
    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    checkCollision() {
      // https://developer.mozilla.org/kab/docs/Games/Techniques/2D_collision_detection
      var rect1 = {
        x: this.x,
        y: this.y,
        width: 40,
        height: 40
      };

      var rect2 = {
        x: player.x,
        y: player.y,
        width: 40,
        height: 40
      };

      if (
        rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.height + rect1.y > rect2.y
      ) {
        console.log("Collision Detected");
        player.reset();
        lives--;
        $(".lives").html(lives);
      }
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

    // Setting boundaries so the player does not go off grid
    setBoundaries() {
        // Setting boundaries for the x-axis
        if (this.x > 605 || this.x < 5) {
            if (this.x > 605) {
                this.x = 605;
            }   
            else {
                this.x = 5;
            }
        }
        // Setting boundaries for the y-axis
        if (this.y > 465 || this.y < -45) {
            if (this.y > 465) {
                this.y = 465;
            }
            else {
                this.y = -45;
            }
        }   
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
        // going up = y - 85
        // going down = y + 85
    }

    reset() {
        // Reset the player's position
        this.x = 305;
        this.y = 465;
    }

    // Resets the player position when it reaches the water
    winGame() {
        if (this.y < 0) {
            this.reset(); 
            score++;
            $(".score").html(score);
            console.log('Score: ' + score);
            heart.setPlacement();
        }
    }
}

// Create a new class for collectibles
class Collectibles {
    constructor(x, y) {
        this.sprite = 'images/Heart.png';
        this.x = x;
        this.y = y; 
    }

    update(dt) {
        // Call the collision function
        this.setCollision();
        if (this.x > ctx.canvas.width) this.x = -1000;
        if (this.y > ctx.canvas.width) this.y = -1000;
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    // Randomize the placement of the collectible
    setPlacement() {
        // Randomize the index number picked
        let horizontal = horizontals[Math.floor(Math.random() * horizontals.length)];
        let vertical = verticals[Math.floor(Math.random() * verticals.length)];
        console.log(horizontal);
        console.log(vertical);
        // Set the placement equal to the randomized placement
        this.x = horizontal;
        this.y = vertical;
    }

    // Create a collision method with the player
    setCollision() {
        var rect1 = {
        x: this.x,
        y: this.y,
        width: 40,
        height: 40
        };

        var rect2 = {
        x: player.x,
        y: player.y,
        width: 40,
        height: 40
        };

        if (
        rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.height + rect1.y > rect2.y
        ) {

        console.log("Heart Collision Detected");
        lives++;
        $(".lives").html(lives);
        this.setPlacement();
        }
    }
} 

class Gem extends Collectibles {
    constructor(x, y) {
        super(x, y);
        this.sprite = "images/Gem Orange.png";
    }

   render() {
        super.render();
    }

}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// Creates the player object
const player = new Player(305, 465);

// Creates the enemies objects
allEnemies = [];
const enemy1 = new Enemy(5, 40, 300); 
const enemy11 = new Enemy(5, 40, 550);
const enemy2 = new Enemy(5, 125, 450);
const enemy3 = new Enemy(5, 210, 350);
const enemy33 = new Enemy(5, 210, 600);
const enemy4 = new Enemy(5, 295, 250);
const enemy44 = new Enemy(5, 295, 500);
// Adds the enemy objects to the enemies array
allEnemies.push(enemy1, enemy11, enemy2, enemy3, enemy33, enemy4, enemy44);


// Create the collectible objects
const heart = new Collectibles(105,125);
const gem = new Gem(405, 219);


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
    player.setBoundaries();
    player.winGame();
});
