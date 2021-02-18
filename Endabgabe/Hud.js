"use strict";
var TheLegendOfThyra;
(function (TheLegendOfThyra) {
    class Hud {
        static displayHealth(_health) {
            let divHealth = document.querySelector("div#health");
            divHealth.innerHTML = _health.toString();
        }
        static displayCoins(_coins) {
            let divCoins = document.querySelector("div#coinCounter");
            divCoins.innerHTML = _coins.toString();
        }
    }
    TheLegendOfThyra.Hud = Hud;
})(TheLegendOfThyra || (TheLegendOfThyra = {}));
//# sourceMappingURL=Hud.js.map