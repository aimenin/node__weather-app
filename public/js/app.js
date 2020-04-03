console.log('Client side javascript file is loaded');

document.addEventListener('click', (event) => {
    if (!event.target.matches('.search')) return;

    event.preventDefault();

    const location = document.getElementById('location').value;
    const p1 = document.querySelector('.p1');
    const p2 = document.querySelector('.p2');
    const p3 = document.querySelector('.p3');

    p1.textContent = "Loading...";
    p2.textContent = "";
    p3.textContent = "";

    if (location == '') {
        p1.style.cssText = "border-top: 1px solid red;";
        p1.textContent = 'Cant find your place';
        p2.textContent = '';
        p3.textContent = '';
        return;
    }

    fetch(`/weather?address=${location}`).then(res => {
    res.json().then(data => {
        if (data.error) {
            p1.style.cssText = "border-top: 1px solid red;";
            p1.textContent = 'Cant find your place';
            p2.textContent = '';
            p3.textContent = '';
        } else {
            p1.style.cssText = "border-top: 1px solid green;";
            p1.textContent = data.forecast;
            p2.textContent = `Pressure: ${data.pressure}`;
            p3.textContent = data.place;
        }
    });
    });

    document.getElementById('location').value = '';
});

