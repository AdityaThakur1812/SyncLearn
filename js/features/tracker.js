let studyHoursInput ;
let addStudyHoursBtn;
let totalHoursText;
let progressBar;
let progressText;
let totalStudyHours = 0;
const DAILY_GOAL =8;

export function initTracker(){
    studyHoursInput = document.getElementById('studyHoursInput');
    addStudyHoursBtn = document.getElementById('addStudyHoursBtn');
    totalHoursText = document.getElementById('totalHours');
    progressBar = document.getElementById('progressBar');
    progressText = document.getElementById('progressText');

    addStudyHoursBtn.addEventListener('click',addStudyHours);
    loadStudyHours();
    updateTracker();
}

function addStudyHours(){
    let hour = Number(studyHoursInput.value);
    if(!hour || hour <=0){
        alert("Enter valid time");
        return;
    }
    totalStudyHours += hour;
    updateTracker();
    saveStudyHours();
    studyHoursInput.value = "";
}

function updateTracker(){
    totalHoursText.textContent = totalStudyHours.toFixed(1);
    const per = Math.min((totalStudyHours/DAILY_GOAL)*100,100);
    progressBar.style.width= `${per}%`;
    progressText.innerText = `${Math.floor(per)}%`;
}

function saveStudyHours(){
    let Today ={
        hours : totalStudyHours,
        date : new Date().toDateString()
    };

    localStorage.setItem("totalHours" , JSON.stringify(Today));
}

function loadStudyHours(){
    let h = localStorage.getItem("totalHours");
    if(h){
        let con = JSON.parse(h);
        let d = new Date().toDateString();
        if(h.date === d){
            totalStudyHours = h.hours;
        }else{
            totalStudyHours=0;
            saveStudyHours();
        }
    }
}