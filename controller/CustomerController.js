import Customer from "../model/Customer.js";
import {customer} from "../db/DB.js"

let clickTableRow = 0;

$('#submitC').on('click' , ()=>{
    let cId = $('#-inputCustomerId').val();
    let cName = $('#_inputCustomerName').val();
    let city = $('#inputCityC').val();
    let tel = $('#inputTelephoneC').val();

    let customerDetail = new Customer(cId,cName,city,tel)
    customer.push(customerDetail)
    loadTable()

    $('#customerTable').on('click', 'tr', function () {

        let idC = $(this).find(".c-id").text()
        let nameC = $(this).find(".c-name").text()
        let cityC = $(this).find(".c-city").text()
        let telC = $(this).find(".c-tel").text()

        clickTableRow = $(this).index()

        $('#inputCustomerIdU').val(idC);
        $('#inputCustomerNameU').val(nameC);
        $('#inputCityU').val(cityC);
        $('#inputTelephoneU').val(telC);
    })
})

function loadTable(){
    $('#customerTable').empty()
    customer.map(function (customerDetails){
        let record = `<tr>
                                  <td class="c-id orderTableBody">${customerDetails.id}</td>  
                                  <td class="c-name orderTableBody">${customerDetails.name}</td>  
                                  <td class="c-city orderTableBody">${customerDetails.city}</td>  
                                  <td class="c-tel orderTableBody">${customerDetails.tel}</td>  
                             </tr>`

        $('#customerTable').append(record)
    })
}

function table() {


}