function populate_tables(id,log_check,passedname){
    console.log(`working on ${id}`)
    var curr_user = id

    var user_inf = document.createElement('div')
    Object.assign(user_inf, {
        id: `user_${curr_user}`,
        className: 'col-sm',
        style: 'background-color:#191c22;'
    })

    if(id=='2'){
        //To enable toggling
        user_inf.style.display='block'
        user_inf.style.backgroundColor='#222630'
    }

    var prof_pic = document.createElement('img')
    Object.assign(prof_pic,{
        id: `user${curr_user}dp`,
        style: 'border-radius: 50%;margin-top:10px'
    })

    user_inf.appendChild(prof_pic)

    var bt_hd_holder = document.createElement('div')
    var bt = document.createElement('button')
    var bt_inner = document.createElement('div')

    Object.assign(bt,{
        type : "button",
        class : "btn btn-secondary",
        dataToggle : "tooltip",
        style : "margin-top:10px;background-color: transparent;border: 0px solid transparent",
        dataPlacement : "bottom",
        title : "Visit cf profile"
    })

    Object.assign(bt_inner,{
        id : `handle${curr_user}`,
        class : "cl_user_handle",
        onclick : `load_cf_page('handle${curr_user}')`,
        style : "font-family:verdana;font-weight: bold;font-size:18px;"
    })

    bt.appendChild(bt_inner)
    bt_hd_holder.appendChild(bt)

    user_inf.appendChild(bt_hd_holder)

    var tab = document.createElement('table')

    Object.assign(tab,{
        id : `tab_${curr_user}`,
        style : "width:80%;max-width:500px;margin-left: auto; margin-right: auto;display:none;",
    })

    tab.classList.add("table_des");

    
    //name
    var trow = document.createElement('tr')

    var thead = document.createElement('th')
    Object.assign(thead,{
        style : "font-weight:bold"
    })

    var tdesc = document.createElement('td')
    var tdesc_inner = document.createElement('div')
    Object.assign(tdesc_inner,{
        id : `name${curr_user}`,
        style : "margin-top:10px"
    })
    tdesc.appendChild(tdesc_inner)

    thead.innerHTML = 'Name'

    trow.appendChild(thead)
    trow.appendChild(tdesc)

    tab.appendChild(trow)
    
    //rating

    trow = document.createElement('tr')

    thead = document.createElement('th')
    Object.assign(thead,{
        style : "font-weight:bold"
    })

    tdesc = document.createElement('td')
    tdesc_inner = document.createElement('div')
    Object.assign(tdesc_inner,{
        id : `rating${curr_user}`,
        style : "margin-top:10px"
    })
    tdesc.appendChild(tdesc_inner)

    thead.innerHTML= 'Rating'

    trow.appendChild(thead)
    trow.appendChild(tdesc)

    tab.appendChild(trow)

    //maxrating

    trow = document.createElement('tr')

    thead = document.createElement('th')
    Object.assign(thead,{
        style : "font-weight:bold"
    })

    tdesc = document.createElement('td')
    tdesc_inner = document.createElement('div')
    Object.assign(tdesc_inner,{
        id : `maxrating${curr_user}`,
        style : "margin-bottom:10px"
    })
    tdesc.appendChild(tdesc_inner)

    thead.innerHTML= 'Max Rating'

    trow.appendChild(thead)
    trow.appendChild(tdesc)

    tab.appendChild(trow)

    //contests appeared
    trow = document.createElement('tr')

    thead = document.createElement('th')
    Object.assign(thead,{
        style : "font-weight:bold"
    })

    tdesc = document.createElement('td')
    tdesc_inner = document.createElement('div')
    Object.assign(tdesc_inner,{
        id : `contests_appeared${curr_user}`,
        style : "margin-bottom:10px"
    })
    tdesc.appendChild(tdesc_inner)

    thead.innerHTML= 'Contests Appeared'

    trow.appendChild(thead)
    trow.appendChild(tdesc)

    tab.appendChild(trow)
    //ac count

    trow = document.createElement('tr')

    thead = document.createElement('th')
    Object.assign(thead,{
        style : "font-weight:bold"
    })

    tdesc = document.createElement('td')
    tdesc_inner = document.createElement('div')
    Object.assign(tdesc_inner,{
        id : `problems_solved${curr_user}`,
    })
    tdesc.appendChild(tdesc_inner)

    thead.innerHTML= 'AC Count'

    trow.appendChild(thead)
    trow.appendChild(tdesc)

    tab.appendChild(trow)
    //best rank
    trow = document.createElement('tr')

    thead = document.createElement('th')
    Object.assign(thead,{
        style : "font-weight:bold"
    })

    tdesc = document.createElement('td')
    tdesc_inner = document.createElement('div')
    Object.assign(tdesc_inner,{
        id : `bestrank${curr_user}`,
    })
    tdesc.appendChild(tdesc_inner)

    thead.innerHTML= 'Best Rank'

    trow.appendChild(thead)
    trow.appendChild(tdesc)

    tab.appendChild(trow)
    //worst rank
    trow = document.createElement('tr')

    thead = document.createElement('th')
    Object.assign(thead,{
        style : "font-weight:bold"
    })

    tdesc = document.createElement('td')
    tdesc_inner = document.createElement('div')
    Object.assign(tdesc_inner,{
        id : `worstrank${curr_user}`,
    })
    tdesc.appendChild(tdesc_inner)

    thead.innerHTML= 'Worst Rank'

    trow.appendChild(thead)
    trow.appendChild(tdesc)

    tab.appendChild(trow)
    // max rating +
    trow = document.createElement('tr')

    thead = document.createElement('th')
    Object.assign(thead,{
        style : "font-weight:bold"
    })

    tdesc = document.createElement('td')
    tdesc_inner = document.createElement('div')
    Object.assign(tdesc_inner,{
        id : `maxdplus${curr_user}`,
    })
    tdesc.appendChild(tdesc_inner)

    thead.innerHTML= 'Max Rating Increase'

    trow.appendChild(thead)
    trow.appendChild(tdesc)

    tab.appendChild(trow)
    //max rating -
    trow = document.createElement('tr')

    thead = document.createElement('th')
    Object.assign(thead,{
        style : "font-weight:bold"
    })

    tdesc = document.createElement('td')
    tdesc_inner = document.createElement('div')
    Object.assign(tdesc_inner,{
        id : `maxdminus${curr_user}`,
    })
    tdesc.appendChild(tdesc_inner)

    thead.innerHTML= 'Max Rating Decrease'

    trow.appendChild(thead)
    trow.appendChild(tdesc)

    tab.appendChild(trow)

    // end assignments

    user_inf.appendChild(tab)

    document.getElementById('u_info_row').appendChild(user_inf);

    console.log('ok appended')

    comparefunction(passedname)
    
}


