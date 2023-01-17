(function(){
    'use strict';
    $(window).scroll(function() {
        var currentPosition = $(this).scrollTop();
        $('.container > div[id]').each(function() {
            var top = $(this).offset().top;
            if (currentPosition >= top) {
                var link = $('#navbar-main a[href="#' + this.id + '"]');
                link.parent().addClass('active').siblings().removeClass('active');
            }
        });
    });
    $('a[href^="#"]').on('click',function (e) {
        e.preventDefault();

        var target = this.hash;
        var $target = $(target);

        $('html, body').stop().animate({
            'scrollTop': $target.offset().top
        }, 900, 'swing', function () {
            window.location.hash = target;
        });
    });
    $('.navbar a').on('click', function(){
        $('.navbar').find('.active').removeClass('active');
        $(this).parent().addClass('active');
    });
    var $button = $('#source-button').click(function(){
        var html = $(this).parent().html();
        html = cleanSource(html);
        $('#source-modal pre').text(html);
        $('#source-modal').modal();
    });
    $('.bs-component').hover(function(){
        $(this).append($button);
        $button.show();
    }, function(){
        $button.hide();
    });
    function cleanSource(html) {
        var lines = html.split(/\n/);
        lines.shift();
        lines.splice(-1, 1);
        var indentSize = lines[0].length - lines[0].trim().length,
        re = new RegExp(' {' + indentSize + '}');
        lines = lines.map(function(line){
            if (line.match(re)) {
                line = line.substring(indentSize);
            }
            return line;
        });
        lines = lines.join('\n');
        return lines;
    }

    //display all icons
    var iconArray = [
      'add-circle-outline',
      'add-circle',
      'add',
      'attachment',
      'back-more',
      'back',
      'blank',
      'bullet',
      'calendar',
      'campaign-email',
      'cancel',
      'check',
      'circle-outline',
      'clock',
      'close-circle-outline',
      'close-circle',
      'close',
      'collapse-outline',
      'collapse',
      'comment-add',
      'comment',
      'contact-internal',
      'copy',
      'down',
      'edit',
      'education',
      'expand-outline',
      'expand-panel',
      'expand',
      'expired',
      'external',
      'filter',
      'forward-more',
      'forward',
      'globe-outline',
      'globe',
      'graph',
      'grid',
      'grip',
      'grow',
      'history',
      'import',
      'info-outline',
      'info',
      'job-email',
      'link',
      'list',
      'loader',
      'location-outline',
      'location',
      'lock',
      'mail',
      'menu',
      'mobile',
      'money',
      'notes',
      'people',
      'phone',
      'pin',
      'play',
      'print',
      'promote',
      'referral',
      'refresh',
      'resume-add',
      'resume',
      'search',
      'shrink',
      'skills',
      'sponsor',
      'star-half',
      'star-outline',
      'star',
      'status-ats',
      'status-event',
      'status-job',
      'status-list',
      'status',
      'subtract-circle-outline',
      'subtract-circle',
      'subtract',
      'system-note',
      'tag-outline',
      'tag',
      'tracking-link',
      'trash',
      'tutorial',
      'unchecked',
      'unlock',
      'up',
      'user',
      'users',
      'video',
      'warning-outline',
      'warning',
      'workflow',
      'campaigns',
      'companies',
      'configure',
      'contacts',
      'events',
      'home-outline',
      'home',
      'jobs',
      'profile',
      'reports',
      'schools',
      'sign-in',
      'sign-out',
      'task',
      'line-chart',
      'bank',
      'coffee',
      'cutlery',
      'drinks',
      'gamepad',
      'grill',
      'guitar-outline',
      'guitar',
      'health',
      'heartbeat',
      'insurance',
      'plane',
      'vacation',
      'apple',
      'blog',
      'chrome',
      'explorer',
      'facebook',
      'firefox',
      'google-plus',
      'google',
      'linkedin',
      'opera',
      'outlook',
      'safari',
      'skype',
      'smashfly',
      'twitter',
      'windows',
      'yahoo',
      'youtube'
    ];
    var $iconList = $('ul.icon-list');
    $.each(iconArray, function(i,icon) {
        var $li = $('<li/>').addClass('well').attr('title', 'sfi-' + icon).attr('data-toggle','tooltip').appendTo($iconList);
        var $i = $('<i/>').addClass('sfi-' + icon).appendTo($li);
    });
})();
