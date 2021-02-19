"use strict";
var TheLegendOfThyra;
(function (TheLegendOfThyra) {
    var fc = FudgeCore;
    const MIN_SPEED = 2;
    const MAX_SPEED = 3;
    let ANGLE;
    (function (ANGLE) {
        // N = 0, NE = 1, E = 2, SE = 3, S = 4, SW = 5, W = 6, NW = 7,
        ANGLE[ANGLE["_000"] = 0] = "_000";
        ANGLE[ANGLE["_045"] = 1] = "_045";
        ANGLE[ANGLE["_090"] = 2] = "_090";
        ANGLE[ANGLE["_135"] = 3] = "_135";
        ANGLE[ANGLE["_180"] = 4] = "_180";
        ANGLE[ANGLE["_225"] = 5] = "_225";
        ANGLE[ANGLE["_270"] = 6] = "_270";
        ANGLE[ANGLE["_315"] = 7] = "_315";
    })(ANGLE = TheLegendOfThyra.ANGLE || (TheLegendOfThyra.ANGLE = {}));
    class Enemy extends TheLegendOfThyra.Moveable {
        //speed: number = (Math.random() * (3 - 1)) + 1;
        constructor(_name, _position, _size, _material, _enemyLife) {
            super(_name, _position, _size, _material, (Math.random() * (MAX_SPEED - MIN_SPEED)) + MIN_SPEED);
            this.hitCooldown = 0;
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
        moveEnemy(avatar) {
            let wayToAvatarX = avatar.mtxLocal.translation.x - this.mtxLocal.translation.x - avatar.rect.size.x / 2;
            let wayToAvatarY = avatar.mtxLocal.translation.y - this.mtxLocal.translation.y - avatar.rect.size.y / 2;
            this.velocity = new fc.Vector3(wayToAvatarX, wayToAvatarY, 0);
            this.velocity.normalize(this.speed);
            //this.show.mtxLocal.showTo(this.velocity);
            //let vector: number = fc.Vector3.DOT(this.velocity, fc.Vector3.X(1)) / Math.sqrt(Math.pow(this.velocity.x, 2) + Math.pow(this.velocity.y, 2));
            //let angle: number = Math.acos(vector);
            //console.log(angle);
            //startVector: fc.Vector3 = fc.Vector3.X(1);
            this.move();
        }
        canAttack(_target) {
            let intersection = this.rect.getIntersection(_target.rect);
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
    TheLegendOfThyra.Enemy = Enemy;
})(TheLegendOfThyra || (TheLegendOfThyra = {}));
//# sourceMappingURL=Enemy.js.map