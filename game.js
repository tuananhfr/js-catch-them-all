import Basket from "./basket";
import Rocket from "./rocket";
import Egg from "./egg";

export default class Game {
    constructor(canvas) {
        this.canvas=canvas;
        this.context = canvas.getContext('2d');
        this.request = null;
        this.basket = new Basket(this. canvas.width/2,this.canvas.height/2)
        this.eggs = [];
        this.rockets= []
        this.score =0;
        this.infinit = -0.75;
        this.interval;
                
    }

     infinity() {
       this.infinit = -this.infinit;
       if (this.infinit === 0.75) {this.interval = setInterval(() => {this.addEgg()}, 1000);}
       else {this.interval = clearInterval(this.interval);}
       document.getElementById("stopAndStartGame").blur();
     }

     addEgg() {
       let x = Math.floor(Math.random()*(this.canvas.width - Egg.EGG_WIDTH));
       this.eggs.push(new Egg(x,this.canvas.height));
     }

    // addRocket() {
    //   let y = Math.floor(Math.random()*(this.canvas.height - Egg.Egg_HEIGHT));
    //   this.rockets.push(new Rocket(this.canvas.width, y));
    // }

    moveAndDraw() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.basket.draw(this.context);
        this.moveAndDrawEgg();
        //this.moveAndDrawRockets();
        //this.rockets = this.rockets.filter(rocket => rocket.deleted !== true);
        this.eggs = this.eggs.filter(egg => egg.deleted !== true);
        this.basket.move(this.canvas);
        this.request = window.requestAnimationFrame(() => {this.moveAndDraw()});
    }
    
    // moveAndDrawRockets() {
    //   this.rockets.forEach((rocket) => {
    //     //rocket.eggs = this.eggs;
    //     rocket.move(this.canvas);
    //     //if (rocket.destroyEgg()) {this.addScore();}
    //     rocket.draw(this.context);
    //   })
    // }

     moveAndDrawEgg() {
       this.eggs.forEach((egg) => {
         egg.move(this.canvas);
         //if (egg.deleted) {this.addScore(-500);}
         egg.draw(this.context);
       })
     }
    
    addScore(added = 100) {
      this.score += added;
      document.getElementById("score").textContent = this.score;
    }

    startAndStop() {
        if(this.request === null){
          this.request = window.requestAnimationFrame(() => {this.moveAndDraw()});
        }
    
        else{
          window.cancelAnimationFrame(this.request);
          this.request = null;
        }
        document.getElementById("stopAndStartGame").blur();
    }


    keyDownActionHandler(event) {
        switch (event.key) {
          case "ArrowUp":
          case "Up":
            this.basket.moveUp();
            break;
          case "ArrowDown":
          case "Down":
            this.basket.moveDown();
            break;
          case "ArrowLeft":
          case "Left":
            this.basket.moveLeft();
            break;
          case "ArrowRight":
          case "Right":
            this.basket.moveRight();
            break;
          default: return;
       }
       event.preventDefault();
      }
    
      keyUpActionHandler(event) {
        switch (event.key) {
            case "ArrowUp":
            case "Up":
                if (!this.basket.getDown()) {this.basket.stopMoving();}
                break;
            case "ArrowDown":
            case "Down":
                if (!this.basket.getUp()) {this.basket.stopMoving();}
                break;
            case "ArrowLeft":
            case "Left":
                if (this.basket.getLeft()) {this.basket.stopMoving();}
                break;
            case "ArrowRight":
            case "Right":
                if (this.basket.getRight()) {this.basket.stopMoving();}
                break;
            default: return;
        }
        event.preventDefault();
      }

}



