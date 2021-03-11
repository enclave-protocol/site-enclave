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
          } else if (
              consoleInput.value.toLowerCase() === "/ls"
              || consoleInput.value.toLowerCase() === "/list"
              || consoleInput.value.toLowerCase() === "ls"
          ) {
            appendConsole(contentChild, allPages, 10, 250, consoleInput);
          } else if (
              consoleInput.value.toLowerCase().includes("/cd")
              || consoleInput.value.toLowerCase().includes("cd")
          ) {
            let pageStr = consoleInput.value.split(" ");
            const inputPage = pageStr[pageStr.length - 1]
            if (
                inputPage === "index"
                || inputPage === "main"
                || inputPage === "app"
                || inputPage === "doctrine"
                || inputPage === "token"
            ) {
              if (inputPage === "index") window.location.href = "/";
              if (inputPage === "main") window.location.href = "/main";
              if (inputPage === "app") window.location.href = "/app";
              if (inputPage === "doctrine") window.location.href = "/doctrine";
              if (inputPage === "token") window.location.href = "/token";
            } else if (
                consoleInput.value.toLowerCase() === "/cd"
                || consoleInput.value.toLowerCase().includes("cd")
            ) {
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
              <p class="my-none">The Romans waged war to gather slaves and wealth. Spain built an empire from its lust 
              for gold and territory. Hitler shaped a battered Germany into an economic superpower.</p>
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
