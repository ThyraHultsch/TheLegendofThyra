"use strict";
var TheLegendOfThyra;
(function (TheLegendOfThyra) {
    var fc = FudgeCore;
    const clrWhite = fc.Color.CSS("white");
    let GameObject = /** @class */ (() => {
        class GameObject extends fc.Node {
            constructor(_name, _position, _size, _material) {
                super(_name);
                this.rect = new fc.Rectangle(_position.x, _position.y, _size.x, _size.y, fc.ORIGIN2D.CENTER);
                this.addComponent(new fc.ComponentTransform(fc.Matrix4x4.TRANSLATION(_position.toVector3(0))));
                let cmpQuad = new fc.ComponentMesh(GameObject.meshQuad);
                this.addComponent(cmpQuad);
                cmpQuad.pivot.scale(_size.toVector3(0));
                if (_material == "DarkGreen") {
                    let cMaterial = new fc.ComponentMaterial(GameObject.mtrDarkGreen);
                    this.addComponent(cMaterial);
                }
                if (_material == "Green") {
                    let cMaterial = new fc.ComponentMaterial(GameObject.mtrGreen);
                    this.addComponent(cMaterial);
                }
                if (_material == "Avatar") {
                    let cMaterial = new fc.ComponentMaterial(GameObject.mtrAvatar);
                    this.addComponent(cMaterial);
                }
                if (_material == "Enemy") {
                    let cMaterial = new fc.ComponentMaterial(GameObject.mtrEnemy);
                    this.addComponent(cMaterial);
                }
                if (_material == "Tree") {
                    let cMaterial = new fc.ComponentMaterial(GameObject.mtrTree);
                    this.addComponent(cMaterial);
                }
                if (_material == "Rock1") {
                    let cMaterial = new fc.ComponentMaterial(GameObject.mtrRock1);
                    this.addComponent(cMaterial);
                }
                if (_material == "Rock2") {
                    let cMaterial = new fc.ComponentMaterial(GameObject.mtrRock2);
                    this.addComponent(cMaterial);
                }
                if (_material == "Hedge") {
                    let cMaterial = new fc.ComponentMaterial(GameObject.mtrHedge);
                    this.addComponent(cMaterial);
                }
                if (_material == "Pond") {
                    let cMaterial = new fc.ComponentMaterial(GameObject.mtrPond);
                    this.addComponent(cMaterial);
                }
                if (_material == "Treestump") {
                    let cMaterial = new fc.ComponentMaterial(GameObject.mtrTreestump);
                    this.addComponent(cMaterial);
                }
                if (_material == "Coin") {
                    let cMaterial = new fc.ComponentMaterial(GameObject.mtrCoin);
                    this.addComponent(cMaterial);
                }
                if (_material == "AttackRadius") {
                    let cMaterial = new fc.ComponentMaterial(GameObject.mtrAttackRadius);
                    this.addComponent(cMaterial);
                }
            }
            swapMaterial() {
                this.removeComponent(this.getAllComponents()[2]);
                let cMaterial = new fc.ComponentMaterial(GameObject.mtrHurtEnemy);
                this.addComponent(cMaterial);
            }
            swapAvatarMaterial(outputLR, outputUD) {
                if (Math.abs(outputLR) > Math.abs(outputUD)) {
                    if (outputLR > 0) {
                        this.removeComponent(this.getAllComponents()[2]);
                        let cMaterial = new fc.ComponentMaterial(GameObject.mtrAvatarRechts);
                        this.addComponent(cMaterial);
                        return;
                    }
                    else {
                        this.removeComponent(this.getAllComponents()[2]);
                        let cMaterial = new fc.ComponentMaterial(GameObject.mtrAvatarLinks);
                        this.addComponent(cMaterial);
                        return;
                    }
                }
                else {
                    if (outputUD > 0) {
                        this.removeComponent(this.getAllComponents()[2]);
                        let cMaterial = new fc.ComponentMaterial(GameObject.mtrAvatarOben);
                        this.addComponent(cMaterial);
                        return;
                    }
                    else {
                        this.removeComponent(this.getAllComponents()[2]);
                        let cMaterial = new fc.ComponentMaterial(GameObject.mtrAvatar);
                        this.addComponent(cMaterial);
                        return;
                    }
                }
            }
        }
        GameObject.meshQuad = new fc.MeshQuad();
        GameObject.mtrDarkGreen = new fc.Material("DarkGreen", fc.ShaderUniColor, new fc.CoatColored(fc.Color.CSS("mediumseagreen")));
        GameObject.mtrGreen = new fc.Material("Green", fc.ShaderUniColor, new fc.CoatColored(fc.Color.CSS("palegreen")));
        GameObject.txtAvatar = new fc.TextureImage("../EndabgabeAssets/transparent2.png");
        GameObject.mtrAvatar = new fc.Material("Avatar", fc.ShaderTexture, new fc.CoatTextured(clrWhite, GameObject.txtAvatar));
        GameObject.txtAvatarLinks = new fc.TextureImage("../EndabgabeAssets/transparent3.png");
        GameObject.mtrAvatarLinks = new fc.Material("AvatarLinks", fc.ShaderTexture, new fc.CoatTextured(clrWhite, GameObject.txtAvatarLinks));
        GameObject.txtAvatarRechts = new fc.TextureImage("../EndabgabeAssets/transparent4.png");
        GameObject.mtrAvatarRechts = new fc.Material("AvatarRechts", fc.ShaderTexture, new fc.CoatTextured(clrWhite, GameObject.txtAvatarRechts));
        GameObject.txtAvatarOben = new fc.TextureImage("../EndabgabeAssets/transparent5.png");
        GameObject.mtrAvatarOben = new fc.Material("AvatarOben", fc.ShaderTexture, new fc.CoatTextured(clrWhite, GameObject.txtAvatarOben));
        GameObject.txtEnemy = new fc.TextureImage("../EndabgabeAssets/ghost.png");
        GameObject.mtrEnemy = new fc.Material("Enemy", fc.ShaderTexture, new fc.CoatTextured(clrWhite, GameObject.txtEnemy));
        GameObject.txtTree = new fc.TextureImage("../EndabgabeAssets/tree.png");
        GameObject.mtrTree = new fc.Material("Tree", fc.ShaderTexture, new fc.CoatTextured(clrWhite, GameObject.txtTree));
        GameObject.txtHurtEnemy = new fc.TextureImage("../EndabgabeAssets/ghostROT.png");
        GameObject.mtrHurtEnemy = new fc.Material("Hurt Enemy", fc.ShaderTexture, new fc.CoatTextured(clrWhite, GameObject.txtHurtEnemy));
        GameObject.txtRock1 = new fc.TextureImage("../EndabgabeAssets/Rock1.png");
        GameObject.mtrRock1 = new fc.Material("Rock1", fc.ShaderTexture, new fc.CoatTextured(clrWhite, GameObject.txtRock1));
        GameObject.txtRock2 = new fc.TextureImage("../EndabgabeAssets/Rock2.png");
        GameObject.mtrRock2 = new fc.Material("Rock2", fc.ShaderTexture, new fc.CoatTextured(clrWhite, GameObject.txtRock2));
        GameObject.txtHedge = new fc.TextureImage("../EndabgabeAssets/hedge1.png");
        GameObject.mtrHedge = new fc.Material("Hedge", fc.ShaderTexture, new fc.CoatTextured(clrWhite, GameObject.txtHedge));
        GameObject.txtPond = new fc.TextureImage("../EndabgabeAssets/pond.png");
        GameObject.mtrPond = new fc.Material("Pond", fc.ShaderTexture, new fc.CoatTextured(clrWhite, GameObject.txtPond));
        GameObject.txtTreestump = new fc.TextureImage("../EndabgabeAssets/treestump.png");
        GameObject.mtrTreestump = new fc.Material("Treestump", fc.ShaderTexture, new fc.CoatTextured(clrWhite, GameObject.txtTreestump));
        GameObject.txtCoin = new fc.TextureImage("../EndabgabeAssets/coin_transparent.png");
        GameObject.mtrCoin = new fc.Material("Coin", fc.ShaderTexture, new fc.CoatTextured(clrWhite, GameObject.txtCoin));
        GameObject.txtAttackRadius = new fc.TextureImage("../EndabgabeAssets/kreis.png");
        GameObject.mtrAttackRadius = new fc.Material("Coin", fc.ShaderTexture, new fc.CoatTextured(clrWhite, GameObject.txtAttackRadius));
        return GameObject;
    })();
    TheLegendOfThyra.GameObject = GameObject;
})(TheLegendOfThyra || (TheLegendOfThyra = {}));
//# sourceMappingURL=GameObjects.js.map