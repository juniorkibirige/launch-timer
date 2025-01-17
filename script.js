const containers = document.querySelectorAll('.container-sub')

const days = document.querySelector('.days')
const hours = document.querySelector('.hours')
const minutes = document.querySelector('.minutes')
const seconds = document.querySelector('.seconds')

let check = []
var countDownDate = new Date("Jul 30, 2024 15:37:25").getTime();

function countDown() {
    // Get today's date and time
    var now = new Date().getTime();
    var distance = countDownDate - now;
    const times = [{}, {}, {}, {}]
    let s1 = Math.floor((distance % (1000 * 60)) / 1000);
    times[3].front = s1
    times[3].back = (s1 === 0 ? 59 : s1 - 1)

    let m1 = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    times[2].front = m1
    times[2].back = (m1 === 0 ? 59 : m1 - 1)

    let h1 = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    times[1].front = h1
    times[1].back = (h1 === 0 ? 23 : h1 - 1)

    let d1 = Math.floor(distance / (1000 * 60 * 60 * 24));
    times[0].front = d1
    times[0].back = (d1 === 0 ? 0 : d1 - 1)

    let i = 0
    containers.forEach(container => {
        const clock = container.querySelector('.clock')

        const front = container.querySelector('.front')
        const back = container.querySelector('.back')

        const frontTime = (times[i].front < 10 ? '0' + times[i].front : times[i].front)
        const backTime = (times[i].back < 10 ? '0' + times[i].back : times[i].back)

        clock.dataset.before = frontTime
        clock.dataset.after = backTime
        front.textContent = frontTime
        back.textContent = backTime
        
        container.addEventListener('animationend', () => {
            container.classList.remove('flip')
            front.textContent = back.textContent
            clock.dataset.before = clock.dataset.after
        }, { once: true })

        i++
    })

    seconds.parentElement.classList.add('flip')

    if (seconds.dataset.before == '00') {
        minutes.parentElement.classList.add('flip')
    } 
    if (seconds.dataset.before == '00' && minutes.dataset.before == '00') {
        hours.parentElement.classList.add('flip')
    }
    if (seconds.dataset.before == '00' && minutes.dataset.before == '00' && hours.dataset.before == '00') {
        days.parentElement.classList.add('flip')
    }
}

countDown()

setInterval(countDown, 1000)