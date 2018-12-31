(function() {

    "use strict";

    let checkLoaded, scrollActive,
        scrollAmountVertical = 40, scrollAmountHorizontal = 20,
        _2keyCommand = 0, _2KeyTimeout = 1000,
        activeKeys = {};

    const checkDocumentLoaded = () => {

        if(document.readyState === 'complete') {
            clearInterval(checkLoaded)
            main()
        }

    }

    checkLoaded = setInterval(checkDocumentLoaded, 100)

    const scrollLikeVim = () => {

        if(activeKeys['k'] == 1)
            window.scrollBy(0, -scrollAmountVertical)

        if(activeKeys['j'] == 1)
            window.scrollBy(0, scrollAmountVertical)

        if(activeKeys['h'] == 1)
            window.scrollBy(-scrollAmountHorizontal, 0)

        if(activeKeys['l'] == 1)
            window.scrollBy(scrollAmountHorizontal, 0)

    }

    const main = () => {

        document.body.addEventListener("keydown", register)
        document.body.addEventListener("keyup", unRegister)

    }

    const isInputFieldActive = () => {

        let activeElement = document.activeElement;
        let tagName = activeElement.tagName.toLowerCase();

        if (tagName === 'textarea')
            return true

        if (tagName !== 'input')
            return false

        let inputFields = ['text', 'password', 'number', 'email', 'tel', 'url', 'search', 'date', 'datetime', 'datetime-local', 'time', 'month', 'week']

        return inputFields.indexOf(activeElemen.type) >= 0;

    }

    const isValidKey = key => {

        let implementedKeys = ['h', 'j', 'k', 'l', 'g', 'G']

        return implementedKeys.indexOf(key) >= 0

    }

    const blockSiteShortcuts = e => {

        e.cancelBubble = true
        e.stopImmediatePropagation()

    }

    const register = e => {

        if(isInputFieldActive())
            return

        let key = e.key

        if(isValidKey(key))
            blockSiteShortcuts(e)
        else
            return

        activeKeys[key] = 1

        if(key == 'G')
            window.scrollBy({ left: 0, top: 99999999, behavior: 'smooth' })

        if(_2keyCommand) {

            if(key == 'g')
                window.scrollBy({ left: 0, top: -99999999, behavior: 'smooth' })

            _2keyCommand = 0

        } else {

            if(scrollAmountVertical < 180)
                scrollAmountVertical += 10

            if(key == 'g') {
                _2keyCommand = 1
                setTimeout(() => { _2keyCommand = 0 }, _2KeyTimeout)
            }

        }

        if(!scrollActive)
            scrollActive = setInterval(scrollLikeVim, 100)

    }

    const unRegister = e => {

        let key = e.key
        activeKeys[key] = 0

        scrollAmountVertical = 40

        clearInterval(scrollActive)
        scrollActive = false

    }

})()
