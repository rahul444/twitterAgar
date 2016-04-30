var w = getWidth();
var h = getHeight();
var speed = 40;
var context;

function ball(text, user, likes) {
    this.txt = text;
    this.user = user;
    this.likes = likes;
    this.area = Math.PI * likes * likes;
    this.time = 0;
    var bCols = ["#99e6ff", "#80ccff", "#66a3ff", "#4d4dff", "#0040ff"];
    this.col = bCols[Math.floor(Math.random() * bCols.length)];

    this.setFromTwitter = function(likes) {
        this.likes = likes;
        this.area = Math.PI * likes * likes;
        this.time += 1;
    }

    this.x = Math.floor(Math.random() * w);
    this.y = Math.floor(Math.random() * h);

    var randX = Math.floor(Math.random() * 2);
    var randY = Math.floor(Math.random() * 2);
    if (randX == 1) this.dx = -3;
    else this.dx = 3;
    if (randY == 1) this.dy = -3;
    else this.dy = 3;
}

function init() {
  context= myCanvas.getContext('2d');
  drawMultiple(14);
}

function drawMultiple(n) {
    var arr = [];
    var bal = new ball("random txt", "naga", Math.floor(Math.random() * 100));
    for (var i = 0; i < n; i++) {
        var bal = new ball("random txt", "naga", Math.floor(Math.random() * 100));
        arr.push(bal);
    }
    setInterval(draw,speed,arr);
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

      // Boundary
      if(b.x<0 || b.x>w) b.dx=-b.dx;
      if(b.y<0 || b.y>h) b.dy=-b.dy;

      b.x+=b.dx;
      b.y+=b.dy;
  }
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
