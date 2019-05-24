(function(){
    "use strict";

    let activeKeys = [],
        sequence = [],
        pressedKeyCount = 0,
        sequenceClearInterval,
        map = new KeyMap();

    const main = () => {
        document.body.addEventListener("keydown", register);
        document.body.addEventListener("keyup", unRegister);
    }

    const register = e => {
        let key = e.key;

        e.stopPropagation();

        if(activeKeys.indexOf(key) < 0) {
            activeKeys.push(key);
            pressedKeyCount++;
        }

        clearTimeout(sequenceClearInterval);
        sequenceClearInterval = setTimeout(() => {
            console.log("exec", sequence);

            let bind = map.getBind(sequence);
            if(bind)
                bind();

            sequence = [];
            activeKeys = [];
        }, 500);

        console.log(activeKeys, pressedKeyCount);
    }

    const unRegister = e => {
        let key = e.key;

        pressedKeyCount--;

        if(pressedKeyCount === 0) {
            sequence.push(activeKeys.join('+'));
            activeKeys = [];
        }
    }

    console.log(activeKeys, pressedKeyCount);

    main();
})();
