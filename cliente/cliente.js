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
    var elemento={
        "name":$("#name").val(),
        "email":$("#email").val(),
        "password":$("#password").val(),
        "age":parseInt($("#age").val())
        }
    console.log(elemento);
    $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        datatype:"JSON",
        data:JSON.stringify(elemento),
        url:'http://localhost:8080/'+'api/Client/save', 
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
    url: 'http://localhost:8080/'+'api/Client/all',
    type:'GET',
    datatype:"JSON",
    success:function(respuesta){
    console.log(respuesta);
    var misItems=null;
    misItems=respuesta;
    console.log(misItems.length);
    for(i=0;i<misItems.length;i++){
         
        $("#miResultado").append("<tr>");
        $("#miResultado").append("<td>"+misItems[i].idClient+"</td>");
        $("#miResultado").append("<td>"+misItems[i].name+"</td>");
        $("#miResultado").append("<td>"+misItems[i].email+"</td>");
        $("#miResultado").append("<td>"+misItems[i].password+"</td>");
        $("#miResultado").append("<td>"+misItems[i].age+"</td>");
        $("#miResultado").append('<td><button class="btn btn-danger" onclick="deletedata('+misItems[i].idClient+')">Eliminar</button></td>');
        $("#miResultado").append('<td><button class="btn btn-secondary" onclick="obtenerItemEspecifico('+misItems[i].idClient+')">Cargar</button></td>'); 
        $("#miResultado").append("</tr>");
      }
    },
    error: function(jqXHR, textStatus, errorThrown) {
            
    }
});
}



function deletedata(idElemento){
  console.log();
  $.ajax({
    url:'http://localhost:8080/'+'api/Client/'+idElemento,
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
        url:'http://localhost:8080/'+'api/Client/obtener/'+idItem,
        type:'GET',
        dataType: 'json',
        success:function(response) {
          console.log(response);
          var item=response;
          id_actualizar=item.idClient;
          $("#id_actualizacion").val(item.idClient);
          $("#name").val(item.name);
          $("#email").val(item.email);
          $("#password").val(item.password);
          $("#age").val(item.age);
        },
        error: function(jqXHR, textStatus, errorThrown) {
        }
    });
  }

  function Actualizar(){
    if(id_actualizar !=0){
        console.log(id_actualizar);
        var elemento={
          "idClient":parseInt(id_actualizar), 
          "name":$("#name").val(),
          "email":$("#email").val(),
          "password":$("#password").val(),
          "age":parseInt($("#age").val())
          }
        console.log(elemento);
        $.ajax({
            type:'PUT',
            contentType: "application/json; charset=utf-8",
            datatype:"JSON",
            data:JSON.stringify(elemento),
            url:'http://localhost:8080/'+'api/Client/update', 
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
