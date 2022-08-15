let elementTable = document.querySelector("#tableDiv");
elementTable.innerHTML = createTableText();
let elementTableTd = document.querySelectorAll(".grafTd");
let elementTableTdDaysOfWeek = document.querySelectorAll(".grafDaysOfWeek");


let elementRozrahunok = document.querySelector('#rozrahunokDiv');
let elemLang = document.querySelector('#lang');

let r;

class rozrahunok{
    text = '';
    time = getTime();
    hourArrDetails = hourDetails();
    name = document.querySelector('#nameInput').value;
    oklad = document.querySelector('#okladInput').value;
    //днів відпустки
    vidpustkaDays = this.hourArrDetails[3];
    norma = document.querySelector('#normaInput').value * 1;
    //норма фактична(якщо відпустка)
    normaFact = document.querySelector('#normaInput').value * 1 - this.vidpustkaDays * 8;
    okladFact = this.oklad / this.norma * this.normaFact

    //fact = document.querySelector('#factInput').value * 1;
    hourStartMonth = document.querySelector('#pererobInput').value * 1;
    index = document.querySelector('#indexInput').value * 1;
    // Кількість годин
    day = this.hourArrDetails[0];
    evening = this.hourArrDetails[1];
    night = this.hourArrDetails[2];
    all = this.day + this.evening + this.night;
    fact = this.all;
    hourEndMonth = this.fact + this.hourStartMonth - this.norma;
    // Кошти за годину( вечірні та нічні це надбавка до денних годин!!)
    moneyPerDayHour = this.okladFact / this.normaFact;
    moneyPlusPerEvenHour = this.moneyPerDayHour * 1.2 - this.moneyPerDayHour;
    moneyPlusPerNightHour = this.moneyPerDayHour * 1.4 - this.moneyPerDayHour;
    // Нараховані кошти
    moneyDay = this.normaFact * this.moneyPerDayHour;
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



function getTime(){
    let res = [];
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
    res[0] = date + '.' + month + '.' + year;
    res[1] = hour + ':' + min + ':' + sec;
    return res;

}
function makeRozrahunok(){
    document.querySelector('#rozrahunokDiv').innerHTML = createText();
    document.querySelector('#rozrahunokDiv').style.backgroundImage = 'url(./img/foneWhite.png)';
    changeLanguage();



}
function createText(){
    r = new rozrahunok();
    let positiveEnd = '';
    document.querySelector('#factInput').value = r.fact
    if (r.hourEndMonth > 0){
        positiveEnd = '+';
    }
    let text = '';
    text += '<div xmlns="http://www.w3.org/1999/html">' +
                '<div>' +
                    '<span class="data-lang">Дата створення: </span>' + r.time[0] +
                        '<span class="year-lang"> р. </span>' + r.time[1] +
                '</div>' +
                '<div>' +
                    r.name +
                '</div>' +
                '<div>' +
                    '<span class="oklad-lang2">Оклад: </span> ' +  r.oklad + '<span class="grn-lang">грн.</span>' +
                '</div>' +
            '</div>' +
            '<div class="flex">' +
                '<div class="first">' +
                    '+-<span class="plan-lang">План </span> ' + r.norma + '<span class="hour-lang">г</span> ' + '<span class="fact-lang2">Факт</span> ' +
                    r.normaFact + '<span class="hour-lang">г</span>--------------' +
                '</div>' +
                '<div class="two">' +
                    '<span class="time-lang">+---Час</span>' +
                '</div>' +
                '<div class="three">' +
                    '<span class="sum-lang">+------Сума</span>+' +
                '</div>' +
            '</div>' +
            '<div class="flex ">' +
                '<div class="first">' +
                     '|<span class="poOkladu-lang">+ПО ОКЛАДУ</span>' +
                '</div>' +
                '<div class="two flexBetween">' +
                      '<div> |</div>' +'<div class="alignRight">' + r.normaFact + '' + '</div>' +
                '</div>' +
                '<div class="three flexBetween">' +
                    '<div class="hour-lang">г</div>' +'<div class="alignRight">' + Math.round(r.okladFact) + '|' + '</div>' +
                '</div>' +
            '</div>' +
            '<div class="flex ">' +
                '<div class="first flexBetween">' +
                    '<div>|</div>' + '<div class="vidprTime-lang">відпрацьваний час</div>' +
                '</div>' +
                '<div class="two flexBetween">' +
                    '<div>|</div>'+'<div class="alignRight">' + positiveEnd +  (r.fact - r.normaFact) + '' + '</div>' +
                '</div>' +
                '<div class="three flexBetween">' +
                    '<div class="hour-lang">г</div>' +'<div class="alignRight">|</div>' +
                '</div>' +
            '</div>' +
            '<div class="flex ">' +
                '<div class="first">' +
                    '|<span class="oplataNight-lang">ОПЛАТА нічного часу</span>' +
                '</div>' +
                '<div class="two flexBetween">' +
                    '<div>|</div>' +'<div class="alignRight">' + r.night + '' + '</div>' +
                '</div>' +
                '<div class="three flexBetween">' +
                    '<div class="hour-lang">г</div>' +'<div class="alignRight">' + r.moneyNight + '|' + '</div>' +
                '</div>' +
            '</div>' +
            '<div class="flex ">' +
                '<div class="first">' +
                    '|<span class="oplataEven-lang">ОПЛАТА вечірнього часу</span>' +
                '</div>' +
                '<div class="two flexBetween">' +
                    '<div>|</div>' +'<div class="alignRight">' + r.evening + '' + '</div>' +
                '</div>' +
                '<div class="three flexBetween">' +
                    '<div class="hour-lang">г</div>' +'<div class="alignRight">' + r.moneyEvening + '|' + '</div>' +
                '</div>' +
            '</div>' +
            '<div class="flex ">' +
                '<div class="first">' +
                    '|<span class="indexZarob-lang">ІНДЕКСАЦІЯ заробітньої плати</span>' +
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
                    '<div>|</div>' + '<div class="allNarah-lang">ВСЬОГО НАРАХОВАНО:</div>' +
                '</div>' +
                '<div class="two flexBetween">' +
                    '<div>|</div>'+'<div class="alignRight">' + positiveEnd + (r.fact - r.normaFact) + '' + '</div>' +
                '</div>' +
                '<div class="three flexBetween">' +
                    '<div class="hour-lang">г</div>' +'<div class="alignRight">' + r.allMoney + '|' + '</div>' +
                '</div>' +
            '</div>' +
            '<div>+----------------------------------+------+----------+</div>' +
            '<div class="flex ">' +
                '<div class="first">' +
                    '|<span class="podatokFiz-lang">Податок з доходів фізичних Осіб</span>' +
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
                    '|<span class="opodakSum-lang">Оподаткована сума</span> ' + r.allMoney +
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
                    '|<span class="profkom-lang">Профспілковий внесок 1%</span>' +
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
                    '|<span class="militar-lang">Військовий збір</span>' +
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
                    '<div>|</div>' + '<div class="allUtr-lang">ВСЬОГО УТРИМАНО:</div>' +
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
                    '<div>|</div>' + '<div class="doVidachi-lang">ДО ВИДАЧІ (мпк-банкомат) :</div>' +
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
function hourDetails(){
    let arr = [];
    let day = 0;
    let nigh = 0;
    let evening = 0;
    let vidpustkaAll = 0;
    let vidpustkaMinus = 0;
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
        else if(elementTableTd[i].innerHTML == 'В'){
            if(elementTableTdDaysOfWeek[i].innerHTML == 'СБ' | elementTableTdDaysOfWeek[i].innerHTML == 'НД'){

            }
            else{
                vidpustkaAll += 1;
            }
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
    arr[3] = vidpustkaAll;
    console.log(arr[3]);
    return arr;
}
function changeDay(){
    elementTable.innerHTML = createTableText();
    elementTableTd = document.querySelectorAll(".grafTd");
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
                console.log('onBlur');
                elementTableTd[i].innerHTML = event.target.value;
                console.log(elementTableTd[i].innerHTML);
                if(elementTableTd[i].innerHTML == 'В'){
                    console.log('fffffffffffffffffffff');
                    elementTableTd[i].classList.add('backGroundGreen');
                }
                else{
                    elementTableTd[i].classList.remove('backGroundGreen');
                }
            };
        };
        elementTableTd[i].onchange = function (event){
            if(event.target.innerHTML == 'В'){
                console.log('fffffffffffffffffffff');
                event.target.classList.add('backGroundGreen');
            }
            else{
                event.target.classList.remove('backGroundGreen');
            }
        }
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
    let year = Number(document.querySelector("#year").value);
    let month = Number(document.querySelector("#month").value);
    let days = new Date(year, month, 0).getDate();
    let result = '';
    result += '<table id="table">' + '<tr>';
    for(let i = 0; i < days; i++){
        let count = i + 1;
        let daysArr = ['НД', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];
        let clas = '';
        let day = daysArr[new Date(year,month-1, count).getDay()];
        if(day == 'СБ' | day == 'НД'){
            clas = 'backGroundYellow';
        }
        result += '<td class="grafDaysOfWeek ' + clas + '">' + day + '</td>';
    }
    result += '</tr><tr>';
    for(let i = 0; i < days; i++){
        let count = i + 1;
        let daysArr = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];
        console.log(daysArr[new Date(year,month-1, count).getDay()]);
        result += '<td>' + count + '</td>';
    }
    result += '</tr><tr>';
    for(let i = 0; i < days; i++){
        result += '<td class="grafTd"></td>';
    }
    result +='</tr></table>';
    return result;
}
function lang(){
    elemLang.addEventListener('change', changeLanguage);
}
function changeLanguage(){
    let lang = elemLang.value;
    for(let key in langArr){
        let doc = document.querySelectorAll('.' + key);
        if(doc){
            for(let docI of doc){
                if(docI.type == 'button'){
                    docI.value = langArr[key][lang];
                }
                else{
                    docI.innerHTML = langArr[key][lang];
                }
            }
        }
    }
}

addEventsInputs();
addOnClick();
lang();

