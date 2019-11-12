module.exports = {
  presets:[
    ["@babel/env",{
       targets: {
           // esmodules: true,
           edge:"17",
           firefox:"60",
           chrome:"58",
           safari:"11.1",
           ie: "11"
       },
       corejs: {
         version: 3,
         proposals: true
       },
       useBuiltIns:"usage"
    }],
    ["@babel/preset-react",{
         useBuiltIns:true
    }]
  ],
  plugins : [
     ["@babel/plugin-transform-react-jsx", {
       //pragma: "h",    // 这里可配置任意的名称这里h 则1103~1111 virtual dom里面定义h函数
       useBuiltIns:true
     }],
     '@babel/plugin-proposal-class-properties'
  ]
};
