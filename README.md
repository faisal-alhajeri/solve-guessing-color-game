# <a href="https://solve-guessing-color-game.herokuapp.com/">Color Guessing Game</a>
## What is color guessing game
color guessing game is a 2 player game where first player will choose 5 colors in a pattern and the second player will try to guess it.
<br>
The game will be played in rounds. Every round player 2 will guess the pattern, and player 1 will replay to his guess with teh following rules:
<br>
1- <span style='color:red'>Red</span> dot for every color that have right place and right color
<br>
2- <span>white</span> dot for every color that have wrong place but right color
<br>
2- empty dot for every color that have wrong place and wrong color
<br>
then player 2 will make another guess depening on the response of player 1
<br>
for example:
player 1 chooses his pattern as (Purple, Blue, Black, Purple, Green)<br>
Player 2 guesse (Purple, White, White, Black, Yellow)<br>
player 1 respond with (Red, White, empty, empty, empty)<br>
Player 2 guess another guess <br>
Player 1 responds with appropriate answer <br>


## How is the application able to solve it?
color guessing application will use AI to determine what is the best next guess, and will eliminate impossible guesses


## How to use the application?
Player 2 will be the only one using the application.<br>
guess will be inserted in the right holes><br>
guess result will be inserted in the left holes (leave empty if not Red or White)<br>
Note: this game is best designed for labtops and desktops, where in mobiles it will have bad interface but still working logic.
