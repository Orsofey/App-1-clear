// подключение слайдера с помощью slick
$(document).ready(function(){
    //SLIDER
    $('.slider').slick({
        arrows:true,
        dots:true,
    });

    
    //CHECKBOX
    //находим все .checkbox
    $.each($('.checkbox'), function(index, val) {
        //находим в них input и проверяем активен ли он
        if($(this).find('input').prop('checkbox')==true) {
            //тогда добавляем ему состояние active
            $(this).addClass('active');
        }
    });
    // вешаем событие click на checkbox
    $(document).on('click', '.checkbox', function(event) {
        //если есть класс active
        if($(this).hasClass('active')){
            // убираем класс active с input
            $(this).find('input').prop('checked', false);
        //иначе
        }else{
            //добавляем класс active с input
            $(this).find('input').prop('checked', true);
        }
        $(this).toggleClass('active');

        return false;
    });
});