var inputDate=document.querySelector("#input-date");
var showBtn=document.querySelector("#btn");
var outputBox=document.querySelector("#output-box");


function reverseStr(str){
    var splitt = str.split("");
    var reverse =splitt.reverse();
    var merge =reverse.join("");
    return merge;
}

function isStrPalindrome(str){
    var strReverse = reverseStr(str);
    return str===strReverse;
}

function convertDateToStr(date){
    var dateStr={day:"",month:"",year:""};

    if(date.day<10){
        dateStr.day="0"+date.day;
    }
    else{
        dateStr.day=date.day.toString();
    }

    if(date.month<10){
        dateStr.month="0"+date.month;
    }
    else{
        dateStr.month=date.month.toString();
    }

    dateStr.year=date.year.toString();

    return dateStr;
}

function getAllDateFormats(date){
    var dateStr=convertDateToStr(date);

    var ddmmyyyy=dateStr.day+dateStr.month+dateStr.year;
    var mmddyyyy=dateStr.month+dateStr.day+dateStr.year;
    var yyyymmdd=dateStr.year+dateStr.month+dateStr.day;
    var ddmmyy=dateStr.day+dateStr.month+dateStr.year.slice(-2);
    var mmddyy=dateStr.month+dateStr.day+dateStr.year.slice(-2);
    var yymmdd=dateStr.year.slice(-2)+dateStr.month+dateStr.year;

    return[ddmmyyyy,mmddyyyy,yyyymmdd,ddmmyy,mmddyy,yymmdd];
}


function checkPalindromeForAllDateFormat(date){
    var listOfDateFormat=getAllDateFormats(date);

    var flag=false;

    for(var i=0;i<listOfDateFormat.length;i++){
        if(isStrPalindrome(listOfDateFormat[i])){
            return true;
        }
    }
    return flag;
}

function isLeap(year){
    if(year%4===0 || year%400===0){
        return true;
    }
    else if(year%100===0){
        return false;
    }
    return false;
}

function getNextdate(date){
    var day=date.day+1;
    var month=date.month;
    var year=date.year;

    var daysInmonth=[31,28,31,30,31,30,31,31,30,31,30,31];

    if(month===2){
        if(isLeap(year)){
            if(day>29){
                day=1;
                month++;
            }
        }
        else{
            if(day>28){
                day=1;
                month++;
            }
        }
    }
    else{
        if(day>daysInmonth[month-1]){
            day=1;
            month++;
        }
    }

    if(month>12){
        month=1;
        year++;
    }

    return {
        day:day,
        month:month,
        year:year
    };
}

function getNextPalindromeDate(date){
    var ctr=0;
    var nextDate=getNextdate(date);

    while(1){
        ctr++;
        var isPalindrome=checkPalindromeForAllDateFormat(nextDate);
        if(isPalindrome){
            break;
        }
        nextDate=getNextdate(nextDate);
    }

    return [ctr,nextDate];
}

function clickHandler(){
    var bdayStr=inputDate.value;

    if(bdayStr!==""){
        var splitBirthDate=bdayStr.split("-");
        var date={
            day:Number(splitBirthDate[2]),
            month:Number(splitBirthDate[1]),
            year:Number(splitBirthDate[0])
        };

        var isPalindrome=checkPalindromeForAllDateFormat(date);

        if(isPalindrome){
            outputBox.innerText=`Yayy! your birth date is palindrome !`
        }
        else{
            var[ctr,nextDate]=getNextPalindromeDate(date);

            outputBox.innerText=`Oops your birth date is not palindrome. The next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}. You missed it by ${ctr} days!`;
        }
    }
}


showBtn.addEventListener("click",clickHandler);

