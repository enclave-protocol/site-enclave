import React, { Component } from "react";
import "./Console.css";
import autosizeInput from "autosize-input";
import Asteroids from "../Game/Asteroids";
import { appendConsole } from '../Util/Util';

class Console extends Component {
  constructor(props) {
    super(props);
    this.gameStatus = this.gameStatus.bind(this);
    this.startGame = this.startGame.bind(this);
    this.stopGame = this.stopGame.bind(this);
    this.prevCommand = "";
    this.nextCommand = "";
    this.currentCommand = "";
    this.commandsArray = [];
    this.comandsScrollCounter = 0;
    this.keydownFunction = this.keydownFunction.bind(this);
    this.screenWidth = window.screen.width;
    this.state = { gameStatus: false, gameRestarded: false };
  }

  gameStatus(status) {
    if (status.toLowerCase() === "restart") {
      this.stopGame();
    }
  }

  startGame() {
    this.setState(state => {
      return {
        ...state,
        gameStatus: true
      };
    });
    document.getElementById("contentArea").classList.add("d-none");
    document.getElementById("consoleForm").classList.add("d-none");
  }

  stopGame() {
    this.setState(state => {
      return {
        ...state,
        gameStatus: false
      };
    });
    document.getElementById("contentArea").classList.remove("d-none");
    document.getElementById("consoleForm").classList.remove("d-none");
    document.getElementById("consoleInput").focus();
  }

