const btn = document.querySelector(".btn");
const svg = document.querySelectorAll(".svg");
console.log(svg);
btn.addEventListener('click', () => {
    svg.forEach(item => {
        item.classList.toggle('active')
        console.log(item)
    })
})