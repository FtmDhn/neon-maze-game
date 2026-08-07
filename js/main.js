const maze = document.querySelector('.maze-container')
const walls = document.querySelectorAll('.maze-container>.wall')
const ball = document.querySelector('.maze-container>.ball')
const win = document.querySelector('.win')
const wallArr = []
let leftPos = topPos = 0
const step = 5
const heart = document.querySelectorAll('.lives>span')
const lose = document.querySelector('.lose')
const winLeft = win.computedStyleMap().get('left').value
const winTop = win.computedStyleMap().get('top').value
const resultModal = document.querySelector('#resultModal')
const resultIcon = document.querySelector('.result-icon')
const resultTitle = document.querySelector('.result-title')
const resultText = document.querySelector('.result-text')
const loseSound = document.getElementById('loseSound')
const winSound = document.getElementById('winSound')
const heartLose = document.getElementById('heartLose')

// console.log(winLeft);
// console.log(winTop);



walls.forEach((val, i) => {
    let wallLeft = val.computedStyleMap().get('left').value
    let wallTop = val.computedStyleMap().get('top').value
    let wallWidth = val.computedStyleMap().get('width').value
    let wallHeight = val.computedStyleMap().get('height').value
    wallArr.push({
        id: i + 1,
        left: wallLeft,
        top: wallTop,
        right: wallLeft + wallWidth,
        bottom: wallTop + wallHeight
    })
})
// console.log(wallArr);

let nextLeft
let nextTop

window.addEventListener('keydown', (e) => {
    let myCode = e.keyCode

    switch (myCode) {
        case 39:  //rightArrow
            if (leftPos < 385) {
                nextLeft = leftPos + step
                if (check(nextLeft, topPos)) {
                    console.log('hitRight');

                }
                else {
                    leftPos = nextLeft
                    ball.style.left = leftPos + 'px'
                }
            }
            break

        case 37: //leftArrow
            if (leftPos > 5) {
                nextLeft = leftPos - step
                if (check(nextLeft, topPos)) {
                    console.log('hitLeft');
                }
                else {
                    leftPos = nextLeft
                    ball.style.left = leftPos + 'px'
                }
            }
            break

        case 38: //upArrow
            if (topPos > 5) {
                nextTop = topPos - step
                if (check(leftPos, nextTop)) {
                    console.log('hitTop');
                }
                else {
                    topPos = nextTop
                    ball.style.top = topPos + 'px'
                }
            }
            break

        case 40: //downArrow
            let temp = ball.computedStyleMap().get('left').value

            if (topPos < 358) {
                nextTop = topPos + step
                if (check(leftPos, nextTop)) {
                    console.log('hitBottom');
                }
                else {
                    topPos = nextTop
                    ball.style.top = topPos + 'px'
                }
            }
            else if (temp > 340 && temp < 360 && topPos < 390) {
                topPos = topPos + step
                ball.style.top = topPos + 'px'
                if (topPos == 390) {
                    // alert('you win!!')
                    showResult(true)
                    winSound.play()
                }

            }
            break
    }
})

