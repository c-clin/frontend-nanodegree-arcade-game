let lives = 5;
let score = 0;

// Renders the current lives and score on the page
$(".lives").html(lives);
$(".score").html(score);

// Function to return a random interger inclusive of min and max
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// xy coordinates for the collectibles
horizontals = [-1000, 105, 205, 305, 405, 505, 605];
verticals = [-1000, 40, 125, 201 ,295];

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
        console.log("Collision detected, player dies");
        player.reset();
        collectible.setPlacement();
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
        this.setBoundaries();
        this.winGame();
        this.loseGame();
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
    score() {
        if (this.y < 0) {
            this.reset(); 
            score = score + 1000;
            $(".score").html(score);
            console.log('Score: ' + score);
            collectible.setPlacement();
            console.log("Play wins game");
        }
    }

    // When player wins the game
    winGame() {
        if (score >= 10000) {
            console.log("Player wins game!!!");
            $("#game-over").html("YOU WON!");
            $("#hidden").css("display", "block"); // Displays the game over box
        }
    }

    // When player loses the game
    loseGame() {
        if (lives === 0) {
            console.log("player loses game!!!");
            this.y = this.y + 3; // Wants the character to fall of the grid when loses, need to stop player.reset()
            $("#game-over").html("GAME OVER");
            $("#hidden").css("display", "block"); // Displays the game over box
        }
    }

}

let collectiblesArray = ["images/Gem-Orange.png", "images/Gem-Orange.png", "images/Heart.png", "images/Heart.png", "images/Star.png", "images/Rock.png"];
// Create a new class for collectibles
class Collectibles {
    constructor(x, y) {
        this.sprite = collectiblesArray[getRandomInt(0,1)]; // Randomly pics between gem and heart
        this.x = x;
        this.y = y; 
    }

    update(dt) {
        // Call the collision function
        this.setCollision();
        if (this.x > ctx.canvas.width) this.x = -1000; // Prevents the collectibles from showing outside of the canvas
        if (this.y > ctx.canvas.width) this.y = -1000;
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    // Randomize the placement of the collectible
    setPlacement() {
        // Randomize the index number picked from the relative arrays
        let horizontal = horizontals[getRandomInt(0,horizontals.length-1)];
        let vertical = verticals[getRandomInt(0,verticals.length-1)];
        console.log("collectible x: " + horizontal);
        console.log("collectible y: " + vertical);
        this.sprite = collectiblesArray[getRandomInt(0, collectiblesArray.length-1)];
        // Set the placement equal to the randomized placement
        this.x = horizontal;
        this.y = vertical;
    }

    // Create a collision method with the player
    setCollision() {
        // Collectible rectangle
        var rect1 = {
        x: this.x,
        y: this.y,
        width: 40,
        height: 40
        };

        // Player rectangle
        var rect2 = {
        x: player.x,
        y: player.y,
        width: 40,
        height: 40
        };

        // When player rectangle hits collectible rectangle
        if (
        rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.height + rect1.y > rect2.y
        ) {
            console.log("Collision detected");
            if (this.sprite === "images/Heart.png") {
                lives++; // Player's life +1 when collect the heart
                $(".lives").html(lives);
                console.log("Player collects heart")
                this.setPlacement(); 
            }
            if (this.sprite === "images/Star.png") {
                score = score + 1000; // Player score +1000 when collect the star 
                $(".score").html(score);
                console.log("Player collects star");
                this.setPlacement();
            }
            if (this.sprite === "images/Rock.png") {
                score = score - 500; // Player score -500 when collect the rock 
                $(".score").html(score);
                console.log("Player collects rock");
                this.setPlacement();
            }
            else {
                score = score + 500; // Player score +500 when collect the gem 
                $(".score").html(score);
                console.log("Player collects gem");
                this.setPlacement();
            }
        }
    }
} 

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
const collectible = new Collectibles(105,125);

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
    // Allows player to stand on the water first before resetting its placement
    setTimeout( function() {
        player.score();
    }, 1000);
});


// Allows the player to click play again to restart the game
$("#play-again").click (function() {
    lives = 5; // Reset the player's lives
    score = 0; // Reset the player's score
    $(".lives").html(lives);
    $(".score").html(score);
    player.reset(); // Reset the player's position
    collectible.setPlacement(); // Reset the collectible's position
    $("#hidden").css("display", "none"); // Hides the game over box
    $("#hidden").parent().css('z-index', 3000);
})


/*
-------- Questions:
- When the player loses and want to fall off the grid, how to disable setBouondaries?
- How to center the game over box?
- How to randomly choose beteen heart and gem to appear?
- How to stop the none stop log message when the player wins or loses?
- Is there a better way to randomly select the xy coordinates for the collectible?

*/
