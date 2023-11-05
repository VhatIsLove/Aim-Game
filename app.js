const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const timeElement = document.querySelector('#time');
const board = document.querySelector('#board');
const colors = ['#95F23C', '#70E500', '#FFE140', '#A68C00', '#FF5F00', '#A63E00', '#9E0016', '#F97083', '#C30083', '#7F0055', '#3216B0', '#644AD8', '#3D9AD1', '#245A7A', '#F5FF00', '#A65400', '	#FF405E', '#FF00F4', '#0E00FF', '#00E0FF']
let time = 0;
let score = 0;

startBtn.addEventListener('click', (event) => {
  event.preventDefault()
  screens[0].classList.add('up')
})

timeList.addEventListener('click', (event) =>{
  if(event.target.classList.contains('time-btn')){
    time = parseInt(event.target.getAttribute('data-time'))
    screens[1].classList.add('up')
    startGame()
  }
})

board.addEventListener('click', (event) => {
  if(event.target.classList.contains('circle')){
    score++
    event.target.remove()
    randomCircle()
  }
})

function startGame(){
  setInterval(decTime, 1000)
  randomCircle()
  setTime(time)
}

function decTime(){
  if(time === 0){
    finishGame()
  } else{
    let current = --time
  if(current < 10){
    current = `0${current}`
  }
  setTime(current)
  }
}

function setTime(value){
  timeElement.innerHTML = `00:${value}`
}

function finishGame(){
  timeElement.parentNode.remove()
  board.innerHTML = `<h1>Счет: <span class="prim">${score}</span><h1>`
}

function randomCircle(){
  const circle = document.createElement('div')
  const color = randomColor()
  const size = randomNumber(5, 55)
  const {width, height} = board.getBoundingClientRect()
  const x = randomNumber(0, width - size)
  const y = randomNumber(0, height - size)
  
  circle.classList.add('circle')
  circle.style.width = `${size}px`
  circle.style.height = `${size}px`
  circle.style.top = `${y}px`
  circle.style.left = `${x}px`
  circle.style.backgroundColor = color
  circle.style.boxShadow = `0 0 15px ${color}`
  
  board.append(circle)
}

function randomNumber(min, max){
  return Math.round(Math.random() * (max - min) + min)
}

function randomColor(){
  const index = Math.floor(Math.random() * colors.length)
  return colors[index]
}