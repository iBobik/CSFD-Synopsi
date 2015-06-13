// Load metedata from Synopsi film page
var name = $('#main h1 [itemprop="name"]').text().trim();
var year = parseInt($('#main h1 [itemprop="copyrightYear"]').text());

// Append ČSFD line to metadata on Synopsi film page
$('h3.titleinfo').append('<br><strong>ČSFD:</strong><span id="csfd-data">načítám ...</span>');

// Search on ČSFD
$.getJSON('http://csfdapi.cz/movie', {'search': name}, function (data) {
	$.each(data, function (index, item) {
		// Find first film with same year
		if (item.year == year) {
			// Query for full movie data
			$.getJSON('http://csfdapi.cz/movie/' + item.id, function (data) {
				// Put to metadata on Synopsi film page
				$('#csfd-data').html('<a href="' + data.csfd_url + '" target="_blank">' + data.names.cs + '</a> ' + data.rating + ' %');
			});
			return false;
		}
	});
});
