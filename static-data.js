/**
 * 存放静态数据和方法，获取目标元素
 */
// 获取snake和food
const snake = document.getElementById("snake");
const snake_body = snake.getElementsByTagName("div");
const food = document.getElementById("food");
// 获取mask
const mask = document.getElementsByClassName("mask")[0];
// 获取连击显示框
const combo_msg = document.getElementsByClassName("combo-msg")[0];
// 获取body
const body = document.getElementsByTagName("body")[0];
// 获取分数和等级
const game_score = document.getElementsByClassName("game-msg")[0].firstElementChild;
const game_level = document.getElementsByClassName("game-msg")[0].lastElementChild;
// 获取游戏机和控制按钮
const game = document.getElementsByClassName("container")[0];

const up = document.getElementById("up");
const left = document.getElementById("left");
const down = document.getElementById("down");
const right = document.getElementById("right");
const enter = document.getElementById("enter");
// 创建一个对象，映射与实际方向相反的方向，用于禁止snake的调头
const dir_op = {
    w: "down",
    a: "right",
    s: "up",
    d: "left"
}
// 创建一个对象，映射键盘的输入信息
const key_events = {
    w: "up",
    a: "left",
    s: "down",
    d: "right",
    Shift: "enter"
}
// 记录分数和等级
let score = 0;
let level = 1;
// 记录snake的方向
let dir;
// 记录移动间距
let speed_gap = 10;
// 记录速度
let speed = 300 - (level*10);
// 记录原始速度
let ori_speed = speed;
// 设置一个标志位，用于判断是否按键是否重复连续点击
let no_repeat_flag = true;
// 加速判断标志位
let speed_flag = false;
// 记录连击
let combo = 0;
// 记录游戏是否失败
let fail_flag = false;

// 监听键盘输入
function handle_key(event){
    if(no_repeat_flag 
        && Object.keys(key_events).includes(event.key)
        && dir !== dir_op[event.key]
        && fail_flag !== false){
            event.key == "Shift" ? speed_flag = true: dir = key_events[event.key];no_repeat_flag = false;
        } 
}
// 生成随机食物坐标并改变食物的位置
function generater_food(){
    let food_x = Math.floor(Math.random()*48)*10;
    let food_y = Math.floor(Math.random()*28)*10;
    food.style.left = food_x + "px";
    food.style.top = food_y + "px";
}
// 显示失败消息
function show_fail_msg(){
    mask.textContent = "-GAME OVER-";
    mask.style.display = "block";
}
// 发生抖动
function shake(elem){
    elem.classList.add("shake");
    setTimeout(()=>{
        elem.classList.remove("shake");
    }, 800)
}
// 吃到食物后变色
function eat(elem){
    elem.classList.add("eat");
    setTimeout(()=>{
        elem.classList.remove("eat");
    }, 800)
}
// 连击效果
function combo_eat(elem){
    elem.style.display = "block";
    // 添加连击动画
    elem.classList.add("combo");
    setTimeout(()=>{
        elem.classList.remove("combo");
    }, 800)
    // 连击提示
    elem.textContent = combo;
}  
// 多次连击效果
function muti_combo(elem){
    elem.classList.add("prefect-combo");
    setTimeout(()=>{
        elem.classList.remove("prefect-combo");
    }, 800)
}    
// 检查失败条件
function check_fail(x, y){
    // 1 检查snake是否撞墙
    if(x < 0 || x > 490
        || y < 0 || y > 290){
            show_fail_msg();
            fail_flag = true;
            return;
        }
    // 2 检查snake是否碰到自己的body(判断蛇头是否与除蛇尾以外的div坐标重叠)
    for(let i = 1; i < snake_body.length-1; ++i){
        if(x == snake_body[i].offsetLeft
            && y == snake_body[i].offsetTop){
                show_fail_msg();
                fail_flag = true;
                return;
            }
    }
}
