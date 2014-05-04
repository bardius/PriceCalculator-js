(function(BARDIS, $) {

	// Initializing configuration and settings
	BARDIS.config = {
		
		init: function() {

		}

	};
	

	/* Calculator module for the 'Your listed adverts' table 
	 * 
	 * Only one of the 'Featured Ad' checkboxes should be selectable per ad
	 * The checkboxes at the top of the table should act as global selectors for that column
	 * A running total should be displayed at the foot of the table and should always reflect the sum of the selected options
	 */
	BARDIS.managedAdsCalculator = {
		
		// Settings for the calculator
		totalCost:				0, // The total cost summary value
		totalCostText:			$('#running-total'), // The total cost element to display the value
		globalCheckboxesClass:	'global-checkboxes', // The class foe any mass select checkbox
		featuredAdClass:		'col_featured-ad', // The class for any featured-ad checkbox (this has unique row constraint)
		globalCheckboxes:		$('.global-checkboxes [type=checkbox]'), // The $ mass select elements
		featuredAdCheckboxes:	$('.col_featured-ad [type=checkbox]'), // The $ featured-ad elements
		adOptionsCheckboxes:	$('.col_ad-options [type=checkbox]'), // The $ ad-options elements
		priceCheckboxes:		$('.col_featured-ad [type=checkbox], .col_ad-options [type=checkbox]'), // The $ elements that have price to calculate as values

		// Initializing the calculator
		init: function() {

			// Calculate summary if checkboxes are selected on page load
			BARDIS.managedAdsCalculator.updateTotalCostOnInit();
			// Add the event listener and functionality for the mass select checkboxes
			BARDIS.managedAdsCalculator.startGlobalCheckboxes();
			// Add the event listeners and functionality for the featured ad checkboxes
			BARDIS.managedAdsCalculator.restictFeatureAd();
			// Add the event listener for the calculation of the total cost and display it
			BARDIS.managedAdsCalculator.listenTotalCost();

		},
				
				
		/* Add the event listener and functionality for the mass select checkboxes
		 * 
		 * Find the column index of the clicked mass select checkbox,
		 * alter the checked property of the desired elements,
		 * trigger the change event for those elements
		 * change the checked property of the mass select checkboxes when a cost checkbox is clicked
		 */
		startGlobalCheckboxes: function() {

			BARDIS.managedAdsCalculator.globalCheckboxes.on('click', function() {

				var columnNo = $(this).closest("td").index();

				if ($(this).is(":checked")) {
					var $targetedCheckboxes = $(this).closest("table").find("tr td:nth-child(" + (columnNo + 1) + ") [type=checkbox]").not("[type=checkbox]:checked");
					$targetedCheckboxes.prop('checked', true).change();
				}
				else {
					var $targetedCheckboxes = $(this).closest("table").find("tr td:nth-child(" + (columnNo + 1) + ") [type=checkbox]:checked");
					$targetedCheckboxes.prop('checked', false).change();
				}
			});

			BARDIS.managedAdsCalculator.featuredAdCheckboxes.on('click', function() {

				var $globalFeaturedCheckboxes = $(this).closest("table").find("." + BARDIS.managedAdsCalculator.globalCheckboxesClass + " ." + BARDIS.managedAdsCalculator.featuredAdClass + " [type=checkbox]:checked");

				if (!$(this).closest("tr").hasClass(BARDIS.managedAdsCalculator.globalCheckboxesClass)) {
					$globalFeaturedCheckboxes.prop('checked', false);
				}
			});

			BARDIS.managedAdsCalculator.adOptionsCheckboxes.on('click', function() {
				
				if (!$(this).is(":checked")) {
					var columnNo = $(this).closest("td").index();
					var $targetedCheckboxes = $(this).closest("table").find("." + BARDIS.managedAdsCalculator.globalCheckboxesClass + " td:nth-child(" + (columnNo + 1) + ") [type=checkbox]");
					
					if (!$(this).closest("tr").hasClass(BARDIS.managedAdsCalculator.globalCheckboxesClass)) {
						$targetedCheckboxes.prop('checked', false);
					}					
				}
			});

		},
				
				
		/* Add the event listeners and functionality for the featured ad checkboxes
		 * 
		 * Apply the contraint of only one featured ad checkboxes per table row when the property checked on featured ad checkboxes takes place
		 * trigger the change event for elements that the checked property has changed due the appliance of this contraint
		 */
		restictFeatureAd: function() {

			BARDIS.managedAdsCalculator.featuredAdCheckboxes.on('change', function() {

				var rowNo = $(this).closest("tr").index();
				var $targetedCheckboxes = $(this).closest("table").find("tr:nth-child(" + (rowNo + 1) + ") ." + BARDIS.managedAdsCalculator.featuredAdClass + " [type=checkbox]:checked").not(this);

				if ($(this).is(":checked")) {
					$targetedCheckboxes.prop('checked', false).change();
				}
			});

		},
				
				
		/* Add the event listener for the calculation of the total cost and display it
		 * 
		 * listen the change of the checked property for the checkboxes that have the costs as values
		 * calculate the total cost accordingly
		 * display the calculated cost on in the desired element
		 */
		listenTotalCost: function() {

			BARDIS.managedAdsCalculator.priceCheckboxes.on('change', function() {

				if (!$(this).closest("tr").hasClass(BARDIS.managedAdsCalculator.globalCheckboxesClass)) {

					if ($(this).is(":checked")) {
						BARDIS.managedAdsCalculator.totalCost += parseFloat($(this).val());
					}
					else {
						BARDIS.managedAdsCalculator.totalCost -= parseFloat($(this).val());
					}

					BARDIS.managedAdsCalculator.totalCostText.html(BARDIS.managedAdsCalculator.totalCost.toFixed(2));
				}
			});

		},
				
				
		/* Calculate summary if checkboxes are selected on page load
		 * 
		 * Sum up the values of the checked selectboxes that have the costs as values
		 * display the calculated cost on in the desired element
		 */
		updateTotalCostOnInit: function() {

			jQuery.each(BARDIS.managedAdsCalculator.priceCheckboxes, function() {
				if ($(this).prop('checked')) {
					BARDIS.managedAdsCalculator.totalCost += parseFloat($(this).val());
				}
			});

			BARDIS.managedAdsCalculator.totalCostText.html(BARDIS.managedAdsCalculator.totalCost.toFixed(2));
		}

	};

	// DOC READY
	$(function() {

		// Initializing the calculator for the 'Your listed adverts' table
		BARDIS.managedAdsCalculator.init();

	});
	// END DOC READY

	/* Optional triggers
	 
	 // WINDOW.LOAD
	 $(window).load(function() {
	 
	 });
	 
	 // WINDOW.RESIZE
	 $(window).resize(function() {
	 
	 });
	 */

})(window.BARDIS = window.BARDIS || {}, jQuery);