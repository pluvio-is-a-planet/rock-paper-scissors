# rock-paper-scissors

This is a fairly simple web-based rock, paper, scissors game, that I
created for the "Rock, Paper, Scissors" project from The Odin Project's
Fundamentals course.

It features a UI for the player to choose between rock, paper, and
scissors.

It also features some functionality that allows the CPU to make 'smart'
choices by randomly picking a strategy, aggressive, defensive, counter,
or random. The CPU then calls the corresponding function to the chosen
strategy, and then makes it's choice based on the player's previous
choices. The CPU does also have a way of breaking out of a 'tie loop',
where there has been 2 or more consecutive ties, by always choosing to
play either aggressive or randomly in such a situation.

Planned features/updates:
 - GUI update