const getalldata=(()=>{

})

const baseURL='http://127.0.0.1:8085';
window.onload = function() {
    const states=showallstate();
    findalldate();
};


function  showallstate(){
    let url=baseURL+'/api/getStates';
    console.log(url);
    axios.get(url).then(res =>{
        console.log(res.data)
        renderOptions(res.data);
    })
        .catch(error =>{
            console.error('error:',error);
        });
}
function renderOptions(options) {
    var dropdown = $('#state');
    dropdown.select2();
    dropdown.append($('<option>', {
        placeholder: 'choose state',
        value: '',
        text: ''
    }));
    options.forEach(function(option) {
        dropdown.append($('<option>', {
            value: option.state,
            text: option.state
        }));
    });
}

function  findalldate(pageNo){
    let url=baseURL+'/api/getAllPopulation';

    const params ={
    }
    var state=$('#state').val();
    var city=$('#city').val();
    var leastSize=$('#leastp').val();
    var mostSize=$('#mostp').val();
    if(state){
        params.state=state;
    }
    if(city!==""){
        params.city=city;
    }
    if(leastSize!==""){
        params.leastSize=leastSize;
    }
    if(mostSize!==""){
        params.mostSize=mostSize;
    }
    if(pageNo){
        params.pageNo=pageNo;
    }
    console.log(params);
    axios.get(url,params).then(res =>{
        console.log(res.data)
        displayData(res.data,$('#all-data'));
    })
        .catch(error =>{
            console.error('error:',error);
        });
}
function displayData(data,tid) {
    var t = $(tid);
    var nums=t.find('span');
    console.log(data.count);
    console.log(nums.text);
    nums.text(data.count);
    var table=t.find('tbody');
    table.empty();
    data=data.data;
    $.each(data, function(index, item) {
        var row = $('<tr>');
        row.append($('<td>').text(item.state));
        row.append($('<td>').text(item.place));
        row.append($('<td>').text(item.fips));
        row.append($('<td>').text(item.tract));
        row.append($('<td>').text(item.population));
        table.append(row);
    });
}
