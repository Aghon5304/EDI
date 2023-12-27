
// pobieranie API
Chart.defaults.backgroundColor = 'rgba(224, 255, 255,0.5)';
Chart.defaults.borderColor = 'rgba(224, 255, 255,0.5)';
Chart.defaults.color = 'rgba(224, 255, 255)';
async function handleAPI() {
    const response = await fetch("https://my.api.mockaroo.com/planety.json?key=ab038ca0");
    const data = await response.json();
    //wywołanie funkcji
    table(await data)
    graph(await data)
    pieChart(await data)
}
function table(data){
    keys = Object.keys(data[0])
    
    //table
    let table = document.getElementById("apiTable")
    let tr = document.createElement("tr")
    keys.forEach((elem) =>{
        let th = document.createElement("th")
        th.innerText = elem
        tr.appendChild(th)
    })
    table.appendChild(tr)
    for(let x = 1; x<data.length;x++){
        data.forEach((line)=>{
            elem = Object.values(line)
            tr = document.createElement("tr")
            elem.forEach((elem)=>{
                td= document.createElement("td")
                td.innerText=elem
                tr.appendChild(td)
            })
            table.appendChild(tr)
        })
    }
}
function graph(data){
    //graph
    new Chart(
        document.getElementById("tablePoint"),
        {
            type: "scatter",
            data: {
                labels: data.map(row=>row.odleglosc_od_gwizdy_w_km),
                datasets: [{
                    pointRadius: 4,
                    label: 'ilosc ksiezyców',
                    data: data.map(row=>row.ile_ksiezycy),
                    backgroundColor: "green",
                }]
            },
            options: {
                scales: {
                    x: {
                    type: 'linear',
                    position: 'bottom'
                    }
                },
                responsive: false
                
            }
        }
    );
    
}
function pieChart(data){
    //pie chart
    new Chart(
        document.getElementById("pieChart"),
        {
            type: "pie",
            data: {
                labels:[
                    'możliwe',
                    'niemożliwe',
                ],
                datasets: [{
                    label: 'czy możliwe życie',
                    data: [data.map(row=>row.czy_mozliwe_zycie).filter(x=>x==true).length,data.map(row=>row.czy_mozliwe_zycie).filter(x=>x==false).length],
                    backgroundColor: ['green','red'],
                }]
            },
            options: {
                scales: {
                    x: {
                    type: 'linear',
                    position: 'bottom'
                    }
                },
                responsive: false
                
            }
        }
    );
}
handleAPI()
