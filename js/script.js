var loader = document.createElement('div')
loader.setAttribute('id', 'pre-loader');
loader.innerHTML = "<div class='lds-hourglass'></div>";

window.start_loader = function() {
    if (!document.getElementById('pre-loader') || (!!document.getElementById('pre-loader') && document.getElementById('pre-loader').length <= 0))
        document.querySelector('body').appendChild(loader)
}

window.end_loader = function() {
    if (!!document.getElementById('pre-loader')) {
        setTimeout(() => {
            document.getElementById('pre-loader').remove()
        }, 500)
    }
}

window.addEventListener("load", () => {
    (function() {

        var form = document.getElementById('generate-form')
        form.addEventListener('submit', function(e) {
            e.preventDefault()
            start_loader()
            var pwLength = document.getElementById('password_length').value
            var containUpper = document.getElementById('upperCharacters').checked
            var containLower = document.getElementById('lowerCharacters').checked
            var containNumeric = document.getElementById('numericCharacters').checked
            var containSpecial = document.getElementById('specialCharacters').checked
            var chars = "";
            const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            const lowerChars = "abcdefghijklmnopqrstuvwxyz";
            const numericChars = "0123456789";
            const specialChars = "%$*{}[]()^#@!+-.?:_";
            if (containUpper)
                chars += upperChars;
            if (containLower)
                chars += lowerChars;
            if (containNumeric)
                chars += numericChars;
            if (containSpecial)
                chars += specialChars;
            if (chars.length > 0 && pwLength > 0) {
                var generatePass = Array(parseInt(pwLength)).fill(chars).map(function(x) { return x[Math.floor(Math.random() * x.length)] }).join('');
                document.getElementById('generated-password').value = generatePass
            } else if (pwLength < 1) {
                alert("Please Set Password Length");
            } else {
                alert("Please Check atleast 1 type of charactes to generate");
            }
            end_loader()


        })

        document.getElementById('copy_to_clipboard').addEventListener('click', function(e) {
            e.preventDefault()
            var password = document.getElementById('generated-password').value
            navigator.clipboard.writeText(password)

            var el = document.createElement("div")
            el.classList.add('px-2')
            el.classList.add('py-2')
            el.classList.add('rounded')
            el.classList.add('border')
            el.classList.add('border-info')
            el.classList.add('text-info')
            el.innerHTML = "<i class='fa fa-check'></i> Generated Password Copied to Clipboard";
            document.getElementById("msg").innerHTML = "";
            document.getElementById("msg").appendChild(el)
            el.style.display = "block"

            setTimeout(() => {
                el.remove()
            }, 2500)
        })

    })();
})