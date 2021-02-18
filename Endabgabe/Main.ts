namespace TheLegendOfThyra {

  import fc = FudgeCore;

  window.addEventListener("load", hndLoad);


  enum GAMESTATE {
    PLAY, GAMEOVER, PAUSE
  }
  let root: fc.Node;
  let background: fc.Node;
  let walls: fc.Node;
  let objects: fc.Node;
  let enemies: fc.Node;
  let time: number;
  //const clrWhite: fc.Color = fc.Color.CSS("white");
  let enemyLife: number;
  let avatarLife: number;
  let gameState: GAMESTATE;
  let coins: fc.Node;
  let coinCounter: number;
  let guiDiv: HTMLDivElement;
  let enemyNumber: number;
  let levelNumber: number;
  let spawnRateNumber: number;
  let attackRadiusNode: fc.Node;

  enum TYPE {
    TREE = 0,
    ROCK1 = 1,
    ROCK2 = 2,
    HEDGE = 3,
    POND = 4,
    TREESTUMP = 5
  }
  interface Level {

    "type": TYPE;
    "positionX": number;
    "positionY": number;
    "sizeX": number;
    "sizeY": number;
  }
  let arrayLevel: Level[] = [];

  export let viewport: fc.Viewport;

  let avatar: Avatar;

  let crtSideways: fc.Control = new fc.Control("PaddleControl", 0.2, fc.CONTROL_TYPE.PROPORTIONAL);
  crtSideways.setDelay(100);
  let crtBackAndForth: fc.Control = new fc.Control("PaddleControl", 0.2, fc.CONTROL_TYPE.PROPORTIONAL);
  crtBackAndForth.setDelay(100);


  /* let audioElement0: HTMLAudioElement = document.createElement("audio");
  audioElement0.setAttribute("src", "../EndabgabeAssets/music_zapsplat_game_music_action_retro_8_bit_repeating_016.mp3");
  audioElement0.setAttribute("autoplay", "autoplay");
  audioElement0.setAttribute("loop", "loop");
  audioElement0.volume = 0.05;
  audioElement0.play();   */

  let enemyLifeRange: HTMLInputElement;
  let enemyCounter: HTMLInputElement;
  let continueButton: HTMLDivElement;
  let enemyLifeText: HTMLParagraphElement;
  let enemyCounterText: HTMLParagraphElement;
  let audio: HTMLAudioElement = document.createElement("audio");

  let levelSelection: HTMLInputElement;
  let levelSelectionText: HTMLParagraphElement;

  let spawnRate: HTMLInputElement;
  let spawnRateText: HTMLParagraphElement;



  async function hndLoad(): Promise<void> {

    time = 0;
    coinCounter = 0;
    avatarLife = 3;
    gameState = GAMESTATE.PLAY;

    let guiDivButton: HTMLDivElement = <HTMLDivElement>document.getElementById("GUIButton");
    guiDivButton.addEventListener("click", hndGUI);

    continueButton = <HTMLDivElement>document.getElementById("ButtonPlay");
    continueButton.addEventListener("click", hndContinueButton);

    let restartButton: HTMLDivElement = <HTMLDivElement>document.getElementById("ButtonRestart");
    restartButton.addEventListener("click", hndRestartButton);

    enemyCounter = <HTMLInputElement>document.getElementById("EnemyCountRange");
    enemyCounter.addEventListener("change", hndEnemyCounter);

    enemyNumber = enemyCounter.valueAsNumber;

    enemyLifeRange = <HTMLInputElement>document.getElementById("EnemyLifeRange");
    enemyLifeRange.addEventListener("change", hndEnemyLife);

    enemyLife = enemyLifeRange.valueAsNumber;

    enemyLifeText = <HTMLParagraphElement>document.getElementById("EnemyLifeText");
    enemyLifeText.innerHTML = "Life of Enemies: " + enemyLife;

    enemyCounterText = <HTMLParagraphElement>document.getElementById("EnemyCountText");
    enemyCounterText.innerHTML = "Enemies: " + enemyNumber;

    levelSelection = <HTMLInputElement>document.getElementById("LevelSelectionRange");
    levelSelection.addEventListener("change", hndLevelSelection);
    levelSelectionText = <HTMLParagraphElement>document.getElementById("LevelSelectionText");
    levelNumber = levelSelection.valueAsNumber;
    levelSelectionText.innerHTML = "Level: " + levelNumber;

    guiDiv = <HTMLDivElement>document.getElementById("GUI");

    spawnRate = <HTMLInputElement>document.getElementById("SpawnRateRange");
    spawnRate.addEventListener("change", hndSpawnRate);
    spawnRateNumber = spawnRate.valueAsNumber;
    spawnRateText = <HTMLParagraphElement>document.getElementById("SpawnRateText");
    console.log(spawnRateNumber);
    spawnRateText.innerHTML = "Spawn Rate: " + spawnRateNumber / 1000 + " seconds";

    let response: Response = await fetch("level" + levelNumber + ".json");
    let jsonLevel: JSON = await response.json();
    arrayLevel = JSON.parse(JSON.stringify(jsonLevel));


    audio.style.display = "none";
    audio.src = "../EndabgabeAssets/music_zapsplat_game_music_action_retro_8_bit_repeating_016.mp3";
    audio.volume = 0.05;
    audio.autoplay = true;
    audio.onended = function (): void {
      audio.remove();
    };

    document.body.appendChild(audio);

    const canvas: HTMLCanvasElement = document.querySelector("canvas");

    canvas.addEventListener("click", hndClick);

    root = new fc.Node("Root");

    //Avatar erstellen
    avatar = new Avatar("Avatar", new fc.Vector2(0, 0), new fc.Vector2(2, 3), "Avatar");
    root.addChild(avatar);
    createLevel();

    enemies = createEnemy();
    root.addChild(enemies);

    attackRadiusNode = new fc.Node("AttackRadiusNode");
    root.addChild(attackRadiusNode);
    coins = new fc.Node("Coins");
    root.addChild(coins);

    background = new fc.Node("Background");
    root.addChild(background);
    background.addChild(new GameObject("Background", new fc.Vector2(0, 0), new fc.Vector2(39, 25), "Green"));

    createWalls();


    //Kamera erstellen und positionieren 
    let cmpCamera: fc.ComponentCamera = new fc.ComponentCamera();
    cmpCamera.pivot.translateZ(20);
    cmpCamera.pivot.rotateY(180);
    cmpCamera.backgroundColor = fc.Color.CSS("lightcyan");
    avatar.addComponent(cmpCamera);

    //Viewport erstellen
    viewport = new fc.Viewport();
    viewport.initialize("Viewport", root, cmpCamera, canvas);

    fc.Loop.addEventListener(fc.EVENT.LOOP_FRAME, hndLoop);
    fc.Loop.start(fc.LOOP_MODE.TIME_GAME, 60);

  }

  function hndSpawnRate(): void {
    spawnRateNumber = spawnRate.valueAsNumber;
    spawnRateText.innerHTML = "Spawn Rate: " + spawnRateNumber / 1000 + " seconds";
  }

  function hndLevelSelection(): void {

    levelNumber = levelSelection.valueAsNumber;
    levelSelectionText.innerHTML = "Level: " + levelNumber;
  }

  function hndEnemyCounter(): void {

    enemyNumber = enemyCounter.valueAsNumber;
    enemyCounterText.innerHTML = "Enemies: " + enemyNumber;

  }

  function hndEnemyLife(): void {

    enemyLife = enemyLifeRange.valueAsNumber;
    enemyLifeText.innerHTML = "Life of Enemies: " + enemyLife;
  }



  async function hndRestartButton(): Promise<void> {

    guiDiv.style.display = "none";
    await hndLoad();
  }

  function hndContinueButton(): void {

    gameState = GAMESTATE.PLAY;
    guiDiv.style.display = "none";
  }

  function hndGUI(): void {

    if (gameState == GAMESTATE.GAMEOVER) {
      return;
    }
    continueButton.style.display = "block";

    if (guiDiv.style.display == "none") {
      guiDiv.style.display = "block";
      gameState = GAMESTATE.PAUSE;
    } else {
      guiDiv.style.display = "none";
      gameState = GAMESTATE.PLAY;
    }



  }

  function hndClick(): void {

    if (gameState == GAMESTATE.GAMEOVER || gameState == GAMESTATE.PAUSE) {
      return;
    }


    let attackRadius: GameObject = new GameObject("AttackRadius", new fc.Vector2(avatar.attackRadius.x + avatar.attackRadius.width / 2, avatar.attackRadius.y + avatar.attackRadius.width / 2), new fc.Vector2(avatar.attackRadius.width, avatar.attackRadius.width), "AttackRadius");
    attackRadiusNode.addChild(attackRadius);

    setTimeout(function (): void {attackRadiusNode.removeChild(attackRadius); } , 200);


    playAudio("../EndabgabeAssets/zapsplat_warfare_sword_swing_fast_whoosh_blade_ring_005_43814.mp3", 0.3);

    for (let enemy of enemies.getChildren() as Enemy[]) {

      if (avatar.handleAttack(enemy)) {

        enemy.enemyLife--;
        enemy.swapMaterial();
        playAudio("../EndabgabeAssets/enemy_hurt.mp3", 0.3);

        if (enemy.enemyLife == 0) {

          enemies.removeChild(enemy);
          playAudio("../EndabgabeAssets/enemy_die.mp3", 0.3);

          if (Math.random() < 0.5) {
            coins.appendChild(new Coin("Coin", enemy.mtxLocal.translation.toVector2(), new fc.Vector2(1, 1), "Coin"));
          }

        }
      }
    }
  }

  function playAudio(url: string, volume: number): void {

    let audio: HTMLAudioElement = document.createElement("audio");
    audio.style.display = "none";
    audio.src = url;
    audio.volume = volume;
    audio.autoplay = true;
    audio.onended = function (): void {
      audio.remove();
    };
    document.body.appendChild(audio);
  }

  function createLevel(): void {

    objects = new fc.Node("Objects");
    root.addChild(objects);

    for (let i: number = 0; i < arrayLevel.length; i++) {

      switch (arrayLevel[i].type) {
        case TYPE.TREE:
          objects.addChild(new GameObject("Objekt" + i, new fc.Vector2(arrayLevel[i].positionX, arrayLevel[i].positionY), new fc.Vector2(arrayLevel[i].sizeX, arrayLevel[i].sizeY), "Tree"));
          break;
        case TYPE.ROCK1:
          objects.addChild(new GameObject("Objekt" + i, new fc.Vector2(arrayLevel[i].positionX, arrayLevel[i].positionY), new fc.Vector2(arrayLevel[i].sizeX, arrayLevel[i].sizeY), "Rock1"));
          break;
        case TYPE.ROCK2:
          objects.addChild(new GameObject("Objekt" + i, new fc.Vector2(arrayLevel[i].positionX, arrayLevel[i].positionY), new fc.Vector2(arrayLevel[i].sizeX, arrayLevel[i].sizeY), "Rock2"));
          break;
        case TYPE.HEDGE:
          objects.addChild(new GameObject("Objekt" + i, new fc.Vector2(arrayLevel[i].positionX, arrayLevel[i].positionY), new fc.Vector2(arrayLevel[i].sizeX, arrayLevel[i].sizeY), "Hedge"));
          break;
        case TYPE.POND:
          objects.addChild(new GameObject("Objekt" + i, new fc.Vector2(arrayLevel[i].positionX, arrayLevel[i].positionY), new fc.Vector2(arrayLevel[i].sizeX, arrayLevel[i].sizeY), "Pond"));
          break;
        case TYPE.TREESTUMP:
          objects.addChild(new GameObject("Objekt" + i, new fc.Vector2(arrayLevel[i].positionX, arrayLevel[i].positionY), new fc.Vector2(arrayLevel[i].sizeX, arrayLevel[i].sizeY), "Treestump"));
          break;


      }
    }
  }

  //Außenbegrenzungen erstellen 

  function createWalls(): void {

    walls = new fc.Node("Walls");
    root.addChild(walls);
    walls.addChild(new GameObject("WallLeft", new fc.Vector2(-20, 0), new fc.Vector2(1, 27), "DarkGreen"));
    walls.addChild(new GameObject("WallRight", new fc.Vector2(20, 0), new fc.Vector2(1, 27), "DarkGreen"));
    walls.addChild(new GameObject("WallTop", new fc.Vector2(0, 13), new fc.Vector2(40, 1), "DarkGreen"));
    walls.addChild(new GameObject("WallBottom", new fc.Vector2(0, -13), new fc.Vector2(40, 1), "DarkGreen"));

  }

  function createEnemy(): fc.Node {

    let enemies: fc.Node = new fc.Node("Enemies");
    enemies.addChild(new Enemy("Enemy", new fc.Vector2(-18, 10), new fc.Vector2(2, 2), "Enemy", enemyLife));

    return enemies;

  }

  function hndLoop(): void {

    if (gameState == GAMESTATE.GAMEOVER || gameState == GAMESTATE.PAUSE) {
      return;
    }

    controlAvatar();
    moveAllEnemy();
    collectCoin();
    Hud.displayHealth(avatarLife);
    Hud.displayCoins(coinCounter);
    viewport.draw();
    time += fc.Loop.timeFrameGame;

    if (enemies.getChildren().length == enemyNumber)
      return;

    if (time > spawnRateNumber) {
      time = 0;
      enemies.addChild(new Enemy("Enemy", new fc.Vector2(-18, 10), new fc.Vector2(2, 2), "Enemy", enemyLife));
    }
  }

  function collectCoin(): void {

    for (let coin of coins.getChildren() as Coin[]) {

      if (avatar.collisionCoin(coin)) {

        coinCounter++;
        coins.removeChild(coin);
        playAudio("../EndabgabeAssets/coinSound.mp3", 0.3);

      }
    }
  }

  function moveAllEnemy(): void {

    for (let enemy of enemies.getChildren() as Enemy[]) {

      enemy.moveEnemy(avatar);

      if (enemy.canAttack(avatar)) {
        attackAvatar();

      }
    }
  }

  function attackAvatar(): void {

    playAudio("../EndabgabeAssets/player_hurt.mp3", 0.3);
    avatarLife--;
    if (avatarLife == 0) {
      gameState = GAMESTATE.GAMEOVER;
      continueButton.style.display = "none";
      guiDiv.style.display = "block";
      playAudio("../EndabgabeAssets/GameOver.mp3", 0.3);
    }
  }


  //Avatar Steuerung 

  function controlAvatar(): void {


    crtSideways.setInput(
      fc.Keyboard.mapToValue(-1, 0, [fc.KEYBOARD_CODE.A, fc.KEYBOARD_CODE.ARROW_LEFT])
      + fc.Keyboard.mapToValue(1, 0, [fc.KEYBOARD_CODE.D, fc.KEYBOARD_CODE.ARROW_RIGHT])
    );

    crtBackAndForth.setInput(
      fc.Keyboard.mapToValue(-1, 0, [fc.KEYBOARD_CODE.S, fc.KEYBOARD_CODE.ARROW_DOWN])
      + fc.Keyboard.mapToValue(1, 0, [fc.KEYBOARD_CODE.W, fc.KEYBOARD_CODE.ARROW_UP])
    );

    avatar.mtxLocal.translateX(crtSideways.getOutput());
    avatar.rect.position.x += crtSideways.getOutput();
    avatar.attackRadius.position.x += crtSideways.getOutput();

    avatar.mtxLocal.translateY(crtBackAndForth.getOutput());
    avatar.rect.position.y += crtBackAndForth.getOutput();
    avatar.attackRadius.position.y += crtBackAndForth.getOutput();

    for (let wall of walls.getChildren()) {
      avatar.checkCollisionAndMove(<GameObject>wall, crtSideways.getOutput(), crtBackAndForth.getOutput());

    }
    for (let object of objects.getChildren()) {
      avatar.checkCollisionAndMove(<GameObject>object, crtSideways.getOutput(), crtBackAndForth.getOutput());
    }

    avatar.swapAvatarMaterial(crtSideways.getOutput(), crtBackAndForth.getOutput());


  }

}