export default class FormValidator {
    constructor(validObj, popup) {
        this.validObj = validObj
        this.popup = popup
    }

    _showInputError = (formElement, inputElement, errorMessage, validObj) => {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
        inputElement.classList.add(validObj.inputErrorClass)
        errorElement.classList.add(validObj.errorClass)
        errorElement.textContent = errorMessage
    }
    
    _hideInputError = (formElement, inputElement, validObj) => {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
        inputElement.classList.remove(validObj.inputErrorClass)
        errorElement.classList.remove(validObj.errorClass)
        errorElement.textContent = ""
    }
    
    _checkInputValidity = (formElement, inputElement, validObj) => {
    
        if (inputElement.validity.patternMismatch) {
            inputElement.setCustomValidity(inputElement.dataset.errorMessage)
        } else {
            inputElement.setCustomValidity("")
        }
    
    
        if (!inputElement.validity.valid) {
            this._showInputError(formElement, inputElement, inputElement.validationMessage, validObj)
        } else {
            this._hideInputError(formElement, inputElement, validObj)
        }
    }
    
    _hasInvalidInput = (inputList) => {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid
        })
    }
    
    _toggleButtonState = (inputList, buttonElement, validObj) => {
        if (this._hasInvalidInput(inputList, buttonElement)) {
            buttonElement.classList.add(validObj.inactiveButtonClass)
            buttonElement.setAttribute("disabled", "disabled")
        } else {
            buttonElement.classList.remove(validObj.inactiveButtonClass)
            buttonElement.removeAttribute("disabled", "disabled")
        }
    }
    
    _setEventListeners = (formElement, validObj) => {
        const inputList = Array.from(formElement.querySelectorAll(validObj.inputSelector))
        const buttonElement = formElement.querySelector(validObj.submitButtonSelector)
    
        this._toggleButtonState(inputList, buttonElement, validObj)
    
        inputList.forEach((inputElement) => {
            inputElement.addEventListener("input", () => {
                this._checkInputValidity(formElement, inputElement, validObj)
                this._toggleButtonState(inputList, buttonElement, validObj)
            })
        })
    }
    
    enableValidation = () => {
        const formList = Array.from(
            document.querySelectorAll(this.validObj.formSelector)
        )
        formList.forEach((formElement) => {
            formElement.addEventListener("submit", (evt) => {
                evt.preventDefault()
            })
    
            this._setEventListeners(formElement, this.validObj)
        })
    }
    
    resetForm = () => {
        const errorsList = this.popup.querySelectorAll(this.validObj.errorSpanSelector)
        const inputsList = this.popup.querySelectorAll(this.validObj.inputSelector)
    
        errorsList.forEach((errorElement) => {
            errorElement.classList.remove(this.validObj.errorClass)
        })
        inputsList.forEach((errorInput) => {
            errorInput.classList.remove(this.validObj.inputErrorClass);
        })


        this._disableButton()
    }
    
    _disableButton = () => {
            this.popup.querySelector('.button-save').classList.add("button_inactive")
            this.popup.querySelector('.button-save').setAttribute("disabled", "disabled")
    }
}