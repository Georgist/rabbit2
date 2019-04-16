//'use strict';

/**Optionally add Bootstrap to your project**/
//import 'bootstrap';

//import '../css/style.scss';


//// PSEUDO CODE
// DONE create basic rabbit from html (resizable size)
// DONE create keyframes sliding animation
// DONE set default position of rabbit
// DONE create JS functionality that randomly position rabbit on the edges of viewport
// DONE improve rabbit html
// DONE create bubble with text for rabbit
// DONE create close button in html
// create close button functionality that destroys rabbit and sets some value to localstorage
// DONE solve white color issue
// DONE adjust tooltip for each position
// DONE separate sliding keyframes into two
// DONE fix canvas wrapper

// BONUS:
// DONE ears slightly movings to sides
// DONE animate ears border-radius
// DONE animated eyes
// DONE typing sentence in tooltip keyframe


// RULES:
// DONE position in fixed percentage
// DONE width in fixed percentage


// JS FUNCTIONALITY STEPS
// DONE get rabbit wrapper
// DONE get canvas wrapper
// DONE create array with 4 directions
// DONE generate one of the sides in switch/case [1(left), 2(right), 3(top), 4(bottom)]
// DONE generate the other side
// DONE generate random percentage value for other side
// DONE chosen case will execute -> generate value for second position
//  						-> add appropriate class to canvas-wrapper
// DONE prevent rabbit from overflowing canvas-wrapper
// DONE correct generateRandomPercentage minus width of rabbit (from data attr)
// remove all -edge classes after the current round
// create interval

// PART OF THE GAME
// click on X close button, hides and destroys rabbit
// Want to play?
//		 					yes - hide .rabbit-play-btn and start the game
// 							no - the same as X close button, hides and destroys rabbit


// exponea logo on belly button

// fill destroy function

//(function() {
/* ============================================================================================ */
function generateSpans(element) {
    if(!element) {
        return;
    }
    var node = element.firstChild;
    while (node) {
        var next = node.nextSibling;
        if (node.nodeType===Node.TEXT_NODE) {
            convertTextNode(node, 'char');
        }
        if (node.nodeType===Node.ELEMENT_NODE) {
            if (!node.className.match(/(^| )solid($| )/)) {
                generateSpans(node, 'char');
            }
            else {
                // solid not separated text
                node.classList.add('chars');
            }
        }
        node = next;
    }

    function convertTextNode(node, className) {
        var chars = node.nodeValue.split('');
        var html = '';
        var nowrap = false;
        for(var i=0; i<chars.length; i++) {
            if (chars[i].match(/\S/)) {
                if (!nowrap) {
                    html += '<span class="nowrap">';
                    nowrap = true;
                }
                html += '<span class="'+className+'">'+chars[i]+'</span>';
            }
            else {
                if (nowrap) {
                    html += '</span>';
                    nowrap = false;
                }
                html += chars[i];
            }
        }
        if (nowrap) {
            html += '</span>';
            nowrap = false;
        }
        var container = document.createElement('div');
        container.innerHTML = html;
        while (container.firstChild) {
            node.parentNode.insertBefore(container.firstChild, node);
        }
        node.parentNode.removeChild(node);
    }
}

function rerun() {
    var chars = document.querySelectorAll('.char, .chars');
    for (var i=0; i<chars.length; i++) {
        chars[i].classList.remove('show');
    }
    setTimeout(showText, 1000);
}

function showText() {
    var interval = 20; //ms
    var chars = document.querySelectorAll('.char, .chars');
    for (var i=0; i<chars.length; i++) {
        (function(i){
            setTimeout(function(){
                chars[i].classList.add('show');
            }, i*interval);
        })(i);
    }
}

/*document.addEventListener("DOMContentLoaded", function(event) {
    var bubble = document.getElementsByClassName('bubble')[0];
    generateSpans(bubble);

    // start animation
    setTimeout(showText, 1000);
});*/

