const player = "O";
const computer = "X";

let board_full = false;
let play_board = ["", "", "", "", "", "", "", "", ""];

const board_container = document.querySelector(".play-area");
const winner_statement = document.getElementById("winner");

const check_board_complete = () => {
 let flag = true;
 play_board.forEach(element => {
  if (element !== player && element !== computer) {
   flag = false;
  }
 });
 board_full = flag;
};

const check_line = (a, b, c) => {
 return (
  play_board[a] === play_board[b] &&
  play_board[b] === play_board[c] &&
  (play_board[a] === player || play_board[a] == computer)
  );
};

const check_match = () => {
 for (let i = 0; i < 9; i += 3) {
  if (check_line(i, i + 1, i + 2)) {
   document.querySelector(`#block_${i}`).classList.add("win");
   document.querySelector(`#block_${i + 1}`).classList.add("win");
   document.querySelector(`#block_${i + 2}`).classList.add("win");
   return play_board[i];
  }
 }
 
 for (let i = 0; i < 3; i++) {
  if (check_line(i, i + 3, i + 6)) {
  document.querySelector(`#block_${i}`).classList.add("win");
  document.querySelector(`#block_${i + 3}`).classList.add("win");
  document.querySelector(`#block_${i + 6}`).classList.add("win");
  return play_board[i];
 }
}
 
if (check_line(0, 4, 8)) {
 document.querySelector(`#block_0`).classList.add("win");
 document.querySelector(`#block_4`).classList.add("win");
 document.querySelector(`#block_8`).classList.add("win");
 return play_board[0];
}
 
if (check_line(2, 4, 6)) {
 document.querySelector(`#block_2`).classList.add("win");
 document.querySelector(`#block_4`).classList.add("win");
 document.querySelector(`#block_6`).classList.add("win");
 return play_board[2];
}
 
return "";
};

const check_for_winner = () => {
 let res = check_match();
 if (res === player) {
  winner_statement.innerText = "Winner is Player";
  winner_statement.classList.add("playerWin");
  board_full = true;
 } else if (res === computer) {
  winner_statement.innerText = "Winner is computer";
  winner_statement.classList.add("computerWin");
  board_full = true;
 } else {
  check_board_complete();
  if (board_full) {
  winner_statement.innerText = "It's a Tie";
  winner_statement.classList.add("tie");
  }
 }
};

const player_click = (index) => {
 if (play_board[index] === "" && !board_full) {
  play_board[index] = player;

  const block = document.querySelector(`#block_${index}`);
  block.innerText = player;
  block.classList.add("occupied");

  check_for_winner();
  if (!board_full) {
  setTimeout(computer_turn, 400);
  }
 }
};

const computer_turn = () => {
 if (board_full) return;

 let empty_cells = [];
 play_board.forEach((val, idx) => {
  if (val === "") empty_cells.push(idx);
 });

 if (empty_cells.length > 0) {
  const random_idx = empty_cells[Math.floor(Math.random() * empty_cells.lenght)];
  play_board[random_idx] = computer;

  const block = document.querySelector(`#block_${random_idx}`);
  block.innerText = computer;
  block.classList.add("occupied");

  check_for_winner();
 }
};

const reset_board = () => {
 play_board = ["", "", "", "", "", "", "", "", ""];
 board_full = false;
 winner_statement.innerText = "";
 winner_statement.className = "";

 play_board.forEach((_, index) => {
 const block = document.querySelector(`#block_${index}`);
 if (block) {
  block.innerText = "";
  block.classList.remove("win", "occupied");
 }
 });
};

play_board.forEach((_, index) => {
 const block = document.querySelector(`#block_${index}`);
 if (block) {
  block.addEventListener("click", () => player_click(index));
 }
});

                         
                         
