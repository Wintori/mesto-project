const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
    inputElement.classList.add("popup__input_type_error")
    errorElement.textContent = errorMessage
    errorElement.classList.add("popup__input-error_active")
}

const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
    inputElement.classList.remove("popup__input_type_error")
    errorElement.classList.remove("popup__input-error_active")
    errorElement.textContent = ""
}

const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage)
    } else {
        hideInputError(formElement, inputElement)
    }
}

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid
    })
}

const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList, buttonElement)) {
        buttonElement.classList.add("button_inactive")
        buttonElement.setAttribute("disabled", "disabled")
    } else {
        buttonElement.classList.remove("button_inactive")
        buttonElement.removeAttribute("disabled", "disabled")
    }
}

const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(".popup__input"))
    const buttonElement = formElement.querySelector(".button-save")

    toggleButtonState(inputList, buttonElement)

    inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", () => {
            checkInputValidity(formElement, inputElement)
            toggleButtonState(inputList, buttonElement)
        })
    })
}

const enableValidation = () => {
    const formList = Array.from(
        document.querySelectorAll(".popup__person-information")
    )
    formList.forEach((formElement) => {
        formElement.addEventListener("submit", (evt) => {
            evt.preventDefault()
        })

        const fieldsetList = Array.from(
            formElement.querySelectorAll(".popup__fieldset")
        )

        fieldsetList.forEach((fieldSet) => {
            setEventListeners(fieldSet)
        })
    })
}



export { enableValidation }