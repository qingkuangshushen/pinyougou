//添加load事件，全部执行过后，执行此js文件
window.addEventListener('load', function () {
    //获取事件源
    var lun = document.querySelector('#ab');
    var prev = document.querySelector('.yuanjiaol');
    var next = document.querySelector('.yuanjiaor');
    var tuoyuan = document.querySelector('.tuoyuan');
    var ul = document.querySelector('#aa');
    var img_width = lun.offsetWidth;
    //添加鼠标经过/移除事件，两边三角显示与隐藏
    lun.addEventListener('mouseover', function () {
        prev.style.display = 'block';
        next.style.display = 'block';
        clearInterval(daw);//清除定时器，停止自动轮播
        daw = null;//清楚定时器变量
    })
    lun.addEventListener('mouseout', function () {
        prev.style.display = 'none';
        next.style.display = 'none';
        daw = setInterval(function () {
            next.click();
        }, 2000);//继续轮播
    })
    //根据图片个数添加小圆点
    for (var i = 0; i < ul.children.length; i++) {
        //动态生成li
        var lis = document.createElement('li');
        //添加自定义属性
        lis.setAttribute('data-index', i);
        //插入点中
        tuoyuan.appendChild(lis);
        tuoyuan.children[0].className = 'current';
        //给小圆点添加点击事件
        lis.addEventListener('click', function () {//排他思想
            for (var i = 0; i < tuoyuan.children.length; i++) {
                tuoyuan.children[i].className = '';
            }
            this.className = 'current';
            //获取自定义属性值
            var tt = this.getAttribute('data-index');
            sd = df = tt;//解决小点和三角不匹配的bug
            //调用封装的动画函数
            animate(ul, -tt * img_width);
        })
    }
    //右侧三角点击事件
    var kk = ul.children[0].cloneNode(true);
    ul.appendChild(kk);
    var df = 0;//右侧三角
    var sd = 0;//小圆点
    var flag = true;//节流阀变量
    next.addEventListener('click', function () {
        if (flag) {
            flag = false;
            if (df == ul.children.length - 1) {//到最后一张图
                ul.style.left = 0;//直接回到最初位置
                df = 0;//重新赋值为0
            }

            df++
            animate(ul, -df * img_width, function () {
                flag = true;
            });//ul位移

            //小点跟点击箭头走
            sd++;
            if (sd == tuoyuan.children.length) {//点击次数不能超过tuoyuan最大长度
                sd = 0;
            }
            for (var i = 0; i < tuoyuan.children.length; i++) {//排他思想
                tuoyuan.children[i].className = '';
            }
            tuoyuan.children[sd].className = 'current';
        }
    })
    //左边三角设置
    prev.addEventListener('click', function () {
        if (flag) {
            flag = false;
            if (df == 0) {
                df = ul.children.length - 1;
                ul.style.left = -df * img_width + 'px';
            }


            df--
            animate(ul, -df * img_width, function () {
                flag = true;
            });//ul位移

            //小点跟点击箭头走
            sd--;
            if (sd < 0) {
                sd = tuoyuan.children.length - 1;
            }
            for (var i = 0; i < tuoyuan.children.length; i++) {
                tuoyuan.children[i].className = '';
            }
            tuoyuan.children[sd].className = 'current';
        }
    })

    //自动轮播
    var daw = this.setInterval(function () {//事件
        next.click();//手动调用事件
    }, 2000);


})