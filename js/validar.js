$(document).ready(function () {

    // Validaciones para cada campo de entrada
    var validateField = function (fieldId, regex) {
        var input = $(fieldId);
        var is_valid = regex.test(input.val());
        if(is_valid){
            input.removeClass("is-invalid").addClass("is-valid");
        } else {
            input.removeClass("is-valid").addClass("is-invalid");
        }
        return is_valid;
    };

    $("#nombre").on("input", function () {
        validateField("#nombre", /^[\w\s]{3,15}$/);
    });

    $("#celular").on("input", function () {
        validateField("#celular", /^[9]{1}[0-9]{8}$/);
    });

    $("#edad").on("input", function () {
        validateField("#edad", /^[0-9]{2}$/);
    });

    $("#mensaje").on("input", function () {
        validateField("#mensaje", /^[\w\s]{5,}$/);
    });

    $("#correo").on("input", function () {
        validateField("#correo", /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
    });

    // Comprobando la validación en el evento de envío del formulario
    $("form").on("submit", function (event) {
        event.preventDefault();

        // Comprobando si todos los campos son válidos
        var isNameValid = validateField("#nombre", /^[\w\s]{3,15}$/);
        var isPhoneValid = validateField("#celular", /^[9]{1}[0-9]{8}$/);
        var isAgeValid = validateField("#edad", /^[0-9]{2}$/);
        var isMessageValid = validateField("#mensaje", /^[\w\s]{5,}$/);
        var isEmailValid = validateField("#correo", /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);

        var isValid = isNameValid && isPhoneValid && isAgeValid && isMessageValid && isEmailValid;

        if (isValid) {
            
            var form = document.getElementById("my-form");
    
            async function handleSubmit(event) {
              event.preventDefault();
              var status = document.getElementById("my-form-status");
              var data = new FormData(event.target);
              fetch(event.target.action, {
                method: form.method,
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
              }).then(response => {
                if (response.ok) {
                  alert("Formulario enviado")
                  $("#nombre").val("");
                  $("#celular").val("");
                  $("#correo").val("");
                  $("#edad").val("");
                  $("#mensaje").val("");
                  form.reset()
                } else {
                  response.json().then(data => {
                    if (Object.hasOwn(data, 'errors')) {
                      status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
                    } else {
                      status.innerHTML = "Oops! There was a problem submitting your form"
                    }
                  })
                }
              }).catch(error => {
                status.innerHTML = "Oops! There was a problem submitting your form"
              });
            }
            form.addEventListener("submit", handleSubmit)


        } else {
            alert("Formulario no válido. Por favor, corrige los errores.");
        }
    });
});
