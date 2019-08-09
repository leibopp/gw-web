//如何在js中创建一个对象

//1，工厂模式

function factoryDode() {
  var O = obj;
  O.protype1 = protype1;
  O.protype2= protype2;
  return O;
}

var production1 = factoryDode();
var production2 = factoryDode();

//2，构造函数模式 缺点 方法new的同时会被同时创建

function ConstructionMode() {
   this.protype1 = value1;
   this.protype2 = value2;
}

var constuction1 = new constructionMode();

//new 实现原理
var newObj = {};//1，创建新对象
var bindConstruction = ConstructionMode.bind(newObj);// 2 构造函数作用域指向该对象
bindConstruction()//3 执行构造函数中的代码
return newObj; //4返回新的对象

//3,原型模式     //缺点  实例共享属性和方法 会污染父类
 
function ProtyMode() {
   
}

ProtyMode.prototype.props1 = value1;
ProtyMode.prototype.props2 = value2;
// 真正的原型是在构造函数上 不是在new出来的实例上，



//---------------------------------------

var newObj = {};
newObj.__proto__ = ConstuctionFn.prototype;
return newObj;

////等价于上面
const newObj = Object.create(ConstuctionFn.prototype);
return newObj;
//---------------------------------------


// 4 组合方式

function Person (){
  this.props =value;
}
Person.prototype = {
  eat(){
    
  }
}











