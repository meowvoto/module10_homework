const btn = document.querySelector(".btn");
btn.addEventListener("click", () => {
    let width = window.innerWidth;
    let height = window.innerHeight;
    alert(`ширина экрана - ${width}px, высота экрана - ${height}px`)
})
