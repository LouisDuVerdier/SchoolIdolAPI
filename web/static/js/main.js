
function getInterfaceColor() {
    return $('body').attr('class').replace('interface-', '');
}

function freeModal(title, body, buttons) {
    $('#freeModal .modal-header h4').html(title);
    $('#freeModal .modal-body').html(body);
    $('#freeModal .modal-footer').html('<button type="button" class="btn btn-Smile" data-dismiss="modal">Go</button>');
    if (buttons === 0) {
	$('#freeModal .modal-footer').hide();
    } else if (typeof buttons != 'undefined') {
	$('#freeModal .modal-footer').html(buttons);
	$('#freeModal .modal-footer').show();
    }
    $('#freeModal').modal('show');
}

function globalModal(hash) {
    if (hash == 'donate') {
	window.location.href = "/donate/";
	return;
    }
    $.get('/ajax/modal/' + hash +
	  '/?interfaceColor=' + getInterfaceColor(), function(data) {
	      $('#modal .modal-content').html(data);
	      $('#modal').modal('show');
	      modalHandler();
	  });
}

function avatarStatus() {
    $('.avatar_wrapper').each(function() {
	if (typeof $(this).attr('data-user-status') != 'undefined') {
	    $(this).popover({
		title: '<span style="color: ' + $(this).css('color') + '">' + $(this).attr('data-user-status') + '</span>',
		content: '<small style="color: #333">School Idol Tomodachi Donator</small>',
		html: true,
		placement: 'bottom',
		trigger: 'hover',
	    });
	}
    });
}

function modalHandler() {
    $('[data-toggle=ajaxmodal]').click(function(e) {
	e.preventDefault();
	globalModal($(this).attr('href').replace('#', '').replace('Modal', ''));
    });
}

$(document).ready(function() {
    var hash = window.location.hash.substring(1);
    if (hash.indexOf("Modal") >= 0) {
	globalModal(hash.replace('Modal', ''));
    }

    modalHandler();

    $('.switchLanguage').click(function(e) {
	e.preventDefault();
	$('#switchLanguage').find('select').val($(this).attr('data-lang'));
	$('#switchLanguage').submit();
    });

    avatarStatus();
});

var disqus_developer = 1;
var disqus_shortname = 'schoolidol';
(function () {
    var s = document.createElement('script'); s.async = true;
    s.type = 'text/javascript';
      s.src = '//' + disqus_shortname + '.disqus.com/count.js';
    (document.getElementsByTagName('HEAD')[0] || document.getElementsByTagName('BODY')[0]).appendChild(s);
}());
