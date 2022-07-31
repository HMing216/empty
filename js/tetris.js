// 图标基类 
class Icon {
    status = 0; // 形态
    position = null; // 当前形态的坐标
    positionList = null; // 保存所有形态的坐标
    // 通过原点坐标，设置所有形态的坐标
    setPositionList() { }
    // 构造函数
    constructor(origin) { // 初始化icon
        this.setPositionList(origin);
        this.position = this.positionList[0]; // 初始形态是1
    }
    // 通过status设置icon的位置
    setPosition(status) {
        this.status = status;
        this.position = this.positionList[status];
    }
    // 获取原点
    getOrigin() {
        return this.position[2];
    }
    // 变形
    transform() {
        let status = this.status + 1; // 形态+1，切换到下一形态
        status = status == this.positionList.length ? 0 : status;
        let newIcon = new this.constructor(this.getOrigin());
        newIcon.setPosition(status);
        return newIcon;
    }
}
// 图标派生类
class A extends Icon {
    setPositionList({ top, left }) {
        this.positionList = [
            [
                { top: top - 1, left: left - 1 },
                { top: top - 1, left: left },
                { top: top, left: left },
                { top: top + 1, left: left },
            ],
            [
                { top: top - 1, left: left + 1 },
                { top: top, left: left + 1 },
                { top: top, left: left },
                { top: top, left: left - 1 },
            ],
            [
                { top: top + 1, left: left + 1 },
                { top: top + 1, left: left },
                { top: top, left: left },
                { top: top - 1, left: left },
            ],
            [
                { top: top + 1, left: left - 1 },
                { top: top, left: left - 1 },
                { top: top, left: left },
                { top: top, left: left + 1 },
            ]
        ]
    }
    constructor(origin) {
        super(origin);
    }
}
class B extends Icon {
    setPositionList({ top, left }) {
        this.positionList = [
            [
                { top: top, left: left + 2 },
                { top: top, left: left + 1 },
                { top: top, left: left },
                { top: top, left: left - 1 },
            ],
            [
                { top: top + 2, left: left },
                { top: top + 1, left: left },
                { top: top, left: left },
                { top: top - 1, left: left },
            ]
        ]
    }
    constructor(origin) {
        super(origin);
    }
}
class C extends Icon {
    setPositionList({ top, left }) {
        this.positionList = [
            [
                { top: top - 1, left: left + 1 },
                { top: top - 1, left: left },
                { top: top, left: left },
                { top: top + 1, left: left },
            ],
            [
                { top: top + 1, left: left + 1 },
                { top: top, left: left + 1 },
                { top: top, left: left },
                { top: top, left: left - 1 },
            ],
            [
                { top: top + 1, left: left - 1 },
                { top: top + 1, left: left },
                { top: top, left: left },
                { top: top - 1, left: left },
            ],
            [
                { top: top - 1, left: left - 1 },
                { top: top, left: left - 1 },
                { top: top, left: left },
                { top: top, left: left + 1 },
            ]
        ]
    }
    constructor(origin) {
        super(origin);
    }
}
class D extends Icon {
    setPositionList({ top, left }) {
        this.positionList = [
            [
                { top: top - 1, left: left + 1 },
                { top: top - 1, left: left },
                { top: top, left: left },
                { top: top, left: left - 1 },
            ],
            [
                { top: top + 1, left: left + 1 },
                { top: top, left: left + 1 },
                { top: top, left: left },
                { top: top - 1, left: left },
            ]
        ]
    }
    constructor(origin) {
        super(origin);
    }
}
class E extends Icon {
    setPositionList({ top, left }) {
        this.positionList = [
            [
                { top: top - 1, left: left - 1 },
                { top: top - 1, left: left },
                { top: top, left: left },
                { top: top, left: left + 1 },
            ],
            [
                { top: top - 1, left: left + 1 },
                { top: top, left: left + 1 },
                { top: top, left: left },
                { top: top + 1, left: left },
            ]
        ]
    }
    constructor(origin) {
        super(origin);
    }
}
class F extends Icon {
    setPositionList({ top, left }) {
        this.positionList = [
            [
                { top: top - 1, left: left + 1 },
                { top: top - 1, left: left },
                { top: top, left: left },
                { top: top, left: left + 1 },
            ]
        ]
    }
    constructor(origin) {
        super(origin);
    }
}

// 游戏类
class Game {
    #t = null; //计时器变量
    #_icon = null; //当前图标
    #icon_ = null; //下一次准备展示的图标
    #totalScore = 0; //总分
    #iconClassList = null; //图标集合
    #classX = null; //当前图标类
    #table = null;  //表格DOM
    #totalScoreEl = null; //显示分数的DOM
    #data = [
        [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
    ];
    constructor(table, totalScoreEl, iconClassList) {
        this.#table = table;
        this.#totalScoreEl = totalScoreEl;
        this.#iconClassList = iconClassList;
    }

