

$(document).ready(function() {

	$(window).on('action:ajaxify.end', function(ev, data) {
		if (app.template === 'category' && app.user.uid) {
			var unsubscribeHtml = '<button type="button" class="btn btn-default btn-warning unsubscribe"><i class="fa fa-pencil"></i>取消订阅</button>';
			var subscribeHtml = '<button type="button" class="btn btn-default btn-success subscribe"><i class="fa fa-pencil"></i>订阅</button>';

			var cid = ajaxify.data.cid;
			socket.emit('plugins.categoryNotifications.isSubscribed', {cid: cid}, function(err, isSubscribed) {
				if (err) {
					return app.alertError(err.message);
				}

				var btn = isSubscribed ? $(unsubscribeHtml) : $(subscribeHtml);

				$('[component="category/controls"]').prepend(btn);

				$('.category').on('click', '.subscribe', function() {
					socket.emit('plugins.categoryNotifications.subscribe', {cid: cid}, function(err) {
						if (err) {
							return app.alertError(err.message);
						}
						$('.subscribe').replaceWith($(unsubscribeHtml));
					});
				});

				$('.category').on('click', '.unsubscribe', function() {
					socket.emit('plugins.categoryNotifications.unsubscribe', {cid: cid}, function(err) {
						if (err) {
							return app.alertError(err.message);
						}
						$('.unsubscribe').replaceWith($(subscribeHtml));
					});
				});
			});
		}
	});


});