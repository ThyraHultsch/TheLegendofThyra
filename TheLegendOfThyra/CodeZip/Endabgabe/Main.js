"use strict";
var TheLegendOfThyra;
(function (TheLegendOfThyra) {
    var fc = FudgeCore;
    window.addEventListener("load", hndLoad);
    let GAMESTATE;
    (function (GAMESTATE) {
        GAMESTATE[GAMESTATE["PLAY"] = 0] = "PLAY";
        GAMESTATE[GAMESTATE["GAMEOVER"] = 1] = "GAMEOVER";
        GAMESTATE[GAMESTATE["PAUSE"] = 2] = "PAUSE";
    })(GAMESTATE || (GAMESTATE = {}));
    let root;
    let background;
    let walls;
    let objects;
    let enemies;
    let time;
    //const clrWhite: fc.Color = fc.Color.CSS("white");
    let enemyLife;
    let avatarLife;
    let gameState;
    let coins;
    let coinCounter;
    let guiDiv;
    let enemyNumber;
    let levelNumber;
    let spawnRateNumber;
    let attackRadiusNode;
    let TYPE;
    (function (TYPE) {
        TYPE[TYPE["TREE"] = 0] = "TREE";
        TYPE[TYPE["ROCK1"] = 1] = "ROCK1";
        TYPE[TYPE["ROCK2"] = 2] = "ROCK2";
        TYPE[TYPE["HEDGE"] = 3] = "HEDGE";
        TYPE[TYPE["POND"] = 4] = "POND";
        TYPE[TYPE["TREESTUMP"] = 5] = "TREESTUMP";
    })(TYPE || (TYPE = {}));
    let arrayLevel = [];
    let avatar;
    let crtSideways = new fc.Control("PaddleControl", 0.2, 0 /* PROPORTIONAL */);
    crtSideways.setDelay(100);
    let crtBackAndForth = new fc.Control("PaddleControl", 0.2, 0 /* PROPORTIONAL */);
    crtBackAndForth.setDelay(100);
    /* let audioElement0: HTMLAudioElement = document.createElement("audio");
    audioElement0.setAttribute("src", "../EndabgabeAssets/music_zapsplat_game_music_action_retro_8_bit_repeating_016.mp3");
    audioElement0.setAttribute("autoplay", "autoplay");
    audioElement0.setAttribute("loop", "loop");
    audioElement0.volume = 0.05;
    audioElement0.play();   */
    let enemyLifeRange;
    let enemyCounter;
    let continueButton;
    let enemyLifeText;
    let enemyCounterText;
    let audio = document.createElement("audio");
    let levelSelection;
    let levelSelectionText;
    let spawnRate;
    let spawnRateText;
    async function hndLoad() {
        time = 0;
        coinCounter = 0;
        avatarLife = 3;
        gameState = GAMESTATE.PLAY;
        let guiDivButton = document.getElementById("GUIButton");
        guiDivButton.addEventListener("click", hndGUI);
        continueButton = document.getElementById("ButtonPlay");
        continueButton.addEventListener("click", hndContinueButton);
        let restartButton = document.getElementById("ButtonRestart");
        restartButton.addEventListener("click", hndRestartButton);
        enemyCounter = document.getElementById("EnemyCountRange");
        enemyCounter.addEventListener("change", hndEnemyCounter);
        enemyNumber = enemyCounter.valueAsNumber;
        enemyLifeRange = document.getElementById("EnemyLifeRange");
        enemyLifeRange.addEventListener("change", hndEnemyLife);
        enemyLife = enemyLifeRange.valueAsNumber;
        enemyLifeText = document.getElementById("EnemyLifeText");
        enemyLifeText.innerHTML = "Life of Enemies: " + enemyLife;
        enemyCounterText = document.getElementById("EnemyCountText");
        enemyCounterText.innerHTML = "Enemies: " + enemyNumber;
        levelSelection = document.getElementById("LevelSelectionRange");
        levelSelection.addEventListener("change", hndLevelSelection);
        levelSelectionText = document.getElementById("LevelSelectionText");
        levelNumber = levelSelection.valueAsNumber;
        levelSelectionText.innerHTML = "Level: " + levelNumber;
        guiDiv = document.getElementById("GUI");
        spawnRate = document.getElementById("SpawnRateRange");
        spawnRate.addEventListener("change", hndSpawnRate);
        spawnRateNumber = spawnRate.valueAsNumber;
        spawnRateText = document.getElementById("SpawnRateText");
        console.log(spawnRateNumber);
        spawnRateText.innerHTML = "Spawn Rate: " + spawnRateNumber / 1000 + " seconds";
        let response = await fetch("level" + levelNumber + ".json");
        let jsonLevel = await response.json();
        arrayLevel = JSON.parse(JSON.stringify(jsonLevel));
        audio.style.display = "none";
        audio.src = "../EndabgabeAssets/music_zapsplat_game_music_action_retro_8_bit_repeating_016.mp3";
        audio.volume = 0.05;
        audio.autoplay = true;
        audio.onended = function () {
            audio.remove();
        };
        document.body.appendChild(audio);
        const canvas = document.querySelector("canvas");
        canvas.addEventListener("click", hndClick);
        root = new fc.Node("Root");
        //Avatar erstellen
        avatar = new TheLegendOfThyra.Avatar("Avatar", new fc.Vector2(0, 0), new fc.Vector2(2, 3), "Avatar");
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
        background.addChild(new TheLegendOfThyra.GameObject("Background", new fc.Vector2(0, 0), new fc.Vector2(39, 25), "Green"));
        createWalls();
        //Kamera erstellen und positionieren 
        let cmpCamera = new fc.ComponentCamera();
        cmpCamera.pivot.translateZ(20);
        cmpCamera.pivot.rotateY(180);
        cmpCamera.backgroundColor = fc.Color.CSS("lightcyan");
        avatar.addComponent(cmpCamera);
        //Viewport erstellen
        TheLegendOfThyra.viewport = new fc.Viewport();
        TheLegendOfThyra.viewport.initialize("Viewport", root, cmpCamera, canvas);
        fc.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, hndLoop);
        fc.Loop.start(fc.LOOP_MODE.TIME_GAME, 60);
    }
    function hndSpawnRate() {
        spawnRateNumber = spawnRate.valueAsNumber;
        spawnRateText.innerHTML = "Spawn Rate: " + spawnRateNumber / 1000 + " seconds";
    }
    function hndLevelSelection() {
        levelNumber = levelSelection.valueAsNumber;
        levelSelectionText.innerHTML = "Level: " + levelNumber;
    }
    function hndEnemyCounter() {
        enemyNumber = enemyCounter.valueAsNumber;
        enemyCounterText.innerHTML = "Enemies: " + enemyNumber;
    }
    function hndEnemyLife() {
        enemyLife = enemyLifeRange.valueAsNumber;
        enemyLifeText.innerHTML = "Life of Enemies: " + enemyLife;
    }
    async function hndRestartButton() {
        guiDiv.style.display = "none";
        await hndLoad();
    }
    function hndContinueButton() {
        gameState = GAMESTATE.PLAY;
        guiDiv.style.display = "none";
    }
    function hndGUI() {
        if (gameState == GAMESTATE.GAMEOVER) {
            return;
        }
        continueButton.style.display = "block";
        if (guiDiv.style.display == "none") {
            guiDiv.style.display = "block";
            gameState = GAMESTATE.PAUSE;
        }
        else {
            guiDiv.style.display = "none";
            gameState = GAMESTATE.PLAY;
        }
    }
    function hndClick() {
        if (gameState == GAMESTATE.GAMEOVER || gameState == GAMESTATE.PAUSE) {
            return;
        }
        let attackRadius = new TheLegendOfThyra.GameObject("AttackRadius", new fc.Vector2(avatar.attackRadius.x + avatar.attackRadius.width / 2, avatar.attackRadius.y + avatar.attackRadius.width / 2), new fc.Vector2(avatar.attackRadius.width, avatar.attackRadius.width), "AttackRadius");
        attackRadiusNode.addChild(attackRadius);
        setTimeout(function () { attackRadiusNode.removeChild(attackRadius); }, 200);
        playAudio("../EndabgabeAssets/zapsplat_warfare_sword_swing_fast_whoosh_blade_ring_005_43814.mp3", 0.3);
        for (let enemy of enemies.getChildren()) {
            if (avatar.handleAttack(enemy)) {
                enemy.enemyLife--;
                enemy.swapMaterial();
                playAudio("../EndabgabeAssets/enemy_hurt.mp3", 0.3);
                if (enemy.enemyLife == 0) {
                    enemies.removeChild(enemy);
                    playAudio("../EndabgabeAssets/enemy_die.mp3", 0.3);
                    if (Math.random() < 0.5) {
                        coins.appendChild(new TheLegendOfThyra.Coin("Coin", enemy.mtxLocal.translation.toVector2(), new fc.Vector2(1, 1), "Coin"));
                    }
                }
            }
        }
    }
    function playAudio(url, volume) {
        let audio = document.createElement("audio");
        audio.style.display = "none";
        audio.src = url;
        audio.volume = volume;
        audio.autoplay = true;
        audio.onended = function () {
            audio.remove();
        };
        document.body.appendChild(audio);
    }
    function createLevel() {
        objects = new fc.Node("Objects");
        root.addChild(objects);
        for (let i = 0; i < arrayLevel.length; i++) {
            switch (arrayLevel[i].type) {
                case TYPE.TREE:
                    objects.addChild(new TheLegendOfThyra.GameObject("Objekt" + i, new fc.Vector2(arrayLevel[i].positionX, arrayLevel[i].positionY), new fc.Vector2(arrayLevel[i].sizeX, arrayLevel[i].sizeY), "Tree"));
                    break;
                case TYPE.ROCK1:
                    objects.addChild(new TheLegendOfThyra.GameObject("Objekt" + i, new fc.Vector2(arrayLevel[i].positionX, arrayLevel[i].positionY), new fc.Vector2(arrayLevel[i].sizeX, arrayLevel[i].sizeY), "Rock1"));
                    break;
                case TYPE.ROCK2:
                    objects.addChild(new TheLegendOfThyra.GameObject("Objekt" + i, new fc.Vector2(arrayLevel[i].positionX, arrayLevel[i].positionY), new fc.Vector2(arrayLevel[i].sizeX, arrayLevel[i].sizeY), "Rock2"));
                    break;
                case TYPE.HEDGE:
                    objects.addChild(new TheLegendOfThyra.GameObject("Objekt" + i, new fc.Vector2(arrayLevel[i].positionX, arrayLevel[i].positionY), new fc.Vector2(arrayLevel[i].sizeX, arrayLevel[i].sizeY), "Hedge"));
                    break;
                case TYPE.POND:
                    objects.addChild(new TheLegendOfThyra.GameObject("Objekt" + i, new fc.Vector2(arrayLevel[i].positionX, arrayLevel[i].positionY), new fc.Vector2(arrayLevel[i].sizeX, arrayLevel[i].sizeY), "Pond"));
                    break;
                case TYPE.TREESTUMP:
                    objects.addChild(new TheLegendOfThyra.GameObject("Objekt" + i, new fc.Vector2(arrayLevel[i].positionX, arrayLevel[i].positionY), new fc.Vector2(arrayLevel[i].sizeX, arrayLevel[i].sizeY), "Treestump"));
                    break;
            }
        }
    }
    //Außenbegrenzungen erstellen 
    function createWalls() {
        walls = new fc.Node("Walls");
        root.addChild(walls);
        walls.addChild(new TheLegendOfThyra.GameObject("WallLeft", new fc.Vector2(-20, 0), new fc.Vector2(1, 27), "DarkGreen"));
        walls.addChild(new TheLegendOfThyra.GameObject("WallRight", new fc.Vector2(20, 0), new fc.Vector2(1, 27), "DarkGreen"));
        walls.addChild(new TheLegendOfThyra.GameObject("WallTop", new fc.Vector2(0, 13), new fc.Vector2(40, 1), "DarkGreen"));
        walls.addChild(new TheLegendOfThyra.GameObject("WallBottom", new fc.Vector2(0, -13), new fc.Vector2(40, 1), "DarkGreen"));
    }
    function createEnemy() {
        let enemies = new fc.Node("Enemies");
        enemies.addChild(new TheLegendOfThyra.Enemy("Enemy", new fc.Vector2(-18, 10), new fc.Vector2(2, 2), "Enemy", enemyLife));
        return enemies;
    }
    function hndLoop() {
        if (gameState == GAMESTATE.GAMEOVER || gameState == GAMESTATE.PAUSE) {
            return;
        }
        controlAvatar();
        moveAllEnemy();
        collectCoin();
        TheLegendOfThyra.Hud.displayHealth(avatarLife);
        TheLegendOfThyra.Hud.displayCoins(coinCounter);
        TheLegendOfThyra.viewport.draw();
        time += fc.Loop.timeFrameGame;
        if (enemies.getChildren().length == enemyNumber)
            return;
        if (time > spawnRateNumber) {
            time = 0;
            enemies.addChild(new TheLegendOfThyra.Enemy("Enemy", new fc.Vector2(-18, 10), new fc.Vector2(2, 2), "Enemy", enemyLife));
        }
    }
    function collectCoin() {
        for (let coin of coins.getChildren()) {
            if (avatar.collisionCoin(coin)) {
                coinCounter++;
                coins.removeChild(coin);
                playAudio("../EndabgabeAssets/coinSound.mp3", 0.3);
            }
        }
    }
    function moveAllEnemy() {
        for (let enemy of enemies.getChildren()) {
            enemy.moveEnemy(avatar);
            if (enemy.canAttack(avatar)) {
                attackAvatar();
            }
        }
    }
    function attackAvatar() {
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
    function controlAvatar() {
        crtSideways.setInput(fc.Keyboard.mapToValue(-1, 0, [fc.KEYBOARD_CODE.A, fc.KEYBOARD_CODE.ARROW_LEFT])
            + fc.Keyboard.mapToValue(1, 0, [fc.KEYBOARD_CODE.D, fc.KEYBOARD_CODE.ARROW_RIGHT]));
        crtBackAndForth.setInput(fc.Keyboard.mapToValue(-1, 0, [fc.KEYBOARD_CODE.S, fc.KEYBOARD_CODE.ARROW_DOWN])
            + fc.Keyboard.mapToValue(1, 0, [fc.KEYBOARD_CODE.W, fc.KEYBOARD_CODE.ARROW_UP]));
        avatar.mtxLocal.translateX(crtSideways.getOutput());
        avatar.rect.position.x += crtSideways.getOutput();
        avatar.attackRadius.position.x += crtSideways.getOutput();
        avatar.mtxLocal.translateY(crtBackAndForth.getOutput());
        avatar.rect.position.y += crtBackAndForth.getOutput();
        avatar.attackRadius.position.y += crtBackAndForth.getOutput();
        for (let wall of walls.getChildren()) {
            avatar.checkCollisionAndMove(wall, crtSideways.getOutput(), crtBackAndForth.getOutput());
        }
        for (let object of objects.getChildren()) {
            avatar.checkCollisionAndMove(object, crtSideways.getOutput(), crtBackAndForth.getOutput());
        }
        avatar.swapAvatarMaterial(crtSideways.getOutput(), crtBackAndForth.getOutput());
    }
})(TheLegendOfThyra || (TheLegendOfThyra = {}));
//# sourceMappingURL=Main.js.map