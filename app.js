class Chat {

    constructor(selector){
        this.chatContainer = document.querySelector('selector') || document.body
        this.user = "null"
        this.messages = [{
            text: 'Ala ma kota',
            name: 'Mateusz Rostkowski',
            email: 'mateusz.rostkowsky995@gmail.com',
            image: '',
            today: '21 jan'
        }]

        this.newMessageText = ''

        this.render()
    }

    render() {
        // removing all items
        this.chatContainer.innerHTML = ''

        // display input and button for new messages
        this.makeMessageBox()

        // adding new messages from this.message class field
        this.messages.forEach(message => this.makeMessage(message))

        // displaying login form when not logged in
        if(!this.user) this.makeLoginBox()

    }

    makeMessage(message) {
        // create elements
        const messageContainer = document.createElement('div')
        const textContainer = document.createElement('div')
        const nameContainer = document.createElement('h5')
        const messageTextContainer = document.createElement('div')
        const todayDate = document.createElement('div')
        const image = document.createElement('img')

        // add CSS
        image.style.cssText = `
            width: 100px;
            height: 100px;
            border-radius: 50%;
        `
        // messageContainer.style.cssText = `
        //     padding: 20px;
        //     border-bottom: 1px solid rgba(0,0,0, .125);
        //     display: grid;
        //     grid-template-columns: 110px 1fr 110px;
        // `
        // textContainer.style.cssText = `
        //     margin: 0 20px;
        //     align-self: center;
        //     width: 100%;
        //     max-width: 70vw;
        //     overflow-wrap: break-word;
        // `
        todayDate.style.cssText = `
            float: left;
            align-self: center;

        `


        messageContainer.className = 'message-container'
        textContainer.className = 'text-container'
        todayDate.className = 'todayDate'

        // add atributes and texts
        image.setAttribute('src', message.image || `https://api.adorable.io/avatars/100/${message.email}`)
        nameContainer.innerText = message.name
        messageTextContainer.innerText = message.text
        todayDate.innerText = message.today

        // put it all together
        textContainer.appendChild(nameContainer)
        textContainer.appendChild(messageTextContainer)
        messageContainer.appendChild(image)
        messageContainer.appendChild(textContainer)
        messageContainer.appendChild(todayDate)
        this.chatContainer.appendChild(messageContainer)

    }

    makeMessageBox() {
        // create elements
        const container = document.createElement('div')
        const input = document.createElement('input')
        const button = document.createElement('button')
        const inputGroupForButton = document.createElement('div')

        // add CSS and CSS
        container.style.cssText = `
            position: fixed;
            bottom: 0;
            padding: 20px;
            border-top: 1px solid rgba(0, 0, 0, .125)
            background-color: #fff;
        `
        container.className = 'input-group'
        input.className = 'form-control'
        button.className = 'btn btn-success'
        inputGroupForButton.className = 'input-group-append'

        // add attributes and texts on button and input
        input.setAttribute('placeholder', 'Message text')
        button.innerText = 'Send message'

        let thisDate = new Date();
        let month = thisDate.getMonth();

        let thisDay = thisDate.getDate();


        const options = { month: 'short' };
        console.log(thisDay + " " + new Intl.DateTimeFormat('en-US', options).format(thisDate));

        // event listeners
        input.addEventListener(
            'input',
            (e) => {
                this.newMessageText = e.target.value
            }
        )

        button.addEventListener(
            `click`,
            () => {
                this.messages = this.messages.concat({
                    text: this.newMessageText,
                    name: 'Mateusz Rostkowski',
                    email: 'mateusz.rostkowsky995@gmail.com',
                    image: '',
                    today: thisDay + " " + new Intl.DateTimeFormat('en-US', options).format(thisDate)
                })
                this.newMessageText = ''

                this.render()
            }
        )


        // put it all together
        inputGroupForButton.appendChild(button)
        container.appendChild(input)
        container.appendChild(inputGroupForButton)
        this.chatContainer.appendChild(container)
    }

    makeLoginBox() {
        // create elements
        const container = document.createElement('div')
        const button = document.createElement('button')
        const header = document.createElement('h1')

        // add CSS and CSS classes
        container.style.cssText = `
            position: absolute;
            top: 0;
            bottom: 0;
            width: 100%;
            height: 100%;
            background-color: #fff;
            z-index: 99;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
        `
        header.style.cssText = `
            text-align: center;
            margin: 20px;
            text-decoration: none;
            color: black;
        `
        header.className = 'title'
        button.className = 'btn btn-danger'

        // add texts to elements
        button.innerText = 'Login by Google!'
        header.innerHTML = 'Messenger by <a href="https://github.com/MateuszRostkowski" target="_blank">MateuszRostkowski</a>'

        // put it all together
        container.appendChild(header)
        container.appendChild(button)
        this.chatContainer.appendChild(container)



    }





}

new Chat()


let thisDate = new Date();
let month = thisDate.getMonth();

let thisDay = thisDate.getDate();


const options = { month: 'short' };
console.log(thisDay + " " + new Intl.DateTimeFormat('en-US', options).format(thisDate));