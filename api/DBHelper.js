var mongodb = require('mongodb');
// var dbServer = new mongodb.Server('10.3.131.16', 27017);
 var dbServer = new mongodb.Server('localhost', 27017);
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
                _callback(apiResult(true, _data, message));

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
                    console.log(dataset);
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
    update: function(){},
    delete: function(){}
}