let clickOrderTableRow = null

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

$('#viewOrderDetailTable').on('click', 'tr', function () {

    let orderId = $(this).find(".o-orderId").text()
    let cusName = $(this).find(".o-cusName").text()
    let cusCity = $(this).find(".o-city").text()
    let cusTel = $(this).find(".o-tel").text()
    let code = $(this).find(".o-code").text()
    let iName = $(this).find(".o-iName").text()
    let qty = $(this).find(".o-qty").text()
    let dis = $(this).find(".o-dis").text()
    let price = $(this).find(".o-price").text()

    clickOrderTableRow = $(this).index();

    $('#inputOrderId').val(orderId)
    $('#customerNameU').val(cusName)
    $('#inputCityStore').val(cusCity)
    $('#inputTelephone').val(cusTel)
    $('#inputItemCode').val(code)
    $('#inputItemName').val(iName)
    $('#orderQTY').val(qty)
    $('#inputDiscount').val(dis)
    $('#inputPrice').val(price)
});