const slot1 = document.getElementById("num-1");
const slot2 = document.getElementById("num-2");
const slot3 = document.getElementById("num-3");
const coinText = document.getElementById("coin-count");

const spinButton = document.getElementById("spin-button");

let coins = 100;
const slotDisplay = document.querySelector(".slot-display");
const sound = new Audio("win.mp3");

spinButton.addEventListener("click",function(){

    if(coins < 10){
        //alert("ゲームオーバー！コインが足りません");
        document.getElementById("game-over-message").classList.remove("hidden");
        return;
    }

    const oldMessage = document.querySelector(".win-message");
    if(oldMessage){
        oldMessage.remove();
    }

    slot1.classList.remove("gold-flash");
    slot2.classList.remove("gold-flash");
    slot3.classList.remove("gold-flash");

    const num1 = Math.floor(Math.random() * 3) + 1;
    const num2 = Math.floor(Math.random() * 3) + 1;
    const num3 = Math.floor(Math.random() * 3) + 1;

    coins = coins - 10;

    if (num1 == num2 && num2 == num3){
        coins = coins +100;

        slot1.classList.add("gold-flash");
        slot2.classList.add("gold-flash");
        slot3.classList.add("gold-flash");

        const winMessage = document.createElement("div");
        winMessage.className ="win-message";
        winMessage.textContent = "WIN!";
        winMessage.style.display = "block";

        slotDisplay.appendChild(winMessage);

        sound.pause();
        sound.currentTime = 0;
        sound.play();
    }

    slot1.textContent = num1;
    slot2.textContent = num2;
    slot3.textContent = num3;

    coinText.textContent = coins;
});

coinText.textContent = coins;

const todoInput = document.getElementById("todo-input");
const addButton = document.getElementById("add-button");
const todoListContainer = document.getElementById("todo-list");

const todoList = JSON.parse(localStorage.getItem("myTodo")) || [];

addButton.addEventListener("click", function(){
    if (todoInput.value === ""){ return;}

    todoList.push(todoInput.value);
    localStorage.setItem("myTodo",JSON.stringify(todoList));
    renderTodo();
    todoInput.value = "";

});

function renderTodo() {
    todoListContainer.textContent = "";

    todoList.forEach(function(item, index){
        const li = document.createElement("li");
        const span = document.createElement("span");

        span.textContent = item;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "削除";
        deleteButton.className = "delete-btn";

        deleteButton.addEventListener("click",function(){
            todoList.splice(index, 1);
            localStorage.setItem("myTodo",JSON.stringify(todoList));
            renderTodo();
        });
        li.appendChild(span);

        li.appendChild(deleteButton);
        todoListContainer.appendChild(li);
    });
}

renderTodo();

const headerLinks = document.querySelectorAll("header nav ul li a");

headerLinks.forEach(function(link){
    link.addEventListener("click",function(event){
        event.preventDefault();
        const targetId = link.getAttribute("href");
        const targetElement = document.querySelector(targetId);
        targetElement.scrollIntoView({
            behavior: "smooth"
        });
    });
});

const contactText = document.getElementById("contact-text");
const charCount = document.getElementById("char-count");

contactText.addEventListener("input",function(){
    const textLength = contactText.value.length;
    charCount.textContent = textLength;
    if(textLength >= 20){
        charCount.classList.add("error");
    }else{
        charCount.classList.remove("error");
    }
});

const toggleProfileBtn = document.getElementById("toggle-profile-btn");
const profileCasual = document.getElementById("profile-casual");
const profileDetail = document.getElementById("profile-detail");

toggleProfileBtn.addEventListener("click",function(){

    profileDetail.classList.toggle("hidden");
    profileCasual.classList.toggle("hidden");

    if(profileDetail.classList.contains("hidden")){
        toggleProfileBtn.textContent = "経歴の詳細を表示";
    }else{
        toggleProfileBtn.textContent = "詳細を閉じる";
    }
});

const randomWordText = document.getElementById("random-word");
const wordList = ["毎日一行でもコードを書く","エラーは成長の最高のチャンス","１０月末の内定獲得へ向けて突っ走る"];
const randomIndex = Math.floor(Math.random() * wordList.length);
const chosenWord = wordList[randomIndex];

randomWordText.textContent = chosenWord;


const rockBtn = document.getElementById("rock-btn");
const scissorsBtn = document.getElementById("scissors-btn");
const paperBtn = document.getElementById("paper-btn");
const rpsResult = document.getElementById("rps-result");

const winCountText = document.getElementById("win-count");
const loseCountText = document.getElementById("lose-count");
const drawCountText = document.getElementById("draw-count");

let winCount = 0;
let loseCount = 0;
let drawCount = 0;


const rpsHands = ["✊グー","✌チョキ","✋パー"];

rockBtn.addEventListener("click",function(){
    playRPS("✊グー");
});

scissorsBtn.addEventListener("click",function(){
    playRPS("✌チョキ");
});

paperBtn.addEventListener("click",function(){
    playRPS("✋パー");
});

function playRPS(userHand){

    const comIndex = Math.floor(Math.random() * 3);
    const comHand = rpsHands[comIndex];

    let resultMessage = "";

    rpsResult.classList.remove("win-style","lose-style");

    if(userHand === comHand){
        resultMessage = "引き分け！👐（敵も" + comHand +")";
        drawCount++;
    }else if(
        (userHand === "✊グー" && comHand === "✌チョキ") ||
        (userHand === "✌チョキ" && comHand === "✋パー") ||
        (userHand === "✋パー" && comHand === "✊グー")
    ){
        resultMessage = "あなたの勝ち！（敵は" + comHand + ")";
        rpsResult.classList.add("win-style");
        winCount++;

    }else{
        resultMessage = "あなたの負け・・・（敵は" + comHand + ")";
        rpsResult.classList.add("lose-style");
        loseCount++;
    }
    rpsResult.textContent = resultMessage;

    winCountText.textContent = winCount;
    loseCountText.textContent = loseCount;
    drawCountText.textContent = drawCount;
}

const rpsResetBtn =document.getElementById("rps-reset-btn");

rpsResetBtn.addEventListener("click",function(){
    winCount = 0;
    loseCount = 0;
    drawCount = 0;

    rpsResult.textContent = "勝敗はここまでです";

    winCountText.textContent = winCount;
    loseCountText.textContent = loseCount;
    drawCountText.textContent = drawCount;
});

const htmlSkill = document.getElementById("html-skill");
const jsSkill = document.getElementById("js-skill");
const skillDescBox = document.getElementById("skill-desc-box");
const skillDescText = document.getElementById("skill-desc-text");

htmlSkill.addEventListener("mouseenter",function(){
    skillDescBox.classList.remove("hidden");
    skillDescText.textContent = "【HTML/CSS実績】固定ヘッダー、FlexBoxによるスマホ用の自動折り返し、そして勝敗時のネオン発光エフェクトまで、崩れないマルチデバイス対応のデザインを実務レベルで実装出来ます";
});

jsSkill.addEventListener("mouseenter",function(){
    skillDescBox.classList.remove("hidden");
    skillDescText.textContent = "【JavaaScript実績】Math.randomを使ったゲームロジックから、配列操作によるTODOアプリの自動再描画（render）、LocalStorageを使ったプラウザへの永続保存まで、裏側のデータ管理を網羅しています";
});

htmlSkill.addEventListener("mouseleave",function(){
    skillDescText.textContent="ここに解説がでます";
});
jsSkill.addEventListener("mouseleave",function(){
    skillDescText.textContent="ここに解説がでます";
});