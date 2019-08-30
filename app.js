class Chat {

    constructor(selector) {
        this.chatContainer = document.querySelector('selector') || document.body
        this.user = null
        this.messages = []
        this.newMessageText = ''

        this.startListeningForAuthorization()
        this.startListeningForMessages()
        this.render()
    }

    startListeningForAuthorization() {
        firebase.auth().onAuthStateChanged(user => {
            this.user = user
            this.render()
        })
    }

    startListeningForMessages() {
        firebase.database().ref('/messages').on(
            'value',
            (snapshot) => {
                this.messages = Object.values(snapshot.val())
                this.render()
            }
        )
    }

    onLoginByGoogleClickHandler() {
        firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
    }

    newMessageHandler(event) {
        this.newMessageText = event.target.value
    }

    addMessageHandler() {
        const newMessage = {
            text: this.newMessageText,
            name: this.user.displayName,
            email: this.user.email,
            image: this.user.photoURL
        }

        firebase.database().ref('/messages').push(newMessage)
            .then(() => {
                this.newMessageText = ''
                this.render()
            })
    }

    render() {
        // removing all items
        this.chatContainer.innerHTML = ''

        // display input and button for new messages
        this.makeMessageBox()

        // adding new messages from this.messages class field
        this.messages.forEach(message => this.makeMessage(message))

        // adding margin to last message
        const lastMessage = document.querySelector('.message-container:last-of-type')
        if (lastMessage) lastMessage.style.marginBottom = '79px'

        // displaing login form when not logged in
        if (!this.user) {            
            this.makeLoginBox()
        }
    }

    makeMessage(message) {
        // create elements
        const messageContainer = document.createElement('div')
        const textContainer = document.createElement('div')
        const nameContainer = document.createElement('h5')
        const messageTextContainer = document.createElement('div')
        const todayDate = document.createElement('div')
        const image = document.createElement('img')
        const tooltip = document.createElement('span')

        // add classes
        tooltip.className = 'tooltiptext'
        messageContainer.className = 'message-container'
        textContainer.className = 'text-container'
        todayDate.className = 'todayDate'
        image.className = 'profile-image'

        // add atributes and texts
        image.setAttribute('src', message.image || `https://api.adorable.io/avatars/100/${message.email}`)
        nameContainer.innerText = message.name
        messageTextContainer.innerText = message.text
        todayDate.innerText = message.today
        tooltip.innerText = message.tooltip

        // put it all together
        textContainer.appendChild(nameContainer)
        textContainer.appendChild(messageTextContainer)
        todayDate.appendChild(tooltip)
        messageContainer.appendChild(image)
        messageContainer.appendChild(textContainer)
        messageContainer.appendChild(todayDate)
        this.chatContainer.appendChild(messageContainer)

        if (!this.user) {            
            messageContainer.className = 'display-none'
        }

    }

    addZero(i) {
        if (i < 10) {
          i = "0" + i;
        }
        return i;
      }

    sendMessage(){
        let thisDate = new Date();
        let thisDay = thisDate.getDate();

        const options = { month: 'short' };
        firebase.database().ref('/messages')
        .push({
            text: this.newMessageText,
            name: this.user.displayName,
            email: this.user.email,
            image: this.user.photoURL,
            tooltip: thisDay + " " + new Intl.DateTimeFormat('en-US', options).format(thisDate),
            today: this.addZero(thisDate.getHours()) + ":" + this.addZero(thisDate.getMinutes())
        })

    this.newMessageText = ''

    this.render()

    window.scrollTo(0, document.body.scrollHeight);
    }

    makeMessageBox() {
        // create elements
        const container = document.createElement('div')
        const input = document.createElement('input')
        const button = document.createElement('button')
        const inputGroupForButton = document.createElement('div')

        // add classes
        container.className = 'input-group'
        input.className = 'form-control'
        button.className = 'btn btn-success'
        inputGroupForButton.className = 'input-group-append'

        // add attributes and texts on button and input
        input.setAttribute('placeholder', 'Message text')
        button.innerText = 'Send message'

        

        // event listeners
        input.addEventListener(
            'input',
            (e) => {
                this.newMessageText = e.target.value
            }
        )

        input.addEventListener(
            "keydown", 
            (e) => {
                if (e.keyCode === 13) {
                    this.sendMessage();
                }
            }
        )

        button.addEventListener(
            `click`,
            () => {
                this.sendMessage();
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

        // add css classes
        container.className = 'login-box'
        header.className = 'title'
        button.className = 'btn btn-danger'

        // add texts to elements
        button.innerText = 'Login by Google!'
        header.innerHTML = 'Messenger by <a href="https://github.com/MateuszRostkowski" target="_blank">MateuszRostkowski</a>'

        // add event listeners
        button.addEventListener(
            'click',
            () => this.onLoginByGoogleClickHandler()
        )

        // put it all together
        container.appendChild(header)
        container.appendChild(button)
        this.chatContainer.appendChild(container)
    }
}

new Chat()



