
import example from './img/tx.png'

console.log(example);
class Game {
    name = 'Violin Charades'
}


const myGame = new Game()
// 创建 p 节点
const p = document.createElement('p')
p.textContent = `I like ${myGame.name}.`

const heading = document.createElement('h1')
heading.textContent = 'Interesting!'

const img = document.createElement('img')
img.src = example;
const app = document.querySelector('#root')
app.append(heading, p,img)