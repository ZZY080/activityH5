function setRootRem() {
    const root = document.documentElement;
    /** 以iPhone6为例：布局视口为375px，我们把它分成10份，则1rem = 37.5px，
     * 这时UI给定一个元素的宽为375px（设备独立像素），
     * 我们只需要将它设置为375 / 37.5 = 10rem。
    */
    const scale = root.clientWidth / 10
    root.style.fontSize = scale + 'px'  
}
setRootRem()
window.addEventListener('resize', setRootRem)