// ==========================================================================
// Project:   WWDCParties - mainPage
// Copyright: ©2010 Cocoatype, LLC
// ==========================================================================

WWDCParties.mainPage = SC.Page.design({
	mainPane: SC.MainPane.design({
		childViews: 'middleView topView'.w(),
		
		topView: SC.ToolbarView.design({
			layout: {top: 0, left: 0, right: 0, height: 36},
			childViews: 'labelView aboutButton'.w(),
			anchorLocation: SC.ANCHOR_TOP,
			
			labelView: SC.LabelView.design({
				layout: {centerY: 0, height: 24, left: 8, width: 200},
				controlSize: SC.LARGE_CONTROL_SIZE,
				fontWeight: SC.BOLD_WEIGHT,
				value: 'WWDC Parties'
			}),
            
            aboutButton: SC.ButtonView.design({
				layout: {centerY: 0, height: 24, right: 12, width: 85},
				title: "All Parties",
				target: 'WWDCParties.partiesController',
				action: 'about'
			})
		}),
		
		middleView: SC.ScrollView.design({
			hasHorizontalScroller: NO,
			layout: {top: 36, bottom: 0, left: 0, right: 0},
			backgroundColor: 'white',
			
			contentView: SC.ListView.design({
				classNames: ['parties-list-view'],
				contentBinding: 'WWDCParties.partiesController.arrangedObjects',
				selectionBinding: 'WWDCParties.partiesController.selection',
				contentValueKey: 'name',
				rowHeight: 44,
				mouseUp: WWDCParties.partiesController.detailParty,
				touchEnd: WWDCParties.partiesController.detailParty
			})
		})
	})
});