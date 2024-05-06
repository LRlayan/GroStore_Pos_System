import Customer from "../model/Customer.js";
import {customer} from "../db/DB.js"

$('#submitC').on('click' , ()=>{
    let cId = $('#-inputCustomerId').val();
    let cName = $('#_inputCustomerName').val();
    let city = $('#inputCityC').val();
    let tel = $('#inputTelephoneC').val();

    let customerDetail = new Customer(cId,cName,city,tel)
    customer.push(customerDetail)
    loadTable()
})

function loadTable(){
    $('#customerTable').empty()
    customer.map(function (customerDetails){
        let record = `<tr>
                                  <td class="orderTableBody">${customerDetails.id}</td>  
                                  <td class="orderTableBody">${customerDetails.name}</td>  
                                  <td class="orderTableBody">${customerDetails.city}</td>  
                                  <td class="orderTableBody">${customerDetails.tel}</td>  
                             </tr>`

        $('#customerTable').append(record)
    })
}