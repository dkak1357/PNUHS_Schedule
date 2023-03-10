


const Select_G = document.querySelector('select#Grade') //html Select의 ID가 Grade 인 것을 Select_G로 지정
const Grade_nb = localStorage.getItem('Grade') //로컬스토리지에 저장되어있는 class_nb 값을 Class_nb2 변수에 저장
Select_G.addEventListener('change', () => {
    const Grade_nb = Select_G.options[Select_G.selectedIndex].value //지금 셀렉트 옵션 값을 color로 지정 
})
if (Grade_nb !== null) {

    Select_G.value = Grade_nb
}

const Select_C = document.querySelector('select#Class') //html Select의 ID가 Grade 인 것을 Select_G로 지정
const Class_nb = localStorage.getItem('Class') //로컬스토리지에 저장되어있는 class_nb 값을 Class_nb2 변수에 저장
Select_C.addEventListener('change', () => {
    const Class_nb = Select_C.options[Select_C.selectedIndex].value //지금 셀렉트 옵션 값을 color로 지정 
})
if (Class_nb !== null) {

    Select_C.value = Class_nb
}

function changeFn() {
    var Grade = document.getElementById("Grade");
    var value = (Grade.options[Grade.selectedIndex].value);
    console.log(value);
    localStorage.setItem("Grade", value);
    location.reload();

}

