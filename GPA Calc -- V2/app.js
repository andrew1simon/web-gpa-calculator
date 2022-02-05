const startbtn = document.getElementById("start-btn")
const subjectsNumber = document.getElementById("sub-num")
const formCont = document.getElementById("form-cont")
const submitbtn = document.getElementById("submit-btn")
let storePoints = []
let calcPhase = []
let hours = []


startbtn.addEventListener("click",event => {
    displaysubjects(subjectsNumber.value)
})
function displaysubjects(num) {
    document.querySelector("#form-cont").classList.remove("active")
    document.querySelector("#form-cont-main").classList.add("active")
    for (let i = 1; i <= Number(num) ; i++) {
    if (i==1 && i!= num) {
        formCont.insertAdjacentHTML("beforebegin",  
        `<div id ="subject-slide-${i}"class="subject-slide active"><h2 class="subject-num-title">subject ${i}</h2>
      <div class="upper-split"><div class="split"><label class="lab-text"> Credit Hours</label><input type="number" class="number-form" id="hours-${i}" placeholder="num"></div><div class="split"> <label class="lab-text"> Letter grade</label><select id="gpa-${i}" name="gpa-${i}">
      <option value="4">A</option>
      <option value="3.5">B+</option>
      <option value="3">B</option>
      <option value="2.5">C+</option>
      <option value="2">C</option>
      <option value="1.5">D</option>
      <option value="0">F</option>
       </select></div></div><div class="upper-sub-div"> <input type="button" class="submit" id="next-btn-${i}" onclick="nextAction(this)" data-num=${i} value="Next subject"></div>
       </div>`)
    }if (i<num && i!=1) {
        console.log (i)
        console.log(num)
       formCont.insertAdjacentHTML("beforebegin",  
       `<div id ="subject-slide-${i}"class="subject-slide"><h2 class="subject-num-title">subject ${i}</h2>
     <div class="upper-split"><div class="split"><label class="lab-text"> Credit Hours</label><input type="number" class="number-form" id="hours-${i}" placeholder="num"></div><div class="split"> <label class="lab-text"> Letter grade</label><select id="gpa-${i}" name="gpa-${i}">
     <option value="4">A</option>
       <option value="3.5">B+</option>
       <option value="3">B</option>
       <option value="2.5">C+</option>
       <option value="2">C</option>
       <option value="1.5">D</option>
       <option value="0">F</option>
      </select></div></div> <div class="upper-sub-div"><input type="button" class="submit" id="next-btn-${i}" onclick="nextAction(this)" data-num=${i} value="Next subject"></div>
      </div>`)
   
    }
      
    if (i==num) {
        formCont.insertAdjacentHTML("beforebegin",  
        `<div id ="subject-slide-${i}"class="subject-slide active"><h2 class="subject-num-title">subject ${i}</h2>
      <div class="upper-split"><div class="split"><label class="lab-text"> Credit Hours</label><input type="number" class="number-form" id="hours-${i}" placeholder="num"></div><div class="split"> <label class="lab-text"> Letter grade</label><select id="gpa-${i}" name="gpa-${i}">
       <option value="4">A</option>
       <option value="3.5">B+</option>
       <option value="3">B</option>
       <option value="2.5">C+</option>
       <option value="2">C</option>
       <option value="1.5">D</option>
       <option value="0">F</option>
       </select></div></div><div class="upper-sub-div"> <input type="button" class="submit" id="submit-btn" data-num=${i} onclick="calcAction(this)" value="calculate"></div>
       </div>`)
       if (num>1) {
        let lastSlide = document.querySelector(`#subject-slide-${num}`) 
        lastSlide.classList.remove("active")
       }
     } 
     
        
          
        }
    }
function nextAction(element) {
    kk= element.id
elementNum = element.dataset.num
nextElementNum = Number(elementNum)+1
let currentElementSlider = document.querySelector(`#subject-slide-${elementNum}`)
let nextElementSlider = document.querySelector(`#subject-slide-${nextElementNum}`)
let subHours = document.querySelector(`#hours-${elementNum}`)
let subGpa = document.querySelector(`#gpa-${elementNum}`)
currentElementSlider.classList.remove("active")
nextElementSlider.classList.add("active")
storePoints.push({"subHours": subHours.value , "subGpa":subGpa.value})
hours.push(Number(subHours.value))
console.log (storePoints)

}
function calcAction (element) {
    elementNum = element.dataset.num
    let subHours = document.querySelector(`#hours-${elementNum}`)
    let subGpa = document.querySelector(`#gpa-${elementNum}`)
    storePoints.push({"subHours": Number(subHours.value) , "subGpa":Number(subGpa.value)})
    hours.push(Number(subHours.value))
    storePoints.forEach(subject => {
        subjectPointsMath = Number(subject.subHours)*Number(subject.subGpa)
       // console.log(subjectPointsMath)
      
        calcPhase.push(subjectPointsMath)
        console.log(calcPhase)
    })
   let pointsAdding =  calcPhase.reduce((a, b) => a + b, 0)
   console.log(pointsAdding)
   
   let hoursAdding =  hours.reduce((a, b) => a + b, 0)
   console.log("total hours" , hoursAdding)

   let finalGpa = pointsAdding/hoursAdding
   console.log(finalGpa)
   finalcalc (finalGpa , elementNum)

}
function finalcalc (num , lastsubjectNum) {
    roundedPoints = num.toFixed(2)
    if(roundedPoints >= 3.67) {
        scale = "Excellent"
    }
    if(roundedPoints >= 3 && roundedPoints <= 3.66) {
        scale = "Very Good"
    }
    if(roundedPoints >= 2.33 && roundedPoints <= 2.99) {
        scale = "Good"
    }
    if(roundedPoints >= 2 && roundedPoints <= 2.32) {
        scale = "Fair"
    }
    if( roundedPoints < 2) {
        scale = "Fail"
    }
    console.log(scale)
    updateui (lastsubjectNum) 
    }
    
    function updateui (lastsubjectNum) {
        document.querySelector(".upper-calc-cont").classList.remove("active")
        document.querySelector(".upper-res").classList.add("active")
        const resultDiv = document.getElementById("result-div")
        resultDiv.innerHTML = `<div class ="res-inner"><p class="res-text"> Your GPA is :${roundedPoints}</p><p class="res-text"> Your scale is : ${scale}</p>
       <div class="upper-starto-btn"> <a href="/index.html"><button class="start-over-btn" data-num=${lastsubjectNum}>Start Again</button></a></div></div>`
        
    }