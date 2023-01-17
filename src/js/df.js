$(function() {
    /* Smooth scroll and scrollspy */
    // Cache selectors
    var lastId;
    var mainNav = $('#mainNav');
    var $window = $(window);
    var menuItems = mainNav.find('a');
    var menuAnchors = menuItems.map(function() {
        var item = $($(this).attr('href'));
        if (item.length) { return item; }
    });
    // Bind click handler to menu items
    menuItems.click(function(event){

        event.preventDefault();

        var hash = this.hash;
        var currentPosition = $window.scrollTop();
        var targetPosition = $(hash).offset().top;
        var distance = Math.abs(currentPosition - targetPosition);
        var duration = distance / $window.height() * 200;

        $('html, body').animate({
            scrollTop: targetPosition
        }, duration, function(){
            window.location.hash = hash;
        });
    });
    // Bind to scroll
    $window.scroll(function(){
        // Get container scroll position
        var currentPosition = $(this).scrollTop();
        // Get id of current scroll item
        var currentAnchor = menuAnchors.map(function(){
            if ($(this).offset().top <= currentPosition + 8)
            return this;
        });
        // Get the id of the current element
        currentAnchor = currentAnchor[currentAnchor.length-1];
        var id = currentAnchor && currentAnchor.length ? currentAnchor[0].id : "";

        if (lastId !== id) {
            lastId = id;
            // Set/remove active class
            menuItems
                .parent().removeClass("active")
                .end().filter("[href='#"+id+"']").parent().addClass("active");
        }
    });

    /* Priority Navigation */
    var $btn = $('#mainNav button');
    var $horizontalNav = $('#mainNav .horizontal');
    var $verticalNav = $('#mainNav .vertical');
    var numOfItems = 0;
    var totalSpace = 0;
    var closingTime = 600;
    var breakWidths = [];

    // Get initial state
    $horizontalNav.children().outerWidth(function(i, w) {
        totalSpace += w;
        numOfItems += 1;
        breakWidths.push(totalSpace);
    });

    var availableSpace, numOfVisibleItems, requiredSpace, timer;

    function checkNav() {
        // Get instant state
        availableSpace = $horizontalNav.width() - 1;
        numOfVisibleItems = $horizontalNav.children().length;
        requiredSpace = breakWidths[numOfVisibleItems - 1];

        // There is not enough space
        if (requiredSpace > availableSpace) {
            $horizontalNav.children().last().prependTo($verticalNav);
            numOfVisibleItems -= 1;
            checkNav();
            // There is more than enough space
        } else if (availableSpace > breakWidths[numOfVisibleItems]) {
            $verticalNav.children().first().appendTo($horizontalNav);
            numOfVisibleItems += 1;
            checkNav();
        }
        // Update the button accordingly
        $btn.attr("data-count", numOfItems - numOfVisibleItems);
        if (numOfVisibleItems === numOfItems) {
            $btn.addClass('hidden');
        } else {
            $btn.removeClass('hidden');
        }
    }

    // Window listeners
    $window.resize(function() {
        checkNav();
    });

    $btn.on('click', function() {
        $verticalNav.toggleClass('hidden');
        clearTimeout(timer);
    });

    $verticalNav.on('mouseleave', function() {
        // Mouse has left, start the timer
        timer = setTimeout(function() {
            $verticalNav.addClass('hidden');
        }, closingTime);
    }).on('mouseenter', function() {
        // Mouse is back, cancel the timer
        clearTimeout(timer);
    });

    checkNav();

    /* sliders */
    $('.slides').each(function(){
        var $this = $(this);
        var items = $this.children('li').length;
        if (items > 1) {
            var arrows = '<span class="previous hidden"><img src="dist/img/icons/previous.svg" alt="previous"></span>';
            arrows += '<span class="next"><img src="dist/img/icons/next.svg" alt="next"></span>';
            var indicators = '<div class="indicators">';
            indicators += '<span role="button" data-position="0" class="active"></span>';
            for(i = 1; i < items; i++) {
                indicators += '<span role="button" data-position="-' + i * 100 + 'vw"></span>';
            }
            indicators += "</div>";
            $this.css('width', items * 100 + 'vw').before(arrows + indicators);
        }
    });

    function goToSlide(slide){
        var $slide = $(slide);
        var previous = $slide.closest('.slider').children('.previous');
        var next = $slide.closest('.slider').children('.next');

        $slide.addClass('active')
              .siblings()
              .removeClass('active')
              .parent()
              .next('.slides')
              .css('left', $slide.attr('data-position'));

        previous.removeClass('hidden');
        next.removeClass('hidden');
        if ($slide.is(':first-child')) {
            previous.addClass('hidden');
        } else if ($slide.is(':last-child')) {
            next.addClass('hidden');
        }
    }

    $('.indicators span').click(function(){
        goToSlide(this);
    });

    $('.next').click(function(){
        $this = $(this);
        var indicators = $this.nextAll('.indicators');
        var slide = indicators.first().children('.active').next();
        if (slide.is(':last-child')) {
            $this.addClass('hidden');
        }
        goToSlide(slide);
        $this.prev().removeClass('hidden');
    });

    $('.previous').click(function(){
        $this = $(this);
        var indicators = $this.nextAll('.indicators');
        var slide = indicators.first().children('.active').prev();
        if (slide.is(':first-child')) {
            $this.addClass('hidden');
        }
        goToSlide(slide);
        $this.next().removeClass('hidden');
    });


    $('#oldBrowser button').click(function(){
        $('#oldBrowser').addClass('hidden');
    });

}(jQuery));
