// 获取系统时间
const timeContainer = document.querySelector('footer .time');
timeContainer.innerHTML = new Date().toLocaleString();
setInterval(() => {
    timeContainer.innerHTML = new Date().toLocaleString();
}, 1000)