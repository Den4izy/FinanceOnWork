let elementTable = document.querySelector("#tableDiv");
elementTable.innerHTML = createTableText();
let elementTableTd = document.querySelectorAll(".grafTd");
let elementRozrahunok = document.querySelector('#rozrahunokDiv');

function getTime(){
    let res = '';
    let d = new Date();
    let year = d.getFullYear();
    let month = d.getMonth() + 1;
    let date = d.getDate();
    let hour = d.getHours();
    let min = d.getMinutes();
    let sec = d.getSeconds();
    if(month < 10){
        month = '0' + month;
    }
    if(date < 10){
        date = '0' + date;
    }
    if(hour < 10){
        hour = '0' + hour;
    }
    if(min < 10){
        min = '0' + min;
    }
    if(sec < 10){
        sec = '0' + sec;
    }
    res += date + '.' + month + '.' + year + ' p. ' + hour + ':' + min + ':' + sec;
    return res;

}
function makeRozrahunok(){
    document.querySelector('#rozrahunokDiv').innerHTML = createText();
    document.querySelector('#rozrahunokDiv').style.backgroundImage = 'url(./img/foneWhite.png)';



}
function createText(){
    let r = new rozrahunok();
    let positiveEnd = '';
    if (r.hourEndMonth > 0){
        positiveEnd = '+';
    }
    let text = '';
    text += '<div>' +
                '<div>' +
                    'Дата створення: ' + r.time +
                '</div>' +
                '<div>' +
                    r.name +
                '</div>' +
                '<div>' +
                    'Оклад: ' + r.oklad + ' грн.' +
                '</div>' +
            '</div>' +
            '<div class="flex">' +
                '<div class="first">' +
                    '+-План ' + r.norma + 'г' + ' Факт ' + r.fact + 'г--------------' +
                '</div>' +
                '<div class="two">' +
                    '+---Час' +
                '</div>' +
                '<div class="three">' +
                    '+------Сума+' +
                '</div>' +
            '</div>' +
            '<div class="flex ">' +
                '<div class="first">' +
                     '|ПО ОКЛАДУ' +
                '</div>' +
                '<div class="two flexBetween">' +
                      '<div> |</div>' +'<div class="alignRight">' + r.norma + '' + '</div>' +
                '</div>' +
                '<div class="three flexBetween">' +
                    '<div>г</div>' +'<div class="alignRight">' + r.oklad + '|' + '</div>' +
                '</div>' +
            '</div>' +
            '<div class="flex ">' +
                '<div class="first flexBetween">' +
                    '<div>|</div>' + '<div>відпрацьваний час</div>' +
                '</div>' +
                '<div class="two flexBetween">' +
                    '<div>|</div>'+'<div class="alignRight">' + positiveEnd +  r.hourEndMonth + '' + '</div>' +
                '</div>' +
                '<div class="three flexBetween">' +
                    '<div>г</div>' +'<div class="alignRight">|</div>' +
                '</div>' +
            '</div>' +
            '<div class="flex ">' +
                '<div class="first">' +
                    '|ОПЛАТА нічного часу' +
                '</div>' +
                '<div class="two flexBetween">' +
                    '<div>|</div>' +'<div class="alignRight">' + r.night + '' + '</div>' +
                '</div>' +
                '<div class="three flexBetween">' +
                    '<div>г</div>' +'<div class="alignRight">' + r.moneyNight + '|' + '</div>' +
                '</div>' +
            '</div>' +
            '<div class="flex ">' +
                '<div class="first">' +
                    '|ОПЛАТА вечірнього часу' +
                '</div>' +
                '<div class="two flexBetween">' +
                    '<div>|</div>' +'<div class="alignRight">' + r.evening + '' + '</div>' +
                '</div>' +
                '<div class="three flexBetween">' +
                    '<div>г</div>' +'<div class="alignRight">' + r.moneyEvening + '|' + '</div>' +
                '</div>' +
            '</div>' +
            '<div class="flex ">' +
                '<div class="first">' +
                    '|ІНДЕКСАЦІЯ заробітньої плати' +
                '</div>' +
                '<div class="two flexBetween">' +
                    '<div>|</div>' +'<div></div>' +
                '</div>' +
                '<div class="three flexBetween">' +
                    '<div>|</div>' +'<div class="alignRight">' + r.index + '|' + '</div>' +
                '</div>' +
            '</div>' +
            '<div class="flex ">' +
                '<div class="first flexBetween">' +
                    '<div>|</div>' + '<div>ВСЬОГО НАРАХОВАНО:</div>' +
                '</div>' +
                '<div class="two flexBetween">' +
                    '<div>|</div>'+'<div class="alignRight">' + positiveEnd +  r.hourEndMonth + '' + '</div>' +
                '</div>' +
                '<div class="three flexBetween">' +
                    '<div>г</div>' +'<div class="alignRight">' + r.allMoney + '|' + '</div>' +
                '</div>' +
            '</div>' +
            '<div>+----------------------------------+------+----------+</div>' +
            '<div class="flex ">' +
                '<div class="first">' +
                    '|Податок з доходів фізичних Осіб' +
                '</div>' +
                '<div class="two flexBetween">' +
                    '<div>|</div>' +'<div></div>' +
                '</div>' +
                '<div class="three flexBetween">' +
                    '<div>|</div>' +'<div class="alignRight">' + r.fop + '|' + '</div>' +
                '</div>' +
            '</div>' +
            '<div class="flex ">' +
                '<div class="first">' +
                    '|Оподаткована сума ' + r.allMoney +
                '</div>' +
                '<div class="two flexBetween">' +
                    '<div>|</div>' +'<div></div>' +
                '</div>' +
                '<div class="three flexBetween">' +
                    '<div>|</div>' +'<div>|</div>' +
                '</div>' +
            '</div>' +
            '<div class="flex ">' +
                '<div class="first">' +
                    '|Профспілковий внесок 1%' +
                '</div>' +
                '<div class="two flexBetween">' +
                    '<div>|</div>' +'<div></div>' +
                '</div>' +
                '<div class="three flexBetween">' +
                    '<div>|</div>' +'<div class="alignRight">' + r.profcom + '|' + '</div>' +
                '</div>' +
            '</div>' +
            '<div class="flex ">' +
                '<div class="first">' +
                    '|Військовий збір' +
                '</div>' +
                '<div class="two flexBetween">' +
                    '<div>|</div>' +'<div></div>' +
                '</div>' +
                '<div class="three flexBetween">' +
                    '<div>|</div>' +'<div class="alignRight">' + r.military + '|' + '</div>' +
                '</div>' +
            '</div>' +
            '<div class="flex ">' +
                '<div class="first flexBetween">' +
                    '<div>|</div>' + '<div>ВСЬОГО УТРИМАНО:</div>' +
                '</div>' +
                '<div class="two flexBetween">' +
                    '<div>|</div>' +'<div></div>' +
                '</div>' +
                '<div class="three flexBetween">' +
                    '<div>|</div>' +'<div class="alignRight">' + r.allZbor + '|' + '</div>' +
                '</div>' +
            '</div>' +
            '<div>+----------------------------------+------+----------+</div>' +
            '<div class="flex ">' +
                '<div class="first flexBetween">' +
                    '<div>|</div>' + '<div>ДО ВИДАЧІ (мпк-банкомат) :</div>' +
                '</div>' +
                '<div class="two flexBetween">' +
                    '<div></div>' +'<div></div>' +
                '</div>' +
                '<div class="three flexBetween">' +
                    '<div></div>' +'<div class="alignRight">' + r.result + '|' + '</div>' +
                '</div>' +
            '</div>' +
        '</div>'



    return text
}
class rozrahunok{
    text = '';
    time = getTime();
    hourArrDetails = hourDetails();
    name = document.querySelector('#nameInput').value;
    oklad = document.querySelector('#okladInput').value;
    norma = document.querySelector('#normaInput').value * 1;
    fact = document.querySelector('#factInput').value * 1;
    hourStartMonth = document.querySelector('#pererobInput').value * 1;
    index = document.querySelector('#indexInput').value * 1;
    hourEndMonth = this.fact + this. hourStartMonth - this.norma;
    // Кількість годин
    day = this.hourArrDetails[0];
    evening = this.hourArrDetails[1];
    night = this.hourArrDetails[2];
    // Кошти за годину( вечірні та нічні це надбавка до денних годин!!)
    moneyPerDayHour = this.oklad / this.norma;
    moneyPlusPerEvenHour = this.moneyPerDayHour * 1.2 - this.moneyPerDayHour;
    moneyPlusPerNightHour = this.moneyPerDayHour * 1.4 - this.moneyPerDayHour;
    // Нараховані кошти
    moneyDay = this.norma * this.moneyPerDayHour;
    moneyEvening = Math.round(this.evening * this.moneyPlusPerEvenHour);
    moneyNight = Math.round(this.night * this.moneyPlusPerNightHour);
    allMoney = Math.round(this.moneyDay + this.moneyEvening + this.moneyNight + this.index);
    // Утримані кошти
    fop = Math.round(this.allMoney * 1.18 - this.allMoney) * 1;
    profcom = Math.round(this.allMoney * 1.01 - this.allMoney) * 1;
    military = Math.round(this.allMoney * 1.015 - this.allMoney) * 1;
    allZbor = this.fop + this.profcom + this.military;
    // до видачі
    result = this.allMoney - this.allZbor;
}
function hourDetails(){
    let arr = [];
    let day = 0;
    let nigh = 0;
    let evening = 0;
    for(let i = 0; i < elementTableTd.length; i++){
        if(elementTableTd[i].innerHTML == '12'){
            day += 10;
            evening += 2;
        }
        else if(elementTableTd[i].innerHTML == '4'){
            nigh += 2;
            evening += 2;
        }
        else if(elementTableTd[i].innerHTML == '8/4'){
            day += 2;
            nigh += 8;
            evening += 2;
        }
        else if(elementTableTd[i].innerHTML == '8'){
            day += 2;
            nigh += 6;
        }
        else{
            day += 0
            nigh += 0;
            evening += 0;
        }
    }
    arr[0] = day;
    arr[1] = evening;
    arr[2] = nigh;
    return arr;

}
function changeDay(){
    elementTable.innerHTML = createTableText();
    elementTableTd = document.querySelectorAll(".grafTd");
    // let elem = document.querySelector('#daysInput');
    // if(elem.value == ''){
    //     elem.value = '30';
    // }
    addOnClick();
}

