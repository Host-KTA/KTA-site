function toggleDropdown(id){

const menu=document.getElementById(id);

const isOpen=
menu.style.display==='block';



document
.querySelectorAll('.dropdown-content')
.forEach(el=>el.style.display='none');



menu.style.display=
isOpen ? 'none' : 'block';

}



document.addEventListener(

'click',

function(e){

if(!e.target.closest('.dropdown')){

document
.querySelectorAll('.dropdown-content')
.forEach(el=>el.style.display='none');

}

}

);



document.addEventListener(

'DOMContentLoaded',

()=>{

document
.querySelectorAll('.dropdown-content')
.forEach(el=>el.style.display='none');

}

);
