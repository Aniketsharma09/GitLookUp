const form = document.querySelector(".github");
const input = document.querySelector(".username");
const userdeatils = document.querySelector(".userDetails")
const profileimage = document.querySelector(".profileimg");
const uname = document.querySelector(".name");
const userbio = document.querySelector(".userbio");
const profilelink = document.querySelector(".profilelink");
const repos = document.querySelector(".repos");
const follower = document.querySelector(".follower");
const following = document.querySelector(".following");
const error = document.querySelector(".error");
const errorbutton = document.querySelector(".errorbutton");
const container = document.querySelector(".container");
const close = document.querySelector(".close");


form.addEventListener("submit", function (e) {
  e.preventDefault();
  const username = input.value.trim();
  console.log(username);
  fatchData(username);
});
close.addEventListener('click',()=>{
  userdeatils.style.visibility = 'hidden';
})
let fatchData = async function getData(username) {
  let response = await fetch(`https://api.github.com/users/${username}`);
let response2 = await fetch(`https://api.github.com/users/${username}/repos?sort=created&direction=desc`);
  if (response.status == 200 && response2.status == 200) {
    let userdata = await response.json();
    console.log(userdata);
    let userrepo = response2.json();
    // let reponum = 0;
    let clutter = "";
    userrepo.then((data)=>{
        for(obj of data){
          console.log(obj);
          
            clutter += `<div class="repos">
                        <h3 class="onerepo">${obj.name}</h3>
                        <a class="firstlink" target="_blank" href="${obj.html_url}">check</a>
                    </div>`
            // reponum++;
            // if(reponum>4){
            //     break;
            // }
            container.innerHTML = clutter;
        }
    })
    console.log(userrepo);
    userdeatils.style.visibility = 'initial';
    profileimage.src = userdata.avatar_url;
    uname.innerText = userdata.name;
    follower.innerText = userdata.followers;
    following.innerText = userdata.following;
    userbio.innerText = userdata.bio;
    profilelink.href = userdata.html_url;
    repos.innerText = userdata.public_repos;

  }
  else{
        error.style.visibility = "initial";
  }
 
};
errorbutton.addEventListener('click',()=>{
    error.style.visibility = "hidden";
})
