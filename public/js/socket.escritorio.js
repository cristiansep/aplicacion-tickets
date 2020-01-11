var socket = io();


socket.on('connect', function(){
    console.log('Conectado al servidor');
});

// escuchar
socket.on('disconnect', function() {
    console.log('Perdimos conexion con elm servidor');
});


var searchParams = new URLSearchParams(window.location.search);

if(!searchParams.has('escritorio')){
    window.location('index.html');
    throw new Error('El modulo es necesario');
}

var escritorio = searchParams.get('escritorio');
var label = $('small');


$('h1').text('Modulo ' + escritorio);

$('button').on('click', function(){

    socket.emit('atenderTicket',{escritorio: escritorio}, function(resp){

        if(resp === 'No hay tickets'){
            label.text(resp);
            alert(resp);
            return;
        }
        label.text('Ticket ' + resp.numero);
    });

});