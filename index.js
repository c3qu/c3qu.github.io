var index = 0;
var numberOfSides = 0;
var container;
function Previous() {
    // alert("previous");
    index = index - 1;
    if (index == -1) {
        index = numberOfSides - 1;
    }
    selected(index);
    // 设置css 的margin-left属性,下同
    container.style.marginLeft = "-" + index * 100 + "%";
}

function Next() {
    // alert("next")
    index = index + 1;
    if (index >= numberOfSides) {
        index = 0;
    }
    selected(index);
    container.style.marginLeft = "-" + index * 100 + "%";
}

window.onload = function () {
    numberOfSides = document.getElementsByClassName("side").length;
    container = document.getElementsByClassName("container")[0];
    slidingListenner();
    // 添加选择器列表
    selectorList = document.getElementsByClassName("selectorList")[0];
    for (i = 0; i < numberOfSides; i++) {
        selector = document.createElement("span");
        // selector.class = "selector";
        selector.innerText = (i + 1).toString();
        // 给选择器添加一个index属性,index从0开始
        selector.setAttribute('index', i);
        selector.classList.add("selector");
        selector.addEventListener("click", function () {
            // console.log(index);
            //获取dom的index属性值并转为整型
            index = parseInt(this.getAttribute("index"));
            selected(index);
            container.style.marginLeft = "-" + index * 100 + "%";
        });
        selectorList.appendChild(selector);
    }
    //默认第一个selector为选中状态
    document.getElementsByClassName("selector")[0].classList.add("selected");

    previous = document.getElementById("previous");
    previous.onclick = Previous;

    next = document.getElementById("next");
    next.onclick = Next;
}

function selected(index) {
    selectorList = document.getElementsByClassName("selector")
    for (j = 0; j < numberOfSides; j++) {
        selectorList[j].classList.remove("selected")
    }
    selectorList[index].classList.add("selected");
}

function slidingListenner() {
    // var x=0;
    var x = 0;
    var touchX = 0
    sideList = document.getElementsByClassName("side")
    for (i = 0; i < numberOfSides; i++) {
        //PC端滑动监听
        sideList[i].addEventListener("mousedown", function () {
            //    x=event.x;
            x = event.x;
        });
        sideList[i].addEventListener("mouseup", function () {
            if (event.x - x <= -10) {
                // console.log("往左滑动了")
                Next();
            } else if ((event.x - x) >= 10) {
                // console.log("往右滑动了")
                Previous();
            }
        });

        //手机端端滑动监听
        sideList[i].addEventListener("touchstart", function () {
            // console.log(event.touches[0].pageX);
            touchX = event.touches[0].pageX;
        })

        sideList[i].addEventListener("touchend", function () {
            if (event.changedTouches[0].pageX - touchX <= -10) {
                // console.log("往左滑动了")
                Next();
            } else if ((event.changedTouches[0].pageX - touchX) >= 10) {
                // console.log("往右滑动了")
                Previous();
            }
        })
    }
}

