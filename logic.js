let div=document.getElementById('sudoku');
let boxes=new Array(9);
let result=document.querySelector('button');
let descr=document.querySelector('p');
let sqrt=3,N=9,K=50;
result.addEventListener('click',checker);

function instance(x,y,val){

		this.row=x;
		this.col=y;
		this.val=val;
}

function stack(){

	this.arr=[];
	this.push=function(ele){
					this.arr.push(ele);
				}
	this.pop=function(ele){
					return this.arr.pop();
				}
}

for(let i=0;i<9;i++)
{
	boxes[i]=new Array(9);
	for(let j=0;j<9;j++)
	{
		boxes[i][j]=document.createElement('input');
		div.appendChild(boxes[i][j]);
	}
}
for(let i=0;i<9;i++){
	for(let j=0;j<9;j++){
			boxes[i][j].style.border="1px solid #D8D8D8";
	}
}



for(let i=0;i<9;i+=3){
	for(let j=0;j<9;j++){
			//boxes[i][j].style.border="0";
			boxes[i][j].style.borderTop="2px solid #000000";
		}
}
for(let j=0;j<9;j++){
	boxes[8][j].style.borderBottom="2px solid #000000";
}

for(let i=0;i<9;i+=3){
	for(let j=0;j<9;j++){
			//boxes[i][j].style.border="0";
			boxes[j][i].style.borderLeft="2px solid #000000";
		}
}
for(let j=0;j<9;j++){
	boxes[j][8].style.borderRight="2px solid #000000";
}
	

		

for(let i=0;i<N;i+=sqrt){
	fillbox(i,i);
}
fillothers();
removeKElements();

function fillbox(rowStart,colStart){
	let num;
	for(let i=0;i<sqrt;i++){
		for(let j=0;j<sqrt;j++){
			
			do{
				num=randgenerator(9);
			}
			while(!checkboxe(rowStart,colStart,rowStart+i,colStart+j,num));
	
			boxes[rowStart+i][colStart+j].value=num;
		}
	}
}
function fillothers(){
	let num=1;
	const s=new stack();
	for(let i=0;i<N;i++){
		j=0;
		while(j<N){
			if(boxes[i][j].value===''){
				for(;num<=9;num++){
					if(checkAtPos(i,j,num)){
						s.push(new instance(i,j,num));
						 boxes[i][j].value=num;
						 j++;
						 break;
					}
				}
				if(num>=10){
					let ob=s.pop();
					i=ob.row;
					j=ob.col;
					num=ob.val+1;
					boxes[i][j].value='';
				}
				else
					num=1;
			}
			else
				j++;
		}
		
	}
}
function removeKElements(){
	let x,y,rand;
	for(let i=0;i<K;){
		rand=Math.floor(Math.random()*81);
		y=Math.floor(rand/N);
		x=rand%N;
		if(boxes[x][y].value!==''){
			boxes[x][y].value='';
			i++;
		}
	}
}
		
function checker(){
	for(let i=0;i<N;i++){
		for(let j=0;j<N;j++){
			if(!checkAtPos(i,j,boxes[i][j].value)){
				descr.textContent='wrong';
				return;
			}
		}
	}
	descr.textContent='Yeyy!';
}
			
	
			
function checkAtPos(row,col,num){
		return checkboxe(Math.floor(row/sqrt)*sqrt,Math.floor(col/sqrt)*sqrt,row,col,num)&&checkRow(row,col,num)&&checkCol(row,col,num);
}
function checkRow(row,col,num){
	for(let i=0;i<N;i++){
		if( i!==col && boxes[row][i].value==num)
			return false;
	}
	return true;
}
function checkCol(row,col,num){
	for(let i=0;i<N;i++){
		if(i!==row && boxes[i][col].value==num)
			return false;
	}
	return true;
}
			
			



function randgenerator(max)
{
	return Math.floor(Math.random()*max)+1;
}
function checkboxe(rowStart,colStart,row,col,num){
	for(let i=0;i<sqrt;i++){
		for(let j=0;j<sqrt;j++){
			
			if((rowStart+i!=row || colStart+j!=col) && boxes[rowStart+i][colStart+j].value==num){
				//console.log(i+' '+j);
				return false;
			}
		}
	}
	return true;
}	
			
	
	