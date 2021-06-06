Scene Object depth management.
============================================================
PRELOAD
============================================================
DEPTH 0:    Background1
DEPTH 1:    Background2
DEPTH 2:    BarBackground2, Text_Loading_Frame, Update_Background
DEPTH 3:    BarBackground1, Text_Loading, Text_Update
DEPTH 4:    Bar
DEPTH 5:    Blackscreen
============================================================
ROOM EAST
============================================================
DEPTH 0:    Room Background
DEPTH 1:    Objects that are behind the player.
DEPTH 2:    Player
DEPTH 3:    Objects that are infront of the player.
DEPTH 4     Transition screens (Blackscreen, Redscreen).

============================================================
ROOM WEST
============================================================
DEPTH 0:    Room Background
DEPTH 1:    Buttons
DEPTH 2:    Objects that are behind the player.
DEPTH 3:    Player.
DEPTH 4:    Objects that are infront of the player.
DEPTH 5:    Transition screens (Blackscreen, Redscreen).

============================================================
ROOM NORTHEAST
============================================================
DEPTH 0:    Base Room Background
DEPTH 1:    Items behind player
DEPTH 2:    Player
DEPTH 3:    Objects that are infront of the player at the moment.
DEPTH 4:    Objects that are ALWAYS infront of the player.

============================================================
ROOM MAIN
============================================================
DEPTH 0:    Base Room Background
DEPTH 1:    All doors other than the southern one.
DEPTH 2:    Room background 3
DEPTH 3:    Pylon when behind the player.
DEPTH 4:    Player
DEPTH 5:    South door (If open), Pylon when infront of the player
DEPTH 6:    Room background 2