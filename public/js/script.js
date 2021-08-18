var indx=0;

var timer = setInterval( rgbloader, 1200);

function rgbloader(){
    var col_arr = ['blue', '#f70a6d', '#0af70e', 'yellow'];
    document.getElementById('load_circle_rgb').style.borderTop='5px solid '+col_arr[indx];
    indx=(indx+1)%4;
}

async function comparefunction(){
    
    //fetching all data _______________________________________________________________________________________________________________________
    document.getElementById("loadcircle").style.display="block";
    document.getElementById("user_info_total").style.display="none";

    let url1="https://codeforces.com/api/user.info?handles=" + document.getElementById('info1').value;
    const res1= await fetch(url1);
    let url2="https://codeforces.com/api/user.info?handles=" + document.getElementById('info2').value;
    const res2= await fetch(url2);
    let a1,a2,user1,user2,ratingurl1,rating_exists1,ratingurl2,rating_exists2;
    let lendata=[],ydata1=[],ydata2=[];
    if(res1.ok){
        a1= await res1.json();
        user1 = a1.result[0];
        ratingurl1="https://codeforces.com/api/user.rating?handle="+user1.handle;
        problem_info_url1="https://codeforces.com/api/user.status?handle="+document.getElementById('info1').value+"&from=1&count=1000000";
        problem_data1= await fetch(problem_info_url1);
        rating_exists1= await fetch(ratingurl1);
    }
    if(res2.ok){
        a2= await res2.json();
        user2 = a2.result[0];
        ratingurl2="https://codeforces.com/api/user.rating?handle="+user2.handle;
        problem_info_url2="https://codeforces.com/api/user.status?handle="+document.getElementById('info2').value+"&from=1&count=1000000";
        problem_data2= await fetch(problem_info_url2);
        rating_exists2= await fetch(ratingurl2);
    }
    if((res1.ok) && (res2.ok) ){
        document.getElementById("sup_dgholder").style.display='block';
    }
    else{
        document.getElementById("sup_dgholder").style.display='none';
    }

    document.getElementById("user_info_total").style.display="block";
    document.getElementById("loadcircle").style.display="none";
    //User 1 stats here ______________________________________________________________________________________________________________________

    if(res1.ok)
    {
        let u_col=colorcheck(user1.rank);
        document.getElementById('tab_1').style.display='block';
        document.getElementById('user1dp').src=user1.titlePhoto;
        document.getElementById('user1dp').style.height='200px';
        document.getElementById('user1dp').style.width='200px';
        document.getElementById('user1dp').style.border='4px outset '+u_col;
        document.getElementById('handle1').innerHTML=user1.handle;
        if(user1.rank!='legendary grandmaster'){
            document.getElementById('handle1').style.color=u_col;
        }
        else{
            document.getElementById('handle1').style.color=u_col;
            let user_str=user1.handle;
            let str="<span style='color:white;'>"+user_str.charAt(0)+"</span><span>";
            for (var i = 1; i < user_str.length; i++) {
                str=str+user_str[i];
            }
            str=str+"</span>";
            document.getElementById("handle1").innerHTML = str;
            document.getElementById('user1dp').style.border='4px solid white';
            document.getElementById("user1dp").style.boxShadow="0px 0px 10px #fff";
        } 
        document.getElementById('name1').innerHTML=user1.firstName+' '+user1.lastName;
        document.getElementById('rating1').innerHTML=' <span style="font-size:13px;font-family:verdana;font-weight:bold;color:'+u_col+';">' + user1.rating + '</span>' + '  ( </span> <span style="font-size:13px;font-family:verdana;font-weight:bold;color:'+colorcheck(user1.rank)+';">' + user1.rank + '</span>)' ;
        document.getElementById('maxrating1').innerHTML=' <span style="font-size:13px;font-family:verdana;font-weight:bold;color:'+colorcheck(user1.maxRank)+';">' + user1.maxRating + '</span>' + '  ( </span> <span style="font-size:13px;font-family:verdana;font-weight:bold;color:'+colorcheck(user1.maxRank)+';">' + user1.maxRank + '</span>)' ;
        //assume ok because he has an entity already existing

        //problem solve count
        if(problem_data1.ok){
            const pd1=  await problem_data1.json();
            let MP1 = new Map();
            //let dbg= new Map();
            for(let i=0;i<pd1.result.length;i++){
                    let qs=pd1.result[i];
                //    if(dbg.has(qs.verdict)){
                //         dbg.set(qs.verdict,dbg.get(qs.verdict)+1);
                //     }
                //     else{
                //         dbg.set(qs.verdict,1);
                //     } 
                   if(qs.verdict==="OK"){
                        if(MP1.has(qs.contestId+qs.problem.index)){
                            MP1.set(qs.contestId+qs.problem.index,MP1.get(qs.contestId+qs.problem.index)+1);
                        }
                        else{
                            MP1.set(qs.contestId+qs.problem.index,1);
                        }
                   } 
            }
            //console.log(dbg);
            console.log(MP1);
            document.getElementById("problems_solved1").innerHTML=MP1.size;
        }
        else{
            document.getElementById("problems_solved1").innerHTML='Error';
        }

        //start of rating graph 
        if(rating_exists1.ok){
            const obj1= await rating_exists1.json();
            var Xval=[];
            var Yval=[];
            document.getElementById("contests_appeared1").innerHTML=obj1.result.length;
            let bestrank='1000000',worstrank=0,bestrankroundname=' NA ',worstrankroundname=' NA ',maxdplus=0,maxdminus=0,bestroundname=' NA ',worstroundname=' NA ';
            let x1=0;
            for(var i = 0; i < obj1.result.length; i++) {
                x1=x1+1;
                let t_obj=obj1.result[i];
                let y1=t_obj.newRating;
                Xval.push(x1);Yval.push(y1);
                if(t_obj.rank<bestrank){
                    bestrank=t_obj.rank;
                    bestrankroundname=t_obj.contestName;
                }
                if(t_obj.rank>worstrank){
                    worstrank=t_obj.rank;
                    worstrankroundname=t_obj.contestName;
                }
                if(i>0){
                    let delta=t_obj.newRating-t_obj.oldRating;
                    if(delta>maxdplus){
                        maxdplus=delta;
                        bestroundname=t_obj.contestName;
                    }
                    if(delta<maxdminus){
                        maxdminus=delta;
                        worstroundname=t_obj.contestName;
                    }
                }
            }
            if(bestrank==='1000000'){
                bestrank='0';
            }
            document.getElementById("bestrank1").innerHTML=bestrank+' ( '+bestrankroundname+' ) ';
            document.getElementById("worstrank1").innerHTML=worstrank+' ( '+worstrankroundname+' ) ';
            document.getElementById("maxdplus1").innerHTML=maxdplus+ ' ( '+bestroundname+' )';
            document.getElementById("maxdminus1").innerHTML=maxdminus+ ' ( '+worstroundname+' ) ';
            //console.log(Xval);
            //console.log(Yval);
            let str ='var Xval=[',maxrate=100,minrate=800;
            for(var i=0;i<Xval.length;i++){
                    str=str+Xval[i]+',';
            }
            str=str+'];';
            str= str+ ' var Yval=[';
                for(var i=0;i<Yval.length;i++){
                    str=str+Yval[i]+',';
                    if(Yval[i]>maxrate){
                        maxrate=Yval[i];
                    }
                    if(Yval[i]<minrate){
                        minrate=Yval[i];
                    }
            }
            maxrate=maxrate+100;
            minrate=minrate-100;
            if(minrate<0){
                minrate=0;
            }
            if(minrate>=maxrate){
                minrate=minrate-100;
                if(minrate<0){
                    minrate=0;
                }
            }
            str=str+'];';
            document.getElementById("g1holder").innerHTML=`<div style="color:#33ccff;font-weight:bold"> `+ user1.handle+"'s chart </div>" +' <canvas id="graph1" style="width:100%;max-width:800px;display:block;margin:auto;"></canvas> ';
            console.log(str);
            var script = document.createElement("script");
            script.innerHTML =  str+ `
            new Chart("graph1", {
            type: "line",
            data: {
                labels: Xval,
                datasets: [{
                fill: false,
                tension: 0.2,
                borderWidth: 0,
                pointRadius: 2,
                pointBackgroundColor: '#33ccff',
                pointBorderColor: '#33ccff',
                backgroundColor: "#1d2021",
                borderColor: "#0099cc",
                data: Yval
                }]
            },
            options: {
                legend: {display: false},
                scales: { 
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Round No',
                        fontColor:'#a69f93',
                    } , gridLines: { color: '#393c3d' }, ticks: {fontColor: '#a69f93'} 
                }],
                yAxes: [{scaleLabel: {
                    display: true,
                    labelString: 'Rating',
                    fontColor:'#a69f93',
                  } , gridLines: { color: '#393c3d' } , ticks: {fontColor: '#a69f93',min:`+minrate+', max:'+maxrate+'}}],'
                +'}'
            +'}'
            +'});;';
            document.getElementById("g1holder").appendChild(script);
            if(Xval.length>lendata.length){
                lendata=Xval;
            }      
            ydata1=Yval;
            //end of rating graph
        }
        else{
            ;//not filled no need
        }
    }
    else{
        document.getElementById("handle1").innerHTML = 'User not found ';
        document.getElementById('user1dp').style.height='200px';
        document.getElementById('user1dp').style.width='200px';
        document.getElementById("handle1").style.color = 'white';
        document.getElementById('user1dp').src=' ';
        document.getElementById('user1dp').style.border='4px outset lightgray';
        document.getElementById('name1').innerHTML='undefined undefined';
        document.getElementById('rating1').innerHTML='0 ( NA ) ';
        document.getElementById('maxrating1').innerHTML='0 ( NA ) ';
        document.getElementById('contests_appeared1').innerHTML='0';
        document.getElementById('problems_solved1').innerHTML='0';
        document.getElementById('bestrank1').innerHTML='0 ( NA ) ';
        document.getElementById('worstrank1').innerHTML='0 ( NA ) ';
        document.getElementById('maxdplus1').innerHTML='0 ( NA ) ';
        document.getElementById('maxdminus1').innerHTML='0 ( NA ) ';
        document.getElementById('g1holder').innerHTML=' ';
        document.getElementById('dgholder').innerHTML=' ';
        
    }


    //User 2 stats here ______________________________________________________________________________________________________________________


    if(res2.ok)
    {
        let u_col=colorcheck(user2.rank);
        document.getElementById('tab_2').style.display='block';
        document.getElementById('user2dp').src=user2.titlePhoto;
        document.getElementById('user2dp').style.height='200px';
        document.getElementById('user2dp').style.width='200px';
        document.getElementById('user2dp').style.border='4px outset '+u_col;
        document.getElementById('handle2').innerHTML=user2.handle;
        if(user2.rank!='legendary grandmaster'){
            document.getElementById('handle2').style.color=u_col;
        }
        else{
            document.getElementById('handle2').style.color=u_col;
            let user_str=user2.handle;
            let str="<span style='color:white;background-color: rgb(29, 32, 33)'>"+user_str.charAt(0)+"</span><span style='background-color: rgb(29, 32, 33)'>";
            for (var i = 1; i < user_str.length; i++) {
                str=str+user_str[i];
            }
            str=str+"</span>";
            document.getElementById("handle2").innerHTML = str;
            document.getElementById('user2dp').style.border='4px solid white';
            document.getElementById("user2dp").style.boxShadow="0px 0px 10px #fff";
        } 
        document.getElementById('name2').innerHTML=user2.firstName+' '+user2.lastName;
        document.getElementById('rating2').innerHTML='<span style="font-size:13px;font-family:verdana;font-weight:bold;color:'+u_col+';">' + user2.rating + '</span>' + '  ( </span> <span style="font-size:13px;font-family:verdana;font-weight:bold;color:'+colorcheck(user2.rank)+';">' + user2.rank + '</span>)' ;
        document.getElementById('maxrating2').innerHTML='<span style="font-size:13px;font-family:verdana;font-weight:bold;color:'+colorcheck(user2.maxRank)+';">' + user2.maxRating + '</span>' + '  ( </span> <span style="font-size:13px;font-family:verdana;font-weight:bold;color:'+colorcheck(user2.maxRank)+';">' + user2.maxRank + '</span>)' ;
        
        
        if(problem_data2.ok){
            const pd1=  await problem_data2.json();
            let MP1 = new Map();
            //let dbg= new Map();
            for(let i=0;i<pd1.result.length;i++){
                    let qs=pd1.result[i];
                //    if(dbg.has(qs.verdict)){
                //         dbg.set(qs.verdict,dbg.get(qs.verdict)+1);
                //     }
                //     else{
                //         dbg.set(qs.verdict,1);
                //     } 
                   if(qs.verdict==="OK"){
                        if(MP1.has(qs.contestId+qs.problem.index)){
                            MP1.set(qs.contestId+qs.problem.index,MP1.get(qs.contestId+qs.problem.index)+1);
                        }
                        else{
                            MP1.set(qs.contestId+qs.problem.index,1);
                        }
                   } 
            }
            //console.log(dbg);
            console.log(MP1);
            document.getElementById("problems_solved2").innerHTML=MP1.size;
        }
        else{
            document.getElementById("problems_solved1").innerHTML='Error';
        }
        
        
        //assume ok because he has an entity already existing
        if(rating_exists2.ok){
            const obj1= await rating_exists2.json();
            document.getElementById("contests_appeared2").innerHTML=obj1.result.length;
            var Xval=[];
            var Yval=[];
            let bestrank='1000000',worstrank=0,bestrankroundname=' NA ',worstrankroundname=' NA ',maxdplus=0,maxdminus=0,bestroundname=' NA ',worstroundname=' NA ';
            let x1=0;
            for(var i = 0; i < obj1.result.length; i++) {
                let t_obj=obj1.result[i];
                x1=x1+1;
                let y1=t_obj.newRating;
                Xval.push(x1);Yval.push(y1);
                if(t_obj.rank<bestrank){
                    bestrank=t_obj.rank;
                    bestrankroundname=t_obj.contestName;
                }
                if(t_obj.rank>worstrank){
                    worstrank=t_obj.rank;
                    worstrankroundname=t_obj.contestName;
                }
                if(i>0){
                    let delta=t_obj.newRating-t_obj.oldRating;
                    if(delta>maxdplus){
                        maxdplus=delta;
                        bestroundname=t_obj.contestName;
                    }
                    if(delta<maxdminus){
                        maxdminus=delta;
                        worstroundname=t_obj.contestName;
                    }
                }
            }
            if(bestrank==='1000000'){
                bestrank='0';
            }
            document.getElementById("bestrank2").innerHTML=bestrank+' ( '+bestrankroundname+' ) ';
            document.getElementById("worstrank2").innerHTML=worstrank+' ( '+worstrankroundname+' ) ';
            document.getElementById("maxdplus2").innerHTML=maxdplus+ ' ( '+bestroundname+' )';
            document.getElementById("maxdminus2").innerHTML=maxdminus+ ' ( '+worstroundname+' ) ';
            //console.log(Xval);
            //console.log(Yval);
            let str ='var Xval=[',maxrate=100,minrate=800;
            for(var i=0;i<Xval.length;i++){
                    str=str+Xval[i]+',';
            }
            str=str+'];';
            str= str+ ' var Yval=[';
                for(var i=0;i<Yval.length;i++){
                    str=str+Yval[i]+',';
                    if(Yval[i]>maxrate){
                        maxrate=Yval[i];
                    }
                    if(Yval[i]<minrate){
                        minrate=Yval[i];
                    }
            }
            maxrate=maxrate+100;
            minrate=minrate-100;
            if(minrate<0){
                minrate=0;
            }
            if(minrate>=maxrate){
                minrate=minrate-100;
                if(minrate<0){
                    minrate=0;
                }
            }
            str=str+'];';
            document.getElementById("g2holder").innerHTML=`<div style="background-color:#1d2021;color:#33ccff;font-weight:bold"> `+ user2.handle+"'s chart </div>" +' <canvas id="graph2" style="width:100%;max-width:800px;display:block;margin:auto;background-color:#1d2021;"></canvas> ';
            console.log(str);
            var script = document.createElement("script");
            script.innerHTML =  str+ `
            new Chart("graph2", {
            type: "line",
            data: {
                labels: Xval,
                datasets: [{
                fill: false,
                tension: 0.2,
                borderWidth: 0,
                pointRadius: 2,
                pointBackgroundColor: '#33ccff',
                pointBorderColor: '#33ccff',
                backgroundColor: "#1d2021",
                borderColor: "#0099cc",
                data: Yval
                }]
            },
            options: {
                legend: {display: false},
                scales: { 
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Round No',
                        fontColor:'#a69f93',
                    } , gridLines: { color: '#393c3d' }, ticks: {fontColor: '#a69f93'} 
                }],
                yAxes: [{scaleLabel: {
                    display: true,
                    labelString: 'Rating',
                    fontColor: '#a69f93'
                  } , gridLines: { color: '#393c3d' }, ticks: {fontColor: '#a69f93',min:`+minrate+', max:'+maxrate+'}}],'
                +'}'
            +'}'
            +'});;';
            document.getElementById("g2holder").appendChild(script);

            if(Xval.length>lendata.length){
                lendata=Xval;
            }

            ydata2=Yval;

            document.getElementById("dgholder").innerHTML=' ';
            document.getElementById("dgholder").innerHTML=`<canvas id="doublechart" style="width:100%;max-width:800px;display:block;margin:auto;"></canvas>`;
            document.getElementById("versus").innerHTML='<span style="color:#00ff99">'+user1.handle+'</span> vs <span style="color:#33ccff">'+user2.handle+"</span>";
            document.getElementById("dgholder").style.display='block';
            document.getElementById("sup_dgholder").style.display='block';

            new Chart("doublechart", {
              type: "line",
              data: {
                labels: lendata,
                datasets: [{ 
                    fill: false,
                    tension: 0.2,
                    borderWidth: 0,
                    pointRadius: 2,
                    pointBackgroundColor: '#00ff99',
                    pointBorderColor: '#00ff99',
                    borderColor: "#00b36b",
                    data: ydata1
                }, { 
                    fill: false,
                    tension: 0.2,
                    borderWidth: 0,
                    pointRadius: 2,
                    pointBackgroundColor: '#33ccff',
                    pointBorderColor: '#33ccff',
                    borderColor: "#0099cc",
                    data: ydata2
                }]
              },
              options: {
                  legend: {display: false},
                  scales:{
                    xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Round No',
                        fontColor:'#a69f93',
                    }, gridLines: { color: '#393c3d' }, ticks: {fontColor: '#a69f93'} 
                    }],
                    yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Rating',
                        fontColor:'#a69f93',
                    }, gridLines: { color: '#393c3d' }, ticks: {fontColor: '#a69f93'}
                    }],
                }
            }
            });
                

        }
        else{
            ;//not filled no need
        }
        
        
        //end of rating graph
    }
    else{
        document.getElementById("handle2").innerHTML = 'User not found ';
        document.getElementById('user2dp').style.height='200px';
        document.getElementById('user2dp').style.width='200px';
        document.getElementById("handle2").style.color = 'white';
        document.getElementById('user2dp').src=' ';
        document.getElementById('user2dp').style.border='4px outset lightgray';
        document.getElementById('name2').innerHTML='undefined undefined';
        document.getElementById('rating2').innerHTML='0 ( NA ) ';
        document.getElementById('maxrating2').innerHTML='0 ( NA ) ';
        document.getElementById('contests_appeared2').innerHTML='0';
        document.getElementById('bestrank2').innerHTML='0 ( NA ) ';
        document.getElementById('worstrank2').innerHTML='0 ( NA ) ';
        document.getElementById('maxdplus2').innerHTML='0 ( NA ) ';
        document.getElementById('maxdminus2').innerHTML='0 ( NA ) ';
        document.getElementById('g2holder').innerHTML=' ';
        document.getElementById('dgholder').innerHTML=' ';
    }
}


