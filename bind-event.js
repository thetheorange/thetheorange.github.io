/**
 * 绑定控制按钮和键盘输入事件
 */
// 须一一绑定，通过事件的冒泡绑定，会出现部分按键失灵
up.addEventListener("click", ()=>{
    if(dir !== dir_op.w &&
        no_repeat_flag){
        dir = "up";
        no_repeat_flag = false;
    }
})
left.addEventListener("click", ()=>{
    if(dir !== dir_op.a &&
        no_repeat_flag){
        dir = "left";
        no_repeat_flag = false;
    }
})
down.addEventListener("click", ()=>{
    if(dir !== dir_op.s &&
        no_repeat_flag){
        dir = "down";
        no_repeat_flag = false;
    }
})
right.addEventListener("click", ()=>{
    if(dir !== dir_op.d &&
        no_repeat_flag){
        dir = "right";
        no_repeat_flag = false;
    }
})
enter.addEventListener("mousedown", ()=>{
    speed_flag = true;
})
enter.addEventListener("mouseup", ()=>{
    speed_flag = false;
})
// 为游戏机绑定鼠标移开事件，呈现暂停效果
game.addEventListener("mouseleave", ()=>{
    dir = "pause";
    // 移去键盘输入事件
    document.removeEventListener("keydown", handle_key);
})
game.addEventListener("mouseenter", ()=>{
    // 绑定键盘输入事件
    document.addEventListener("keydown", handle_key);
})
// 绑定键盘松开事件，呈现加速暂停效果
document.addEventListener("keyup", (event)=>{
    speed_flag = false;
})