import './styles.css';
import {h, Component} from 'preact';
import {div, img, video} from "./hyperscript";

function overlay({gameStarted, gameEnded, result, resolveTranslation}) {
    const showSplashScreen = !gameStarted && !gameEnded;
    const showResults = gameEnded;

    let content;
    if (showSplashScreen) {
        content = initialSplashScreen({resolveTranslation});
    } else if (showResults) {
        content = results({result});
    } else {
        return div({className: 'overlay overlay--hidden'});
    }

    return div({className: 'overlay'}, content);
}

function resultSuccess() {
    const successVideoSources = [
        'https://s3.eu-central-1.amazonaws.com/rb3ca-static-files/rb3/hackit-404/davis-win.mp4'
    ];
    const selectedGif = successVideoSources[Math.floor(Math.random() * successVideoSources.length)];

    return div({className: 'results'},
        video({className: 'results__video', src: selectedGif, autoplay: true, loop: true}),
        div({className: 'results__message'}, 'Nicely done!')
    );
}

function resultFail() {
    const failVideoSources = ['https://s3.eu-central-1.amazonaws.com/rb3ca-static-files/rb3/hackit-404/fail.mp4'];
    const selectedGif = failVideoSources[Math.floor(Math.random() * failVideoSources.length)];

    return div({className: 'results'},
        video({className: 'results__video', src: selectedGif, autoplay: true, loop: true}),
        div({className: 'results__message'}, 'Wanna try again?')
    );
}

function results({show, result}) {
    if (result === 2) {
        return resultSuccess({show});
    } else {
        return resultFail({show});
    }
}

function initialSplashScreen({resolveTranslation}) {
    const message = resolveTranslation('not-found-splash-screen-message', "Gibt's ned, geht ned.");

    return div({className: 'splash-screen'},
        img({className: 'splash-screen__image', src: 'https://s3.eu-central-1.amazonaws.com/rb3ca-static-files/rb3/hackit-404/splash.png'}),
        div({className: 'splash-screen__message'}, message)
    );
}

class Row extends Component {
    constructor(props) {
        super(props);

        this.state = {value: 0};

        this.counterIntervalFunction = this.counterIntervalFunction.bind(this);
        this.clearCounterInterval = this.clearCounterInterval.bind(this);
    }

    counterIntervalFunction() {
        if (this.props.isRunning && this.props.direction === 'ltr') {
            const value = this.state.value < 2 ? this.state.value + 1 : 0;

            this.setState({value}, () => this.props.setRotatingValue(this.props.index, this.state.value));
        } else if (this.props.isRunning && this.props.direction === 'rtl') {
            const value = this.state.value > 0 ? this.state.value - 1 : 2;

            this.setState({value}, () => this.props.setRotatingValue(this.props.index, this.state.value));
        } else {
            this.clearCounterInterval();
        }
    }

    clearCounterInterval() {
        clearInterval(this.state.interval);
    }

    componentWillMount() {
        const interval = setInterval(this.counterIntervalFunction, this.props.speed);

        this.setState({interval});
    }

    componentWillUnmount() {
        this.clearCounterInterval();
    }

    render() {
        const activeRowIndex = this.props.data.activeRowIndex;
        const activeClass = this.props.index === activeRowIndex ? 'active' : '';
        const animationName = this.props.direction + '-transition-' + this.state.value;
        const style = {
            animationName,
            animationDuration: this.props.speed + 'ms'
        };

        return div({className: 'slot-machine-row ' + activeClass},
            div({className: 'slot-machine-row-columns', style},
                div({className: 'slot-machine-row-column'}),
                div({className: 'slot-machine-row-column'}),
                div({className: 'slot-machine-row-column'})
            )
        );
    }
}

