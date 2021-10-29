console.log("entro");
obtener();
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
             console.log(misItems[i].id);
             console.log(misItems[i].name);
             console.log(misItems[i].description);
            $("#miResultado").append("<tr>");
            $("#miResultado").append("<td>"+misItems[i].id+"</td>");
            $("#miResultado").append("<td>"+misItems[i].name+"</td>");
            $("#miResultado").append("<td>"+misItems[i].description+"</td>");
          }
        },
        error: function(jqXHR, textStatus, errorThrown) {
                
        }
    });
}