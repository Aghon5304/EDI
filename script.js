// //pobieranie API
async function getAPI() {
    const response = await fetch("https://my.api.mockaroo.com/planety.json?key=ab038ca0");
    const data = await response.json();
    keys = Object.keys(data[0])
    
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
getAPI()