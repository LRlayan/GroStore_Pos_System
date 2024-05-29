import Order from "../model/Order.js";
import {orders,store,customer,itemNames} from "../db/DB.js"
// import { updateStoreQuantities } from "./StoreController";

let unitPrice = 0;
var subTotal = 0;
let discount = 0;
var setReduceQTY = 0;
var canselBtnIncrement = 0

var checkOrderId = false;
var checkDate = false;
var checkName = false;
var checkCity = false;
var checkTel = false;
var checkSName = false;
var checkSQTY = false;
var checkSOrderQTY = false;
var checkSPrice = false;
var checkSDiscount = false;

var generateOrderId = 1;

    $('#placeOrder-tab').on('click',()=>{
        checkOrderId = true;
        checkName = true;
        checkCity = true;
        checkTel = true;
        checkSName = true;
        checkSQTY = true;
        checkSPrice = true;

        validation('#orderId','#date','#cusName','#cusCity','#cusTel','#itemNameP','#qtyOnHandP','#inputPriceP','#discountOrder','#orderQTYP','#addToCartBtn')
        store.map(function (store){
            unitPrice = store.unitPrice;
        })
    })

    $('#orderId').val('O0-' + generateOrderId)

    $('#purchaseBtn').prop('disabled', true);
    $('#cancelBtn').prop('disabled', true);


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

        // Create a container for each item detail
        var itemContainer = $('<div class="item-container"></div>').css({display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px'});

        // Create a new paragraph element with item details
        var itemName = $('<p>').text(inputName).css({marginBottom:'5px' , marginRight:'15px'});
        var itemUnitPrice = $('<p>').text(' rs : ' + unitPrice + ' x').css({marginBottom:'5px' , marginRight:'5px'});
        var itemQTY = $('<p>').text(qty).css({marginBottom:'5px'});
        var newItemPrice = $('<p class="price">').text(inputPrice).css({textAlign:"right" , marginBottom:'5px'});
        var img = $('<img src="../assets/image/remove.png">').click(function (){

            // Remove only the container of the clicked remove button
            $(this).closest('.item-container').remove();

            // Update the subtotal and balance after removing the item
            subTotal -= parseFloat(newItemPrice.text());
            $('#subTotal').text(subTotal);

            var dis = 0;
            if (subTotal >= 8000){
                dis = subTotal * discount / 100;
                $('#discount').text(dis);
            } else {
                $('#discount').text(0);
            }

            $('#balance').text(subTotal - dis);

            //When removing items from the cart, the content is increased
             for (let i = 0; i < itemNames.length; i++) {
                if (itemName.text() === itemNames[i]) {
                    $('#qtyOnHandP').val(parseInt($('#qtyOnHandP').val()) + parseInt(itemQTY.text()));
                }
            }

            // Disable buttons if cart is empty
            if ($('.item-container').children().length === 0) {
                $('#purchaseBtn').prop('disabled', true);
                $('#cancelBtn').prop('disabled', true);
            }
        });

        itemNames.push(itemName.text());

        // Append elements to the container
        itemContainer.append(itemName);
        itemContainer.append(itemUnitPrice);
        itemContainer.append(itemQTY);
        itemContainer.append(newItemPrice);
        itemContainer.append(img);

        // Append the new paragraph to the cart container
        $('#itemNameLabel').append(itemContainer);
        $('#unit-price').append(itemContainer);
        $('#itemQty').append(itemContainer);
        $('#itemPriceListMainDiv').append(itemContainer);
        $('#orderRemove').append(itemContainer);

        var value = parseFloat(newItemPrice.text());
        subTotal += value;

        $('#subTotal').text(subTotal);

        var dis = 0;

        if (subTotal >= 8000){
            dis = subTotal*discount/100;
            $('#discount').text(dis);
        }

        $('#balance').text(subTotal-dis);

        if (itemName !== '' && newItemPrice !== ''){
            $('#purchaseBtn').prop('disabled', false);
            $('#cancelBtn').prop('disabled', false);
        }

        var QtyOnHand = $('#qtyOnHandP').val();
        var newQtyOnHand = QtyOnHand - qty;
        $('#qtyOnHandP').val(newQtyOnHand);

        $('#selectItemCode').change(function (){
            var amountQty = itemQTY.text();

            let selectedItemName = $('#itemNameP').val();
                for (let i = 0; i < itemNames.length; i++) {
                    if (selectedItemName === itemNames[i]){
                        if (itemName.text() === itemNames[i]){
                            setReduceQTY = $('#qtyOnHandP').val() - parseInt(amountQty)
                            $('#qtyOnHandP').val(parseInt(setReduceQTY));
                            amountQty = 0;
                        }
                    }
                }
            });

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

        $('#orderQTYP').val(0);
    });

    $('#purchaseBtn').on('click',()=>{
        generateOrderId++;
        $('#orderId').val('O0-' + generateOrderId)

        loadTable()
        clear()

        $('#purchaseBtn').prop('disabled', true);
        $('#cancelBtn').prop('disabled', true);
        $('#addToCartBtn').prop('disabled', true);

        $('#itemNameLabel').empty();
        $('#unit-price').empty();
        $('#itemQty').empty();
        $('#itemPriceListMainDiv').empty();
        $('#orderRemove').empty();
    })

    $('#cancelBtn').on('click',()=>{
        cancel()
        canselBtnIncrement++;
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
        $('#unit-price').empty();
        $('#itemQty').empty();
        $('#itemPriceListMainDiv').empty();
        $('#orderRemove').empty();
        $('#orderQTYP').val(0);

        for (let i = 0; i < store.length; i++) {
            if ($('#selectItemCode').val() === store[i].itemCode){
                $('#QTYOnHandP').empty();
                $('#qtyOnHandP').val(store[i].QTYOnHand);
                setReduceQTY = store[i].QTYOnHand;
            }
        }
    }

function validation(orderId,today,cName,cCity,cTel,sName,sQTY,sPrice,discount,orderQty,btnId){
    (() => {
        'use strict'

        $('#addToCartBtn').prop('disabled' , true);

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
                            checkOrderId = false;
                        } else {
                            $('.o-id').css({ display: 'none' });
                            $(orderId).css({border:'1px solid green'});
                            checkOrderId = true;
                        }
                    } else {
                        $('.o-id').css({ display: 'block' });
                        $(orderId).css({border:'1px solid red'});
                        event.preventDefault();
                        event.stopPropagation();
                        checkOrderId = false;
                    }
                    checkEmptyInputFields(checkOrderId,checkDate,checkName,checkCity,checkTel,checkSName,checkSQTY,checkSOrderQTY,checkSPrice,checkSDiscount,btnId,orderQty);
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
                        checkDate = true;
                    }else {
                        $('.o-date').css({ display: 'block' });
                        $(today).css({ border: '1px solid red' });
                        checkDate = false;
                    }
                    checkEmptyInputFields(checkOrderId,checkDate,checkName,checkCity,checkTel,checkSName,checkSQTY,checkSOrderQTY,checkSPrice,checkSDiscount,btnId,orderQty);
                })

                $(cName).on('input' ,()=>{
                    var name = $(cName).val().trim();
                    if (name.length >= 5 && name.length <= 20 && /^[a-zA-Z ]+$/.test(name)) {
                        $('.c-name').css({ display: 'none' });
                        $(cName).css({ border: '1px solid green' });
                        checkName = true;
                    } else {
                        $('.c-name').css({ display: 'block' });
                        $(cName).css({ border: '1px solid red' });
                        checkName = false;
                    }
                    checkEmptyInputFields(checkOrderId,checkDate,checkName,checkCity,checkTel,checkSName,checkSQTY,checkSOrderQTY,checkSPrice,checkSDiscount,btnId,orderQty);
                });

                $(cCity).on('input' ,()=> {
                    var city = $(cCity).val();

                    if (city.length <= 25 && /^[a-zA-Z]+$/.test(city)) {
                        $('.c-city').css({ display: 'none' });
                        $(cCity).css({ border: '1px solid green' });
                        checkCity = true;
                    } else {
                        $('.c-city').css({ display: 'block' });
                        $(cCity).css({ border: '1px solid red' });
                        checkCity = false;
                    }
                    checkEmptyInputFields(checkOrderId,checkDate,checkName,checkCity,checkTel,checkSName,checkSQTY,checkSOrderQTY,checkSPrice,checkSDiscount,btnId,orderQty);
                });

                $(cTel).on('input' ,()=> {
                    var tel = $(cTel).val();

                    if (tel.length <= 10 && /^[0-9]+$/.test(tel)) {
                        $('.c-tel').css({ display: 'none' });
                        $(cTel).css({ border: '1px solid green' });
                        checkTel = true;
                    } else {
                        $('.c-tel').css({ display: 'block' });
                        $(cTel).css({ border: '1px solid red' });
                        checkTel = false;
                    }
                    checkEmptyInputFields(checkOrderId,checkDate,checkName,checkCity,checkTel,checkSName,checkSQTY,checkSOrderQTY,checkSPrice,checkSDiscount,btnId,orderQty);
                });


                $(sName).on('input' ,()=>{
                    var name = $(sName).val().trim();
                    if (name.length >= 5 && name.length <= 20 && /^[a-zA-Z ]+$/.test(name)) {
                        $('.s-name').css({ display: 'none' });
                        $(sName).css({ border: '1px solid green' });
                        checkSName = true;
                    } else {
                        $('.s-name').css({ display: 'block' });
                        $(sName).css({ border: '1px solid red' });
                        checkSName = false;
                    }
                    checkEmptyInputFields(checkOrderId,checkDate,checkName,checkCity,checkTel,checkSName,checkSQTY,checkSOrderQTY,checkSPrice,checkSDiscount,btnId,orderQty);
                });

                $(sQTY).on('input' ,()=> {
                    var qty = $(sQTY).val();

                    if (qty.length <= 15 && /^[0-9]+$/.test(qty)) {
                        $('.s-qty').css({ display: 'none' });
                        $(sQTY).css({ border: '1px solid green' });
                        checkSQTY = true;
                    } else {
                        $('.s-qty').css({ display: 'block' });
                        $(sQTY).css({ border: '1px solid red' });
                        checkSQTY = false;
                    }
                    checkEmptyInputFields(checkOrderId,checkDate,checkName,checkCity,checkTel,checkSName,checkSQTY,checkSOrderQTY,checkSPrice,checkSDiscount,btnId,orderQty);
                });

                $(orderQty).on('input' ,()=> {
                        let qty = $(orderQty).val();
                        let qtyOnHand = $(sQTY).val();

                        if (qty.length <= 15 && /^[0-9]+$/.test(qty) && parseInt(qtyOnHand) >= parseInt(qty)) {
                            if (!$('#orderQTYP').val().startsWith('0')){
                                $('.s-qtyOrder').css({ display: 'none' });
                                $(orderQty).css({ border: '1px solid green' });
                                checkSOrderQTY = true;
                            }
                        } else {
                            $('.s-qtyOrder').css({ display: 'block' });
                            $(orderQty).css({ border: '1px solid red' });
                            checkSOrderQTY = false;
                        }
                    checkEmptyInputFields(checkOrderId,checkDate,checkName,checkCity,checkTel,checkSName,checkSQTY,checkSOrderQTY,checkSPrice,checkSDiscount,btnId,orderQty);
                });

                $(sPrice).on('input' ,()=> {
                    var price = $(sPrice).val();

                    if (price.length <= 10 && /^[0-9.]+$/.test(price)) {
                        $('.s-price').css({ display: 'none' });
                        $(sPrice).css({ border: '1px solid green' });
                        checkSPrice = true;
                    } else {
                        $('.s-price').css({ display: 'block' });
                        $(sPrice).css({ border: '1px solid red' });
                        checkSPrice = false;
                    }
                    checkEmptyInputFields(checkOrderId,checkDate,checkName,checkCity,checkTel,checkSName,checkSQTY,checkSOrderQTY,checkSPrice,checkSDiscount,btnId,orderQty);
                });

                $(discount).on('input' ,()=> {
                    var price = $(discount).val();

                    if (price.length <= 10 && /^[0-9.]+$/.test(price)) {
                        $('.s-discount').css({ display: 'none' });
                        $(discount).css({ border: '1px solid green' });
                        checkSDiscount = true;
                    } else {
                        $('.s-discount').css({ display: 'block' });
                        $(discount).css({ border: '1px solid red' });
                        checkSDiscount = false;
                    }
                    checkDiscountField(checkSDiscount,btnId);
                });
            }, false)
        })
    })()
}

function checkEmptyInputFields(checkOrderId,checkDate,checkName,checkCity,checkTel,checkSName,checkSQTY,checkSOrderQTY,checkSPrice,checkSDiscount,btnId,orderQty){
    if (checkOrderId && checkDate && checkName && checkCity && checkTel && checkSName && checkSQTY && checkSOrderQTY && checkSPrice){
        $(btnId).prop('disabled' , false);
    }else {
        $(btnId).prop('disabled' , true);
    }
}

function checkDiscountField(checkSDiscount,btnId){
    if (!checkSDiscount){
        $(btnId).prop('disabled' , true);
    }else {
        $(btnId).prop('disabled' , false);
    }
}