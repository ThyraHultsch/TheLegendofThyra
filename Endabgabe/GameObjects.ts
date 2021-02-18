namespace TheLegendOfThyra {
  import fc = FudgeCore;

  const clrWhite: fc.Color = fc.Color.CSS("white");

  export class GameObject extends fc.Node {


    private static readonly meshQuad: fc.MeshQuad = new fc.MeshQuad();

    private static readonly mtrDarkGreen: fc.Material = new fc.Material("DarkGreen", fc.ShaderUniColor, new fc.CoatColored(fc.Color.CSS("mediumseagreen")));
    private static readonly mtrGreen: fc.Material = new fc.Material("Green", fc.ShaderUniColor, new fc.CoatColored(fc.Color.CSS("palegreen")));
    
    private static readonly txtAvatar: fc.TextureImage = new fc.TextureImage("../EndabgabeAssets/transparent2.png");
    private static readonly mtrAvatar: fc.Material = new fc.Material("Avatar", fc.ShaderTexture, new fc.CoatTextured(clrWhite, GameObject.txtAvatar));

    private static readonly txtAvatarLinks: fc.TextureImage = new fc.TextureImage("../EndabgabeAssets/transparent3.png");    
    private static readonly mtrAvatarLinks: fc.Material = new fc.Material("AvatarLinks", fc.ShaderTexture, new fc.CoatTextured(clrWhite, GameObject.txtAvatarLinks));

    private static readonly txtAvatarRechts: fc.TextureImage = new fc.TextureImage("../EndabgabeAssets/transparent4.png");  
    private static readonly mtrAvatarRechts: fc.Material = new fc.Material("AvatarRechts", fc.ShaderTexture, new fc.CoatTextured(clrWhite, GameObject.txtAvatarRechts));

    private static readonly txtAvatarOben: fc.TextureImage = new fc.TextureImage("../EndabgabeAssets/transparent5.png"); 
    private static readonly mtrAvatarOben: fc.Material = new fc.Material("AvatarOben", fc.ShaderTexture, new fc.CoatTextured(clrWhite, GameObject.txtAvatarOben));

    private static readonly txtEnemy: fc.TextureImage = new fc.TextureImage("../EndabgabeAssets/ghost.png");    
    private static readonly mtrEnemy: fc.Material = new fc.Material("Enemy", fc.ShaderTexture, new fc.CoatTextured(clrWhite, GameObject.txtEnemy));

    private static readonly txtTree: fc.TextureImage = new fc.TextureImage("../EndabgabeAssets/tree.png");    
    private static readonly mtrTree: fc.Material = new fc.Material("Tree", fc.ShaderTexture, new fc.CoatTextured(clrWhite, GameObject.txtTree));

    private static readonly txtHurtEnemy: fc.TextureImage = new fc.TextureImage("../EndabgabeAssets/ghostROT.png");    
    private static readonly mtrHurtEnemy: fc.Material = new fc.Material("Hurt Enemy", fc.ShaderTexture, new fc.CoatTextured(clrWhite, GameObject.txtHurtEnemy));

    private static readonly txtRock1: fc.TextureImage = new fc.TextureImage("../EndabgabeAssets/Rock1.png");    
    private static readonly mtrRock1: fc.Material = new fc.Material("Rock1", fc.ShaderTexture, new fc.CoatTextured(clrWhite, GameObject.txtRock1));

    private static readonly txtRock2: fc.TextureImage = new fc.TextureImage("../EndabgabeAssets/Rock2.png");    
    private static readonly mtrRock2: fc.Material = new fc.Material("Rock2", fc.ShaderTexture, new fc.CoatTextured(clrWhite, GameObject.txtRock2));

    private static readonly txtHedge: fc.TextureImage = new fc.TextureImage("../EndabgabeAssets/hedge1.png");    
    private static readonly mtrHedge: fc.Material = new fc.Material("Hedge", fc.ShaderTexture, new fc.CoatTextured(clrWhite, GameObject.txtHedge));

    private static readonly txtPond: fc.TextureImage = new fc.TextureImage("../EndabgabeAssets/pond.png");    
    private static readonly mtrPond: fc.Material = new fc.Material("Pond", fc.ShaderTexture, new fc.CoatTextured(clrWhite, GameObject.txtPond));

    private static readonly txtTreestump: fc.TextureImage = new fc.TextureImage("../EndabgabeAssets/treestump.png");    
    private static readonly mtrTreestump: fc.Material = new fc.Material("Treestump", fc.ShaderTexture, new fc.CoatTextured(clrWhite, GameObject.txtTreestump));

    private static readonly txtCoin: fc.TextureImage = new fc.TextureImage("../EndabgabeAssets/coin_transparent.png");    
    private static readonly mtrCoin: fc.Material = new fc.Material("Coin", fc.ShaderTexture, new fc.CoatTextured(clrWhite, GameObject.txtCoin));

    private static readonly txtAttackRadius: fc.TextureImage = new fc.TextureImage("../EndabgabeAssets/kreis.png");    
    private static readonly mtrAttackRadius: fc.Material = new fc.Material("Coin", fc.ShaderTexture, new fc.CoatTextured(clrWhite, GameObject.txtAttackRadius));
    
    public rect: fc.Rectangle;
  
    public constructor(_name: string, _position: fc.Vector2, _size: fc.Vector2, _material: string) {
      super(_name);

      this.rect = new fc.Rectangle(_position.x, _position.y, _size.x, _size.y, fc.ORIGIN2D.CENTER);

      this.addComponent(new fc.ComponentTransform(fc.Matrix4x4.TRANSLATION(_position.toVector3(0))));

      let cmpQuad: fc.ComponentMesh = new fc.ComponentMesh(GameObject.meshQuad);
      this.addComponent(cmpQuad);
      cmpQuad.pivot.scale(_size.toVector3(0));

      if (_material == "DarkGreen") {
        let cMaterial: fc.ComponentMaterial = new fc.ComponentMaterial(GameObject.mtrDarkGreen);
        this.addComponent(cMaterial);
      }
      if (_material == "Green") {
        let cMaterial: fc.ComponentMaterial = new fc.ComponentMaterial(GameObject.mtrGreen);
        this.addComponent(cMaterial);
      }
      if (_material == "Avatar") {
        let cMaterial: fc.ComponentMaterial = new fc.ComponentMaterial(GameObject.mtrAvatar);
        this.addComponent(cMaterial);
      }   
      if (_material == "Enemy") {
        let cMaterial: fc.ComponentMaterial = new fc.ComponentMaterial(GameObject.mtrEnemy);
        this.addComponent(cMaterial);
      }   
      if (_material == "Tree") {
        let cMaterial: fc.ComponentMaterial = new fc.ComponentMaterial(GameObject.mtrTree);
        this.addComponent(cMaterial);
      }
      if (_material == "Rock1") {
        let cMaterial: fc.ComponentMaterial = new fc.ComponentMaterial(GameObject.mtrRock1);
        this.addComponent(cMaterial);
      }
      if (_material == "Rock2") {
        let cMaterial: fc.ComponentMaterial = new fc.ComponentMaterial(GameObject.mtrRock2);
        this.addComponent(cMaterial);
      }
      if (_material == "Hedge") {
        let cMaterial: fc.ComponentMaterial = new fc.ComponentMaterial(GameObject.mtrHedge);
        this.addComponent(cMaterial);
      }
      if (_material == "Pond") {
        let cMaterial: fc.ComponentMaterial = new fc.ComponentMaterial(GameObject.mtrPond);
        this.addComponent(cMaterial);
      }
      if (_material == "Treestump") {  
        let cMaterial: fc.ComponentMaterial = new fc.ComponentMaterial(GameObject.mtrTreestump);
        this.addComponent(cMaterial);
      }
      if (_material == "Coin") {  
        let cMaterial: fc.ComponentMaterial = new fc.ComponentMaterial(GameObject.mtrCoin);
        this.addComponent(cMaterial);
      }
      if (_material == "AttackRadius") {  
        let cMaterial: fc.ComponentMaterial = new fc.ComponentMaterial(GameObject.mtrAttackRadius);
        this.addComponent(cMaterial);
      }

    }

    public swapMaterial(): void {
     
      this.removeComponent(this.getAllComponents()[2]);
      let cMaterial: fc.ComponentMaterial = new fc.ComponentMaterial(GameObject.mtrHurtEnemy);
      this.addComponent(cMaterial);

    }

    public swapAvatarMaterial(outputLR: number, outputUD: number): void {


      if (Math.abs(outputLR) > Math.abs(outputUD)) {
        if (outputLR > 0) {
          this.removeComponent(this.getAllComponents()[2]);
          let cMaterial: fc.ComponentMaterial = new fc.ComponentMaterial(GameObject.mtrAvatarRechts);
          this.addComponent(cMaterial);
          return;
        } else {
          this.removeComponent(this.getAllComponents()[2]);
          let cMaterial: fc.ComponentMaterial = new fc.ComponentMaterial(GameObject.mtrAvatarLinks);
          this.addComponent(cMaterial);
          return;
        }
      } else {
        if ( outputUD > 0 ) {
          this.removeComponent(this.getAllComponents()[2]);
          let cMaterial: fc.ComponentMaterial = new fc.ComponentMaterial(GameObject.mtrAvatarOben);
          this.addComponent(cMaterial);
          return; 
        } else {
          this.removeComponent(this.getAllComponents()[2]);
          let cMaterial: fc.ComponentMaterial = new fc.ComponentMaterial(GameObject.mtrAvatar);
          this.addComponent(cMaterial);
          return; 
        } 
      }    
    }
  }
}