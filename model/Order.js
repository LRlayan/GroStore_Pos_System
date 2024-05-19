export default class Order{
    constructor(orderId,date,cusName,city,tel,itemCode,itemName,orderQTY,discount,price) {
        this._orderId = orderId;
        this._date = date;
        this._cusName = cusName;
        this._city = city;
        this._tel = tel;
        this._itemCode = itemCode;
        this._itemName = itemName;
        this._orderQTY = orderQTY;
        this._discount = discount;
        this._price = price;
    }

    get orderId(){
        return this._orderId;
    }
    set orderId(value){
        return this._orderId = value;
    }

    get date(){
        return this._date;
    }

    set date(value){
        return this._date = value;
    }

    get cusName(){
        return this._cusName;
    }

    set cusName(value){
        this._cusName = value;
    }

    get cusCity(){
        return this._city;
    }

    set cusCity(value){
        this._city = value;
    }

    get cusTel(){
        return this._tel;
    }

    set cusTel(value){
        this._tel = value;
    }

    get itemCode(){
        return this._itemCode;
    }

    set itemCode(value){
        this._itemCode = value;
    }

    get itemName(){
        return this._itemName;
    }

    set itemName(value){
        this._itemName = value;
    }

    get QTYOnHand(){
        return this._QTYOnHand;
    }

    set QTYOnHand(value){
        this._QTYOnHand = value;
    }

    get orderQTY(){
        return this._orderQTY;
    }

    set orderQTY(value){
        this._orderQTY = value;
    }

    get price(){
        return this._price;
    }

    set price(value){
        return this._price = value;
    }

    get discount(){
        return this._discount;
    }

    set discount(value){
        this._discount = value;
    }
}