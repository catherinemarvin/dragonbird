var game = new Phaser.Game(400, 490, Phaser.AUTO, "gameDiv");

var mainState = {
  preload: function () {
    game.stage.backgroundColor = "#71c5cf";
    game.load.image("dragon", "assets/dragon.png");
  },

  create: function () {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    this.dragon = this.game.add.sprite(100, 245, "dragon");

    game.physics.arcade.enable(this.dragon);
    this.dragon.body.gravity.y = 1000;

    var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spaceKey.onDown.add(this.jump, this);
  },

  update: function () {
    if (!this.dragon.inWorld) {
      this.restartGame();
    }
  },

  jump: function () {
    this.dragon.body.velocity.y = - 350;
  },

  restartGame: function () {
    game.state.start("main");
  }

};

game.state.add("main", mainState);
game.state.start("main");