  keydownFunction(event) {
    if (event.keyCode === 27 && this.state.gameStatus) {
      this.stopGame();
    }
    if (event.keyCode === 32 && this.state.gameStatus) {
      event.preventDefault();
    }
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.keydownFunction, false);
    this.forceUpdate();
  }

  componentDidMount() {
    document.addEventListener("keydown", this.keydownFunction, false);
    if (document.getElementById("consoleInput")) {
      autosizeInput(document.querySelector("#consoleInput"));
    }

    let menu = document.getElementById("menu");
    if (menu) {
      menu.querySelectorAll("a").forEach((item) => {
        item.addEventListener("click", (e) => {
          switchPage("click", item);
        });
      });
    }

    const consoleInput = document.getElementById("consoleInput");
    const contentArea = document.getElementById("contentArea");
    const consoleHistory = document.getElementById("consoleHistory");
    const consoleForm = document.getElementById("consoleForm");
    const self = this;
    consoleInput.focus();

    function uploadContent(content, page, item) {
      self.setState({ currentPage: page });
      contentArea.innerText = "Content Area " + page;
      if (item) {
        self.setState({
          currentPage: document.getElementById(item.id).innerText,
        });
        self.currentPageIndex = item.id;
      }
    }

    function switchPage(direction, item) {
      if (direction === "forward") {
        let lastPage = false;
        if (self.currentPageIndex === self.lastPageIndex) {
          self.currentPageIndex = self.firstPageIndex;
          document
            .getElementById(self.currentPageIndex)
            .classList.add("active");
          lastPage = true;
        }
        if (!lastPage) {
          let currentPageSubstring = self.currentPageIndex.split("_");
          let nextPageIndex =
            currentPageSubstring[0] +
            "_" +
            (parseInt(currentPageSubstring[1]) + 1);
          document.getElementById(nextPageIndex).classList.add("active");
          self.currentPageIndex = nextPageIndex;
        }
      }

      if (direction === "backward") {
        let firstPage = false;
        if (self.currentPageIndex === self.firstPageIndex) {
          self.currentPageIndex = self.lastPageIndex;
          document
            .getElementById(self.currentPageIndex)
            .classList.add("active");
          firstPage = true;
        }
        if (!firstPage) {
          let currentPageSubstring = self.currentPageIndex.split("_");
          let prevPageIndex =
            currentPageSubstring[0] +
            "_" +
            (parseInt(currentPageSubstring[1]) - 1);
          document.getElementById(prevPageIndex).classList.add("active");
          self.currentPageIndex = prevPageIndex;
        }
      }

      if (direction === "click") {
        self.currentPageIndex = item.id;
        document.getElementById(item.id).classList.add("active");
      }
    }

    const allCommands = [
      ["/help - Show commands"],
      ["/back - Redirect to main page"],
      ["/ls or /list - List all pages on the website"],
      ["/cd [loc] - Navigate to location"],
      ["/game - A game"],
      ["/special"],
      ["/warneverchanges"],
      ["/dieallcommies"],
      ["/powerarmor"],
      ["/fun"],
      ["/allyourbasearebelongtous"],
      ["/nukethemall"],
      ["/whatisyourname"],
    ];
    const allPages = [
      ["index"],
      ["main"],
      ["doctrine"],
      ["token"],
      ["app"],
    ];
    let moronPlayed = false;
    const years510 = new Audio(
      process.env.PUBLIC_URL + "/sounds/510_years.mp3"
    );
    const tooManyGhouls = new Audio(
      process.env.PUBLIC_URL + "/sounds/too_many_ghouls.mp3"
    );
    const deathclawsicoming = new Audio(
      process.env.PUBLIC_URL + "/sounds/funds_are_safu.mp3"
    );
    const strangelove = new Audio(
      process.env.PUBLIC_URL + "/sounds/love_that_bomb.mp3"
    );
    const whatisyourname = new Audio(
      process.env.PUBLIC_URL + "/sounds/name.mp3"
    );
    const moron = new Audio(
      process.env.PUBLIC_URL + "/sounds/moron.mp3"
    );
    years510.preload = "none";
    tooManyGhouls.preload = "none";
    deathclawsicoming.preload = "none";
    strangelove.preload = "none";
    whatisyourname.preload = "none";
    moron.preload = "none";
    const allyourbasearebelongtous = [
      "Loading operation...",
      "Transferring your Metamask balance to Enclave...",
      "Operation successful. Thank you for the donation. Long live the Enclave!",
    ];
    const fundsaresafu = ["Funds are safu!"];
    const strangeloveArray = [
      "10",
      "9",
      "8",
      "7",
      "6",
      "5",
      "4",
      "3",
      "2",
      "1",
      "Zero",
      "Whoopee!",
    ];
    const nukethemall = [
      "Countdown started",
      "10",
      "9",
      "8",
      "7",
      "6",
      "5",
      "4",
      "3",
      "2",
      "1",
    ];
    const nukethemallArray = [
      `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;............`,
      `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;..::::::::::::::::::..`,
      `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;..:::::''&nbsp;&nbsp;&nbsp;&nbsp;.....&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'':::::..`,
      `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.::'''&nbsp;....:::::::::::::....&nbsp;&nbsp;'''::.`,
      `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.::'&nbsp;&nbsp;&nbsp;.:::::::::::::::::::::::.&nbsp;&nbsp;&nbsp;&nbsp;'::.`,
      `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;::&nbsp;&nbsp;&nbsp;&nbsp;.:::::::::::::::::::::::::::.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;::`,
      `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;::&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:::::::::::::::::::::::::::::&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;::`,
      `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;::&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:::'&nbsp;&nbsp;&nbsp;&nbsp;':::::::::'&nbsp;&nbsp;&nbsp;&nbsp;':::&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;::`,
      `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;':::::'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:.`,
      `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;::&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...:::::::::::::::...&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;::`,
      `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'''''':::::'''''&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:.`,
      `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;::&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:::::&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;::`,
      `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:::::&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:.`,
      `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;::&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:::::&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;::`,
      `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.::::..&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:::::&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;..::::.`,
      `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;::.o.':::..&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.:&nbsp;&nbsp;:::::&nbsp;&nbsp;:.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;..::::'.o.::`,
      `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;::&nbsp;HHHboo.'::::..&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;::::&nbsp;:::&nbsp;::::&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;..:::'.oodHHH&nbsp;::`,
      `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;::&nbsp;dHHHHHHHboo.'::::.&nbsp;&nbsp;&nbsp;&nbsp;':::::::::'&nbsp;&nbsp;&nbsp;&nbsp;..:::'.oodHHHHHHHb&nbsp;::`,
      `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;dHHHHHHHHHHHHboo.':::.&nbsp;..&nbsp;':::'&nbsp;..&nbsp;.:::'.oodHHHHHHHHHHHHb&nbsp;:`,
      `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;::&nbsp;HHHHHHHHH'OOOO'HHboo.&nbsp;&nbsp;&nbsp;'::...::'&nbsp;&nbsp;&nbsp;.oodHH'OOOO'HHHHHHHHH&nbsp;::`,
      `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;dHHHHHHH'OOOOOOOO'HHHHboo.&nbsp;':::'&nbsp;.oodHHHH'OOOOOOOO'HHHHHHHb&nbsp;:`,
      `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;::&nbsp;HHHHHHH'OOOOOOOOOO'HHHHHHH&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;HHHHHHH'OOOOOOOOOO'HHHHHHH&nbsp;::`,
      `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;dHHHHHHHHHHHH||HHHHHHHHHHH'.dHHHb.'HHHHHHHHHHH||HHHHHHHHHHHHb&nbsp;:`,
      `&nbsp;&nbsp;&nbsp;&nbsp;::&nbsp;HHHHHHHHHHH--++--HHHHHHHHH&nbsp;HHHHHHH&nbsp;HHHHHHHHH--++--HHHHHHHHHHH&nbsp;::`,
      `&nbsp;&nbsp;&nbsp;&nbsp;::&nbsp;HHHHHHHHHHHHH||HHHHHHHHHHH&nbsp;HHHHHHH&nbsp;HHHHHHHHHHH||HHHHHHHHHHHHH&nbsp;::`,
      `&nbsp;&nbsp;&nbsp;&nbsp;::..........................&nbsp;&nbsp;'8HHHP'&nbsp;&nbsp;..........................::`,
      `&nbsp;&nbsp;&nbsp;&nbsp;'::::::::::::::::::::::::::&nbsp;&nbsp;Hbo.&nbsp;.odH&nbsp;&nbsp;::::::::::::::::::::::::::'`,
      `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;':::::&nbsp;.HHHHHHHHH.&nbsp;:::::'`,
      `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;':::&nbsp;dHHHHHHHHHb&nbsp;:::'`,
      `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:'.HHHHHHHHHHH.':`,
      `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.:&nbsp;dHHHLiveHHHHb&nbsp;:.`,
      `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;::.HHHHHinHHHHHH.::`,
      `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;::&nbsp;dHHHHFearHHHHHb&nbsp;::`,
      `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;::.HHHHHHHHHHHHHHH.::`,
      `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;::&nbsp;dHHHHHHHHHHHHHHHb&nbsp;::`,
      `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;::.HHHHHHHHHHHHHHHHH.::`,
      `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;::&nbsp;dHHHHHHHHHHHHHHHHHb&nbsp;::`,
      `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;::&nbsp;HHHHHHHHHHHHHHHHHHH&nbsp;::`,
      `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'::'"*HHHKroggHHHHH*"':;'`,
      `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'-...-----------...-'`,
    ];
    const commiesArray = [
      `&nbsp;/$$$$$$$&nbsp;&nbsp;/$$$$$$$$&nbsp;/$$$$$$$$&nbsp;/$$$$$$$$&nbsp;/$$$$$$$$&nbsp;/$$$$$$$&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/$$$$$$$&nbsp;&nbsp;/$$$$$$$$&nbsp;&nbsp;/$$$$$$&nbsp;&nbsp;/$$$$$$$&nbsp;`,
      `|&nbsp;$$__&nbsp;&nbsp;$$|&nbsp;$$_____/|__&nbsp;&nbsp;$$__/|__&nbsp;&nbsp;$$__/|&nbsp;$$_____/|&nbsp;$$__&nbsp;&nbsp;$$&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;$$__&nbsp;&nbsp;$$|&nbsp;$$_____/&nbsp;/$$__&nbsp;&nbsp;$$|&nbsp;$$__&nbsp;&nbsp;$$`,
      `|&nbsp;$$&nbsp;&nbsp;\\&nbsp;$$|&nbsp;$$&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;$$&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;$$&nbsp;&nbsp;&nbsp;|&nbsp;$$&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;$$&nbsp;&nbsp;\\&nbsp;$$&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;$$&nbsp;&nbsp;\\&nbsp;$$|&nbsp;$$&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;$$&nbsp;&nbsp;\\&nbsp;$$|&nbsp;$$&nbsp;&nbsp;\\&nbsp;$$`,
      `|&nbsp;$$$$$$$&nbsp;|&nbsp;$$$$$&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;$$&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;$$&nbsp;&nbsp;&nbsp;|&nbsp;$$$$$&nbsp;&nbsp;&nbsp;|&nbsp;$$$$$$$/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;$$&nbsp;&nbsp;|&nbsp;$$|&nbsp;$$$$$&nbsp;&nbsp;&nbsp;|&nbsp;$$$$$$$$|&nbsp;$$&nbsp;&nbsp;|&nbsp;$$`,
      `|&nbsp;$$__&nbsp;&nbsp;$$|&nbsp;$$__/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;$$&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;$$&nbsp;&nbsp;&nbsp;|&nbsp;$$__/&nbsp;&nbsp;&nbsp;|&nbsp;$$__&nbsp;&nbsp;$$&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;$$&nbsp;&nbsp;|&nbsp;$$|&nbsp;$$__/&nbsp;&nbsp;&nbsp;|&nbsp;$$__&nbsp;&nbsp;$$|&nbsp;$$&nbsp;&nbsp;|&nbsp;$$`,
      `|&nbsp;$$&nbsp;&nbsp;\\&nbsp;$$|&nbsp;$$&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;$$&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;$$&nbsp;&nbsp;&nbsp;|&nbsp;$$&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;$$&nbsp;&nbsp;\\&nbsp;$$&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;$$&nbsp;&nbsp;|&nbsp;$$|&nbsp;$$&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;$$&nbsp;&nbsp;|&nbsp;$$|&nbsp;$$&nbsp;&nbsp;|&nbsp;$$`,
      `|&nbsp;$$$$$$$/|&nbsp;$$$$$$$$&nbsp;&nbsp;&nbsp;|&nbsp;$$&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;$$&nbsp;&nbsp;&nbsp;|&nbsp;$$$$$$$$|&nbsp;$$&nbsp;&nbsp;|&nbsp;$$&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;$$$$$$$/|&nbsp;$$$$$$$$|&nbsp;$$&nbsp;&nbsp;|&nbsp;$$|&nbsp;$$$$$$$/`,
      `|_______/&nbsp;|________/&nbsp;&nbsp;&nbsp;|__/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|__/&nbsp;&nbsp;&nbsp;|________/|__/&nbsp;&nbsp;|__/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|_______/&nbsp;|________/|__/&nbsp;&nbsp;|__/|_______/&nbsp;`,
      `<br>`,
      `&nbsp;/$$$$$$$$&nbsp;/$$&nbsp;&nbsp;&nbsp;/$$&nbsp;&nbsp;/$$$$$$&nbsp;&nbsp;/$$&nbsp;&nbsp;&nbsp;/$$&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/$$$$$$$&nbsp;&nbsp;/$$$$$$$$&nbsp;/$$$$$$$&nbsp;`,
      `|__&nbsp;&nbsp;$$__/|&nbsp;$$&nbsp;&nbsp;|&nbsp;$$&nbsp;/$$__&nbsp;&nbsp;$$|&nbsp;$$$&nbsp;|&nbsp;$$&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;$$__&nbsp;&nbsp;$$|&nbsp;$$_____/|&nbsp;$$__&nbsp;&nbsp;$$`,
      `&nbsp;&nbsp;&nbsp;|&nbsp;$$&nbsp;&nbsp;&nbsp;|&nbsp;$$&nbsp;&nbsp;|&nbsp;$$|&nbsp;$$&nbsp;&nbsp;\\&nbsp;$$|&nbsp;$$$$|&nbsp;$$&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;$$&nbsp;&nbsp;\\&nbsp;$$|&nbsp;$$&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;$$&nbsp;&nbsp;\\&nbsp;$$`,
      `&nbsp;&nbsp;&nbsp;|&nbsp;$$&nbsp;&nbsp;&nbsp;|&nbsp;$$$$$$$$|&nbsp;$$$$$$$$|&nbsp;$$&nbsp;$$&nbsp;$$&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;$$$$$$$/|&nbsp;$$$$$&nbsp;&nbsp;&nbsp;|&nbsp;$$&nbsp;&nbsp;|&nbsp;$$`,
      `&nbsp;&nbsp;&nbsp;|&nbsp;$$&nbsp;&nbsp;&nbsp;|&nbsp;$$__&nbsp;&nbsp;$$|&nbsp;$$__&nbsp;&nbsp;$$|&nbsp;$$&nbsp;&nbsp;$$$$&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;$$__&nbsp;&nbsp;$$|&nbsp;$$__/&nbsp;&nbsp;&nbsp;|&nbsp;$$&nbsp;&nbsp;|&nbsp;$$`,
      `&nbsp;&nbsp;&nbsp;|&nbsp;$$&nbsp;&nbsp;&nbsp;|&nbsp;$$&nbsp;&nbsp;|&nbsp;$$|&nbsp;$$&nbsp;&nbsp;|&nbsp;$$|&nbsp;$$\\&nbsp;&nbsp;$$$&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;$$&nbsp;&nbsp;\\&nbsp;$$|&nbsp;$$&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;$$&nbsp;&nbsp;|&nbsp;$$`,
      `&nbsp;&nbsp;&nbsp;|&nbsp;$$&nbsp;&nbsp;&nbsp;|&nbsp;$$&nbsp;&nbsp;|&nbsp;$$|&nbsp;$$&nbsp;&nbsp;|&nbsp;$$|&nbsp;$$&nbsp;\\&nbsp;&nbsp;$$&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;$$&nbsp;&nbsp;|&nbsp;$$|&nbsp;$$$$$$$$|&nbsp;$$$$$$$/`,
      `&nbsp;&nbsp;&nbsp;|__/&nbsp;&nbsp;&nbsp;|__/&nbsp;&nbsp;|__/|__/&nbsp;&nbsp;|__/|__/&nbsp;&nbsp;\\__/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|__/&nbsp;&nbsp;|__/|________/|_______/`,
    ];
    const thereIsNoSpoonArray = [
      `<span style="color:#808080">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color:#7c7671">,</span><span style="color:#857a69">╓</span><span style="color:#877660">╓</span><span style="color:#8b7d61">╓</span><span style="color:#998b5e">∩</span>`,
      `<span style="color:#808080">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color:#868372">,</span><span style="color:#816b47">╢</span><span style="color:#99773b">╢</span><span style="color:#a47c34">▒</span><span style="color:#ac8434">▒</span><span style="color:#ba9c3c">▒</span><span style="color:#b99e3d">▒</span><span style="color:#a39658">'&nbsp;</span><span style="color:#8c8670">,</span>`,
      `<span style="color:#808080">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color:#938c64">,&nbsp;&nbsp;</span><span style="color:#ada052">░</span><span style="color:#ab9e53">░░</span><span style="color:#a2965a">'&nbsp;&nbsp;</span><span style="color:#ae974c">╙</span><span style="color:#916e5b">r</span>`,
      `<span style="color:#808080">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color:#95814d">║</span><span style="color:#9c8442">▒</span><span style="color:#9b8c53">╖&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color:#b29e4a">░</span><span style="color:#ae9b4f">"</span><span style="color:#aa7f40">ÿ</span><span style="color:#90744f">"&nbsp;</span><span style="color:#8f7361">,</span>`,
      `<span style="color:#808080">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color:#957138">╫</span><span style="color:#ac7f29">╣</span><span style="color:#aa8533">╢</span><span style="color:#a99549">▒</span><span style="color:#a09357">░</span><span style="color:#a19457">░&nbsp;</span><span style="color:#ae9b4c">░¡</span><span style="color:#af7647">░</span><span style="color:#af8350">░░</span><span style="color:#a6634c">*</span>`,
      `<span style="color:#808080">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color:#937e44">▒</span><span style="color:#9b8345">▒</span><span style="color:#9b8b52">░</span><span style="color:#a78f45">▒</span><span style="color:#9b7131">▓</span><span style="color:#a27733">╣</span><span style="color:#a3692d">Ñ</span><span style="color:#ba7926">╣</span><span style="color:#b9702d">╬</span><span style="color:#a55840">@</span><span style="color:#996d58">╨</span><span style="color:#927866">"</span>`,
      `<span style="color:#808080">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color:#8a8155">▒</span><span style="color:#a18947">╜</span><span style="color:#9c6f34">▌</span><span style="color:#ae7027">╫</span><span style="color:#893817">▌</span><span style="color:#b08635">▒</span><span style="color:#ad8a41">░</span><span style="color:#9c4924">▀</span><span style="color:#b34d2a">▒</span><span style="color:#907152">╙</span><span style="color:#8a7862">"</span>`,
      `<span style="color:#808080">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color:#917c58">╓</span><span style="color:#997643">▒</span><span style="color:#a17535">▒</span><span style="color:#a8511a">▓</span><span style="color:#b57f2d">╢▓</span><span style="color:#bc7b23">╬</span><span style="color:#9d3f12">▓</span><span style="color:#b04810">▓</span><span style="color:#c07024">╣</span><span style="color:#c36d26">╢</span><span style="color:#b57d43">"</span><span style="color:#9d8962">░</span><span style="color:#968469">;,,</span><span style="color:#8e8371">,</span>`,
      `<span style="color:#808080">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color:#7b7476">,</span><span style="color:#823b30">▓</span><span style="color:#780618">█</span><span style="color:#570e0d">█</span><span style="color:#5a040d">█</span><span style="color:#61050d">█</span><span style="color:#63230f">█</span><span style="color:#480209">█</span><span style="color:#54040b">█</span><span style="color:#a96135">░</span><span style="color:#b64a29">▀</span><span style="color:#b37c48">░</span><span style="color:#b0854f">░</span><span style="color:#a78557">░</span><span style="color:#b3704c">,</span><span style="color:#bd5a42">w</span><span style="color:#ba5a45">µ</span><span style="color:#b66849">,</span><span style="color:#a98755">░</span>`,
      `<span style="color:#808080">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color:#8b7e73">,</span><span style="color:#a47a55">╥</span><span style="color:#78192d">▓</span><span style="color:#4f0326">█</span><span style="color:#4b0025">█</span><span style="color:#380014">█</span><span style="color:#25000a">█</span><span style="color:#60031a">█</span><span style="color:#4c0410">█</span><span style="color:#973e2a">▒</span><span style="color:#bb6b3d">▒</span><span style="color:#bd6440">▒</span><span style="color:#c0553f">▄</span><span style="color:#d4362b">▓</span><span style="color:#e5181a">▓</span><span style="color:#f60919">▓</span><span style="color:#ff0014">▓</span><span style="color:#ff001f">▓▓▓</span><span style="color:#fc0322">▓</span>`,
      `<span style="color:#808080">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color:#a8566a">╓</span><span style="color:#bd4143">æ</span><span style="color:#cc4433">▄</span><span style="color:#ce4230">▄</span><span style="color:#c31524">▓</span><span style="color:#a60323">▓</span><span style="color:#bc0c26">▓</span><span style="color:#ba101e">▓</span><span style="color:#b90619">▓</span><span style="color:#b60010">▓</span><span style="color:#dc1314">▓</span><span style="color:#e20a0e">▓</span><span style="color:#f00109">▓</span><span style="color:#f50007">▓▓▓▓▓</span><span style="color:#fc0018">▓</span><span style="color:#fe012d">▓</span><span style="color:#eb1435">╣</span><span style="color:#f20d34">╢</span><span style="color:#fd0128">▓</span><span style="color:#a14e58">Ç</span>`,
      `<span style="color:#808080">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color:#b73c57">▄</span><span style="color:#e7072f">▓</span><span style="color:#ef0020">▓</span><span style="color:#ea0017">▓</span><span style="color:#e00012">▓</span><span style="color:#d90010">▓▓▓</span><span style="color:#ce0009">▓</span><span style="color:#cc0007">▓▓▓</span><span style="color:#e6000a">▓</span><span style="color:#f20010">▓▓▓</span><span style="color:#f30012">▓▓▓▓</span><span style="color:#ef0520">▓</span><span style="color:#f90225">▓</span><span style="color:#de2138">╣</span><span style="color:#e21d33">╢</span><span style="color:#f9032b">▓</span><span style="color:#d70f28">▓</span>`,
      `<span style="color:#808080">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color:#a6556b">╓</span><span style="color:#f7013e">▓</span><span style="color:#f00033">╣</span><span style="color:#e90128">▓▓▓</span><span style="color:#f3053b">▓</span><span style="color:#b54960">"&nbsp;&nbsp;</span><span style="color:#ba3c56">╙</span><span style="color:#ec001f">▓</span><span style="color:#ed0015">▓▓▓▓▓▓▓▓▓</span><span style="color:#df000e">▓</span><span style="color:#db000f">▓▓</span><span style="color:#ec0021">▓</span><span style="color:#e2001c">▓</span><span style="color:#93000e">█</span><span style="color:#8d000f">█</span><span style="color:#92414e">▌</span>`,
      `<span style="color:#808080">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color:#a6425d">╔</span><span style="color:#ea003c">▓</span><span style="color:#e90039">▓▓</span><span style="color:#e1002c">▓</span><span style="color:#dd0024">▓▓</span><span style="color:#ec0021">▓</span><span style="color:#e1143c">▓&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color:#d41833">▓</span><span style="color:#e60017">▓</span><span style="color:#e70015">▓▓▓▓▓▓▓▓▓▓▓</span><span style="color:#b00010">▓</span><span style="color:#800014">█</span><span style="color:#991d3c">▀</span>`,
      `<span style="color:#808080">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color:#914d61">╙</span><span style="color:#ad2c4a">▀</span><span style="color:#bd1137">▓</span><span style="color:#c50129">▓</span><span style="color:#bf001e">▓▓▓</span><span style="color:#d20019">▓</span><span style="color:#db0018">▓</span><span style="color:#e5001f">▓</span><span style="color:#dd0e31">▓</span><span style="color:#c02e48">▄</span><span style="color:#a84e62">╥&nbsp;▐</span><span style="color:#db0018">▓</span><span style="color:#e00019">▓▓▓▓▓▓</span><span style="color:#d40009">▓</span><span style="color:#e9000e">▓▓</span><span style="color:#8d000e">█</span><span style="color:#4e000c">█</span><span style="color:#6a182f">▌</span>`,
      `<span style="color:#808080">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color:#a64f6a">'</span><span style="color:#c02b58">╝</span><span style="color:#bd0a39">▓</span><span style="color:#c0092a">▓</span><span style="color:#c90012">▓</span><span style="color:#d00013">▓▓</span><span style="color:#de0014">▓</span><span style="color:#de001e">▓</span><span style="color:#d40930">▓▓</span><span style="color:#cc011f">▓</span><span style="color:#d50012">▓</span><span style="color:#d60010">▓▓▓</span><span style="color:#c90009">▓</span><span style="color:#b20005">▓</span><span style="color:#7b0003">█</span><span style="color:#910001">█</span><span style="color:#0c0000">█</span><span style="color:#100001">██</span><span style="color:#511b20">█</span><span style="color:#9a7856">▒</span>`,
      `<span style="color:#808080">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color:#945d72">└</span><span style="color:#c71e5a">╫</span><span style="color:#cf0227">▓</span><span style="color:#b40010">▓</span><span style="color:#ab0009">▓▓</span><span style="color:#c50016">▓</span><span style="color:#d10834">▓&nbsp;</span><span style="color:#bf1a3a">▓</span><span style="color:#c70126">▓</span><span style="color:#aa030f">▓</span><span style="color:#b50004">▓</span><span style="color:#da0005">▓</span><span style="color:#750000">█</span><span style="color:#730000">█</span><span style="color:#5d0000">█</span><span style="color:#950001">▓</span><span style="color:#380000">█</span><span style="color:#400000">█</span><span style="color:#140007">█</span><span style="color:#2f0421">█</span><span style="color:#a80b19">▓</span><span style="color:#9b2a2a">▓</span><span style="color:#876660">k</span>`,
      `<span style="color:#808080">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color:#a50625">▓</span><span style="color:#92000c">▓</span><span style="color:#9a000a">███</span><span style="color:#b1052a">▓</span><span style="color:#8a4d5a">r</span><span style="color:#71636b">j</span><span style="color:#730d34">▓</span><span style="color:#670321">█</span><span style="color:#990004">▓</span><span style="color:#c50001">▓</span><span style="color:#7a0000">█</span><span style="color:#790000">█</span><span style="color:#470000">█</span><span style="color:#bd0009">▓</span><span style="color:#b10006">▓▓</span><span style="color:#c30215">▓</span><span style="color:#ab2e38">╫</span><span style="color:#ff001e">▓</span><span style="color:#fa0005">▓</span><span style="color:#e70211">▓</span><span style="color:#93434a">▌</span>`,
      `<span style="color:#808080">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color:#c8163a">▓</span><span style="color:#cf001f">▓</span><span style="color:#7f000b">█</span><span style="color:#5d0004">██</span><span style="color:#930422">█</span><span style="color:#7f5a65">Γ</span><span style="color:#4c2732">█</span><span style="color:#70032f">▓</span><span style="color:#900113">▓</span><span style="color:#a50000">▓</span><span style="color:#a40000">▓</span><span style="color:#690000">██</span><span style="color:#820000">█</span><span style="color:#eb000f">▓</span><span style="color:#e90010">▓▓▓</span><span style="color:#f9021b">▓</span><span style="color:#ff0025">▓▓</span><span style="color:#f4000d">▓</span><span style="color:#b1010e">▓</span>`,
      `<span style="color:#808080">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color:#c90227">▓</span><span style="color:#e8001e">▓</span><span style="color:#e60019">▓</span><span style="color:#b90015">▓</span><span style="color:#890216">█</span><span style="color:#920e2c">▓&nbsp;</span><span style="color:#9b051f">▓</span><span style="color:#860005">█</span><span style="color:#680000">█</span><span style="color:#5b0000">██</span><span style="color:#460000">███</span><span style="color:#ec000d">▓</span><span style="color:#dd000d">▓▓▓</span><span style="color:#f80016">▓</span><span style="color:#ff0022">▓</span><span style="color:#ff0027">▓▓</span><span style="color:#9d000e">█</span>`,
      `<span style="color:#808080">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color:#9f5a70">╒</span><span style="color:#930014">█</span><span style="color:#e70019">▓</span><span style="color:#e20016">▓</span><span style="color:#e60422">▓</span><span style="color:#dd0224">▓</span><span style="color:#8a3546">▌&nbsp;</span><span style="color:#9e000e">▓</span><span style="color:#720000">█</span><span style="color:#7e0000">▓█</span><span style="color:#a80000">▓███</span><span style="color:#e8000a">▓</span><span style="color:#e60010">▓▓▓▓</span><span style="color:#fe001b">▓</span><span style="color:#fc0026">▓▓</span><span style="color:#99000a">█</span><span style="color:#843a42">▌</span>`,
      `<span style="color:#808080">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color:#b04d63">╜</span><span style="color:#ba3853">╜</span><span style="color:#de0229">▓</span><span style="color:#f3001d">▓</span><span style="color:#eb0421">▓</span><span style="color:#ec0938">▓</span><span style="color:#b8324a">▌&nbsp;</span><span style="color:#c10122">▓</span><span style="color:#a50000">▓</span><span style="color:#b50001">▓</span><span style="color:#b90001">▓▓▓█</span><span style="color:#8a0000">█</span><span style="color:#e4000a">▓</span><span style="color:#df000d">▓▓▓▓▓</span><span style="color:#fe0010">▓</span><span style="color:#ff002c">▓</span><span style="color:#b40010">█</span><span style="color:#8b303f">▌</span>`,
      `<span style="color:#808080">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color:#95646d">'</span><span style="color:#c9324c">╨</span><span style="color:#db2352">▓</span><span style="color:#996570">'&nbsp;&nbsp;</span><span style="color:#ab2a3d">▐</span><span style="color:#b7000c">▓</span><span style="color:#b60003">▓▓▓▓</span><span style="color:#a50000">█</span><span style="color:#8d0000">█</span><span style="color:#e1000b">▓</span><span style="color:#dc000b">▓▓▓▓▓▓</span><span style="color:#fc0018">▓</span><span style="color:#b30012">▓</span>`,
      `<span style="color:#808080">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color:#ca0128">▓</span><span style="color:#b20006">▓</span><span style="color:#ad0002">▓▓▓█</span><span style="color:#7c0000">█</span><span style="color:#cc000c">▓</span><span style="color:#eb000a">▓</span><span style="color:#e8000b">▓▓▓▓▓</span><span style="color:#fb001a">▓</span><span style="color:#ae0318">█</span>`,
      `<span style="color:#808080">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color:#a2526a">╘</span><span style="color:#c00015">▓</span><span style="color:#b40004">▓</span><span style="color:#b00003">▓▓▓</span><span style="color:#730000">█</span><span style="color:#c70007">▓</span><span style="color:#e90006">▓</span><span style="color:#e10005">▓▓▓▓▓</span><span style="color:#fd0031">╣</span><span style="color:#943c46">▌</span>`,
      `<span style="color:#808080">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color:#b13857">▐</span><span style="color:#b90013">▓</span><span style="color:#a70004">█</span><span style="color:#e70013">▓</span><span style="color:#d10013">▓</span><span style="color:#820000">█</span><span style="color:#b70009">▓</span><span style="color:#ad0003">▓</span><span style="color:#670000">█</span><span style="color:#780004">█</span><span style="color:#820008">█</span><span style="color:#dd000a">▓</span><span style="color:#f8000c">▓</span><span style="color:#eb002c">▓</span>`,
      `<span style="color:#808080">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color:#cc1549">▓</span><span style="color:#cb0018">▓</span><span style="color:#f80021">▓</span><span style="color:#d40005">▓</span><span style="color:#970003">█</span><span style="color:#950000">▓▓</span><span style="color:#6b0001">█</span><span style="color:#470000">██</span><span style="color:#c10002">▓</span><span style="color:#f9001d">▓</span><span style="color:#d80e32">▓</span>`,
      `<span style="color:#808080">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color:#f20038">▓</span><span style="color:#e90015">▓</span><span style="color:#df0009">▓</span><span style="color:#a70003">▓</span><span style="color:#930003">█</span><span style="color:#860003">█</span><span style="color:#5f0000">█</span><span style="color:#720002">█</span><span style="color:#9a0001">█</span><span style="color:#d20003">▓</span><span style="color:#d6000a">▓</span><span style="color:#bb374d">▌</span>`,
      `<span style="color:#808080">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color:#a95576">╒</span><span style="color:#f1002d">▓</span><span style="color:#e40012">▓</span><span style="color:#dc0003">▓</span><span style="color:#9c0001">▓</span><span style="color:#6d0000">███▓</span><span style="color:#c70001">▓</span><span style="color:#d40003">▓</span><span style="color:#d80009">▓</span><span style="color:#ad434c">L</span>`,
      `<span style="color:#808080">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color:#ec104d">▓</span><span style="color:#f00011">▓</span><span style="color:#e10006">▓</span><span style="color:#e50003">▓</span><span style="color:#ce0001">▓▓▓▓</span><span style="color:#d10001">▓▓▓</span><span style="color:#e00008">▓</span><span style="color:#d5162d">▌</span>`,
      `<span style="color:#808080">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color:#b64155">╔</span><span style="color:#f30010">▓</span><span style="color:#f1000c">▓▓▓▓▓</span><span style="color:#e20001">▓</span><span style="color:#e20001">▓▓▓▓▓▓</span>`,
      `<span style="color:#808080">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color:#f2000f">▓</span><span style="color:#ef000a">▓▓▓▓▓▓</span><span style="color:#e40001">▓</span><span style="color:#df0000">▓▓▓▓▓▓</span><span style="color:#b83a55">╗</span>`,
      `<span style="color:#808080">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color:#e10f1a">▓</span><span style="color:#ee0008">▓</span><span style="color:#f40008">▓▓▓▓▓▓▓</span><span style="color:#dd0000">▓</span><span style="color:#d80000">▓▓▓▓▓</span><span style="color:#da0c20">▓</span>`,
      `<span style="color:#808080">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color:#e10f1f">▓</span><span style="color:#ed0008">▓</span><span style="color:#f40006">▓▓▓▓▓▓▓▓</span><span style="color:#da0000">▓</span><span style="color:#d40000">▓▓▓▓▓▓</span><span style="color:#c12e53">▌</span>`,
      `<span style="color:#808080">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color:#e40c1f">▓</span><span style="color:#ef0008">▓</span><span style="color:#f30004">▓▓▓▓▓▓▓▓▓</span><span style="color:#da0000">▓</span><span style="color:#d30000">▓▓▓▓▓▓</span><span style="color:#e0031d">▓</span>`,
      `<span style="color:#808080">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color:#e20c22">▓</span><span style="color:#f2000c">▓</span><span style="color:#f30004">▓▓▓▓</span><span style="color:#e90000">▓▓▓</span><span style="color:#dc0000">▓▓▓▓▓▓▓▓▓▓</span><span style="color:#d90004">▓</span><span style="color:#aa4653">L</span>`,
      `<span style="color:#808080">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color:#e00d22">▓</span><span style="color:#f30015">▓</span><span style="color:#f20004">▓</span><span style="color:#ec0001">▓▓▓▓▓▓▓</span><span style="color:#db0000">▓▓▓▓</span><span style="color:#d80000">▓▓▓▓▓▓▓</span><span style="color:#d70917">▓</span>`,
      `<span style="color:#808080">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color:#e90618">▓</span><span style="color:#f40015">▓</span><span style="color:#f10003">▓</span><span style="color:#ec0000">▓▓▓▓▓▓▓</span><span style="color:#dd0000">▓▓▓▓▓</span><span style="color:#d60000">▓▓▓▓▓▓▓▓</span>`,
      `<span style="color:#808080">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color:#93686b">,</span><span style="color:#e9061d">▓</span><span style="color:#f2000d">▓</span><span style="color:#ee0002">▓▓▓</span><span style="color:#eb0000">▓▓▓▓▓▓</span><span style="color:#d60000">▓▓▓▓</span><span style="color:#d50000">▓▓▓▓▓▓▓▓▓</span><span style="color:#c02b2e">▌</span>`,
      `<span style="color:#808080">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color:#a65056">╔</span><span style="color:#f00112">▓</span><span style="color:#f00008">▓</span><span style="color:#eb0002">▓▓▓▓▓▓▓▓▓▓</span><span style="color:#d70000">▓▓▓</span><span style="color:#d70000">▓▓▓▓▓▓▓▓▓▓▓</span>`,
      `<span style="color:#808080">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color:#c82f39">▐</span><span style="color:#f3000a">▓</span><span style="color:#ed0005">▓▓▓▓▓</span><span style="color:#e40000">▓▓▓▓▓▓</span><span style="color:#d80000">▓▓▓▓▓▓▓</span><span style="color:#d00000">▓▓▓▓▓▓▓▓</span><span style="color:#b92d31">▌</span>`,
      `<span style="color:#808080">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color:#ac4e55">╔</span><span style="color:#ea0914">▓</span><span style="color:#f00006">▓</span><span style="color:#ea000a">▓▓▓▓▓</span><span style="color:#e20000">▓▓▓▓▓▓▓</span><span style="color:#c40000">▓▓▓▓▓▓▓▓▓▓</span><span style="color:#cd0000">▓▓▓▓▓▓</span>`,
      `<span style="color:#808080">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color:#95646a">╓</span><span style="color:#a55a63">,,,</span><span style="color:#e81344">▓</span><span style="color:#f90123">▓</span><span style="color:#f8063b">▓▓</span><span style="color:#f4010e">▓</span><span style="color:#f00004">▓</span><span style="color:#ed0003">▓▓▓▓▓▓</span><span style="color:#e00000">▓▓▓▓▓▓▓</span><span style="color:#cf0000">▓▓▓▓</span><span style="color:#bd0000">▓▓▓▓▓▓▓▓▓▓▓▓▓</span><span style="color:#d30f12">▓</span>`,
      `<span style="color:#808080">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color:#98677d">,</span><span style="color:#aa5373">╓</span><span style="color:#c83763">▒</span><span style="color:#f50a52">▓</span><span style="color:#ec1355">▓</span><span style="color:#e7185c">▓</span><span style="color:#e21c45">▓</span><span style="color:#e11e40">▓</span><span style="color:#d6263c">▓</span><span style="color:#ea1330">▓</span><span style="color:#fb001a">▓</span><span style="color:#fc001d">▓▓▓▓</span><span style="color:#f30004">▓</span><span style="color:#f20005">▓▓▓▓▓</span><span style="color:#e10001">▓▓</span><span style="color:#e10000">▓▓▓▓▓▓▓▓▓</span><span style="color:#bc0000">▓▓▓</span><span style="color:#c40000">▓▓</span><span style="color:#d80000">▓</span><span style="color:#dc0000">▓▓▓▓▓▓</span><span style="color:#c00000">▓</span><span style="color:#c50000">▓</span><span style="color:#d70000">▓</span><span style="color:#be0411">▓</span><span style="color:#bb1033">▓</span><span style="color:#a83147">▓</span>`,
      `<span style="color:#808080">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color:#b44961">╥</span><span style="color:#c23359">@</span><span style="color:#e40235">▓</span><span style="color:#eb001e">▓</span><span style="color:#f00014">▓</span><span style="color:#f90016">▓▓</span><span style="color:#ff0022">▓</span><span style="color:#fe002e">▓▓▓</span><span style="color:#f80014">▓</span><span style="color:#f70015">▓▓▓▓▓▓▓</span><span style="color:#f20006">▓</span><span style="color:#ef0006">▓▓▓▓▓▓▓</span><span style="color:#e10001">▓</span><span style="color:#db0000">▓▓</span><span style="color:#cc0000">▓▓▓▓</span><span style="color:#c20000">▓▓▓▓▓▓</span><span style="color:#ac0000">▓▓▓▓▓▓▓▓</span><span style="color:#d60000">▓</span><span style="color:#e10001">▓▓</span><span style="color:#e0040a">▓</span><span style="color:#d91920">▓</span><span style="color:#d21e37">▓</span>`,
      `<span style="color:#808080">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color:#d81543">▓</span><span style="color:#f6043f">▓</span><span style="color:#f60849">▓▓</span><span style="color:#f5013a">▓</span><span style="color:#f80030">▓╬▓</span><span style="color:#f50026">▓</span><span style="color:#f50018">▓▓▓▓▓▓▓▓▓▓</span><span style="color:#fb0017">▓▓▓▓▓</span><span style="color:#ed0008">▓</span><span style="color:#ed000b">▓▓▓</span><span style="color:#d80006">▓</span><span style="color:#d80000">▓▓▓▓▓▓▓▓▓▓▓</span><span style="color:#c30000">▓▓▓▓</span><span style="color:#9b0002">█▓▓</span><span style="color:#a10304">▓</span><span style="color:#970a0c">██</span><span style="color:#be0108">▓</span><span style="color:#d5050b">▓</span><span style="color:#d30d14">▓</span><span style="color:#c01b28">▓</span><span style="color:#af2c3a">▀</span><span style="color:#c12c4a">▀</span><span style="color:#a94d6d">'</span>`,
      `<span style="color:#808080">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color:#a24d5c">'</span><span style="color:#9b5356">"'</span><span style="color:#ad4453">"</span><span style="color:#aa4357">"</span><span style="color:#a54446">╙</span><span style="color:#ab3844">▀</span><span style="color:#c52131">▀</span><span style="color:#de1a46">▓</span><span style="color:#e1134d">▓</span><span style="color:#e11142">▓</span><span style="color:#c91627">▓</span><span style="color:#c01b1d">▓▓</span><span style="color:#d70f1f">▓</span><span style="color:#e5071d">▓</span><span style="color:#e9041e">▓▓▓</span><span style="color:#c80e13">▓</span><span style="color:#bf0f22">▓</span><span style="color:#d20e20">▓</span><span style="color:#d70f19">▓▓</span><span style="color:#d0162a">▓</span><span style="color:#bd1b2c">▓</span><span style="color:#9e232b">▀</span><span style="color:#9b292b">▀</span><span style="color:#a9292e">▀</span><span style="color:#c0292f">▀</span><span style="color:#c82a33">▀</span><span style="color:#ba323f">▀</span><span style="color:#9c3b3e">▀</span><span style="color:#a63c40">▀▀</span><span style="color:#a43f3f">▀</span><span style="color:#ab4045">"</span><span style="color:#954b51">"</span><span style="color:#8d5254">'</span><span style="color:#8f5a65">'</span>`,
    ];

    const iAmSpecial = [
      `<span style="color:#808080">&nbsp;</span>`,
      `<span style="color:#808080">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color:#636262">▄</span><span style="color:#63635e">▄&nbsp;&nbsp;&nbsp;</span><span style="color:#68686d">]</span><span style="color:#68653e">▀</span><span style="color:#676137">▀</span><span style="color:#5d5838">▓</span><span style="color:#696748">B</span><span style="color:#626264">,&nbsp;&nbsp;</span><span style="color:#3a3a39">╟</span><span style="color:#857e40">░</span><span style="color:#544e2c">▄</span><span style="color:#57522e">▄</span><span style="color:#363428">█&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color:#62615e">▄</span><span style="color:#696859">╥╥▄</span><span style="color:#6a6a6c">,</span>`,
      `<span style="color:#808080">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color:#5d5d5f">▄&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color:#4e4d4d">▐</span><span style="color:#867f43">░</span><span style="color:#534e31">▓</span><span style="color:#595545">▀</span><span style="color:#515150">▀&nbsp;&nbsp;&nbsp;</span><span style="color:#5f5c32">▌</span><span style="color:#6d6535">▐</span><span style="color:#5a5853">▄</span><span style="color:#898344">░</span><span style="color:#39362a">█&nbsp;&nbsp;</span><span style="color:#393730">█</span><span style="color:#a49a4a">░</span><span style="color:#4f4a2f">▀</span><span style="color:#645f3f">▓</span><span style="color:#464643">▌&nbsp;&nbsp;</span><span style="color:#4f4e47">Æ</span><span style="color:#8c8244">░</span><span style="color:#676341">P</span><span style="color:#686658">"</span><span style="color:#615e56">▀</span><span style="color:#6a6750">▀</span><span style="color:#504f44">▀&nbsp;&nbsp;</span><span style="color:#585754">▄</span><span style="color:#706b4c">M</span><span style="color:#58585a">▄</span>`,
      `<span style="color:#808080">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color:#50504f">▐</span><span style="color:#8c8547">░</span><span style="color:#4f4e48">▄&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color:#656455">╙</span><span style="color:#6e6a50">╨</span><span style="color:#6e6948">Ñ</span><span style="color:#817b3e">░</span><span style="color:#454233">█</span><span style="color:#6d6d6f">,</span><span style="color:#60605d">▄</span><span style="color:#383a2e">█</span><span style="color:#a0944b">░</span><span style="color:#514e3d">▌</span><span style="color:#62615e">'&nbsp;</span><span style="color:#52524e">▄</span><span style="color:#5e5c48">N</span><span style="color:#424136">▓</span><span style="color:#a1954b">░</span><span style="color:#545139">▀</span><span style="color:#6d6951">M&nbsp;</span><span style="color:#676556">m</span><span style="color:#666766">╕</span><span style="color:#48473f">▀</span><span style="color:#978d4a">░</span><span style="color:#525044">▌</span><span style="color:#6f6e70">,&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color:#666667">╒</span><span style="color:#7d753e">░</span><span style="color:#5d5933">▓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color:#606052">g</span><span style="color:#676766">,</span>`,
      `<span style="color:#808080">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color:#49472c">▓</span><span style="color:#7b7343">▒</span><span style="color:#676244">▀</span><span style="color:#676557">w</span><span style="color:#625d35">▌</span><span style="color:#7a743a">▄</span><span style="color:#908847">░</span><span style="color:#525250">▄&nbsp;&nbsp;&nbsp;</span><span style="color:#444546">▐</span><span style="color:#534f31">▄</span><span style="color:#575333">▌</span><span style="color:#6d6a43">Å</span><span style="color:#5b5c59">▀</span><span style="color:#616262">╙▀</span><span style="color:#515058">▀"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color:#62615c">"&nbsp;&nbsp;</span><span style="color:#666666">'</span><span style="color:#696651">▀</span><span style="color:#6c6644">Ñ</span><span style="color:#645f3d">W</span><span style="color:#424142">▌▌</span><span style="color:#555455">b</span><span style="color:#5b5732">▌</span><span style="color:#766f3b">▐&nbsp;&nbsp;&nbsp;</span><span style="color:#6d6c6d">,</span><span style="color:#5d5844">M</span><span style="color:#7c763f">░</span><span style="color:#a5994b">░</span><span style="color:#444442">▌</span>`,
      `<span style="color:#808080">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color:#49492c">▌</span><span style="color:#847d40">░</span><span style="color:#696345">R</span><span style="color:#636360">▄&nbsp;</span><span style="color:#524f37">▓</span><span style="color:#968d48">░</span><span style="color:#3e3b22">█</span><span style="color:#726b48">Ñ</span><span style="color:#484847">▀</span><span style="color:#524f37">▓</span><span style="color:#605d36">▄&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color:#69696a">,</span><span style="color:#5e5e5c">▄</span><span style="color:#626157">▄</span><span style="color:#656351">m▄&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color:#4f4e4a">▄</span><span style="color:#666349">M</span><span style="color:#646352">m</span><span style="color:#5d5d58">▄</span><span style="color:#646465">,&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;▀</span><span style="color:#606061">╙</span><span style="color:#56523b">▓</span><span style="color:#3c3b3c">▌</span><span style="color:#5f5d47">É</span><span style="color:#7c753f">░</span><span style="color:#878344">░</span><span style="color:#615a32">▀</span><span style="color:#7c743a">▐&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color:#57554e">▄</span><span style="color:#6f683c">▀</span><span style="color:#4a4949">▄</span>`,
      `<span style="color:#808080">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color:#5e5d5f">▐</span><span style="color:#908443">░</span><span style="color:#524e2b">▀░</span><span style="color:#797141">▒</span><span style="color:#615e4a">N</span><span style="color:#2a2827">█Ä</span><span style="color:#616265">'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color:#424246">▐</span><span style="color:#847d40">░</span><span style="color:#948b46">░</span><span style="color:#a1964c">░</span><span style="color:#a5994d">░░░</span><span style="color:#847d40">░</span><span style="color:#484748">▄&nbsp;</span><span style="color:#6d6d6f">,</span><span style="color:#69696b">,</span><span style="color:#686869">,,</span><span style="color:#656569">,</span><span style="color:#4e4b36">▀</span><span style="color:#a09549">░</span><span style="color:#a4994c">░</span><span style="color:#a59a4c">░░░</span><span style="color:#918845">░</span><span style="color:#686136">▐</span><span style="color:#666669">-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color:#646465">¬</span><span style="color:#6a653c">▄</span><span style="color:#3d3a31">▌</span><span style="color:#5e5d53">▄</span><span style="color:#636364">,</span><span style="color:#6a6a6b">,</span><span style="color:#615e3c">▀</span><span style="color:#837b40">░</span><span style="color:#54534a">▀</span>`,
      `<span style="color:#808080">&nbsp;&nbsp;&nbsp;▄</span><span style="color:#6f6948">▒</span><span style="color:#5c5a58">▄&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color:#46443f">▀</span><span style="color:#9e964b">░</span><span style="color:#33322e">▌&nbsp;</span><span style="color:#60605d">'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;█</span><span style="color:#a5994e">░</span><span style="color:#a59a4c">░░░░░░</span><span style="color:#998f49">░</span><span style="color:#968c47">░░</span><span style="color:#9e944b">░</span><span style="color:#a0954b">░░░░░░░░░░</span><span style="color:#706633">▐</span><span style="color:#656669">,&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color:#615f59">"</span><span style="color:#47474b">▀</span><span style="color:#6d6837">▌</span><span style="color:#7d773f">▐</span><span style="color:#4c4c4b">▄&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color:#5e5d57">▄</span><span style="color:#6a674b">M</span><span style="color:#5f5f61">▄</span>`,
      `<span style="color:#808080">&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color:#595749">▀</span><span style="color:#81783e">▄</span><span style="color:#6a663d">▀</span><span style="color:#595955">▄&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color:#60605f">'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color:#606061">▄</span><span style="color:#605d51">m▄&nbsp;&nbsp;&nbsp;</span><span style="color:#686869">,▄</span><span style="color:#696443">▀</span><span style="color:#77703a">░</span><span style="color:#a5984d">░</span><span style="color:#a49a4c">░░░░░░░░░░░░░░░░░░░░░</span><span style="color:#918845">░</span><span style="color:#6f693c">▀</span><span style="color:#646147">N</span><span style="color:#5b5854">▄&nbsp;&nbsp;</span><span style="color:#646466">,▄</span><span style="color:#67644c">M</span><span style="color:#575653">▄&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color:#605e59">╙</span><span style="color:#646146">Ñ</span><span style="color:#42413e">▓N&nbsp;</span><span style="color:#5a5954">▄</span><span style="color:#6f693d">▀</span><span style="color:#70683c">▄</span><span style="color:#575551">▀</span>`,
      `<span style="color:#808080">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color:#57554b">▀</span><span style="color:#78723d">▄</span><span style="color:#3f3e33">█&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color:#5c5b5a">▄</span><span style="color:#5f5b3d">▀</span><span style="color:#978e47">░</span><span style="color:#a5994c">░</span><span style="color:#a2964c">░</span><span style="color:#7c743d">░</span><span style="color:#5f5b3d">▀</span><span style="color:#6c683b">▀</span><span style="color:#938748">░</span><span style="color:#685c1a">█</span><span style="color:#635c29">▄</span><span style="color:#a5984c">░</span><span style="color:#a2974b">░</span><span style="color:#857e3e">░</span><span style="color:#999049">░</span><span style="color:#a5994c">░</span><span style="color:#a3974e">░</span><span style="color:#988e48">░</span><span style="color:#857c3f">▄</span><span style="color:#766d3b">▄</span><span style="color:#696337">▄</span><span style="color:#635c33">▄</span><span style="color:#605a2f">▄</span><span style="color:#60592e">▄▄</span><span style="color:#6b6532">▄</span><span style="color:#746d38">▄</span><span style="color:#80783e">▄</span><span style="color:#938a45">░</span><span style="color:#a3984c">░</span><span style="color:#a39a4c">░░░░░░░░</span><span style="color:#8d8544">░</span><span style="color:#77703b">▀</span><span style="color:#9c924a">░</span><span style="color:#a4994d">░</span><span style="color:#a4994d">░░</span><span style="color:#666038">▀</span><span style="color:#565550">▄&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color:#514f39">▓</span><span style="color:#26241f">█</span><span style="color:#5f605d">'</span>`,
      `<span style="color:#808080">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color:#676769">]</span><span style="color:#585432">▌</span><span style="color:#a2934d">░</span><span style="color:#a5994c">░░░░░</span><span style="color:#655e25">▄</span><span style="color:#7f7324">▄</span><span style="color:#5a5428">▄</span><span style="color:#caae01">▒</span><span style="color:#e0c000">▒</span><span style="color:#837614">▀</span><span style="color:#a69004">▀</span><span style="color:#dbbd04">▒</span><span style="color:#0c0c16">█</span><span style="color:#131638">█</span><span style="color:#020841">█</span><span style="color:#01084d">██</span><span style="color:#0b0d15">█</span><span style="color:#080706">█</span><span style="color:#322906">█</span><span style="color:#3b3104">█</span><span style="color:#252406">█</span><span style="color:#2a2407">█</span><span style="color:#907c04">▀█</span><span style="color:#0b0903">█</span><span style="color:#080605">█</span><span style="color:#040311">█</span><span style="color:#0f0f25">█</span><span style="color:#252632">█</span><span style="color:#524a30">▄</span><span style="color:#7f783e">▄</span><span style="color:#a4984c">░</span><span style="color:#a69a4c">░░</span><span style="color:#776b31">▄</span><span style="color:#766e2f">▄</span><span style="color:#a3994d">░</span><span style="color:#9f9449">░</span><span style="color:#7d7324">@</span><span style="color:#6f672b">▄</span><span style="color:#a6994c">░</span><span style="color:#a6994d">░░</span><span style="color:#423e27">█</span>`,
      `<span style="color:#808080">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color:#4a4948">▀</span><span style="color:#857a42">░</span><span style="color:#a59a4c">░</span><span style="color:#a59a4d">░░░░</span><span style="color:#5b5524">▀</span><span style="color:#b69b04">▄</span><span style="color:#ffd900">▒</span><span style="color:#fdd800">▒</span><span style="color:#a68f03">▄</span><span style="color:#d4b400">▒</span><span style="color:#f9d400">▒</span><span style="color:#514405">█</span><span style="color:#5d510d">▀</span><span style="color:#060623">█</span><span style="color:#010745">█</span><span style="color:#5a4d09">█</span><span style="color:#5c5206">█</span><span style="color:#6b5d06">█</span><span style="color:#8a7902">█</span><span style="color:#b49b01">▒</span><span style="color:#695c02">█</span><span style="color:#d3b502">▒</span><span style="color:#b09600">▌</span><span style="color:#ffda00">▒</span><span style="color:#615301">█</span><span style="color:#e5c402">▒█</span><span style="color:#706305">█</span><span style="color:#7e6e07">▀</span><span style="color:#41380b">█</span><span style="color:#070b2f">█</span><span style="color:#010752">█</span><span style="color:#04093f">█</span><span style="color:#28252e">█</span><span style="color:#6b6438">▄</span><span style="color:#5c5007">█</span><span style="color:#e8c502">▒</span><span style="color:#796d20">▌</span><span style="color:#766712">▓</span><span style="color:#fdd900">▒</span><span style="color:#4d4918">▌</span><span style="color:#938844">░</span><span style="color:#897f41">░</span><span style="color:#4a442b">█</span>`,
      `<span style="color:#808080">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color:#3c3927">▀</span><span style="color:#a3974d">░</span><span style="color:#a4994c">░░░░░</span><span style="color:#413e23">█</span><span style="color:#736202">█</span><span style="color:#f4d101">▒</span><span style="color:#f2cf00">▒▒▒</span><span style="color:#786606">█</span><span style="color:#0d0e23">█</span><span style="color:#010846">█</span><span style="color:#736305">▌</span><span style="color:#ddbc02">▒</span><span style="color:#c2a602">▒</span><span style="color:#f4d301">▒</span><span style="color:#d6b401">▒▒▒</span><span style="color:#dfbd01">▒</span><span style="color:#e6c600">▒</span><span style="color:#ffd900">▒</span><span style="color:#b79c01">▀▒</span><span style="color:#857301">█</span><span style="color:#edcb01">▒</span><span style="color:#615301">█</span><span style="color:#c4aa01">▒</span><span style="color:#9b8701">▌</span><span style="color:#393107">█</span><span style="color:#010647">██</span><span style="color:#978204">▀</span><span style="color:#a08503">▀</span><span style="color:#ffda00">▒</span><span style="color:#e3c201">▒</span><span style="color:#bda202">▄</span><span style="color:#f7d500">▒</span><span style="color:#d0b201">▒▒</span><span style="color:#9c8a08">▄</span><span style="color:#676333">▀</span><span style="color:#4c4c44">▄</span>`,
      `<span style="color:#808080">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color:#605f62">╓</span><span style="color:#655e37">▀</span><span style="color:#a4984d">░</span><span style="color:#a59a4c">░░░░</span><span style="color:#686234">▄</span><span style="color:#0a0d38">█</span><span style="color:#010434">█</span><span style="color:#0d2c52">█</span><span style="color:#213d3f">▓</span><span style="color:#263f2a">▓</span><span style="color:#394c22">▓</span><span style="color:#16282e">█</span><span style="color:#030521">█</span><span style="color:#000a5a">██&nbsp;</span><span style="color:#5c5e5c">▄&nbsp;</span><span style="color:#686451">╙</span><span style="color:#eac900">▒</span><span style="color:#ffda00">▒</span><span style="color:#ffd900">▒▒</span><span style="color:#9a8726">╩</span><span style="color:#827b4e">"</span><span style="color:#807953">'</span><span style="color:#8f8238">▀</span><span style="color:#d9b903">▒</span><span style="color:#ffda00">▒</span><span style="color:#e4c302">▒</span><span style="color:#ecc601">▒</span><span style="color:#675601">█</span><span style="color:#f9d501">▒</span><span style="color:#1a1406">█</span><span style="color:#010757">█</span><span style="color:#070933">█</span><span style="color:#9c8704">▄</span><span style="color:#f7d001">▒</span><span style="color:#debf01">▒▒▒</span><span style="color:#806b0c">█</span><span style="color:#7f7638">░</span><span style="color:#a0974b">░</span><span style="color:#a5974e">░░</span><span style="color:#494531">▀</span>`,
      `<span style="color:#808080">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color:#5c5c5f">╒</span><span style="color:#6b674c">M</span><span style="color:#6a684a">MM</span><span style="color:#605d45">M</span><span style="color:#706a38">▀</span><span style="color:#a5994c">░</span><span style="color:#a4984d">░░░░</span><span style="color:#2c2a21">█</span><span style="color:#01064f">█</span><span style="color:#00095c">██</span><span style="color:#123f74">▌</span><span style="color:#0e5d9d">▓</span><span style="color:#0b60a0">▓▓▓</span><span style="color:#050c25">█</span><span style="color:#010642">█</span><span style="color:#776707">▀</span><span style="color:#76714e">▄</span><span style="color:#726f6c">,</span><span style="color:#646262">,</span><span style="color:#4f4c37">▄</span><span style="color:#ab9301">▄</span><span style="color:#f5d200">▒</span><span style="color:#ffda00">▒</span><span style="color:#b39b03">▐&nbsp;&nbsp;</span><span style="color:#6a6968">'&nbsp;</span><span style="color:#6c5f23">▓</span><span style="color:#ffd900">▒</span><span style="color:#ffd900">▒▒</span><span style="color:#b19501">▀</span><span style="color:#f2cf01">▒</span><span style="color:#8e7c04">▀</span><span style="color:#0e0d22">█</span><span style="color:#072647">█</span><span style="color:#0b4273">▓</span><span style="color:#1c4152">▓</span><span style="color:#274332">▓</span><span style="color:#3e5125">▓</span><span style="color:#344320">█</span><span style="color:#11315b">█</span><span style="color:#5a572d">▌</span><span style="color:#a4994c">░</span><span style="color:#a59a4c">░░░</span><span style="color:#716938">▀</span><span style="color:#6e693a">▀▀</span><span style="color:#726b40">▀</span><span style="color:#434240">▌</span>`,
      `<span style="color:#808080">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color:#474528">▌</span><span style="color:#a4994d">░</span><span style="color:#a59a4c">░░░░░░░░</span><span style="color:#1a181f">█</span><span style="color:#000858">█</span><span style="color:#01085a">███</span><span style="color:#091f3d">█</span><span style="color:#0c5fa0">▓</span><span style="color:#0d5e9d">▓▓▓</span><span style="color:#091a34">█</span><span style="color:#9b8502">▌</span><span style="color:#ffda00">▒</span><span style="color:#ffda00">▒</span><span style="color:#e2c701">▒</span><span style="color:#7a6602">█</span><span style="color:#f9d600">▒</span><span style="color:#ffd900">▒▒▒▒</span><span style="color:#c6aa09">▒</span><span style="color:#a5932a">R</span><span style="color:#a4912e">N</span><span style="color:#b29b16">╢</span><span style="color:#f9d700">▒</span><span style="color:#ffd900">▒▒▒▒▒▒</span><span style="color:#45430e">█</span><span style="color:#0961a2">▓</span><span style="color:#0e5d9e">▓▓▓▓▓</span><span style="color:#0d5590">▓</span><span style="color:#686432">▌</span><span style="color:#a4994d">░</span><span style="color:#a5994c">░░░░░░░</span><span style="color:#6b6432">▐</span>`,
      `<span style="color:#808080">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color:#403f40">▐</span><span style="color:#9f9249">░</span><span style="color:#a2994d">░</span><span style="color:#a4994d">░░░░░░░</span><span style="color:#353122">█</span><span style="color:#010857">█</span><span style="color:#00095b">████</span><span style="color:#010323">█</span><span style="color:#0a619e">▓</span><span style="color:#105a9e">▓▓▓</span><span style="color:#0e4b81">▓</span><span style="color:#5f5207">█</span><span style="color:#c4a802">▄</span><span style="color:#f3cf01">▒</span><span style="color:#ffda00">▒▒</span><span style="color:#c0a302">▒</span><span style="color:#b49902">▀</span><span style="color:#e7c401">▒</span><span style="color:#ffd900">▒</span><span style="color:#ffd900">▒▒▒▒▒▒</span><span style="color:#a18903">▄▒▒▒</span><span style="color:#c6a904">▄</span><span style="color:#706406">█</span><span style="color:#0e528f">╢</span><span style="color:#0d5da0">▓</span><span style="color:#0b619f">▓▓▓▓▓</span><span style="color:#08183b">█</span><span style="color:#12131e">█</span><span style="color:#a3954e">░</span><span style="color:#a59a4c">░░░░░░░░</span><span style="color:#363430">▌</span>`,
      `<span style="color:#808080">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color:#53524f">▀</span><span style="color:#66613e">Ñ</span><span style="color:#837d40">░</span><span style="color:#a3984d">░</span><span style="color:#a4994d">░░░░░</span><span style="color:#8c8243">░</span><span style="color:#01053c">█</span><span style="color:#00095a">█</span><span style="color:#010a5b">█████</span><span style="color:#09345a">█</span><span style="color:#0e5c9e">▓</span><span style="color:#0f5d9f">▓▓▓</span><span style="color:#0f4b7f">▓</span><span style="color:#01062c">█</span><span style="color:#010328">█</span><span style="color:#998301">▌</span><span style="color:#b29803">▀</span><span style="color:#b49a01">▀▀▀▀▀▀▀▀▀</span><span style="color:#ccac01">▒</span><span style="color:#dcbd02">▒</span><span style="color:#e4c101">▒</span><span style="color:#ffd900">▒</span><span style="color:#fcd700">▒</span><span style="color:#867609">▓</span><span style="color:#0e4e88">╢</span><span style="color:#0d5ea0">▓</span><span style="color:#0e5d9f">▓▓▓▓▓</span><span style="color:#09284b">█</span><span style="color:#010851">█</span><span style="color:#01064f">█</span><span style="color:#635d30">▌</span><span style="color:#a5994c">░</span><span style="color:#a59a4c">░░░░</span><span style="color:#8d8642">░</span><span style="color:#68633d">▄</span><span style="color:#5e5b4a">▀</span><span style="color:#5c5b5a">"</span>`,
      `<span style="color:#808080">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color:#353537">▐</span><span style="color:#9d914a">░</span><span style="color:#a59a4d">░</span><span style="color:#a59a4d">░░░</span><span style="color:#4d4a28">▐</span><span style="color:#010956">█</span><span style="color:#000a5a">██████</span><span style="color:#01052c">█</span><span style="color:#0f5089">╣</span><span style="color:#0d5ea1">▓</span><span style="color:#0e5d9e">▓▓▓</span><span style="color:#1c2726">█</span><span style="color:#6d6838">▀</span><span style="color:#443d1a">▀</span><span style="color:#af9508">▄</span><span style="color:#d3b302">▒</span><span style="color:#f2d000">▒</span><span style="color:#fdd700">▒</span><span style="color:#ffd900">▒▒▒▒▒▒▒▒</span><span style="color:#ccae02">▒</span><span style="color:#9e8913">▓</span><span style="color:#1f2313">█</span><span style="color:#0c538c">╣</span><span style="color:#0d5ea1">▓</span><span style="color:#0e5e9d">▓▓▓▓▓</span><span style="color:#0a234b">█</span><span style="color:#010753">█</span><span style="color:#01095c">██</span><span style="color:#1c1a16">█</span><span style="color:#a5984d">░</span><span style="color:#a59a4c">░░░░</span><span style="color:#686132">▐</span>`,
      `<span style="color:#808080">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color:#404041">▐</span><span style="color:#a1964c">░</span><span style="color:#a59a4d">░░░░</span><span style="color:#383520">█</span><span style="color:#00095a">█</span><span style="color:#00095b">███████</span><span style="color:#03082f">█</span><span style="color:#0d5086">╣</span><span style="color:#0b61a4">▓</span><span style="color:#0c3c6b">█▓</span><span style="color:#1c323f">█</span><span style="color:#7c753d">▄</span><span style="color:#a0954c">░</span><span style="color:#a29a4c">░░</span><span style="color:#918543">░</span><span style="color:#847b3e">░</span><span style="color:#807639">░</span><span style="color:#817835">▀▀▀▀▀░</span><span style="color:#8e8540">░</span><span style="color:#8e8748">░</span><span style="color:#2d3732">█</span><span style="color:#0a5a98">╣</span><span style="color:#0f5c9e">▓</span><span style="color:#0f5c9e">▓▓▓▓</span><span style="color:#104983">▓</span><span style="color:#061140">█</span><span style="color:#010856">█</span><span style="color:#00095a">███</span><span style="color:#0b0b15">█</span><span style="color:#a5994c">░</span><span style="color:#a49a4c">░░░░</span><span style="color:#7a713a">▐</span>`,
      `<span style="color:#808080">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color:#444446">▐</span><span style="color:#989049">░</span><span style="color:#a59a4d">░</span><span style="color:#a59a4d">░░░</span><span style="color:#535129">▐</span><span style="color:#010953">█</span><span style="color:#01095b">████████</span><span style="color:#020639">█</span><span style="color:#0a2043">█</span><span style="color:#0f548c">╢</span><span style="color:#115a9d">▓</span><span style="color:#0d5ea2">▓▓</span><span style="color:#0c3861">█</span><span style="color:#7e763d">░</span><span style="color:#a3994c">░</span><span style="color:#a4994d">░░</span><span style="color:#6b673a">▄</span><span style="color:#3a4c3f">▓</span><span style="color:#3d4f3e">▄</span><span style="color:#42523d">▄▄▓</span><span style="color:#2e4853">▓</span><span style="color:#15496b">▓</span><span style="color:#0f508a">╢</span><span style="color:#0d5ea0">▓</span><span style="color:#0f5b9c">▓▓▓▓</span><span style="color:#0f4d88">╢</span><span style="color:#091e51">█</span><span style="color:#02064b">█</span><span style="color:#01085b">█████</span><span style="color:#201f19">█</span><span style="color:#a59a4c">░</span><span style="color:#a4994d">░░░░</span><span style="color:#716737">▐</span><span style="color:#616163">,</span>`,
      `<span style="color:#808080">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color:#545455">▄</span><span style="color:#625f46">M</span><span style="color:#6e693a">▀</span><span style="color:#958d49">░</span><span style="color:#a4994c">░</span><span style="color:#a59a4d">░░░░</span><span style="color:#948947">░</span><span style="color:#010435">█</span><span style="color:#000959">█</span><span style="color:#01095b">███████</span><span style="color:#020434">█</span><span style="color:#0f5590">╢</span><span style="color:#0e5c9f">▓</span><span style="color:#0e5d9f">▓▓▓</span><span style="color:#1c2928">█</span><span style="color:#a3994d">░</span><span style="color:#a4994c">░░</span><span style="color:#5b5733">▐</span><span style="color:#0a538b">╢</span><span style="color:#0f5b9e">▓</span><span style="color:#0f5c9f">▓▓</span><span style="color:#2c3e41">▓</span><span style="color:#294040">▓▓</span><span style="color:#0b60a4">▓</span><span style="color:#0d5f9d">▓▓▓▓</span><span style="color:#114d89">▓</span><span style="color:#0c2244">█</span><span style="color:#02054a">█</span><span style="color:#010859">█</span><span style="color:#00095b">██████</span><span style="color:#706837">▌</span><span style="color:#a5994c">░</span><span style="color:#a39a4c">░░░░░</span><span style="color:#99904a">░</span><span style="color:#6e6638">▀</span><span style="color:#535041">¥</span>`,
      `<span style="color:#808080">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color:#454546">▐</span><span style="color:#978c49">░</span><span style="color:#a4984d">░</span><span style="color:#a49a4c">░░░░░░░</span><span style="color:#464227">▀</span><span style="color:#010853">█</span><span style="color:#01095a">███████</span><span style="color:#0c3660">█</span><span style="color:#0d5fa1">▓</span><span style="color:#0f5c9f">▓▓▓</span><span style="color:#10467f">▓</span><span style="color:#7e783d">░</span><span style="color:#a4994c">░</span><span style="color:#a5994d">░</span><span style="color:#968c49">░</span><span style="color:#0d375d">█</span><span style="color:#0f5c9f">▓</span><span style="color:#0f5d9e">▓▓▓</span><span style="color:#175084">▓</span><span style="color:#145284">▓▓</span><span style="color:#105a9d">▓</span><span style="color:#11599c">▓▓▓▓▓</span><span style="color:#0c5288">▓</span><span style="color:#01053d">█</span><span style="color:#01075a">█</span><span style="color:#010a5b">█████</span><span style="color:#1c1a19">█</span><span style="color:#a3984d">░</span><span style="color:#a49a4c">░░░░░░░░</span><span style="color:#393831">▌</span>`,
      `<span style="color:#808080">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color:#3f3d27">█</span><span style="color:#a79b4b">░</span><span style="color:#a59a4c">░░░░░░░░</span><span style="color:#2c2920">█</span><span style="color:#010857">█</span><span style="color:#010759">█████</span><span style="color:#040527">█</span><span style="color:#114370">▓</span><span style="color:#105794">╢</span><span style="color:#0f5c9e">▓▓▓</span><span style="color:#0d2942">█</span><span style="color:#a3984e">░</span><span style="color:#a59a4c">░░</span><span style="color:#5d562d">▐</span><span style="color:#0b5e9b">▓</span><span style="color:#0e5d9f">▓▓▓▓▓▓▓▓▓▓▓╣</span><span style="color:#104774">▓</span><span style="color:#2d464c">▀</span><span style="color:#040625">█</span><span style="color:#01085b">█</span><span style="color:#010a5b">████</span><span style="color:#121222">█</span><span style="color:#9a9149">░</span><span style="color:#a5994c">░</span><span style="color:#a59a4c">░░░░░░░</span><span style="color:#55502f">▐</span>`,
      `<span style="color:#808080">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color:#5f5f62">╘</span><span style="color:#696448">╧</span><span style="color:#6f6a47">ÅÅ</span><span style="color:#6d6940">Å</span><span style="color:#726b39">▄</span><span style="color:#a6994c">░</span><span style="color:#a59a4c">░░░░</span><span style="color:#4c442a">▀</span><span style="color:#010748">█</span><span style="color:#01095b">█</span><span style="color:#01095b">███</span><span style="color:#302e20">▌</span><span style="color:#a4964d">░</span><span style="color:#8d8244">░</span><span style="color:#726d3b">░</span><span style="color:#57593d">▀</span><span style="color:#424d3d">▀</span><span style="color:#514e30">▀</span><span style="color:#a4994c">░</span><span style="color:#a59a4d">░░</span><span style="color:#666134">▐</span><span style="color:#1a4461">▓</span><span style="color:#114770">▓</span><span style="color:#0f4778">▓▓▓▓▓▓</span><span style="color:#1d4b63">▓</span><span style="color:#274c59">▓</span><span style="color:#374c42">▀</span><span style="color:#5b5e3b">▀</span><span style="color:#867c41">░</span><span style="color:#a4994c">░</span><span style="color:#a39b4c">░</span><span style="color:#0a0a1f">█</span><span style="color:#010859">█</span><span style="color:#01095a">███</span><span style="color:#282622">█</span><span style="color:#9e944b">░</span><span style="color:#a2994d">░░░░░</span><span style="color:#4d492e">█</span><span style="color:#5e5c51">▀</span><span style="color:#636051">▀▀</span><span style="color:#5c5c5e">"</span>`,
      `<span style="color:#808080">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color:#5f5b35">▄</span><span style="color:#a5994c">░</span><span style="color:#a49a4c">░░░░</span><span style="color:#7f7840">░</span><span style="color:#16172a">█</span><span style="color:#010951">█</span><span style="color:#01075c">██</span><span style="color:#4e4a28">▌</span><span style="color:#a5984d">░</span><span style="color:#a59a4c">░░░░░░░░░░░░░░░░░░░░░░░</span><span style="color:#9d924b">░</span><span style="color:#020533">█</span><span style="color:#010858">█</span><span style="color:#000958">█</span><span style="color:#0b0e32">█</span><span style="color:#696535">▀</span><span style="color:#a3984d">░</span><span style="color:#a49a4c">░░░░░</span><span style="color:#494532">█</span>`,
      `<span style="color:#808080">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;▓</span><span style="color:#9b9248">░</span><span style="color:#a4994c">░</span><span style="color:#a59a4d">░░░░</span><span style="color:#70693a">▀</span><span style="color:#1a1b2c">█</span><span style="color:#01064a">█</span><span style="color:#091a2f">█</span><span style="color:#1c4866">▓</span><span style="color:#304c4e">▓</span><span style="color:#3f4e3f">▄</span><span style="color:#5f5e3d">▄</span><span style="color:#756f3d">▄</span><span style="color:#888041">░</span><span style="color:#9a9049">░</span><span style="color:#a1974c">░</span><span style="color:#a4994d">░░░░░░░░░░░</span><span style="color:#9a914a">░</span><span style="color:#878042">░</span><span style="color:#6b693d">▄</span><span style="color:#414e3b">▄</span><span style="color:#22485a">▓</span><span style="color:#0a223d">█</span><span style="color:#020548">█</span><span style="color:#111132">█</span><span style="color:#5c5731">▀</span><span style="color:#a2964d">░</span><span style="color:#a4994c">░░░░░</span><span style="color:#898040">░</span><span style="color:#494842">▀</span>`,
      `<span style="color:#808080">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color:#69696b">,</span><span style="color:#595635">▀</span><span style="color:#a3994c">░</span><span style="color:#a4994c">░░░░░░░</span><span style="color:#8d8545">░</span><span style="color:#524f31">▀</span><span style="color:#204459">▓</span><span style="color:#0b4d82">▓</span><span style="color:#115897">▓</span><span style="color:#0e5da0">▓▓▓</span><span style="color:#0e538f">╢</span><span style="color:#0e4b81">╢</span><span style="color:#0f4977">▓</span><span style="color:#134971">▓</span><span style="color:#174a6d">▓</span><span style="color:#1a4a6a">▓▓</span><span style="color:#1d4c6c">▓▓▓▓</span><span style="color:#114974">▓</span><span style="color:#0e4a7d">╢</span><span style="color:#0e528c">╢</span><span style="color:#0d5d99">▓</span><span style="color:#0c5f9f">▓</span><span style="color:#0a538a">▓</span><span style="color:#1b425f">▓</span><span style="color:#45452b">▀</span><span style="color:#817a3e">░</span><span style="color:#a4994c">░</span><span style="color:#a5994c">░░░░░░░</span><span style="color:#9a8e48">░</span><span style="color:#424138">█</span>`,
      `<span style="color:#808080">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color:#3b392c">█</span><span style="color:#978d49">░</span><span style="color:#a59a4c">░</span><span style="color:#a4994c">░░░░░░░░░░░</span><span style="color:#76713c">░</span><span style="color:#484f3b">▀</span><span style="color:#2b4850">▀</span><span style="color:#1a4365">▓</span><span style="color:#0c487a">▓</span><span style="color:#0d528d">╢</span><span style="color:#0d5b9b">▓</span><span style="color:#0e5d9e">▓▓▓▓▓▓▓╢</span><span style="color:#0b4b7f">▓</span><span style="color:#14476a">▓</span><span style="color:#254a58">▓</span><span style="color:#3c4a3d">▀</span><span style="color:#6b683b">▀</span><span style="color:#988c49">░</span><span style="color:#a59a4c">░</span><span style="color:#a4994c">░░░░░░░░░░░</span><span style="color:#696439">▄</span><span style="color:#59595b">▀</span>`,
      `<span style="color:#808080">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"</span><span style="color:#5b5840">▀</span><span style="color:#918744">░</span><span style="color:#a5994d">░</span><span style="color:#a59b4b">░</span><span style="color:#998f49">░</span><span style="color:#746d3a">▄</span><span style="color:#6c653b">▄</span><span style="color:#998e4b">░</span><span style="color:#a49a4c">░</span><span style="color:#a4994c">░░░░░░░░</span><span style="color:#9a914a">░</span><span style="color:#8b8343">░</span><span style="color:#80773d">░</span><span style="color:#766e3c">░</span><span style="color:#726c3b">░░⌠░</span><span style="color:#898042">░</span><span style="color:#998e48">░</span><span style="color:#a4994c">░</span><span style="color:#a4994c">░░░░░░░░░</span><span style="color:#8f8844">░</span><span style="color:#64603c">▄</span><span style="color:#69663e">▄</span><span style="color:#938a45">░</span><span style="color:#a39a4d">░░</span><span style="color:#635d3c">Æ</span><span style="color:#585756">▀</span>`,
      `<span style="color:#808080">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color:#676768">'</span><span style="color:#5f5b4d">▀</span><span style="color:#5e5c55">▀&nbsp;&nbsp;&nbsp;&nbsp;▀</span><span style="color:#696445">Ñ</span><span style="color:#78713c">▄</span><span style="color:#9d924a">░</span><span style="color:#a4994c">░</span><span style="color:#a59a4d">░░░░░░░░░░░░░░░░░░░░</span><span style="color:#948a45">░</span><span style="color:#736c3b">▄</span><span style="color:#625d43">╝</span><span style="color:#5c5a55">▀&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color:#5d5c57">▀</span>`,
      `<span style="color:#808080">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color:#60592e">▌</span><span style="color:#a4994d">░</span><span style="color:#a59a4c">░░░░░░</span><span style="color:#928744">░</span><span style="color:#958c46">░</span><span style="color:#988f48">░░░░░</span><span style="color:#a49a4c">░</span><span style="color:#a4994d">░░░░░░</span><span style="color:#2c2a20">█</span>`,
      `<span style="color:#808080">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color:#4a472d">▌</span><span style="color:#7a743d">▄</span><span style="color:#938946">░</span><span style="color:#a1964d">░</span><span style="color:#a5994d">░░░</span><span style="color:#4c4831">█&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color:#5b5b5d">╙</span><span style="color:#676136">▄</span><span style="color:#a4984d">░</span><span style="color:#a59b4b">░░</span><span style="color:#978e47">░</span><span style="color:#827a3e">▄</span><span style="color:#746c3c">▄</span><span style="color:#3b3a3b">▌</span>`,
      `<span style="color:#808080">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color:#61605b">"</span><span style="color:#646152">▀</span><span style="color:#55534d">▀&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;▀▀</span><span style="color:#5e5d60">'</span>`,
      `<span style="color:#808080">&nbsp;</span>`
    ];

    document.addEventListener("keydown", function (e) {
      consoleInput.focus({ preventScroll: true });
      if (e.key === "ArrowUp" && !self.state.gameStatus) {
        if (self.comandsScrollCounter < self.commandsArray.length) {
          self.comandsScrollCounter++;
          consoleInput.value =
            self.commandsArray[
              self.commandsArray.length - self.comandsScrollCounter
            ];
          self.nextCommand = self.commandsArray[self.commandsArray.length];
        }
        e.preventDefault();
        setCaretPosition(consoleInput, consoleInput.value.length);
      } else if (e.key === "ArrowDown" && !self.state.gameStatus) {
        if (self.comandsScrollCounter > 1) {
          self.comandsScrollCounter--;
          consoleInput.value =
            self.commandsArray[
              self.commandsArray.length - self.comandsScrollCounter
            ];
          self.nextCommand = self.commandsArray[self.commandsArray.length];
        } else if (self.comandsScrollCounter === 1) {
          consoleInput.value = "";
          consoleInput.value.length > 0
            ? (consoleInput.style.width =
                consoleInput.value.length * 0.75 + "rem")
            : (consoleInput.style.width = "4px");
          self.comandsScrollCounter = 0;
        }
        console.log("comandsScrollCounter " + self.comandsScrollCounter);
        console.log("commandsArray.length " + self.commandsArray.length);
        setCaretPosition(consoleInput, consoleInput.value.length);
      } else if (e.key === "Enter") {
        if (consoleInput.value) {
          self.comandsScrollCounter = 0;
          setHistoryCommands(self, consoleInput.value);
          let contentChild = document.createElement("div");
          contentChild.classList.add("my-none");
          let consoleChild = document.createElement("p");
          consoleChild.innerHTML = `[${new Date().toLocaleTimeString()}] <span class="client-prefix">Client</span> > ${
            consoleInput.value
          }`;
          consoleChild.classList.add("my-none");
          consoleHistory.appendChild(consoleChild);
          if (
            consoleInput.value.toLowerCase() === "/help" ||
            consoleInput.value.toLowerCase() === "help" ||
            consoleInput.value.toLowerCase() === "halp" ||
            consoleInput.value.toLowerCase() === "/halp" ||
            consoleInput.value.toLowerCase() === "hepl" ||
            consoleInput.value.toLowerCase() === "/hepl"
          ) {
            appendConsole(consoleChild, allCommands, 10, 250, consoleInput);
          } else if (consoleInput.value.toLowerCase() === "/back") {
            window.location.href = "/";
          } else if (consoleInput.value.toLowerCase() === "/ls" || consoleInput.value.toLowerCase() === "/list") {
            appendConsole(contentChild, allPages, 10, 250, consoleInput);
          } else if (consoleInput.value.toLowerCase().includes("/cd")) {
            let pageStr = consoleInput.value.split(" ");
            if (pageStr[pageStr.length - 1] === "index") {
              window.location.href = "/";
            } else if (consoleInput.value.toLowerCase() === "/cd") {
              appendConsole(contentChild, allPages, 10, 250, consoleInput);
            } else {
              let chkd = false;
              allPages.forEach((page) => {
                if (page === pageStr[pageStr.length - 1]) {
                  window.location.href = "/" + pageStr[pageStr.length - 1];
                } else {
                  if (!chkd) {
                    contentChild.innerText = "404 Not Found";
                    appendConsole(contentChild, allPages, 10, 250, consoleInput);
                    chkd = true;
                  }
                }
              });
            }
          } else if (consoleInput.value.toLowerCase() === "/game") {
            self.startGame();
          } else if (consoleInput.value.toLowerCase() === "/special") {
            let str = (Math.random() * 10).toFixed();
            let per = (Math.random() * 10).toFixed();
            let end = (Math.random() * 10).toFixed();
            let char = (Math.random() * 10).toFixed();
            let int = (Math.random() * 10).toFixed();
            let agi = (Math.random() * 10).toFixed();
            let luck = (Math.random() * 10).toFixed();
            let summary = [];
            let cooldown = 5000;
            let specialArray = [
              `Strength: ${str}`,
              `Perception: ${per}`,
              `Endurance: ${end}`,
              `Charisma: ${char}`,
              `Intelligence: ${int}`,
              `Agility: ${agi}`,
              `Luck: ${luck}`,
            ];
            let img = document.createElement('img');
            img.src = process.env.PUBLIC_URL + '/img/special.png';
            img.alt = "Special";
            if (int <= 2) {
              contentChild.appendChild(img);
            }
            appendConsole(contentChild, specialArray, 10, 250, consoleInput).then(() => {
            });
          } else if (consoleInput.value.toLowerCase() === "/warneverchanges") {
            contentChild.innerHTML = `
              <p class="my-none">The Romans waged war to gather slaves and wealth. Spain built an empire from its lust for gold and territory. Hitler shaped a battered Germany into an economic superpower.</p>
              <p class="my-none">But war never changes.</p>
            `;
          } else if (consoleInput.value.toLowerCase() === "/fun") {
            contentChild.innerHTML = `
              <p class="my-none">F is for fire, that burns down the whole town!</p>
              <p class="my-none">U is for uranium... Bombs!</p>
              <p class="my-none">N is for no survivors!</p>
            `;
          } else if (consoleInput.value.toLowerCase() === "/powerarmor") {
            years510.paused ? years510.play() : years510.pause();
            contentChild.innerHTML = `
              <p class="my-none">Execute this command again to play/pause.</p>
            `;
          } else if (
            consoleInput.value.toLowerCase() === "/deathclawsicoming"
          ) {
            deathclawsicoming.paused
              ? deathclawsicoming.play()
              : deathclawsicoming.pause();
            appendConsole(contentChild, fundsaresafu, 10, 250, consoleInput);
          } else if (consoleInput.value.toLowerCase() === "/givemefev") {
            contentChild.innerHTML = `
            Soldier, if you have come into contact with a previously unknown liquid, and 
            your body has become huge, and your skin is green, please proceed to the nearest 
            military unit for disposal.
            `;
          } else if (consoleInput.value.toLowerCase() === "/nukethemall") {
            appendConsole(contentChild, nukethemall, 1000, 1000, consoleInput).then(() => {
              appendConsole(contentChild, nukethemallArray, 100, 150, consoleInput);
            });
          } else if (
            consoleInput.value.toLowerCase() === "/allyourbasearebelongtous"
          ) {
            appendConsole(contentChild, allyourbasearebelongtous, 2500, 4000, consoleInput);
          } else if (consoleInput.value.toLowerCase() === "/dieallcommies") {
            appendConsole(contentChild, commiesArray, 10, 250, consoleInput);
            } else if (consoleInput.value.toLowerCase() === "/whatisyourname") {
              whatisyourname.paused ? whatisyourname.play() : whatisyourname.pause();
            } else {
            if (!moronPlayed) {
              moron.paused ? moron.play() : moron.pause();
              moronPlayed = true;
            }
            contentChild.innerHTML = "Unknown command";
          }
          consoleHistory.appendChild(contentChild);
          consoleInput.value = "";
          consoleInput.style.width = "0px";
        }
        consoleInput.scrollIntoView();
      } else if (e.key === "/") {
        consoleInput.focus();
      }
    });

    function setHistoryCommands(context, command) {
      context.prevCommand = context.currentCommand;
      context.currentCommand = command;
      context.commandsArray.push(command);
    }

    function setCaretPosition(ctrl, pos) {
      ctrl.style.width = pos * 0.75 + "rem";
      ctrl.selectionStart = ctrl.selectionEnd = pos;
      if (ctrl.setSelectionRange) {
        ctrl.focus();
        ctrl.setSelectionRange(pos, pos);

      } else if (ctrl.createTextRange) {
        var range = ctrl.createTextRange();
        range.collapse(true);
        range.moveEnd("character", pos);
        range.moveStart("character", pos);
        range.select();
      }
    }

    consoleInput.addEventListener("focus", () => {});

    consoleInput.addEventListener("blur", () => {});

    let contentChild = document.createElement("span");
    const timeForInfo = new Date().toLocaleTimeString();
    contentChild.className = "my-none";

    const STRINGS_ARRAY = [
      `[${timeForInfo}]<span class="terminal-prefix"> Terminal</span><span class="">&nbsp&nbsp_______&nbsp_&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp______&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp_&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</span>`,
      `[${timeForInfo}]<span class="terminal-prefix"> Terminal</span><span class="">&nbsp|__&nbsp&nbsp&nbsp__|&nbsp|&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp|&nbsp&nbsp____|&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp|&nbsp|&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</span>`,
      `[${timeForInfo}]<span class="terminal-prefix"> Terminal</span><span class="">&nbsp&nbsp&nbsp&nbsp|&nbsp|&nbsp&nbsp|&nbsp|__&nbsp&nbsp&nbsp___&nbsp&nbsp|&nbsp|__&nbsp&nbsp&nbsp_&nbsp__&nbsp&nbsp&nbsp___|&nbsp|&nbsp__&nbsp___&nbsp&nbsp&nbsp_____&nbsp</span>`,
      `[${timeForInfo}]<span class="terminal-prefix"> Terminal</span><span class="">&nbsp&nbsp&nbsp&nbsp|&nbsp|&nbsp&nbsp|&nbsp'_&nbsp\\&nbsp/&nbsp_&nbsp\\&nbsp|&nbsp&nbsp__|&nbsp|&nbsp'_&nbsp\\&nbsp/&nbsp__|&nbsp|/&nbsp_'&nbsp\\&nbsp\\&nbsp/&nbsp/&nbsp_&nbsp\\</span>`,
      `[${timeForInfo}]<span class="terminal-prefix"> Terminal</span><span class="">&nbsp&nbsp&nbsp&nbsp|&nbsp|&nbsp&nbsp|&nbsp|&nbsp|&nbsp|&nbsp&nbsp__/&nbsp|&nbsp|____|&nbsp|&nbsp|&nbsp|&nbsp(__|&nbsp|&nbsp(_|&nbsp|\\&nbspV&nbsp/&nbsp&nbsp__/</span>`,
      `[${timeForInfo}]<span class="terminal-prefix"> Terminal</span><span class="">&nbsp&nbsp&nbsp&nbsp|_|&nbsp&nbsp|_|&nbsp|_|\\___|&nbsp|______|_|&nbsp|_|\\___|_|\\__,_|&nbsp\\_/&nbsp\\___|</span>`,
      `[${timeForInfo}]<span class="terminal-prefix"> Terminal</span>&nbspWelcome back, Commander`,
      `[${timeForInfo}]<span class="terminal-prefix"> Terminal</span>&nbspYou are currently on page: <strong>admin terminal</strong>`,
      `[${timeForInfo}]<span class="terminal-prefix"> Terminal</span>&nbspFor help input <strong>/help</strong>`,
    ];
    contentChild = appendConsole(consoleHistory, STRINGS_ARRAY, 10, 250, consoleInput);
  }

  render() {
      return (
        <div className="console-main">
        <div id="consoleContent" className="d-none-max-768">
          <div className="content" id="contentArea">
            <div className="content" id="consoleHistory"/>
          </div>
          {this.state.gameStatus || this.state.gameRestarded ? (
            <Asteroids gameStatus={this.gameStatus}/>
          ) : (
            ""
          )}
          <form
            id="consoleForm"
            className="console"
            autoComplete="off"
            method="post"
            action=""
          >
            <input
              autoComplete="false"
              name="hidden"
              type="text"
              className="d-none"
            />
            <span>></span>{" "}
            <input
              className="console-input ml-1"
              id="consoleInput"
              autoFocus
              maxLength="30"
            />
            <span className="caret" id="caret">
              █
            </span>
          </form>
        </div>
        </div>
      );
  }
}

export default Console;
