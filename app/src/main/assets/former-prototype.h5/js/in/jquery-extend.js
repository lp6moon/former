(do {
    $.fn.now = function (callback) {
        Array.from(this).forEach(tag => callback(tag));
        return this;
    };

    $.tag = (name, ...rest) => $(`<${name}/>`, ...rest);
});