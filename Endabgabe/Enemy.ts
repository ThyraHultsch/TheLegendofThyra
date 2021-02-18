
namespace TheLegendOfThyra {

  import fc = FudgeCore;

  const MIN_SPEED: number = 2;
  const MAX_SPEED: number = 3;

  export enum ANGLE {
    // N = 0, NE = 1, E = 2, SE = 3, S = 4, SW = 5, W = 6, NW = 7,
    _000 = 0, _045 = 1, _090 = 2, _135 = 3, _180 = 4, _225 = 5, _270 = 6, _315 = 7
  }

  export class Enemy extends Moveable {

    /* private static animations: ƒAid.SpriteSheetAnimations;
    private sprite: fcAid.NodeSprite;
    private show: fc.Node; */

    public enemyLife: number;
    public hitCooldown: number = 0; 

    //speed: number = (Math.random() * (3 - 1)) + 1;

    public constructor(_name: string, _position: fc.Vector2, _size: fc.Vector2, _material: string, _enemyLife: number) {


      super(_name, _position, _size, _material, (Math.random() * (MAX_SPEED - MIN_SPEED)) + MIN_SPEED );
      
      this.enemyLife = _enemyLife;



     /*  this.show = new fcAid.Node("Show", fc.Matrix4x4.IDENTITY());
      this.appendChild(this.show);

      this.sprite = new fcAid.NodeSprite("Sprite");
      this.sprite.addComponent(new fc.ComponentTransform());
      this.show.appendChild(this.sprite);

      this.sprite.setAnimation(<ƒAid.SpriteSheetAnimation>Enemy.animations["Idle_000"]);
    
      this.sprite.setFrameDirection(1);
      this.sprite.framerate = 2; */

    }


   /*  public static generateSprites(_spritesheet: fc.CoatTextured): void {
      
      
      Enemy.animations = {};
      for (let angle: number = 0; angle < 5; angle++) {
      let name: string = "Idle" + ANGLE[angle];
      let sprite: fcAid.SpriteSheetAnimation = new fcAid.SpriteSheetAnimation(name, _spritesheet);
      sprite.generateByGrid(fc.Rectangle.GET(44 + angle * 107, 33, 63, 66), 3, 32, fc.ORIGIN2D.BOTTOMCENTER, fc.Vector2.Y(100));
      Enemy.animations[name] = sprite;

      }

    } */


    public moveEnemy(avatar: GameObject): void {

      let wayToAvatarX: number = avatar.mtxLocal.translation.x - this.mtxLocal.translation.x - avatar.rect.size.x / 2;
      let wayToAvatarY: number = avatar.mtxLocal.translation.y - this.mtxLocal.translation.y - avatar.rect.size.y / 2;


      this.velocity = new fc.Vector3(wayToAvatarX, wayToAvatarY, 0);

      this.velocity.normalize(this.speed);
      //this.show.mtxLocal.showTo(this.velocity);
      
      //let vector: number = fc.Vector3.DOT(this.velocity, fc.Vector3.X(1)) / Math.sqrt(Math.pow(this.velocity.x, 2) + Math.pow(this.velocity.y, 2));

      //let angle: number = Math.acos(vector);
      //console.log(angle);
      //startVector: fc.Vector3 = fc.Vector3.X(1);

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


