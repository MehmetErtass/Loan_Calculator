function updateInterestRates() {
    var bank = document.getElementById('bank').value;
    var interestRates = "";

    // Güncel faiz oranlarını ayarlama
    switch (bank) {
        case "ziraat":
            interestRates = "İhtiyaç Kredisi: %20 - %25<br>Taşıt Kredisi: %18 - %23<br>Konut Kredisi: %15 - %20";
            break;
        case "halkbank":
            interestRates = "İhtiyaç Kredisi: %19 - %24<br>Taşıt Kredisi: %17 - %22<br>Konut Kredisi: %16 - %21";
            break;
        case "vakifbank":
            interestRates = "İhtiyaç Kredisi: %20 - %25<br>Taşıt Kredisi: %18 - %23<br>Konut Kredisi: %15 - %20";
            break;
        case "garanti":
            interestRates = "İhtiyaç Kredisi: %22 - %27<br>Taşıt Kredisi: %20 - %25<br>Konut Kredisi: %18 - %23";
            break;
        case "isbank":
            interestRates = "İhtiyaç Kredisi: %21 - %26<br>Taşıt Kredisi: %19 - %24<br>Konut Kredisi: %17 - %22";
            break;
        case "yapikredi":
            interestRates = "İhtiyaç Kredisi: %22 - %27<br>Taşıt Kredisi: %20 - %25<br>Konut Kredisi: %18 - %23";
            break;
        case "qnb":
            interestRates = "İhtiyaç Kredisi: %23 - %28<br>Taşıt Kredisi: %21 - %26<br>Konut Kredisi: %19 - %24";
            break;
        case "denizbank":
            interestRates = "İhtiyaç Kredisi: %21 - %26<br>Taşıt Kredisi: %19 - %24<br>Konut Kredisi: %17 - %22";
            break;
        default:
            interestRates = "Lütfen bir banka seçiniz.";
            break;
    }

    document.getElementById('ratesDisplay').innerHTML = interestRates;
}

function computeLoan() {
    var bank = document.getElementById('bank').value;
    var loanType = document.getElementById('loan_type').value;
    
    // Miktarı güncelleme
    var amountInput = document.getElementById('amount').value;
    var amount = parseFloat(amountInput.replace(/\./g, '').replace(',', '.')); 

    var months = parseInt(document.getElementById('months').value);
    var startDate = new Date(document.getElementById('startDate').value); 
    if (isNaN(amount) || amount <= 0) {
        alert("Lütfen geçerli bir kredi miktarı giriniz.");
        return;
    }

    var interestRate = 0;

    // Banka ve kredi türüne göre faiz oranları
    switch (bank) {
        case "ziraat":
            interestRate = loanType === "ihtiyac" ? 0.20 : loanType === "tasit" ? 0.18 : 0.15;
            break;
        case "halkbank":
            interestRate = loanType === "ihtiyac" ? 0.19 : loanType === "tasit" ? 0.17 : 0.16;
            break;
        case "vakifbank":
            interestRate = loanType === "ihtiyac" ? 0.20 : loanType === "tasit" ? 0.18 : 0.15;
            break;
        case "garanti":
            interestRate = loanType === "ihtiyac" ? 0.22 : loanType === "tasit" ? 0.20 : 0.18;
            break;
        case "isbank":
            interestRate = loanType === "ihtiyac" ? 0.21 : loanType === "tasit" ? 0.19 : 0.17;
            break;
        case "yapikredi":
            interestRate = loanType === "ihtiyac" ? 0.22 : loanType === "tasit" ? 0.20 : 0.18;
            break;
        case "qnb":
            interestRate = loanType === "ihtiyac" ? 0.23 : loanType === "tasit" ? 0.21 : 0.19;
            break;
        case "denizbank":
            interestRate = loanType === "ihtiyac" ? 0.21 : loanType === "tasit" ? 0.19 : 0.17;
            break;
    }

    // Aylık taksit hesaplama
    var monthlyRate = interestRate / 12;
    var payment = (amount * monthlyRate) / (1 - Math.pow((1 + monthlyRate), -months));
    payment = payment.toFixed(2);

    // Toplam ödeme hesaplama
    var totalPayment = (payment * months).toFixed(2);

    // Ödeme bilgisi
    document.getElementById('payment').innerHTML = `Aylık Taksit: ${payment} TL<br>Toplam Ödeme: ${totalPayment} TL`;

    // Ödeme tarihlerini hesaplama
    var paymentDates = '';
    const monthsNames = [
        "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
        "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
    ];

    for (let i = 0; i < months; i++) {
        var nextPaymentDate = new Date(startDate);
        nextPaymentDate.setMonth(startDate.getMonth() + i);
        paymentDates += `${i + 1}. ${monthsNames[nextPaymentDate.getMonth()]} ${nextPaymentDate.getFullYear()} | Ödenecek Tutar: ${payment} TL<br>`;
    }

    document.getElementById('paymentDetails').innerHTML = paymentDates;

    // Toplam ödeme
    document.getElementById('totalPaymentInfo').innerHTML = `Toplam Ödemeniz Gereken Tutar: ${totalPayment} TL`;
}

// Faiz oranlarını güncelle
window.onload = updateInterestRates;
