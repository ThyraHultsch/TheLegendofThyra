
namespace TheLegendOfThyra {

  import fc = FudgeCore;

  const MIN_SPEED: number = 2;
  const MAX_SPEED: number = 3;

  export class Enemy extends Moveable {

    public enemyLife: number;
    public hitCooldown: number = 0; 

    

    public constructor(_name: string, _position: fc.Vector2, _size: fc.Vector2, _material: string, _enemyLife: number) {


      super(_name, _position, _size, _material, (Math.random() * (MAX_SPEED - MIN_SPEED)) + MIN_SPEED );
      
      this.enemyLife = _enemyLife;   
    }

    public moveEnemy(avatar: GameObject): void {

      let wayToAvatarX: number = avatar.mtxLocal.translation.x - this.mtxLocal.translation.x - avatar.rect.size.x / 2;
      let wayToAvatarY: number = avatar.mtxLocal.translation.y - this.mtxLocal.translation.y - avatar.rect.size.y / 2;

      this.velocity = new fc.Vector3(wayToAvatarX, wayToAvatarY, 0);
      this.velocity.normalize(this.speed);
      
      this.move();
    }

    public canAttack( _target: GameObject): boolean {

      let intersection: fc.Rectangle = this.rect.getIntersection(_target.rect);
      
      if (this.hitCooldown > 0) {
        this.hitCooldown -= fc.Loop.timeFrameGame;
      }

      if (intersection == null || this.hitCooldown > 0) {
        return false;
      }

      this.hitCooldown = 3000;
      return true;  
    }

  }
}


