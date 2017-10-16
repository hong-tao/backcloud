$(function($){
    $('#addSupplier').click(function(){
        var $supplierType = $('#supplierType').val();
        var $supplierName = $('#supplierName').val();
        var $supplierIden = $('#supplierIden').val();
        var $supplierPhone = $('#supplierPhone').val();
        var $supplierCom = $('#supplierCom').val();
        if($supplierId.length <= 0 && supplierType.length <= 0 && $supplierName.length <= 0 
            && $supplierIden.length <= 0 && $supplierPhone.length <= 0 && $supplierCom.length <= 0){
            alert('填写完整数据');
            return false;
        }
        $.post('http://localhost:88/addAll',{
            supplierType:$('#supplierType').val(),
            supplierName:$('#supplierName').val(),
            supplierIden:$('#supplierIden').val(),
            supplierPhone:$('#supplierPhone').val(),
            supplierCom:$('#supplierCom').val()
        },function(response){
            console.log(response);
            if(response.status){
                alert('增加数据成功');
                $('#tablelist').text('');
                render(5, 1);
            }
        })  
    });

    render(5, 1);
    function render(qty, pageNo){
        $.post('http://localhost:88/addAll',{
            qty:qty,
            pageNo:pageNo
        },
            function(response){
            console.log(response);
            if(response.status){
                $.each(response.data, function(index, item){
                    var html = `<tr>
                                <th>${index+1}</th>
                                <td>${item.supplierType}</td>
                                <td>${item.supplierId}</td>
                                <td>${item.supplierName}</td>
                                <td>${item.supplierPhone}</td>
                                <td>${item.supplierCom}</td>
                                </tr>`;
                    $('#tablelist').append(html);
                })
            }
        })
    }

    $('#loadMore').click(function(){
        var pageNo = 1;
        pageNo++;
        render(5, pageNo);
    })
})