function addEventsInputs(){
    const elements = document.querySelectorAll('.infoInput');
    for (const el of elements) {
        if (el.id == 'daysInput'){
            console.log('ddd');
            changeDay();
        }
        else{
            el.addEventListener('change' , e =>{
                if(e.target.value == ''){
                    e.target.value = '0';
                }
            });
        }

    }
    for (const el of elements){
        el.addEventListener('click',e =>{
            if(e.target.value == '0'){
                e.target.value = '';
            }
        })
    }
    for (const el of elements){
        el.addEventListener('blur',e =>{

            if(e.target.value == ''){
                if(e.target.id == 'daysInput'){
                    console.log('days lose focus');
                    e.target.value = '30';
                    changeDay();
                }
                else{
                    e.target.value = '0';
                    console.log('blur');
                }
            }
        })
    }
}
function addOnClick(){
    for(let i = 0; i < elementTableTd.length; i++){
        elementTableTd[i].onclick = function(event){
            event.target.innerHTML = '<input type="text" class="inputGraf" />';
            event.target.onblur = function (event){
                elementTableTd[i].innerHTML = event.target.value;
            };
        };
    }
}
function autoZap(){

    for(let i = 0; i < elementTableTd.length; i++){

        if(elementTableTd[i].innerText == '12'){
            if(elementTableTd[i + 1].innerText == '12'){
                if(elementTableTd[i + 2].innerText == '4'){
                    if(elementTableTd[i + 3].innerText == '8/4'){
                        if(elementTableTd[i + 4].innerText == '8'){
                            i += 8;

                            cicle(i);
                            if( i > 8){
                                cicleLeft(i);
                            }
                            break;
                        }
                    }
                }
            }
        }
    }
}
function cicle(start){
    for(let i = start; i < elementTableTd.length; i += 8){
        elementTableTd[i].innerHTML = '12';
    }
    for(let i = start + 1; i < elementTableTd.length; i += 8){
        elementTableTd[i].innerHTML = '12';
    }
    for(let i = start + 2; i < elementTableTd.length; i += 8){
        elementTableTd[i].innerHTML = '4';
    }
    for(let i = start + 3; i < elementTableTd.length; i += 8){
        elementTableTd[i].innerHTML = '8/4';
    }
    for(let i = start + 4; i < elementTableTd.length; i += 8){
        elementTableTd[i].innerHTML = '8';
    }
    for(let i = start + 5; i < elementTableTd.length; i += 8){
        elementTableTd[i].innerHTML = '*';
    }
    for(let i = start + 6; i < elementTableTd.length; i += 8){
        elementTableTd[i].innerHTML = '*';
    }
    for(let i = start + 7; i < elementTableTd.length; i += 8){
        elementTableTd[i].innerHTML = '*';
    }
}
function cicleLeft(start){
    for(let i = start - 1; i >= 0; i -= 8){
        elementTableTd[i].innerHTML = '*';
    }
    for(let i = start - 2; i >= 0; i -= 8){
        elementTableTd[i].innerHTML = '*';
    }
    for(let i = start - 3; i >= 0; i -= 8){
        elementTableTd[i].innerHTML = '*';
    }
    for(let i = start - 4; i >= 0; i -= 8){
        elementTableTd[i].innerHTML = '8';
    }
    for(let i = start - 5; i >= 0; i -= 8){
        elementTableTd[i].innerHTML = '8/4';
    }
    for(let i = start - 6; i >= 0; i -= 8){
        elementTableTd[i].innerHTML = '4';
    }
    for(let i = start - 7; i >= 0; i -= 8){
        elementTableTd[i].innerHTML = '12';
    }
    for(let i = start - 8; i >= 0; i -= 8){
        elementTableTd[i].innerHTML = '12';
    }

}
function createTableText(){
    let elementDays = document.querySelector('#daysInput');
    let days = Number(elementDays.value);
    console.log(days);
    let result = '';
    result += '<table id="table">' +
                '<tr>';
    for(let i = 0; i < days; i++){
        let count = i + 1;
        result += '<td>' + count + '</td>';
    }
    result += '</tr><tr>';
        for(let i = 0; i < days; i++){
            result += '<td class="grafTd"></td>';
        }
    result +='</tr></table>';
    return result;
}
addEventsInputs();
addOnClick();