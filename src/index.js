import './styles/screen.scss'

const drawingSurface = document.querySelector('#draw')
const ctx = drawingSurface.getContext('2d')

drawingSurface.width = window.innerWidth
drawingSurface.height = window.innerHeight
ctx.strokeStyle = ''
ctx.lineJoin = 'round'
ctx.lineCap = 'round'
ctx.lineWidth = 10
// .globalCompositeOperation are basically blend modes like in Photoshop.

let isDrawing = false
let lastX = 0
let lastY = 0
let hue = 0
let direction = true
let globalComp = ctx.globalCompositeOperation

function draw (e) {
  if (!isDrawing) return
  /* stop the function from running when they are not moused down */
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`
  ctx.beginPath()
  // start from
  ctx.moveTo(lastX, lastY)
  // go to
  ctx.lineTo(e.offsetX, e.offsetY)
  ctx.stroke();
  [ lastX, lastY ] = [e.offsetX, e.offsetY]

  /*
  ^ same as V
  lastX = e.offsetX
  lastY = e.offsetY
  */

  hue++

  if (hue >= 360) {
    hue = 0
  }

  if (ctx.lineWidth >= 180 || ctx.lineWidth <= 1) {
    direction = !direction
  }

  if (direction) {
    ctx.lineWidth++
  } else {
    ctx.lineWidth--
  }
}

function changeGlobalComp (e) {
  ctx.globalCompositeOperation = e.target.id
  console.log(ctx.globalCompositeOperation)
}

drawingSurface.addEventListener('mousedown', (e) => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY]
})

drawingSurface.addEventListener('mousemove', draw)
drawingSurface.addEventListener('mouseup', () => { isDrawing = false })
drawingSurface.addEventListener('mouseout', () => { isDrawing = false })

const sourceOver = document.getElementById('source-over')
sourceOver.addEventListener('click', changeGlobalComp)

const destinationOver = document.getElementById('destination-over')
destinationOver.addEventListener('click', changeGlobalComp)

const multiply = document.getElementById('multiply')
multiply.addEventListener('click', changeGlobalComp)

const lighter = document.getElementById('lighter')
lighter.addEventListener('click', changeGlobalComp)

const destinationAtop = document.getElementById('destination-atop')
destinationAtop.addEventListener('click', changeGlobalComp)

const main = () => {
  document.querySelector('h1').textContent += ''
}

document.addEventListener('DOMContentLoaded', main)

// HERE BE DRAGONS... and webpack. Don't touch.
if (process.env.NODE_ENV !== 'production') require('./index.html')
if (module.hot) {
  module.hot.dispose(() => window.location.reload())
  module.hot.accept(err => console.error(err))
}
