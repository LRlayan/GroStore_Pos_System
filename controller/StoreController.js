import Store from "../model/Store.js";
import {store} from "../db/DB.js"

let clickTableRow = 0;

$('#submitStore').on('click' , ()=>{
    let itemCode = $('#itemCode').val();
    let itemName = $('#itemName').val();
    let QTYOnHand = $('#inputQTY').val();
    let unitPrice = $('#unitPrice').val();

    let storeDetail = new Store(itemCode,itemName,QTYOnHand,unitPrice);
    store.push(storeDetail);
    loadTable();

    $('#selectItemCode').append($('<option>').text(itemCode)); // place order item code comboBox set item code

    $('#storeTable').on('click', 'tr', function () {

        let code = $(this).find(".s-code").text();
        let name = $(this).find(".s-name").text();
        let qty = $(this).find(".s-qty").text();
        let price = $(this).find(".s-price").text();

        clickTableRow = $(this).index();

        $('#itemCodeS').val(code);
        $('#itemNameS').val(name);
        $('#qty').val(qty);
        $('#priceS').val(price);

        $('#itemCodeR').val(code);
        $('#itemNameR').val(name);
    })
    clearForm();
})

function loadTable(){
    $('#storeTable').empty();
    store.map(function (storeDetails){
        let record = `<tr>
                                  <td class="s-code orderTableBody">${storeDetails.itemCode}</td>  
                                  <td class="s-name orderTableBody">${storeDetails.itemName}</td>  
                                  <td class="s-qty orderTableBody">${storeDetails.QTYOnHand}</td>  
                                  <td class="s-price orderTableBody">${storeDetails.unitPrice}</td>  
                             </tr>`
        $('#storeTable').append(record);
    });
}

$('#updateS').on('click' , ()=>{
    let itemCode = $('#itemCodeS').val();
    let itemName = $('#itemNameS').val();
    let QTYOnHand = $('#qty').val();
    let unitPrice = $('#priceS').val();

    let items = store[clickTableRow]

    items.itemCode = itemCode
    items.itemName = itemName
    items.QTYOnHand = QTYOnHand
    items.unitPrice = unitPrice

    loadTable();
    clearForm();
})

$('#deleteS').on('click',()=>{
    store.splice(clickTableRow , 1);
    loadTable();
    clearForm();
})

$(document).ready(function(){
    $("#storeSearch").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#storeTable tr").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
    });
});

function clearForm(){
    $('#itemCode').val("");
    $('#itemName').val("");
    $('#inputQTY').val("");
    $('#unitPrice').val("");

    $('#itemCodeS').val("");
    $('#itemNameS').val("");
    $('#qty').val("");
    $('#priceS').val("");

    $('#itemCodeR').val("");
    $('#itemNameR').val("");
}

$('#newModal').on('shown.bs.modal', function() {
    validation('#itemCode','#itemName','#inputQTY','#unitPrice');
});

$('#updateModal').on('shown.bs.modal', function() {
    validation('#itemCodeS','#itemNameS','#qty','#priceS');
});

$('#removeModalStore').on('shown.bs.modal', function() {
    validation('#itemCodeR','#itemNameR');
});

function validation(sCode,sName,sQty,sPrice){
    (() => {
        'use strict'

        $('.c-id').css({display: 'none'});

        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        const forms = document.querySelectorAll('.needs-validation')

        // Loop over them and prevent submission
        Array.from(forms).forEach(form => {
            form.addEventListener('click', event => {

                $(sCode).on('input' , ()=>{
                    var code = $(sCode).val();

                    if (code.startsWith('I00-')) {
                        const numericPart = code.substring(6);

                        if (!(/^\d+$/.test(numericPart))) {
                            $('.s-code').text('Item Code must be minimum 3 digit value followed by I00- format.');
                            $('.s-code').css({ display: 'block' });
                            event.preventDefault();
                            event.stopPropagation();
                        } else {
                            $('.s-code').css({ display: 'none' });
                            $(sCode).css({border:'1px solid green'});
                        }
                    } else {
                        $('.s-code').css({ display: 'block' });
                        $(sCode).css({border:'1px solid red'});
                        event.preventDefault();
                        event.stopPropagation();
                    }
                });
                // emptyInputFields();

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

                $(sQty).on('input' ,()=> {
                    var qty = $(sQty).val();

                    if (qty.length <= 15 && /^[0-9]+$/.test(qty)) {
                        $('.s-qty').css({ display: 'none' });
                        $(sQty).css({ border: '1px solid green' });
                    } else {
                        $('.s-qty').css({ display: 'block' });
                        $(sQty).css({ border: '1px solid red' });
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
            }, false)
        })
    })()
}
