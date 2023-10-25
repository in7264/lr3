document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("encrypt").addEventListener("click", function () {
        var message = document.getElementById("message").value;
        var e = parseInt(document.getElementById("e").value);
        var n = parseInt(document.getElementById("n").value);

        var messages = message.split(" ");
        var encryptedMessages = [];
        for (var i = 0; i < messages.length; i++) {
            var m = parseInt(messages[i]);
            var c = numberCalculation(m, n, e);
            encryptedMessages.push(c);
        }

        document.getElementById("encryptedMessages").textContent = encryptedMessages.join(" ");
    });

    document.getElementById("decrypt").addEventListener("click", function () {
        var encryptedMessage = document.getElementById("encryptedMessage").value;
        var d = parseInt(document.getElementById("d").value);
        var n = parseInt(document.getElementById("nDecryption").value);

        var encryptedMessages = encryptedMessage.split(" ");
        var decryptedMessages = [];
        for (var i = 0; i < encryptedMessages.length; i++) {
            var c = parseInt(encryptedMessages[i]);
            var m = numberCalculation(c, n, d);
            decryptedMessages.push(m);
        }

        document.getElementById("decryptedMessages").textContent = decryptedMessages.join(" ");
    });

    function numberCalculation(m, n, e) {
        var temp = m;
        for (var i = 1; i < e; i++) {
            temp *= m;
            if (temp > n) {
                temp %= n;
            }
        }
        return temp;
    }


    function generatePrivateKey(p, q, e) {
        var n = p * q;
        var phi = (p - 1) * (q - 1);

        // Найдем приватную экспоненту d, которая обратно к e по модулю phi
        var d = modInverse(e, phi);

        return {
            n: n, // модуль
            e: e, // открытая экспонента
            d: d, // приватная экспонента
            p: p, // простое число p
            q: q  // простое число q
        };
    }

    function modInverse(a, m) {
        for (var x = 1; x < m; x++) {
            if ((a * x) % m === 1) {
                return x;
            }
        }
        return null; // Если обратная экспонента не найдена
    }

    document.getElementById("generateKey").addEventListener("click", function () {
        var p = parseInt(document.getElementById("p").value);
        var q = parseInt(document.getElementById("q").value);
        var e = parseInt(document.getElementById("e").value);

        var privateKey = generatePrivateKey(p, q, e);

        document.getElementById("nValue").textContent = privateKey.n;
        document.getElementById("publicExponent").textContent = privateKey.e;
        document.getElementById("privateExponent").textContent = privateKey.d;
        document.getElementById("pValue").textContent = privateKey.p;
        document.getElementById("qValue").textContent = privateKey.q;
    });
});