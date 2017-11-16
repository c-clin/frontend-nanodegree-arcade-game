let lives = 5;
let score = 0;

$(".lives").html(lives);
$(".score").html(score);

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


        // let distance = speed  * dt;
        // this.x = this.x + distance


    }
    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    // Create collision with the Player
    setCollision() {
        if (player.x = this.x) {
            if (player.y = this.y) {
                player.reset();
                lives--;
                $(".lives").html(lives);
            }
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

    }

    render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    // Randomize the placement of the collectible
    setPlacement() {
        horizontals = [0, 0, 0, 105, 205, 305, 405, 505, 605];
        verticals = [0, 0, 0, -45, 40, 125, 201 ,295];

        let horizontal = horizontals[Math.floor(Math.random() * horizontals.length)];
        let vertical = verticals[Math.floor(Math.random() * verticals.length)];
        console.log(horizontal);
        console.log(vertical);

        this.x = horizontal;
        this.y = vertical;
    }

    // Create collision with the Player
    setCollision() {
        if (player.x = this.x) {
            if (player.y = this.y) {
                lives++;
                $(".lives").html(lives);
                console.log('Lives: ' + lives);
                this.setPlacement(); // Reset the heart placement 
            }
        }
    } 
} 


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// Creates the player object
const player = new Player(305, 465);

// Creates the enemies objects
allEnemies = [];
const enemy1 = new Enemy(305, 40);
const enemy2 = new Enemy(250, 125);
const enemy3 = new Enemy(200, 210);
const enemy4 = new Enemy(150, 295);
// Adds the enemy objects to the enemies array
allEnemies.push(enemy1, enemy2, enemy3, enemy4);


// Create the collectible objects
const heart = new Collectibles(105,125);


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
