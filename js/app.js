let lives = 5;
let  score = 0;

// Renders the current lives and score on the page
$(".lives").html(lives);
$(".score").html(score);

// Function to return a random interger inclusive of min and max
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Possible xy coordinates for the collectibles
horizontals = [-1000, 105, 205, 305, 405, 505, 605];
verticals = [-1000, 75, 160, 245 ,330];

// The Enemy class
class Enemy {
    constructor (x, y, speed) {
        this.sprite = 'images/enemy-bug.png';
        this.x = x;
        this.y = y;
        this.speed = speed;
    }

    update(dt) {
        // Sets up the speed 
        this.x += this.speed * dt;
        // Creates the loop 
        if (this.x > ctx.canvas.width) this.x = -100;
        this.checkCollision();
    }    

    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 90, 130);
    }

    checkCollision() {
    // Enemy rectangle
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
      // When enemy and playe rectangle collides
      if (
        rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.height + rect1.y > rect2.y
      ) {
        console.log("Collision detected, player dies");
        player.reset(); 
        collectible.setPlacement(); // Reset the colletible position
        lives--;
        $(".lives").html(lives);
      }
    } 
};

// The Player class
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
                this.y =- 45;
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
            collectible.setPlacement(); // Reset collectible position
            score += 1000;
            $(".score").html(score);
            console.log("Player scores!");
        }
    }

    // When player wins the game
    winGame() {
        if (score >= 10000) {
            this.reset();
            this.y = this.y + 7; // Keeps the player on the grass
            $("#game-over").html("YOU WON!");
            $("#hidden").css("display", "block"); // Displays the game over box
        }
    }

    // When player loses the game
    loseGame() {
        if (lives === 0) {
            this.y = this.y + 7; // Keeps the player on the grass
            $("#game-over").html("GAME OVER");
            $("#hidden").css("display", "block"); // Displays the game over box
        }
    }
}

// An array containing all the possible collectibles
let collectiblesArray = ["images/Gem-Orange.png", "images/Heart.png", "images/Star.png", "images/Rock.png"];

class Collectibles {
    constructor(x, y) {
        this.sprite = collectiblesArray[getRandomInt(0,1)]; // Randomly pics between gem and heart
        this.x = x;
        this.y = y; 
    }

    update(dt) {
        this.setCollision();
        if (this.x > ctx.canvas.width) this.x = -1000; // Prevents the collectibles from showing outside of the canvas
        if (this.y > ctx.canvas.width) this.y = -1000;
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 80, 100);
    }

    // Method to randomize the placement of the collectible
    setPlacement() {
        // Randomize the xy coordinates from the array defined above
        let horizontal = horizontals[getRandomInt(0,horizontals.length-1)];
        let vertical = verticals[getRandomInt(0,verticals.length-1)];
        console.log("collectible x: " + horizontal);
        console.log("collectible y: " + vertical);
        this.sprite = collectiblesArray[getRandomInt(0, collectiblesArray.length-1)];
        console.log("sprite: " + this.sprite);
        // Set the placement equal to the randomized coordinates
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
            if (this.sprite === "images/Heart.png") {
                lives++; // Player's life +1 when collect the heart
                $(".lives").html(lives);
                console.log("Player collects heart")
                this.setPlacement(); 
            }
            else if (this.sprite === "images/Star.png") {
                score += 800; // Player score +800 when collect the star 
                $(".score").html(score);
                console.log("Player collects star");
                this.setPlacement();
            }
            else if (this.sprite === "images/Rock.png") {
                score -= 500; // Player score -500 when collect the rock 
                $(".score").html(score);
                console.log("Player collects rock");
                this.setPlacement();
            }
            else if (this.sprite === "images/Gem-Orange.png") {
                score += 300; // Player score +300 when collect the gem 
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
const enemy1 = new Enemy(5, 75, 300); 
const enemy11 = new Enemy(5, 75, 550);
const enemy2 = new Enemy(5, 160, 450);
const enemy3 = new Enemy(5, 245, 350);
const enemy33 = new Enemy(5, 245, 600);
const enemy4 = new Enemy(5, 330, 250);
const enemy44 = new Enemy(5, 330, 500);
// Adds the enemy objects to the enemies array
allEnemies.push(enemy1, enemy11, enemy2, enemy3, enemy33, enemy4, enemy44);

// Create the collectible objects
const collectible = new Collectibles(105,160);

// This listens for key presses
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
    lives = 5; 
    score = 0; 
    $(".lives").html(lives);
    $(".score").html(score);
    player.reset(); // Reset the player's position
    collectible.setPlacement(); // Reset the collectible's position
    $("#hidden").css("display", "none"); // Hides the game over box
    $("#hidden").parent().css('z-index', 3000); // Brings th game over box back
})
