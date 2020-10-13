export abstract class ErrorMessagesBase{
    Errors : {[key: number]: string} = {};

    constructor(){
        this.Initialize();
    }
    abstract Initialize() : void;

    hasValue(key: number) : boolean{
        if(typeof this.Errors[key] === "undefined"){
            return false;
        }
        return true;
    }

    getMessage(errorCode : number) : string{
        if(this.hasValue(errorCode)){
            return this.Errors[errorCode];
        }
        return "Nie zarejestrowany błąd. Skontaktuj się z administratorem systemu.";
    }
}