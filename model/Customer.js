
export default class Customer{
    constructor(id,name,city,tel) {
        this._id = id;
        this._name = name;
        this._city = city;
        this._tel = tel;
    }

    get id(){
        return this._id;
    }

    set id(value){
        this._id = value;
    }

    get name(){
        return this._name;
    }

    set name(value){
        this._name = value;
    }

    get city(){
        return this._city;
    }

    set city(value){
        this._city = value;
    }

    get tel(){
        return this._tel;
    }

    set tel(value){
        this._tel = value;
    }
}