async function comparefunction(pass_name){

    let MR1= new Map();
    let MR2= new Map();

    let xdata_psolve_common=[],u1_psolve_data=[],u2_psolve_data=[];

    for(let i1=800;i1<=3500;i1+=100){
        MR1.set(i1,0);
        MR2.set(i1,0);
        xdata_psolve_common.push(i1);
        u1_psolve_data.push(0);
        u2_psolve_data.push(0);
    }

    let handle1 = pass_name;
    console.log(handle1);

    let url1=`https://codeforces.com/api/user.info?handles=${handle1}`;
    const res1= await fetch(url1);
    let a1,a2,user1,user2,ratingurl1,rating_exists1,ratingurl2,rating_exists2;
    let lendata=[],ydata1=[],ydata2=[];
    if(res1.ok){
        a1= await res1.json();
        user1 = a1.result[0];
        ratingurl1="https://codeforces.com/api/user.rating?handle="+user1.handle;
        problem_info_url1=`https://codeforces.com/api/user.status?handle=${handle1}&from=1&count=1000000`;
        problem_data1= await fetch(problem_info_url1);
        rating_exists1= await fetch(ratingurl1);
    }
    //User 1 stats here ______________________________________________________________________________________________________________________

    if(res1.ok)
    {
        let u_col=colorcheck(user1.rank);
        document.getElementById('tab_1').style.display='block';
        document.getElementById('user1dp').src=user1.titlePhoto;
        document.getElementById('user1dp').style.height='200px';
        document.getElementById('user1dp').style.width='200px';
        document.getElementById('user1dp').style.border='4px outset '+u_col;
        document.getElementById("user1dp").style.boxShadow='none';
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
            for(let i=0;i<pd1.result.length;i++){
                    let qs=pd1.result[i];
                   if(qs.verdict==="OK"){
                        if(MP1.get(qs.contestId+qs.problem.index)===undefined){
                            MP1.set(qs.contestId+qs.problem.index,1);
                            if(MR1.get(qs.problem.rating)!=undefined){
                                MR1.set(qs.problem.rating,MR1.get(qs.problem.rating)+1);
                            }
                        }
                        else{
                            MP1.set(qs.contestId+qs.problem.index,MP1.get(qs.contestId+qs.problem.index)+1);
                        }
                   } 
                   for(let i1=0;i1<xdata_psolve_common.length;i1++){
                        u1_psolve_data[i1]=MR1.get(xdata_psolve_common[i1]);
                   }
            }
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
            let str ='var Xval=[',minrate=100000,min_rt_graph=800;
            for(var i=0;i<Xval.length;i++){
                    str=str+Xval[i]+',';
            }
            str=str+'];';
            str= str+ ' var Yval=[';
                for(var i=0;i<Yval.length;i++){
                    str=str+Yval[i]+',';
                    if(Yval[i]<minrate){
                        minrate=Yval[i];
                    }
            }
            if(minrate<min_rt_graph){
                min_rt_graph=400;
            }
            if(minrate<min_rt_graph){
                min_rt_graph=0;
            }
            if(minrate<min_rt_graph){
                min_rt_graph=minrate-100;
                min_rt_graph=(99-min_rt_graph)/100;
                min_rt_graph=~~min_rt_graph;
                min_rt_graph=-100*min_rt_graph;
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
                        fontColor:'#9AA7B8',
                    } , gridLines: { color: '#434c56' }, ticks: {fontColor: '#9AA7B8'} 
                }],
                yAxes: [{scaleLabel: {
                    display: true,
                    labelString: 'Rating',
                    fontColor:'#9AA7B8',
                  } , gridLines: { color: '#434c56' } , ticks: {fontColor: '#9AA7B8',min:${min_rt_graph}`+',}}],'
                +'}'
            +'}'
            +'});;';
            document.getElementById("g1holder").appendChild(script);
            if(Xval.length>lendata.length){
                lendata=Xval;
            }      
            ydata1=Yval;
            //end of rating graph

            document.getElementById("u1_n_prb").innerHTML='Problem ratings of '+user1.handle;
            document.getElementById("u1_prob_holder").innerHTML=`<canvas id="u1_pchart" style="width:100%;max-width:800px;display:block;margin:auto;"></canvas>`;
            
            new Chart("u1_pchart", {
                type: 'bar',
                data: {
                    labels: xdata_psolve_common,
                    datasets: [{ 
                        backgroundColor: '#33ccff',
                        data: u1_psolve_data
                    }]
                  },
                options: {
                    legend: {display: false},
                    scales:{
                      xAxes: [{
                      scaleLabel: {
                          display: true,
                          labelString: 'Problem Rating',
                          fontColor:'#9AA7B8',
                      }, gridLines: { color: '#434c56' }, ticks: {fontColor: '#9AA7B8'} 
                      }],
                      yAxes: [{
                      scaleLabel: {
                          display: true,
                          labelString: 'No of problems',
                          fontColor:'#9AA7B8',
                      }, gridLines: { color: '#434c56' }, ticks: {fontColor: '#9AA7B8'}
                      }],
                  }
              }
              });
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
        document.getElementById("user1dp").style.boxShadow='none';
        
    }


    //User 2 stats here ______________________________________________________________________________________________________________________

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
        document.getElementById("sup_problemvs").style.display='none';
        document.getElementById("u1_only_prob").style.display='block';
    }
    else if(checker.style.display==='none'){
        checker.style.display='block';
        document.getElementById("grp2").style.display='block';
        document.getElementById("dgholder").style.display='block';
        document.getElementById("sup_dgholder").style.display='block';
        document.getElementById("Enteruser2").style.display='block';
        document.getElementById("sup_problemvs").style.display='block';
        document.getElementById("clickbox").innerHTML="Compare";
        let str_tmp=document.getElementById("info2").value;
        document.getElementById("info2").value='';
        document.getElementById("info2").value=str_tmp;
        document.getElementById("u1_only_prob").style.display='none';
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
    else if(str=='grandmaster'||str=='international grandmaster'||str=='legendary grandmaster'){
        return '#ff471a';
    }
    return '#e0ddd1';
}

function load_cf_page(div_id)
{
    let u_handle=document.getElementById(div_id).innerHTML;
    u_handle=u_handle.trim();
    let err="User not found"
    let cf_link=`https://codeforces.com/profile/${u_handle}`;
    if(u_handle == err){
        console.log('Invalid handle!');
    }
    else{
        window.open(cf_link, '_blank').focus();
    }
}

function goto_top() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

document.addEventListener("DOMContentLoaded", function(event) {
    var top_scroll_btn = document.getElementById("top_scroll_btn");

    window.onscroll = function() {scrollFunction()};

    function scrollFunction() {
    if (document.body.scrollTop >= 50 || document.documentElement.scrollTop >= 50) {
        top_scroll_btn.style.display = "block";
    } else {
        top_scroll_btn.style.display = "none";
    }
    }
 });
