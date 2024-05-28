import {orders,store,customer} from "../db/DB.js"

let clickOrderTableRow = null;
var discount = parseFloat($('#rate').val());

var checkOrderId = false;
var checkDate = false;
var checkCusName = false;
var checkCity = false;
var checkTel = false;
var checkCode = false;
var checkItemName = false;
var checkOrderQty = false;
var checkRate = false;
var checkDis = false;
var checkPrice = false;

$('#updateOrderModal').on('shown.bs.modal', function() {
    checkEmptyFieldUpdateModal('#updateOrderDetail');
    validationModel('#inputOrderId','#dateU','#customerNameU','#inputCityStore','#inputTelephone','#inputItemName','#orderQTY','#inputPrice','#inputDiscount','#inputItemCode','#orderQTY','#rate');
});

$('#removeOrderModal').on('shown.bs.modal', function() {
    $('#orderIdR').prop('disabled' , true);
    $('#customerName').prop('disabled' , true);
    $('#itemNameRe').prop('disabled' , true);
    $('#inputPriceR').prop('disabled' , true);
    checkEmptyFieldRemoveModal('#removeOrder');
});

function checkEmptyFieldRemoveModal(btn){
    var code = $('#orderIdR').val();
    var cusName = $('#customerName').val();
    var itemName = $('#itemNameRe').val();
    var price = $('#inputPriceR').val();

    if (code == '' && cusName == '' && itemName == '' && price == ''){
        $(btn).prop('disabled' , true);
    }else {
        $(btn).prop('disabled' , false);

        checkOrderId = true;
        checkDate = true;
        checkCusName = true;
        checkCity = true;
        checkTel = true;
        checkCode = true;
        checkItemName = true;
        checkOrderQty = true;
        checkRate = true;
        checkDis = true;
        checkPrice = true;
    }
}

function checkEmptyFieldUpdateModal(btn){
    var orderId = $('#inputOrderId').val();
    var date = $('#dateU').val();
    var cusName = $('#customerNameU').val();
    var city = $('#inputCityStore').val();
    var tel = $('#inputTelephone').val();
    var code = $('#inputItemCode').val();
    var itemName = $('#inputItemName').val();
    var orderQty = $('#orderQTY').val();
    var rate = $('#rate').val();
    var dis = $('#inputDiscount').val();
    var price = $('#inputPrice').val();

    if (orderId == '' && date == '' && cusName == '' && city == '' && tel == '' && code == '' && itemName == '' && orderQty == '' && rate == '' && dis == '' && price == ''){
        $(btn).prop('disabled' , true);
    }else {
        $(btn).prop('disabled' , false);

        checkOrderId = true;
        checkDate = true;
        checkCusName = true;
        checkCity = true;
        checkTel = true;
        checkCode = true;
        checkItemName = true;
        checkOrderQty = true;
        checkRate = true;
        checkDis = true;
        checkPrice = true;
    }
}

$('#customer-sec').css({display:'none'});

$('#dashboard-tab').on('click' , () =>{
    $('#dash-sec').css({display:'block'});
    $('#footer').css({display: 'block'});
    $('#customer-sec').css({display:'none'});
    $('#store-sec').css({display:'none'});
    $('#placeOrder-sec').css({display:'none'});
})

$('#customer-tab').on('click' , () =>{
    $('#customer-sec').css({display:'block'});
    $('#placeOrder-sec').css({display:'none'});
    $('#dash-sec').css({display:'none'});
    $('#footer').css({display: 'none'});
    $('#store-sec').css({display:'none'});
});

$('#store-sec').css({display:'none'})
$('#store-tab').on('click' , () => {
    $('#store-sec').css({display:'block'});
    $('#placeOrder-sec').css({display:'none'});
    $('#customer-sec').css({display:'none'});
    $('#dash-sec').css({display:'none'});
    $('#footer').css({display:'none'});
});

$('#placeOrder-sec').css({display:'none'});

$('#placeOrder-tab').on('click' , () => {
    $('#placeOrder-sec').css({display:'block'});
    $('#store-sec').css({display:'none'});
    $('#customer-sec').css({display:'none'});
    $('#dash-sec').css({display:'none'});
    $('#footer').css({display:'none'});
    $('#selectCustomerId').trigger('change');
    $('#selectItemCode').trigger('change');
})

