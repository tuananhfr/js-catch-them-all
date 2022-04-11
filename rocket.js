import Mobile from "./mobile";
import RocketImgSrc from './assets/images/rocket128.png';
import Egg from "./egg";
export default class Rocket extends Mobile {
    constructor(x,y,src = RocketImgSrc,deltaX=6,deltaY=0){
        super(x,y,src,deltaX,deltaY);
        this.eggs = [];
        this.deleted = false;
    }

    /*collisionWith(EggImgSrc) {
        let b2x = eggs.x + Egg.Egg_WIDTH;
        let b2y = eggs.y + Egg.Egg_HEIGHT;
    
        let p1x = Math.max(this.x, eggs.x + 2*Egg.Egg_WIDTH/3);
        let p1y = Math.max(this.y, eggs.y + 2*Egg.Egg_HEIGHT/3);
    
        let p2x = Math.min(this.x + Egg.Egg_WIDTH, b2x);
        let p2y = Math.min(this.y + Egg.Egg_HEIGHT, b2y);
    
        return ((p1x < p2x) && (p1y < p2y));
    }

    destroyEgg() {
        let cpt = 0;
        this.eggs.forEach(egg => {
          if (this.collisionWith(egg)) {
            this.deleted = true;
            cpt ++;
          }
        })
        if (cpt > 0) {return true;}
        return false;
    }
    */

    move(canvas) {
        this.x = Math.max(0, this.x + this.deltaX);
        if (this.x > canvas.width) {this.deleted = true;}
      }
}