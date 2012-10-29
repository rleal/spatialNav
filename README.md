This is a jQuery plugin that provides spatial navigation to a HTML web.

To define which elements will be navigables, adds a class 'navigable'. 
To define the behavior, you need to add data-tags to the html components that takes the focus. This behavior-tags catchs the key event and fires the function asigned to change focus. I write some auxiliar function that you can use.

Behavior tags: 
--------------
* data-keyDown
	catchs keydown event of down arrow key
* data-keyUp
	catchs keydown event of up arrow key
* data-keyLeft
	catchs keydown event of left arrow key
* data-keyRight
	catchs keydown event of right arrow key
* data-keyOk
	catchs keydown event of enter key

Note: some devices, like tv remote controlers, have the same keycodes as a keyboard. So you could use this code on webpages that will be on TV. However some video consoles pads fires the event with another keycode. Could be useful to refactor the code to accept any different keymaps.

Functions:
----------
* goNext()
	switchs focus to the next element at same lelvel in DOM. 
* goPrev()
	switchs focus to the next element at same lelvel in DOM. 
* goTo(element)
	switchs focus to element. (css notation). Ex: goTo('#search input')
* doOk(element)
	fires click event on element (css notation). Ex: doOk('#search a.btn')


When an element takes the focus the script adds the class 'sn-selected'.


To load the script you can write on your webpage: 

	$(document).ready(function() {
	    $(".navigable").spatialNav(); 
	})

Live demo: http://cineclick.com/sw/movies 