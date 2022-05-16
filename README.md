           Text

Console.WriteLine( "\u001b[1;31m Red message" );
Console.WriteLine( "\u001b[1;32m Green message" );
Console.WriteLine( "\u001b[1;33m Yellow message" );
Console.WriteLine( "\u001b[1;34m Blue message" );
Console.WriteLine( "\u001b[1;35m Purple message" );
Console.WriteLine( "\u001b[1;36m Cyan message" );

Background

Console.WriteLine( "\u001b[1;41m Red background" );
Console.WriteLine( "\u001b[1;42m Green background" );
Console.WriteLine( "\u001b[1;43m Yellow background" );
Console.WriteLine( "\u001b[1;44m Blue background" );
Console.WriteLine( "\u001b[1;45m Purple background" );
Console.WriteLine( "\u001b[1;46m Cyan background" );

Reset

Console.WriteLine( "\u001b[0m Reset text and background color/style to default" );

Example

Console.WriteLine( "\u001b[1;31m --process: Error" + "\u001b[0m" );