"use strict";
var TheLegendOfThyra;
(function (TheLegendOfThyra) {
    var fc = FudgeCore;
    const speed = 15;
    class Avatar extends TheLegendOfThyra.Moveable {
        constructor(_name, _position, _size, _material) {
            super(_name, _position, _size, _material, speed);
            this.attackRadius = new fc.Rectangle(_position.x, _position.y, _size.x + 3, _size.y + 3, fc.ORIGIN2D.CENTER);
        }
        checkCollisionAndMove(_target, crtSideways, crtBackAndForth) {
            while (true) {
                let intersection = this.rect.getIntersection(_target.rect);
                if (intersection == null) {
                    return;
                }
                if (intersection.size.x > intersection.size.y) {
                    if (crtBackAndForth > 0) {
                        this.mtxLocal.translateY(-0.2);
                        this.rect.position.y -= 0.2;
                        this.attackRadius.position.y -= 0.2;
                    }
                    else {
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
                    }
                    else {
                        this.mtxLocal.translateX(0.2);
                        this.rect.position.x += 0.2;
                        this.attackRadius.position.x += 0.2;
                    }
                }
                return;
            }
        }
        handleAttack(_target) {
            let intersection = this.attackRadius.getIntersection(_target.rect);
            if (intersection == null) {
                return false;
            }
            return true;
        }
        collisionCoin(_target) {
            let intersection = this.rect.getIntersection(_target.rect);
            if (intersection == null) {
                return false;
            }
            return true;
        }
    }
    TheLegendOfThyra.Avatar = Avatar;
})(TheLegendOfThyra || (TheLegendOfThyra = {}));
//# sourceMappingURL=Avatar.js.map