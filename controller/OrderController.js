import Order from "../model/Order.js";
import {orders,store,customer} from "../db/DB.js"
// import { updateStoreQuantities } from "./StoreController";

let unitPrice = 0;
var subTotal = 0;
let discount = 0;

var generateOrderId = 1;

    $('#placeOrder-tab').on('click',()=>{
        validation('#orderId','#date','#cusName','#cusCity','#cusTel','#itemNameP','#qtyOnHandP','#inputPriceP','#discountOrder','#orderQTYP')
        store.map(function (store){
            unitPrice = store.unitPrice;
        })
    })

    $('#orderId').val('O0-' + generateOrderId)

    $('#addToCartBtn').prop('disabled' , true);
    $('#purchaseBtn').prop('disabled', true);
    $('#cancelBtn').prop('disabled', true);

    $('#orderQTYP').change(function() {

        let cusId = $('#selectCustomerId').val()
        let cusName = $('#cusName').val()
        let cusCity = $('#cusCity').val()
        let cusTel = $('#cusTel').val()
        let code = $('#selectItemCode').val()
        let iName = $('#itemNameP').val()
        let qtyOnHand = $('#qtyOnHandP').val()
        let qty = $('#orderQTYP').val()
        let price = $('#inputPriceP').val()

        if (cusId !== '' && cusName !== '' && cusCity !== '' && cusTel !== '' && code !== '' && iName !== '' && qtyOnHand !== '' && qty !== '' && price !== '') {
            $('#addToCartBtn').prop('disabled', false);
        }else {
            $('#addToCartBtn').prop('disabled', true);
        }
    })

