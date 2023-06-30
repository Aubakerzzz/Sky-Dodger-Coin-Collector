         var myGamePiece;
         var myObstacles = [];
         var myScore;
         var acceleration = 0;
         var rodImage;
         var fighterImage;
         var coinImage;
         var rodHeightPercentage = 0.15; // Adjust this value to change the percentage of the canvas height for the rods
         var bonusImage;
         var temp;
         function component1(width, height, color, x, y, type) {
            this.type = type;
            this.score = 0;
            this.width = width;
            this.height = height;
            this.speedX = 0;
            this.speedY = 0;
            this.x = x;
            this.y = y;
            this.gravity = 0;
            this.gravitySpeed = 0;
            this.visible = true; // Added visible property
            this.update = function() {
                ctx = myGameArea.context;
                if (!this.visible) {
                    return; // Skip rendering if not visible
                }
                if (this.type == "text") {
                    ctx.font = this.width + " " + this.height;
                    ctx.fillStyle = color;
                    ctx.fontFamily = "Times New Roman";
                    ctx.fillText(this.text, this.x, this.y);
                } else if (this.type == "image") {
                    ctx.drawImage(fighterImage, this.x, this.y, this.width, this.height);   
                } else {
                    ctx.fillStyle = color;
                    ctx.fillRect(this.x, this.y, this.width, this.height);
                }
            };
            this.newPos = function() {
                this.gravitySpeed += this.gravity;
                this.gravitySpeed += acceleration;
                this.x += this.speedX;
                this.y += this.speedY + this.gravitySpeed;
                this.hitBottom();
                this.checkBoundaries(); // Added check for boundaries
            };
            this.hitBottom = function() {
                var rockbottom = myGameArea.canvas.height - this.height;
                if (this.y > rockbottom) {
                    this.y = rockbottom;
                    this.gravitySpeed = 0;
                }
            };
            this.checkBoundaries = function() {
                if (this.x < 0) {
                    this.x = 0;
                }
                if (this.x + this.width > myGameArea.canvas.width) {
                    this.x = myGameArea.canvas.width - this.width;
                }
                if (this.y < 0) {
                    this.y = 0;
                }
                if (this.y + this.height > myGameArea.canvas.height) {
                    this.y = myGameArea.canvas.height - this.height;
                }
            };
            this.crashWith = function(otherobj) {
                if (!otherobj.visible) {
                    return false; // Skip collision check if the object is not visible
                }
                var myleft = this.x;
                var myright = this.x + this.width;
                var mytop = this.y;
                var mybottom = this.y + this.height;
                var otherleft = otherobj.x;
                var otherright = otherobj.x + otherobj.width;
                var othertop = otherobj.y;
                var otherbottom = otherobj.y + otherobj.height;
                var crash = true;
                if (
                    mybottom < othertop + 5 ||
                    mytop > otherbottom + 5 ||
                    myright < otherleft + 5 ||
                    myleft > otherright
                ) {
                    crash = false;
                }
                return crash;
            };
        }
        function startGame() {
            fighterImage = new Image();
            fighterImage.src = "fighter.png";
            myGamePiece = new component1(50, 50, "transparent", 10, 120, "image");
            myGamePiece.gravity = 0.05;
            myScore = new component1("30px", "Consolas", "goldenrod", 5, 30, "text");
            rodImage = new Image();
            rodImage.src = "rod.jpg";
            coinImage = new Image();
            coinImage.src = "coin.png";
            bonusImage = new Image();
            bonusImage.src = "bonus.png";
            myGameArea.start();
            }
            var myGameArea = {
                canvas: document.createElement("canvas"),
                start: function() {
                    // Set canvas dimensions based on screen size
                    var screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
                    var screenHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
                    this.canvas.width = screenWidth + 1; // Subtracting 20 to account for any potential scrollbar
                    this.canvas.height = screenHeight + 1; // Subtracting 20 to account for any potential scrollbar
            
                    this.context = this.canvas.getContext("2d");
                    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
                    this.frameNo = 0;
                    this.interval = setInterval(updateGameArea, 20);
                },
                clear: function() {
                    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
                }
            };     
            
            function gameOver() {
                myGamePiece.visible = false; // Make the game piece invisible
                clearInterval(myGameArea.interval); // Stop the game
              
                // Create a new HTML element to display the game over message
                var gameOverMessage = document.createElement("div");
                gameOverMessage.textContent = "Game over! Your score is: " + myGamePiece.score;
                gameOverMessage.style.fontSize = "30px";
                gameOverMessage.style.textAlign = "center";
                gameOverMessage.style.fontFamily = "Times New Roman";
                gameOverMessage.style.position = "absolute";
                gameOverMessage.style.top = "50%";
                gameOverMessage.style.left = "50%";
                gameOverMessage.style.transform = "translate(-50%, -50%)";
                gameOverMessage.style.color = "goldenrod"; // Use color instead of fontColor
                document.body.appendChild(gameOverMessage);
              
                // Wait for 5 seconds and then reload the page
                setTimeout(function() {
                  location.reload();
                }, 2500);
              }
              
              
              function playGameOverSound() {
                // Create an audio element
                var audio = new Audio("gameover.wav"); // Replace with the path to your game over sound file
                
                // Play the audio
                audio.play();
              }
              

            function playCoinSound() {
                var coinSound = new Audio("coin.wav"); // Path to the coin sound effect file
                coinSound.play();
            }
            function playBonusSound() {
                var bonusSound = new Audio("bonus.mp3"); // Path to the coin sound effect file
                bonusSound.play();
            }
      