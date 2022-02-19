let copyUsers = [];

function getProducts() {

    fetch("https://jsonplaceholder.typicode.com/users") 
    .then((response)=> response.json())
    .then((users)=> {

        copyUsers = users;
        displayUsers(copyUsers);

    })
    .catch((err)=>{
        console.log(err)
    })

}

function displayUsers(data) {
    let userString="";

    data.forEach((user,index)=>{
        userString += `
        <tr>
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${user.website}</td>
        <td>${user.address.city}</td>
        <td>${user.company.name}</td>
        <td>
            <button onclick="fillUpdateForm(${user.id})">Update</button>
            <button onclick="deleteUser('${user.id}')">Delete</button>

        </td>

        </tr>`
    })

    document.getElementById("users").innerHTML = userString;
}

getProducts();



function deleteUser(id) {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`,{
        method:"DELETE" 
    })
    .then((response)=>response.json())
    .then((data)=> {
        let userIndex = copyUsers.findIndex((user)=> user.id==id);
        copyUsers.splice(userIndex,1);
        displayUsers(copyUsers);
    })
    .catch((err)=>{
        console.log(err);
    })
}



function addProducts() {

    let user = {};

    user.name=document.getElementById('name').value;
    user.website=document.getElementById('website').value;
    user.address.city=document.getElementById('city').value;
    user.company.name=document.getElementById('company').value;

    

    fetch("https://jsonplaceholder.typicode.com/users" ,{
        method: "POST",
        body: JSON.stringify(user),
        headers: {
            "Content-Type" : "application/json"
        }
    })
    .then((response)=>response.json)
    .then((data)=> {
        copyUsers.push(data.user);
    displayUsers(copyUsers);
    document.getElementById('pro-form').reset();
    })
    .catch((err)=> {
        console.log(err);
    })

}

let userToUpdate;

function fillUpdateForm(id){
    userToUpdate = copyUsers.find((user)=> user.id===id);

    document.getElementById('up_name').value=userToUpdate.name;
    document.getElementById('up_website').value=userToUpdate.website;
    document.getElementById('up_city').value=userToUpdate.address.city;
    document.getElementById('up_company').value=userToUpdate.company.name;

}

function updateUser(){
    userToUpdate.name=document.getElementById('up_name').value;
    userToUpdate.website=document.getElementById('up_website').value;
    userToUpdate.address.city=document.getElementById('up_city').value;
    userToUpdate.company.name=document.getElementById('up_company').value;

    fetch(`https://jsonplaceholder.typicode.com/users/${userToUpdate.id}`,{
        method: "PUT",
        body: JSON.stringify(userToUpdate),
        headers: {
            "Content-Type" : "application/json"
        }
    })
    .then((response)=>response.json())
    .then((data)=> {

        let index = copyUsers.findIndex((user)=>user.id===userToUpdate.id);

        copyUsers[index]=userToUpdate;
        displayUsers(copyUsers);
        console.log(index);


        console.log(data);


    })
    .catch((err)=>{
        console.log(err);
    })
}