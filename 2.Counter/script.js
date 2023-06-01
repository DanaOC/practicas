//set initial count
let count = 0;

//declare buttons and counter span
const btns = document.querySelectorAll(".btn");

//span
let counter = document.querySelector('#value');

//recorre los botones e identifica cada uno
btns.forEach(function(btn) {
btn.addEventListener('click', function(e){
    //imprime que botón es el actual
    //console.log(e.currentTarget.classList);
    const styles = e.currentTarget.classList;
    
    

    switch(true)
    {
        case styles.contains('decrease'): 
        count--;
        counter.style.color = "red";
        counter.textContent = count;
        
        break;

        case styles.contains('reset'):
            count = 0;
            counter.style.color = "black";
            counter.textContent = count;
            break;

            case styles.contains('increase'):
                count++;
                counter.style.color = "green";
                counter.textContent = count;
                break;
    }

})



});
