
function recur(tgrid,ch){

	if((tgrid[0][0]==='O' && tgrid[0][1]==='O' && tgrid[0][2]==='O') || (tgrid[1][0]==='O' && tgrid[1][1]==='O' && tgrid[1][2]==='O') || (tgrid[2][0]==='O' && tgrid[2][1]==='O' && tgrid[2][2]==='O') || (tgrid[0][0]==='O' && tgrid[1][0]==='O' && tgrid[2][0]==='O') || (tgrid[0][1]==='O' && tgrid[1][1]==='O' && tgrid[2][1]==='O') || (tgrid[0][2]==='O' && tgrid[1][2]==='O' && tgrid[2][2]==='O'))
		return [2,ch];

	if((tgrid[0][0]==='X' && tgrid[0][1]==='X' && tgrid[0][2]==='X') || (tgrid[1][0]==='X' && tgrid[1][1]==='X' && tgrid[1][2]==='X') || (tgrid[2][0]==='X' && tgrid[2][1]==='X' && tgrid[2][2]==='X') || (tgrid[0][0]==='X' && tgrid[1][0]==='X' && tgrid[2][0]==='X') || (tgrid[0][1]==='X' && tgrid[1][1]==='X' && tgrid[2][1]==='X') || (tgrid[0][2]==='X' && tgrid[1][2]==='X' && tgrid[2][2]==='X'))
		return [0,ch];

	if((tgrid[0][0]==='O' && tgrid[1][1]==='O' && tgrid[2][2]==='O') || (tgrid[2][0]==='O' && tgrid[1][1]==='O' && tgrid[0][2]==='O'))
		return [2,ch];

	if((tgrid[0][0]==='X' && tgrid[1][1]==='X' && tgrid[2][2]==='X') || (tgrid[2][0]==='X' && tgrid[1][1]==='X' && tgrid[0][2]==='X'))
		return [0,ch];

    
	let f=0;
	for(let i=0;i<3;i++){
		for(let j=0;j<3;j++){
			if(tgrid[i][j]===''){
				f=1;
				break;
			}
		}
		if(f) break;
	}

	if(!f){
		return [1,ch];
	}

	let res;
	if(ch&1) res = [-10,0];
	else res = [10,0];

	for(let i=0;i<3;i++){
		for(let j=0;j<3;j++){
			if(tgrid[i][j] === ''){
				if(ch & 1){
					tgrid[i][j] = 'O';
					let x = recur(tgrid,ch+1);
					if(x[0] > res[0]) res=x;
					tgrid[i][j]= ''; 
				}
				else{
					tgrid[i][j] = 'X';
					let x = recur(tgrid,ch+1);
					if(x[0] < res[0]) res=x;
					tgrid[i][j]='';
				}
			}
		}
	}
	return res;
}

export function Ai(arr){

    let best = [-1,10];
    let r,c;

    for(let i=0;i<3;i++){
        for(let j=0;j<3;j++){
            if(arr[i][j] === ''){
                arr[i][j]='O';
                let s = recur(arr,0);
                arr[i][j]='';
                if(s[0]>=best[0]){
                    if(s[1] < best[1]){
                        best[0]=s[0];
                        r=i;
                        c=j;
                    }
                }
            }
        }
    }

    return[r,c];
}