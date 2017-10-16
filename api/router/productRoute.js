var db = require('../DBHelper.js');
var bodyparser = require('body-parser');
var urlencode = bodyparser.urlencoded({extended: false});

var apiResult = require('../ApiResult.js');

module.exports = {
    Register: function(app){
        app.post("/addProduct", urlencode, function(request, response){
            // console.log(request.body);
            db.select("product", {proBarCode: request.body.proBarCode}, function(result){
                if(!result.status){
                    return false;
                }
                if(result.data.length > 0){
                    response.send(apiResult(false, null, "该商品已存在"));
                    // db.update("product", request.body.proQty, function(result){
                    //     response.send(apiResult(true, request.body, "添加成功"));
                    // });
                } else {
                    db.insert("product", request.body, function(result){
                        // console.log(result);
                        response.send(apiResult(true, request.body, "添加成功"));
                    });
                }
            })
            
        });
        
        app.post("/selectProduct", urlencode, function(request, response){
            console.log(request.body);
            var obj = {};
            for(var key in request.body){
                if(request.body[key]){
                    var value = request.body[key];
                    obj[key] = value;
                }
            }
            // console.log(obj);
            db.select("product", obj, function(result){
                // console.log(request.body);
                // console.log(result);
                if(!result.status){
                    response.send(apiResult(false, null, error));
                    return false;
                }
                if(result.data.length > 0 ){
                    // console.log(result.data);
                    response.send(apiResult(true, result.data, "查询成功"));
                } else {
                    response.send(apiResult(false, null, "没有该商品，请重新查询"));
                }
            })
        });
        
        app.post("/allProduct", urlencode, function(request, response){
            db.select("product", {}, function(result){
                // console.log(result);
                if(!result.status){
                    response.send(apiResult(false, null, "数据请求错误"));
                    return false;
                }
                if(result.data.length > 0){
                    response.send(apiResult(true, result.data, "仓库所有商品"));
                } else {
                    response.send(apiResult(false, null, "仓库里没有商品了"))
                }
                
            })
        })
    }
}