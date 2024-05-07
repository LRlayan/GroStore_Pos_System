import Order from "../model/Order.js";
import {orders,store,customer} from "../db/DB.js"

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
