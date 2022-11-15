export default class FormValidator {
    constructor(validObj, popupForm) {
        this.validObj = validObj
        this._popupForm = popupForm
        this._inputList = this._popupForm.querySelectorAll(this.validObj.inputSelector)
        this._inputListArray = Array.from(this._inputList)
        this._submitButton = this._popupForm.querySelector(this.validObj.submitButtonSelector)
        this._errorList = this._popupForm.querySelectorAll(this.validObj.errorSpanSelector)
    }

    _showInputError = (inputElement, errorMessage) => {
        const errorElement = this._popupForm.querySelector(`.${inputElement.id}-error`)
        inputElement.classList.add(this.validObj.inputErrorClass)
        errorElement.classList.add(this.validObj.errorClass)
        errorElement.textContent = errorMessage
    }
    
    _hideInputError = (inputElement) => {
        const errorElement = this._popupForm.querySelector(`.${inputElement.id}-error`)
        inputElement.classList.remove(this.validObj.inputErrorClass)
        errorElement.classList.remove(this.validObj.errorClass)
        errorElement.textContent = ""
    }
    
    _checkInputValidity = (inputElement) => {
        if (inputElement.validity.patternMismatch) {
            inputElement.setCustomValidity(inputElement.dataset.errorMessage)
        } else {
            inputElement.setCustomValidity("")
        }
    
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage)
        } else {
            this._hideInputError(inputElement)
        }
    }
    
    _hasInvalidInput = () => {
        return this._inputListArray.some((inputElement) => {
            return !inputElement.validity.valid
        })
    }
    
    _toggleButtonState = () => {
        if (this._hasInvalidInput()) {
            this._submitButton.classList.add(this.validObj.inactiveButtonClass)
            this._submitButton.setAttribute("disabled", "disabled")
        } else {
            this._submitButton.classList.remove(this.validObj.inactiveButtonClass)
            this._submitButton.removeAttribute("disabled", "disabled")
        }
    }
    
    _setEventListeners = () => {
        this._toggleButtonState()
    
        this._inputListArray.forEach((inputElement) => {
            inputElement.addEventListener("input", () => {
                this._checkInputValidity(inputElement)
                this._toggleButtonState()
            })
        })
    }
    
    enableValidation = () => {
        
            this._popupForm.addEventListener("submit", (evt) => {
                evt.preventDefault()
            })
    
            this._setEventListeners()
        
    }
    
    resetForm = () => {
        this._errorList.forEach((errorElement) => {
            errorElement.classList.remove(this.validObj.errorClass)
        })
        this._inputList.forEach((errorInput) => {
            errorInput.classList.remove(this.validObj.inputErrorClass);
        })


        this._disableButton()
    }
    
    _disableButton = () => {
        this._submitButton.classList.add("button_inactive")
        this._submitButton.setAttribute("disabled", "disabled")
    }
}