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
    }
}
socket.on("clicked", (id) => {
    const element = document.getElementById(id);
    element.innerHTML = OtherClick;
    element.onclick = null;
    enableClick = true;
})