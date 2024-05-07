import Order from "../model/Order.js";
import {orders,store,customer} from "../db/DB.js"

let unitPrice = 0;
var subTotal = 0;

    $('#selectCustomerId').change(function() {
        // Get the selected value using val()
        var selectedValue = $(this).val();

        customer.map(function (cus){
            if (selectedValue === cus.id){
                $('#cusName').val(cus.name)
                $('#cusCity').val(cus.city)
                $('#cusTel').val(cus.tel)
            }
        })
    });

$('#selectItemCode').change(function() {
    // Get the selected value using val()
    var selectedValue = $(this).val();

    store.map(function (store){
        if (selectedValue === store.itemCode){
            $('#itemNameP').val(store.itemName)
            $('#qtyOnHandP').val(store.QTYOnHand)
            $('#inputPriceP').val(store.unitPrice)

            unitPrice = store.unitPrice;
        }
    })
});

$('#orderQTYP').change(function (){
    let selectedValue = $(this).val();

    let total = (selectedValue*unitPrice);
    $('#inputPriceP').val(total)
})

    $('#addToCartBtn').click(function() {

        var inputName = $('#itemNameP').val()
        var inputPrice = $('#inputPriceP').val()
        var qty = $('#orderQTYP').val()

        // Create a new paragraph element with item details
        var newItemParagraph = $('<p>').text(inputName + " " + "x" + qty);
        var newItemPrice = $('<p>').text(inputPrice).css({textAlign:"right"});

        // Append the new paragraph to the cart container
        $('#itemNameLabel').append(newItemParagraph);
        $('#itemPriceListMainDiv').append(newItemPrice);

        var value = parseFloat(newItemPrice.text());
        subTotal += value;

        $('#subTotal').text(subTotal)
    });
