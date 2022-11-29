const sections = document.querySelectorAll('section');
const list = document.getElementById('navbar__list')
const fragment = document.createDocumentFragment()
// build the nav
function navBar(){
for (const section of sections){
    const title =section.getAttribute('data-nav');
    const sectionId = section.getAttribute('id');
    const listItem = document.createElement('li');
    const link = document.createElement('a');
    link.classList.add("menu__link");
    link.href = `#${sectionId}`
    link.textContent = title
    //smooth scroll
    link.addEventListener('click', e =>{
        e.preventDefault()
        section.scrollIntoView({
            behavior:"smooth"
        })
    })
    listItem.appendChild(link);
    fragment.appendChild(listItem)
}
list.appendChild(fragment)
}
window.addEventListener('load',navBar)



//add class is active
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.65
};
const observerCallback = (entries) =>{
    const links = list.querySelectorAll('a.menu__link');
    if(entries[0].isIntersecting){
        entries[0].target.classList.add("your-active-class");
        links.forEach(link =>{
            if(link.textContent === entries[0].target.dataset.nav  ){
                link.classList.add("active");
            }else{
                entries[0].target.classList.remove("active");
            }
        })
    }else{
        entries[0].target.classList.remove("your-active-class");
    }
}
const observer = new IntersectionObserver(observerCallback, observerOptions)
window.addEventListener("scroll",() =>{
    for(const section of sections){
        observer.observe(section);
    }
})