class Component {
    constructor(){
        if (this.constructor === Component){
            throw new error("Abstract class cant't be initialized")
        }
    }

    // Must be implemented
    render(){

    }

}