function rerun() {
    var chars = document.querySelectorAll('.char, .chars');
    for (var i=0; i<chars.length; i++) {
        chars[i].classList.remove('show');
    }
    setTimeout(showText, 300);
}
/* ============================================================================================ */


/* ============================================================================================ */
// (function(){
if (!window.BunnyMessages) {
    window.BunnyMessages = {

        init: function() {
            this.stop();
            this.interval = setInterval(this.checkURL.bind(this), 1000);
        },

        stop: function() {
            clearInterval(this.interval);
            clearTimeout(this.timeouted);
        },

        checkURL: function() {
            if (location.href!==this.lastURL) {
                this.lastURL = location.href;
                this.onChange();
            }
        },

        listeners: [],

        bind: function(handler) {
            if (typeof handler === 'function') {
                this.listeners.push( handler);
            }
        },

        timeouted: null,

        onChange: function() {
            clearTimeout(this.timeouted);
            var message = this.chooseMessage();
            if (message) {
                this.timeouted = setTimeout( this.notify.bind(this, message), message.displayAfter*1000 );
            }
        },

        notify: function(message) {
            message.lastTime = Date.now();
            for (var i=0; i<this.listeners.length; i++) {
                this.listeners[i]( message );
            }
        },

        chooseMessage: function() {
            var rand = Math.random();
            var now = Date.now();
            var messages = this.filterMessagesByURL( this.messages )
            // apply (filter by) random probability
                .filter( function(message) { return rand < message.probability; } )
                // filter out by repeat interval
                .filter( function(message) { return !message.lastTime || message.lastTime+message.repeatInterval*1000<now } );
            var count = messages.length;
            return messages[ Math.round(Math.random()*(count-1)) ];
        },

        filterMessagesByURL: function(messages) {
            var found = false,
                matched = [],
                withoutFilter = [];
            for (var i=0; i<messages.length; i++) {
                if (messages[i].url)  {
                    if (messages[i].url.test && messages[i].url.test(location.href)) {
                        matched.push(messages[i]);
                    }
                }
                else {
                    withoutFilter.push(messages[i]);
                }
            }
            // if match some URL, return only matched, else return all without URL filter
            return matched.length>0 ? matched : withoutFilter;
        },
    }
}

