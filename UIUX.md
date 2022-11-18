UIUX Notes

In designing the UIUX of this AirBrb project, I took heavy inspiration from the AirBnb website.

The core structure of the website involved a navigation bar at the top and contents below it.
The navigation bar contained the website logo, a search bar (with a button to execute the search), a "create new listing" button that only appears if the user is logged in and a menu button which created a dropdown list of buttons where the user can either:
    - log in or sign up (if not signed in already)
    - view their own listings or log out (if signed in already).

The website logo also acts as a button that directs the user to the website's homepage, being a complete list of listings, which are shown in a grid format, evenly spaced.

The homepage (all listings) and the My Listings page are both structured the same as they show a list of listings in an evenly spaced grid format. Each listing is presented as a card, which displays the main details of the listing: Title, Rating, number of beds and bathrooms, number of reviews and price per night. The card is divided into two parts, the dominant top part with a main action click function that directs the user to the listing's screenpage, and a bottom bar with action buttons. These action buttons include publishing, editing and deleting, functions exclusive to the owner of the listing, thus these action buttons would not appear for non-owners.

The register and login pages are just standard form pages with textinputs and a button to submit the form.

The create listing button would open up a dialogue that appears with a form to create a new listing. Most of the features already have input fields for each detail of the listing. However, for inputting bedrooms, the user can click a button to create a new bedroom. Each bedroom contains a series Stack components containing decrement and increment buttons, as well as text stating the number of each bed type: King, Queen, Double and Single. There is also a button to delete a bedroom. This is gives the user more flexibility to detail which beds are in which bedrooms.

The edit listing form is almost identical to the create listing form, except it appears as a separate screen and not in a dialogue.

The publishing form is similar to the bedroom details form where the user can add or delete availabilities and enter the date ranges.