$('#viewOrderDetailTable').on('click', 'tr', function () {

    let orderId = $(this).find(".o-orderId").text();
    let date = $(this).find(".o-date").text();
    let cusName = $(this).find(".o-cusName").text();
    let cusCity = $(this).find(".o-city").text();
    let cusTel = $(this).find(".o-tel").text();
    let code = $(this).find(".o-code").text();
    let iName = $(this).find(".o-iName").text();
    let qty = $(this).find(".o-qty").text();
    let dis = $(this).find(".o-dis").text();
    let price = $(this).find(".o-price").text();

    clickOrderTableRow = $(this).index();

    $('#inputOrderId').val(orderId);
    $('#dateU').val(date);
    $('#customerNameU').val(cusName);
    $('#inputCityStore').val(cusCity);
    $('#inputTelephone').val(cusTel);
    $('#inputItemCode').val(code);
    $('#inputItemName').val(iName);
    $('#orderQTY').val(qty);
    $('#inputDiscount').val(dis);
    $('#inputPrice').val(price);

    $('#orderIdR').val(orderId);
    $('#customerName').val(cusName);
    $('#itemNameRe').val(iName);
    $('#inputPriceR').val(price);
});

$('#orderQTY').on('input', ()=>{
    let selectedValue = $(this).val();
    let total = 0;
    orders.map(function (order){
        store.map(function (stores){
            if (stores.itemCode === order.itemCode){
                total = (selectedValue*stores.unitPrice);
                $('#inputPrice').val(total);
            }
        });
    });

    if (total >= 5000){
        $('#inputDiscount').val(total*discount/100);
    }else {
        $('#inputDiscount').val('0.00');
    }
})

$('#updateOrderDetail').on('click' , ()=>{
    $('#updateOrderDetail').prop('disabled' , true);

    let orderId = $('#inputOrderId').val();
    let date = $('#dateU').val();
    let cusName = $('#customerNameU').val();
    let cusCity = $('#inputCityStore').val();
    let cusTel = $('#inputTelephone').val();
    let code = $('#inputItemCode').val();
    let iName = $('#inputItemName').val();
    let qty = $('#orderQTY').val();
    let dis = $('#inputDiscount').val();
    let price = $('#inputPrice').val();

    let orderDetail = orders[clickOrderTableRow]
    orderDetail.orderId = orderId;
    orderDetail.date = date;
    orderDetail.cusName = cusName;
    orderDetail.cusCity = cusCity;
    orderDetail.cusTel = cusTel;
    orderDetail.itemCode = code;
    orderDetail.itemName = iName;
    orderDetail.orderQTY = qty;
    orderDetail.discount = dis;
    orderDetail.unitPrice = price;
    loadTable();
    clearForm();
})

$('#removeOrder').on('click',()=>{
    $('#removeOrder').prop('disabled' , true);
    orders.splice(clickOrderTableRow , 1);
    loadTable();
    clearForm();
})

function loadTable() {
    $('#viewOrderDetailTable').empty()
    orders.map(function (orderDetails){
        let record = `<tr>
                    <th class="o-orderId orderTableBody" scope="row">${orderDetails.orderId}</th>
                    <th class="o-date orderTableBody" scope="row">${orderDetails.date}</th>
                    <td class="o-cusName orderTableBody">${orderDetails.cusName}</td>
                    <td class="o-city orderTableBody">${orderDetails.cusCity}</td>
                    <td class="o-tel orderTableBody">${orderDetails.cusTel}</td>
                    <td class="o-code orderTableBody">${orderDetails.itemCode}</td>  
                    <td class="o-iName orderTableBody">${orderDetails.itemName}</td>  
                    <td class="o-qty orderTableBody">${orderDetails.orderQTY}</td>  
                    <td class="o-dis orderTableBody">${orderDetails.discount}</td>
                    <td class="o-price orderTableBody">${orderDetails.price}</td>  
                                 </tr>`
        $('#viewOrderDetailTable').append(record)
    })
}

$(document).ready(function(){
    $("#dashStore").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#viewOrderDetailTable tr").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
    });
});

function clearForm(){
    $('#inputOrderId').val('');
    $('#inputCityStore').val('');
    $('#inputTelephone').val('');
    $('#inputItemCode').val('');
    $('#inputItemName').val('');
    $('#orderQTY').val('');
    $('#inputDiscount').val('');
    $('#inputPrice').val('');

    $('#orderIdR').val('');
    $('#customerName').val('');
    $('#itemNameRe').val('');
    $('#inputPriceR').val('');
}

$(document).on('keydown', function(event) {
    if (event.key === "Tab" || event.keyCode === 9) {
        event.preventDefault();
    }
});

