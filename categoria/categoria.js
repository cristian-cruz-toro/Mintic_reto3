console.log("entro");
obtener();

id_actualizar=0;
function ver(){
    location.reload();
}
function getData(){
    var config = {};
    $('input').each(function () {
        config[this.id] = this.value;
       });
config.data;
console.log(config);
    crear(config);
}

function crear(){
    if(id_actualizar==0){
    let elemento={
        "name":$("#name").val(),
        "description":$("#description").val(),
        }
    console.log(elemento);
    $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        datatype:"JSON",
        data:JSON.stringify(elemento),
        url:'http://localhost:8080/'+'api/Category/save', 
        success:function(response) {
            console.log(response);
          }, 
    });
    }else{
        $(document).ready(function() {
            alert ("No se puede crear solo actualizar"); 
        });
    }
    ver();
}

function obtener(){
    $.ajax({
        url: 'http://localhost:8080/'+'api/Category/all',
        type:'GET',
        datatype:"JSON",
        success:function(respuesta){
        console.log(respuesta);
        var misItems=null;
        misItems=respuesta;
        console.log(misItems.length);
        for(i=0;i<misItems.length;i++){
            $("#miResultado").append("<tr>");
            $("#miResultado").append("<td>"+misItems[i].id+"</td>");
            $("#miResultado").append("<td>"+misItems[i].name+"</td>");
            $("#miResultado").append("<td>"+misItems[i].description+"</td>");
            $("#miResultado").append('<td><button class="btn btn-danger" onclick="deletedata('+misItems[i].id+')">Eliminar</button></td>');
            $("#miResultado").append('<td><button class="btn btn-secondary" onclick="obtenerItemEspecifico('+misItems[i].id+')">Cargar</button></td>'); 
        
          }
        },
        error: function(jqXHR, textStatus, errorThrown) {
                
        }
    });
}

function deletedata(idElemento){
    $.ajax({
          url:'http://localhost:8080/'+'api/Category/'+idElemento,
          type:'DELETE',  
          contentType:'application/json',
          success:function(response) {
            console.log(response);
          },
          error: function(jqXHR, textStatus, errorThrown) {      
          }
      });
      ver();
    }

    function obtenerItemEspecifico(idItem){
        $.ajax({
            url:'http://localhost:8080/'+'api/Category/obtener/'+idItem,
            type:'GET',
            dataType: 'json',
            success:function(response) {
              console.log(response);
              var item=response;
              id_actualizar=item.id;
              $("#id_actualizacion").val(item.id);
              $("#name").val(item.name);
              $("#description").val(item.description);
            },
            error: function(jqXHR, textStatus, errorThrown) {
            }
        });
      }

      function Actualizar(){
        if(id_actualizar !=0){
            console.log(id_actualizar);
            let elemento={
                "id": parseInt(id_actualizar),  
                "name":$("#name").val(),
                "description":$("#description").val(),
                }
            console.log(elemento);
            $.ajax({
                type:'PUT',
                contentType: "application/json; charset=utf-8",
                datatype:"JSON",
                data:JSON.stringify(elemento),
                url:'http://localhost:8080/'+'api/Category/update', 
                success:function(response) {
                    console.log(response);
                }, 
            });
        }else{
            $(document).ready(function() {
                alert ("No se puede actualizar solo crear"); 
            });
        }
        ver();
      }
