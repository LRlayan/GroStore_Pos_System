import Order from "../model/Order.js";
import {orders,store,customer} from "../db/DB.js"

let unitPrice = 0;

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
    console.log(selectedValue)
    console.log(unitPrice)

    let total = (selectedValue*unitPrice);
   console.log(total)
    $('#inputPriceP').val(total)
})

    $('#addToCartBtn').click(function() {

        var input1 = $('#itemNameP').val()
        var input2 = $('#inputPriceP').val()

        // Create a new paragraph element with item details
        var newItemParagraph = $('<p>').text(input1);
        var two = $('<p>').text(input2).css({textAlign:"right"});

        // Append the new paragraph to the cart container
        $('#itemNameLabel').append(newItemParagraph);
        $('#itemPriceListMainDiv').append(two);
    });
