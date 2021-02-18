"use strict";
var TheLegendOfThyra;
(function (TheLegendOfThyra) {
    var fc = FudgeCore;
    class Moveable extends TheLegendOfThyra.GameObject {
        constructor(_name, _position, _size, _material, _speed) {
            super(_name, _position, _size, _material);
            this.speed = 15;
            this.velocity = fc.Vector3.ZERO();
            if (_speed) {
                this.speed = _speed;
            }
            this.velocity = new fc.Vector3(fc.Random.default.getRange(-1, 1), fc.Random.default.getRange(-1, 1), 0);
            this.velocity.normalize(this.speed);
        }
        // move moves the game object and the collision detection reactangle
        move() {
            let frameTime = fc.Loop.timeFrameGame / 1000;
            let distance = fc.Vector3.SCALE(this.velocity, frameTime);
            this.translate(distance);
        }
        translate(_distance) {
            this.mtxLocal.translate(_distance);
            this.rect.position.x = this.mtxLocal.translation.x - this.rect.size.x / 2;
            this.rect.position.y = this.mtxLocal.translation.y - this.rect.size.y / 2;
        }
    }
    TheLegendOfThyra.Moveable = Moveable;
})(TheLegendOfThyra || (TheLegendOfThyra = {}));
//# sourceMappingURL=Moveable.js.map