BunnyMessages.messages = [
    {
        html: 'Howdy! Welcome to Eggsponea!',
        url: null,
        probability: 1, // %/100
        displayAfter: 1, // sec
        repeatInterval: 1, // sec
    },
    {
        html: 'Lost? Start from the eggining.',
        url: null,
        probability: 1, // %/100
        displayAfter: 2, // sec
        repeatInterval: 50, // sec
    },
    {
        html: 'Be a hoptimist. But don\'t eggsagerate.',
        url: null,
        probability: 1, // %/100
        displayAfter: 2, // sec
        repeatInterval: 50, // sec
    },
    {
        html: 'You say import, I say eggsport.',
        url: null,
        probability: 1, // %/100
        displayAfter: 2, // sec
        repeatInterval: 50, // sec
    },
    {
        html: 'Have you tried Eggsperiments feature?',
        url: null,
        probability: 1, // %/100
        displayAfter: 2, // sec
        repeatInterval: 50, // sec
    },
    {
        html: 'Divide and rule. Use Seggmentations.',
        url: null,
        probability: 1, // %/100
        displayAfter: 2, // sec
        repeatInterval: 50, // sec
    },
    {
        html: 'They say I should eggsercise. But I just doesn’t carrot all.',
        url: null,
        probability: 1, // %/100
        displayAfter: 2, // sec
        repeatInterval: 50, // sec
    },
    {
        html: 'My family watched this Bruce Lee movie last night. In the end, every bunny was kung-fu fighting.',
        url: null,
        probability: 0.15, // %/100
        displayAfter: 50, // sec
        repeatInterval: 500, // sec
    },
    {
        html: 'I have so many easter puns it’s not even bunny.',
        url: null,
        probability: 1, // %/100
        displayAfter: 2, // sec
        repeatInterval: 50, // sec
    },
    {
        html: 'Gotye? Isn’t that just some bunny that I used to know?',
        url: null,
        probability: 1, // %/100
        displayAfter: 2, // sec
        repeatInterval: 50, // sec
    },
    {
        html: 'That fourth cup of coffee was a mistake. Now I’m all hopped up.',
        url: null,
        probability: 1, // %/100
        displayAfter: 2, // sec
        repeatInterval: 100, // sec
    },
    {
        html: 'Don’t wait for me to start the meeting. I might be a rabbit late.',
        url: null,
        probability: 1, // %/100
        displayAfter: 2, // sec
        repeatInterval: 200, // sec
    },
    {
        html: 'What did I get my girlfriend for her birthday? A 10-carrot ring. Yeah.',
        url: null,
        probability: 1, // %/100
        displayAfter: 2, // sec
        repeatInterval: 50, // sec
    },
    {
        html: 'In order to be a good leader, you need to lead by eggzample.',
        url: null,
        probability: 1, // %/100
        displayAfter: 2, // sec
        repeatInterval: 50, // sec
    },
    {
        html: 'Find and replace? Use regg eggs.',
        url: null,
        probability: 1, // %/100
        displayAfter: 2, // sec
        repeatInterval: 50, // sec
    },
    {
        html: 'How are rabbits and calculators alike? They multiply quickly.',
        url: null,
        probability: 1, // %/100
        displayAfter: 14, // sec
        repeatInterval: 35, // sec
    },
    {
        html: 'How many rabbits does it take to change a light bulb? Only one if it hops right to it.',
        url: null,
        probability: 1, // %/100
        displayAfter: 10, // sec
        repeatInterval: 150, // sec
    },
    {
        html: 'Hello CAMPAIGN',
        url: /\/campaigns\/home/,
        probability: 0.95, // %/100
        displayAfter: 5, // sec
        repeatInterval: 30, // sec
    },
    {
        html: 'Hello LOGIN',
        url: /\/login/,
        probability: 1, // %/100
        displayAfter: 2, // sec
        repeatInterval: 0, // sec
    },
];

// })();
/* ============================================================================================ */


