import React, {Component} from "react";
import Music from "../Components/Music";
import "./Asteroids.css";

class Asteroids extends Component {
  constructor(props) {
    super(props);
    this.reloadGame = this.reloadGame.bind(this);
    this.game = null;
    this.state = {};
  }

  reloadGame() {
    this.props.gameStatus('restart');
  }

  componentWillUnmount() {
    this.game.Stop();
  }

  componentDidMount() {
    const self = this;
    window.requestAnimFrame = (function () {
      return (
          window.requestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          function (callback) {
            window.setTimeout(callback, 1000 / 60);
          }
      );
    })();

    var GameEngine = function (canvasSelector, scoreSelector) {
      var cnv =
          document.querySelector(canvasSelector) ||
          document.querySelector("canvas");
      var ctx = cnv.getContext("2d");
      var scr = document.querySelector(scoreSelector);
      var w = 320;
      var h = 240;

      if (typeof Storage !== "undefined") {
        localStorage["board.0.name"] = "";
        localStorage["board.0.score"] = "";
      }

      var engine = {
        canvas: cnv,
        context: ctx,
        score: 0,
        objects: [],
        input: {
          mouse: {
            x: 0,
            y: 0,
          },
          fire: false,
          left: false,
          right: false,
          forward: false,
        },
      };

      engine.canvas.addEventListener("mousemove", function (e) {
        engine.input.mouse.x = e.layerX;
        engine.input.mouse.y = e.layerY;
      });
      document.addEventListener("keydown", function (e) {
        switch (e.keyCode) {
          case 32:
            engine.input.fire = true;
            break;
          case 37:
            engine.input.left = true;
            break;
          case 65:
            engine.input.left = true;
            break;
          case 39:
            engine.input.right = true;
            break;
          case 68:
            engine.input.right = true;
            break;
          case 38:
            engine.input.forward = true;
            break;
          case 87:
            engine.input.forward = true;
            break;
        }
      });
      document.addEventListener("keyup", function (e) {
        switch (e.keyCode) {
          case 32:
            engine.input.fire = false;
            break;
          case 37:
            engine.input.left = false;
            break;
          case 65:
            engine.input.left = false;
            break;
          case 39:
            engine.input.right = false;
            break;
          case 68:
            engine.input.right = false;
            break;
          case 38:
            engine.input.forward = false;
            break;
          case 87:
            engine.input.forward = false;
            break;
        }
      });

      engine.eachByName = function (name, callback) {
        var n = name || "";
        var c =
            callback ||
            function () {
              console.exception("Callback is undefined");
            };

        for (var i = 0; i < this.objects.length; i++) {
          if (this.objects[i].name == n) {
            c(this.objects[i], i);
          }
        }
      };

      var Load = function () {
        engine.canvas.width = Math.max(
            document.documentElement.clientWidth,
            window.innerWidth || w
        );
        engine.canvas.height =
            Math.max(
                document.documentElement.clientHeight,
                window.innerHeight || h
            ) - 48;

        for (var i = 0; i < engine.objects.length; i++) {
          engine.objects[i].Start();
        }
      };
      var Stop = function () {
        engine.canvas.width = 0;
        engine.canvas.height = 0;

        for (var i = 0; i < engine.objects.length; i++) {
          engine.objects[i].Start();
        }
      };
      var Update = function () {
        var prevScore = engine.score;

        engine.context.clearRect(
            0,
            0,
            engine.canvas.width,
            engine.canvas.height
        );

        for (var i = 0; i < engine.objects.length; i++) {
          if (engine.objects[i].delete) {
            engine.objects.splice(i, 1);
          }
        }

        for (var j = 0; j < engine.objects.length; j++) {
          engine.objects[j].Update();
          engine.objects[j].Draw(engine.context);
        }

        if (engine.score > prevScore) {
          scr.innerHTML = engine.score;
        }

        window.requestAnimFrame(Update);
      };
      engine.Run = function () {
        Load();
        Update();
      };
      engine.Stop = function () {
        Stop();
      }

      return engine;
    };

    var Polygon = function (options) {
      var name = options.name || "Polygon";
      var color = options.color || "#0F0";
      var points = options.points || [
        {x: 0, y: 0},
        {x: 10, y: 10},
        {x: 10, y: 0},
        {x: 0, y: 0},
        {x: 0, y: 10},
        {x: 10, y: 10},
      ];
      var pos = options.position || {x: 0, y: 0};
      var vel = options.velocity || {x: 0, y: 0};
      var size = options.size || {x: 100, y: 100};
      var base = options.base || {x: 50, y: 50};

      var p = {
        name: name,
        position: pos,
        velocity: vel,
        color: color,
        points: points,
        rotation: 0,
        base: base,
        size: size,
        newcnv: document.createElement("canvas"),
        delete: false,
      };
      p.newctx = p.newcnv.getContext("2d");
      p.newcnv.width = p.size.x;
      p.newcnv.height = p.size.y;

      p.constructor.prototype.Start = function () {
      };
      p.constructor.prototype.Update = function () {
      };
      p.Draw = function (ctx) {
        this.newctx.clearRect(0, 0, this.newcnv.width, this.newcnv.height);
        this.newctx.save();
        this.newctx.translate(this.base.x, this.base.y);
        this.newctx.beginPath();
        this.newctx.moveTo(this.points[0].x, this.points[0].y);
        for (var i = 1; i < this.points.length; i++) {
          this.newctx.lineTo(this.points[i].x, this.points[i].y);
        }
        this.newctx.closePath();
        this.newctx.shadowBlur = 5;
        this.newctx.shadowColor = this.color;
        this.newctx.strokeStyle = this.color;
        this.newctx.stroke();
        this.newctx.restore();

        ctx.save();
        ctx.translate(this.position.x, this.position.y);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.drawImage(this.newcnv, -this.base.x, -this.base.y);
        ctx.restore();

        ctx.save();
        ctx.translate(this.position.x - ctx.canvas.width, this.position.y);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.drawImage(this.newcnv, -this.base.x, -this.base.y);
        ctx.restore();

        ctx.save();
        ctx.translate(this.position.x + ctx.canvas.width, this.position.y);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.drawImage(this.newcnv, -this.base.x, -this.base.y);
        ctx.restore();

        ctx.save();
        ctx.translate(this.position.x, this.position.y - ctx.canvas.height);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.drawImage(this.newcnv, -this.base.x, -this.base.y);
        ctx.restore();

        ctx.save();
        ctx.translate(this.position.x, this.position.y + ctx.canvas.height);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.drawImage(this.newcnv, -this.base.x, -this.base.y);
        ctx.restore();

        ctx.save();
        ctx.translate(
            this.position.x - ctx.canvas.width,
            this.position.y - ctx.canvas.height
        );
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.drawImage(this.newcnv, -this.base.x, -this.base.y);
        ctx.restore();

        ctx.save();
        ctx.translate(
            this.position.x + ctx.canvas.width,
            this.position.y - ctx.canvas.height
        );
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.drawImage(this.newcnv, -this.base.x, -this.base.y);
        ctx.restore();

        ctx.save();
        ctx.translate(
            this.position.x - ctx.canvas.width,
            this.position.y + ctx.canvas.height
        );
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.drawImage(this.newcnv, -this.base.x, -this.base.y);
        ctx.restore();

        ctx.save();
        ctx.translate(
            this.position.x + ctx.canvas.width,
            this.position.y + ctx.canvas.height
        );
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.drawImage(this.newcnv, -this.base.x, -this.base.y);
        ctx.restore();
      };

      return p;
    };

    var Asteroid = function (rad) {
      var asteroid = new Polygon({
        points: asteroidVertices(Math.max(Math.floor(rad / 5), 3), rad),
        color: self.game.color,
        name: "asteroid",
        size: {x: 210, y: 210},
        base: {x: 105, y: 105},
        velocity: {
          x: (Math.random() * 2 - 1) * Math.random() * 2,
          y: (Math.random() * 2 - 1) * Math.random() * 2,
        },
        position: {x: Math.random() * 500, y: Math.random() * 1000},
      });
      asteroid.Start = function () {
        this.rotationSpeed = (Math.random() * 2 - 1) * Math.random() * 2;
        this.radius = rad;
        this.score = (80 / this.radius) * 5;
      };
      asteroid.Update = function () {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        if (this.position.x > self.game.canvas.width) {
          this.position.x -= self.game.canvas.width;
        }
        if (this.position.x < 0) {
          this.position.x += self.game.canvas.width;
        }
        if (this.position.y > self.game.canvas.height) {
          this.position.y -= self.game.canvas.height;
        }
        if (this.position.y < 0) {
          this.position.y += self.game.canvas.height;
        }

        this.rotation += this.rotationSpeed;
        if (this.rotation >= 360) {
          this.rotation -= 360;
        }
        if (this.rotation < 0) {
          this.rotation += 360;
        }
      };
      return asteroid;
    };

    var Bullet = function () {
      var bul = new Polygon({
        points: [
          {x: 0, y: 0},
          {x: 0, y: -5},
        ],
        size: {x: 10, y: 15},
        base: {x: 5, y: 10},
        color: self.game.color,
        name: "bullet",
      });
      bul.Start = function () {
        var posDelta = RotatePoint(
            {x: 0, y: -20},
            {x: 0, y: 0},
            (ship.rotation * Math.PI) / 180
        );
        this.position = {
          x: ship.position.x + posDelta.x,
          y: ship.position.y + posDelta.y,
        };
        this.rotation = ship.rotation;
        this.velocity = {x: posDelta.x / 2, y: posDelta.y / 2};
      };
      bul.Update = function () {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        var pos = this.position;
        var collision = false;
        self.game.eachByName("asteroid", function (node, k) {
          if (
              Math.sqrt(
                  (node.position.x - pos.x) * (node.position.x - pos.x) +
                  (node.position.y - pos.y) * (node.position.y - pos.y)
              ) < node.radius
          ) {
            var verts = [];
            for (var i = 0; i < node.points.length; i++) {
              var np = RotatePoint(
                  node.points[i],
                  {x: 0, y: 0},
                  (node.rotation * Math.PI) / 180
              );
              verts.push({
                x: np.x + node.position.x,
                y: np.y + node.position.y,
              });
            }
            if (CheckPointInPoly(pos, verts)) {
              collision = true;
              var r = node.radius / 2;
              if (r > 5) {
                var ast1 = new Asteroid(node.radius / 2);
                var ast2 = new Asteroid(node.radius / 2);
                ast1.Start();
                ast2.Start();

                ast1.velocity = RotatePoint(
                    node.velocity,
                    {x: 0, y: 0},
                    (10 * Math.PI) / 180
                );
                ast2.velocity = RotatePoint(
                    node.velocity,
                    {x: 0, y: 0},
                    360 - (10 * Math.PI) / 180
                );

                ast1.position = {
                  x: node.position.x + ast1.velocity.x,
                  y: node.position.y + ast1.velocity.y,
                };
                ast2.position = {
                  x: node.position.x + ast2.velocity.x,
                  y: node.position.y + ast2.velocity.y,
                };

                self.game.objects.push(ast1, ast2);
              } else {
                var burst = new Burst({
                  position: node.position,
                  color: self.game.color,
                });
                self.game.objects.push(burst);
              }
              node.delete = true;
              self.game.score += node.score;
            }
          }
        });
        if (collision) {
          this.delete = true;
        }

        if (
            this.position.x < 0 ||
            this.position.y < 0 ||
            this.position.x > self.game.canvas.width ||
            this.position.y > self.game.canvas.height
        ) {
          this.delete = true;
        }
      };
      return bul;
    };

    var Burst = function (options) {
      var length = options.length || 10;
      var count = options.count || 36;
      var color = options.color || "#F00";
      var name = options.name || "burst";
      var pos = options.position || {x: 0, y: 0};
      var speed = options.speed || 10;

      var obj = {
        delete: false,
        radius: 0,
        count: count,
        color: color,
        name: name,
        position: pos,
        length: length,
      };

      obj.Start = function () {
      };
      obj.Update = function () {
        this.radius += speed;
        if (
            this.radius > self.game.canvas.width ||
            this.radius > self.game.canvas.height
        ) {
          this.delete = true;
        }
      };
      obj.Draw = function (ctx) {
        ctx.save();
        ctx.translate(this.position.x, this.position.y);
        ctx.beginPath();
        for (var i = 0; i < this.count; i++) {
          var v1 = RotatePoint(
              {x: 0, y: this.radius},
              {x: 0, y: 0},
              (2 / this.count) * i * Math.PI
          );
          var v2 = RotatePoint(
              {x: 0, y: this.radius + this.length},
              {x: 0, y: 0},
              (2 / this.count) * i * Math.PI
          );
          ctx.moveTo(v1.x, v1.y);
          ctx.lineTo(v2.x, v2.y);
        }
        ctx.closePath();
        ctx.strokeStyle = this.color;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 5;
        ctx.stroke();
        ctx.restore();
      };
      return obj;
    };

    var CheckIntersection = function (v1, v2, v3, v4) {
      var n1, n2, n3, n4;
      n1 = (v4.x - v3.x) * (v1.y - v3.y) - (v4.y - v3.y) * (v1.x - v3.x);
      n2 = (v4.x - v3.x) * (v2.y - v3.y) - (v4.y - v3.y) * (v2.x - v3.x);
      n3 = (v2.x - v1.x) * (v3.y - v1.y) - (v2.y - v1.y) * (v3.x - v1.x);
      n4 = (v2.x - v1.x) * (v4.y - v1.y) - (v2.y - v1.y) * (v4.x - v1.x);
      return n1 * n2 < 0 && n3 * n4 < 0;
    };

    var CheckPointInPoly = function (p, poly) {
      for (
          var i = 0, j = poly.length - 1, res = false;
          i < poly.length;
          j = i++
      ) {
        var v1 = {x: poly[i].x, y: poly[i].y};
        var v2 = {x: poly[j].x, y: poly[j].y};
        if (
            v1.y > p.y != v2.y > p.y &&
            p.x < ((v2.x - v1.x) * (p.y - v1.y)) / (v2.y - v1.y) + v1.x
        )
          res = !res;
      }
      return res;
    };

    var RotatePoint = function (p, center, angle) {
      return {
        x:
            (p.x - center.x) * Math.cos(angle) -
            (p.y - center.y) * Math.sin(angle) +
            center.x,
        y:
            (p.x - center.x) * Math.sin(angle) +
            (p.y - center.y) * Math.cos(angle) +
            center.y,
      };
    };

    var asteroidVertices = function (count, rad) {
      var p = [];
      for (var i = 0; i < count; i++) {
        p[i] = {
          x:
              (-Math.sin(((360 / count) * i * Math.PI) / 180) +
                  (Math.round(Math.random() * 2 - 1) * Math.random()) / 3) *
              rad,
          y:
              (-Math.cos(((360 / count) * i * Math.PI) / 180) +
                  (Math.round(Math.random() * 2 - 1) * Math.random()) / 3) *
              rad,
        };
      }
      return p;
    };

    var EngGameMessage = function (selector, score) {
      var scores = [];
      if (typeof Storage !== "undefined") {
        for (var i = 0; i < localStorage.length; i++) {
          if (typeof localStorage["board." + i + ".name"] !== "undefined") {
            scores.push({
              name: localStorage["board." + i + ".name"],
              score: localStorage["board." + i + ".score"],
            });
          }
        }
        scores.sort(function (a, b) {
          return b.score - a.score;
        });

        var html = '<ol class="b-scores">';
        if (score !== 0) {
          html +=
              '<li class="b-scores__box">Your score: ' +
              score +
              '. <input onchange="SaveName(this)" value="" autofocus="autofocus" type="text" placeholder="Enter your name" class="b-scores__input" /></li>';
        }
        html += "</ol>";

        if (document.getElementById('asteroidsGame')) {
          document.querySelector(selector).innerHTML = html;
        }
      }
    };

    var SaveScore = function (score, node) {
      if (score > 0 && typeof Storage !== "undefined") {
        var k = 0;
        for (var i = 0; i < localStorage.length; i++) {
          if (typeof localStorage["board." + i + ".name"] !== "undefined") {
            k = i + 1;
          }
        }
        localStorage["board." + k + ".name"] = self.game.name;
        localStorage["board." + k + ".score"] = score;
        node.innerHTML = "Done!";
      }
    };

    var SaveName = function (node) {
      self.game.name = node.value;
    };

    var ChangeGameColor = function (color) {
      var c = "#0F0";
      var page = document.querySelector("body");
      switch (color) {
        case 1:
          c = "#F00";
          page.className = "m-red";
          break;
        case 2:
          c = "#06F";
          page.className = "m-blue";
          break;
        default:
          c = "#0F0";
          page.className = "m-green";
      }
      for (var i = 0; i < self.game.objects.length; i++) {
        self.game.objects[i].color = c;
      }
      self.game.color = c;
      localStorage["self.game.color"] = c;
    };

    this.game = new GameEngine("#g-game", "#g-score");
    self.game.color = "";
    if (typeof Storage !== "undefined") {
      self.game.color = localStorage["self.game.color"] || "#0F0";
      var c = 0;
      switch (self.game.color) {
        case "#F00":
          c = 1;
          break;
        case "#06F":
          c = 2;
          break;
        default:
          c = 0;
      }
      ChangeGameColor(c);
    }

    var ship = new Polygon({
      points: [
        {x: 0, y: 0},
        {x: 10, y: 10},
        {x: 0, y: -20},
        {x: -10, y: 10},
      ],
      color: self.game.color,
      name: "ship",
      size: {x: 30, y: 45},
      base: {x: 15, y: 25},
    });
    ship.Start = function () {
      this.position = {x: self.game.canvas.width / 2, y: self.game.canvas.height / 2};
      this.rotationSpeed = 7;
      this.speed = 0.2;
      this.inertia = 0;
      this.inertiaMax = 0.99;
      this.shootDate = 0;
    };
    ship.Update = function () {
      if (self.game.input.left) {
        this.rotation -= this.rotationSpeed;
      }
      if (self.game.input.right) {
        this.rotation += this.rotationSpeed;
      }
      if (this.rotation >= 360) {
        this.rotation -= 360;
      }
      if (this.rotation < 0) {
        this.rotation += 360;
      }

      if (self.game.input.forward) {
        this.velocity.x -=
            Math.sin((-this.rotation * Math.PI) / 180) * this.speed;
        this.velocity.y -=
            Math.cos((-this.rotation * Math.PI) / 180) * this.speed;
        this.inertia = this.inertiaMax;

        this.points = [
          {x: 0, y: 0},
          {x: 10, y: 10},
          {x: 0, y: -20},
          {x: -10, y: 10},
          {x: 0, y: 0},
          {x: 3, y: 8},
          {x: 0, y: 15},
          {x: -3, y: 8},
        ];
      } else {
        this.points = [
          {x: 0, y: 0},
          {x: 10, y: 10},
          {x: 0, y: -20},
          {x: -10, y: 10},
        ];
      }

      if (self.game.input.fire && Date.now() - this.shootDate > 300) {
        var b = new Bullet();
        b.Start();
        self.game.objects.push(b);
        this.shootDate = Date.now();
      }

      this.position.x += this.velocity.x;
      this.position.y += this.velocity.y;
      this.velocity.x *= this.inertia;
      this.velocity.y *= this.inertia;

      if (this.position.x > self.game.canvas.width) {
        this.position.x -= self.game.canvas.width;
      }
      if (this.position.x < 0) {
        this.position.x += self.game.canvas.width;
      }
      if (this.position.y > self.game.canvas.height) {
        this.position.y -= self.game.canvas.height;
      }
      if (this.position.y < 0) {
        this.position.y += self.game.canvas.height;
      }

      var pos = this.position;
      var verts = this.points;
      var collision = false;
      var base = this.base;
      var angle = (this.rotation * Math.PI) / 180;
      var asteroidCount = 0;
      self.game.eachByName("asteroid", function (node, k) {
        asteroidCount++;
        if (
            Math.sqrt(
                (node.position.x - pos.x) * (node.position.x - pos.x) +
                (node.position.y - pos.y) * (node.position.y - pos.y)
            ) < 130
        ) {
          for (var i = 0; i < verts.length; i++) {
            var s1 = i;
            var s2 = i + 1 < verts.length ? i + 1 : 0;

            var rs1 = RotatePoint(
                {x: verts[s1].x, y: verts[s1].y},
                {x: 0, y: 0},
                angle
            );
            var rs2 = RotatePoint(
                {x: verts[s2].x, y: verts[s2].y},
                {x: 0, y: 0},
                angle
            );

            for (var j = 0; j < node.points.length; j++) {
              var n1 = j;
              var n2 = j + 1 < node.points.length ? j + 1 : 0;

              var rn1 = RotatePoint(
                  {x: node.points[n1].x, y: node.points[n1].y},
                  {x: 0, y: 0},
                  (node.rotation * Math.PI) / 180
              );
              var rn2 = RotatePoint(
                  {x: node.points[n2].x, y: node.points[n2].y},
                  {x: 0, y: 0},
                  (node.rotation * Math.PI) / 180
              );

              if (
                  CheckIntersection(
                      {x: rs1.x + pos.x, y: rs1.y + pos.y},
                      {x: rs2.x + pos.x, y: rs2.y + pos.y},
                      {x: rn1.x + node.position.x, y: rn1.y + node.position.y},
                      {x: rn2.x + node.position.x, y: rn2.y + node.position.y}
                  )
              ) {
                collision = true;
              }
            }
          }
        }
      });
      if (collision && document.getElementById('asteroidsGame')) {
        this.delete = true;
        var burst = new Burst({position: this.position, color: self.game.color});
        self.game.objects.push(burst);
        EngGameMessage("#g-leaderboard", self.game.score);
        document.querySelector("#g-endgame").style.display = "block";
      }

      if (asteroidCount < 1) {
        for (var i = 0; i < 4; i++) {
          var rock = new Asteroid(80);
          rock.Start();
          self.game.objects.push(rock);
        }
      }
    };
    self.game.objects.push(ship);
    for (var i = 0; i < 4; i++) {
      var rock = new Asteroid(80);
      rock.Start();
      self.game.objects.push(rock);
    }
    self.game.Run();
  }

  render() {
    return (
        <div className="pageMain" id="asteroidsGame">
          <div className="b-panel">
            Score:
            <span id="g-score">0</span>
            <div className="b-panel_right">
              <p className="my-none">
                Press <span className="highlighted">ESC</span> to exit
              </p>
            </div>
          </div>
          <canvas id="g-game"/>
          <div id="g-endgame" className="b-msgbox">
            <div id="g-leaderboard" className="d-none"/>
            <button
                className="button"
                onClick={(event) => this.reloadGame(this, event)}
            >
              You lost
            </button>
          </div>
          <Music audioName={"cassetter"} playImg={"play-pause-game"} pauseImg={"play-pause-game"}
                 customClassName={"game-audio-controls"}/>
        </div>
    );
  }
}

export default Asteroids;
