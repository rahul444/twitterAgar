var w = getWidth();
var h = Math.floor(0.92 * getHeight());
var speed = 10;
var context;

function ball(text, user, likes, followers) {
    this.txt = text;
    this.user = user;
    this.likes = likes;
    this.followers = followers;
    this.area = Math.PI * likes * likes;
    this.time = 0;
    var bCols = ["#99e6ff", "#80ccff", "#66a3ff", "#4d4dff", "#0040ff"];
    this.col = bCols[Math.floor(Math.random() * bCols.length)];

    this.setFromTwitter = function(likes) {
        this.likes = likes;
        this.area = Math.PI * likes * likes;
        this.time += 1;
    }

    this.x = Math.floor(Math.random() * (w - (2 * likes)) + likes);
    this.y = Math.floor(Math.random() * (h - (2 * likes)) + likes);

    var randX = Math.floor(Math.random() * 2);
    var randY = Math.floor(Math.random() * 2);
    if (randX == 1) this.dx = -1.5;
    else this.dx = 1.5;
    if (randY == 1) this.dy = -1.5;
    else this.dy = 1.5;
}

function init() {
  myCanvas.width = w;
  myCanvas.height = h;
  context= myCanvas.getContext('2d');
  drawMultiple(4);
}

function drawMultiple(n) {
    var arr = [];
    for (var i = 0; i < n; i++) {
        var radius = Math.floor(Math.random() * 100) + 50;
        var b = new ball("random txt", "naga", radius, 22);
        while (!checkValidPos(b, arr)) {
            newPos(b);
        }
        arr.push(b);
    }
    setInterval(draw, speed, arr);
}

function newPos(ball) {
    ball.x = Math.floor(Math.random() * (w - (2 * ball.likes)) + ball.likes);
    ball.y = Math.floor(Math.random() * (h - (2 * ball.likes)) + ball.likes);
}

function checkValidPos(b1, arr) {
    for (var i = 0; i < arr.length; i++) {
        var b2 = arr[i];
        if (overlaps(b1, b2)) {
            return false;
        }
    }
    return true;
}

function draw(arr) {
  context.clearRect(0,0, w, h);
  for (var i = 0; i < arr.length; i++) {
      var b = arr[i];
      context.beginPath();
      context.fillStyle=b.col;
      context.arc(b.x,b.y,b.likes,0,Math.PI*2,true);
      // b.likes += 0.1;
      context.closePath();
      context.fill();
      bounce(arr, i);

      // Boundary
      if(b.x + b.dx < b.likes || b.x + b.dx > w - b.likes) b.dx = -b.dx;
      if(b.y + b.dx < b.likes || b.y + b.dy > h - b.likes) b.dy = -b.dy;

      b.x+=b.dx;
      b.y+=b.dy;
  }
}

function bounce(arr, i) {
    var b1 = arr[i];
    for (var j = 0; j < arr.length; j++) {
        if (i != j) {
            var b2 = arr[j];
            makeBounce(b1, b2);
        }
    }
}

function makeBounce(b1, b2) {
    if (intersects(b1, b2)) {
           var dist = distance(b1, b2);
           if (dist < b1.likes + b2.likes) {
               var tempx = b1.dx;
               var tempy = b1.dy;
               b1.dx = b2.dx;
               b2.dx = tempx;
               b1.dy = b2.dy;
               b2.dy = tempy;
           }
    }
}

function distance(b1, b2) {
    return Math.sqrt(((b1.x - b2.x) * (b1.x - b2.x)) + ((b1.y - b2.y) * (b1.y - b2.y)));
}

function overlaps(b1, b2) {
    var dist = distance(b1, b2);
    if (dist <= b1.likes + b2.likes) {
        return true;
    }
    return false;
}

function intersects(b1, b2) {
    if (b1.x + b1.likes + b2.likes > b2.x
        && b1.x < b2.x + b1.likes + b2.likes
        && b1.y + b1.likes + b2.likes > b2.y
        && b1.y < b2.y + b1.likes + b2.likes) {
            return true;
    }
    return false;
}

function getWidth() {
  if (self.innerHeight) {
    return self.innerWidth;
  }

  if (document.documentElement && document.documentElement.clientWidth) {
    return document.documentElement.clientWidth;
  }

  if (document.body) {
    return document.body.clientWidth;
  }
}

function getHeight() {
  if (self.innerHeight) {
    return self.innerHeight;
  }

  if (document.documentElement && document.documentElement.clientHeight) {
    return document.documentElement.clientHeight;
  }

  if (document.body) {
    return document.body.clientHeight;
  }
}