class NotFoundPanelView extends Component {
    constructor() {
        super();

        this.state = {
            slotMachineStarted: false,
            showResults: false,
            rows: [
                {
                    name: 'top',
                    index: 0,
                    value: 0,
                    endValue: 0,
                    speed: 20000,
                    isRunning: true,
                    key: Math.random(),
                    direction: 'ltr'
                },
                {
                    name: 'center',
                    value: 0,
                    index: 1,
                    endValue: 0,
                    speed: 30000,
                    isRunning: true,
                    key: Math.random(),
                    direction: 'rtl'
                },
                {
                    name: 'bottom',
                    value: 0,
                    index: 2,
                    endValue: 0,
                    speed: 40000,
                    isRunning: true,
                    key: Math.random(),
                    direction: 'ltr'
                }
            ],
            result: null,
            activeRowIndex: 0
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleSpacePress = this.handleSpacePress.bind(this);
        this.updateActiveRow = this.updateActiveRow.bind(this);
        this.setEndValue = this.setEndValue.bind(this);
        this.setRotatingValue = this.setRotatingValue.bind(this);
        this.cancelInterval = this.cancelInterval.bind(this);
        this.resetSlotMachine = this.resetSlotMachine.bind(this);
        this.determineResult = this.determineResult.bind(this);
        this.startSlotMachine = this.startSlotMachine.bind(this);

        document.body.addEventListener('touchstart', this.handleSpacePress.bind(this));
        window.addEventListener('keypress', this.handleSpacePress.bind(this));
    }

    handleClick() {
        const index = this.state.activeRowIndex;
        if (index < this.state.rows.length) {
            this.cancelInterval(index);
            this.setEndValue(index, this.state.rows[index].value);
            this.determineResult();
        }
        this.updateActiveRow();
    }

    handleSpacePress() {
        if (this.state.slotMachineStarted) {
            this.handleClick();
        } else {
            this.startSlotMachine();
        }
    }

    updateActiveRow() {
        if (this.state.activeRowIndex < this.state.rows.length) {
            const index = this.state.activeRowIndex + 1;
            this.setState({activeRowIndex: index});
        } else {
            this.resetSlotMachine();
        }
    }

    determineResult() {
        const endValues = this.state.rows.map(function (row) {
            return row.endValue;
        });

        let result = null;
        endValues.forEach(function (value, index) {
            if (endValues[index] !== endValues[0]) {
                result = 1;
            } else {
                result = 2;
            }
        });

        if (this.state.result !== result) {
            this.setState({result: result});
        }
    }

    setRotatingValue(index, value) {
        const rows = this.state.rows;
        const row = rows[index];
        row.value = value;
        rows[index] = row;

        this.setState({rows});
    }

    setEndValue(index, value) {
        const rows = this.state.rows;
        const row = rows[index];
        row.endValue = value;
        rows[index] = row;

        this.setState({rows});
    }

    cancelInterval(index) {
        const rows = this.state.rows;
        const row = rows[index];
        row.isRunning = false;
        rows[index] = row;

        this.setState({rows});
    }

    startSlotMachine() {
        const rows = this.state.rows;

        rows[0].speed = 900;
        rows[0].direction = 'rtl';
        rows[1].speed = 700;
        rows[0].direction = 'ltr';
        rows[2].speed = 800;
        rows[0].direction = 'rtl';

        this.setState({rows, slotMachineStarted: true}, () => this.resetSlotMachine());
    }

    resetSlotMachine() {
        const rows = this.state.rows.map(row => {
            row.key = Math.random();
            row.isRunning = true;
            return row;
        });

        this.setState({rows, activeRowIndex: 0, result: null});
    }

    componentWillUnmount() {
        document.body.removeEventListener('touchstart', this.handleClick.bind(this));
        window.removeEventListener('keypress', this.handleClick.bind(this));
    }

    render({resolveTranslation}, {rows, key, result, slotMachineStarted, activeRowIndex}) {
        const updatedRows = rows.map(row => {
            return h(Row, {
                name: row.name,
                index: row.index,
                data: this.state,
                setEndValue: this.setEndValue,
                setRotatingValue: this.setRotatingValue,
                isRunning: row.isRunning,
                speed: row.speed,
                key: row.key,
                direction: row.direction
            });
        }, this);

        const gameEnded = result && activeRowIndex === 3;

        const className = slotMachineStarted && !gameEnded ? 'slot-machine slot-machine--playing' : 'slot-machine';
        return div({className: 'not-found-panel', key: this.state.key},
            overlay({gameStarted: slotMachineStarted, gameEnded, result, resolveTranslation}),
            div({className}, div({className: 'rows'}, updatedRows))
        );
    }
}

export default function notFoundPanelView(props) {
    return h(NotFoundPanelView, props);
}
