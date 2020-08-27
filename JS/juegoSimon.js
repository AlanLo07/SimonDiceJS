const azul = document.getElementById('azul')
const morado = document.getElementById('morado')
const naranja = document.getElementById('naranja')
const verde = document.getElementById('verde')
const btnEmpezar = document.getElementById('btnEmpezar')
const ULTIMO_NIVEL = 10
const score = document.getElementById('score')
const player = document.getElementById('player')
class Juego {
  constructor() {
    this.player=""
    this.inicializar = this.inicializar.bind(this)
    this.generarSecuencia = this.generarSecuencia.bind(this)
    swal("Escribe tu nombre:", {
      content: "input",
    })
    .then((value) => {
      this.player=value
      this.inicializar()
      this.generarSecuencia()
      setTimeout(this.siguienteNivel, 500)
    });
  }

  inicializar() {
    player.innerHTML=`Jugador: ${this.player}`
    this.siguienteNivel = this.siguienteNivel.bind(this)
    this.elegirColor = this.elegirColor.bind(this)
    this.toggleBtnEmpezar()
    this.nivel = 1
    this.colores = {
      azul,
      morado,
      naranja,
      verde
    }
  }

  toggleBtnEmpezar() {
    if (btnEmpezar.classList.contains('hide')) {
      btnEmpezar.classList.remove('hide')
    } else {
      btnEmpezar.classList.add('hide')
    }
  }

  generarSecuencia() {
    this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n => Math.floor(Math.random() * 4))
  }

  siguienteNivel() {
    score.innerHTML=`Nivel: ${this.nivel}`
    this.subnivel = 0
    this.iluminarSecuencia()
    this.agregarEventosClick()
  }

  transformarNumeroAColor(numero) {
    switch (numero) {
      case 0:
        return 'azul'
      case 1:
        return 'morado'
      case 2:
        return 'naranja'
      case 3:
        return 'verde'
    }
  }

  transformarColorANumero(color) {
    switch (color) {
      case 'azul':
        return 0
      case 'morado':
        return 1
      case 'naranja':
        return 2
      case 'verde':
        return 3
    }
  }

  iluminarSecuencia() {
    for (let i = 0; i < this.nivel; i++) {
      const color = this.transformarNumeroAColor(this.secuencia[i])
      setTimeout(() => this.iluminarColor(color), 1000 * i)
    }
  }

  iluminarColor(color) {
    this.colores[color].classList.add('light')
    setTimeout(() => this.apagarColor(color), 350)
  }

  apagarColor(color) {
    this.colores[color].classList.remove('light')
  }

  agregarEventosClick() {
    this.colores.azul.addEventListener('click', this.elegirColor)
    this.colores.verde.addEventListener('click', this.elegirColor)
    this.colores.morado.addEventListener('click', this.elegirColor)
    this.colores.naranja.addEventListener('click', this.elegirColor)
  }

  eliminarEventosClick() {
    this.colores.azul.removeEventListener('click', this.elegirColor)
    this.colores.verde.removeEventListener('click', this.elegirColor)
    this.colores.morado.removeEventListener('click', this.elegirColor)
    this.colores.naranja.removeEventListener('click', this.elegirColor)
  }

  elegirColor(ev) {
    const nombreColor = ev.target.dataset.color
    const numeroColor = this.transformarColorANumero(nombreColor)
    this.iluminarColor(nombreColor)
    if (numeroColor === this.secuencia[this.subnivel]) {
      this.subnivel++
      if (this.subnivel === this.nivel) {
        this.nivel++
        this.eliminarEventosClick()
        if (this.nivel === (ULTIMO_NIVEL + 1)) {
          this.ganoElJuego()
        } else {
          setTimeout(this.siguienteNivel, 1500)
        }
      }
    } else {
      this.perdioElJuego()
    }
  }

  ganoElJuego() {
    swal('Felicitaciones', 'Ganaste el juego!', 'success')
      .then(this.inicializar)
  }

  perdioElJuego() {
    swal('Perdiste', 'Lo lamento, has perdido :(', 'error')
      .then(() => {
        this.eliminarEventosClick()
        this.inicializar()
      })
  }

}

function empezarJuego() {
  window.juego = new Juego()
}