/* ============================================================================================ */
if (!window.rabbitBehavior) {
    var rabbitBehavior = {
        allDirections: ['left', 'right', 'top', 'bottom'],
        rabbitWrapper: document.querySelector('.rabbit-wrapper'),
        canvasWrapper: document.querySelector('.rabbit-canvas-wrapper'),
        rabbitTooltipInner: document.querySelector('.rabbit-tooltip-inner'),
        closeBtn: document.querySelector('.rabbit-close-btn'),
        destroyBtn: document.querySelector('.rabbit-destroy-btn'),
        rabbitTooltipMainContent: document.querySelector('.rabbit-tooltip-main-content'),
        rabbitTooltipOptContent: document.querySelector('.rabbit-tooltip-opt-content'),
        rabbitTooltipHtml: '<p>Howdy! Welcome to Eggsponea!</p>',
        confirmYesBtn: document.querySelector('.rabbit-confirm-yes-btn'),
        confirmNoBtn: document.querySelector('.rabbit-confirm-no-btn'),
        //initRoundPassed: false,
        //initRound: true,
        afterInitRoundInterval: null,
        onBlurTimeout: null,
        intervalDuration: 15000,
        isRabbitDestroyed: 'rabbit-easter-destroyed',
        STATE_NONE: 0,
        STATE_EARS_OUT: 1,
        STATE_RABBIT_OUT: 2,
        STATE_RABBIT_SPEAKS: 3,
        state: undefined,
        timeoutRef: null,
        preventBlur: false,
        init: function() {
            this.bindEvents();
            this.start();
            //this.initRound = false;
        },

        bindEvents: function() {
            this.close();
            this.onClick();
            this.onHover();
            this.onBlur();
            this.openConfirm();
            this.confirmDestroy();
            this.confirmHide();
        },

        // TODO maybe remove this function, its used on one place
        start: function () {
            this.position();
            // starts loop
            this.stateNone(); // first round starts from 0
        },

        removeStyles: function() {
            this.canvasWrapper.classList.remove('left-edge', 'right-edge', 'top-edge', 'bottom-edge');
            this.rabbitWrapper.removeAttribute('style');
        },

        clearStates: function() {
            clearTimeout(rabbitBehavior.timeoutRef);
            clearInterval(rabbitBehavior.afterInitRoundInterval);
        },

        restart: function() {
            this.state = this.STATE_EARS_OUT;
            this.stateRabbitOut(); // second round starts from 1
        },

        position: function(position) {
            var setPosition;
            if(position) {
                setPosition = position;
            } else {
                setPosition = this.randomDirection();
            }

            switch (setPosition) {
                case this.allDirections[0]:
                    this.canvasWrapper.classList.add('left-edge');
                    this.setOppositeSide(this.allDirections[0], this.rabbitWrapper, this.generateRandomNumber(), this.getElemWidth());
                    break;
                case this.allDirections[1]:
                    this.canvasWrapper.classList.add('right-edge');
                    this.setOppositeSide(this.allDirections[1], this.rabbitWrapper, this.generateRandomNumber(), this.getElemWidth());
                    break;
                case this.allDirections[2]:
                    this.canvasWrapper.classList.add('top-edge');
                    this.setOppositeSide(this.allDirections[2], this.rabbitWrapper, this.generateRandomNumber(), this.getElemWidth());
                    break;
                case this.allDirections[3]:
                    this.canvasWrapper.classList.add('bottom-edge');
                    this.setOppositeSide(this.allDirections[3], this.rabbitWrapper, this.generateRandomNumber(), this.getElemWidth());
                    break;
            }
        },
        randomDirection: function() {
            return this.allDirections[Math.floor(Math.random()*this.allDirections.length)];
        },
        generateRandomNumber: function() {
            return Math.floor(Math.random()*100);
        },
        getElemWidth: function() {
            return getComputedStyle(this.rabbitWrapper).width;
        },
        setOppositeSide: function(direction, elem, value, elemWidth) {
            if(direction === 'top' || direction === 'bottom') {
                if(value > 50) {
                    elem.style.left = 'calc('+ value +'% - '+ elemWidth +')';
                } else {
                    elem.style.left = value + '%';
                }
            } else if(direction === 'left' || direction === 'right') {
                if(value > 50) {
                    elem.style.top = 'calc('+ value +'% - '+ elemWidth +')';
                } else {
                    elem.style.top = value + '%';
                }
            }
        },
        fillUpTooltip: function(content) {
            var setContent;
            if(content) {
                setContent = content;
            } else {
                setContent = this.rabbitTooltipHtml;
            }
            this.rabbitTooltipMainContent.innerHTML = setContent;
            generateSpans(this.rabbitTooltipMainContent);
        },

        slideToggle: function() {
            this.canvasWrapper.classList.toggle('rabbit-sliding-up');
        },
        slideFake: function(callback) {
            this.canvasWrapper.classList.add('rabbit-sliding-fake');

            if (callback && typeof(callback) === "function") {
                setTimeout(callback(), 2100);
            }
        },
        tooltipToggle: function() {
            this.canvasWrapper.classList.toggle('rabbit-show-tooltip');
        },
        earsWaveToggle: function() {
            this.canvasWrapper.classList.toggle('rabbit-waving-ears');
        },
        eyesBlinkToggle: function() {
            this.canvasWrapper.classList.toggle('rabbit-blinking');
        },
        rabbitToggle: function() {
            this.canvasWrapper.classList.toggle('rabbit-toggle');
        },
        slideRemove: function() {
            this.canvasWrapper.classList.remove('rabbit-sliding-fake');
        },
        close: function() {
            if(this.closeBtn) {
                this.closeBtn.addEventListener('click', function(){
                    if(rabbitBehavior.state === rabbitBehavior.STATE_RABBIT_SPEAKS) {
                        rabbitBehavior.preventBlur = true;
                        rabbitBehavior.stateRabbitOut();
                    }
                });
            }
        },

        destroy: function() {
            rabbitBehavior.clearStates();
            rabbitBehavior.canvasWrapper.remove();
            localStorage.setItem(rabbitBehavior.isRabbitDestroyed, 'yes');
        },

        openConfirm: function() {
            if(this.destroyBtn) {
                this.destroyBtn.addEventListener('click', function(){
                    rabbitBehavior.rabbitTooltipOptContent.classList.remove('hidden');
                    if(rabbitBehavior.state === rabbitBehavior.STATE_EARS_OUT) {
                        rabbitBehavior.clearStates();
                        rabbitBehavior.stateRabbitOut();
                    }
                });
            }
        },

        confirmDestroy: function() {
            if(this.confirmYesBtn) {
                this.confirmYesBtn.addEventListener('click', function(){
                    rabbitBehavior.destroy();
                });
            }
        },

        confirmHide: function() {
            if(this.confirmNoBtn) {
                this.confirmNoBtn.addEventListener('click', function(){
                    rabbitBehavior.rabbitTooltipOptContent.classList.add('hidden');
                });
            }
        },

        onClick: function(){
            this.rabbitWrapper.addEventListener('click', function(){
                if(rabbitBehavior.state === rabbitBehavior.STATE_EARS_OUT) {
                    //this.removeStyles();
                    //this.runAfterInitRoundInterval();

                    //this.restart();
                    rabbitBehavior.clearStates();
                    rabbitBehavior.stateRabbitOut();

                    //rabbitBehavior.stateRabbitOut();
                }
            });
        },

        onHover: function(){
            this.rabbitWrapper.addEventListener('mouseover', function(){
                if(rabbitBehavior.state === rabbitBehavior.STATE_RABBIT_SPEAKS) {
                    //clearTimeout(rabbitBehavior.timeoutRef);
                    //clearInterval(rabbitBehavior.afterInitRoundInterval);
                    clearTimeout(rabbitBehavior.onBlurTimeout);
                    rabbitBehavior.clearStates();
                }
            });
        },

        onBlur: function(){
            this.rabbitWrapper.addEventListener('mouseleave', function(){
                console.log(!rabbitBehavior.preventBlur, rabbitBehavior.state);
                if(!rabbitBehavior.preventBlur) {
                    if(rabbitBehavior.state === rabbitBehavior.STATE_RABBIT_SPEAKS) {
                        rabbitBehavior.onBlurTimeout = setTimeout(function(){
                            rabbitBehavior.stateRabbitOut();
                        }, 3000);
                    }
                }
            });
        },

        runAfterInitRoundInterval: function(duration){
            var setDuration;
            if(duration && !isNaN(duration)) {
                setDuration = duration;
            } else {
                setDuration = this.intervalDuration;
            }

            this.clearStates();
            this.afterInitRoundInterval = setInterval(function(){
                //clearTimeout(rabbitBehavior.timeoutRef);
                rabbitBehavior.removeStyles();
                rabbitBehavior.position();
                rabbitBehavior.restart();
                // rabbitBehavior.stateRabbitOut();
            }, setDuration);
        },

        /*afterInitRound: function() {
            // dont run on first round
            //if(!this.initRound){
            //if(this.initRoundPassed) {
                //clearInterval(rabbitBehavior.afterInitRoundInterval);
                // TODO setTimeout?
                this.clearStates();
                this.runAfterInitRoundInterval();
                //}
            //}
        },*/

        // STEP 0
        stateNone: function() {
            if(this.state === undefined) {
                this.timeoutRef = setTimeout(this.stateEarsOut.bind(this));
            }
            // TODO it will never get here I think
            // if(this.state === this.STATE_EARS_OUT) {
            //     this.earsWaveToggle();
            //     this.eyesBlinkToggle();
            // }

            this.state = this.STATE_NONE;
        },

        // STEP 1
        stateEarsOut: function(){
            if(this.state === this.STATE_NONE) {
                this.earsWaveToggle();
                this.eyesBlinkToggle();
                this.rabbitToggle();
                this.timeoutRef = setTimeout(this.stateRabbitOut.bind(this), 2200);
            }
            if(this.state === this.STATE_RABBIT_OUT) {
                this.slideFake(rabbitBehavior.slideToggle());
                setTimeout(this.slideRemove.bind(this), 2200);
                rabbitBehavior.preventBlur = false;
                rabbitBehavior.rabbitTooltipOptContent.classList.add('hidden');
                // only from second round
                setTimeout(function () {
                    rabbitBehavior.runAfterInitRoundInterval();
                }, 2300);
            }

            this.state = this.STATE_EARS_OUT;
        },

        // STEP 2
        stateRabbitOut: function(){
            if(this.state === this.STATE_EARS_OUT) {
                this.slideToggle();
                this.timeoutRef = setTimeout(this.stateRabbitSpeaks.bind(this), 1200);
            }
            if(this.state === this.STATE_RABBIT_SPEAKS) {
                this.tooltipToggle();
                this.timeoutRef = setTimeout(this.stateEarsOut.bind(this), 1200);
            }

            this.state = this.STATE_RABBIT_OUT;
        },

        // STEP 3
        stateRabbitSpeaks: function(){
            if(this.state === this.STATE_RABBIT_OUT) {
                this.tooltipToggle();
                //showText();
                rerun();
                this.timeoutRef = setTimeout(this.stateRabbitOut.bind(this), 6000);
            }

            this.state = this.STATE_RABBIT_SPEAKS;
        }
    }
}

