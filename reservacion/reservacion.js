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
    url: 'http://localhost:8080/'+'api/Reservation/all',
    type:'GET',
    datatype:"JSON",
    success:function(respuesta){
    console.log(respuesta);
    var misItems=null;
    misItems=respuesta;
    console.log(misItems.length);
    for(i=0;i<misItems.length;i++){
        $("#miResultado").append("<tr>");
        $("#miResultado").append("<td>"+misItems[i].idReservation+"</td>");
        $("#miResultado").append("<td>"+misItems[i].startDate+"</td>");
        $("#miResultado").append("<td>"+misItems[i].devolutionDate+"</td>");
        $("#miResultado").append("<td>"+misItems[i].status+"</td>");
        $("#miResultado").append("<td>"+misItems[i].quadbike.brand+"</td>");
        $("#miResultado").append("<td>"+misItems[i].client.name+"</td>");
        $("#miResultado").append('<td><button class="btn btn-danger" onclick="deletedata('+misItems[i].idReservation+')">Eliminar</button></td>');
        $("#miResultado").append('<td><button class="btn btn-secondary" onclick="obtenerItemEspecifico('+misItems[i].idReservation+')">Cargar</button></td>'); 
        $("#miResultado").append("</tr>");
      }
    },
    error: function(jqXHR, textStatus, errorThrown) {
            
    }
});
}

function crear(){
    var elemento={
        "startDate":$("#startDate").val(),
        "devolutionDate":$("#devolutionDate").val(),
        "client":{"idClient":parseInt($("#foo").val())},
        "quadbike":{"id":parseInt($("#foo2").val())},
        }
    console.log(elemento);
    $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        datatype:"JSON",
        data:JSON.stringify(elemento),
        url:'http://localhost:8080/'+'api/Reservation/save', 
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
      url:'http://localhost:8080/'+'api/Reservation/'+idElemento,
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
      url:'http://localhost:8080/'+'api/Reservation/obtener/'+idItem,
      type:'GET',
      dataType: 'json',
      success:function(response) {
        console.log(response);
        var item=response;
        id_actualizar=item.id;
        $("#startDate").val(item.startDate);
        $("#devolutionDate").val(item.devolutionDate);
        $("#client").val(item.client);
        $("#quadbike").val(item.quadbike);
      },
      error: function(jqXHR, textStatus, errorThrown) {
      }
  });
}

function Actualizar(){
  if(id_actualizar !=0){
    console.log("id_actualizar");
      console.log(id_actualizar);
      let elemento={
          "idReservation": parseInt(id_actualizar),  
          "startDate":$("#startDate").val(),
          "devolutionDate":$("#devolutionDate").val(),
          "client":$("#client").val(),
          "quadbike":$("#quadbike").val(),
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
          return '<option value"bar.name">'+bar.id+"  "+bar.name+'</option>'
        })
        document.getElementById("foo2").innerHTML = foo2;

            },
            error: function(jqXHR, textStatus, errorThrown) {
                    
            }
        });
      
    }
