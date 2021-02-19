namespace TheLegendOfThyra {


  import fc = FudgeCore;

  const speed: number = 15;

  export class Avatar extends Moveable {


    public attackRadius: fc.Rectangle;

    public constructor(_name: string, _position: fc.Vector2, _size: fc.Vector2, _material: string) {


      super(_name, _position, _size, _material, speed);

      this.attackRadius = new fc.Rectangle(_position.x, _position.y, _size.x + 3, _size.y + 3, fc.ORIGIN2D.CENTER);

    }
    public checkCollisionAndMove(_target: GameObject, crtSideways: number, crtBackAndForth: number): void {

      while (true) {
        let intersection: fc.Rectangle = this.rect.getIntersection(_target.rect);

        if (intersection == null) {
          return;
        }


        if (intersection.size.x > intersection.size.y) {

          if (crtBackAndForth > 0) {
            this.mtxLocal.translateY(-0.2);
            this.rect.position.y -= 0.2;
            this.attackRadius.position.y -= 0.2;
          } else {
            this.mtxLocal.translateY(0.2);
            this.rect.position.y += 0.2;
            this.attackRadius.position.y += 0.2;
          }
        }
        else {

          if (crtSideways > 0) {
            this.mtxLocal.translateX(-0.2);
            this.rect.position.x -= 0.2;
            this.attackRadius.position.x -= 0.2;
          } else {
            this.mtxLocal.translateX(0.2);
            this.rect.position.x += 0.2;
            this.attackRadius.position.x += 0.2;
          }
        }


        return;
      }
    }
    
    public handleAttack( _target: GameObject): boolean {

      let intersection: fc.Rectangle = this.attackRadius.getIntersection(_target.rect);

      if (intersection == null) {
        return false;
      }

      return true;
    }

    public collisionCoin( _target: Coin): boolean {

      let intersection: fc.Rectangle = this.rect.getIntersection(_target.rect);

      if (intersection == null) {
        return false;
      }

      return true;
    }
  }
}