$(document).ready(function() {
    $('#selectCustomerId').change(function() {
        // Get the selected value using val()
        var selectedValue = $(this).val();

        customer.map(function (cus){
            if (selectedValue === cus.id){
                $('#cusName').val(cus.name);
                $('#cusCity').val(cus.city);
                $('#cusTel').val(cus.tel);
            }
        })
    });

    $('#selectItemCode').change(function() {
        // Get the selected value using val()
        var selectedValue = $(this).val();

        store.map(function (store){
            if (selectedValue === store.itemCode){
                $('#itemNameP').val(store.itemName);
                $('#qtyOnHandP').val(store.QTYOnHand);
                $('#inputPriceP').val(store.unitPrice);

                unitPrice = store.unitPrice;
            }
        })
    });
});

    $('#orderQTYP').change(function (){
        let selectedValue = $(this).val();

        let total = (selectedValue*unitPrice);
        $('#inputPriceP').val(total);
    })


    $('#addToCartBtn').click(function() {

        var inputName = $('#itemNameP').val();
        var inputPrice = $('#inputPriceP').val();
        var qty = $('#orderQTYP').val();
        discount = $('#discountOrder').val();

        // Create a new paragraph element with item details
        var newItemParagraph = $('<p>').text(inputName + " " + "x" + qty);
        var newItemPrice = $('<p>').text(inputPrice).css({textAlign:"right"});

        // Append the new paragraph to the cart container
        $('#itemNameLabel').append(newItemParagraph);
        $('#itemPriceListMainDiv').append(newItemPrice);

        var value = parseFloat(newItemPrice.text());
        subTotal += value;

        $('#subTotal').text(subTotal);

        var dis = 0;

        if (subTotal >= 8000){
            dis = subTotal*discount/100;
            $('#discount').text(dis);
        }

        $('#balance').text(subTotal-dis);

        if (newItemParagraph !== '' && newItemPrice !== ''){
            $('#purchaseBtn').prop('disabled', false);
            $('#cancelBtn').prop('disabled', false);
        }

        let orderId = $('#orderId').val();
        let date = $('#date').val();
        let cusName = $('#cusName').val();
        let cusCity = $('#cusCity').val();
        let cusTel = $('#cusTel').val();

        let code = $('#selectItemCode').val();
        let totalPrice = $('#balance').text();
        let discounts = $('#discount').text();

        let orderDetail = new Order(orderId,date,cusName,cusCity,cusTel,code,inputName,qty,discounts,totalPrice);
        orders.push(orderDetail);
    });

    $('#purchaseBtn').on('click',()=>{
        generateOrderId++;
        $('#orderId').val('O0-' + generateOrderId)

        loadTable()
         clear()

        $('#purchaseBtn').prop('disabled', true);
        $('#cancelBtn').prop('disabled', true);
        $('#addToCartBtn').prop('disabled', true);
    })

    $('#cancelBtn').on('click',()=>{
        cancel()
        subTotal = 0;
        discount = 0;
        $('#purchaseBtn').prop('disabled', true);
        $('#cancelBtn').prop('disabled', true);
    })

    function loadTable() {
        $('#viewOrderDetailTable').empty()
        orders.map(function (orderDetails){
            let record = `<tr>
                    <th class="o-orderId orderTableBody" scope="row">${orderDetails.orderId}</th>
                    <th class="o-date orderTableBody">${orderDetails.date}</th>
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

    function clear(){
        $('#cusName').val('');
        $('#cusCity').val('');
        $('#cusTel').val('');
        $('#balance').text('0.00');
        $('#discount').text('0.00');
        $('#itemNameP').val('');
        $('#inputPriceP').val('');
        $('#orderQTYP').val('');
        $('#qtyOnHandP').val('');
        $('#subTotal').text('0.00');

        $('#itemNameLabel').empty();
        $('#itemPriceListMainDiv').empty();
    }

    function cancel(){
        $('#subTotal').text('0.00');
        $('#discount').text('0.00');
        $('#balance').text('0.00');
        $('#itemNameLabel').empty();
        $('#itemPriceListMainDiv').empty();
    }

function validation(orderId,today,cName,cCity,cTel,sName,sQTY,sPrice,discount,orderQty){
    (() => {
        'use strict'

        $('.c-id').css({display: 'none'});
        // checkEmptyInputFields(cId,cName,cCity,cTel,btnId);

        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        const forms = document.querySelectorAll('.needs-validation')

        // Loop over them and prevent submission
        Array.from(forms).forEach(form => {
            form.addEventListener('click', event => {

                $(orderId).on('input' , ()=>{
                    var id = $(orderId).val();

                    if (id.startsWith('O0-')) {
                        const numericPart = id.substring(3);

                        if (!(/^\d+$/.test(numericPart))) {
                            $('.o-id').text('Order ID must be minimum 1 digit value followed by O0- format.');
                            $('.o-id').css({ display: 'block' });
                            event.preventDefault();
                            event.stopPropagation();
                        } else {
                            $('.o-id').css({ display: 'none' });
                            $(orderId).css({border:'1px solid green'});
                        }
                    } else {
                        $('.o-id').css({ display: 'block' });
                        $(orderId).css({border:'1px solid red'});
                        event.preventDefault();
                        event.stopPropagation();
                    }
                });

                $(today).change(function (){
                    var date = $(today).val()
                    var currentDate = new Date();

                    var year = currentDate.getFullYear();
                    var month = ("0" + (currentDate.getMonth() + 1)).slice(-2);
                    var day = ("0" + currentDate.getDate()).slice(-2);

                    if (date === year+"-"+ month + "-" + day){
                        $('.o-date').css({ display: 'none' });
                        $(today).css({ border: '1px solid green' });
                    }else {
                        $('.o-date').css({ display: 'block' });
                        $(today).css({ border: '1px solid red' });
                    }
                })

                $(cName).on('input' ,()=>{
                    var name = $(cName).val().trim();
                    if (name.length >= 5 && name.length <= 20 && /^[a-zA-Z ]+$/.test(name)) {
                        $('.c-name').css({ display: 'none' });
                        $(cName).css({ border: '1px solid green' });
                    } else {
                        $('.c-name').css({ display: 'block' });
                        $(cName).css({ border: '1px solid red' });
                    }
                });

                $(cCity).on('input' ,()=> {
                    var city = $(cCity).val();

                    if (city.length <= 25 && /^[a-zA-Z]+$/.test(city)) {
                        $('.c-city').css({ display: 'none' });
                        $(cCity).css({ border: '1px solid green' });
                    } else {
                        $('.c-city').css({ display: 'block' });
                        $(cCity).css({ border: '1px solid red' });
                    }
                });

                $(cTel).on('input' ,()=> {
                    var tel = $(cTel).val();

                    if (tel.length <= 10 && /^[0-9]+$/.test(tel)) {
                        $('.c-tel').css({ display: 'none' });
                        $(cTel).css({ border: '1px solid green' });
                    } else {
                        $('.c-tel').css({ display: 'block' });
                        $(cTel).css({ border: '1px solid red' });
                    }
                });


                $(sName).on('input' ,()=>{
                    var name = $(sName).val().trim();
                    if (name.length >= 5 && name.length <= 20 && /^[a-zA-Z ]+$/.test(name)) {
                        $('.s-name').css({ display: 'none' });
                        $(sName).css({ border: '1px solid green' });
                    } else {
                        $('.s-name').css({ display: 'block' });
                        $(sName).css({ border: '1px solid red' });
                    }
                });

                $(sQTY).on('input' ,()=> {
                    var qty = $(sQTY).val();

                    if (qty.length <= 15 && /^[0-9]+$/.test(qty)) {
                        $('.s-qty').css({ display: 'none' });
                        $(sQTY).css({ border: '1px solid green' });
                    } else {
                        $('.s-qty').css({ display: 'block' });
                        $(sQTY).css({ border: '1px solid red' });
                    }
                });

                $(orderQty).on('input' ,()=> {
                        let qty = $(orderQty).val();
                        let qtyOnHand = $(sQTY).val();

                        if (qty.length <= 15 && /^[0-9]+$/.test(qty) && parseInt(qtyOnHand) >= parseInt(qty)) {
                            $('.s-qtyOrder').css({ display: 'none' });
                            $(orderQty).css({ border: '1px solid green' });
                        } else {
                            $('.s-qtyOrder').css({ display: 'block' });
                            $(orderQty).css({ border: '1px solid red' });
                        }
                });

                $(sPrice).on('input' ,()=> {
                    var price = $(sPrice).val();

                    if (price.length <= 10 && /^[0-9.]+$/.test(price)) {
                        $('.s-price').css({ display: 'none' });
                        $(sPrice).css({ border: '1px solid green' });
                    } else {
                        $('.s-price').css({ display: 'block' });
                        $(sPrice).css({ border: '1px solid red' });
                    }
                });

                $(discount).on('input' ,()=> {
                    var price = $(discount).val();

                    if (price.length <= 10 && /^[0-9.]+$/.test(price)) {
                        $('.s-discount').css({ display: 'none' });
                        $(discount).css({ border: '1px solid green' });
                    } else {
                        $('.s-discount').css({ display: 'block' });
                        $(discount).css({ border: '1px solid red' });
                    }
                });

                // checkEmptyInputFields(cId,cName,cCity,cTel,btnId);
                // $(btnId).on('click',()=>{
                //     clearBorderColor(cId,cName,cCity,cTel);
                // })
            }, false)
        })
    })()
}