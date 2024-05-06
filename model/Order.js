export default class Order{
    constructor(orderId,cusId,cusName,city,tel,itemCode,itemName,QTYOnHand,orderQTY,price,subTotal,discount,balance) {
        this._orderId = orderId;
        this._cusId = cusId;
        this._cusName = cusName;
        this._city = city;
        this._tel = tel;
        this._itemCode = itemCode;
        this._itemName = itemName;
        this._QTYOnHand = QTYOnHand;
        this._orderQTY = orderQTY;
        this._price = price;
        this._subTotal = subTotal;
        this._discount = discount;
        this._balance = balance;
    }

    get orderId(){
        return this._orderId;
    }
    set orderId(value){
        return this._orderId = value;
    }
    get cusId(){
        return this._cusId;
    }

    set cusId(value){
        this._cusId = value;
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

    get subTotal(){
        return this._subTotal;
    }

    set subTotal(value){
        this._subTotal = value
    }

    get balance(){
        return this._balance;
    }

    set balance(value){
        this._balance = value
    }
}