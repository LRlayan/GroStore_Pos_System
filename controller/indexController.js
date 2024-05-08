import {orders,store} from "../db/DB.js"

let clickOrderTableRow = null
var discount = 5;

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

$('#orderQTY').change(function (){
    let selectedValue = $(this).val();
    let total = 0;
    orders.map(function (order){
        store.map(function (stores){
            if (stores.itemCode === order.itemCode){
                total = (selectedValue*stores.unitPrice);
                $('#inputPrice').val(total);
            }
        })
    })

    if (total >= 5000){
        $('#inputDiscount').val(total*discount/100);
    }else {
        $('#inputDiscount').val('0.00');
    }
})

$('#updateOrderDetail').on('click' , ()=>{
    let orderId = $('#inputOrderId').val()
    let cusName = $('#customerNameU').val()
    let cusCity = $('#inputCityStore').val()
    let cusTel = $('#inputTelephone').val()
    let code = $('#inputItemCode').val()
    let iName = $('#inputItemName').val()
    let qty = $('#orderQTY').val()
    let dis = $('#inputDiscount').val()
    let price = $('#inputPrice').val()

    let orderDetail = orders[clickOrderTableRow]
    orderDetail.orderId = orderId;
    orderDetail.cusName = cusName;
    orderDetail.cusCity = cusCity;
    orderDetail.cusTel = cusTel;
    orderDetail.itemCode = code;
    orderDetail.itemName = iName;
    orderDetail.orderQTY = qty;
    orderDetail.discount = dis;
    orderDetail.unitPrice = price;

    clearForm()
})

function clearForm(){

}