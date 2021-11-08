
function toggleBorder(item) {

    if (item.style.borderWidth == '5px') {
        item.style.border = 'none';
        console.log(item)
    } else {
        item.style.border = '5px solid CornflowerBlue';
        console.log(item)
    }

}