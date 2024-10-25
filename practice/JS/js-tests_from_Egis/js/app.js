const divas = document.getElementById('mano');

// console.log(divas);

divas.innerHTML = 'fi2rst';
divas.className = 'green';

setTimeout(() => {
  const divai = document.getElementsByClassName('green');
  console.log('va');
  Array.from(divai).forEach((item) => {
    console.log('Keiciam divui:', item);
    item.className = 'orange';
  });
}, 1000);

setTimeout(() => {
  console.log('va veliau');
  const divai = document.getElementsByClassName('orange');
  Array.from(divai).forEach((item) => {
    console.log('Keiciam divui:', item);
    item.className = 'green';
  });
}, 2000);
