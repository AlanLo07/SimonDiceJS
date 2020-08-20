const azul = document.getElementById('azul')
const morado = document.getElementById('morado')
const naranja = document.getElementById('naranja')
const verde = document.getElementById('verde')
const btnEmpezar = document.getElementById('btnEmpezar')
const RANGO = 4
const MINIMO = 0
const LEVEL_MAXIMO=10
class Juego {
  constructor() {
    this.inicializar()
    this.generarColores()
    this.siguienteNivel()
  }

  inicializar() {
    btnEmpezar.classList.add('hide')
    this.level=1
    this.colores={
      0: azul,
      1: morado,
      2: naranja,
      3: verde,
    }
  }

  generarColores(){
    this.secuenciaColores=Array(LEVEL_MAXIMO).fill(0).map(n => Math.floor(Math.random()*(RANGO)-MINIMO))
  }

  siguienteNivel(){
    this.iluminar()
    this.contestaUsuario()
  }

  iluminar(){
    if (this.level<LEVEL_MAXIMO){
      for (let i = 0; i<this.level;i++){
        const color=this.colores[this.secuenciaColores[i]]
        setTimeout(()=> {
          color.classList.add('light')
          setTimeout(()=> this.apagarColor(color), 500)
        },1000*i)  
      }//for
    }else{
      alert("Haz completado el juego")
      this.generarColores()
      this.level=1
      this.siguienteNivel()
    }
  }//iluminar

  apagarColor(color){
    color.classList.remove('light')
  }

  contestaUsuario(){
    for(let i=0;i<RANGO;i++){
      this.colores[i].addEventListener('click', this.elegirColor.bind(this))
    }//for
  }

  elegirColor(ev){
    const color = Number(ev.target.dataset.numero)
    color.classList.add('light')
  }
}

function empezarJuego() {
  var juego = new Juego()
}