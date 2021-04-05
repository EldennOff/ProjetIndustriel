var table = '#mytable';
$('.pagination').html('');
var trnum = 0;
var maxRows = 20;
var totalRows = $(table+' tbody tr').length;
$(table+' tr:gt(0)').each(function(){
    trnum++
    if(trnum > maxRows) {
        $(this).hide()
    }
    if(trnum <= maxRows){
        $(this).show()
    }
})
if(totalRows > maxRows){
    var pagenum = Math.ceil(totalRows/maxRows)
    for(var i=1; i<=pagenum;){
        if (i===1){
            $('.pagination').append('<li data-page="'+i+'">\<button style="cursor: pointer;" class="butn btactive">'+ i++ +'<span class="sr-only">(current)</span></button>\</li>').show()
        } else {
            $('.pagination').append('<li data-page="' + i + '">\<button style="cursor: pointer;" class ="butn">' + i++ + '<span class="sr-only">(current)</span></button>\</li>').show()
        }
    }
}
$('.pagination li:first-child').addClass('active');
$('.pagination li').on('click', function(){
    var pageNum = $(this).attr('data-page')
    var trIndex =0;
    $('.pagination li').removeClass('active');
    $(this).addClass('active');
    $(table+' tr:gt(0)').each(function(){
        trIndex++
        if(trIndex > (maxRows*pageNum) || trIndex <= ((maxRows*pageNum)-maxRows)){
            $(this).hide()
        } else {
            $(this).show()
        }
    })
})
$(function(){
    $('table tr:eq(0)').prepend('<th>Number</th>')
    var id =0;
    $('table tr:gt(0)').each(function(){
        id++
        $(this).prepend('<td> '+id+'</td>')
    })
})

$('.butn').css({'background-color': "#f1f1f1", 'margin-right': "3px", 'border': "none", 'outline': 'none'});
$('.btactive').css({'background-color': "#666", "color": "white"});




