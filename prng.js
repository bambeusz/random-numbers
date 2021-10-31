class Randomizer {
    constructor() {
        this.initialized = false;
        this.handleRandomClick = this.handleRandomClick.bind(this);
        this.handleTimeoutInit = this.handleTimeoutInit.bind(this);
        console.log(this.initialized);

        setTimeout(this.handleTimeoutInit, 2000);
    }

    initialize() {
        if (this.initialized) {
            return;
        }
        console.log('init');
        document.querySelector("#random").addEventListener('click', this.handleRandomClick);
        document.querySelector("#random").disabled = false;
        this.initialized = true;
    }

    handleTimeoutInit() {
        console.log('check', this.initialized);
        if (!this.initialized) {
            this.initialize();
        }
    }

    handleRandomClick() {
        let from = document.querySelector("#random-from").value;
        let to = document.querySelector("#random-to").value;
        let result = document.querySelector("#result");

        from = parseInt(from);
        to = parseInt(to);
        if (Number.isNaN(from) || Number.isNaN(to)) {
            alert('Błąd: Musisz podać wartości liczbowe zakresu losowania.');
            return;
        }

        result.innerHTML = RandomNumberGenerator.generate(parseInt(from), parseInt(to)).toString();
    }
}

class RandomNumberGenerator {
    constructor() {
        const d = new Date();
        this.seed = 2345678901 + (d.getMilliseconds() * 0xFFFFFF) + (d.getSeconds() * 0xFFFF);
        this.A = 48271;
        this.M = 2147483647;
        this.Q = this.M / this.A;
        this.R = this.M % this.A;
        this.oneOverM = 1.0 / this.M;
    }

    static generate(min, max){
        return Math.round(max - min * new RandomNumberGenerator().next() + min);
    }

    next() {
        const hi = this.seed / this.Q;
        const lo = this.seed % this.Q;
        const test = this.A * lo - this.R * hi;
        if(test > 0){
            this.seed = test;
        } else {
            this.seed = test + this.M;
        }
        return (this.seed * this.oneOverM);
    }
}

new Randomizer().initialize();
