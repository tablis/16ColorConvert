
var strColor = "#000F73#800000#0A7A31#4E0096#307D9C#B04F00#2F7500#EEED26#7D0055#998200#388E8E#ADB8E6#CACA72#46AD8A#CD9B1D#D87093#BC8F8F#33A1C9#228B22#FF69B4#DDDD79#4A3AAD#FFC0CB#43CD80#98CBBB";

//颜色转换
var Color = function () {
    if (!(this instanceof Color)) {
        var color = new Color();
        color._init.apply(color, arguments);
        return color;
    }
    if (arguments.length) {
        this._init.apply(this, arguments);
    }
}
//设置get，set方法
var methods = ["red", "green", "blue", "colorValue"];
var defineSetGetMethod = function (fn, methods) {
    var fnPrototype = fn.prototype;
    for (var i = 0; i < methods.length; i++) {
        var methodName = methods[i].charAt(0).toLocaleUpperCase() + methods[i].substring(1);
        fn.prototype['set' + methodName] = new Function("value", "this." + methods[i] + "= value;");
        fn.prototype['get' + methodName] = new Function("return this." + methods[i] + ";");
        fn.prototype['toString'] = function () {
            return this.red / 255 + "," + this.green / 255 + "," + this.blue / 255;
        }// new Function('return ("+this.red/255+","+this.green/255+","+this.blue/255+");');
    }
};
defineSetGetMethod(Color, methods);
//扩展函数的实例方法
var extend = function (fn, option) {
    var fnPrototype = fn.prototype;
    for (var i in option) {
        fnPrototype[i] = option[i];
    }
};
extend(Color, {
    _init: function () {
        if (arguments.length == 3) {
            this.red = arguments[0];
            this.green = arguments[1];
            this.blue = arguments[2];
            this.getColorValue();
        } else {
            var colorValue = arguments[0].replace(/^\#{1}/, "");
            if (colorValue.length == 3) {
                colorValue = colorValue.replace(/(.)/g, '$1$1');
            }
            this.red = parseInt('0x' + colorValue.substring(0, 2), 16);
            this.green = parseInt('0x' + colorValue.substring(2, 4), 16);
            this.blue = parseInt('0x' + colorValue.substring(4), 16);
            this.colorValue = "#" + colorValue;
        }
    },
    getColorValue: function () {
        if (this.colorValue) {
            return this.colorValue;
        }
        var hR = this.red.toString(16);
        var hG = this.green.toString(16);
        var hB = this.blue.toString(16);
        return this.colorValue = "#" + (this.red < 16 ? ("0" + hR) : hR) + (this.green < 16 ? ("0" + hG) : hG) + (this.blue < 16 ? ("0" + hB) : hB);
    }
});
var data = process.argv.splice(2);
var arrColor = strColor.split("#");

for (var i = 0, lenI = arrColor.length; i < lenI; i++) {
    // console.log("arrColor[i]:" + arrColor[i]);
    if (arrColor[i]){
        var newStr = Color("#" + arrColor[i]);
        console.log( newStr.toString());
    }
}