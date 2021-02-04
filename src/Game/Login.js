import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import $ from "jquery"
import "./Login.css"
import {isMobile} from "react-device-detect"

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      difficulty: 5,
      lineLength: 12,
      lines: 34,
      characters: 34 * 12,
      margin: 2,
      wordsCount: 15,
      words: null,
      usedWords: null,
      secretWord: null,
      places: null,
      display: null
    }
  }

  componentDidMount() {
    this.startLogin()
    if (isMobile) document.getElementById('adminManagerMain').style.marginLeft = '0'
  }

  componentWillUnmount() {
    $('body').off()
    $(document).off().find("*").off()
  }

  async startLogin() {
    const data = await fetch('https://raw.githubusercontent.com/LawlietBlack/fallout-terminal/master/js/words.json')
    const res = await data.json()
    this.setState({
      ...this.state,
      words: res
    })

    this.setState({
      ...this.state,
      gamestate: 'landing'
    })

    $('body').on('keydown', e => this.clickHandler(e))
    $('body').click(e => this.clickHandler(e))
  }

  clickHandler(e) {
    if (e.target.id === 'return') {
      this.props.history.replace('/')
      return
    }
    if (this.state.gamestate === 'game-win') {
      if (e.keyCode !== 13 && e.type !== 'click' && e.keyCode !== 27) {
        return
      } else if (e.keyCode === 27) {
        window.location.href = "/"
        return
      } else {
        this.props.history.replace('/admin/console')
        return
      }
    }

    if ([13, 27, 37, 38, 39, 40].indexOf(e.keyCode) >= 0 || e.type === 'click') {
      e.preventDefault()
      if (e.keyCode === 27) {
        window.location.href = "/"
        return
      }
      if (this.state.gamestate !== 'playing') {
        this.initialize()
        $('.data').hover(e => this.clickHandler(e))
        return
      }
    }

    let num = this.state.number
    let previous = $('.code-line pre.data').eq(num)

    if (e.type === 'mouseenter') {
      const target = e.target
      $('.selected').removeClass('selected')

      if (target.classList.contains('word')) {
        const currentWord = e.target.classList.toString().slice(21, 21 + this.state.difficulty)
        $('.' + currentWord).addClass('selected')
        $('#selection').html("> " + currentWord)
      } else if (target.classList.contains('hack')) {
        const currentHack = e.target.classList.toString().slice(21, 21 + e.target.classList.toString().length)
        $("." + currentHack.split('').map(el => "\\" + el).join('')).addClass('selected')
        $('#selection').html("> " + currentHack)
      }

      this.setState({
        ...this.state,
        number: +target.id
      })
    }

    if (e.keyCode === 39 && num < 407) {
      if (previous.hasClass('word')) {
        let inWord = true
        while (inWord && this.state.number < 407) {
          this.setState({
            ...this.state,
            number: this.state.number + 1
          })
          const current = $('.code-line pre.data').eq(this.state.number)
          if (!current.hasClass('word')) {
            inWord = false
          }
        }

      } else if (num < 204 && (num + 1) % 12 === 0) {
        this.setState({
          ...this.state,
          number: this.state.number + 193
        })
      } else {
        this.setState({
          ...this.state,
          number: this.state.number + 1
        })
      }

    } else if (e.keyCode === 37 && num > 0) {

      if (previous.hasClass('word')) {
        let inWord = true
        while (inWord && this.state.number > 0) {
          this.setState({
            ...this.state,
            number: this.state.number - 1
          })
          const current = $('.code-line pre.data').eq(this.state.number)
          if (!current.hasClass('word')) {
            inWord = false
          }
        }

      } else if (num > 203 && (num + 1) % 12 === 1) {
        this.setState({
          ...this.state,
          number: this.state.number - 193
        })
      } else {
        this.setState({
          ...this.state,
          number: this.state.number - 1
        })
      }

    } else if (e.keyCode === 38 && num > 11) {
      this.setState({
        ...this.state,
        number: this.state.number - 12
      })

    } else if (e.keyCode === 40 && num < 396) {
      this.setState({
        ...this.state,
        number: this.state.number + 12
      })

    } else if (e.keyCode === 13 || e.type === 'click') {
      if (e.type === 'click' && !e.target.classList.contains('data')) {
        return
      }

      const selected = $('.code-line pre.data').eq(num)
      if (selected.hasClass('hack')) {
        this.hack()
      } else if (selected.hasClass('word')) {
        this.guess()
      } else {
        const _boxes = this.state.boxes
        _boxes.pop()
        this.setState({
          ...this.state,
          boxes: _boxes
        })
        this.printLine(selected.html())
        this.printLine('Error')
        if (this.state.boxes.length === 0) {
          this.printLine('Lockout')
          this.setState({
            ...this.state,
            gamestate: 'game-over'
          })
        }
      }
    }

    this.changeSelection(this.state.number)
  }

  initialize() {
    const wordset = this.state.words[this.state.difficulty]
    const secretWord = wordset[this.random(0, wordset.length - 1)]
    const words = this.getWords(secretWord)

    this.setState({
      ...this.state,
      usedWords: words
    })

    console.log(secretWord)
    const places = this.findPlaces(words, this.state.difficulty, this.state.characters, 2)
    const display = this.generateDisplay(places, this.state.difficulty, this.state.characters)
    this.setState({
      ...this.state,
      screen: this.renderScreen(display, this.state.lines, this.state.lineLength)
    })

    this.setState({
      ...this.state,
      secretWord
    })
    this.setState({
      ...this.state,
      left: this.state.screen.slice(0, 17)
    })
    this.setState({
      ...this.state,
      right: this.state.screen.slice(17, 34)
    })
    this.setState({
      ...this.state,
      boxes: [1, 2, 3, 4, 5]
    })
    this.setState({
      ...this.state,
      sidebar: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '']
    })
    this.setState({
      ...this.state,
      number: 0
    })

    setTimeout(() => {
      this.changeSelection(this.state.number)
      this.renderWords(places, this.state.difficulty)
      const _hacks = this.renderHacks(this.state.screen)
      this.setState({
        ...this.state,
        hacks: _hacks
      })
      const _triesReset = this.state.hacks[this.random(0, this.state.hacks.length - 1)]
      this.setState({
        ...this.state,
        triesReset: _triesReset
      })
      this.setIds()
    }, 200)
    this.setState({
      ...this.state,
      gamestate: 'playing'
    })
  }

  random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  changeSelection(num) {
    $('.selected').removeClass('selected')
    const selected = $('.code-line pre.data').eq(num)
    selected.addClass('selected')
    $('#selection').html("> " + selected.html())

    if (selected.hasClass('word')) {
      const currentWord = selected[0].className.slice(21, 21 + this.state.difficulty)
      $('.' + currentWord).addClass('selected')
      $('#selection').html("> " + currentWord)
    }
    if (selected.hasClass('hack')) {
      const hack = this.state.hacks.filter((h, i) => {
        return h[0] == this.state.number
      })
      for (let i = this.state.number; i <= hack[0][1]; i++) {
        $('.code-line pre.data').eq(i).addClass('selected')
        $('#selection').html("> " + hack[0][2])
      }
    }
  }

  findPlaces(words, difficulty, characters, margin) {
    const places = []
    let placed = false
    const blacklist = []
    for (let i = 0; i < words.length; i++) {
      placed = false
      while (!placed && blacklist.length < characters * 0.8) {
        const place = Math.floor(Math.random() * (characters - difficulty))
        if (blacklist.indexOf(place) < 0) {
          places.push([place, words[i]])
          placed = true
          for (let j = place - difficulty - margin; j <= place + margin + difficulty; j++) {
            blacklist.push(j)
          }
        }
      }
    }
    return places.sort(function (a, b) {
      return a[0] - b[0]
    })
  }

  generateDisplay(places, difficulty, characters) {
    places = places.slice(0)
    let display = ''
    for (let i = 0; i < characters; i++) {
      if (places.length > 0 && i === places[0][0]) {
        display += places[0][1]
        i += difficulty - 1
        places.shift()
      } else {
        display += this.randomChar()
      }
    }
    return display
  }

  randomChar() {
    const fillers = {
      '1': '(',
      '2': ')',
      '3': '<',
      '4': '>',
      '5': '{',
      '6': '}',
      '7': '[',
      '8': ']',
      '9': '=',
      '10': '_',
      '11': '-',
      '12': '.',
      '13': '/',
      '14': '$',
      '15': '@',
      '16': ';',
      '17': ':',
      '18': '"',
      '19': '%',
      '20': '^',
      '21': '&',
      '22': '|',
      '23': ',',
      '24': '*'
    }
    const random = Math.floor(Math.random() * 24 + 1)
    return fillers[random.toString()]
  }

  renderScreen(display, lines, lineLength) {
    const screen = []
    for (let i = 0; i < lines; i++) {
      screen.push(display.slice(0, lineLength))
      display = display.slice(lineLength)
    }
    return screen
  }

  renderWords(places, difficulty) {
    for (let i = 0; i < places.length; i++) {
      const position = parseInt(places[i][0])
      for (let j = position; j < position + difficulty; j++) {
        const index = $('.code-line pre.data').eq(j)
        index.addClass('word')
        index.addClass(places[i][1])
      }
    }
  }

  renderHacks(lines) {
    const openers = ['(', '[', '{', '<']
    const closers = [')', ']', '}', '>']
    const hacks = []
    let index = 0
    for (let i = 0; i < lines.length; i++) {
      for (let j = 0; j < lines[i].length; j++) {
        const letter = lines[i][j]
        if (openers.indexOf(letter) >= 0) {
          const brIndex = openers.indexOf(letter)
          const str = lines[i].slice(j)
          if (str.indexOf(closers[brIndex]) > 0) {
            const endIndex = str.indexOf(closers[brIndex])
            const snippet = str.slice(0, endIndex + 1)
            const re = /[A-Z]/g
            if (re.test(snippet)) {
            } else {
              hacks.push([index, index + endIndex, snippet])
              $('.code-line pre.data').eq(index).addClass(`hack ${snippet}`)
            }
          }
        }
        index += 1
      }
    }
    return hacks
  }

  printLine(line) {
    const _sidebar = this.state.sidebar
    _sidebar.shift()
    _sidebar.push(line)
    this.setState({
      ...this.state,
      sidebar: _sidebar
    })
  }

  hack() {
    let hackIndex
    const hack = this.state.hacks.filter((h, i) => {
      if (h[0] == this.state.number) {
        hackIndex = i
        return true
      }
      return false
    })
    this.printLine(hack[0][2])
    if (this.state.triesReset[0] === this.state.number) {
      const _boxes = this.state.boxes
      _boxes.push(this.state.boxes.length)
      this.setState({
        ...this.state,
        boxes: _boxes
      })
      this.printLine('Tries Reset.')
    } else {
      this.removeBadWord()
      this.printLine('Dud Removed.')
    }
    const _hacks = this.state.hacks
    _hacks.splice(hackIndex, 1)
    this.setState({
      ...this.state,
      hacks: _hacks
    })
    $('.code-line pre.data').eq(this.state.number).removeClass('hack')
  }

  removeBadWord() {
    const stateWords = this.state.usedWords
    const badWords = stateWords.slice(0, stateWords.indexOf(this.state.secretWord)).concat(stateWords.slice(stateWords.indexOf(this.state.secretWord) + 1))
    const removedWord = badWords[this.random(0, badWords.length - 1)]
    const _words = this.state.usedWords
    _words.splice(this.state.usedWords.indexOf(removedWord), 1)
    this.setState({
      ...this.state,
      usedWords: _words
    })
    $("." + removedWord).addClass('dud').removeClass('word').removeClass(removedWord).html(".")
  }

  getLikeness(word, secretWord) {
    let likeness = 0
    for (let i = 0; i < word.length; i++) {
      if (word[i] === secretWord[i]) {
        likeness++
      }
    }
    return likeness
  }

  guess() {
    const selected = $('.code-line pre.data').eq(this.state.number)
    const currentWord = selected[0].className.slice(21, 21 + this.state.difficulty)
    if (currentWord === this.state.secretWord) {
      this.printLine("Password Accepted.")
      this.setState({
        ...this.state,
        gamestate: 'game-win'
      })
    } else {
      const _boxes = this.state.boxes
      _boxes.pop()
      this.setState({
        ...this.state,
        boxes: _boxes
      })
      if (this.state.boxes.length === 0) {
        this.printLine('Lockout')
        this.setState({
          ...this.state,
          gamestate: 'game-over'
        })
      } else {
        this.printLine(currentWord)
        this.printLine("Entry denied.")
        this.printLine("Likeness = " + this.getLikeness(currentWord, this.state.secretWord))
      }
    }
  }

  getWords(secretWord) {
    let word, likeness
    let wordset = this.state.words[this.state.difficulty]
    const words = [secretWord]
    for (let i = 0; i < this.state.wordsCount; i++) {
      let count = 0
      do {
        word = wordset[this.random(0, wordset.length - 1)]
        likeness = this.getLikeness(word, secretWord)
        count++
        if (words.indexOf(word) < 0 && count > 100) {
          break
        } else if (words.indexOf(word) < 0 && count > 50 && likeness > 1) {
          break
        }
      } while (words.indexOf(word) >= 0 || likeness < 3)
      words.push(word)
    }
    return words
  }

  setIds() {
    const elems = $('.code-line pre.data')
    if (elems) {
      for (let i = 0; i < elems.length; i++) {
        elems[i].setAttribute('id', i)
      }
    }
  }

  render() {
    if (isMobile) {
      return (
          <div className="mobile-restrict-overlay">
            <div className="mobile-restrict-description text-uppercase text-center">
              <p>Vacuum tubes not found!</p>
              <p>Please use a Vacuum tube BASED computer at your base!</p>
              <a className="button" id='return' href="/">Return</a>
            </div>
            <img
                src={process.env.PUBLIC_URL + "/img/console-mobile.svg"}
                alt="Mobile Restricted"
                className="mobile-restricted-image"
            />
          </div>
      )
    }

    return (
        <>
          <section className="d-none-max-768">
            <div id="terminal">
              <div className="landing-view">
                {
                  this.state.gamestate === 'landing' && (
                      <div id="terminal-head">
                        <pre>ENCLAVE PROTOCOL</pre>
                        <br/>
                        <pre>Welcome to Terminal</pre>
                        <pre>Press <span className='keyboard-btn'>ENTER</span> to start</pre>
                      </div>
                  )
                }
              </div>
              <div className="playing-view">
                {
                  this.state.gamestate === 'playing' && (
                      <>
                        <div id="terminal-head">
                          <pre>ENCLAVE PROTOCOL</pre>
                          <pre>!!! WARNING: LOCKOUT IMMINENT !!!</pre>
                          <pre>ATTEMPTS REMAINING:
                            {
                              this.state.boxes.map((_, index) => {
                                return <i key={index}> ■</i>
                              })
                            }
                        </pre>
                        </div>
                        <div className="terminal-content">
                          <div id="terminal-screen">
                            <div id="terminal-left">
                              {
                                this.state.left.map((el, index) => {
                                  const res = (
                                      el.split('').map((item, i) => {
                                        return (
                                            <pre key={i + item} className="data ng-binding">{item}</pre>
                                        )
                                      })
                                  )
                                  return (
                                      <span key={index} className="code-line">
                                    <pre className="byte">0xF000 </pre>
                                        {res}
                                        <br/>
                                  </span>
                                  )
                                })
                              }
                            </div>
                            <div id="terminal-right">
                              {
                                this.state.right.map((el, index) => {
                                  const res = (
                                      el.split('').map((item, i) => {
                                        return (
                                            <pre key={item + i} className="data ng-binding">{item}</pre>
                                        )
                                      })
                                  )
                                  return (
                                      <span key={index} className="code-line">
                                    <pre className="byte">0xF000 </pre>
                                        {res}
                                        <br/>
                                  </span>
                                  )
                                })
                              }
                            </div>
                          </div>
                          <div id="terminal-sidebar">
                            <div id="terminal-history">
                              {
                                this.state.sidebar.map((el, index) => {
                                  if (!el) return <pre key={el + index + el}> </pre>
                                  return (
                                      <pre key={el + index + el} className="ng-binding ng-scope">
                                    <span className="cursor">></span>&nbsp;<span
                                          dangerouslySetInnerHTML={{__html: el}}/>
                                  </pre>
                                  )
                                })
                              }
                            </div>
                            <pre id="selection">></pre>
                          </div>
                        </div>
                      </>
                  )
                }
              </div>
              <div className="game-over-view">
                {
                  this.state.gamestate === 'game-over' && (
                      <div id="terminal-head">
                        <pre>ENCLAVE PROTOCOL</pre>
                        <br/>
                        <pre>Lockout.</pre>
                        <pre>Press <span className='keyboard-btn'>ENTER</span> to play again</pre>
                      </div>
                  )
                }
              </div>
              <div className="game-win-view">
                {
                  this.state.gamestate === 'game-win' && (
                      <div id="terminal-head">
                        <pre>ENCLAVE PROTOCOL</pre>
                        <br/>
                        <pre>Password Accepted.</pre>
                        <pre>Press <span className='keyboard-btn'>ENTER</span></pre>
                      </div>
                  )
                }
              </div>
            </div>
          </section>
        </>
    )
  }
}

export default withRouter(Login)