function changeFn2() {
    var Grade = document.getElementById("Class");
    var Cvalue = (Class.options[Class.selectedIndex].value);
    localStorage.setItem("Class", Cvalue);
    location.reload();

}
let today = new Date(); // 오늘 날짜
let year = today.getFullYear(); // 년도
var month = today.getMonth() + 1; // 월 (10 미만시에 0 추가)
if (month < 10) {
    month = "0" + month;
}
var date = today.getDate(); // 일 (10 미만시에 0 추가)
if (date < 10) {
    date = "0" + date;
}
$.ajax({

    method: "GET",

    url: "https://open.neis.go.kr/hub/mealServiceDietInfo?type=json",

    data: { key: 'ede0ece91c0444b49ffe22086893142a',        ATPT_OFCDC_SC_CODE: "C10", SD_SCHUL_CODE: "7005103", MLSV_YMD: year + '' + month + '' + date
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

    url: "https://open.neis.go.kr/hub/mealServiceDietInfo?type=json",

    data: {
        key: 'ede0ece91c0444b49ffe22086893142a', ATPT_OFCDC_SC_CODE: "C10", SD_SCHUL_CODE: "7005103", MLSV_YMD: year + '' + month + '' + date
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

// temp2.hisTimetable[0].head[0].list_total_count / 옆에 문장으로 if 1이면 1교시까지하구나 {a.hisTimetable[1].row[0].ITRT_CNTN}를 1교시까지만 하게하기
//참고 https://hjcode.tistory.com/73 
const grade_ = localStorage.getItem("Grade");
const class_ = localStorage.getItem("Class");
var currentDay = new Date();
var Year_ = currentDay.getFullYear();
var Month_for_subjectplan = currentDay.getMonth();
var Date_for_subjectplan = currentDay.getDate();
var DayOfWeek_for_subjectplan = currentDay.getDay();
var thisWeek_for_subjectplan = [];
$("#GC_").append(grade_ + "-" + class_);


for (var i = 0; i < 7; i++) {
    var resultDay = new Date(Year_, Month_for_subjectplan, Date_for_subjectplan + (i - DayOfWeek_for_subjectplan));
    var yyyy = resultDay.getFullYear();
    var mm = Number(resultDay.getMonth()) + 1;
    var dd = resultDay.getDate();

    mm = String(mm).length === 1 ? '0' + mm : mm;
    dd = String(dd).length === 1 ? '0' + dd : dd;

    thisWeek_for_subjectplan[i] = yyyy + '' + mm + '' + dd;
    var Mon = thisWeek_for_subjectplan[1];
    var Tue = thisWeek_for_subjectplan[2];
    var Wen = thisWeek_for_subjectplan[3];
    var Tur = thisWeek_for_subjectplan[4];
    var Fri = thisWeek_for_subjectplan[5];

}

$.ajax({
    method: "GET",
    url: "https://open.neis.go.kr/hub/hisTimetable?Type=JSON",
    data: { key: 'ede0ece91c0444b49ffe22086893142a', ATPT_OFCDC_SC_CODE: "C10", SD_SCHUL_CODE: "7005103", GRADE: grade_, CLASS_NM: class_, TI_FROM_YMD: Mon, TI_TO_YMD: Mon }
}) // 월요일 시간표 -시작
    .done(function (msg) {
        const first_received = msg
        const received_json = JSON.parse(first_received);
        const total_time_table = received_json.hisTimetable[0].head[0].list_total_count;

        if (total_time_table === 1) {
            const Mon1_ = received_json.hisTimetable[1].row[0].ITRT_CNTNT;
            $("#Mon1_").append(Mon1_);

        }
        else {
            if (total_time_table === 2) {
                const Mon1_ = received_json.hisTimetable[1].row[0].ITRT_CNTNT;
                $("#Mon1_").append(Mon1_);
                const Mon2_ = received_json.hisTimetable[1].row[1].ITRT_CNTNT;
                $("#Mon2_").append(Mon2_);
            }
            else {
                if (total_time_table === 3) {
                    const Mon1_ = received_json.hisTimetable[1].row[0].ITRT_CNTNT;
                    $("#Mon1_").append(Mon1_);
                    const Mon2_ = received_json.hisTimetable[1].row[1].ITRT_CNTNT;
                    $("#Mon2_").append(Mon2_);
                    const Mon3_ = received_json.hisTimetable[1].row[2].ITRT_CNTNT;
                    $("#Mon3_").append(Mon3_);
                }
                else {
                    if (total_time_table === 4) {
                        const Mon1_ = received_json.hisTimetable[1].row[0].ITRT_CNTNT;
                        $("#Mon1_").append(Mon1_);
                        const Mon2_ = received_json.hisTimetable[1].row[1].ITRT_CNTNT;
                        $("#Mon2_").append(Mon2_);
                        const Mon3_ = received_json.hisTimetable[1].row[2].ITRT_CNTNT;
                        $("#Mon3_").append(Mon3_);
                        const Mon4_ = received_json.hisTimetable[1].row[3].ITRT_CNTNT;
                        $("#Mon4_").append(Mon4_);
                    }
                    else {
                        if (total_time_table === 5) {
                            const Mon1_ = received_json.hisTimetable[1].row[0].ITRT_CNTNT;
                            $("#Mon1_").append(Mon1_);
                            const Mon2_ = received_json.hisTimetable[1].row[1].ITRT_CNTNT;
                            $("#Mon2_").append(Mon2_);
                            const Mon3_ = received_json.hisTimetable[1].row[2].ITRT_CNTNT;
                            $("#Mon3_").append(Mon3_);
                            const Mon4_ = received_json.hisTimetable[1].row[3].ITRT_CNTNT;
                            $("#Mon4_").append(Mon4_);
                            const Mon5_ = received_json.hisTimetable[1].row[4].ITRT_CNTNT;
                            $("#Mon5_").append(Mon5_);
                        }
                        else {
                            if (total_time_table === 6) {
                                const Mon1_ = received_json.hisTimetable[1].row[0].ITRT_CNTNT;
                                $("#Mon1_").append(Mon1_);
                                const Mon2_ = received_json.hisTimetable[1].row[1].ITRT_CNTNT;
                                $("#Mon2_").append(Mon2_);
                                const Mon3_ = received_json.hisTimetable[1].row[2].ITRT_CNTNT;
                                $("#Mon3_").append(Mon3_);
                                const Mon4_ = received_json.hisTimetable[1].row[3].ITRT_CNTNT;
                                $("#Mon4_").append(Mon4_);
                                const Mon5_ = received_json.hisTimetable[1].row[4].ITRT_CNTNT;
                                $("#Mon5_").append(Mon5_);
                                const Mon6_ = received_json.hisTimetable[1].row[5].ITRT_CNTNT;
                                $("#Mon6_").append(Mon6_);
                            }
                            else {
                                if (total_time_table === 7) {
                                    const Mon1_ = received_json.hisTimetable[1].row[0].ITRT_CNTNT;
                                    $("#Mon1_").append(Mon1_);
                                    const Mon2_ = received_json.hisTimetable[1].row[1].ITRT_CNTNT;
                                    $("#Mon2_").append(Mon2_);
                                    const Mon3_ = received_json.hisTimetable[1].row[2].ITRT_CNTNT;
                                    $("#Mon3_").append(Mon3_);
                                    const Mon4_ = received_json.hisTimetable[1].row[3].ITRT_CNTNT;
                                    $("#Mon4_").append(Mon4_);
                                    const Mon5_ = received_json.hisTimetable[1].row[4].ITRT_CNTNT;
                                    $("#Mon5_").append(Mon5_);
                                    const Mon6_ = received_json.hisTimetable[1].row[5].ITRT_CNTNT;
                                    $("#Mon6_").append(Mon6_);
                                    const Mon7_ = received_json.hisTimetable[1].row[6].ITRT_CNTNT;
                                    $("#Mon7_").append(Mon7_);
                                }
                                else {
                                    if (total_time_table === 8) {
                                        const Mon1_ = received_json.hisTimetable[1].row[0].ITRT_CNTNT;
                                        $("#Mon1_").append(Mon1_);
                                        const Mon2_ = received_json.hisTimetable[1].row[1].ITRT_CNTNT;
                                        $("#Mon2_").append(Mon2_);
                                        const Mon3_ = received_json.hisTimetable[1].row[2].ITRT_CNTNT;
                                        $("#Mon3_").append(Mon3_);
                                        const Mon4_ = received_json.hisTimetable[1].row[3].ITRT_CNTNT;
                                        $("#Mon4_").append(Mon4_);
                                        const Mon5_ = received_json.hisTimetable[1].row[4].ITRT_CNTNT;
                                        $("#Mon5_").append(Mon5_);
                                        const Mon6_ = received_json.hisTimetable[1].row[5].ITRT_CNTNT;
                                        $("#Mon6_").append(Mon6_);
                                        const Mon7_ = received_json.hisTimetable[1].row[6].ITRT_CNTNT;
                                        $("#Mon7_").append(Mon7_);
                                        const t8 = received_json.hisTimetable[1].row[7].ITRT_CNTNT;
                                        $("#t8").append(t8);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }); //월요일 시작표 - 끝


$.ajax({
    method: "GET",
    url: "https://open.neis.go.kr/hub/hisTimetable?Type=JSON",
    data: { key: 'ede0ece91c0444b49ffe22086893142a', ATPT_OFCDC_SC_CODE: "C10", SD_SCHUL_CODE: "7005103", GRADE: grade_, CLASS_NM: class_, TI_FROM_YMD: Tue, TI_TO_YMD: Tue }
}) // 화요일 시간표 -시작
    .done(function (msg) {
        const first_received = msg
        const received_json = JSON.parse(first_received);
        const total_time_table = received_json.hisTimetable[0].head[0].list_total_count;

        if (total_time_table === 1) {
            const Tue1_ = received_json.hisTimetable[1].row[0].ITRT_CNTNT;
            $("#Tue1_").append(Tue1_);
        }
        else {
            if (total_time_table === 2) {
                const Tue1_ = received_json.hisTimetable[1].row[0].ITRT_CNTNT;
                $("#Tue1_").append(Tue1_);
                const Tue2_ = received_json.hisTimetable[1].row[1].ITRT_CNTNT;
                $("#Tue2_").append(Tue2_);
            }
            else {
                if (total_time_table === 3) {
                    const Tue1_ = received_json.hisTimetable[1].row[0].ITRT_CNTNT;
                    $("#Tue1_").append(Tue1_);
                    const Tue2_ = received_json.hisTimetable[1].row[1].ITRT_CNTNT;
                    $("#Tue2_").append(Tue2_);
                    const Tue3_ = received_json.hisTimetable[1].row[2].ITRT_CNTNT;
                    $("#Tue3_").append(Tue3_);
                }
                else {
                    if (total_time_table === 4) {
                        const Tue1_ = received_json.hisTimetable[1].row[0].ITRT_CNTNT;
                        $("#Tue1_").append(Tue1_);
                        const Tue2_ = received_json.hisTimetable[1].row[1].ITRT_CNTNT;
                        $("#Tue2_").append(Tue2_);
                        const Tue3_ = received_json.hisTimetable[1].row[2].ITRT_CNTNT;
                        $("#Tue3_").append(Tue3_);
                        const Tue4_ = received_json.hisTimetable[1].row[3].ITRT_CNTNT;
                        $("#Tue4_").append(Tue4_);
                    }
                    else {
                        if (total_time_table === 5) {
                            const Tue1_ = received_json.hisTimetable[1].row[0].ITRT_CNTNT;
                            $("#Tue1_").append(Tue1_);
                            const Tue2_ = received_json.hisTimetable[1].row[1].ITRT_CNTNT;
                            $("#Tue2_").append(Tue2_);
                            const Tue3_ = received_json.hisTimetable[1].row[2].ITRT_CNTNT;
                            $("#Tue3_").append(Tue3_);
                            const Tue4_ = received_json.hisTimetable[1].row[3].ITRT_CNTNT;
                            $("#Tue4_").append(Tue4_);
                            const Tue5_ = received_json.hisTimetable[1].row[4].ITRT_CNTNT;
                            $("#Tue5_").append(Tue5_);
                        }
                        else {
                            if (total_time_table === 6) {
                                const Tue1_ = received_json.hisTimetable[1].row[0].ITRT_CNTNT;
                                $("#Tue1_").append(Tue1_);
                                const Tue2_ = received_json.hisTimetable[1].row[1].ITRT_CNTNT;
                                $("#Tue2_").append(Tue2_);
                                const Tue3_ = received_json.hisTimetable[1].row[2].ITRT_CNTNT;
                                $("#Tue3_").append(Tue3_);
                                const Tue4_ = received_json.hisTimetable[1].row[3].ITRT_CNTNT;
                                $("#Tue4_").append(Tue4_);
                                const Tue5_ = received_json.hisTimetable[1].row[4].ITRT_CNTNT;
                                $("#Tue5_").append(Tue5_);
                                const Tue6_ = received_json.hisTimetable[1].row[5].ITRT_CNTNT;
                                $("#Tue6_").append(Tue6_);
                            }
                            else {
                                if (total_time_table === 7) {
                                    const Tue1_ = received_json.hisTimetable[1].row[0].ITRT_CNTNT;
                                    $("#Tue1_").append(Tue1_);
                                    const Tue2_ = received_json.hisTimetable[1].row[1].ITRT_CNTNT;
                                    $("#Tue2_").append(Tue2_);
                                    const Tue3_ = received_json.hisTimetable[1].row[2].ITRT_CNTNT;
                                    $("#Tue3_").append(Tue3_);
                                    const Tue4_ = received_json.hisTimetable[1].row[3].ITRT_CNTNT;
                                    $("#Tue4_").append(Tue4_);
                                    const Tue5_ = received_json.hisTimetable[1].row[4].ITRT_CNTNT;
                                    $("#Tue5_").append(Tue5_);
                                    const Tue6_ = received_json.hisTimetable[1].row[5].ITRT_CNTNT;
                                    $("#Tue6_").append(Tue6_);
                                    const Tue7_ = received_json.hisTimetable[1].row[6].ITRT_CNTNT;
                                    $("#Tue7_").append(Tue7_);
                                }
                                else {
                                    if (total_time_table === 8) {
                                        const Tue1_ = received_json.hisTimetable[1].row[0].ITRT_CNTNT;
                                        $("#Tue1_").append(Tue1_);
                                        const Tue2_ = received_json.hisTimetable[1].row[1].ITRT_CNTNT;
                                        $("#Tue2_").append(Tue2_);
                                        const Tue3_ = received_json.hisTimetable[1].row[2].ITRT_CNTNT;
                                        $("#Tue3_").append(Tue3_);
                                        const Tue4_ = received_json.hisTimetable[1].row[3].ITRT_CNTNT;
                                        $("#Tue4_").append(Tue4_);
                                        const Tue5_ = received_json.hisTimetable[1].row[4].ITRT_CNTNT;
                                        $("#Tue5_").append(Tue5_);
                                        const Tue6_ = received_json.hisTimetable[1].row[5].ITRT_CNTNT;
                                        $("#Tue6_").append(Tue6_);
                                        const Tue7_ = received_json.hisTimetable[1].row[6].ITRT_CNTNT;
                                        $("#Tue7_").append(Tue7_);
                                        const t8 = received_json.hisTimetable[1].row[7].ITRT_CNTNT;
                                        $("#t8").append(t8);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }); //화요일 시작표 - 끝

$.ajax({
    method: "GET",
    url: "https://open.neis.go.kr/hub/hisTimetable?Type=JSON",
    data: { key: 'ede0ece91c0444b49ffe22086893142a', ATPT_OFCDC_SC_CODE: "C10", SD_SCHUL_CODE: "7005103", GRADE: grade_, CLASS_NM: class_, TI_FROM_YMD: Wen, TI_TO_YMD: Wen }
}) // 수요일 시간표 -시작
    .done(function (msg) {
        const first_received = msg
        const received_json = JSON.parse(first_received);
        const total_time_table = received_json.hisTimetable[0].head[0].list_total_count;

        if (total_time_table === 1) {
            const Wen1_ = received_json.hisTimetable[1].row[0].ITRT_CNTNT;
            $("#Wen1_").append(Wen1_);
        }
        else {
            if (total_time_table === 2) {
                const Wen1_ = received_json.hisTimetable[1].row[0].ITRT_CNTNT;
                $("#Wen1_").append(Wen1_);
                const Wen2_ = received_json.hisTimetable[1].row[1].ITRT_CNTNT;
                $("#Wen2_").append(Wen2_);
            }
            else {
                if (total_time_table === 3) {
                    const Wen1_ = received_json.hisTimetable[1].row[0].ITRT_CNTNT;
                    $("#Wen1_").append(Wen1_);
                    const Wen2_ = received_json.hisTimetable[1].row[1].ITRT_CNTNT;
                    $("#Wen2_").append(Wen2_);
                    const Wen3_ = received_json.hisTimetable[1].row[2].ITRT_CNTNT;
                    $("#Wen3_").append(Wen3_);
                }
                else {
                    if (total_time_table === 4) {
                        const Wen1_ = received_json.hisTimetable[1].row[0].ITRT_CNTNT;
                        $("#Wen1_").append(Wen1_);
                        const Wen2_ = received_json.hisTimetable[1].row[1].ITRT_CNTNT;
                        $("#Wen2_").append(Wen2_);
                        const Wen3_ = received_json.hisTimetable[1].row[2].ITRT_CNTNT;
                        $("#Wen3_").append(Wen3_);
                        const Wen4_ = received_json.hisTimetable[1].row[3].ITRT_CNTNT;
                        $("#Wen4_").append(Wen4_);
                    }
                    else {
                        if (total_time_table === 5) {
                            const Wen1_ = received_json.hisTimetable[1].row[0].ITRT_CNTNT;
                            $("#Wen1_").append(Wen1_);
                            const Wen2_ = received_json.hisTimetable[1].row[1].ITRT_CNTNT;
                            $("#Wen2_").append(Wen2_);
                            const Wen3_ = received_json.hisTimetable[1].row[2].ITRT_CNTNT;
                            $("#Wen3_").append(Wen3_);
                            const Wen4_ = received_json.hisTimetable[1].row[3].ITRT_CNTNT;
                            $("#Wen4_").append(Wen4_);
                            const Wen5_ = received_json.hisTimetable[1].row[4].ITRT_CNTNT;
                            $("#Wen5_").append(Wen5_);
                        }
                        else {
                            if (total_time_table === 6) {
                                const Wen1_ = received_json.hisTimetable[1].row[0].ITRT_CNTNT;
                                $("#Wen1_").append(Wen1_);
                                const Wen2_ = received_json.hisTimetable[1].row[1].ITRT_CNTNT;
                                $("#Wen2_").append(Wen2_);
                                const Wen3_ = received_json.hisTimetable[1].row[2].ITRT_CNTNT;
                                $("#Wen3_").append(Wen3_);
                                const Wen4_ = received_json.hisTimetable[1].row[3].ITRT_CNTNT;
                                $("#Wen4_").append(Wen4_);
                                const Wen5_ = received_json.hisTimetable[1].row[4].ITRT_CNTNT;
                                $("#Wen5_").append(Wen5_);
                                const Wen6_ = received_json.hisTimetable[1].row[5].ITRT_CNTNT;
                                $("#Wen6_").append(Wen6_);
                            }
                            else {
                                if (total_time_table === 7) {
                                    const Wen1_ = received_json.hisTimetable[1].row[0].ITRT_CNTNT;
                                    $("#Wen1_").append(Wen1_);
                                    const Wen2_ = received_json.hisTimetable[1].row[1].ITRT_CNTNT;
                                    $("#Wen2_").append(Wen2_);
                                    const Wen3_ = received_json.hisTimetable[1].row[2].ITRT_CNTNT;
                                    $("#Wen3_").append(Wen3_);
                                    const Wen4_ = received_json.hisTimetable[1].row[3].ITRT_CNTNT;
                                    $("#Wen4_").append(Wen4_);
                                    const Wen5_ = received_json.hisTimetable[1].row[4].ITRT_CNTNT;
                                    $("#Wen5_").append(Wen5_);
                                    const Wen6_ = received_json.hisTimetable[1].row[5].ITRT_CNTNT;
                                    $("#Wen6_").append(Wen6_);
                                    const Wen7_ = received_json.hisTimetable[1].row[6].ITRT_CNTNT;
                                    $("#Wen7_").append(Wen7_);
                                }
                                else {
                                    if (total_time_table === 8) {
                                        const Wen1_ = received_json.hisTimetable[1].row[0].ITRT_CNTNT;
                                        $("#Wen1_").append(Wen1_);
                                        const Wen2_ = received_json.hisTimetable[1].row[1].ITRT_CNTNT;
                                        $("#Wen2_").append(Wen2_);
                                        const Wen3_ = received_json.hisTimetable[1].row[2].ITRT_CNTNT;
                                        $("#Wen3_").append(Wen3_);
                                        const Wen4_ = received_json.hisTimetable[1].row[3].ITRT_CNTNT;
                                        $("#Wen4_").append(Wen4_);
                                        const Wen5_ = received_json.hisTimetable[1].row[4].ITRT_CNTNT;
                                        $("#Wen5_").append(Wen5_);
                                        const Wen6_ = received_json.hisTimetable[1].row[5].ITRT_CNTNT;
                                        $("#Wen6_").append(Wen6_);
                                        const Wen7_ = received_json.hisTimetable[1].row[6].ITRT_CNTNT;
                                        $("#Wen7_").append(Wen7_);
                                        const t8 = received_json.hisTimetable[1].row[7].ITRT_CNTNT;
                                        $("#t8").append(t8);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }); //수요일 시작표 - 끝

$.ajax({
    method: "GET",
    url: "https://open.neis.go.kr/hub/hisTimetable?Type=JSON",
    data: { key: 'ede0ece91c0444b49ffe22086893142a', ATPT_OFCDC_SC_CODE: "C10", SD_SCHUL_CODE: "7005103", GRADE: grade_, CLASS_NM: class_, TI_FROM_YMD: Tur, TI_TO_YMD: Tur }
}) // 목요일 시간표 -시작
    .done(function (msg) {
        const first_received = msg
        const received_json = JSON.parse(first_received);
        const total_time_table = received_json.hisTimetable[0].head[0].list_total_count;

        if (total_time_table === 1) {
            const Tur1_ = received_json.hisTimetable[1].row[0].ITRT_CNTNT;
            $("#Tur1_").append(Tur1_);
        }
        else {
            if (total_time_table === 2) {
                const Tur1_ = received_json.hisTimetable[1].row[0].ITRT_CNTNT;
                $("#Tur1_").append(Tur1_);
                const Tur2_ = received_json.hisTimetable[1].row[1].ITRT_CNTNT;
                $("#Tur2_").append(Tur2_);
            }
            else {
                if (total_time_table === 3) {
                    const Tur1_ = received_json.hisTimetable[1].row[0].ITRT_CNTNT;
                    $("#Tur1_").append(Tur1_);
                    const Tur2_ = received_json.hisTimetable[1].row[1].ITRT_CNTNT;
                    $("#Tur2_").append(Tur2_);
                    const Tur3_ = received_json.hisTimetable[1].row[2].ITRT_CNTNT;
                    $("#Tur3_").append(Tur3_);
                }
                else {
                    if (total_time_table === 4) {
                        const Tur1_ = received_json.hisTimetable[1].row[0].ITRT_CNTNT;
                        $("#Tur1_").append(Tur1_);
                        const Tur2_ = received_json.hisTimetable[1].row[1].ITRT_CNTNT;
                        $("#Tur2_").append(Tur2_);
                        const Tur3_ = received_json.hisTimetable[1].row[2].ITRT_CNTNT;
                        $("#Tur3_").append(Tur3_);
                        const Tur4_ = received_json.hisTimetable[1].row[3].ITRT_CNTNT;
                        $("#Tur4_").append(Tur4_);
                    }
                    else {
                        if (total_time_table === 5) {
                            const Tur1_ = received_json.hisTimetable[1].row[0].ITRT_CNTNT;
                            $("#Tur1_").append(Tur1_);
                            const Tur2_ = received_json.hisTimetable[1].row[1].ITRT_CNTNT;
                            $("#Tur2_").append(Tur2_);
                            const Tur3_ = received_json.hisTimetable[1].row[2].ITRT_CNTNT;
                            $("#Tur3_").append(Tur3_);
                            const Tur4_ = received_json.hisTimetable[1].row[3].ITRT_CNTNT;
                            $("#Tur4_").append(Tur4_);
                            const Tur5_ = received_json.hisTimetable[1].row[4].ITRT_CNTNT;
                            $("#Tur5_").append(Tur5_);
                        }
                        else {
                            if (total_time_table === 6) {
                                const Tur1_ = received_json.hisTimetable[1].row[0].ITRT_CNTNT;
                                $("#Tur1_").append(Tur1_);
                                const Tur2_ = received_json.hisTimetable[1].row[1].ITRT_CNTNT;
                                $("#Tur2_").append(Tur2_);
                                const Tur3_ = received_json.hisTimetable[1].row[2].ITRT_CNTNT;
                                $("#Tur3_").append(Tur3_);
                                const Tur4_ = received_json.hisTimetable[1].row[3].ITRT_CNTNT;
                                $("#Tur4_").append(Tur4_);
                                const Tur5_ = received_json.hisTimetable[1].row[4].ITRT_CNTNT;
                                $("#Tur5_").append(Tur5_);
                                const Tur6_ = received_json.hisTimetable[1].row[5].ITRT_CNTNT;
                                $("#Tur6_").append(Tur6_);
                            }
                            else {
                                if (total_time_table === 7) {
                                    const Tur1_ = received_json.hisTimetable[1].row[0].ITRT_CNTNT;
                                    $("#Tur1_").append(Tur1_);
                                    const Tur2_ = received_json.hisTimetable[1].row[1].ITRT_CNTNT;
                                    $("#Tur2_").append(Tur2_);
                                    const Tur3_ = received_json.hisTimetable[1].row[2].ITRT_CNTNT;
                                    $("#Tur3_").append(Tur3_);
                                    const Tur4_ = received_json.hisTimetable[1].row[3].ITRT_CNTNT;
                                    $("#Tur4_").append(Tur4_);
                                    const Tur5_ = received_json.hisTimetable[1].row[4].ITRT_CNTNT;
                                    $("#Tur5_").append(Tur5_);
                                    const Tur6_ = received_json.hisTimetable[1].row[5].ITRT_CNTNT;
                                    $("#Tur6_").append(Tur6_);
                                    const Tur7_ = received_json.hisTimetable[1].row[6].ITRT_CNTNT;
                                    $("#Tur7_").append(Tur7_);
                                }
                                else {
                                    if (total_time_table === 8) {
                                        const Tur1_ = received_json.hisTimetable[1].row[0].ITRT_CNTNT;
                                        $("#Tur1_").append(Tur1_);
                                        const Tur2_ = received_json.hisTimetable[1].row[1].ITRT_CNTNT;
                                        $("#Tur2_").append(Tur2_);
                                        const Tur3_ = received_json.hisTimetable[1].row[2].ITRT_CNTNT;
                                        $("#Tur3_").append(Tur3_);
                                        const Tur4_ = received_json.hisTimetable[1].row[3].ITRT_CNTNT;
                                        $("#Tur4_").append(Tur4_);
                                        const Tur5_ = received_json.hisTimetable[1].row[4].ITRT_CNTNT;
                                        $("#Tur5_").append(Tur5_);
                                        const Tur6_ = received_json.hisTimetable[1].row[5].ITRT_CNTNT;
                                        $("#Tur6_").append(Tur6_);
                                        const Tur7_ = received_json.hisTimetable[1].row[6].ITRT_CNTNT;
                                        $("#Tur7_").append(Tur7_);
                                        const t8 = received_json.hisTimetable[1].row[7].ITRT_CNTNT;
                                        $("#t8").append(t8);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }); //목요일 시작표 - 끝

$.ajax({
    method: "GET",
    url: "https://open.neis.go.kr/hub/hisTimetable?Type=JSON",
    data: { key: 'ede0ece91c0444b49ffe22086893142a', ATPT_OFCDC_SC_CODE: "C10", SD_SCHUL_CODE: "7005103", GRADE: grade_, CLASS_NM: class_, TI_FROM_YMD: Fri, TI_TO_YMD: Fri }
}) // 금요일 시간표 -시작
    .done(function (msg) {
        const first_received = msg
        const received_json = JSON.parse(first_received);
        const total_time_table = received_json.hisTimetable[0].head[0].list_total_count;

        if (total_time_table === 1) {
            const Fri1_ = received_json.hisTimetable[1].row[0].ITRT_CNTNT;
            $("#Fri1_").append(Fri1_);
        }
        else {
            if (total_time_table === 2) {
                const Fri1_ = received_json.hisTimetable[1].row[0].ITRT_CNTNT;
                $("#Fri1_").append(Fri1_);
                const Fri2_ = received_json.hisTimetable[1].row[1].ITRT_CNTNT;
                $("#Fri2_").append(Fri2_);
            }
            else {
                if (total_time_table === 3) {
                    const Fri1_ = received_json.hisTimetable[1].row[0].ITRT_CNTNT;
                    $("#Fri1_").append(Fri1_);
                    const Fri2_ = received_json.hisTimetable[1].row[1].ITRT_CNTNT;
                    $("#Fri2_").append(Fri2_);
                    const Fri3_ = received_json.hisTimetable[1].row[2].ITRT_CNTNT;
                    $("#Fri3_").append(Fri3_);
                }
                else {
                    if (total_time_table === 4) {
                        const Fri1_ = received_json.hisTimetable[1].row[0].ITRT_CNTNT;
                        $("#Fri1_").append(Fri1_);
                        const Fri2_ = received_json.hisTimetable[1].row[1].ITRT_CNTNT;
                        $("#Fri2_").append(Fri2_);
                        const Fri3_ = received_json.hisTimetable[1].row[2].ITRT_CNTNT;
                        $("#Fri3_").append(Fri3_);
                        const Fri4_ = received_json.hisTimetable[1].row[3].ITRT_CNTNT;
                        $("#Fri4_").append(Fri4_);
                    }
                    else {
                        if (total_time_table === 5) {
                            const Fri1_ = received_json.hisTimetable[1].row[0].ITRT_CNTNT;
                            $("#Fri1_").append(Fri1_);
                            const Fri2_ = received_json.hisTimetable[1].row[1].ITRT_CNTNT;
                            $("#Fri2_").append(Fri2_);
                            const Fri3_ = received_json.hisTimetable[1].row[2].ITRT_CNTNT;
                            $("#Fri3_").append(Fri3_);
                            const Fri4_ = received_json.hisTimetable[1].row[3].ITRT_CNTNT;
                            $("#Fri4_").append(Fri4_);
                            const Fri5_ = received_json.hisTimetable[1].row[4].ITRT_CNTNT;
                            $("#Fri5_").append(Fri5_);
                        }
                        else {
                            if (total_time_table === 6) {
                                const Fri1_ = received_json.hisTimetable[1].row[0].ITRT_CNTNT;
                                $("#Fri1_").append(Fri1_);
                                const Fri2_ = received_json.hisTimetable[1].row[1].ITRT_CNTNT;
                                $("#Fri2_").append(Fri2_);
                                const Fri3_ = received_json.hisTimetable[1].row[2].ITRT_CNTNT;
                                $("#Fri3_").append(Fri3_);
                                const Fri4_ = received_json.hisTimetable[1].row[3].ITRT_CNTNT;
                                $("#Fri4_").append(Fri4_);
                                const Fri5_ = received_json.hisTimetable[1].row[4].ITRT_CNTNT;
                                $("#Fri5_").append(Fri5_);
                                const Fri6_ = received_json.hisTimetable[1].row[5].ITRT_CNTNT;
                                $("#Fri6_").append(Fri6_);
                            }
                            else {
                                if (total_time_table === 7) {
                                    const Fri1_ = received_json.hisTimetable[1].row[0].ITRT_CNTNT;
                                    $("#Fri1_").append(Fri1_);
                                    const Fri2_ = received_json.hisTimetable[1].row[1].ITRT_CNTNT;
                                    $("#Fri2_").append(Fri2_);
                                    const Fri3_ = received_json.hisTimetable[1].row[2].ITRT_CNTNT;
                                    $("#Fri3_").append(Fri3_);
                                    const Fri4_ = received_json.hisTimetable[1].row[3].ITRT_CNTNT;
                                    $("#Fri4_").append(Fri4_);
                                    const Fri5_ = received_json.hisTimetable[1].row[4].ITRT_CNTNT;
                                    $("#Fri5_").append(Fri5_);
                                    const Fri6_ = received_json.hisTimetable[1].row[5].ITRT_CNTNT;
                                    $("#Fri6_").append(Fri6_);
                                    const Fri7_ = received_json.hisTimetable[1].row[6].ITRT_CNTNT;
                                    $("#Fri7_").append(Fri7_);
                                }
                                else {
                                    if (total_time_table === 8) {
                                        const Fri1_ = received_json.hisTimetable[1].row[0].ITRT_CNTNT;
                                        $("#Fri1_").append(Fri1_);
                                        const Fri2_ = received_json.hisTimetable[1].row[1].ITRT_CNTNT;
                                        $("#Fri2_").append(Fri2_);
                                        const Fri3_ = received_json.hisTimetable[1].row[2].ITRT_CNTNT;
                                        $("#Fri3_").append(Fri3_);
                                        const Fri4_ = received_json.hisTimetable[1].row[3].ITRT_CNTNT;
                                        $("#Fri4_").append(Fri4_);
                                        const Fri5_ = received_json.hisTimetable[1].row[4].ITRT_CNTNT;
                                        $("#Fri5_").append(Fri5_);
                                        const Fri6_ = received_json.hisTimetable[1].row[5].ITRT_CNTNT;
                                        $("#Fri6_").append(Fri6_);
                                        const Fri7_ = received_json.hisTimetable[1].row[6].ITRT_CNTNT;
                                        $("#Fri7_").append(Fri7_);
                                        const t8 = received_json.hisTimetable[1].row[7].ITRT_CNTNT;
                                        $("#t8").append(t8);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }); //금요일 시작표 - 끝
