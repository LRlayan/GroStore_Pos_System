

$('#customer-sec').css({display:'none'})

$('#dashboard-tab').on('click' , () =>{
    $('#dash-sec').css({display:'block'})
    $('#footer').css({display: 'block'})
    $('#customer-sec').css({display:'none'})
    $('#store-sec').css({display:'none'})
    $('#placeOrder-sec').css({display:'none'})
})

$('#customer-tab').on('click' , () =>{
    $('#customer-sec').css({display:'block'})
    $('#placeOrder-sec').css({display:'none'})
    $('#dash-sec').css({display:'none'})
    $('#footer').css({display: 'none'})
    $('#store-sec').css({display:'none'})
})

$('#store-sec').css({display:'none'})
$('#store-tab').on('click' , () => {
    $('#store-sec').css({display:'block'})
    $('#placeOrder-sec').css({display:'none'})
    $('#customer-sec').css({display:'none'})
    $('#dash-sec').css({display:'none'})
    $('#footer').css({display:'none'})
})

$('#placeOrder-sec').css({display:'none'})
$('#placeOrder-tab').on('click' , () => {
    $('#placeOrder-sec').css({display:'block'})
    $('#store-sec').css({display:'none'})
    $('#customer-sec').css({display:'none'})
    $('#dash-sec').css({display:'none'})
    $('#footer').css({display:'none'})
})
