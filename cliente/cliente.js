console.log("entro");
obtener();

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
        /* $("#miResultado").append('<td><button class="btn btn-danger" onclick="deletedata('+misItems[i].id+')">Eliminar</button></td>');
        $("#miResultado").append('<td><button class="btn btn-secondary" onclick="obtenerItemEspecifico('+misItems[i].id+')">Cargar</button></td>'); */
        $("#miResultado").append("</tr>");

      }
    },
    error: function(jqXHR, textStatus, errorThrown) {
            
    }
});
}

function crear(ArchivoCrear){
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
}

function deletedata(idElemento){
    var elemento={
      id:idElemento
    };
    var dataToSend=JSON.stringify(elemento);
    //JSON= JavaScript Object Notation
    $.ajax({
          dataType:'json',
          data:dataToSend,
          url:"",
          type:'DELETE',
          contentType:'application/json',
          success:function(response) {
            console.log(response);
          },
          
          error: function(jqXHR, textStatus, errorThrown) {
                
          }
      });
    }

    function obtenerItemEspecifico(idItem){
        $.ajax({
            dataType: 'json',
            url:"https://g9a84339c54bed2-apextjpe.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/quadbike/quadbike/"+idItem,
            type:'GET',
            success:function(response) {
              console.log(response);
              var item=response.items[0];
      
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
