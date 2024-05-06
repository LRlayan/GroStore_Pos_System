import Store from "../model/Store.js";
import {store} from "../db/DB.js"

let clickTableRow = 0;

$('#submitStore').on('click' , ()=>{
    let itemCode = $('#itemCode').val();
    let itemName = $('#itemName').val();
    let QTYOnHand = $('#inputQTY').val();
    let unitPrice = $('#unitPrice').val();

    let storeDetail = new Store(itemCode,itemName,QTYOnHand,unitPrice)
    store.push(storeDetail)
    loadTable()

    $('#storeTable').on('click', 'tr', function () {

        let code = $(this).find(".s-code").text()
        let name = $(this).find(".s-name").text()
        let qty = $(this).find(".s-qty").text()
        let price = $(this).find(".s-price").text()

        clickTableRow = $(this).index()

        $('#itemCodeS').val(code);
        $('#itemNameS').val(name);
        $('#inputCity').val(qty);
        $('#priceS').val(price);

        $('#itemCodeR').val(code);
        $('#itemNameR').val(name);
    })
    clearForm()
})

function loadTable(){
    $('#storeTable').empty()
    store.map(function (storeDetails){
        let record = `<tr>
                                  <td class="s-code orderTableBody">${storeDetails.itemCode}</td>  
                                  <td class="s-name orderTableBody">${storeDetails.itemName}</td>  
                                  <td class="s-qty orderTableBody">${storeDetails.QTYOnHand}</td>  
                                  <td class="s-price orderTableBody">${storeDetails.unitPrice}</td>  
                             </tr>`
        $('#storeTable').append(record)
    })
}

function clearForm(){
    $('#itemCode').val("")
    $('#itemName').val("")
    $('#inputQTY').val("")
    $('#unitPrice').val("")
}

