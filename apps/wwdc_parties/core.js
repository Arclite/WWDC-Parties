// ==========================================================================
// Project:   WWDCParties
// Copyright: ©2010 Cocoatype, LLC
// ==========================================================================

WWDCParties = SC.Application.create({
	NAMESPACE: 'WWDCParties',
	VERSION: '0.1.0',
	
	store: SC.Store.create({commitRecordsAutomatically: YES}).from('WWDCParties.PartyDataSource')
});
