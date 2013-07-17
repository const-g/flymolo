/**
 * Functionality specific to Twenty Thirteen.
 *
 * Provides helper functions to enhance the theme experience.
 */

( function( $ ) {
	var html               = $( 'html' ),
	    body               = $( 'body' ),
	    _window            = $( window ),
	    captions           = $( '.quote-caption' ),
	    adjustFooter,

	/**
	 * Adds a top margin to the footer if the sidebar widget area is
	 * higher than the rest of the page, to help the footer always
	 * visually clear the sidebar.
	 */
	adjustFooter = function() {
		var sidebar   = $( '#secondary .widget-area' ),
		    secondary = ( 0 == sidebar.length ) ? -40 : sidebar.height(),
		    margin    = $( '#tertiary .widget-area' ).height() - $( '#content' ).height() - secondary;

		if ( margin > 0 && _window.innerWidth() > 999 )
			$( '#colophon' ).css( 'margin-top', margin + 'px' );
	};

	$( function() {
		if ( body.is( '.sidebar' ) )
			adjustFooter();
	} );

	/**
	 * Enables menu toggle for small screens.
	 */
	( function() {
		var nav = $( '#site-navigation' ), button, menu;
		if ( ! nav )
			return;

		button = nav.find( '.menu-toggle' );
		menu   = nav.find( '.nav-menu' );
		if ( ! button )
			return;

		// Hide button if menu is missing or empty.
		if ( ! menu || ! menu.children().length ) {
			button.hide();
			return;
		}

		$( '.menu-toggle' ).on( 'click.twentythirteen', function() {
			nav.toggleClass( 'toggled-on' );
		} );
	} )();

	/**
	 * Makes "skip to content" link work correctly in IE9 and Chrome for better
	 * accessibility.
	 *
	 * @link http://www.nczonline.net/blog/2013/01/15/fixing-skip-to-content-links/
	 */
	_window.on( 'hashchange.twentythirteen', function() {
		var element = document.getElementById( location.hash.substring( 1 ) );

		if ( element ) {
			if ( ! /^(?:a|select|input|button|textarea)$/i.test( element.tagName ) )
				element.tabIndex = -1;

			element.focus();
		}
	} );

	/** Better styles for Quote post formats with a linked source.
	 *
	 */
	if ( captions )
		captions.has( 'a' ).addClass( 'linked' );

	/**
	 * Arranges footer widgets vertically.
	 */
	if ( $.isFunction( $.fn.masonry ) ) {
		var columnWidth = body.is( '.sidebar' ) ? 228 : 245;

		$( '#secondary .widget-area' ).masonry( {
			itemSelector: '.widget',
			columnWidth: columnWidth,
			gutterWidth: 20,
			isRTL: body.is( '.rtl' )
		} );
	}
} )( jQuery );