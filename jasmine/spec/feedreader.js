/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        // Verifies all feeds have a url that isn't null
         it('have a url', function() {
            for (var i = 0; i < allFeeds.length; i++) {
                expect('url' in allFeeds[i]).toBeTruthy();
                expect(allFeeds[i].url).not.toBeNull();
                expect(allFeeds[i].url.length > 1).toBeTruthy();
                // Make sure the url is a string, not an object
                expect((typeof allFeeds[i].url) === 'string').toBeTruthy();
            }
            // Apparently we need to do this or for some reason 
            // it thinks there are no expectations, causing the test
            // to work but spit out a weird warning.
            expect(true).toBe(true);
         });


        // Verifies that all feeds have a name
        it('have a name', function() {
            for (var i = 0; i < allFeeds.length; i++) {
                expect('name' in allFeeds[i]).toBeTruthy();
                expect(allFeeds[i].name).not.toBeNull();
                expect(allFeeds[i].name.length > 1).toBeTruthy();
                // Make sure the name is a string, not an object
                expect((typeof allFeeds[i].name) === 'string').toBeTruthy();
            }
            // Apparently we need to do this or for some reason 
            // it thinks there are no expectations, causing the test
            // to work but spit out a weird warning.
            expect(true).toBe(true);
         });

    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The Menu', function() {
        function parseMatrix(_str) {
            return _str.replace(/^matrix(3d)?\((.*)\)$/,'$2').split(/, /);
        }

        /* We're getting transform3d of the css on the menu
         * Once we have that, we take the matrix we get and change it
         * into an array.  Then we check the array entries.
         * There's probably a better way to do this, and I'd really love 
         * to know what it is?
         * I thought about just testing existence of the menu-hidden class
         * but decided that didn't really show if it was hidden, just that 
         * it had the class.  That would have been easier.
         */
        it('is hidden by default', function() {
            var menu = document.getElementsByClassName('menu')[0];
            var style = window.getComputedStyle(menu, null);
            var transform = style.getPropertyValue('transform');
            var matrixArray = parseMatrix(transform);
            expect(matrixArray[4] < 0).toBeTruthy();
        });


         /* Checking that the menu-hidden class is there to start
          * and that we remove it when we click the menu-icon-link class
          * and put it back when we click that class again
          */
        body = document.body;
        it('toggles visibility when clicked', function() {
            console.log();
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).not.toBeTruthy();
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
        });

    });

    describe('Initial Entries', function() {
        beforeEach(function(done) {
            loadFeed(0,function() {
                done();
            });
        });

        // Check to verify that after feeds load, there's at least
        // one entry on the page.
        it('at least one feed exists', function(done) {
            expect(document.getElementsByClassName('entry').length > 0).toBeTruthy();
            // I keep getting told this done() isn't needed, but if I don't have it
            // I get the error as follows:
            // Error: Timeout - Async callback was not invoked within timeout specified by jasmine.DEFAULT_TIMEOUT_INTERVAL.
            done();
        });

    });

    describe('New Feed Selection', function() {
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        var content, newContent;
        beforeEach(function(done) { 
            loadFeed(0,function() {
                content = $('.feed').html();
                loadFeed(1,function() {
                    newContent = $('.feed').html();
                    done();
                });
            });
        });

        /* I'm not really sure by the TODO whether it means that 
         * this should run after every single feed loads, or 
         * after all of the feeds are done loading?
         */
        it('should have loaded content', function(done) {
            expect(content).not.toBe(newContent);
            // I keep getting told this done() isn't needed, but if I don't have it
            // I get the error as follows:
            // Error: Timeout - Async callback was not invoked within timeout specified by jasmine.DEFAULT_TIMEOUT_INTERVAL.
            done();
        });
     });

}());
