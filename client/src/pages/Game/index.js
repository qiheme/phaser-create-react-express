import React, {Component, useEffect} from "react";
import Phaser from "phaser";

export const Game = () => {
  useEffect(() => {
    // Our game scene
    var scene = new Phaser.Scene("game");

    var config = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      scene: scene,
    };

    // Create the game with our config values
    // this will also inject our canvas element into the HTML source
    // for us
    var game = new Phaser.Game(config);

    scene.init = function () {
      // game variables
      this.score = 0;
      this.lives = 3;
      this.speed = 1.5;
      this.dragon_move = 1;
      this.score_text = "";
      this.lives_text = "";
    };

    scene.preload = function () {
      // lets preload some ../../images that we can use in our game
      this.load.image("background", "../images/tut/background.png");
      this.load.image("player", "../images/tut/warrior.png");
      this.load.image("dragon", "../images/tut/pet_dragon_new.png");
      this.load.image("gold", "../images/tut/icon.png");
    };

    scene.create = function () {
      // add the background
      var bg = this.add.sprite(0, 0, "background");
      bg.setOrigin(0, 0);

      // add score text & game text to screen
      this.scoreText = this.add.text(100, 16, "score: " + this.score, {
        fontSize: "32px",
        fill: "#000",
      });
      this.liveText = this.add.text(
        16,
        this.sys.game.config.height - 50,
        "Lives: " + this.lives,
        {fontSize: "32px", fill: "#000"}
      );

      // add player
      this.player = this.add.sprite(100, 150, "player");
      this.player.setScale(0.3);

      // add monster
      this.dragon = this.add.sprite(350, 150, "dragon");
      this.dragon.setScale(0.1);

      // add gold
      this.gold = this.add.sprite(650, 150, "gold");
      this.gold.setScale(0.5);
    };

    scene.update = function () {
      // Is mouse click down?
      if (this.input.activePointer.isDown) {
        // move player along the x-axis at a rate this.speed pixels
        this.player.x += this.speed;
      }

      if (this.dragon.y >= 500) {
        // Enemy movement
        this.dragon_move = -1;
      } else if (this.dragon.y <= 100) {
        // Enemy movement
        this.dragon_move = 1;
      }

      this.dragon.y += this.dragon_move;

      if (
        Phaser.Geom.Intersects.RectangleToRectangle(
          this.player.getBounds(),
          this.dragon.getBounds()
        )
      ) {
        this.lives--;
        this.liveText.setText("Lives: " + this.lives);
        this.end();
      }

      if (
        Phaser.Geom.Intersects.RectangleToRectangle(
          this.player.getBounds(),
          this.gold.getBounds()
        )
      ) {
        this.score += 50;
        this.scoreText.setText("Score: " + this.score);
        this.end();
      }
    };

    scene.end = function () {
      if (this.lives <= 0) {
        this.scene.restart();
      } else {
        this.create();
      }
    };
  }, []);
  return <div className="Game"></div>;
};
