async function comparefunction(){
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
        rating_exists1= await fetch(ratingurl1);
    }
    if(res2.ok){
        a2= await res2.json();
        user2 = a2.result[0];
        ratingurl2="https://codeforces.com/api/user.rating?handle="+user2.handle;
        rating_exists2= await fetch(ratingurl2);
    }
    if((res1.ok) && (res2.ok) ){
        document.getElementById("sup_dgholder").style.display='block';
    }
    else{
        document.getElementById("sup_dgholder").style.display='none';
    }
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
            let str="<span style='color:black;'>"+user_str.charAt(0)+"</span><span>";
            for (var i = 1; i < user_str.length; i++) {
                str=str+user_str[i];
            }
            str=str+"</span>";
            document.getElementById("handle1").innerHTML = str;
        } 
        document.getElementById('name1').innerHTML=user1.firstName+' '+user1.lastName;
        document.getElementById('rating1').innerHTML=' <span style="font-size:13px;font-family:verdana;font-weight:bold;color:'+u_col+';">' + user1.rating + '</span>' + '  ( </span> <span style="font-size:13px;font-family:verdana;font-weight:bold;color:'+colorcheck(user1.rank)+';">' + user1.rank + '</span>)' ;
        document.getElementById('maxrating1').innerHTML=' <span style="font-size:13px;font-family:verdana;font-weight:bold;color:'+colorcheck(user1.maxRank)+';">' + user1.maxRating + '</span>' + '  ( </span> <span style="font-size:13px;font-family:verdana;font-weight:bold;color:'+colorcheck(user1.maxRank)+';">' + user1.maxRank + '</span>)' ;
        //assume ok because he has an entity already existing

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
            document.getElementById("g1holder").innerHTML=`<div style="color:#437fc7;font-weight:bold"> `+ user1.handle+"'s chart </div>" +' <canvas id="graph1" style="width:100%;max-width:800px;display:block;margin:auto;"></canvas> ';
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
                borderWidth: 2,
                pointRadius: 2,
                pointBackgroundColor: '#6daffe',
                pointBorderColor: '#6daffe',
                backgroundColor: "rgba(0,0,255,1.0)",
                borderColor: "#6daffe",
                data: Yval
                }]
            },
            options: {
                legend: {display: false},
                scales: { 
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Round No'
                    }
                }],
                yAxes: [{scaleLabel: {
                    display: true,
                    labelString: 'Rating'
                  } , ticks: {min:`+minrate+', max:'+maxrate+'}}],'
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
        document.getElementById("handle1").style.color = 'black ';
        document.getElementById('user1dp').src=' ';
        document.getElementById('user1dp').style.border='4px outset lightgray';
        document.getElementById('name1').innerHTML='undefined undefined';
        document.getElementById('rating1').innerHTML='0 ( NA ) ';
        document.getElementById('maxrating1').innerHTML='0 ( NA ) ';
        document.getElementById('contests_appeared1').innerHTML='0';
        document.getElementById('bestrank1').innerHTML='0 ( NA ) ';
        document.getElementById('worstrank1').innerHTML='0 ( NA ) ';
        document.getElementById('maxdplus1').innerHTML='0 ( NA ) ';
        document.getElementById('maxdminus1').innerHTML='0 ( NA ) ';
        document.getElementById('g1holder').innerHTML=' ';
        document.getElementById('dgholder').innerHTML=' ';
        
    }

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
            let str="<span style='color:black;'>"+user_str.charAt(0)+"</span><span>";
            for (var i = 1; i < user_str.length; i++) {
                str=str+user_str[i];
            }
            str=str+"</span>";
            document.getElementById("handle2").innerHTML = str;
        } 
        document.getElementById('name2').innerHTML=user2.firstName+' '+user2.lastName;
        document.getElementById('rating2').innerHTML='<span style="font-size:13px;font-family:verdana;font-weight:bold;color:'+u_col+';">' + user2.rating + '</span>' + '  ( </span> <span style="font-size:13px;font-family:verdana;font-weight:bold;color:'+colorcheck(user2.rank)+';">' + user2.rank + '</span>)' ;
        document.getElementById('maxrating2').innerHTML='<span style="font-size:13px;font-family:verdana;font-weight:bold;color:'+colorcheck(user2.maxRank)+';">' + user2.maxRating + '</span>' + '  ( </span> <span style="font-size:13px;font-family:verdana;font-weight:bold;color:'+colorcheck(user2.maxRank)+';">' + user2.maxRank + '</span>)' ;
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
            document.getElementById("g2holder").innerHTML=`<div style="color:#437fc7;font-weight:bold"> `+ user2.handle+"'s chart </div>" +' <canvas id="graph2" style="width:100%;max-width:800px;display:block;margin:auto;"></canvas> ';
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
                borderWidth: 2,
                pointRadius: 2,
                pointBackgroundColor: '#6daffe',
                pointBorderColor: '#6daffe',
                backgroundColor: "rgba(0,0,255,1.0)",
                borderColor: "#6daffe",
                data: Yval
                }]
            },
            options: {
                legend: {display: false},
                scales: { 
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Round No'
                    }
                }],
                yAxes: [{scaleLabel: {
                    display: true,
                    labelString: 'Rating'
                  } , ticks: {min:`+minrate+', max:'+maxrate+'}}],'
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
            document.getElementById("versus").innerHTML='<span style="color:#6daffe">'+user1.handle+'</span> vs <span style="color:#ffc233">'+user2.handle+"</span>";
            document.getElementById("dgholder").style.display='block';
            document.getElementById("sup_dgholder").style.display='block';

            new Chart("doublechart", {
              type: "line",
              data: {
                labels: lendata,
                datasets: [{ 
                    fill: false,
                    tension: 0.2,
                    borderWidth: 2,
                    pointRadius: 2,
                    pointBackgroundColor: '#6daffe',
                    pointBorderColor: '#6daffe',
                    borderColor: "#6daffe",
                    data: ydata1
                }, { 
                    fill: false,
                    tension: 0.2,
                    borderWidth: 2,
                    pointRadius: 2,
                    pointBackgroundColor: '#ffc233',
                    pointBorderColor: '#ffc233',
                    borderColor: "#ffc233",
                    data: ydata2
                }]
              },
              options: {
                  legend: {display: false},
                  scales:{
                    xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Round No'
                    }
                    }],
                    yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Rating'
                    }
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
        document.getElementById("handle2").style.color = 'black ';
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

function toggleuser2(){
    let checker=document.getElementById("user_2");
    if(checker.style.display==='block'){
        checker.style.display='none';
        document.getElementById("grp2").style.display='none';
        document.getElementById("dgholder").style.display='none';
        document.getElementById("sup_dgholder").style.display='none';
        document.getElementById("Enteruser2").style.display='none';
        document.getElementById("single_multi_icon").innerHTML=`<i class="fa fa-toggle-on" style="font-size:30px;color:#6daffe"></i>`;
        document.getElementById("clickbox").innerHTML="See Stats";
    }
    else if(checker.style.display==='none'){
        checker.style.display='block';
        document.getElementById("grp2").style.display='block';
        document.getElementById("dgholder").style.display='block';
        document.getElementById("sup_dgholder").style.display='block';
        document.getElementById("Enteruser2").style.display='block';
        document.getElementById("single_multi_icon").innerHTML=`<i class="fa fa-toggle-off" style="font-size:30px;color:#6daffe"></i>`;
        document.getElementById("clickbox").innerHTML="Compare";
    }
}

function colorcheck(str){
    if(str=='newbie'){
        return 'grey';
    }
    else if(str=='pupil'){
        return 'green';
    }
    else if(str=='specialist'){
        return '#03a89e';
    }
    else if(str=='expert'){
        return 'blue';
    }
    else if(str=='candidate master'){
        return '#a0a';
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
    return 'black';
}
