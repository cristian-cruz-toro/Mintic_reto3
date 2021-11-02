console.log("entro");
obtener();
obtenerCliente();
obtenerCuatrimoto();
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
function obtener(){
$.ajax({
    url: 'http://localhost:8080/'+'api/Message/all',
    type:'GET',
    datatype:"JSON",
    success:function(respuesta){
    console.log(respuesta);
    var misItems=null;
    misItems=respuesta;
    console.log(misItems.length);
    for(i=0;i<misItems.length;i++){
        $("#miResultado").append("<tr>");
        $("#miResultado").append("<td>"+misItems[i].idMessage+"</td>");
        $("#miResultado").append("<td>"+misItems[i].messageText+"</td>");
        $("#miResultado").append("<td>"+misItems[i].quadbike.brand+"</td>");
        $("#miResultado").append("<td>"+misItems[i].client.name+"</td>");
        $("#miResultado").append('<td><button class="btn btn-danger" onclick="deletedata('+misItems[i].idMessage+')">Eliminar</button></td>');
        $("#miResultado").append('<td><button class="btn btn-secondary" onclick="obtenerItemEspecifico('+misItems[i].idMessage+')">Cargar</button></td>'); 
        $("#miResultado").append("</tr>");
      }
    },
    error: function(jqXHR, textStatus, errorThrown) {      
    }
});
}

function crear(){
    var elemento={
        "messageText":$("#messageText").val(),
        "client":{"idClient":parseInt($("#foo").val())},
        "quadbike":{"id":parseInt($("#foo2").val())},
        }
    console.log(elemento);
    $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        datatype:"JSON",
        data:JSON.stringify(elemento),
        url:'http://localhost:8080/'+'api/Message/save', 
        success:function(response) {
            console.log(response);
          }, 
    });
}

function deletedata(idElemento){
    var elemento={
      id:idElemento
    };
    var dataToSend=JSON.stringify(elemento);
    $.ajax({
      url:'http://localhost:8080/'+'api/Message/'+idElemento,
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
      url:'http://localhost:8080/'+'api/Message/obtener/'+idItem,
      type:'GET',
      dataType: 'json',
      success:function(response) {
        console.log(response);
        var item=response;
        id_actualizar=item.id;
        $("#messageText").val(item.messageText);
        $("#foo").val(item.client.name);
        $("#quadbike").val(item.quadbike.brand);
        console.log(item.client.name);
        console.log(item.quadbike.brand);
      },
      error: function(jqXHR, textStatus, errorThrown) {
      }
  });
}
function Actualizar(){
  if(id_actualizar !=0){
      console.log(id_actualizar);
      var elemento={
        "messageText":$("#messageText").val(),
        "client":{"idClient":parseInt($("#foo").val())},
        "quadbike":{"id":parseInt($("#foo2").val())},
        }
      console.log(elemento);
      $.ajax({
          type:'PUT',
          contentType: "application/json; charset=utf-8",
          datatype:"JSON",
          data:JSON.stringify(elemento),
          url:'http://localhost:8080/'+'api/Message/update', 
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

      function obtenerCliente(){
        $.ajax({
            url: 'http://localhost:8080/'+'api/Client/all',
            type:'GET',
            datatype:"JSON",
            success:function(respuesta){
            console.log(respuesta);
            var misItems=null;
            misItems=respuesta;
            console.log(misItems.length);
        for(i=0;i<misItems.length;i++){
             console.log(misItems[i].idClient);
             console.log(misItems[i].name);
             console.log(misItems[i].email);
            $("#listadoCategory").append("<tr>");
            $("#listadoCategory").append("<td>"+misItems[i].idClient+"</td>");
            $("#listadoCategory").append("<td>"+misItems[i].name+"</td>");
            $("#listadoCategory").append("<td>"+misItems[i].email+"</td>");
            $("#listadoCategory").append("<td>"+misItems[i].password+"</td>");
            $("#listadoCategory").append("<td>"+misItems[i].age+"</td>");
             }

        var foo = misItems.map(function(bar){
          return '<option value"bar.name">'+bar.idClient+"  "+bar.name+'</option>'
        })
        document.getElementById("foo").innerHTML = foo;

            },
            error: function(jqXHR, textStatus, errorThrown) {
                    
            }
        });
      
    }

    function obtenerCuatrimoto(){
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
            $("#listadoCuatrimoto").append("<tr>");
            $("#listadoCuatrimoto").append("<td>"+misItems[i].id+"</td>");
            $("#listadoCuatrimoto").append("<td>"+misItems[i].brand+"</td>");
            $("#listadoCuatrimoto").append("<td>"+misItems[i].year+"</td>");
            $("#listadoCuatrimoto").append("<td>"+misItems[i].name+"</td>");
             }

        var foo2 = misItems.map(function(bar){
          return '<option value"bar.name">'+bar.id+"  "+bar.brand+'</option>'
        })
        document.getElementById("foo2").innerHTML = foo2;

            },
            error: function(jqXHR, textStatus, errorThrown) {
                    
            }
        });
      
    }
