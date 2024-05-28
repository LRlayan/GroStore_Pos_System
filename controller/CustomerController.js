import Customer from "../model/Customer.js";
import {customer} from "../db/DB.js"

let clickTableRow = 0;

let checkId = false;
let checkName = false;
let checkCity = false;
let checkTel = false;

$('#submitC').on('click' , ()=>{

    $('#submitC').prop('disabled' , true);

    checkId = false;
    checkName = false;
    checkCity = false;
    checkTel = false;

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

$('#newModalCus').on('shown.bs.modal', function() {
    validation('#-inputCustomerId','#_inputCustomerName','#inputCityC','#inputTelephoneC','#submitC')
});

$('#updateModalCus').on('shown.bs.modal', function() {
    checkEmptyField('#updateC');
    validation('#inputCustomerIdU','#inputCustomerNameU','#inputCityU','#inputTelephoneU','#updateC')
});

$('#removeModal').on('shown.bs.modal', function() {
    validation('#inputCustomerId','#inputCustomerName','','','#deleteC')
});

function checkEmptyField(btn){
    var c_id = $('#inputCustomerIdU').val();
    var c_name = $('#inputCustomerNameU').val();
    var c_city = $('#inputCityU').val();
    var c_tel = $('#inputTelephoneU').val();

     if (c_id == '' && c_name == '' && c_city == '' && c_tel == ''){
         $(btn).prop('disabled' , true);
     }else {
         $(btn).prop('disabled' , false);

         checkId = true;
         checkName = true;
         checkCity = true;
         checkTel = true;
     }
}

function validation(cId,cName,cCity,cTel,btnId){
    (() => {
         'use strict'

         // Fetch all the forms we want to apply custom Bootstrap validation styles to
         const forms = document.querySelectorAll('.needs-validation')

         // Loop over them and prevent submission
         Array.from(forms).forEach(form => {
            form.addEventListener('click', event => {

                $(cId).on('input' , ()=>{
                    var id = $(cId).val();

                    if (id.startsWith('C00-')) {
                        const numericPart = id.substring(6);

                        if (!(/^\d+$/.test(numericPart))) {
                            $('.c-id').text('Customer ID must be minimum 3 digit value followed by C00- format.');
                            $('.c-id').css({ display: 'block' });
                            $(cId).css({border:'1px solid red'});
                            event.preventDefault();
                            event.stopPropagation();
                            checkId = false;
                        } else {
                            $('.c-id').css({ display: 'none' });
                            $(cId).css({border:'1px solid green'});
                            checkId = true;
                        }
                    } else {
                        $('.c-id').css({ display: 'block' });
                        $(cId).css({border:'1px solid red'});
                        event.preventDefault();
                        event.stopPropagation();
                        checkId = false;
                    }
                    checkEmptyInputFields(checkId,checkName,checkCity,checkTel,btnId);
                });

                $(cName).on('input' ,()=>{
                    var name = $(cName).val().trim();
                    if (name.length >= 5 && name.length <= 20 && /^[a-zA-Z ]+$/.test(name)) {
                        $('.c-name').css({ display: 'none' });
                        $(cName).css({ border: '1px solid green' });
                        checkName = true;
                    } else {
                        $('.c-name').css({ display: 'block' });
                        $(cName).css({ border: '1px solid red' });
                        checkName = false;
                    }
                    checkEmptyInputFields(checkId,checkName,checkCity,checkTel,btnId);
                });

                $(cCity).on('input' ,()=> {
                    var city = $(cCity).val();

                    if (city.length <= 25 && /^[a-zA-Z]+$/.test(city)) {
                        $('.c-city').css({ display: 'none' });
                        $(cCity).css({ border: '1px solid green' });
                        checkCity = true;
                    } else {
                        $('.c-city').css({ display: 'block' });
                        $(cCity).css({ border: '1px solid red' });
                        checkCity = false;
                    }
                    checkEmptyInputFields(checkId,checkName,checkCity,checkTel,btnId);
                });

                $(cTel).on('input' ,()=> {
                    var tel = $(cTel).val();

                    if (tel.length === 10 && /^[0-9]+$/.test(tel)) {
                        $('.c-tel').css({ display: 'none' });
                        $(cTel).css({ border: '1px solid green' });
                        checkTel = true;
                    } else {
                        $('.c-tel').css({ display: 'block' });
                        $(cTel).css({ border: '1px solid red' });
                        checkTel = false;
                    }
                    checkEmptyInputFields(checkId,checkName,checkCity,checkTel,btnId);
                });

                $(btnId).on('click',()=>{
                    clearBorderColor(cId,cName,cCity,cTel);
                })
            }, false)
         })
    })()
}

function checkEmptyInputFields(cId,cName,cCity,cTel,btnId){

    if (cId && cName && cCity && cTel){
        $(btnId).prop('disabled' , false);
    }else {
        $(btnId).prop('disabled' , true);
    }
}

function clearBorderColor(id,name,city,tel){
    $(id).css({ border: '1px solid #cfcfcf'});
    $(name).css({ border: '1px solid #cfcfcf'});
    $(city).css({ border: '1px solid #cfcfcf'});
    $(tel).css({ border: '1px solid #cfcfcf'});
}