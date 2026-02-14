let players = JSON.parse(localStorage.getItem('efootballData')) || [];
let awards = JSON.parse(localStorage.getItem('efootballAwards')) || { boot: "-", glove: "-" };

// SHOW ADMIN IF ALREADY LOGGED
if(sessionStorage.getItem("isAdmin")==="true"){
document.getElementById("adminSection").style.display="block";
document.getElementById("adminControls").style.display="block";
document.getElementById("loginArea").style.display="none";
}

function checkPass(){
const pass=document.getElementById("adminPass").value;
if(pass==="admin123"){
sessionStorage.setItem("isAdmin","true");
document.getElementById("adminSection").style.display="block";
document.getElementById("adminControls").style.display="block";
document.getElementById("loginArea").style.display="none";
}else{
alert("Wrong Password!");
}
}

function addPlayer(){
let name=document.getElementById("playerName").value;
if(name){
players.push({name:name,p:0,w:0,d:0,l:0,gf:0,ga:0,gd:0,pts:0});
document.getElementById("playerName").value="";
saveAndRefresh();
}
}

function updateStats(){
let name=document.getElementById("selectPlayer").value;
let gf=parseInt(document.getElementById("gf").value)||0;
let ga=parseInt(document.getElementById("ga").value)||0;
let result=document.getElementById("matchResult").value;

let p=players.find(player=>player.name===name);
if(p){
p.p++;
p.gf+=gf;
p.ga+=ga;
p.gd=p.gf-p.ga;

if(result==="win"){p.w++;p.pts+=3;}
else if(result==="draw"){p.d++;p.pts+=1;}
else{p.l++;}

saveAndRefresh();
}
}

function updateAwards(){
awards.boot=document.getElementById("bootName").value||awards.boot;
awards.glove=document.getElementById("gloveName").value||awards.glove;
saveAndRefresh();
}

function saveAndRefresh(){
players.sort((a,b)=>b.pts-a.pts||b.gd-a.gd||b.gf-a.gf);
localStorage.setItem("efootballData",JSON.stringify(players));
localStorage.setItem("efootballAwards",JSON.stringify(awards));
renderTable();
}

function renderTable(){
let tbody=document.getElementById("tableBody");
let select=document.getElementById("selectPlayer");
tbody.innerHTML="";
select.innerHTML="";

players.forEach((p,index)=>{
tbody.innerHTML+=`
<tr class="${index===0?'top-row':''}">
<td>${index+1}</td>
<td>${p.name}</td>
<td>${p.p}</td>
<td>${p.w}</td>
<td>${p.d}</td>
<td>${p.l}</td>
<td>${p.gd}</td>
<td><strong>${p.pts}</strong></td>
</tr>
`;
select.innerHTML+=`<option value="${p.name}">${p.name}</option>`;
});

document.getElementById("topScorer").innerText=awards.boot;
document.getElementById("topKeeper").innerText=awards.glove;
}

function resetData(){
if(confirm("Deta ellam kalayano?")){
localStorage.clear();
sessionStorage.clear();
location.reload();
}
}

renderTable();
// Show admin section only if #admin is in URL
if(window.location.hash === "#admin"){
    document.getElementById("adminSection").style.display = "block";
}