//window.addEventListener('DOMContentLoaded', function() {
    // if wrapper element exists
    if(this.canvasWrapper !== null) {
        // if rabbit must be destroyed
        if(localStorage.getItem(rabbitBehavior.isRabbitDestroyed) === 'yes') {
            rabbitBehavior.canvasWrapper.remove();
        } else {
            // if first round
            /*if(this.initRound) {*/
                BunnyMessages.init();
                BunnyMessages.bind(function(message) {
                    // if message is filled out and is not empty
                    if(message && message !== "") {
                        // if rabbitBehavior object exists
                        if (window.rabbitBehavior) {
                            rabbitBehavior.fillUpTooltip(message.html);
                            rabbitBehavior.init();
                        }
                    }
                });
            // after first round
            /*} else {
                rabbitBehavior.start();
            }*/
        }
    }
//});

//})();

/* ============================================================================================ */

// SEQUENCE (15s)
// start
// DONE 1. position rabbit at 1 of the 4 positions
// DONE 2. show rabbit
// DONE 3. add UP sliding animation (eyes, ears...)
// DONE 4. show tooltip with text
// 5. (if user hover over rabbit stop everything)
// 6. after X seconds play DOWN sliding animation
// end
// 6. repeat 3 times (set value to localStorage or sessionStorage and destroy rabbit)
// end completely


// TASKS FOR TODAY
// DONE add link dont show again
// DONE separate keyframe animations (sliding-up, sliding-down, show-tooltip, eyes-blinking, ears-waving)
// DONE start setTimeout hell
// DONE parameterize rabbitBehavior init function (send tooltip text, option to send innerHtml)

// TODO -- LAST TODOS
// TODO //DONE animate text everytime bubble shows up
// TODO //DONE fix hover and blur state
// TODO //DONE add another Destory btn to completely remove rabbit forever(localstorage condition)
// TODO //DONE add drop-shadow to inner div of rabbit
// TODO //DONE fix empty bubble bug
// TODO try to improve random position of rabbit
// TODO //DONE on blur remove bubble after timeout
// TODO //DONE make more visible Close button
// TODO //DONE adjust ears for mac
// TODO (play rabbit only in active tab)
// TODO //DONE change bubble font family
// TODO //NOT revert close and destroy btn colors
// TODO //NOT autoprefixer support
// TODO //DONE fix multiple hovers/blurs
// TODO on destroy add question to bubble
// TODO fix destroy btn at the bottom of rabbits wrapper
