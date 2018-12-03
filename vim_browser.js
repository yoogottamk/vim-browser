(function() {

    let checkLoaded,
        scrollAmountVertical = 40, scrollAmountHorizontal = 20, 
        _2keyCommand = 0, _2KeyTimeout = 1000,
        activeKeys = {};

    let checkDocumentLoaded = () => {

        if(document.readyState === 'complete') {
            clearInterval(checkLoaded)
            main()
        }

    }

    checkLoaded = setInterval(checkDocumentLoaded, 100)

    let scrollLikeVim = () => {

        if(activeKeys['k'] == 1)
            window.scrollBy(0, -scrollAmountVertical)

        if(activeKeys['j'] == 1)
            window.scrollBy(0, scrollAmountVertical)

        if(activeKeys['h'] == 1)
            window.scrollBy(-scrollAmountHorizontal, 0)

        if(activeKeys['l'] == 1)
            window.scrollBy(scrollAmountHorizontal, 0)

    }

    let main = () => {

        setInterval(scrollLikeVim, 100)

        document.body.addEventListener("keydown", register)
        document.body.addEventListener("keyup", unRegister)

    }

    let register = e => {

        let key = e.key
        activeKeys[key] = 1

        if(_2keyCommand) {
            if(key == 'g')
                window.scrollBy(0, -99999999)

            _2keyCommand = 0
        } else {
            if(scrollAmountVertical < 180)
                scrollAmountVertical += 10

            if(key == 'g') {
                _2keyCommand = 1
                setTimeout(function() { _2keyCommand = 0 }, _2KeyTimeout)
            }
        }

    }

    let unRegister = e => {

        let key = e.key
        activeKeys[key] = 0

        scrollAmountVertical = 40

    }

})()
