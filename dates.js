window.onload=function(){
    let review_dates=get_review_time()
    review_dates.forEach(function(item){
        const newLi = document.createElement("li")
        const newContent = document.createTextNode(item)
        newLi.style.color=randomColor()
        newLi.onclick=function(e){
            // e.currentTarget.style.textDecoration="line-through"
            textDecoration=e.currentTarget.style.textDecoration
            e.currentTarget.style.textDecoration=textDecoration=="line-through"?"None":"line-through"
            playSound()
        }
        newLi.appendChild(newContent)
        const ul = document.getElementById("dates")
        ul.appendChild(newLi)
    })
}

function get_review_time(){
    let dates=[1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048]
    dates.forEach(function(item,index,array){
        let t = new Date()
        t.setDate(t.getDate()-item)
        array[index]=yyyymmdd(t)
    })
    return dates
}

function yyyymmdd(d){
    const components=[d.getFullYear(),d.getMonth()+1,d.getDate()]
    const paddings=[4,2,2]
    return components.map(
        (component,i)=>
        component.toString().padStart(paddings[i],0)
    ).join("-")
}


function randomColor(){
    let r = Math.floor(Math.random()*255)
    let g = Math.floor(Math.random()*255)
    let b = Math.floor(Math.random()*255)
    return color = 'rgba('+ r +','+g+','+b+',1)'
}

function playSound() {
    let sound = document.getElementById("audio");
    sound.play();
}