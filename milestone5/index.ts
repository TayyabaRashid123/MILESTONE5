const form=document.getElementById(`resumeForm`) as HTMLFormElement;
const resumeDisplayElement=document.getElementById(`resumeOutput`) as HTMLDivElement;
const shareableLinkContainer =document.getElementById(`shareable-link-container`) as HTMLDivElement;
const shareableLinkElement=document.getElementById(`shareable-link`) as HTMLAnchorElement;
const downloadPDFButton=document.getElementById(`download-pdf`) as HTMLButtonElement;


//handla form submission
form.addEventListener(`submit`,(event:Event)=>{
event.preventDefault();


//collect input values..
const username=(document.getElementById(`username`) as HTMLInputElement).value;
const name=(document.getElementById(`name`) as HTMLInputElement).value;
const email=(document.getElementById(`email`) as HTMLInputElement).value;
const education=(document.getElementById(`education`) as HTMLInputElement).value;
const experience=(document.getElementById(`experience`) as HTMLInputElement).value;
const skills=(document.getElementById(`skills`) as HTMLInputElement).value;
const description=(document.getElementById(`description`) as HTMLInputElement).value;

//save form data in local storage with the username as the key
const resumeData={name,email,education,experience,skills,DecompressionStream};
localStorage.setItem(username,JSON.stringify(resumeData));



//GENERATE THE RESUME DYNAMICALLY
const resumeHTML=`
<h2>Personal Information</h2>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Education:</strong> ${education}</p>
<p><strong>Experience:</strong> ${experience}</p>
<p><strong>Skills:</strong> ${skills}</p>
<p><strong>Description:</strong> ${description}</p>




`;
//dispay the generate resume
resumeDisplayElement.innerHTML =resumeHTML;


//generate a shareable url with the username only
const shareableURL=`&{window.location.origin}?username=${encodeURIComponent(username)}`


//display the shareable link
shareableLinkContainer.style.display="block";
shareableLinkElement.href=shareableURL;
shareableLinkElement.textContent=shareableURL;
})



//HANDLE PDF DOWNLOAD
downloadPDFButton.addEventListener("click",()=>
{
window.print();

})

//prefill te form based on username url
window.addEventListener("DOMContentLoaded",()=>
{
    const urlParams= new URLSearchParams(window.location.search);
    const username = urlParams.get("username");


    if(username){
        const savedResumeData=localStorage.getItem(username);
        if(savedResumeData){
        //autofill form if data is found in local storage
        const resumeData=JSON.parse(savedResumeData);
       (document.getElementById(`username` )as HTMLInputElement).value = username;
       (document.getElementById(`name` )as HTMLInputElement).value=resumeData.name;
       (document.getElementById(`email` )as HTMLInputElement).value=resumeData.email;
       (document.getElementById(`education` )as HTMLInputElement).value=resumeData.education;
       (document.getElementById(`experience` )as HTMLInputElement).value=resumeData.experience;
       (document.getElementById(`skills` )as HTMLInputElement).value=resumeData.skills;
       (document.getElementById(`description` )as HTMLInputElement).value=resumeData.description;

    }}
})

