const mascotaImput = document.querySelector('#mascota');
const PropietarioImput = document.querySelector('#propietario');
const telefonoImput = document.querySelector('#telefono');
const fechaImput = document.querySelector('#fecha');
const horaImput = document.querySelector('#hora');
const sintomasImput = document.querySelector('#sintomas');
//UI
const formulario = document.querySelector('#nueva-cita');
const citasLugar = document.querySelector('#citas');
let editando;
let idd;
//REGISTRAR EVENTOS
eventListeners();
function eventListeners(){
mascotaImput.addEventListener('change',datoscitas);
PropietarioImput.addEventListener('change',datoscitas);
telefonoImput.addEventListener('change',datoscitas);
fechaImput.addEventListener('change',datoscitas);
horaImput.addEventListener('change',datoscitas);
sintomasImput.addEventListener('change',datoscitas);
formulario.addEventListener('submit',nuevaCita);
}
function datoscitas(e){
citaObj[e.target.name] = e.target.value;
}
//INFORMACION DE LA CITA
const citaObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: ''
}
class UI{

mostrarAlerta(mensaje,tipo){
    const divMSJ = document.createElement('div');
    divMSJ.classList.add('text-center','alert','d-block','col-s12');

    //agregamos clase al tipo de error
    if(tipo == "error"){
        divMSJ.classList.add('alert-danger');
    }else{
        divMSJ.classList.add('alert-success');
    }
    divMSJ.textContent = mensaje;
    //agregamos al dom
    document.querySelector('.container').insertBefore(divMSJ,document.querySelector('#contenido'));
setTimeout(()=>{
    divMSJ.remove();
},3000);
}
mostrarCitas({citas}){//aplicamos destruction
    this.limpiarHtml();
citas.forEach(element => {
    const {mascota,propietario,telefono,fecha,hora,sintomas,id} = element;
    const divCita = document.createElement('div');
    divCita.classList.add('cita','p-3');
    divCita.dataset.id = id;

    //scripting de los elementos de la cita
    const mascotaParrafo = document.createElement('h2');
    mascotaParrafo.classList.add('card-title','font-weight-bolder');
    mascotaParrafo.textContent=mascota;

    const propietarioParrafo = document.createElement('p');
    const telefonoParrafo = document.createElement('p');
    const fechaParrafo = document.createElement('p');
    const horaParrafo = document.createElement('p');
    const sintomasParrafo = document.createElement('p');
    propietarioParrafo.innerHTML = `
    <span class="font-weight-bolder">Propietario:</span> ${propietario}
    `;
    telefonoParrafo.innerHTML = `
    <span class="font-weight-bolder">Telefono:</span> ${telefono}
    `;
    fechaParrafo.innerHTML = `
    <span class="font-weight-bolder">fecha:</span> ${fecha}
    `;
    horaParrafo.innerHTML = `
    <span class="font-weight-bolder">Hora:</span> ${hora}
    `;
    sintomasParrafo.innerHTML = `
    <span class="font-weight-bolder">Sintomas:</span> ${sintomas}
    `;
    //Boton para eliminar estas citas
    const btnEliminar = document.createElement('button');
    btnEliminar.classList.add('btn','btn-danger',"mr-2");
    btnEliminar.innerHTML = "eliminar <svg viewBox='0 0 20 20' fill='currentColor' class='x-circle w-6 h-6'><path fill-rule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z' clip-rule='evenodd'></path></svg>";
    btnEliminar.onclick = () =>eliminarcita(id);

    //Boton para editar
    const btnEditar = document.createElement('button');
    btnEditar.classList.add('btn','btn-info');
    btnEditar.innerHTML = "editar <svg viewBox='0 0 20 20' fill='currentColor' class='pencil w-6 h-6'><path d='M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z'></path></svg>";
   
    btnEditar.onclick = () =>Editarcita(id,citas);
    //agregar los parrafos al div cita
    divCita.appendChild(mascotaParrafo);
    divCita.appendChild(propietarioParrafo);
    divCita.appendChild(telefonoParrafo);
    divCita.appendChild(fechaParrafo);
    divCita.appendChild(horaParrafo);
    divCita.appendChild(sintomasParrafo);
    divCita.appendChild(btnEliminar);
    divCita.appendChild(btnEditar);

    //agregar las citas al html
    citasLugar.appendChild(divCita);
})
}
limpiarHtml(){
    while(citasLugar.firstChild){
        citasLugar.removeChild(citasLugar.firstChild);
    }
}
limpiarCampos(){
    mascotaImput.value='';
    PropietarioImput.value = '';
    telefonoImput.value = '';
    fechaImput.value = '';
    horaImput.value = '';
    sintomasImput.value = '';
}
}
class Citas{
    constructor(){
        this.citas = [];
    }
    agregarCita(cita){
        this.citas = [...this.citas, cita];//creamos una copia de this.citas y le pasamos la cita actual
    //console.warn(this.citas);
    }

