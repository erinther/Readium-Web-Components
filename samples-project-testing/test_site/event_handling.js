RJSDemoApp.applyToolbarHandlers = function () {

    // Library panel
    $("#toc-btn").off("click");
    $("#library-btn").on("click", function () {
        RJSDemoApp.toggleLibraryPanel();
    });

    // TOC
    $("#toc-btn").off("click");
    $("#toc-btn").on("click", function () {
        RJSDemoApp.toggleTOCPanel();
    });

	// Decrease font size
	(function() {
		var $decreaseFont = $("#decrease-font-btn");

		$decreaseFont.off("click");
		$decreaseFont.on("click", function() {
			var settings = RJSDemoApp.epubViewer.getViewerSettings()
			RJSDemoApp.epubViewer.setFontSize(settings.fontSize - 2);
		});
	})();

	// Increase font size
	(function() {
		var $increaseFont = $("#increase-font-btn");

		$increaseFont.off("click");
		$increaseFont.on("click", function() {
			var settings = RJSDemoApp.epubViewer.getViewerSettings()
			RJSDemoApp.epubViewer.setFontSize(settings.fontSize + 2);
		});
	})();

    // Prev
    // Remove any existing click handlers
    $("#previous-page-btn").off("click");
    $("#previous-page-btn").on("click", function () {

        if (RJSDemoApp.epub.pageProgressionDirection() === "rtl") {
            RJSDemoApp.epubViewer.nextPage(function () {
                console.log("the page turned");
            });
        }
        else {
            href = e.currentTarget.attributes["href"].value;
        }

        // It's a CFI
        if (href.match("epubcfi")) {

            href = href.trim();
            splitHref = href.split("#");

            // RJSDemoApp.epubViewer.showPageByCFI(splitHref[1], function () {
            //     console.log("Showed the page using a CFI");
            // }, this);
        }
        // It's a regular id
        else {

            // Get the hash id if it exists
            href = href.trim();
            splitHref = href.split("#");

            spineIndex = RJSDemoApp.epub.getSpineIndexByHref(href);
            if (splitHref[1] === undefined) {
                // RJSDemoApp.epubViewer.showSpineItem(spineIndex, function () {
                //     console.log("Spine index shown: " + splitHref[0]);
                // });
            }
            else {
                // RJSDemoApp.epubViewer.showPageByElementId(spineIndex, splitHref[1], function () {
                //     console.log("Page shown: href: " + splitHref[0] + " & hash id: " + splitHref[1]);
                // });
            }
        }
    };

    RJSDemoApp.tocLinkClicked = function (e) {

        RJSDemoApp.epubLinkClicked(e);
    };

    RJSDemoApp.toggleLibraryPanel = function () {

        if (RJSDemoApp.viewerPreferences.libraryIsVisible) {
            $("#library-panel").hide();
            RJSDemoApp.viewerPreferences.libraryIsVisible = false;
        }
        else {
            $("#toc-panel").hide();
            $("#library-panel").show();
            RJSDemoApp.viewerPreferences.tocIsVisible = false;
            RJSDemoApp.viewerPreferences.libraryIsVisible = true;
        }
    };

    RJSDemoApp.toggleTOCPanel = function () {

        if (RJSDemoApp.viewerPreferences.tocIsVisible) {
            $("#toc-panel").hide();
            RJSDemoApp.viewerPreferences.tocIsVisible = false;
        }
        else {
            $("#library-panel").hide();
            $("#toc-panel").show();
            RJSDemoApp.viewerPreferences.tocIsVisible = true;
            RJSDemoApp.viewerPreferences.libraryIsVisible = false;
        }
    };

    RJSDemoApp.toggleLayout = function () {

        if (RJSDemoApp.viewerPreferences.syntheticLayout) {
            RJSDemoApp.epubViewer.updateSettings({ "isSyntheticSpread" : false });
            RJSDemoApp.viewerPreferences.syntheticLayout = false;
        }
        else {
            RJSDemoApp.epubViewer.updateSettings({ "isSyntheticSpread" : true });
            RJSDemoApp.viewerPreferences.syntheticLayout = true;
        }
    };

    return RJSDemoApp;
});
