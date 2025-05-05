function userData(username){
    let data = fetch(`https://api.github.com/users/${username}`).then(data => {
        if(!data.ok) throw new Error("User not found")
        else return data.json() 
    });
    return data.then(redeable => redeable).catch((err) => console.log(err))
}

let btn = document.querySelector('.btn');
let inputField = document.querySelector('.input');
let cardHolder = document.querySelector('.cardHolder');

function eventHandler(){
    let searchParam = inputField.value;
    if(searchParam.length > 0){
        userData(searchParam)
        .then((data) => {
            console.log()
            cardHolder.innerHTML = `<div class="card mt-4 border flex gap-2 shadow-[5px_5px_red]">
                <div class="rightSection p-1">
                    <img class="h-20 w-20 rounded-full object-cover" src=${data.avatar_url} alt="">
                </div>
                <div class="leftSection p-1 text-sm flex flex-col gap-1">
                    <div class="idNameHolder flex gap-4">
                        <p>Name : <span class="text-red-500">${data.login}</span></p>
                        <p>Id : <span>${data.id}</span></p>
                    </div>
                    <a class="text-blue-500" href="https://api.github.com/users/octocat">Visit on Github</a>
                    <p>Public repos : <span>${data.public_repos}</span></p>
                    <p>Location : <span>${data.location}</span></p>
                    <p>Company : <span class="bg-red-200">${data.company}</span></p>
                </div>
            </div>`
        })
    }else alert("Enter username")
}

btn.addEventListener('click',eventHandler);
window.addEventListener('keydown',function(event){
    if(event.key === 'Enter'){
        eventHandler();
    }
})