function validationModel(orderId,today,cName,cCity,cTel,sName,sQTY,sPrice,discount,sCode,orderQty,rate){
    (() => {
        'use strict'

        $('.c-id').css({display: 'none'});
        // checkEmptyInputFields(cId,cName,cCity,cTel,btnId);

        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        const forms = document.querySelectorAll('.needs-validation');

        // Loop over them and prevent submission
        Array.from(forms).forEach(form => {
            form.addEventListener('click', event => {

                $(orderId).on('input' , ()=>{
                    var id = $(orderId).val();

                    if (id.startsWith('O0-')) {
                        const numericPart = id.substring(3);

                        if (!(/^\d+$/.test(numericPart))) {
                            $('.o-idD').text('Order ID must be minimum 1 digit value followed by O0- format.');
                            $('.o-idD').css({ display: 'block' });
                            event.preventDefault();
                            event.stopPropagation();
                            checkOrderId = false;
                        } else {
                            $('.o-idD').css({ display: 'none' });
                            $(orderId).css({border:'1px solid green'});
                            checkOrderId = true;
                        }
                    } else {
                        $('.o-idD').css({ display: 'block' });
                        $(orderId).css({border:'1px solid red'});
                        event.preventDefault();
                        event.stopPropagation();
                        checkOrderId = false;
                    }
                    checkEmptyInputFields(checkOrderId,checkDate,checkCusName,checkCity,checkTel,checkCode,checkItemName,checkOrderQty,checkRate,checkDis,checkPrice);
                });

                $(today).change(function (){
                    var date = $(today).val();
                    var currentDate = new Date();

                    var year = currentDate.getFullYear();
                    var month = ("0" + (currentDate.getMonth() + 1)).slice(-2);
                    var day = ("0" + currentDate.getDate()).slice(-2);

                    if (date === year+"-"+ month + "-" + day){
                        $('.o-dateD').css({ display: 'none' });
                        $(today).css({ border: '1px solid green' });
                        checkDate = true;
                    }else {
                        $('.o-dateD').css({ display: 'block' });
                        $(today).css({ border: '1px solid red' });
                        checkDate = false;
                    }
                    checkEmptyInputFields(checkOrderId,checkDate,checkCusName,checkCity,checkTel,checkCode,checkItemName,checkOrderQty,checkRate,checkDis,checkPrice);
                })

                $(cName).on('input' ,()=>{
                    var name = $(cName).val().trim();
                    if (name.length >= 5 && name.length <= 20 && /^[a-zA-Z ]+$/.test(name)) {
                        $('.c-nameD').css({ display: 'none' });
                        $(cName).css({ border: '1px solid green' });
                        checkCusName = true;
                    } else {
                        $('.c-nameD').css({ display: 'block' });
                        $(cName).css({ border: '1px solid red' });
                        checkCusName = false;
                    }
                    checkEmptyInputFields(checkOrderId,checkDate,checkCusName,checkCity,checkTel,checkCode,checkItemName,checkOrderQty,checkRate,checkDis,checkPrice);
                });

                $(cCity).on('input' ,()=> {
                    var city = $(cCity).val();

                    if (city.length <= 25 && /^[a-zA-Z]+$/.test(city)) {
                        $('.c-cityD').css({ display: 'none' });
                        $(cCity).css({ border: '1px solid green' });
                        checkCity = true;
                    } else {
                        $('.c-cityD').css({ display: 'block' });
                        $(cCity).css({ border: '1px solid red' });
                        checkCity = false;
                    }
                    checkEmptyInputFields(checkOrderId,checkDate,checkCusName,checkCity,checkTel,checkCode,checkItemName,checkOrderQty,checkRate,checkDis,checkPrice);
                });

                $(cTel).on('input' ,()=> {
                    var tel = $(cTel).val();

                    if (tel.length <= 10 && /^[0-9]+$/.test(tel)) {
                        $('.c-telD').css({ display: 'none' });
                        $(cTel).css({ border: '1px solid green' });
                        checkTel = true;
                    } else {
                        $('.c-telD').css({ display: 'block' });
                        $(cTel).css({ border: '1px solid red' });
                        checkTel = false;
                    }
                    checkEmptyInputFields(checkOrderId,checkDate,checkCusName,checkCity,checkTel,checkCode,checkItemName,checkOrderQty,checkRate,checkDis,checkPrice);
                });

                $(sCode).on('input',()=>{
                    var code = $(sCode).val();

                    if (code.startsWith('I00-')) {
                        const numericPart = code.substring(6);

                        if (!(/^\d+$/.test(numericPart))) {
                            $('.s-codeD').text('Item Code must be minimum 3 digit value followed by I00- format.');
                            $('.s-codeD').css({ display: 'block' });
                            event.preventDefault();
                            event.stopPropagation();
                            checkCode = false;
                        } else {
                            $('.s-codeD').css({ display: 'none' });
                            $(sCode).css({border:'1px solid green'});
                            checkCode = true;
                        }
                    } else {
                        $('.s-codeD').css({ display: 'block' });
                        $(sCode).css({border:'1px solid red'});
                        event.preventDefault();
                        event.stopPropagation();
                        checkCode = false;
                    }
                    checkEmptyInputFields(checkOrderId,checkDate,checkCusName,checkCity,checkTel,checkCode,checkItemName,checkOrderQty,checkRate,checkDis,checkPrice);
                })

                $(sName).on('input' ,()=>{
                    var name = $(sName).val().trim();
                    if (name.length >= 5 && name.length <= 20 && /^[a-zA-Z ]+$/.test(name)) {
                        $('.s-nameD').css({ display: 'none' });
                        $(sName).css({ border: '1px solid green' });
                        checkItemName = true;
                    } else {
                        $('.s-nameD').css({ display: 'block' });
                        $(sName).css({ border: '1px solid red' });
                        checkItemName = false;
                    }
                    checkEmptyInputFields(checkOrderId,checkDate,checkCusName,checkCity,checkTel,checkCode,checkItemName,checkOrderQty,checkRate,checkDis,checkPrice);
                });

                $(sQTY).on('input' ,()=> {
                    var qty = $(sQTY).val();

                    if (qty.length <= 15 && /^[0-9]+$/.test(qty)) {
                        $('.s-qtyD').css({ display: 'none' });
                        $(sQTY).css({ border: '1px solid green' });
                    } else {
                        $('.s-qtyD').css({ display: 'block' });
                        $(sQTY).css({ border: '1px solid red' });
                    }
                    checkEmptyInputFields(checkOrderId,checkDate,checkCusName,checkCity,checkTel,checkCode,checkItemName,checkOrderQty,checkRate,checkDis,checkPrice);
                });

                $(orderQty).on('input' ,()=> {
                    var qty = $(orderQty).val();
                    var qtyOnHand = $(sQTY).val();

                    if (qty.length <= 15 && /^[0-9]+$/.test(qty) && parseInt(qtyOnHand) >= parseInt(qty)) {
                        $('.s-qtyOrderD').css({ display: 'none' });
                        $(orderQty).css({ border: '1px solid green' });
                        checkOrderQty = true;
                    } else {
                        $('.s-qtyOrderD').css({ display: 'block' });
                        $(orderQty).css({ border: '1px solid red' });
                        checkOrderQty = false;
                    }
                    checkEmptyInputFields(checkOrderId,checkDate,checkCusName,checkCity,checkTel,checkCode,checkItemName,checkOrderQty,checkRate,checkDis,checkPrice);
                });

                $(sPrice).on('input' ,()=> {
                    var price = $(sPrice).val();

                    if (price.length <= 10 && /^[0-9.]+$/.test(price)) {
                        $('.s-priceD').css({ display: 'none' });
                        $(sPrice).css({ border: '1px solid green' });
                        checkPrice = true;
                    } else {
                        $('.s-priceD').css({ display: 'block' });
                        $(sPrice).css({ border: '1px solid red' });
                        checkPrice = false;
                    }
                    checkEmptyInputFields(checkOrderId,checkDate,checkCusName,checkCity,checkTel,checkCode,checkItemName,checkOrderQty,checkRate,checkDis,checkPrice);
                });

                $(discount).on('input' ,()=> {
                    var price = $(discount).val();

                    if (price.length <= 10 && /^[0-9.]+$/.test(price)) {
                        $('.s-discountD').css({ display: 'none' });
                        $(discount).css({ border: '1px solid green' });
                        checkDis = true;
                    } else {
                        $('.s-discountD').css({ display: 'block' });
                        $(discount).css({ border: '1px solid red' });
                        checkDis = false;
                    }
                    checkEmptyInputFields(checkOrderId,checkDate,checkCusName,checkCity,checkTel,checkCode,checkItemName,checkOrderQty,checkRate,checkDis,checkPrice);
                });

                $(rate).on('input' ,()=> {
                    var rateDis = $(rate).val();

                    if (rateDis.length <= 3 && /^[0-9.]+$/.test(rateDis)) {
                        $('.s-discountRate').css({ display: 'none' });
                        $(rate).css({ border: '1px solid green' });
                        checkRate = true;
                    } else {
                        $('.s-discountRate').css({ display: 'block' });
                        $(rate).css({ border: '1px solid red' });
                        checkRate = false;
                    }
                    checkEmptyInputFields(checkOrderId,checkDate,checkCusName,checkCity,checkTel,checkCode,checkItemName,checkOrderQty,checkRate,checkDis,checkPrice);
                });
            }, false)
        })
    })()
}

function checkEmptyInputFields(checkOrderId,checkDate,checkCusName,checkCity,checkTel,checkCode,checkItemName,checkOrderQty,checkRate,checkDis,checkPrice){
    if (checkOrderId && checkDate && checkCusName && checkCity && checkTel && checkCode && checkItemName && checkOrderQty && checkRate && checkDis && checkPrice){
        $(btnId).prop('disabled' , false);
    }else {
        $(btnId).prop('disabled' , true);
    }
}