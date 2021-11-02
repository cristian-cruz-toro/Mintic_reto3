console.log("entro");
obtener();
obtenerCategory();
id_actualizar=0;
function getData(){
    var config = {};
    $('input').each(function () {
        config[this.id] = this.value;
       });
config.data;
console.log(config);
    crear(config);
}

function ver(){
    location.reload();
  }
  function crear(){
    if(id_actualizar==0){
      var elemento={
          "brand":$("#brand").val(),
          "year":parseInt($("#model").val()),
          "category":{"id":parseInt($("#foo").val())},
          "name":$("#description").val(),
          "description":$("#description").val()
          }
      console.log(elemento);
      $.ajax({
          type:'POST',
          contentType: "application/json; charset=utf-8",
          datatype:"JSON",
          data:JSON.stringify(elemento),
          url:'http://localhost:8080/'+'api/Quadbike/save', 
          success:function(response) {
              console.log(response);
            }, 
      });
    }else{
      $(document).ready(function() {
        alert ("No se puede crear solo actualizar"); 
    });
    }
  }

function obtener(){
$.ajax({
    url: 'http://localhost:8080/'+'api/Quadbike/all',
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
        $("#miResultado").append("<td>"+misItems[i].brand+"</td>");
        $("#miResultado").append("<td>"+misItems[i].year+"</td>");
        $("#miResultado").append("<td>"+misItems[i].category.name+"</td>");
        $("#miResultado").append("<td>"+misItems[i].name+"</td>");
        $("#miResultado").append('<td><button class="btn btn-danger" onclick="deletedata('+misItems[i].id+')">Eliminar</button></td>');
        $("#miResultado").append('<td><button class="btn btn-secondary" onclick="obtenerItemEspecifico('+misItems[i].id+')">Cargar</button></td>'); 
        $("#miResultado").append("</tr>");
      }
    },
    error: function(jqXHR, textStatus, errorThrown) {
            
    }
});
}


function deletedata(idElemento){
  $.ajax({
        url:'http://localhost:8080/'+'api/Quadbike/'+idElemento,
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
            dataType: 'json',
            url:'http://localhost:8080/'+'api/Quadbike/obtener/'+idItem,
            type:'GET',
            dataType: 'json',
            success:function(response) {
              console.log(response);
              var item=response;
              id_actualizar=item.id;
              $("#id").val(item.id);
              $("#brand").val(item.brand);
              $("#model").val(item.model);
              $("#category_id").val(item.category_id);
              $("#name").val(item.name);
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
                url:'http://localhost:8080/'+'api/Quadbike/update', 
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
                url:'http://localhost:8080/'+'api/Quadbike/update', 
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

      function obtenerCategory(){
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
             console.log(misItems[i].id);
             console.log(misItems[i].name);
             console.log(misItems[i].description);
            $("#listadoCategory").append("<tr>");
            $("#listadoCategory").append("<td>"+misItems[i].id+"</td>");
            $("#listadoCategory").append("<td>"+misItems[i].name+"</td>");
            $("#listadoCategory").append("<td>"+misItems[i].description+"</td>");
             }

  var foo = misItems.map(function(bar){
          return '<option value"bar.name">'+bar.id+"  "+bar.name+'</option>'
        })
        document.getElementById("foo").innerHTML = foo;

            },
            error: function(jqXHR, textStatus, errorThrown) {
                    
            }
        });
      
    }
