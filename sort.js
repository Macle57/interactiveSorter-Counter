const temp = document.querySelector(".items");
const template = temp.cloneNode(true);
// temp.remove();

const numWrapper = document.querySelector("#numWrapper")

function getInput(){
    const inputNum = this.value.trim();
    this.value="";
    if(inputNum.match(/[^0-9.-]/g)){
        window.alert("Please enter only numbers");
    }
    else return inputNum;
}

function addElement(num, template){
    if(num===undefined) return;
    template=template.cloneNode(true);
    template.querySelector("p").innerText=num.toString();
    numWrapper.appendChild(template);
}

function removeElementIfDel({target}){
    if(target.className==="delPng"){
        console.log(`Deleted: ${target.previousElementSibling.innerText}`);
        target.parentElement.remove();
    }
}

function editElemClosure(inputNode) {
    inputNode.type = "text";
    inputNode.addEventListener("keydown", ({key}) => {
        if (key === "Enter") {
            setValue();
        }
    })
    inputNode.addEventListener("blur", setValue);
    
    function setValue(){
        inputNode.outerHTML = `<p>${inputNode.value}</p>`
    }
    
    return function ({target}) {
        if (target.tagName === "P") {
            const currentNum = target.innerText;
            target = target.parentElement;
            target.querySelector("p").replaceWith(inputNode);
            inputNode.value = currentNum;
            inputNode.select();
        }
        
    }
}

function incrementORdecrement({target: {className, parentElement}}){
    if (className.match(/incrementers|decrementers/g)){
        const counterNode = parentElement.querySelector("p");
        counterNode.innerText = Number(counterNode.innerText) + Number(className=="incrementers"?1:-1);
    }
}

const editElement = editElemClosure(document.createElement("input"));

numWrapper.addEventListener("click", removeElementIfDel)
numWrapper.addEventListener("dblclick", editElement)
numWrapper.addEventListener("click", incrementORdecrement)


document.querySelector("#add").onclick= function (){
    addElement(getInput.call(this.previousElementSibling),template);
};

document.querySelector("#inputBox").onkeydown = function ({key}){
    if(key==="Enter"){
        addElement(getInput.call(this), template);
    }
}

document.querySelector("#sort").onclick= ()=>{
    [...numWrapper.querySelectorAll("p")]
    .sort((b,a)=>Number(a.innerText)-Number(b.innerText))
    .forEach((n, ind)=>{
        n.parentElement.style.order=ind.toString();
    })
}
