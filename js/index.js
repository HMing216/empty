const carousel = document.querySelector('#carousel');
const imgList = document.querySelector('#imgList');
const circleList = document.querySelector('#circleList');
const next = carousel.getElementsByClassName('next')[0];
const prev = carousel.getElementsByClassName('prev')[0];
const carouselWidth = carousel.offsetWidth; // 轮播图容器宽度
let flag = true; // 节流阀
let n = 0; // 计数器
let timer = null; // 定时器
// 生成小圆点
for (let i = 0; i < imgList.children.length; i++) {
    let circle = document.createElement('li');
    circle.setAttribute('date-index', i)
    circle.innerHTML = i + 1;
    circle.classList.add('circle');
    circleList.appendChild(circle);
    // 小圆点点击事件
    circle.onclick = function () {
        let index = this.getAttribute('date-index');
        animate(imgList, -index * carouselWidth);
        circleChange(index);
        n = index;
    }
}
circleList.children[0].classList.add('active');
// 无缝滚动 克隆第一张图片到最后 视觉欺骗
imgList.appendChild(imgList.children[0].cloneNode(true));
// next按钮
next.addEventListener("click", function () {
    clickButton(next);
});
// prev按钮
prev.addEventListener("click", function () {
    clickButton(prev);
});
// 小圆点变化
function circleChange(n) {
    for (let i = 0; i < circleList.children.length; i++) {
        circleList.children[i].classList.remove('active');
    }
    if (n === imgList.children.length - 1) {
        n = 0;
    }
    circleList.children[n].classList.add('active');
}
// 按钮逻辑
function clickButton(obj) {
    if (flag) {
        flag = false;
        if (n === 0 && obj === prev) {
            n = imgList.children.length - 1;
            imgList.style.left = `-${n * carouselWidth}px`;
        } else if (n === imgList.children.length - 1 && obj === next) {
            n = 0;
            imgList.style.left = `-${n * carouselWidth}px`;
        }
        obj === next ? n++ : n--;
        animate(imgList, -n * carouselWidth, () => {
            flag = true;
        });
        circleChange(n);
    }
}
// 自动调用点击事件
timer = setInterval(function () {
    next.click();
}, 1500)
// carousel鼠标事件
carousel.onmouseover = () => {
    clearInterval(timer);
    timer = null;
}
carousel.onmouseout = () => {
    timer = setInterval(function () {
        next.click();
    }, 1500);
}
// 动画函数:调用目标 目标值 【回调函数】
function animate(obj, target, callback) {
    clearInterval(obj.timer); // 清除定时器 避免同时启动多个定时器
    obj.timer = setInterval(function () {
        // 缓动动画 (目标值 - 当前位置) / 步长
        let step = (target - obj.offsetLeft) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step); // 数值取整
        if (obj.offsetLeft === target) {
            clearInterval(obj.timer);
            callback && callback();
        } else {
            obj.style.left = `${obj.offsetLeft + step}px`;
        }
    }, 15);
}