    eliminarCita(id){
        this.citas = this.citas.filter(cita =>cita.id !==id)//filter quita elementos basado en una condicion
    }
    editarCita(citaActualizada){
this.citas = this.citas.map( cita => cita.id == citaActualizada.id ? citaActualizada : cita);//map nos returna un nuevo arreglo
//con la trinaria comparamos y si cumple con lo establecido se cambia o actualiza con la citaActualizada si no pasa lo contrario    
}
}
const ui = new UI();
const cits = new Citas();  
function nuevaCita(e){
e.preventDefault();
//Extraemos la información del objeto de la cita
//console.warn(citaObj);
const {mascota,propietario,telefono,fecha,hora,sintomas} = citaObj; //destruct (forma facil de manejar objetos por medio más directo)
//Validamos
if(mascota ==''||propietario==''||telefono==''||fecha==''||hora==''||sintomas==''){
ui.mostrarAlerta("TODO CAMPO ES OBLIGATORIO","error");
return;
}
if(editando){//diferenciamos si esta editando o no
    ui.mostrarAlerta('Editado correctamente');
    //pasar el objeto de la cita edicion
    cits.editarCita({...citaObj});
    formulario.querySelector('button[type="submit"]').textContent = 'CREAR CITA';
//Quitar modo edicion
    editando = false;
}else{
//generamos un ID unico
citaObj.id=Date.now();

cits.agregarCita({...citaObj});//los tres puntos hacen referencia a la creacion de una copia en este caso del objeto

ui.mostrarAlerta('se agrego correctamente');
}

//reiniciamos el objeto
reiniciarObjeto();

formulario.reset();//reiniciamos el formulario
//Mostramos las citas
ui.mostrarCitas(cits);
}

function reiniciarObjeto(){
    citaObj.mascota = '';
    citaObj.propietario = '';
    citaObj.telefono = '';
    citaObj.fecha = '';
    citaObj.hora = '';
    citaObj.sintomas = '';
    citaObj.id = '';
}
function eliminarcita(id){
//Eliminar la cita
cits.eliminarCita(id);
//Muestre un mensaje
ui.mostrarAlerta("Se elimino correctamente");
//Refrescar las citas
ui.mostrarCitas(cits);
ui.limpiarCampos();
}
//carga los datos y modo edicion
function Editarcita(idde,cit){
    let ide,mascot,propietari,telefon,fech,hor,sintoma;
    cit.forEach(element => {
        const {mascota,propietario,telefono,fecha,hora,sintomas,id} = element;
        if(id==idde){
        mascotaImput.value=mascota;
        PropietarioImput.value = propietario;
        telefonoImput.value = telefono;
        fechaImput.value = fecha;
        horaImput.value = hora;
        sintomasImput.value = sintomas;
        ide = id;
        mascot = mascota;
        propietari = propietario;
        telefon = telefono;
        fech=fecha;
        hor=hora;
        sintoma=sintomas;}
    });
    //Llenamos el objeto global
    citaObj.mascota= mascot;
    citaObj.propietario= propietari;
    citaObj.telefono= telefon;
    citaObj.fecha= fech;
    citaObj.hora= hor;
    citaObj.sintomas= sintoma;
    citaObj.id= ide;
    //cambiar el texto del boton
    formulario.querySelector('button[type="submit"]').textContent = 'Guardar Cambios';

    editando=true;
}