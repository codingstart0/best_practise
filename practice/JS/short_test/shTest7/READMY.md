#Active learning: A simple calendar
In this example, you are going to help us finish a simple calendar application. In the code you've got:

- A <select> element to allow the user to choose between different months.
- An onchange event handler to detect when the value selected in the <select> menu is changed.
- A function called createCalendar() that draws the calendar and displays the correct month in the h1 element.

We need you to write a conditional statement inside the onchange handler function, just below the // ADD CONDITIONAL HERE comment. It should:

1. Look at the selected month (stored in the choice variable. This will be the <select> element value after the value changes, so "January" for example.)
2. Set a variable called days to be equal to the number of days in the selected month. To do this you'll have to look up the number of days in each month of the year. You can ignore leap years for the purposes of this example.

#Hints:

- You are advised to use logical OR to group multiple months together into a single condition; many of them share the same number of days.
- Think about which number of days is the most common, and use that as a default value.