    #render() { // 渲染页面
        this.#totalScoreEl.innerHTML = this.#totalScore;
        this.#table.innerHTML = '';
        this.#data.forEach(e => {
            let tr = document.createElement('tr');
            this.#table.appendChild(tr);
            e.forEach(e => {
                let td = document.createElement('td');
                tr.appendChild(td);
                if (e.state === 1) {
                    td.className = 'bgDynamic';
                } else if (e.state === 2) {
                    td.className = 'bg';
                }
            })
        })
    }
    // icon初始化
    #init() {
        let n = Math.floor(Math.random() * this.#iconClassList.length);
        this.#classX = this.#iconClassList[n];
        this.#_icon = new this.#classX({ top: 1, left: 5 });
        if (!this.#t) {
            this.#t = setInterval(() => {
                this.#down();
            }, 1000);
        }
        if (this.#checkTouch(this.#_icon)) {
            this.#over();
        }
        this.#showIcon(this.#_icon);
        this.#render();
    }
    // 将data安装icon的坐标设置状态
    #setIconstate(icon, state) {
        icon.position.forEach(e => {
            let y = e.top;
            let x = e.left;
            this.#data[y][x].state = state;
        })
    }
    #showIcon(icon) { // 将icon状态同步到数据
        this.#setIconstate(icon, 1);
    }
    // 移动和变形时，清除前一个icon的坐标
    #clearIcon(icon) {
        this.#setIconstate(icon, 0);
    }
    // icon到达底部后，改变颜色
    #setBottom(icon) {
        this.#setIconstate(icon, 2);
    }
    // 移动, to:方向
    #move(to) {
        let y, x;
        switch (to) {
            case 'left': y = 0; x = -1; break;
            case 'right': y = 0; x = 1; break;
            case 'down': y = 1; x = 0; break;
        }
        let origin = this.#_icon.getOrigin();
        let newOrigin = {
            top: origin.top + y,
            left: origin.left + x
        }
        this.#icon_ = new this.#classX(newOrigin);
        this.#icon_.setPosition(this.#_icon.status); // 同步新生成的icon状态
        if (this.#checkTouch(this.#icon_)) {
            if (to === 'down') {
                this.#nextTick();
            }
        } else {
            this.#clearIcon(this.#_icon);
            this.#_icon = this.#icon_;
            this.#showIcon(this.#_icon);
            this.#render();
        }
    }
    #left() {
        this.#move('left');
    }
    #right() {
        this.#move('right');
    }
    #down() {
        this.#move('down');
    }
    // 变形
    #transform() {
        this.#icon_ = this.#_icon.transform();
        if (!this.#checkTouch(this.#icon_)) {
            this.#clearIcon(this.#_icon);
            this.#_icon = this.#icon_;
            this.#classX = this.#_icon.constructor;
            this.#showIcon(this.#_icon);
            this.#render();
        }
    }
    // 键位
    #gameKey() {
        document.addEventListener('keydown', (event) => {
            if (event.key === 'w' || event.key === 'W' || event.key === 'ArrowUp') {
                this.#transform();
            } else if (event.key === 's' || event.key === 'S' || event.key === 'ArrowDown') {
                this.#down();
            } else if (event.key === 'a' || event.key === 'A' || event.key === 'ArrowLeft') {
                this.#left();
            } else if (event.key === 'd' || event.key === 'D' || event.key === 'ArrowRight') {
                this.#right();
            }
        })
    }
    // 检查是否触碰边界或体积碰撞
    #checkTouch(icon) {
        let flag = false;
        icon.position.forEach(v => {
            if (v.top === this.#data.length || v.left < 0 || v.left === this.#data[0].length) {
                flag = true;
            } else if (this.#data[v.top][v.left] && this.#data[v.top][v.left].state === 2) {
                flag = true;
            }
        })
        return flag;
    }
    // 当前icon落地，生成下一个icon
    #nextTick() {
        this.#setBottom(this.#_icon);
        this.#score();
        this.#init();
    }
    // 消除与得分
    #score() {
        for (let i = 0; i < this.#data.length; i++) {
            for (let j = 0; j < this.#data[i].length; j++) {
                if (this.#data[i][j].state !== 2) {
                    break;
                }
                if (j === this.#data[i].length - 1) {
                    this.#data.splice(i, 1);
                    this.#data.unshift([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]);
                    this.#totalScore++;
                }
            }
        }
    }
    // 结束
    #over() {
        alert('得分:' + this.#totalScore);
        clearInterval(this.#t);
        this.#t = null;
        this.#totalScore = 0;
        this.#data = [
            [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
            [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
            [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
            [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
            [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
            [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
            [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
            [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
            [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
            [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
            [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
            [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
            [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
            [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
        ];
        this.#init();
    }
    // 开始
    start() {
        this.#init();
        this.#gameKey();
    }
}

// 用户代码
let table = document.querySelector('table');
let totalScoreEl = document.querySelector('#totalScore');
let game = new Game(table, totalScoreEl, [A, B, C, D, E, F]);
let gameFlag = true;
document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && gameFlag) {
        gameFlag = false;
        game.start(); // 开始
        document.querySelector('#mask').className = 'hidden';
    }
})