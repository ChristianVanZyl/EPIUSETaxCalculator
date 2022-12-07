export class Factory {
    constructor(next){
        if(next){
            this.map = next.map;
        }else{
            this.map = new Map();
        }
    }

    addToClassCatalogue(className, classComp){
        this.map.set(className, classComp)
    }

    create(className, ...args){
        return new (this.map.get(className)(...args))
    }

}
