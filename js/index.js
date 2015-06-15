var game = new Phaser.Game(400, 490, Phaser.AUTO, "gameDiv");

var mainState = {
  preload: function () {
    game.stage.backgroundColor = "#71c5cf";
    game.load.image("dragon", "assets/dragon.png");
    game.load.image("pipe", "assets/pipe.png");
  },

  create: function () {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    this.dragon = this.game.add.sprite(100, 245, "dragon");

    game.physics.arcade.enable(this.dragon);
    this.dragon.body.gravity.y = 1000;
    this.dragon.anchor.setTo(-.2, .5);

    var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spaceKey.onDown.add(this.jump, this);

    this.pipes = game.add.group();
    this.pipes.enableBody = true;
    this.pipes.createMultiple(20, "pipe");
    this.timer = game.time.events.loop(1500, this.addRowOfPipes, this);

    this.score = 0;
    this.labelScore = game.add.text(20, 20, "0", {
      font: "30px Arial", fill: "#ffffff"
    });
  },

  update: function () {
    if (!this.dragon.inWorld) {
      this.restartGame();
    }

    game.physics.arcade.overlap(this.dragon, this.pipes, this.restartGame, null, this);

    if (this.dragon.angle < 20) {
      this.dragon.angle += 1;
    }
  },

  jump: function () {
    this.dragon.body.velocity.y = - 350;

    var animation = game.add.tween(this.dragon);
    animation.to({ angle: -20 }, 100);
    animation.start();
  },

  restartGame: function () {
    game.state.start("main");
  },

  addOnePipe: function (x, y) {
    var pipe = this.pipes.getFirstDead();

    pipe.reset(x, y);

    pipe.body.velocity.x = -200;

    pipe.checkWorldBounds = true;
    pipe.outOfBoundsKill = true;
  },

  addRowOfPipes: function () {
    var hole = Math.floor(Math.random() * 5) + 1;

    for (var i = 0; i < 8; i++) {
      if (i != hole && i != hole + 1) {
        this.addOnePipe(400, i * 60 + 10);
      }
    }
    this.score += 1;
    this.labelScore.text = this.score;
  }


};

game.state.add("main", mainState);
game.state.start("main");
