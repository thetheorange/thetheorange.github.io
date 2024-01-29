/**
 * 实现snake的移动，失败条件、加速条件、食物碰撞的检测
 */
setTimeout(function snake_move(){
    no_repeat_flag = true;
    // 获取snake的头和其偏移位置
    let snake_head = snake_body[0];
    let x = snake_head.offsetLeft;
    let y = snake_head.offsetTop;
    // 标记snake的头
    snake_head.style.backgroundColor = "black";

    // 检查失败条件
    // 1 检查snake是否撞墙
    if(x < 0 || x > 490
        || y < 0 || y > 290){
            show_fail_msg();
            return;
        }
    // 2 检查snake是否碰到自己的body(判断蛇头是否与除蛇尾以外的div坐标重叠)
    for(let i = 1; i < snake_body.length-1; ++i){
        if(x == snake_body[i].offsetLeft
            && y == snake_body[i].offsetTop){
                show_fail_msg();
                return;
            }
    }


    // 检测关卡难度
    if(level < 22){
        level = Math.floor(score/10);
        game_level.textContent = level;
        speed = 300 - (level*10);
        ori_speed = speed;
    }else if(level == 22){
        game_level.textContent = "FINAL!";
    }   
    // 检测是否加速
    if(speed_flag){
        // 设置加速的范围
        speed < ori_speed/1.5 ? speed = speed: speed-=(Math.floor(speed/2));
        // 修改snake样式
        snake_head.style.backgroundColor = "#0E2A78";
        snake_head.style.opacity = 0.8;
    }else{
        speed = ori_speed;
        // 恢复snake样式
        snake_head.style.backgroundColor = "black";
        snake_head.style.opacity = 1;
    }
    // 检测snake的移动方向
    switch(dir){
        case "up":
            y-=speed_gap;
            break;
        case "left":
            x-=speed_gap;
            break;
        case "down":
            y+=speed_gap;
            break;
        case "right":
            x+=speed_gap;
            break;
        case "pause":
            x = x;
            y = y;
    }
    // 检测是否碰撞食物
    if(x == food.offsetLeft
        && y == food.offsetTop
        && dir !== "pause"){
            // 食物的坐标发生改变
            generater_food();
            // 判断是否为完美吃掉食物
            if (speed_flag){
                score+=10;
                combo++;
                shake(game_score)
                // 背景变色
                eat(body); 
                // 加入连击
                if(combo < 10 && combo > 1){
                    combo_eat(combo_msg);
                }else if(combo >= 10){
                    muti_combo(combo_msg);
                }
            }else{
                combo = 0;
                combo_msg.style.display = "none"
                score+=5;
            }
            game_score.textContent = score;
            // 添加蛇的body
            snake.insertAdjacentHTML("beforeend", "<div></div>");
            // 发生抖动
            shake(game);
        }
    // 移动snake的body(本质上是移动蛇的尾巴)
    // 先判断是否为暂停
    if(dir !== "pause"){
        // 获取snake的尾巴并将其移动
        let snake_tail = snake_body[snake_body.length-1];
        snake_tail.style.left = x + "px";
        snake_tail.style.top = y + "px";
        // 修改蛇尾在实际document中的位置
        snake.insertAdjacentElement("afterbegin", snake_tail);
    }
    setTimeout(snake_move, speed);
}, speed);