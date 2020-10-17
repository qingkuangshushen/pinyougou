window.addEventListener('load', function () {
    //获取事件源
    var xiaotu = document.querySelector('.bottom');
    var datu = document.querySelector('#six');
    var jing = document.querySelector('#three');
    var imgg = document.querySelector('#seven');
    var you = document.querySelector('#eight');

    //添加鼠标移动入小图后事件
    xiaotu.addEventListener('mouseover', fn)
    function fn() {
        jing.style.display = 'block';//小方框显示
        datu.style.display = 'block';//大图显示
        you.style.display = 'none';


        xiaotu.addEventListener('mousemove', fm)//获取坐标
        function fm(e) {

            //获取鼠标坐标
            var x = e.pageX - this.offsetLeft;
            var y = e.pageY - this.offsetTop;

            //获取小框的坐标
            var xx = x - jing.offsetWidth / 2;
            var yy = y - jing.offsetHeight / 2;

            //小框最大坐标
            var maxx = xiaotu.offsetWidth - jing.offsetWidth;
            var maxy = xiaotu.offsetHeight - jing.offsetHeight;


            if (xx < 0) {//判断鼠标位置
                xx = 0;
            } else if (xx >= maxx) {
                xx = maxx;

            }
            if (yy <= 0) {//判断鼠标位置
                yy = 0;
            } else if (yy >= maxy) {
                yy = maxy;

            }

            jing.style.left = xx + 'px';
            jing.style.top = yy + 'px';

            // 3. 大图片的移动距离 = 遮挡层移动距离 * 大图片最大移动距离 / 遮挡层的最大移动距离

            // 大图片最大移动距离
            var bigMax = imgg.offsetWidth - datu.offsetWidth;
            // 大图片的移动距离 X Y
            var bigX = xx * bigMax / maxx;
            var bigY = yy * bigMax / maxx;
            imgg.style.left = -bigX + 'px';
            imgg.style.top = -bigY + 'px';

        }
        //鼠标离开，小框和大图隐藏
        xiaotu.addEventListener('mouseout', fz)
        function fz() {
            jing.style.display = 'none';//小框bu显示
            datu.style.display = 'none';//大图bu显示
            you.style.display = 'block';
        }
    }
})