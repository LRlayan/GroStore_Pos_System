import Order from "../model/Order.js";
import {orders,store,customer} from "../db/DB.js"

let unitPrice = 0;
var subTotal = 0;
var discount = 5;

var generateOrderId = 1;

    $('#orderId').val('O0' + generateOrderId)

    $('#addToCartBtn').prop('disabled' , true);
    $('#purchaseBtn').prop('disabled', true);
    $('#cancelBtn').prop('disabled', true);

    $('#orderQTYP').change(function() {
        let orderId = $('#orderId').val()
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

        if (subTotal >= 5000){
            dis = subTotal*discount/100;
            $('#discount').text(dis);
        }

        $('#balance').text(subTotal-dis);

        if (newItemParagraph !== '' && newItemPrice !== ''){
            $('#purchaseBtn').prop('disabled', false);
            $('#cancelBtn').prop('disabled', false);
        }

        let orderId = $('#orderId').val();
        let cusName = $('#cusName').val();
        let cusCity = $('#cusCity').val();
        let cusTel = $('#cusTel').val();

        let code = $('#selectItemCode').val();
        let totalPrice = $('#balance').text();
        let discounts = $('#discount').text();

        let orderDetail = new Order(orderId,cusName,cusCity,cusTel,code,inputName,qty,discounts,totalPrice);
        orders.push(orderDetail);
    });

    $('#purchaseBtn').on('click',()=>{
        generateOrderId++;
        $('#orderId').val('O0' + generateOrderId)
         loadTable()
         clear()

        $('#purchaseBtn').prop('disabled', true);
        $('#cancelBtn').prop('disabled', true);
        $('#addToCartBtn').prop('disabled', true);
    })

    $('#cancelBtn').on('click',()=>{
        cancel()

        $('#purchaseBtn').prop('disabled', true);
        $('#cancelBtn').prop('disabled', true);
    })

    function loadTable() {
        $('#viewOrderDetailTable').empty()
        orders.map(function (orderDetails){
            let record = `<tr>
                    <th class="o-orderId orderTableBody" scope="row">${orderDetails.orderId}</th>
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
        // $('#orderId').val('');
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
        $('#itemNameLabel').empty();
        $('#itemPriceListMainDiv').empty();
    }