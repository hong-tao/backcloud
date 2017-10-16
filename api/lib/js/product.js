// 将头部引入
$(function($){
    // 事件委托
    console.log($('#event'));
    $('#event').on('click', 'button', function(){
        console.log($(this));
    })
});
