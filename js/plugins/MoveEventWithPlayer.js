var SWITCH_ID = 4;
var EVENT_VARIABLE_ID = 10;

// Set Movement Route
Game_Interpreter.prototype.command205 = function() {
    var isSwitchOn = $gameSwitches.value(SWITCH_ID);
    $gameMap.refreshIfNeeded();
    this._character = this.character(this._params[0]);
    if (this._character) {
        this._character.forceMoveRoute(this._params[1]);
        if (isSwitchOn) {
            var evid = $gameVariables.value(EVENT_VARIABLE_ID);
            var evchar = this.character(evid);
            evchar.forceMoveRoute(this._params[1]);
        }
        if (this._params[1].wait) {
            this.setWaitMode('route');
        }
    }
    return true;
};