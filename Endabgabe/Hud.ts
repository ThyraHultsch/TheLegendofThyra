namespace TheLegendOfThyra {

 
  export class Hud {
    
  
    public static displayHealth(_health: number): void {
      let divHealth: HTMLDivElement = document.querySelector("div#health");
      divHealth.innerHTML = _health.toString();
    }   

    public static displayCoins(_coins: number): void {
      let divCoins: HTMLDivElement = document.querySelector("div#coinCounter");
      divCoins.innerHTML = _coins.toString();
    }  
  }
}