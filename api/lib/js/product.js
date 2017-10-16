// 将头部引入
$(function($){
    // 增加
    var obj = {
        proType:$('#productType').val(),
        proName:$('#productName').val(),
        proDes:$('#productDes').val(),
        proSalePrice:$('#SalePrice').val(),
        proPurPrice:$('#purPrice').val(),
        proBarCode:$('#barCode').val(),
        proSelect:$('#select').val(),
        proQty:1
    };
    // 添加
    $('#addPro').click(function(){
        $.post("http://localhost:88/addProduct", {
            proType:$('#productType').val(),
            proName:$('#productName').val(),
            proDes:$('#productDes').val(),
            proSalePrice:$('#SalePrice').val(),
            proPurPrice:$('#purPrice').val(),
            proBarCode:$('#barCode').val(),
            proSelect:$('#select').val(),
            proQty:1
        }, function(res){
            console.log(res);
            $('tbody').html('');
            showProduct();
        });

    });
    // 删除
    $('#delPro').click(function(){
        $.post("http://localhost:88/delProduct", {
            proType:$('#productType').val(),
            proName:$('#productName').val(),
            proDes:$('#productDes').val(),
            proSalePrice:$('#SalePrice').val(),
            proPurPrice:$('#purPrice').val(),
            proBarCode:$('#barCode').val(),
            proSelect:$('#select').val(),
            proQty:1
        }, function(res){
            console.log(res);
            /*$('tbody').html('');
            showProduct();*/
        });
    });
    // 查询
    $('#selPro').click(function(){

        $.post("http://localhost:88/selectProduct", {
            proType:$('#productType').val(),
            proName:$('#productName').val(),
            proDes:$('#productDes').val(),
            proSalePrice:$('#SalePrice').val(),
            proPurPrice:$('#purPrice').val(),
            proBarCode:$('#barCode').val(),
            proSelect:$('#select').val(),
            proQty:1
        }, function(res){
            console.log(res);
            $('tbody').html('');
            if(res.data.length > 0){
                $.each(res.data, function(idx,item){
                    // console.log(idx,item);
                    var html = `
                        <tr>
                            <th scope="row">${idx+1}</th>
                            <td>${item.proType}</td>
                            <td>${item.proName}</td>
                            <td>${item.proDes}</td>
                            <td>${item.proSalePrice}</td>
                            <td>${item.proPurPrice}</td>
                            <td>${item.proSelect}</td>
                        </tr>
                    `;
                    $('tbody').append(html);
                });
            } else {
                $('tbody').html(res.message);
            }
        });
    });
    
    // 修改
    $('#modPro').click(function(){
        $.post("http://localhost:88/modProduct", {
            proType:$('#productType').val(),
            proName:$('#productName').val(),
            proDes:$('#productDes').val(),
            proSalePrice:$('#SalePrice').val(),
            proPurPrice:$('#purPrice').val(),
            proBarCode:$('#barCode').val(),
            proSelect:$('#select').val(),
            proQty:1
        }, function(res){
            console.log(res);
            /*$('tbody').html('');
            showProduct();*/
        });
    })

    // 所有商品
    function showProduct(){
        $.ajax({
            url:"http://localhost:88/allProduct",
            type:"POST",
            data:{},
            success:function(res){
                console.log(res);
                if(res.data.length > 0){
                    $.each(res.data, function(idx,item){
                        // console.log(idx,item);
                        var html = `
                            <tr>
                                <th scope="row">${idx+1}</th>
                                <td>${item.proType}</td>
                                <td>${item.proName}</td>
                                <td>${item.proDes}</td>
                                <td>${item.proSalePrice}</td>
                                <td>${item.proPurPrice}</td>
                                <td>${item.proSelect}</td>
                            </tr>
                        `;
                        $('tbody').append(html);
                    })
                } else {
                    $('tbody').html(res.message);
                } 
            }
        })
    }
    showProduct();

    // 将数据库的东西显示在value框里
    // 没写完
        
});
