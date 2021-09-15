$( document ).ready(function() {
    for(count = 0; count < 3; count++){
        generate_row();
    }

    $("#add-row").click(function() { 
        t_body = document.getElementById("mass-tbody");
        no_of_rows = t_body.childElementCount;
        next_row = no_of_rows + 1;

        if(no_of_rows < 10){
            generate_row();
        }
        else{
            alert("Sus!");
        }
    });

    $("#submit-all").click(function() {
        if(validate_data()){

        }
        else{

        }
    });
});

function parse_delivery_mode(index){
    delivery_mode = document.getElementById("delivery_mode_" + index).value;

    if(delivery_mode === "Delivered"){
        // Hide the self collect fields
        document.getElementById("driver_name_" + index).style.display = "none";
        document.getElementById("driver_id_" + index).style.display = "none";
        document.getElementById("driver_mobile_" + index).style.display = "none";
        document.getElementById("number_plate_" + index).style.display = "none";
        document.getElementById("trailer_number_" + index).style.display = "none";
        // Show the delivered fields
        document.getElementById("delivery_location_" + index).style.display = "block";
        document.getElementById("route_" + index).style.display = "block";
        document.getElementById("delivered_destination_" + index).style.display = "block";
        document.getElementById("site_contact_" + index).style.display = "block";
    }
    else{      
        // Show the self collect fields  
        document.getElementById("driver_name_" + index).style.display = "block";
        document.getElementById("driver_id_" + index).style.display = "block";
        document.getElementById("driver_mobile_" + index).style.display = "block";
        document.getElementById("number_plate_" + index).style.display = "block";
        document.getElementById("trailer_number_" + index).style.display = "block";
        // Hide the delivered fields
        document.getElementById("destination_" + index).style.display = "none";
        document.getElementById("delivery_location_" + index).style.display = "none";
        document.getElementById("route_" + index).style.display = "none";
        document.getElementById("delivered_destination_" + index).style.display = "none";
        document.getElementById("site_contact_" + index).style.display = "none";
    }
}

function generate_row(){
    t_body = document.getElementById("mass-tbody");
    no_of_rows = t_body.childElementCount;
    next_row = no_of_rows + 1;

    t_row = document.createElement("tr");

    t_row.appendChild(generate_td("count", "", next_row, [], false))

    t_row.appendChild(generate_td("text", "PO Number", "po_number_" + next_row, [], false));
    t_row.appendChild(generate_td("select", "Product Name", "product_name_" + next_row, ["OPC", "PPC"], false));
    t_row.appendChild(generate_td("select", "Product Type", "product_type_" + next_row, ["Bagged", "Bulk"], false));
    t_row.appendChild(generate_td("number", "Quantity", "quantity_" + next_row, [], false));
    t_row.appendChild(generate_td("date", "Delivery Date", "delvery_date_" + next_row, [], false));
    t_row.appendChild(generate_td("select", "Delivery Mode", "delivery_mode_" + next_row, ["Self Collect", "Delivered"], false));

    // Self Collect fields
    t_row.appendChild(generate_td("text", "Driver Name", "driver_name_" + next_row, [], false));
    t_row.appendChild(generate_td("text", "Driver ID", "driver_id_" + next_row, [], false));
    t_row.appendChild(generate_td("text", "Driver Mobile", "driver_mobile_" + next_row, [], false));
    t_row.appendChild(generate_td("text", "Number Plate", "number_plate_" + next_row, [], false));
    t_row.appendChild(generate_td("text", "Trailer Number", "trailer_number_" + next_row, [], false));
    t_row.appendChild(generate_td("text", "Destination", "destination_" + next_row, [], false));

    // Delivered Fields
    t_row.appendChild(generate_td("text", "Delivery Location", "delivery_location_" + next_row, [], true));
    t_row.appendChild(generate_td("text", "Route", "route_" + next_row, [], true));
    t_row.appendChild(generate_td("text", "Destination", "delivered_destination_" + next_row, [], true));
    t_row.appendChild(generate_td("text", "Site Contact Mobile", "site_contact_" + next_row, [], true));

    t_row.setAttribute("id", "trow_" + next_row);

    t_body.appendChild(t_row);
}

function generate_td(input_type, hint, id, elements, is_hidden){
    td = document.createElement("td");

    if(input_type === "text" || input_type === "date" || input_type === "number"){
        td.appendChild(generate_text_input(input_type, hint, id, is_hidden));
    }
    else if(input_type === "select"){
        td.appendChild(generate_drop_down(elements, id, is_hidden));
    }
    else if(input_type === "count"){
        td.appendChild(document.createTextNode(id));
    }

    return td;
}

function generate_text_input(input_type, hint, id, is_hidden){
    text_input = document.createElement("input");
    text_input.setAttribute('type', input_type);
    text_input.setAttribute('placeholder', hint);
    text_input.setAttribute('name', id);
    text_input.setAttribute('id', id);

    if(is_hidden){
        text_input.classList.add("hidden_elem");
    }

    text_input = input_styling(text_input);
    return text_input;
}

function generate_drop_down(elements, id, is_hidden){
    select = document.createElement("select");
    select.id = id;
    select.onchange = function(){
        parse_delivery_mode(id.split("_").at(-1));
    }

    for (i = 0; i < elements.length; i++) {
        option = document.createElement("option");
        option.value = elements[i];
        option.text = elements[i];
        select.appendChild(option);
    }
    
    if(is_hidden){
        select.classList.add("hidden_elem");
    }

    select = input_styling(select);
    return select;
}

function input_styling(input_element){
    input_element.classList.add("input-elem");
    return input_element;
}

function validate_data(){    
    t_body = document.getElementById("mass-tbody");
    orders_dict = {}
    children_count = t_body.childElementCount;

    for (count = 1; count <= children_count; count++) {
        key = count.toString();
        current_order = get_order(count);
        validate_order(current_order, count);
    }
}

function get_order(count){
    current_order = {};

    current_order['pono'] = document.getElementById("po_number_" + count).value;
    current_order['productname'] = document.getElementById("product_name_" + count).value;
    current_order['producttype'] = document.getElementById("product_type_" + count).value;
    current_order['qty'] = document.getElementById("quantity_" + count).value;
    current_order['deliverydate'] = document.getElementById("delvery_date_" + count).value;

    delivery_mode = document.getElementById("delivery_mode_" + count).value;
    current_order['deliverymode'] = delivery_mode;

    if(delivery_mode === "Self Collect"){
        current_order['deliverymode'] = document.getElementById("driver_name_" + count).value;
        current_order['driverid'] = document.getElementById("driver_id_" + count).value;
        current_order['drivermobile'] = document.getElementById("driver_mobile_" + count).value;
        current_order['truckdetails'] = document.getElementById("number_plate_" + count).value;
        current_order['trailerno'] = document.getElementById("trailer_number_" + count).value;
        current_order['loctn'] = document.getElementById("destination_" + count).value;
    }
    else if(delivery_mode === "Delivered"){
        current_order['shipcode'] = document.getElementById("delivery_location_" + count).value;
        current_order['routecode'] = document.getElementById("route_" + count).value;
        current_order['loctn'] = document.getElementById("delivered_destination_" + count).value;
        current_order['sitecontact'] = document.getElementById("site_contact_" + count).value;
    }

    return current_order;
}

function validate_order(order, count){
    console.dir(order);
    order_has_error = false;
    error_message = "";

    if(order["pono"] === "" || order["qty"] === ""){
        order_has_error = true;
        error_message += "PO Number Cannot be empty";
    }

    if(order_has_error){
        document.getElementById("trow_" + count).classList.add("order-error");
    }
}