//Additional functions ___________________________________________________________________________________________________________________________

function toggleuser2(){
    let checker=document.getElementById("user_2");
    if(checker.style.display==='block'){
        checker.style.display='none';
        document.getElementById("grp2").style.display='none';
        document.getElementById("dgholder").style.display='none';
        document.getElementById("sup_dgholder").style.display='none';
        document.getElementById("Enteruser2").style.display='none';
        document.getElementById("clickbox").innerHTML="See Stats";
    }
    else if(checker.style.display==='none'){
        checker.style.display='block';
        document.getElementById("grp2").style.display='block';
        document.getElementById("dgholder").style.display='block';
        document.getElementById("sup_dgholder").style.display='block';
        document.getElementById("Enteruser2").style.display='block';
        document.getElementById("clickbox").innerHTML="Compare";
        let str_tmp=document.getElementById("info2").value;
        document.getElementById("info2").value='';
        document.getElementById("info2").value=str_tmp;
    }
}

function colorcheck(str){
    if(str=='newbie'){
        return '#a69f93';
    }
    else if(str=='pupil'){
        return '#2dd256';
    }
    else if(str=='specialist'){
        return '#04d2c4';
    }
    else if(str=='expert'){
        return '#337dff';
    }
    else if(str=='candidate master'){
        return '#ff55ff';
    }
    else if(str=='master'){
        return '#ff8c00';
    }
    else if(str=='international master'){
        return 'orange';
    }
    else if(str=='grandmaster'){
        return 'red';
    }
    else if(str=='international grandmaster'){
        return 'red';
    }
    else if(str=='legendary grandmaster'){
        return 'red';
    }
    return '#e0ddd1';
}
