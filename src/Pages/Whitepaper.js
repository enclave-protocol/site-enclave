import './Whitepaper.css'
import React, {Component} from "react"
import * as THREE from "three"

class Whitepaper extends Component {
  constructor(props) {
    super(props)

    this.content = [
      {
        id: 1,
        title: 'what is',
        text: <>
          <p>The Enclave is a privacy swaps and transactions protocol on Ethereum network.</p>
          <p>Nowadays, to anonymize cryptocurrencies, special mixers are used. Anonymization in such mixers are done by
            mixing funds of one participant with others. Thus, the connection between your transactions is erased, which
            allows you to maintain the anonymity of your funds. This method is far from being a convenient solution.</p>
          <p>The Enclave made anonymity easy, simple, fast and available for anyone. Using it you'll stay anonymous
            even while using popular DEx platforms like Uniswap and Balancer.</p>
        </>
      },
      {
        id: 2,
        title: 'problems',
        text: <>
          <p>Existing mixers have a bunch of core problems, namely:</p>
          <p>- Speed - you need quite a long time in order to be sure in a sufficient level of anonymity;</p>
          <p>- Separate service - to make your trade anonymous, you need firstly to put ETH to an existing mixed for
            several days (or even weeks), and only after get your ETH from the service and go to the swap platform;</p>
          <p>- Large transactions - when impressive funds pass through the mixer, they are still accumulated on several
            accounts during withdrawal, which opens a possibility for anyone to track the user who used the
            anonymization service;</p>
          <p>- Centralization - some mixers have centralized management, which leaves developers with the ability to
            manipulate other people's funds. So people resort to various transfers to various gaming platforms in order
            to launder their money, which can be quite risky.</p>
        </>
      },
      {
        id: 3,
        title: 'solution',
        text: <>
          <p>The Enclave provides a solution to all of the problems mentioned:</p>
          <p>- Speed - transactions are instant, there is no need to wait;</p>
          <p>- Unified service - you can do anonymous swaps on one platform, no separate mixer is needed;</p>
          <p>- Large transactions - protocol negates the risk of de-anonymization by splitting transaction into several
            small ones with the random size, it will be almost impossible to connect your txes;</p>
          <p>- Centralization - after the audit the Enclave will de renounced, so it will not be governed by anyone from
            the development team.</p>
        </>
      },
      {
        id: 4,
        title: 'zk snark',
        text: <>
          <p>The Enclave protocol is designed for private transactions on decentralized exchanges. It is based on
            zk-SNARKs - a zero-knowledge Succinct Non-interactive Argument of Knowledge. Native SNARK verification
            verifies the zk-SNARK proof with the verification key, given the public input.</p>
          <p>So that the counterparty will certainly know why you have funds, but will have no information of how many -
            just like how Visa or Mastercard do.</p>
        </>
      },
      {
        id: 5,
        title: 'privacy',
        text: <>
          <p>In addition to the above measures to ensure the safety of user funds through audit and contract renounce,
            we also take measures to ensure the anonymity of the team.</p>
          <p>Representatives of the American Financial Crimes Network (FinCen) told CoinDesk in an email that mixers
            could fall under the definition of a money transfer operator and therefore have obligations under the US
            Banking Secrecy Act (BSA). So, our goal is to minimize such risks for the pool creators.</p>
          <p>These measures, along with the ability to quickly deploy a web interface and direct operations with a
            contract, ensure maximum security of funds used within the Enclave pool.</p>
        </>
      },
      {
        id: 6,
        title: 'usability',
        text: <>
          <p>The Enclave uses its own token - ENZK - it is used as a fee for using the anonymous swaps. The level of
            fees depends on the number of withdrawal addresses used. </p>
          <p>Also, using the Enclave API to connect your own exchange to an existing pool or your own has the same
            requirements for tokens.</p>
          <p>NB: since the minting of new tokens is not available, the token has a deflationary model.</p>
        </>
      },
      {
        id: 7,
        title: 'token',
        text: <>
          <div>ENZK token is used for 2 main purposes:</div>
          <div>- Custom pools creation</div>
          <div>- Paying fees for using the service</div>
          <div>To create a new custom pool, it is mandatory to lock ENZK tokens.</div>
          <p style={{margin: '3vh 0'}}>As for the fee distribution, most of them will be assigned as rewards for miners,
            the rest will be either frozen or burned:</p>
          <div>50% - farming rewards,</div>
          <div>25% - freeze,</div>
          <div>25% - burn.</div>
          <p style={{marginTop: '3vh'}}>We decided to burn tokens in order to maintain ENZK price even on a bearish
            market, also it will allow you to remain interested in staking, which will allow one to constantly increase
            the amount of liquidity in the pools.</p>
        </>
      },
      {
        id: 8,
        title: 'roadmap',
        text: <>
          <p>The mainnet launch will occur after all tests are successfully passed and the contract security audit is
            done</p>
          <p style={{marginTop: '6vh'}}>Feb 2020 – Development Started</p>
          <p>Jan 2021 - Alpha Closed Test</p>
          <p>Apr 2021 – Public Token Sale</p>
          <p>Q2 &nbsp;2021 – Open Beta (Ropsten Testnet)</p>
          <p>Q3 &nbsp;2021 – Mainnet Launch</p>
          <p>Q3 &nbsp;2021 – Contract redeem</p>
        </>
      }
    ]

    this.state = {
      loading: false,
      sphere: false,
      currentLinkId: 1,
      height: ''
    }

    this.loadHandler = this.loadHandler.bind(this)
    this.clickHandler = this.clickHandler.bind(this)
    this.resize = this.resize.bind(this)
    this.ref = React.createRef()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.width !== undefined && prevState.width !== this.state.width) {
      this.renderSphere()
      this.updateTableHeight()
    }
  }

  componentWillUnmount() {
    this.setState({
      ...this.state,
      sphere: false
    })
    window.removeEventListener('resize', this.resize)
  }

  componentDidMount() {
    window.addEventListener('resize', this.resize)

    this.updateTableHeight()
    this.renderSphere()

    this.setState({
      ...this.state,
      sphere: true,
      width: null
    })
  }

  renderSphere() {
    const container = this.ref.current
    const canvasWidth = container.offsetWidth
    const canvasHeight = container.offsetHeight

    if (this.state.sphere) {
      container.innerHTML = ''
    }

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, canvasWidth / canvasHeight, 0.1, 1000)

    const renderer = new THREE.WebGLRenderer({alpha: true})
    renderer.setSize(canvasWidth, canvasHeight)
    renderer.setClearColor(0x000000, 0)

    container.appendChild(renderer.domElement)

    const geometry = new THREE.SphereGeometry(2, 12, 12)
    const material = new THREE.MeshBasicMaterial({
      color: 0x92ff38,
      wireframe: true,
      wireframeLinewidth: 2
    });
    const cube = new THREE.Mesh(geometry, material)
    scene.add(cube)

    camera.position.z = 5

    function render() {
      requestAnimationFrame(render)
      cube.rotation.y += 0.006
      renderer.render(scene, camera)
    }

    render()
  }

  resize() {
    const width = document.body.offsetWidth
    if (this.state.currentLinkId !== 1) {
      this.setState({
        ...this.state,
        currentLinkId: 1
      })
    }
    this.setState({
      ...this.state,
      width
    })
  }

  updateTableHeight() {
    const offsetWidth = document.body.offsetWidth
    const menu = document.getElementById('menu1')
    const table = document.getElementById('table1')

    if (offsetWidth > 1118) {
      menu.style.height = ''
      table.style.height = ''
      table.style.marginBottom = ''
      const innerHeight = document.getElementById('what is').offsetHeight
      menu.style.height = innerHeight * 1.62 + 'px'
      table.style.height = innerHeight * 1.62 + 'px'
      if (offsetWidth > 3000 && document.body.offsetHeight < 2000) {
        menu.style.height = innerHeight * 1.75 + 'px'
        table.style.height = innerHeight * 1.75 + 'px'
      }
    } else if (793 < offsetWidth < 1118) {
      menu.style.height = ''
      table.style.height = ''
      table.style.marginBottom = ''
      if (offsetWidth < 793) {
        table.style.marginBottom = 20 + 'px'
        return
      }
      const innerHeight = table.offsetHeight
      menu.style.height = innerHeight * 1.3 + 'px'
      table.style.height = innerHeight * 1.3 + 'px'
      table.style.marginBottom = 20 + 'px'
    }
  }

  loadHandler() {
    this.setState({
      ...this.state,
      loading: true
    })

    setTimeout(() => {
      this.setState({
        ...this.state,
        loading: false
      })
    }, 2500)
  }

  clickHandler(e) {
    const id = e.target.id

    this.setState(prev => ({
      ...prev,
      currentLinkId: +id
    }))
  }

  render() {
    return (
        <section className='whitepaper__wrapper-new'>
          <div className='whitepaper__menu-new' id='menu1'>
            {
              this.content.map(el => {
                return <a key={el.id} id={el.id} className={this.state.currentLinkId === el.id ? 'active' : ''}
                          onClick={this.clickHandler}>{`${el.id} - ${el.title}`}</a>
              })
            }
          </div>

          <div className={`whitepaper__content-new`} id='table1'>
            <div className='info'>
              <div className='sphere'>
                <div id="canvas" ref={this.ref}/>
              </div>
              <div className='middle'>
                <div>CONSTITUTION</div>
                <div className='enc-dashed'>
                  <span>=======</span>
                  <span>[E]</span>
                  <span>=======</span>
                </div>
              </div>

              <div className='info__footer'>
                <div>WHITEPAPER V.1.0</div>
                <div className='loading'>
                  <button
                      onClick={this.loadHandler}
                      className={`button text-uppercase ${this.state.loading ? 'd-none' : ''}`}
                  >DOWNLOAD
                  </button>
                  {
                    this.state.loading &&
                    <div className="lds-facebook">
                      <div/>
                      <div/>
                      <div/>
                      <div/>
                      <div/>
                      <div/>
                      <div/>
                      <div/>
                    </div>
                  }
                </div>
              </div>
            </div>
            <div className='text'>
              {
                this.content
                    .filter(el => el.id === this.state.currentLinkId)
                    .map(el => <div id={el.title} key={el.id}>{el.text}</div>)
              }
            </div>
          </div>

        </section>
    )
  }
}

export default Whitepaper