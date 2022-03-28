function populate_both_tables(){
    populate_tables('1')
    populate_tables('2')
}


function populate_tables(id){
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
    
}
