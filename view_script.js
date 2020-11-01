document.addEventListener('DOMContentLoaded', function() {

  document.getElementById('btn').onclick = function() {

var name = document.getElementById("name_input").value

             document.getElementsByClassName("stu_name")[0].innerHTML = name ;
             thisStudent.firstname = name;
         }


}, false)

var currentQuestion;
var correctQ = 0;
var wrongQ = 0;
var thisAPI;
const thisStudent = {right:0, wrong:0, firstname:"dev", status:"pending"};
function gotClicked(e){
  console.log("Someone clicked");
  console.log(e.target.id);
  if(e.target.id == "option1"){
    validateAnswer(e.target.id);
  }else if (e.target.id == "option2") {
    validateAnswer(e.target.id);
  }else if (e.target.id == "option3") {
    validateAnswer(e.target.id);
  }else if (e.target.id == "option4") {
    validateAnswer(e.target.id);
  }else if (e.target.id == "dropdown-check"){
    validateDropdown(e);
  }else if (e.target.id == "word-check"){
    validateWord(e);
  }else if (e.target.id == "qType1") {
    thisAPI = quizType[0].api;
    render_question_view("#question-view");
  }else if (e.target.id == "qType2") {
    thisAPI = quizType[1].api;
    render_question_view("#question-view");


  }

}

function validateDropdown(e){
  var selected = document.getElementById("dropdown");
  var stuAns = selected.value;
  var corAns = currentQuestion.answer;
  if (stuAns == corAns){
    yay(e)
  }
  else {
    element = e.target;
    element.remove()
     document.getElementsByTagName("select")[0].setAttribute("disabled","disabled")
    render_explain()
  }



}

function validateAnswer(targetid){

    if (targetid == currentQuestion.answer) {
      yay();
    }else{
      var answerAlt = currentQuestion.answer;
    switch(currentQuestion.type){
        case 4:
        document.getElementById(targetid).setAttribute("style","color:red")
        document.querySelectorAll('.btn').forEach(elem => {
        elem.removeAttribute("class");
        elem.removeAttribute("id");

        });

        break;

      case 3:
      document.querySelectorAll('.btn').forEach(elem => {
      elem.removeAttribute("id");
      });
          break;}
            render_explain();
        }




}




function yay(e){
render_view("#yay",0)
setTimeout(function(){render_question_view()},1500);
correctQ ++;
updateScore()
}

function validateWord(){
  var stuAns = document.getElementById("one-word-answer").value;
  if (stuAns == currentQuestion.answer) {
    yay();
  } else {
    render_explain();
  }

}


var quizType  = [
    {
      qID: "ONE",
      oC : "qType1",
      api: "https://my-json-server.typicode.com/thexjz/202070-1172-p3-json/Quiz1/"
    },
    {
      qID: "TWO",
      oC : "qType2",
      api: "https://my-json-server.typicode.com/thexjz/202070-1172-p3-json/Quiz2/"
    },

  ];

const numOfQuiz = 20;



function updateScore(){
  Handlebars.registerHelper('css', function (int) {
    return int*5
})
  var progressBar = document.querySelector("#proBar").innerHTML;
  thisStudent.right = correctQ;
  thisStudent.wrong = wrongQ;
  var template = Handlebars.compile(progressBar);
  var html = template(thisStudent);
  document.querySelector("#stu_Score").innerHTML = html;
  }





var currentQuestionIndex = 0;

var render_explain = () => {
  console.log("Rendering explain");
  var source = document.querySelector("#nay").innerHTML;
  var template = Handlebars.compile(source);
//interpet the answer for select question types.
    var answerAlt = currentQuestion.answer;
  switch(currentQuestion.type){

    case 5:
      currentQuestion.answer = currentQuestion[answerAlt];
      break;

    case 4:
      currentQuestion.answer = currentQuestion[answerAlt];
      break;

    case 3:
      currentQuestion.answer = currentQuestion[answerAlt];
      break;
  }
  var html = template(currentQuestion);

  document.querySelector("#explain").innerHTML = html;
  wrongQ++;
  updateScore();
         }


  var render_view = (view_id, qtype_index) => {
    console.log("Rendering View");
    var source = document.querySelector(view_id).innerHTML;
    var template = Handlebars.compile(source);
    var html = template(quizType[qtype_index]);
    document.querySelector("#quiz_view_widget").innerHTML = html;
    document.querySelector("#question_display").onclick = (e) =>{
               gotClicked(e);
           }
  }


  var render_question_view = async() => {
    if (currentQuestionIndex<20) {


    console.log("Rendering question View");
    //load json
    currentQuestionIndex ++;
    const response = await fetch(`${thisAPI}${currentQuestionIndex}`);
    const result = await response.json();
    //finish loading json;
    console.log(result);
    console.log(result.type);
    currentQuestion = result;
    var source = document.querySelector(`#question-view${result.type}`).innerHTML;
    var template = Handlebars.compile(source);
    var html = template(result);
    document.querySelector("#question_display").innerHTML = html;
    }
  else {
    render_summary();
  }
}
function render_summary(){
  thisStudent.right = correctQ;
  thisStudent.wrong = wrongQ;
  if (thisStudent.right > 12){
    thisStudent.status = "Passed"
  }else{thisStudent.status = "Failed"}
  var source = document.querySelector("#summary").innerHTML;
  var template = Handlebars.compile(source);
  var html = template(thisStudent);
  document.querySelector("#question_display").innerHTML = html;





}
