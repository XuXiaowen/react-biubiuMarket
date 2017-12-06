/**
 * Created by Lily on 2017/11/19.
 */
/*上下拖动*/
export function downBar(ele) {
    let parentBox = ele.parentNode;//获取拖动元素父节点
    let parentH = parentBox.offsetHeight,
        childH = ele.scrollHeight;
    //能够移动的最大距离
    const MaxDis = childH - parentH;
    //元素距离顶部的最大距离
    let initTop = ele.offsetTop;
    let startY;//
    let distance;//移动的距离
    ele.addEventListener('touchstart', touchstart);
    ele.addEventListener('touchmove', touchmove);
    function touchstart(e) {
        startY = e.targetTouches[0].pageY;
    }

    function touchmove(e) {
        let endY = e.targetTouches[0].pageY;
        distance = endY - startY;//移动的距离
        if (distance < 0 && Math.abs(distance) > MaxDis) {
            ele.style.top = -(MaxDis) + 'px';
        } else if (distance > 0 && distance > MaxDis) {
            ele.style.top = 0
        } else {
            ele.style.top = initTop + distance + 'px';
        }
    }
}

/*类名去重*/
export function getSubtype(goods, name) {
    console.log(goods);
    let types = {}, ary = JSON.parse(JSON.stringify(goods));
    for (let i = 0; i < ary.length; i++) {
        let cur = ary[i][name];
        console.log(i,cur);
        if (typeof types[cur] !== 'undefined') {
            ary[i] = ary[ary.length - 1];
            i--;
            ary.length--;
            continue;
        }
        types[cur] = cur;
    }
    console.log(ary);
    return ary;

}

/*设置类名*/
export function setActive(e, clsName, tag, active) {
    let tags = document.getElementsByTagName(tag);
    tags[0].className = clsName + ' ' + active;
    for (let i = 0; i < tags.length; i++) {
        if (tags[i] !== e.target) {
            tags[i].className = clsName;
        } else {
            tags[i].className = clsName + ' ' + active;
        }
    }
}
export function loadMore(ele, callback) {
    ele.addEventListener('touchstart', touchstart);
    let startY = null,
        distance = null,
        initTop = ele.style.top;

    function touchstart(event) {
        startY = event.targetTouches[0].pageY;//最初位置
        ele.addEventListener('touchmove', touchMove);
        // ele.addEventListener('touchend', touchEnd);
        function touchMove(e) {
            let pageY = e.targetTouches[0].pageY;
            ele.style.top = initTop + pageY;
        }

        function touchEnd(e) {

        }
    }
}

export function changeIco() {

}