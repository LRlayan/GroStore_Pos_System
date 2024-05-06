
export default class Store{
    constructor(itemCode,itemName,QTYOnHand,unitPrice) {
        this._itemCode = itemCode;
        this._itemName = itemName;
        this._QTYOnHand = QTYOnHand;
        this._unitPrice = unitPrice;
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

    get unitPrice(){
        return this._unitPrice;
    }

    set unitPrice(value){
        this._unitPrice = value;
    }
}