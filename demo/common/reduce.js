
var arr = [10, 120, 1000];

var reducer = function add(previousValue, currentValue, index, arr) { 
	
	console.log(currentValue);	

	//console.log(arr);	
	//console.log(index);	
	//console.log(previousValue);	
	return previousValue + currentValue;
	};

var total = arr.reduce(reducer, 0);//this '0' is initialValue which is assigned to previousValue
console.log(total);
