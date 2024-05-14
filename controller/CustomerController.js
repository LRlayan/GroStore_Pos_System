import Customer from "../model/Customer.js";
import {customer} from "../db/DB.js"

let clickTableRow = 0;
$('#submitC').prop('disabled' , true);
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

        $('#c-id').css({display: 'none'});

         // Fetch all the forms we want to apply custom Bootstrap validation styles to
         const forms = document.querySelectorAll('.needs-validation')

         // Loop over them and prevent submission
         Array.from(forms).forEach(form => {
            form.addEventListener('click', event => {

                $('#-inputCustomerId').on('input' , ()=>{
                    var id = $('#-inputCustomerId').val();

                    if (id.startsWith('C00-')) {
                        const numericPart = id.substring(6);

                        if (!(/^\d+$/.test(numericPart))) {
                            $('#c-id').text('Customer ID must be minimum 3 digit value followed by C00- format.');
                            $('#c-id').css({ display: 'block' });
                            event.preventDefault();
                            event.stopPropagation();
                        } else {
                            $('#c-id').css({ display: 'none' });
                            $('#-inputCustomerId').css({border:'1px solid green'});
                        }
                    } else {
                        $('#c-id').css({ display: 'block' });
                        $('#-inputCustomerId').css({border:'1px solid red'});
                        event.preventDefault();
                        event.stopPropagation();
                    }
                });
                emptyInputFields();

                $('#_inputCustomerName').on('input' ,()=>{
                    var name = $('#_inputCustomerName').val().trim();
                    if (name.length >= 5 && name.length <= 20 && /^[a-zA-Z ]+$/.test(name)) {
                        $('#c-name').css({ display: 'none' });
                        $('#_inputCustomerName').css({ border: '1px solid green' });
                    } else {
                        $('#c-name').css({ display: 'block' });
                        $('#_inputCustomerName').css({ border: '1px solid red' });
                    }
                });

                $('#inputCityC').on('input' ,()=> {
                    var city = $('#inputCityC').val();

                    if (city.length <= 25 && /^[a-zA-Z]+$/.test(city)) {
                        $('#c-city').css({ display: 'none' });
                        $('#inputCityC').css({ border: '1px solid green' });
                    } else {
                        $('#c-city').css({ display: 'block' });
                        $('#inputCityC').css({ border: '1px solid red' });
                    }
                });

                $('#inputTelephoneC').on('input' ,()=> {
                    var tel = $('#inputTelephoneC').val();

                    if (tel.length <= 10 && /^[0-9]+$/.test(tel)) {
                        $('#c-tel').css({ display: 'none' });
                        $('#inputTelephoneC').css({ border: '1px solid green' });
                    } else {
                        $('#c-tel').css({ display: 'block' });
                        $('#inputTelephoneC').css({ border: '1px solid red' });
                    }
                });
            }, false)
         })
    })()
}

function emptyInputFields(){

    var id = $('#-inputCustomerId').val();
    var name = $('#_inputCustomerName').val();
    var city = $('#inputCityC').val();
    var tel = $('#inputTelephoneC').val();

   if (id !== '' && name !== '' && city !== '' && tel !== ''){
       $('#submitC').prop('disabled' , false);
   }else {
       $('#submitC').prop('disabled' , true);
   }
}