/* =====================
# Lab 2, Part 2 — Underscore Each Function

## Introduction

Up to this point, we have used Javascript's for loop to loop through data. Underscore's _.each function provides us with an easy to read, simple way to accomplish the same goal.

## Task

Find two previous labs that use for loops. Rewrite these labs to use _.each.

## Syntax
You can see an example of how to use ._each in the underscore documentation: http://underscorejs.org/#each and in the code below.

var myArray = [1, 10, 100, 1000];

_.each(myArray, function(value, key, list) {
  console.log(value, key, list);
});
===================== */

// FizzBuzz Underscore
myArray = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];

_.each(myArray,function(i){
  if((i%3===0)&(i%5===0)){
    console.log("FizzBuzz");
  }
  else if(i%5===0){
    console.log("Buzz");
  }
  else if(i%3===0){
    console.log("Fizz");
  }
  else{
    console.log(i);
  }
});

// Fibonacci Underscore
myArray2 = [2,3,4,5,6,7,8,9,10,11,12,13,14,15];
var Fibonacci = [];
Fibonacci[0]=1;
console.log(Fibonacci[0]);
Fibonacci[1]=2;
console.log(Fibonacci[1]);
_.each(myArray2,function(i){
  Fibonacci[i]=Fibonacci[i-1]+Fibonacci[i-2];
  console.log(Fibonacci[i]);
});
