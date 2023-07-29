let bills = document.querySelectorAll("img[src$='rub.jpg']");
let bill_acc = document.querySelector("img[src$='bill_acc.png']");
for (bill of bills) {
    bill.onmousedown = function (e) {
        bill = e.currentTarget;
        bill.style.position = 'absolute';
        bill.style.zIndex = 1000;
        bill.style.transform = "rotate(90deg)";
        function moveAt(event) {
            let x = event.clientX - 148;
            let y = event.clientY - 70;
            bill.style.top = y + "px";
            bill.style.left = x + "px";
        }
        document.addEventListener('mousemove', moveAt);

        bill.onmouseup = function () {
            document.removeEventListener('mousemove', moveAt);
            bill.style.zIndex = 1;
            let bill_top = bill.getBoundingClientRect().top;
            let bill_left = bill.getBoundingClientRect().left;
            let bill_right = bill.getBoundingClientRect().right;

            let bill_acc_top = bill_acc.getBoundingClientRect().top;
            let bill_acc_left = bill_acc.getBoundingClientRect().left;
            let bill_acc_right = bill_acc.getBoundingClientRect().right;
            let bill_acc_bottom = bill_acc.getBoundingClientRect().bottom - (bill_acc.getBoundingClientRect().height / 3) * 2;

            if (bill_top > bill_acc_top && bill_left > bill_acc_left && bill_right < bill_acc_right && bill_top < bill_acc_bottom) {
                bill.hidden = true;
                money.value = +money.value + +bill.dataset.billValue;
                balance.innerHTML = `<i class="fas fa-coins"></i> Баланс: ${money.value} руб.`;
            }
        }
    }
    bill.ondragstart = function () {
        return false;
    };
}

function getCoffee(price, name) {
    if (money.value >= price) {
        money.value -= price;
        balance.innerHTML = `<i class="fas fa-coins"></i> Баланс: ${money.value} руб.`;
        startProgressBar(name);

    } else
        displayInfo.innerHTML = "<i class='fas fa-frown'></i> Нет денег - нет кофе";
}


function getChange(num) {
    let coin;
    while (num != 0) {
        let top = getRandom(0, changeBox.getBoundingClientRect().height - 80);
        let left = getRandom(0, changeBox.getBoundingClientRect().width - 80);
        if (num >= 10) {
            coin = 10;
            num = num - coin;
        }
        else if (num >= 5 && num < 10) {
            coin = 5;
            num = num - coin;
        }
        else if (num >= 2 && num < 5) {
            coin = 2;
            num = num - coin;
        }
        else if (num == 1) {
            coin = 1;
            num = num - coin;
        }
        changeBox.innerHTML += `<img style="top:${top}px; left:${left}px;" src="img/${coin}rub.png" onclick="hidden = true">`;
    }
    money.value = 0;
    console.log("Баланс: " + money.value);
    balance.innerHTML = `<i class="fas fa-coins"></i> Баланс: 0 руб.`;
}

let coins = document.querySelectorAll("img[src$='rub.png']");
for (coin of coins) {
    coin.click = function (hide) {
        this.hidden = true;
    }
}

function startProgressBar(coffeeName) {
    let i = 0;
    let progressBar = document.querySelector(".progress-bar");
    progressBar.parentElement.hidden = false;
    displayInfo.innerHTML = `<i class="fas fa-hourglass-start fa-lg"></i> Кофе ${coffeeName} готовится...`;
    function progress() {
        i++;
        progressBar.style.width = i + "%";
        if (i === 100) {
            clearInterval(timerId);
            progressBar.parentElement.hidden = true;
            progressBar.style.width = "0%";
            displayInfo.innerHTML = "<i class='fas fa-mug-hot'></i> " + coffeeName + " готов";
        } else if (i == 45) {
            displayInfo.innerHTML = `<i class="fas fa-hourglass-half fa-lg"></i> Кофе ${coffeeName} готовится...`;
        } else if (i == 90) {
            displayInfo.innerHTML = `<i class="fas fa-hourglass-end fa-lg"></i> Кофе ${coffeeName} готовится...`;
        }
    }
    let timerId = setInterval(progress, 100);
}

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
} 
