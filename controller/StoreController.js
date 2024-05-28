import Store from "../model/Store.js";
import {customer, store} from "../db/DB.js"

let clickTableRow = 0;

let checkCode = false;
let checkName = false;
let checkQTY = false;
let checkPrice = false;

let code = $('#itemCodeS').val()
let itemName = $('#itemNameS').val()
let qty = $('#qty').val()
let price = $('#priceS').val()

$('#submitStore').on('click' , ()=>{
    $('#submitStore').prop('disabled' , true);
    checkCode = false;
    checkName = false;
    checkQTY = false;
    checkPrice = false;

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

    $('#updateS').prop('disabled' , true);
})

$('#deleteS').on('click',()=>{
    store.splice(clickTableRow , 1);

    $('#selectItemCode').empty();

    for (let i = 0; i < store.length; i++) {
        $('#selectItemCode').append($('<option>').text(store[i].itemCode));
    }

    $('#updateS').prop('disabled' , true);
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
    $('#submitStore').prop('disabled' , true);
    validation('#itemCode','#itemName','#inputQTY','#unitPrice','#submitStore');
});

$('#updateModal').on('shown.bs.modal', function() {
    checkEmptyFieldUpdateModal('#updateS');
    validation('#itemCodeS','#itemNameS','#qty','#priceS','#updateS');
});

$('#removeModalStore').on('shown.bs.modal', function() {
    checkEmptyFieldRemoveModal('#deleteS');
    validation('#itemCodeR','#itemNameR','','','#deleteS');
});

function checkEmptyFieldUpdateModal(btn){
    code = $('#itemCodeS').val();
    itemName = $('#itemNameS').val();
    qty = $('#qty').val();
    price = $('#priceS').val();

    if (code == '' && itemName == '' && qty == '' && price == ''){
        $(btn).prop('disabled' , true);
    }else {
        $(btn).prop('disabled' , false);

        checkCode = true;
        checkName = true;
        checkQTY = true;
        checkPrice = true;
    }
}

function checkEmptyFieldRemoveModal(btn){
    code = $('#itemCodeS').val();
    itemName = $('#itemNameS').val();

    if (code == '' && itemName == ''){
        $(btn).prop('disabled' , true);
    }else {
        $(btn).prop('disabled' , false);

        checkCode = true;
        checkName = true;
        checkQTY = true;
        checkPrice = true;
    }
}

function validation(sCode,sName,sQty,sPrice,btnId){
    (() => {
        'use strict'

        $('.s-code').css({display: 'none'});

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
                            checkCode = false;
                        } else {
                            $('.s-code').css({ display: 'none' });
                            $(sCode).css({border:'1px solid green'});
                            checkCode = true;
                        }
                    } else {
                        $('.s-code').css({ display: 'block' });
                        $(sCode).css({border:'1px solid red'});
                        event.preventDefault();
                        event.stopPropagation();
                        checkCode = false;
                    }
                    checkEmptyInputFields(checkCode,checkName,checkQTY,checkPrice,btnId);
                });

                $(sName).on('input' ,()=>{
                    var name = $(sName).val().trim();
                    if (name.length >= 5 && name.length <= 20 && /^[a-zA-Z ]+$/.test(name)) {
                        $('.s-name').css({ display: 'none' });
                        $(sName).css({ border: '1px solid green' });
                        checkName = true;
                    } else {
                        $('.s-name').css({ display: 'block' });
                        $(sName).css({ border: '1px solid red' });
                        checkName = false;
                    }
                    checkEmptyInputFields(checkCode,checkName,checkQTY,checkPrice,btnId);
                });

                $(sQty).on('input' ,()=> {
                    var qty = $(sQty).val();

                    if (qty.length <= 15 && /^[0-9]+$/.test(qty)) {
                        $('.s-qty').css({ display: 'none' });
                        $(sQty).css({ border: '1px solid green' });
                        checkQTY = true;
                    } else {
                        $('.s-qty').css({ display: 'block' });
                        $(sQty).css({ border: '1px solid red' });
                        checkQTY = false;
                    }
                    checkEmptyInputFields(checkCode,checkName,checkQTY,checkPrice,btnId);
                });

                $(sPrice).on('input' ,()=> {
                    var price = $(sPrice).val();

                    if (price.length <= 10 && /^[0-9.]+$/.test(price)) {
                        $('.s-price').css({ display: 'none' });
                        $(sPrice).css({ border: '1px solid green' });
                        checkPrice = true;
                    } else {
                        $('.s-price').css({ display: 'block' });
                        $(sPrice).css({ border: '1px solid red' });
                        checkPrice = false;
                    }
                    checkEmptyInputFields(checkCode,checkName,checkQTY,checkPrice,btnId);
                });

                $(btnId).on('click',()=>{
                    clearBorderColor(sCode,sName,sQty,sPrice);
                })
            }, false)
        })
    })()
}

function checkEmptyInputFields(sCode,sName,sQTY,sPrice,btnId){

    if (sCode && sName && sQTY && sPrice){
        $(btnId).prop('disabled' , false);
    }else {
        $(btnId).prop('disabled' , true);
    }
}

function clearBorderColor(code,name,qty,price){
    $(code).css({ border: '1px solid #cfcfcf'});
    $(name).css({ border: '1px solid #cfcfcf'});
    $(qty).css({ border: '1px solid #cfcfcf'});
    $(price).css({ border: '1px solid #cfcfcf'});
}

$('#purchaseBtn').on('click',function (){

    let orderQTY = $('#orderQTYP').val();
    let code = $('#selectItemCode').val();

    store.forEach((item) => {
        if (item.itemCode === code) {
            item.QTYOnHand -= orderQTY;
        }
    });

    loadTable();
})
