var mongodb = require('mongodb');
var dbServer = new mongodb.Server('10.3.131.16', 27017);
var db = new mongodb.Db('supermarket', dbServer);
var apiResult = require('./ApiResult.js');

module.exports = {
    insert: function(_collection, _data, _callback){
        db.open(function(error, db){
            if(error){
                _callback(apiResult(false, null, error));
                return false;
            } 

            db.collection(_collection, function(error, collection){
                if(error){
                    _callback(apiResult(false, null, error));
                    return false;
                }
                collection.insert(_data);
                _callback(apiResult(true, _data, '数据插入成功'));

                db.close();
            })
            
        })
    },
    select: function(_collection, _condition, _callback){
        db.open(function(error, db){
            if(error){
                _callback(apiResult(false, null, error));
                return false;
            }
            db.collection(_collection, function(error, collection){
                if(error){
                    _callback(apiResult(false, null, error));
                    return false;
                }
                collection.find(_condition || {}).toArray(function(error, dataset){
                    if(error){
                        _callback(apiResult(false, null, error));
                        return false;
                    }
                    _callback(apiResult(true, dataset));
                });
                db.close();
                
            })
        })
    },
    //数据分页
    find: function(_collection, _condition, _callback){
        db.open(function(error, db){
            if(error){
                _callback(apiResult(false, null, error));
                return false;
            }
            db.collection(_collection, function(error, collection){
                if(error){
                    _callback(apiResult(false, null, error));
                    return false;
                }
                var qty = Number(_condition.qty);
                var pageNo = Number(_condition.pageNo)-1;
                collection.find().limit(qty).skip(qty*pageNo).toArray(function(error, dataset){
                    if(error){
                        _callback(apiResult(false, null, error));
                        return false;
                    }
                    var totalpage = Math.ceil(dataset.data.length)
                    _callback(apiResult(true, dataset, error));
                });
                db.close(); 
                
            })
        })
    },
    update: function(){},
    delete: function(){}
}