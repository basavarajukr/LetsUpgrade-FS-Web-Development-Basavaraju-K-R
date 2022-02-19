let users = [
    {
        name: "Ketaki",
        age: 23,
        city: "mumbai",
        gender: "female",
        zipcode: 3456,
        qualification: "bachelors",
        company:{
            name:"google",
            role: "web developer",
            salary: 7.5
        }
    },

    {
        name: "aaron",
        age: 27,
        city: "aleppy",
        gender: "male",
        zipcode: 2345,
        qualification: "masters",
        company:{
            name:"facebook",
            role: "system engineer",
            salary: 12.5
        }
    },

    {
        name: "jithendra",
        age: 33,
        city: "new delhi",
        gender: "male",
        zipcode: 343256,
        qualification: "bachelors",
        company:{
            name:"cognizant",
            role: "software developer",
            salary: 11
        }
    },

    {
        name: "ibrahim",
        age: 22,
        city: "california",
        gender: "male",
        zipcode: 3455646,
        qualification: "bachelors",
        company:{
            name:"oracle",
            role: "web designer",
            salary: 9
        }
    },

    {
        name: "sireesha",
        age: 23,
        city: "goa",
        gender: "female",
        zipcode: 3464656,
        qualification: "bachelors",
        company:{
            name:"tcs",
            role: "web developer",
            salary: 8
        }
    },

    {
        name: "saurabh",
        age: 25,
        city: "mumbai",
        gender: "male",
        zipcode: 3486756,
        qualification: "phd",
        company:{
            name:"letsupgrade",
            role: "trainer",
            salary: 8
        }
    }
];


function renderData(data) {
    let rows = "";
    for(i = 0; i<data.length ; i++) {

        rows +=`
        <tr>
            <td>${data[i].name}</td>
            <td>${data[i].age}</td>
            <td>${data[i].city}</td>
            <td>${data[i].gender}</td>
            <td>${data[i].qualification}</td>
            <td>${data[i].company.name}</td>
            <td>${data[i].company.role}</td>
            <td>${data[i].company.salary}</td>
        </tr>`
    }

    document.getElementById('tbody').innerHTML = rows;
}

renderData(users);

// search  

let filters = {
    nameFilter:{
        status: false,
        value: ""
    },
    cityFilter: {
        status: false,
        value: ""
    },
    roleFilter: {
        status: false,
        value: ""
    },
    genderFilter: {
        status: false,
        value: ""
    },
    qualificationFilter: {
        status: false,
        value: ""
    },
    ageFilter:{
        status: false,
        value: ""
    },
    salaryFilter:{
        status: true,
        value: ""
    }
};

// search 

function search(searchValue,property,data) {

    let results = [];

    for(i=0;i<data.length;i++){
        if(data[i][property].toLowerCase().indexOf(searchValue.toLowerCase())===0) {
            results.push(data[i]);
        }
    }

    return results;
}

function searchRole(searchValue,property,data) {

    let results = [];

    for(i=0;i<data.length;i++){
        if(data[i].company[property].toLowerCase().indexOf(searchValue.toLowerCase())===0) {
            results.push(data[i]);
        }
    }

    return results;
}


function sortData(data, way) {
    data.sort(function(a,b) {
        if(way === "asc"){
            return a.age-b.age;
        }
        else if(way === "desc") {
            return b.age - a.age;
        }
    });
    return data;
}

function sortSalary(data, way) {
    data.sort(function(a,b) {
        if(way === "asc"){
            return a.company.salary-b.company.salary;
        }
        else if(way === "desc") {
            return b.company.salary - a.company.salary;
        }
    });
    return data;
}




function filter(searchValue,filterProperty){
    // console.log(searchValue, filterProperty);

    let usersDisplay = Object.create(users);

    if(searchValue !== "") {
        filters[filterProperty].status = true;
        filters[filterProperty].value = searchValue;
    }
    else {
        filters[filterProperty].status = false;
        filters[filterProperty].value = "";
    }

    // console.log(filters);

    if(filters.nameFilter.status === true) {
        usersDisplay = search(filters.nameFilter.value, 'name' , usersDisplay);
    }

    if(filters.cityFilter.status === true) {
        usersDisplay = search(filters.cityFilter.value, 'city' , usersDisplay);
    }

    if(filters.roleFilter.status === true) {
        usersDisplay = searchRole(filters.roleFilter.value, 'role' , usersDisplay);
        console.log(usersDisplay);
    }

    if(filters.genderFilter.status === true) {
        usersDisplay = search(filters.genderFilter.value, 'gender' , usersDisplay);
    }

    if(filters.qualificationFilter.status === true) {
        usersDisplay = search(filters.qualificationFilter.value, 'qualification' , usersDisplay);
    }

    if(filters.ageFilter.status === true){
        usersDisplay=sortData(usersDisplay,filters.ageFilter.value);
    }

    if(filters.salaryFilter.status === true){
        usersDisplay= sortSalary(usersDisplay,filters.salaryFilter.value);
    }

renderData(usersDisplay);

}

function clearFilter() {

    renderData(users);

    document.getElementById('name').value = "";
    document.getElementById('city').value = "";
    document.getElementById('gender').value = "";
    document.getElementById('qualification').value = "";
    document.getElementById('role').value = "";


    filters = {
        nameFilter:{
            status: false,
            value: ""
        },
        cityFilter: {
            status: false,
            value: ""
        },
        roleFilter: {
            status: false,
            value: ""
        },
        genderFilter: {
            status: false,
            value: ""
        },
        qualificationFilter: {
            status: false,
            value: ""
        },
        ageFilter:{
            status: false,
            value: ""
        }
    };

}


// users.sort(function(a,b) { return a.age - b.age});

// console.log(users);