Game_Party.prototype.battleMembers = function() {
    var id = $gameVariables.value(10) - 1;
    return [this.allMembers()[Math.max(0, id)]];
};

Game_Actor.prototype.expForLevel = function(lv) {
    return (lv - 1) * 10;
};

Game_Actor.prototype.displayLevelUp = function(newSkills) {
    var text = TextManager.levelUp.format(this._name, TextManager.level, this._level);
    $gameMessage.newPage();
    $gameMessage.add(text);
    for (let i = 0; i < 8; i++) {
        var oldv = this.currentClass().params[i][this._level - 1];
        var newv = this.currentClass().params[i][this._level];
        if (newv > oldv) {
            // var msg = '\\c[2]' + TextManager.param(i) + '\\c[0] ' + oldv + ' → \\c[6]' + newv + '\\c[0]';
            var msg = '\\c[4]%1\\c[0] %2 → \\c[6]%3\\c[0]';
            var parname = TextManager.param(i);
            while (parname.length < 8) parname = parname + ' ';
            $gameMessage.add(msg.format(parname, oldv, newv));
        }
    }
    newSkills.forEach(function(skill) {
        $gameMessage.add(TextManager.obtainSkill.format(skill.name));
    });
};

Game_Actor.prototype.isSpriteVisible = function() {
    return true;
};

Sprite_Actor.prototype.setActorHome = function(index) {
    this.setHome(816 / 2, 532);
};

Sprite_Actor.prototype.startEntryMotion = function() {
    this.refreshMotion();
    this.startMove(0, 0, 0);
};

Sprite_Actor.prototype.stepForward = function() {
};

Sprite_Actor.prototype.stepBack = function() {
};

Sprite_Actor.prototype.retreat = function() {
};

Sprite_Actor.prototype.updateBitmap = function() {
    Sprite_Battler.prototype.updateBitmap.call(this);
};

Sprite_Actor.prototype.updateShadow = function() {
    this._shadowSprite.visible = false;
};

Game_Battler.prototype.isWeaponAnimationRequested = function() {
    return false;
};

Sprite_Enemy.prototype.damageOffsetY = function() {
    return -120;
};

Sprite_Actor.prototype.damageOffsetX = function() {
    return 0;
};

Sprite_Actor.prototype.damageOffsetY = function() {
    return -32;
};

Game_BattlerBase.prototype.param = function(paramId) {
    var value = this.paramBase(paramId) + this.paramPlus(paramId);
    value += this._buffs[paramId];
    value *= this.paramRate(paramId) * this.paramBuffRate(paramId);
    var maxValue = this.paramMax(paramId);
    var minValue = this.paramMin(paramId);
    return Math.round(value.clamp(minValue, maxValue));
};

Scene_Battle.prototype.updateStatusWindow = function() {
    if ($gameMessage.isBusy()) {
        this._statusWindow.close();
        this._partyCommandWindow.close();
        this._actorCommandWindow.close();
    } else if (this.isActive() && !this._messageWindow.isClosing()) {
        this._statusWindow.open();
        var ty = this.isAnyInputWindowActive() ? 444 : 556;
        if (this._statusWindow.y < ty) this._statusWindow.y += 8;
        if (this._statusWindow.y > ty) this._statusWindow.y -= 8;
    }
};

Scene_Battle.prototype.updateBattleProcess = function() {
    if (!this.isAnyInputWindowActive() || BattleManager.isAborting() ||
            BattleManager.isBattleEnd()) {
        BattleManager.update();
        this.changeInputWindow();
    }
};