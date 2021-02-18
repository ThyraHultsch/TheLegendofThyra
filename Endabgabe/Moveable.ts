namespace TheLegendOfThyra {
    
  import fc = FudgeCore;

  export class Moveable extends GameObject {

    public speed: number = 15;
    public velocity: fc.Vector3 = fc.Vector3.ZERO();


    public constructor(_name: string, _position: fc.Vector2, _size: fc.Vector2, _material: string, _speed?: number ) {

      super(_name, _position, _size, _material);

      if (_speed) {
        this.speed = _speed;
      }
      
    
      this.velocity = new fc.Vector3(fc.Random.default.getRange(-1, 1), fc.Random.default.getRange(-1, 1), 0);
      this.velocity.normalize(this.speed);
    
    }

    // move moves the game object and the collision detection reactangle

    public move(): void {

      let frameTime: number = fc.Loop.timeFrameGame / 1000;
      let distance: fc.Vector3 = fc.Vector3.SCALE(this.velocity, frameTime);
      this.translate(distance);
      
    }

    public translate(_distance: fc.Vector3): void {
      this.mtxLocal.translate(_distance);
      this.rect.position.x = this.mtxLocal.translation.x - this.rect.size.x / 2;
      this.rect.position.y = this.mtxLocal.translation.y - this.rect.size.y / 2;
    }
  }
}
