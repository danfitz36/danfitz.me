$(function() {
  'use strict';
  //Bootstrap initialization
  $('[data-toggle="popover"]').popover();
  $('[data-toggle="tooltip"]').tooltip();

  //ripple initialization
  //$('.btn, .nav a').ripple({ color: 'rgba(255,255,255,0.5)' });

  //custom additions
  $('.dropdown-menu.keep-open').on('click', function(event) {
    event.stopPropagation();
  });

  //iframe modal
  var $button,
      page,
      title,
      size,
      modalClass,
      $modal;

  $('#iframeModal').on('show.bs.modal', function(event) {

    $button = $(event.relatedTarget);
    page = $button.data('url');
    title = $button.data('title');
    size = $button.data('size');
    modalClass = $button.data('modal-class');
    $modal = $(this);

    $modal.find('.modal-title:first').text(title);
    $modal.find('.modal-dialog:first').addClass(size)
          .find('.modal-body:first').addClass(modalClass + ' brand-loader')
          .find('.modal-iframe:first').hide().attr('src', page).on('load', function() {
      if (page.length) {
        $(this).show().parent().removeClass('brand-loader');
      }
    });

  }).on('hidden.bs.modal', function(event) {

    $modal = $(this);

    $modal.find('.modal-title:first').text('');
    $modal.find('.modal-dialog:first').removeClass(size)
          .find('.modal-body:first').removeClass('brand-loader').removeClass(modalClass)
          .find('.modal-iframe:first').attr('src', '').hide();

    page = '';
    title = '';
    size = '';
    modalClass = '';

  });
});
