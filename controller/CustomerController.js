import Customer from "../model/Customer.js";
import {customer} from "../db/DB.js"

let clickTableRow = 0;
$('#submitC').prop('disabled' , true);
emptyInputFields()
validation()
$('#submitC').on('click' , ()=>{
    let cId = $('#-inputCustomerId').val();
    let cName = $('#_inputCustomerName').val();
    let city = $('#inputCityC').val();
    let tel = $('#inputTelephoneC').val();

    let customerDetail = new Customer(cId,cName,city,tel)
    customer.push(customerDetail)
    loadTable()

    $('#selectCustomerId').append($('<option>').text(cId)); // place order item code comboBox set item code

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

        $('#inputCustomerId').val(idC);
        $('#inputCustomerName').val(nameC);
    })
     clearForm()
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

$('#updateC').on('click' , ()=>{
    let cId = $('#inputCustomerIdU').val()
    let cName = $('#inputCustomerNameU').val()
    let cCity = $('#inputCityU').val()
    let cTel = $('#inputTelephoneU').val()

    let cus = customer[clickTableRow]
    cus.id = cId
    cus.name = cName
    cus.city = cCity
    cus.tel = cTel

    loadTable()
    clearForm()
})

$('#deleteC').on('click',()=>{
    customer.splice(clickTableRow , 1)
    loadTable()
     clearForm()
})

$(document).ready(function(){
    $("#inputSearch").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#customerTable tr").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
});

function clearForm(){
    $('#-inputCustomerId').val("")
    $('#_inputCustomerName').val("")
    $('#inputCityC').val("")
    $('#inputTelephoneC').val("")

    $('#inputCustomerIdU').val("")
    $('#inputCustomerNameU').val("")
    $('#inputCityU').val("")
    $('#inputTelephoneU').val("")

    $('#inputCustomerId').val("")
    $('#inputCustomerName').val("")
}

function validation(){
    (() => {
         'use strict'
        var increase = 0;

         // Fetch all the forms we want to apply custom Bootstrap validation styles to
         const forms = document.querySelectorAll('.needs-validation')

         // Loop over them and prevent submission
         Array.from(forms).forEach(form => {
            form.addEventListener('change', event => {
               if (!form.checkValidity()) {
                   // event.preventDefault()
                   // event.stopPropagation()
                   increase++
                   console.log(increase)
               }

                form.classList.add('was-validated')
                emptyInputFields()
            }, false)
         })
    })()
}

function emptyInputFields(){

    var id = $('#-inputCustomerId').val()
    var name = $('#_inputCustomerName').val()
    var city = $('#inputCityC').val()
    var tel = $('#inputTelephoneC').val()

   if (id !== '' && name !== '' && city !== '' && tel !== ''){
       $('#submitC').prop('disabled' , false);
   }else {
       $('#submitC').prop('disabled' , true);
   }




}