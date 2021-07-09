var gameStatus = [0,0,0,0,0,0,0,0,0];
var myClick;
var OtherClick;
const socket = io("/");
var enableClick = false;
socket.emit("join-room", ROOM_ID);
socket.on("user-connected", () => {
    console.log("user connected");
    myClick = "X";
    OtherClick = "O";
    enableClick = true;
    socket.emit("can-play");
})
socket.on("can-play", () => {
    myClick = "O";
    OtherClick = "X";
    enableClick = true;
})
const clicked = (id) => {
    if (enableClick) {
        const element = document.getElementById(id);
        element.innerHTML = myClick;
        element.onclick = null;
        socket.emit("clicked", id);
        enableClick = false;
        gameStatus[id-1] = 1;
        if ((gameStatus[0] == 1 && gameStatus[1] == 1 && gameStatus[2] == 1)||
        (gameStatus[0] ==1 && gameStatus[3] == 1 && gameStatus[6] == 1)||
        (gameStatus[0] ==1 && gameStatus[4] == 1 && gameStatus[8] == 1)||
        (gameStatus[2] ==1 && gameStatus[5] == 1 && gameStatus[8] == 1)||
        (gameStatus[6] ==1 && gameStatus[7] == 1 && gameStatus[8] == 1)||
        (gameStatus[1] ==1 && gameStatus[4] == 1 && gameStatus[7] == 1)||
        (gameStatus[3] ==1 && gameStatus[4] == 1 && gameStatus[5] == 1)||
        (gameStatus[6] ==1 && gameStatus[7] == 1 && gameStatus[8] == 1)) {
            console.log("You win");
        }
    }
}
socket.on("clicked", (id) => {
    const element = document.getElementById(id);
    element.innerHTML = OtherClick;
    element.onclick = null;
    enableClick = true;
    gameStatus[id-1] = 2;
    if ((gameStatus[0] ==2 && gameStatus[1] ==2 && gameStatus[2] ==2)||
        (gameStatus[0] ==2 && gameStatus[3] ==2 && gameStatus[6] ==2)||
        (gameStatus[0] ==2 && gameStatus[4] ==2 && gameStatus[8] ==2)||
        (gameStatus[2] ==2 && gameStatus[5] ==2 && gameStatus[8] ==2)||
        (gameStatus[6] ==2 && gameStatus[7] ==2 && gameStatus[8] ==2)||
        (gameStatus[1] ==2 && gameStatus[4] ==2 && gameStatus[7] ==2)||
        (gameStatus[3] ==2 && gameStatus[4] ==2 && gameStatus[5] ==2)||
        (gameStatus[6] ==2 && gameStatus[7] ==2 && gameStatus[8] ==2)) {
            console.log("You Lose");
        }
})