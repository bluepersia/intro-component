document.querySelector ('.card_form').addEventListener ('submit', handleSubmit);
const firstNameEl = document.getElementById ('card_input-first');
const lastNameEl = document.getElementById ('card_input-last');
const emailEl = document.getElementById ('card_input-email');
const passwordEl = document.getElementById ('card_input-pass');
const inputs = [firstNameEl, lastNameEl, emailEl, passwordEl];

function getInput (target) 
{
    return target.querySelector ('.card_input');
}
function getErrorField (target)
{
    return target.querySelector ('.card_input-error');
}

function checkRequired (target) {
    return target.value == '' ? `${target.placeholder} cannot be empty`: '';
}
function checkLength (target) {
        return target.value.length < target.dataset.minlength ? `${target.placeholder} must be at least ${target.dataset.minlength} characters long` : '';
}

function checkEmail (target) {
    return isEmail (target.value) ? '' : 'Please provide a valid email address';
}

function checkInput (target) {

    let error;
    if (target.dataset.required)
         error = checkRequired (target);

    if (error)
        return error;


    if (target.dataset.minlength)
        error = checkLength (target);

    if (error)
        return error;

        
    if (target.dataset.email)
        error =  checkEmail (target);

    if (error)
        return error;

    return '';
}

function handleSubmit (e)
{
    e.preventDefault ();

    inputs.forEach (inputWrapper => {
        let input = getInput (inputWrapper);
        let errorField = getErrorField (inputWrapper);
        let error = checkInput (input);

        if (error)
        {
            inputWrapper.classList.add ('invalid');
            errorField.textContent = error;
        }
        else
            inputWrapper.classList.remove ('invalid');
    });

}



function isEmail (val)
{
    const regexp = new RegExp (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);

    return val.match (regexp);
}