Rationale when conducting tests

In this project, I conducted a series of happy path testings through cypress. These tests are written in:
    ~/ass3/frontend/cypress/e2e/ui-tests/ui_tests.cy.js .

These tests are only assessed by observing the UI output.

In my tests I intended on testing all the features of AirBrb that I have implemented:
    1. Registering an account
    2. Logging In
    3. Signing out
    4. Creating a Listing
    5. Deleting a Listing
    6. Editing a Listings
    7. Being able to view listings in the home page
    8. Searching for a Listing
    9. Being able to view your own listings in the my listing page
    10. Publishing a listing
    11. Unpublishing a listing.

Accordingly the I wrote 6 tests that cover all these features:
    1. Signup
    2. Login and logout
    3. Creating new listing and deleting it
    4. Searching for a listing and deleting it
    5. Searching for a listing, editing and deleting it
    6. Finding Listing in My Listings, publishing, unpublishing it and deleting it

In creating my listings, I just gave it a title of just one character, as that is the only necessary detail when further testing the editing/searching/deleting features of the listing.

For test 2, I decided to test both the logging in and signing out features in the same test because I knew that, without logging in, it would be impossible to sign out. Thus, being able to sign out was a sign that the logging in process was successful. Moreover, the "create new listing" button only appears for signed in users, thus I tested if that button was visible when logged in and not visible when the user was not logged in.

Similarly for tests 3, I used the same logic to both create and delete the listing in one test as I deduced that deleting is only possible once the listing was created. For test 4, I also deduced that deleting is a method of testing whether the search bar was useful in searching for the listing.

For test 5, I deduced that being able to search for the listing under its new name is a method of testing whether the edit feature was implemented correctly. I finished the testing by deleting it by using the same logic from test 4 where the test for whether the search bar was successful was the ability to delete after searching.

In test 6, I decided to check if the My Listings page would display the user's listings. So after creating a listing. I navigated my way to the My Listings page. Accordingly, if the listing was indeed belonging to the user, they should be able to publish it. Thus the ability of publishing the listing was a test whether the listing did indeed appear on that page. Furthermore, to test whether the listing was published, we should be able to unpublish it. Thus, I published then unpublished the listing. I finally deleted it to see if the listing did not disappear from the page throughout the entire process.