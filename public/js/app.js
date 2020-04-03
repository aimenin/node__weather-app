console.log('Client side javascript file is loaded');

document.addEventListener('click', (event) => {
    if (!event.target.matches('.search')) return;

    event.preventDefault();

    const location = document.getElementById('location').value;
    const p1 = document.querySelector('.p1');
    const p2 = document.querySelector('.p2');

    p1.textContent = "Loading...";
    p2.textContent = "";

    if (location == '') {
        p1.style.cssText = "border-top: 1px solid red;";
        p1.textContent = 'Cant find your place';
        p2.textContent = '';
        return;
    }

    fetch(`http://localhost:3000/weather?address=${location}`).then(res => {
    res.json().then(data => {
        if (data.error) {
            p1.style.cssText = "border-top: 1px solid red;";
            p1.textContent = 'Cant find your place';
            p2.textContent = '';
        } else {
            console.log(`Forecast: ${data.forecast}`);
            console.log(`Location: ${data.place}`);
            p1.style.cssText = "border-top: 1px solid green;";
            p1.textContent = data.forecast;
            p2.textContent = data.place;
        }
    });
    });

    document.getElementById('location').value = '';
});

