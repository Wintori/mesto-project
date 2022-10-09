const showInputError = (formElement, inputElement, errorMessage, validObj) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
    inputElement.classList.add(validObj.inputErrorClass)
    errorElement.classList.add(validObj.errorClass)
    errorElement.textContent = errorMessage
}

const hideInputError = (formElement, inputElement, validObj) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
    inputElement.classList.remove(validObj.inputErrorClass)
    errorElement.classList.remove(validObj.errorClass)
    errorElement.textContent = ""
}

const checkInputValidity = (formElement, inputElement, validObj) => {

    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage)
    } else {
        inputElement.setCustomValidity("")
    }


    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, validObj)
    } else {
        hideInputError(formElement, inputElement, validObj)
    }
}

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid
    })
}

const toggleButtonState = (inputList, buttonElement, validObj) => {
    if (hasInvalidInput(inputList, buttonElement)) {
        buttonElement.classList.add(validObj.inactiveButtonClass)
        buttonElement.setAttribute("disabled", "disabled")
    } else {
        buttonElement.classList.remove(validObj.inactiveButtonClass)
        buttonElement.removeAttribute("disabled", "disabled")
    }
}

const setEventListeners = (formElement, validObj) => {
    const inputList = Array.from(formElement.querySelectorAll(validObj.inputSelector))
    const buttonElement = formElement.querySelector(validObj.submitButtonSelector)

    toggleButtonState(inputList, buttonElement, validObj)

    inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", () => {
            checkInputValidity(formElement, inputElement, validObj)
            toggleButtonState(inputList, buttonElement, validObj)
        })
    })
}

const enableValidation = (validObj) => {
    const formList = Array.from(
        document.querySelectorAll(validObj.formSelector)
    )
    formList.forEach((formElement) => {
        formElement.addEventListener("submit", (evt) => {
            evt.preventDefault()
        })

        setEventListeners(formElement, validObj)
    })
}

const resetForm = (popup, validObj) => {
    const errorsList = popup.querySelectorAll(validObj.errorSpanSelector)
    const inputsList = popup.querySelectorAll(validObj.inputSelector)

    errorsList.forEach((errorElement) => {
        errorElement.classList.remove(validObj.errorClass)
    })
    inputsList.forEach((errorInput) => {
        errorInput.classList.remove(validObj.inputErrorClass);
    })
}

const disableButton = (button) => {
    button.classList.add("button_inactive")
    button.setAttribute("disabled", "disabled")
}


export { enableValidation, disableButton, resetForm }