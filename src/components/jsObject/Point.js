//用构造函数定义对象的非函数属性
// function PointMap(name){
//     this.name=name;
//     this.arr=new Array('a','b');
// }
// //用原型方式定义对象的方法
// Obj.prototype.say=function(){
//     console.log("PointMap");
// }
//生成对象
// var PointMap = new PointMap('xxx');
export default class PointMap {
    constructor(name, url) {
      this.name = name;
      this.url = url;
      this.posnts = [];
    }
    setPoint(posnts){
        this.posnts = posnts
    }
    getName(){
        return this.name
    }
  }
// var pointMap = new PointMap("p","urlp")