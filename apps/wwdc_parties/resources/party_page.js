// ==========================================================================
// Project:   WWDCParties - partyPage
// Copyright: ©2010 Cocoatype, LLC
// ==========================================================================

WWDCParties.partyPage = SC.Page.design({
	mainPane: SC.MainPane.design({
		childViews: 'middleView topView'.w(),
		
		topView: SC.ToolbarView.design({
			layout: {top: 0, left: 0, right: 0, height: 36},
			childViews: 'labelView backButton'.w(),
			anchorLocation: SC.ANCHOR_TOP,
			
			labelView: SC.LabelView.design({
				layout: {centerY: 0, height: 24, left: 8, width: 200},
				controlSize: SC.LARGE_CONTROL_SIZE,
				fontWeight: SC.BOLD_WEIGHT,
				value: 'WWDC Parties'
			}),
			
			backButton: SC.ButtonView.design({
				layout: {centerY: 0, height: 24, right: 12, width: 85},
				title: "All Parties",
				target: 'WWDCParties.partiesController',
				action: 'backParties'
			})
		}),
		
		middleView: SC.ScrollView.design({
			layout: {top: 36},

			contentView: SC.View.design({
				classNames: 'info',
				backgroundColor: 'white',
				
				childViews: 'nameLabel locLabel timeLabel addrLabel cityLabel infoButton'.w(),
				
				nameLabel: SC.LabelView.design({
					layout: {top: 20, left: 20, height: 22},
					controlSize: SC.LARGE_CONTROL_SIZE,
					fontWeight: SC.BOLD_WEIGHT,
					valueBinding: 'WWDCParties.partiesController.selectionName'
				}),
				
				locLabel: SC.LabelView.design({
					layout: {top: 45, left: 20, height: 17},
					fontWeight: SC.BOLD_WEIGHT,
					valueBinding: 'WWDCParties.partiesController.selectionLocation'
				}),
				
				timeLabel: SC.LabelView.design({
					layout: {top: 59, left: 20, height: 17},
					fontWeight: SC.BOLD_WEIGHT,
					valueBinding: 'WWDCParties.partiesController.selectionStartTime'
				}),
				
				addrLabel: SC.LabelView.design({
					classNames: ['link'],
					layout: {top: 79, left: 20, height: 17},
					valueBinding: 'WWDCParties.partiesController.selectionAddress',
					mouseDown: function(event) {
						var locationString = WWDCParties.partiesController.get('selection').firstObject().get('location') + " " + WWDCParties.partiesController.get('selection').firstObject().get('streetAddress') + " " + WWDCParties.partiesController.get('selection').firstObject().get('city');
						var mapsString = "http://maps.google.com/maps?q=" + escape(locationString);
						window.location = mapsString;
					},
					touchStart: function(event) {
						var locationString = WWDCParties.partiesController.get('selection').firstObject().get('location') + " " + WWDCParties.partiesController.get('selection').firstObject().get('streetAddress') + " " + WWDCParties.partiesController.get('selection').firstObject().get('city');
						var mapsString = "http://maps.google.com/maps?q=" + escape(locationString);
						window.location = mapsString;
					}
				}),
				
				cityLabel: SC.LabelView.design({
					classNames: ['link'],
					layout: {top: 93, left: 20, height: 17},
					valueBinding: 'WWDCParties.partiesController.selectionCity',
					mouseDown: function(event) {
						var locationString = WWDCParties.partiesController.get('selection').firstObject().get('location') + " " + WWDCParties.partiesController.get('selection').firstObject().get('streetAddress') + " " + WWDCParties.partiesController.get('selection').firstObject().get('city');
						var mapsString = "http://maps.google.com/maps?q=" + escape(locationString);
						window.location = mapsString;
					},
					touchStart: function(event) {
						var locationString = WWDCParties.partiesController.get('selection').firstObject().get('location') + " " + WWDCParties.partiesController.get('selection').firstObject().get('streetAddress') + " " + WWDCParties.partiesController.get('selection').firstObject().get('city');
						var mapsString = "http://maps.google.com/maps?q=" + escape(locationString);
						window.location = mapsString;
					}
				}),
				
				infoButton: SC.ButtonView.design({
					layout: {top: 128, left: 20, height: 24, width: 85},
					title: "More Info",
					target: 'WWDCParties.partiesController',
					action: 'moreInfo'
				})
			})
		})
	})
});
