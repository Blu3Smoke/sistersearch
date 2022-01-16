let loading = document.getElementById('loading');
let container = document.getElementById('container');
container.style.display = 'none';
let seedInput = document.getElementById('seed');
let list = document.getElementById('list');

let mask = BigInt(Math.pow(2, 48) - 1);
let sisters;
fetch('/sistersearch/seeds.json').then(res => res.json()).then(data => {
    loading.style.display = 'none';
    container.style.display = 'flex';
    sisters = data;
});


function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function findSisters() {
    let seed;
    try {
        seed = BigInt(seedInput.value);
    } catch (e) {
        alert('Invalid input seed');
        return;
    }
    let structure = seed & mask;
    console.log('Calculated structure seed as ' + structure);
    let result = sisters[structure.toString()];
    if (result) {
        removeAllChildNodes(list);
        for (let sister of result) {
            let elem = document.createElement('li');
            elem.innerText = sister.toString();
            list.appendChild(elem);
        }
    } else {
        alert('Invalid input seed');
    }
}
