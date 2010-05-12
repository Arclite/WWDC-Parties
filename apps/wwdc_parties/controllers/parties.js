// ==========================================================================
// Project:   WWDCParties - partiesController
// Copyright: ©2010 Cocoatype, LLC
// ==========================================================================

WWDCParties.partiesController = SC.ArrayController.create({
	detailParty: function() {
		if (this.get('selection').get('length') > 0) {
			WWDCParties.getPath('mainPage.mainPane').remove();
			WWDCParties.getPath('partyPage.mainPane').append();
		}
	},
	
	selectionName: function() {
		if (this.get('selection').get('length') > 0)
			return this.get('selection').firstObject().get('name');
	}.property('selection').cacheable(),
	
	selectionLocation: function() {
		if (this.get('selection').get('length') > 0)
			return this.get('selection').firstObject().get('location');
	}.property('selection').cacheable(),
	
	selectionAddress: function() {
		if (this.get('selection').get('length') > 0)
			return this.get('selection').firstObject().get('streetAddress');
	}.property('selection').cacheable(),
	
	selectionCity: function() {
		if (this.get('selection').get('length') > 0)
			return this.get('selection').firstObject().get('city');
	}.property('selection').cacheable(),
	
	selectionStartTime: function() {
		if (this.get('selection').get('length') > 0)
			return this.get('selection').firstObject().get('startTime').toFormattedString('%B %d, %Y at %i:%M %p');
	}.property('selection').cacheable(),
	
	moreInfo: function() {
		window.location = this.get('selection').firstObject().get('moreInfo');
	},
	
	goToMaps: function(event) {
		var locationString = this.get('selection').firstObject().get('streetAddress') + " " + this.get('selection').firstObject().get('city');
		var mapsString = "http://maps.google.com/maps?q=" + escape(locationString);
		console.log(mapsString);
		window.location = mapsString;
	},
	
	about: function() {
		window.location = "http://geoffpado.tumblr.com/private/590385346/tumblr_l29wcpGGKx1qzsjou";
	},
	
	backParties: function() {
		WWDCParties.getPath('partyPage.mainPane').remove();
		WWDCParties.getPath('mainPage.mainPane').append();
		this.set('selection', null);
	}
});