

function changeFn() {
    var getdate = document.getElementById("inputdate_").value;

    var selectyear = getdate.replace('-', '년');
    var selectmonth = selectyear.replace('-', '월');

    console.log(getdate)
    var getdate_1 = getdate.replace('-', '');
    var getdate_2 = getdate_1.replace('-', '');
    localStorage.setItem("inputdate", getdate_2);
    var totaldate = selectmonth + "일의 급식표";
    localStorage.setItem("totaldate", totaldate);
}
function Action() {
    location.reload();
}

var date_ = localStorage.getItem('inputdate');
totaldate = localStorage.getItem('totaldate')
//console.log(totaldate);
$("#b").append(totaldate);



$.ajax({

    method: "GET",

    url: "https://open.neis.go.kr/hub/mealServiceDietInfo?type=json&key=ede0ece91c0444b49ffe22086893142a",

    data: {
        ATPT_OFCDC_SC_CODE: "C10", SD_SCHUL_CODE: "7005103", MLSV_YMD: date_
        , MMEAL_SC_CODE: "2"
    } // year+''+month+''+date

    //중식 요청

})

    .done(function (msg) {

        const d = msg;

        const { mealServiceDietInfo } = JSON.parse(d);

        const [heads, rows] = mealServiceDietInfo;

        //console.log(rows.row); // 메뉴 정보 전체



        const menul = rows.row.map((row) => row.DDISH_NM);

        //console.log(menul); // 메뉴 이름 정보

        $("#lunch").append(menul);

    });

$.ajax({

    method: "GET",

    url: "https://open.neis.go.kr/hub/mealServiceDietInfo?type=json&key=ede0ece91c0444b49ffe22086893142a",

    data: {
        ATPT_OFCDC_SC_CODE: "C10", SD_SCHUL_CODE: "7005103", MLSV_YMD: date_
        , MMEAL_SC_CODE: "3"
    }

    //석식 요청

})

    .done(function (msg) {

        const d = msg

        const { mealServiceDietInfo } = JSON.parse(d);

        const [heads, rows] = mealServiceDietInfo;

        //console.log(rows.row); // 메뉴 정보 전체



        const menud = rows.row.map((row) => row.DDISH_NM);

        //console.log(menud); // 메뉴 이름 정보

        $("#dinner").append(menud);





    });
