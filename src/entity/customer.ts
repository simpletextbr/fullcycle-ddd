// UMA ENTIDATE POR PADRÃO DEVE SE AUTO-VALIDAR GARANTINDO SUA CONSISTÊNCIA 
class Customer {
    _id: string;
    _name: string;
    _address: string = "";
    _active: boolean = false;

    constructor(id: string, name: string) {
        this._id = id;
        this._name = name;
        this.validate();
    }

    validate() {
        if (!this._name || this._name.length === 0) throw new Error("Name is required")
        if (!this._id || this._id.length === 0) throw new Error("ID is required")
    }
    
    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get address(): string {
        return this._address;
    }

    changeName(name: string) {
        this._name = name;
        this.validate();
    }

    activate(){
        if(!this._address || this._address.length === 0) 
            throw new Error("Address is mandatory to activate a customer")

        this._active = true;
    }

    deactivate(){
        this._active = false;
    }
}