let flag = 0
function check(myLeft, myTop) {
    let hit = false

    const ballObj = {
        top: myTop,
        left: myLeft,
        right: myLeft + 15,
        bottom: myTop + 15
    }

    wallArr.forEach((val) => {
        if (
            ballObj.left < val.right &&
            ballObj.right > val.left &&
            ballObj.top < val.bottom &&
            ballObj.bottom > val.top
        ) {
            console.log(val.id);
            hit = true
            heart[flag].innerHTML = '<svg style="fill: #ff3159; filter: drop-shadow(0 0 5px #ff3159);" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.3.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M442.9 144C415.6 144 389.9 157.1 373.9 179.2L339.5 226.8C335 233 327.8 236.7 320.1 236.7C312.4 236.7 305.2 233 300.7 226.8L266.3 179.2C250.3 157.1 224.6 144 197.3 144C150.3 144 112.2 182.1 112.2 229.1C112.2 279 144.2 327.5 180.3 371.4C221.4 421.4 271.7 465.4 306.2 491.7C309.4 494.1 314.1 495.9 320.2 495.9C326.3 495.9 331 494.1 334.2 491.7C368.7 465.4 419 421.3 460.1 371.4C496.3 327.5 528.2 279 528.2 229.1C528.2 182.1 490.1 144 443.1 144zM335 151.1C360 116.5 400.2 96 442.9 96C516.4 96 576 155.6 576 229.1C576 297.7 533.1 358 496.9 401.9C452.8 455.5 399.6 502 363.1 529.8C350.8 539.2 335.6 543.9 320 543.9C304.4 543.9 289.2 539.2 276.9 529.8C240.4 502 187.2 455.5 143.1 402C106.9 358.1 64 297.7 64 229.1C64 155.6 123.6 96 197.1 96C239.8 96 280 116.5 305 151.1L320 171.8L335 151.1z"/></svg>'
            heartLose.play()
            flag++

        }
    })

    if (flag == 3) {
        setTimeout(() => {
            // alert('you losed!!!')
            showResult(false)
            // playLoseSound()
            loseSound.play()
            return
        }, 400);
    }
    return hit
}
// function playLoseSound() {
//     loseSound.currentTime = 0;
//     loseSound.play().catch(() => {});
// }
function showResult(win) {
    resultModal.style.display = 'flex'

    if (win == true) {
        // Win
        resultModal.classList.remove("hidden");
        resultModal.classList.add("flex");
        resultIcon.className = "mx-auto mb-[18px] flex h-[82px] w-[82px] items-center justify-center rounded-full bg-[#00f2ff] text-[42px] shadow-[0_0_25px_#00f2ff,0_0_60px_rgba(0,242,255,0.65)]";
        resultTitle.className = "font-[Arial,sans-serif] text-[42px] font-extrabold tracking-[2px] text-[#00f2ff]";
        resultIcon.innerHTML = '<svg style="fill: white; width:50%;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.3.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M208.3 64L432.3 64C458.8 64 480.4 85.8 479.4 112.2C479.2 117.5 479 122.8 478.7 128L528.3 128C554.4 128 577.4 149.6 575.4 177.8C567.9 281.5 514.9 338.5 457.4 368.3C441.6 376.5 425.5 382.6 410.2 387.1C390 415.7 369 430.8 352.3 438.9L352.3 512L416.3 512C434 512 448.3 526.3 448.3 544C448.3 561.7 434 576 416.3 576L224.3 576C206.6 576 192.3 561.7 192.3 544C192.3 526.3 206.6 512 224.3 512L288.3 512L288.3 438.9C272.3 431.2 252.4 416.9 233 390.6C214.6 385.8 194.6 378.5 175.1 367.5C121 337.2 72.2 280.1 65.2 177.6C63.3 149.5 86.2 127.9 112.3 127.9L161.9 127.9C161.6 122.7 161.4 117.5 161.2 112.1C160.2 85.6 181.8 63.9 208.3 63.9zM165.5 176L113.1 176C119.3 260.7 158.2 303.1 198.3 325.6C183.9 288.3 172 239.6 165.5 176zM444 320.8C484.5 297 521.1 254.7 527.3 176L475 176C468.8 236.9 457.6 284.2 444 320.8z"/></svg>'
        resultTitle.innerHTML = 'YOU WIN!'
        resultText.innerHTML = 'You escaped the maze !'
    } else {
        //lose
        resultIcon.className = "mx-auto mb-[18px] flex h-[82px] w-[82px] items-center justify-center rounded-full bg-[#ff3159] text-[42px] shadow-[0_0_25px_#ff3159,0_0_60px_rgba(255,49,89,0.6)]";
        resultTitle.className = "font-[Arial,sans-serif] text-[42px] font-extrabold tracking-[2px] text-[#ff3159]";
        resultIcon.innerHTML = '<svg style="fill: white; width:50%;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.3.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M197.1 96C214.4 96 231.3 99.4 247 105.7L301.8 190.9L226.4 266.3C224.9 267.8 224 269.9 224.1 272.1C224.2 274.3 225.1 276.3 226.7 277.8L338.7 381.8C341.6 384.5 346.1 384.7 349.2 382.1C352.3 379.5 353 375.1 350.9 371.7L290.5 273.6L381.2 198C383.8 195.9 384.7 192.3 383.6 189.2L360.4 124.6C383.6 106.3 412.6 96 442.9 96C516.4 96 576 155.6 576 229.1L576 231.7C576 343.9 436.1 474.2 363.1 529.9C350.7 539.3 335.5 544 320 544C304.5 544 289.2 539.4 276.9 529.9C203.9 474.2 64 343.9 64 231.7L64 229.1C64 155.6 123.6 96 197.1 96z"/></svg>'
        resultTitle.innerHTML = 'GAME OVER!'
        resultText.innerHTML = 'All your hearts are gone! try again'
    }
}