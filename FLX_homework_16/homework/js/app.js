function assign(target){
    if(target === undefined || target === null){
        throw new TypeError('Cannot convert first argument to object')
    }

    target = Object(target);

    for(var index=1; index < arguments.length; index++){
        var source = arguments[index];

        if(source !== null){
            for(var key in source){
                if(Object.prototype.hasOwnProperty.call(source, key)){
                    target[key] = source[key]
                }
            }
        }
    }
    return target;
}
